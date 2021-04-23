const web3 = new window.Web3('https://rinkeby.infura.io/v3/b2d48917ee7f4f5dbe048259c3a8a554')

web3.eth.getBlockNumber((err, res) => {
  if (err) console.log({ err })
  else console.log({ res })
})

getRegistryInstance()

async function getEscrowInstanceByAddress(address) {
  return new web3.eth.Contract(window.escrowAbi, address)
}

async function getRegistryInstance() {
  const registryAddr = '0x56024F89Ce457a653aa775626670B0A3aE5A44E8'
  const registry = new web3.eth.Contract(window.registryAbi, registryAddr)
  const numOfEscrow = await registry.methods.getNumOfEscrow().call()
  console.log({ numOfEscrow })

  // const escrowAddrs = []
  const houses = []
  for (let i = 0; i < numOfEscrow; i++) {
    // eslint-disable-next-line no-await-in-loop
    const escrowAddr = await registry.methods.escrowAddrs(i).call()
    console.log({ escrowAddr })
    const escrow = await getEscrowInstanceByAddress(escrowAddr)

    // const seller = '0x4D07e28E9EE6DC715b98f589169d7927239d7318'
    // const intermediate = '0x6d82eB95C3c3468E1815242AB375327903E5261e'
    // const houseId = 1
    // const houseAddress = '401 Seventh Avenue, New York, NY'
    // const price = 250
    const seller = await escrow.methods.seller().call()
    const intermediate = await escrow.methods.intermediate().call()
    const houseId = await escrow.methods.houseId().call()
    const houseAddress = await escrow.methods.houseAddress().call()
    const price = await escrow.methods.price().call()

    console.log({ seller })

    houses.push({
      seller,
      intermediate,
      houseId,
      houseAddress,
      price,
    })
    // escrowAddrs.push(escrowAddr)
  }
  console.log({ houses })
}

async function initialize(provider) {
  console.log(provider.isConnected())
  const accounts = await provider.request({ method: 'eth_accounts' })
  const balance = await provider.request({ method: 'eth_getBalance', params: [accounts[0]] })
  console.log({ balance })
}

// async function deployContract() {
//   const sellForm = document.getElementById('sellHouse')
//   const data = new FormData(sellForm)

//   console.log({ data })
// }

// const testForm = document.getElementById('sellHouse')
// testForm.onsubmit = (event) => {
//   event.preventDefault()

//   const request = new XMLHttpRequest()

//   request.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       console.log(this.response)
//     }
//   }

//   const formData = new FormData(document.getElementById('sellHouse'))
//   const data = {
//     seller: formData.get('seller'),
//     intermediate: formData.get('intermediate'),
//     houseId: formData.get('houseId'),
//     houseAddress: formData.get('houseAddress'),
//     price: formData.get('price'),
//   }

//   request.open('POST', '/deployContract', /* async = */ true)
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
//   request.send(JSON.stringify(data))
// }

// window.addEventListener('load', async () => {
//   const provider = await window.detectEthereumProvider()

//   if (provider) {
//     provider.autoRefreshOnNetworkChange = false
//     initialize(provider)
//   } else {
//     console.error('Please install MetaMask!')
//   }
// })

const ethereumButton = document.querySelector('.enableEthereumButton')

ethereumButton.addEventListener('click', async () => {
  // Will Start the metamask extension
  console.log(await window.ethereum.request({ method: 'eth_requestAccounts' }))
  // initialize
})
