const Decimal = require('decimal.js')

const Value = require('../value')

class Base {
  constructor({ web3, addr, contract }) {
    this.web3 = web3
    this.addr = addr
    this.contract = contract
  }

  toUnit(amount) {
    return new Decimal(amount)
  }

  fromUnit(amount) {
    return new Decimal(amount)
  }

  valueFromAmount(amount) {
    return new Value({
      token: this,
      amount: this.fromUnit(amount.toString())
    })
  }

  valueFromID(id) {
    throw 'not implemented'
  }

  async balanceOf({ account }) {
    throw 'not implemented'
  }

  async transfer({ account, to, amount, id }) {
    throw 'not implemented'
  }

  async approve({ account, to, amount, id }) {
    throw 'not implemented'
  }
}

Base.load = async ({ web3, addr }) => {
  throw 'not implemented'
}

module.exports = Base
