const ERC721Metadata = require('./erc721metadata')
const Contract = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contract.ERC721Full.abi, addr)
}

class ERC721Full extends ERC721Metadata {
  async totalSupply({ web3 }) {
    let contract = loadContract({ web3, addr: this.addr })
    return contract.methods.totalSupply().call()
  }

  async tokenOfOwnerByIndex({ web3, account, idx }) {
    let contract = loadContract({ web3, addr: this.addr })
    return contract.methods.tokenOfOwnerByIndex(account, idx).call()
  }

  async tokenByIndex({ web3, idx }) {
    let contract = loadContract({ web3, addr: this.addr })
    return contract.methods.tokenByIndex(idx).call()
  }
}

ERC721Full.laod = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  let [
    name,
    symbol
  ] = await Promise.all([
    contract.methods.name().call(),
    contract.methods.symbol().call(),
  ])
  return new ERC721Full({ addr, name, symbol })
}

module.exports = ERC721Full
