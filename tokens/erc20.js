const Base = require('./base')
const Contracts = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contracts.IERC20.abi, addr)
}

class ERC20 extends Base {
  async balanceOf({ web3, token, account }) {
    let contract = loadContract({ web3, addr: this.addr })
    return contract.methods.balanceOf(account).call()
  }

  async transfer({ web3, account, to, amount }) {
    let contract = loadContract({ web3, addr: this.addr })
    let receipt = await contract.methods
      .transfer(to, amount)
      .send({ from: account })
    let transferEvent = receipt.events.Transfer
    if (!transferEvent) {
      throw 'no transfer event'
    }
  }

  async approve({ web3, account, to, amount }) {
    let contract = loadContract({ web3, addr: this.addr })
    let receipt = await contract.methods
      .approve(to, amount)
      .send({ from: account })
    let transferEvent = receipt.events.Approval
    if (!approvalEvent) {
      throw 'no approval event'
    }
  }
}

ERC20.load = async ({ web3, addr }) => {
  return new ERC20({ addr })
}

module.exports = ERC20
