const Base = require('./base')
const Contracts = require('../contracts')
const Value = require('../value')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contracts.IERC721.abi, addr)
}

class ERC721 extends Base {
  valueFromID(id) {
    return new Value({ token: this, id })
  }

  async balanceOf({ web3, account }) {
    let contract = loadContract({ web3, addr: this.addr })
    return contract.methods.balanceOf(account).call()
  }

  async transfer({ web3, account, to, id }) {
    let contract = loadContract({ web3, addr: this.addr })
    let receipt = await contract.methods
      .safeTransferFrom(account, to, id)
      .send({ from: account })
    let transferEvent = receipt.events.Transfer
    if (!transferEvent) {
      throw 'no transfer event'
    }
  }

  async approve({ web3, account, to, id }) {
    let contract = loadContract({ web3, addr: this.addr })
    let receipt = await contract.methods
      .approve(to, id)
      .send({ from: account })
    let transferEvent = receipt.events.Approval
    if (!approvalEvent) {
      throw 'no approval event'
    }
  }
}

ERC721.load = async ({ web3, addr }) => {
  return new ERC721({ addr })
}

module.exports = ERC721
