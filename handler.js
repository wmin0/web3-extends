const constants = require('./constants')
const Tokens = require('./tokens')
const Contracts = require('./contracts')
const Value = require('./value')

let tokenCache = {}

class Handler {
  constructor({ web3 }) {
    this.web3 = web3
    this.accounts = null
  }

  loadContract({ raw, addr }) {
    let abi = raw.abi
    return new this.web3.eth.Contract(abi, addr)
  }

  async getAccounts() {
    if (this.accounts) {
      return this.accounts
    }
    this.accounts = await this.web3.eth.getAccounts()
    return this.accounts
  }

  async loadToken({ addr = constants.ZeroAddress, type = Tokens.Native } = {}) {
    let token = tokenCache[addr]
    if (token) {
      return token
    }
    if (type === Tokens.Native && addr !== constants.ZeroAddress) {
      throw 'invalid addr'
    }
    token = await type.load({ web3: this.web3, addr })
    tokenCache[addr] = token
    return token
  }

  async balanceOf({ token }) {
    let accounts = await this.getAccounts()
    let amount = await token.balanceOf({
      web3: this.web3,
      account: accounts[0],
    })
    return new Value({ token, amount: token.fromUnit(amount) })
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
}

module.exports = Handler
