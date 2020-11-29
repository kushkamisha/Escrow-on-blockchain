const fs = require('fs')
const Web3 = require('web3')
const solc = require('solc')
const path = require('path')
const Tx = require('ethereumjs-tx')
require('dotenv').config({ path: '../../.env' })

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) // `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`))

function compile() {
  const escrowPath = path.resolve(__dirname, '../..', 'contracts', 'Escrow.sol')
  const initializablePath = path.resolve(
    __dirname,
    '../..',
    'node_modules',
    '@openzeppelin',
    'contracts-ethereum-package',
    'contracts',
    'Initializable.sol',
  )
  const escrowCode = fs.readFileSync(escrowPath, 'utf8')
  const initializableCode = fs.readFileSync(initializablePath, 'utf8')

  const params = {
    language: 'Solidity',
    sources: {
      'Escrow.sol': { content: escrowCode },
      '@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol': { content: initializableCode },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  }
  const compiled = JSON.parse(solc.compile(JSON.stringify(params)))
  const { abi, evm } = compiled.contracts['Escrow.sol'].Escrow
  return { abi, bytecode: evm.bytecode.object }
}

const { abi, bytecode } = compile()

const arguments = [
  '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
  '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
  '123',
  '401 Seventh Avenue, New York, NY',
  '1000000000000000000',
]

// const myContract = new web3.eth.Contract(abi)
// myContract.deploy({ data: bytecode, arguments }).send(
//   {
//     from: '0x7403ab40723898eCf2450467Ba620EF7B77A6961',
//     gas: 4700000,
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err)
//     }
//     if (res) {
//       console.log(res)
//     }
//   },
// )

const txId = "0x68cd1867f615535d5a0672a736ccf6cb827292bb45b7459b1379cd8181c9d527"
async function getTransactionReceipt() {
  const { contractAddress } = await web3.eth.getTransactionReceipt(txId);
  console.log(contractAddress)
}
// getTransactionReceipt() // 0x953C7ce77DAdB66a03303b48b087D0Fa428E8d50

const contract_address = "0x953C7ce77DAdB66a03303b48b087D0Fa428E8d50";
const Escrow = new web3.eth.Contract(abi, contract_address, {
  from: "0x7403ab40723898eCf2450467Ba620EF7B77A6961",
  gasPrice: '20000000000'
})

async function call() {
  console.log(await Escrow.methods.price().call({ from: '0x7403ab40723898eCf2450467Ba620EF7B77A6961' }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ res });
    }
  }))
}

call()




// const { gasPrice } = web3.eth
// const gasPriceHex = web3.utils.toHex(gasPrice)
// const gasLimitHex = web3.utils.toHex(6000000)
// const block = web3.eth.getBlock('latest')
// const nonce = web3.eth.getTransactionCount('0x7403ab40723898eCf2450467Ba620EF7B77A6961', 'pending')
// const nonceHex = web3.utils.toHex(nonce)

// Prepare the smart contract deployment payload
// If the smart contract constructor has mandatory parameters, you supply the input parameters like below
//
// contractData = tokenContract.new.getData( param1, param2, ..., {
//    data: '0x' + bytecode
// });

// const contractData = tokenContract.new.getData(...arguments, {
//   data: `0x${bytecode}`,
// })

// Prepare the raw transaction information
// const rawTx = {
//   nonce: nonceHex,
//   gasPrice: gasPriceHex,
//   gasLimit: gasLimitHex,
//   data: contractData,
//   from: '0x7403ab40723898eCf2450467Ba620EF7B77A6961',
// }

// // Get the account private key, need to use it to sign the transaction later.
// const privateKey = Buffer.from('deca899581d68b6b2ac88149e951afdd8f89666b95aa54a790c6d56d831ab718', 'hex')

// const tx = new Tx(rawTx)

// // Sign the transaction
// tx.sign(privateKey)
// const serializedTx = tx.serialize()

// web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (err, res) => {
//   if (err) console.error({ err })
//   else console.log({ res })
// })

// const Escrow = new web3.eth.Contract(abi, null, { data: `0x${bytecode}` })
// Escrow.deploy({
//   // data: '0x[INSERT THE BYTECODE HERE]',
//   // // You can omit the asciiToHex calls, as the contstructor takes strings.
//   // // Web3 will do the conversion for you.
//   arguments: [
//     '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
//     '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
//     '123',
//     '401 Seventh Avenue, New York, NY',
//     '1000000000000000000',
//   ],
// })
//   .send({
//     from: process.env.LOCALHOST_ADDRESS,
//     gas: 9000000,
//     gasPrice: 100000,
//   })
//   .on('error', function(error){ console.log({ err })})
// .on('transactionHash', function(transactionHash){ console.log({ transactionHash }) })
// .on('receipt', function(receipt){
//    console.log(receipt.contractAddress) // contains the new contract address
// })
// // .on('confirmation', function(confirmationNumber, receipt){  })
// .then(function(newContractInstance){
//     console.log(newContractInstance.options.address) // instance with the new contract address
// });
