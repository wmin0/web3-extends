const Decimal = require('decimal.js')
const Web3 = require('web3')

const Base = require('./base')

class Native {
  toUnit(amount) {
    return new Decimal(Web3.utils.toWei(amount.toString(), 'ether'))
  }

  fromUnit(amount) {
    return new Decimal(Web3.utils.fromWei(amount.toString(), 'ether'))
  }

  async balanceOf({ web3, account }) {
    return web3.eth.getBalance(account)
  }

  async transfer({ web3, account, to, amount }) {
    await web3.eth.sendTransaction({
      from: account,
      to: addr,
      value: amount
    })
  }
}

Native.load = async ({ web3, addr }) => {
  return new Native({ addr })
}

module.exports = Native
