const Base = require('./base')
const Contracts = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contracts.IERC20.abi, addr)
}

class ERC20 extends Base {
  async balanceOf({ account }) {
    return this.contract.methods.balanceOf(account).call()
  }

  async transfer({ account, to, amount }) {
    let receipt = await this.contract.methods
      .transfer(to, amount)
      .send({ from: account })
    let transferEvent = receipt.events.Transfer
    if (!transferEvent) {
      throw 'no transfer event'
    }
  }

  async approve({ account, to, amount }) {
    let receipt = await this.contract.methods
      .approve(to, amount)
      .send({ from: account })
    let transferEvent = receipt.events.Approval
    if (!approvalEvent) {
      throw 'no approval event'
    }
  }
}

ERC20.load = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  return new ERC20({ web3, addr, contract })
}

module.exports = ERC20
