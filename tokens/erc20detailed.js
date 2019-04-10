const Decimal = require('decimal.js')

const ERC20 = require('./erc20')
const Contracts = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contracts.ERC20Detailed.abi, addr)
}

class ERC20Detailed extends ERC20 {
  constructor(...args) {
    super(...args)
    let { name, symbol, decimals } = args[0]
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
  }

  toUnit(amount) {
    return new Decimal(amount).mul(Decimal.pow(10, this.decimals))
  }

  fromUnit(amount) {
    return new Decimal(amount).div(Decimal.pow(10, this.decimals))
  }
}

ERC20Detailed.load = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  let [
    name,
    symbol,
    decimals
  ] = await Promise.all([
    contract.methods.name().call(),
    contract.methods.symbol().call(),
    contract.methods.decimals().call(),
  ])
  return new ERC20Detailed({ web3, addr, contract, name, symbol, decimals })
}

module.exports = ERC20Detailed
