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

const testForm = document.getElementById('sellHouse')
testForm.onsubmit = (event) => {
  event.preventDefault()

  const request = new XMLHttpRequest()

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.response)
    }
  }

  const formData = new FormData(document.getElementById('sellHouse'))
  const data = {
    seller: formData.get('seller'),
    intermediate: formData.get('intermediate'),
    houseId: formData.get('houseId'),
    houseAddress: formData.get('houseAddress'),
    price: formData.get('price'),
  }

  request.open('POST', '/deployContract', /* async = */ true)
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.send(JSON.stringify(data))
}

window.addEventListener('load', async () => {
  const provider = await window.detectEthereumProvider()

  if (provider) {
    provider.autoRefreshOnNetworkChange = false
    initialize(provider)
  } else {
    console.error('Please install MetaMask!')
  }
})

// function loadContract() {
//   const abi = JSON.parse(`[
// 	{
// 		"constant": false,
// 		"inputs": [],
// 		"name": "becomeCandidateToOracles",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_timestamp",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_mCoeficient",
// 				"type": "uint16"
// 			},
// 			{
// 				"name": "_range",
// 				"type": "uint8"
// 			},
// 			{
// 				"name": "_hashOfDescription",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "createAction",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "bet",
// 				"type": "uint8"
// 			},
// 			{
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "makeBet",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "submitAction",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "result",
// 				"type": "uint8"
// 			},
// 			{
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "submitResult",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "candidate",
// 				"type": "address"
// 			}
// 		],
// 		"name": "unvote",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "candidate",
// 				"type": "address"
// 			}
// 		],
// 		"name": "vote",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "withdrawOracleReward",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "CreateAction",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "oracle",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "SubmitAction",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "bet",
// 				"type": "uint8"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "player",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "MakeBet",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "result",
// 				"type": "uint8"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "oracle",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "actionId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "SubmitResult",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "oracle",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "GetOracleReward",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "player",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "GetPlayerReward",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "oracle",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "WithdrawOracleReward",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "candidate",
// 				"type": "address"
// 			}
// 		],
// 		"name": "BecomeCandidateToOracles",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "voter",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "candidate",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Vote",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "voter",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "candidate",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Unvote",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "newOracle",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "oldOracle",
// 				"type": "address"
// 			}
// 		],
// 		"name": "UpdateOreaclesList",
// 		"type": "event"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "actions",
// 		"outputs": [
// 			{
// 				"name": "timestamp",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "mCoeficient",
// 				"type": "uint16"
// 			},
// 			{
// 				"name": "range",
// 				"type": "uint8"
// 			},
// 			{
// 				"name": "hashOfDescription",
// 				"type": "bytes32"
// 			},
// 			{
// 				"name": "votesForAction",
// 				"type": "uint8"
// 			},
// 			{
// 				"name": "playersCount",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "result",
// 				"type": "uint8"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "maxBet",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "minBet",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "oraclesBalance",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "oraclesCount",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "oraclesList",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "votedForCandidate",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "votes",
// 		"outputs": [
// 			{
// 				"name": "initialized",
// 				"type": "bool"
// 			},
// 			{
// 				"name": "count",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]`)
//   const WellcomeContract = window.web3.eth.contract(abi)
//   window.contractInstance = WellcomeContract.at('0x54041c72f5dA3899BA9d34596F14de460c840d06') // '0x114A793AD7b3d6471871bdA194967e07d5d513F9')
// }

// $('#oraclesButton').click(function () {
//   const id = $('#oraclesAddress').val()
//   contractInstance.oraclesList.call(id, (err, oracle) => {
//     if (err) console.error({ err })
//     $('#oraclesResult').text(oracle)
//   })
// })

// $('#actionsButton').click(function () {
//   const id = $('#actionsId').val()
//   contractInstance.actions.call(id, (err, action) => {
//     if (err) console.error({ err })
//     $('#actionsResult').text(action)
//   })
// })

// $('#votes').click(function () {
//   const address = $('#votesAddress').val()
//   contractInstance.votes.call(address, (err, votes) => {
//     if (err) console.error({ err })
//     // console.log({ votes })
//     $('#wantToBeOracle').text(votes[0])
//     $('#votesForAddress').text(votes[1].toNumber())
//   })
// })

// $('#playerBetButton').click(function () {
//   const id = $('#playerBetActionsId').val()
//   const address = $('#playerBetActionsAddress').val()
//   contractInstance.votes.call([id, address], (err, votes) => {
//     if (err) console.error({ err })
//     // console.log({ votes })
//     $('#wantToBeOracle').text(votes[0])
//     $('#votesForAddress').text(votes[1].toNumber())
//   })
// })

// $('#oraclesBalanceButton').click(function () {
//   const id = $('#oraclesBalanceId').val()
//   contractInstance.oraclesBalance.call(id, (err, balance) => {
//     if (err) console.error({ err })
//     $('#oraclesBalanceResult').text(`${balance.toNumber() / 1e18} Ether`)
//   })
// })

// $('#becomeCandidate').click(function () {
//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.becomeCandidateToOracles({ from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('BecomeCandidateToOracles').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#becomeCandidateStatus').text('success')
//       })
//     })
//   })
// })

// $('#vote').click(function () {
//   const forAddress = $('#voteAddress').val()
//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.vote(forAddress, { from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('Vote').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#voteForCandidate').text('success')
//       })
//     })
//   })
// })

