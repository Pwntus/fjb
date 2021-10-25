<template lang="pug">
v-container
  v-row.top-img(
    align="center"
    justify="center"
  )
    img(
      src="../assets/fjb.png"
    )
  .text-center.white--text
    .display-2.font-weight-light.my-3 Fun light Julebrus (FJB) indeks
    .title.font-weight-light.mt-4.mb-12 En sukkerfri og fristende tørsteslukker fra Fun Light med smaken av julebrus, og nå nesten umulig å få tak i!
  v-container.pt-12(fluid)
    stock-chart
  .text-center.white--text.faq
    .display-2.font-weight-light Hva er dette?
    .title.font-weight-light.mt-4.mb-12
      | Dette er en "indeks" som følger prisen for en (1) Fun Light Julebrus i Norske kroner.
      | Dataene hentes fra <a class="lf" href="https://www.finn.no/bap/forsale/search.html?q=fun+light+julebrus&search_type=SEARCH_ID_BAP_ALL&sort=PRICE_ASC" target="_new">Finn.no</a> og ser på den gjennomsnittlige valutaprisen for hver annonse.
      | Dataene hentes automatisk inn hver halvtime.
  v-row.bottom-img(
    align="center"
    justify="center"
  )
    a(
      href="https://github.com/Pwntus/fjb"
      target="_new"
      title="Pwntus/fjb"
    )
      img.gh(
        src="../assets/GitHub-Mark-Light-120px-plus.png"
      )
</template>

<script>
import StockChart from '@/components/StockChart'

export default {
  name: 'Home',
  components: {
    StockChart
  }
}
</script>

<style lang="stylus" scoped>
.container
  .top-img
    height 300px
    position relative

    img
      max-height 100%

  .faq
    margin 100px 0 0

  .lf
    padding 1px 8px
    background #FFF
    color #d81636
    text-decoration none
    border-radius 3px

    &:hover
      background #0c2231
      color #FFF

  .gh
    width 60px
    margin-bottom 50px
    border 0
</style>
