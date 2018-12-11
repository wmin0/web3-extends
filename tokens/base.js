const Decimal = require('decimal.js')

const Value = require('../value')

class Base {
  constructor({ addr }) {
    this.addr = addr
  }

  toUnit(amount) {
    return new Decimal(amount)
  }

  fromUnit(amount) {
    return new Decimal(amount)
  }

  valueFromAmount(amount) {
    return new Value({ token: this, amount: this.fromUnit(amount) })
  }

  valueFromID(id) {
    return new Value({ token: this, id })
  }

  async balanceOf({ web3, account }) {
    throw 'not implemented'
  }

  async transfer({ web3, account, to, amount, id }) {
    throw 'not implemented'
  }

  async approve({ web3, account, to, amount, id }) {
    throw 'not implemented'
  }
}

Base.load = async ({ web3, addr }) => {
  throw 'not implemented'
}

module.exports = Base
