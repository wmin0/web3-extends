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

  async balanceOf({ account }) {
    return this.contract.methods.balanceOf(account).call()
  }

  async transfer({ account, to, id }) {
    let receipt = await this.contract.methods
      .safeTransferFrom(account, to, id)
      .send({ from: account })
    let transferEvent = receipt.events.Transfer
    if (!transferEvent) {
      throw 'no transfer event'
    }
  }

  async approve({ account, to, id }) {
    let receipt = await this.contract.methods
      .approve(to, id)
      .send({ from: account })
    let transferEvent = receipt.events.Approval
    if (!approvalEvent) {
      throw 'no approval event'
    }
  }
}

ERC721.load = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  return new ERC721({ web3, addr, contract })
}

module.exports = ERC721
