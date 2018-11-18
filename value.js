const Decimal = require('decimal.js')

class Value {
  constructor({ id, amount, token }) {
    this.token = token
    if (amount) {
      this.amount = new Decimal(amount)
    }
    if (id) {
      this.id = id
    }
  }

  _assertArithmetic(v) {
    if (this.token !== v.token) {
      throw 'invalid token'
    }
    if (!this.amount || !v.amount) {
      throw 'not arithmetic'
    }
  }

  add(v) {
    this._assertArithmetic(v)
    return new Value({
      amount: this.amount.add(v.amount),
      token: this.token,
    })
  }

  sub(v) {
    this._assertArithmetic(v)
    return new Value({
      amount: this.amount.sub(v.amount),
      token: this.token,
    })
  }

  mul(v) {
    this._assertArithmetic(v)
    return new Value({
      amount: this.amount.mul(v.amount),
      token: this.token,
    })
  }

  div(v) {
    this._assertArithmetic(v)
    return new Value({
      amount: this.amount.div(v.amount),
      token: this.token,
    })
  }
}

module.exports = Value
