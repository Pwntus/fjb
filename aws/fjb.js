import AWS from 'aws-sdk'
import fs from 'fs'
import fetch from 'node-fetch'
import queryString from 'query-string'
import get from 'lodash-es/get'

const FILENAME = 'file'
const ENDPOINT = 'https://www.finn.no/api/search-qf'
const Q = 'fun+light+julebrus'

const MAP_FN = ({ price: { amount } }) => amount
const FILTER_FN = (amount) => amount > 0

const getS3Object = (file, s3Params) => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3()
    const fileStream = fs.createWriteStream(file)
    const s3Stream = s3.getObject(s3Params).createReadStream().pipe(fileStream)
    s3Stream.on('error', reject)
    fileStream.on('error', reject)
    fileStream.on('close', () => resolve(file))
  })
}

/**
 * Search a specific page.
 */
const search = async (page = 1) => {
  try {
    const params = {
      searchkey: 'SEARCH_ID_BAP_COMMON',
      search_type: 'SEARCH_ID_BAP_ALL',
      vertical: 'bap',
      sort: 'PRICE_ASC',
      q: Q,
      page
    }
    const result = await fetch(`${ENDPOINT}?${queryString.stringify(params)}`)
    const json = await result.json()

    const pageOffers = json.docs.map(MAP_FN).filter(FILTER_FN)
    const pages = get(json, 'metadata.paging.last', 1)

    return {
      pageOffers,
      pages
    }
  } catch (e) {
    throw e
  }
}

export const main = async (event, context) => {
  try {
    const offers = []

    // Peak
    let { pageOffers, pages } = await search(1)
    offers.push(...pageOffers)

    // Fetch all
    if (pages > 1) {
      // Construct searches
      const jobs = await Promise.all(
        [...Array(pages - 1).keys()].map((i) => {
          return search(i + 2)
        })
      )
      for (let { pageOffers } of jobs) {
        offers.push(...pageOffers)
      }
    }

    // Sort all offers, get length and timestamp
    const sorted = offers.sort((a, b) => a - b)
    const n = sorted.length
    const timestamp = new Date().getTime()

    let avg = 0
    let median = 0

    if (n > 0) {
      // Calculate average
      avg = (sorted.reduce((a, b) => a + b, 0) / n).toFixed(2)

      // Calculate median
      const mid = Math.floor(n / 2)
      median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
    }

    // Read current storage
    const tmpPath = `/tmp/${timestamp}`
    await getS3Object(tmpPath, {
      Bucket: process.env.bucketName,
      Key: FILENAME
    })
    let content = fs.readFileSync(tmpPath)

    // Modify content (incl. newline)
    content += `${timestamp} ${avg} ${n} ${median}
`

    // Overwrite new storage
    const s3 = new AWS.S3()
    await s3
      .putObject({
        Bucket: process.env.bucketName,
        Key: FILENAME,
        Body: content,
        ACL: 'public-read',
        Metadata: {
          'Content-Length': String(content.length)
        }
      })
      .promise()

    console.log('OK')
  } catch (e) {
    console.log(e)
  }
}
