const ERC721 = require('./erc721')
const Contract = require('../contracts')

const loadContract = ({ web3, addr }) => {
  return new web3.eth.Contract(Contract.IERC721Metadata.abi, addr)
}

class ERC721Metadata extends ERC721 {
  constructor(...args) {
    super(...args)
    let { name, symbol } = args[0]
    this.name = name
    this.symbol = symbol
    this.uri = {}
  }

  async tokenURI({ id }) {
    if (this.uri[id]) {
      return this.uri[id]
    }
    let uri = await this.contract.methods.tokenURI(id).call()
    this.uri[id] = uri
    return uri
  }
}

ERC721Metadata.load = async ({ web3, addr }) => {
  let contract = loadContract({ web3, addr })
  let [
    name,
    symbol
  ] = await Promise.all([
    contract.methods.name().call(),
    contract.methods.symbol().call(),
  ])
  return new ERC721Metadata({ web3, addr, contract, name, symbol })
}

module.exports = ERC721Metadata
