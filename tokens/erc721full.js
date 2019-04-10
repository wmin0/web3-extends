const ERC721Metadata = require('./erc721metadata')
const Contract = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contract.ERC721Full.abi, addr)
}

class ERC721Full extends ERC721Metadata {
  async totalSupply() {
    return this.contract.methods.totalSupply().call()
  }

  async tokenOfOwnerByIndex({ account, idx }) {
    return this.contract.methods.tokenOfOwnerByIndex(account, idx).call()
  }

  async tokenByIndex({ idx }) {
    return this.contract.methods.tokenByIndex(idx).call()
  }
}

ERC721Full.load = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  let [
    name,
    symbol
  ] = await Promise.all([
    contract.methods.name().call(),
    contract.methods.symbol().call(),
  ])
  return new ERC721Full({ web3, addr, contract, name, symbol })
}

module.exports = ERC721Full