// $('#votingButton').click(function () {
//   const address = $('#votingAddress').val()
//   contractInstance.votedForCandidate.call(address, (err, voted) => {
//     if (err) console.error({ err })
//     $('#votingResult').text(voted)
//   })
// })

// $('#unvoteButton').click(function () {
//   const forAddress = $('#unvoteAddress').val()
//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.unvote(forAddress, { from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('Unvote').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#unvoteStatus').text('success')
//       })
//     })
//   })
// })

// $('#createActionButton').click(function () {
//   const description = $('#createActionDescription').val()
//   const timestamp = $('#createActionTimestamp').val()
//   const coefficient = $('#createActionCoefficient').val()
//   const range = $('#createActionRange').val()

//   const data = {
//     description,
//   }
//   hashDescription(data, timestamp, coefficient, range)
// })

// $('#submitActionButton').click(function () {
//   const id = $('#submitActionId').val()
//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.submitAction(id, { from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('SubmitAction').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#submitActionResult').text('success')
//       })
//     })
//   })
// })

// $('#makeBetButton').click(function () {
//   const bet = $('#makeBetBet').val()
//   const actionId = $('#makeBetActionId').val()
//   const value = $('#makeBetValue').val()

//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.makeBet(bet, actionId, { from: address, value }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('MakeBet').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#makeBetResult').text('success')
//       })
//     })
//   })
// })

// $('#submitResultButton').click(function () {
//   const resultInput = $('#submitResultResultInput').val()
//   const id = $('#submitResultActionId').val()

//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.submitResult(resultInput, id, { from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('SubmitResult').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#submitResultResult').text('success')
//       })
//     })
//   })
// })

// $('#withdrawOracleButton').click(function () {
//   const amount = $('#withdrawOracleAmount').val()

//   getAccount().then((address, err) => {
//     if (err) console.error({ err })
//     contractInstance.withdrawOracleReward(amount, { from: address }, function (err, receipt) {
//       if (err) console.error({ err })
//       // console.log({ receipt })
//       handleEvent('WithdrawOracleReward').then((event, err) => {
//         if (err) console.error({ err })
//         console.log({ event })
//         $('#withdrawOracleResult').text('success')
//       })
//     })
//   })
// })

// function handleEvent(eventName) {
//   return new Promise((resolve, reject) => {
//     if (web3 && contractInstance) {
//       const event = contractInstance[eventName]()
//       event.watch(function (err, res) {
//         if (err) reject(err)

//         //         Callback return
//         //         Object - An event object as follows:

//         //         address: String, 32 Bytes - address from which this log originated.
//         //         args: Object - The arguments coming from the event.
//         //         blockHash: String, 32 Bytes - hash of the block where this log was in. null when its pending.
//         //         blockNumber: Number - the block number where this log was in. null when its pending.
//         //         logIndex: Number - integer of the log index position in the block.
//         //         event: String - The event name.
//         //         removed: bool - indicate if the transaction this event was created from was removed from the blockchain (due to orphaned block) or never get to it (due to rejected transaction).
//         //         transactionIndex: Number - integer of the transactions index position log was created from.
//         //         transactionHash: String, 32 Bytes - hash of the transactions this log was created from.

//         // event arguments cointained in result.args object
//         // const { candidateAddress } = res.args
//         // console.log({ res })
//         resolve(res)
//         // new data have arrived. it is good idea to udpate data & UI
//         // addNewDataToStateAndUpdateUI()
//       })
//     }
//   })
// }

// function oraclesCount() {
//   contractInstance.oraclesCount.call((err, count) => {
//     if (err) console.error({ err })
//     $('#oracles').text(count)
//   })
// }

// function loadBets() {
//   contractInstance.minBet.call((err, minbet) => {
//     if (err) console.error({ err })
//     $('#minbet').text(`${minbet.toNumber() / 1e18} Ether`)
//   })
//   contractInstance.maxBet.call((err, maxbet) => {
//     if (err) console.error({ err })
//     $('#maxbet').text(`${maxbet.toNumber() / 1e18} Ether`)
//   })
// }

// function getAccount() {
//   return new Promise((resolve, reject) => {
//     web3.eth.getAccounts(function (err, accounts) {
//       if (err) reject(err)
//       resolve(accounts[0])
//     })
//   })
// }

// function hashDescription(data, timestamp, coefficient, range) {
//   $.ajax({
//     url: '/hash',
//     // type: 'POST',
//     // dataType: 'json',
//     data,
//     // contentType: 'json',

//     success(hash) {
//       hash = `0x${hash}`
//       timestamp = parseInt(timestamp)
//       coefficient = parseInt(coefficient)
//       range = parseInt(range)
//       // hash = parseInt(hash, 16)

//       console.log({ timestamp, coefficient, range, hash })
//       getAccount().then((address, err) => {
//         if (err) console.error({ err })
//         contractInstance.createAction(timestamp, coefficient, range, hash, { from: address }, function (err, receipt) {
//           if (err) console.error({ err })
//           // console.log({ receipt })
//           handleEvent('CreateAction').then((event, err) => {
//             if (err) console.error({ err })
//             console.log({ event })
//             $('#createActionResult').text('success')
//           })
//         })
//       })
//     },

//     error(err) {
//       console.error({ err })
//     },
//   })
// }
