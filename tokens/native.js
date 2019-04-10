const Decimal = require('decimal.js')
const Web3 = require('web3')

const Base = require('./base')

class Native extends Base {
  toUnit(amount) {
    return new Decimal(Web3.utils.toWei(amount.toString(), 'ether'))
  }

  fromUnit(amount) {
    return new Decimal(Web3.utils.fromWei(amount.toString(), 'ether'))
  }

  async balanceOf({ account }) {
    return this.web3.eth.getBalance(account)
  }

  async transfer({ account, to, amount }) {
    await this.web3.eth.sendTransaction({
      from: account,
      to: addr,
      value: amount
    })
  }
}

Native.load = async ({ web3, addr }) => {
  return new Native({ web3, addr })
}

module.exports = Native
