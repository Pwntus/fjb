class List {
  constructor() {
    this.list = []
  }

  setList(payload) {
    this.list = payload
  }

  getList() {
    return this.list
  }
}

const list = new List()
export default list
