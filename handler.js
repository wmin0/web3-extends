const constants = require('./constants')
const Tokens = require('./tokens')
const Contracts = require('./contracts')
const Value = require('./value')

class Handler {
  constructor({ web3 }) {
    this.web3 = web3
    this.accounts = null
    this.tokenCache = {}
    this.contractCache = {}
  }

  decodeLog({ contract, receipt, name }) {
    let abi = contract.options.jsonInterface.find(
      (i) => i.name === name
    )
    let eventRaw = receipt.logs.find(
      (event) => event.topics[0] === abi.signature
    )
    return this.web3.eth.abi.decodeLog(
      abi.inputs,
      eventRaw.data,
      eventRaw.topics
    )
  }

  loadContract({ raw, addr }) {
    let key = `${raw.contractName}.${addr}`
    let contract = this.contractCache[key]
    if (contract) {
      return contract
    }
    contract = this.web3.eth.Contract(abi, addr)
    this.contractCache[key] = contract
    return contract
  }

  async getBlockNumber() {
    return this.web3.eth.getBlockNumber()
  }

  async getAccounts() {
    return this.web3.eth.getAccounts()
  }

  async loadToken({ addr = constants.ZeroAddress, type = Tokens.Native } = {}) {
    let token = this.tokenCache[addr]
    if (token) {
      return token
    }
    if (type === Tokens.Native && addr !== constants.ZeroAddress) {
      throw 'invalid addr'
    }
    token = await type.load({ web3: this.web3, addr })
    this.tokenCache[addr] = token
    return token
  }

  async balanceOf({ token }) {
    let accounts = await this.getAccounts()
    let amount = await token.balanceOf({
      web3: this.web3,
      account: accounts[0],
    })
    return token.valueFromAmount(amount)
  }

  async transfer({ to, value }) {
    let accounts = await this.getAccounts()
    let args = {
      web3: this.web3,
      account: accounts[0],
      to: to
    }
    if (value.id) {
      args.id = id
    }
    if (value.amount) {
      args.amount = value.token.toUnit(value.amount)
    }
    return value.token.transfer(args)
  }

  async approve({ to, value }) {
    let accounts = await this.getAccounts()
    let args = {
      web3: this.web3,
      account: accounts[0],
      to: to
    }
    if (value.id) {
      args.id = id
    }
    if (value.amount) {
      args.amount = value.token.toUnit(value.amount)
    }
    return value.token.approve(args)
  }

  async tokenURI({ value }) {
    if (!(value.token instanceof Tokens.ERC721Metadata)) {
      throw 'only allow erc721 metadata'
    }
    return value.token.tokenURI({ web3, id: value.id })
  }
}

module.exports = Handler
