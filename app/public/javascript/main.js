const web3 = new window.Web3('https://rinkeby.infura.io/v3/b2d48917ee7f4f5dbe048259c3a8a554')

// // To test that the connection is OK
// web3.eth.getBlockNumber((err, res) => {
//   if (err) console.log({ err })
//   else console.log({ res })
// })

async function getEscrowInstanceByAddress(address) {
  return new web3.eth.Contract(window.escrowAbi, address)
}

async function getAHouse(escrowAddr) {
  const escrow = await getEscrowInstanceByAddress(escrowAddr)

  const seller = await escrow.methods.seller().call()
  const intermediate = await escrow.methods.intermediate().call()
  const houseId = await escrow.methods.houseId().call()
  const houseAddress = await escrow.methods.houseAddress().call()
  const price = await escrow.methods.price().call()

  return {
    seller,
    intermediate,
    houseId,
    houseAddress,
    price,
  }
}

async function getHouses() {
  const registryAddr = '0x56024F89Ce457a653aa775626670B0A3aE5A44E8'
  const registry = new web3.eth.Contract(window.registryAbi, registryAddr)
  const numOfEscrow = parseInt(await registry.methods.getNumOfEscrow().call(), 10)
  console.log({ numOfEscrow })

  const ids = new Array(numOfEscrow).fill().map((_, i) => i)
  const escrowAddrs = await Promise.all(ids.map((i) => registry.methods.escrowAddrs(i).call()))

  return Promise.all(
    escrowAddrs.map(async (addr) => {
      const escrow = await getEscrowInstanceByAddress(addr)

      const seller = await escrow.methods.seller().call()
      const intermediate = await escrow.methods.intermediate().call()
      const houseId = await escrow.methods.houseId().call()
      const houseAddress = await escrow.methods.houseAddress().call()
      const price = await escrow.methods.price().call()

      return {
        seller,
        intermediate,
        houseId,
        houseAddress,
        escrowAddr: addr,
        price,
      }
    }),
  )
}

async function initialize(provider) {
  console.log(provider.isConnected())
  const accounts = await provider.request({ method: 'eth_accounts' })
  const balance = await provider.request({ method: 'eth_getBalance', params: [accounts[0]] })
  console.log({ balance })
}
