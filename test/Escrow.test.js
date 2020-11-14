const { expect } = require('chai')
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { ZERO_ADDRESS } = require('@openzeppelin/test-helpers/src/constants')
const timeMachine = require('ganache-time-traveler')
const web3 = require('../utils/test')

const Escrow = artifacts.require('Escrow')

const SECONDS_IN_DAY = 86400

contract('Escrow', ([seller, intermediate, buyer, other]) => {
  before(async () => {
    this.houseId = '123'
    this.houseAddress = '401 Seventh Avenue, New York, NY'
    this.price = new BN(web3.utils.toWei('100', 'ether'))
    this.escrow = await Escrow.new()
    await this.escrow.initialize(seller, intermediate, this.houseId, this.houseAddress, this.price)
  })

  beforeEach(async () => {
    const snapshot = await timeMachine.takeSnapshot()
    this.snapshotId = snapshot.result
  })

  afterEach(async () => {
    await timeMachine.revertToSnapshot(this.snapshotId)
  })

  describe('Initialize', async () => {
    it('Should be initialized with correct values', async () => {
      expect(await this.escrow.seller()).to.equal(seller)
      expect(await this.escrow.intermediate()).to.equal(intermediate)
      expect(await this.escrow.buyer()).to.equal(ZERO_ADDRESS)
      expect(await this.escrow.houseId()).to.be.bignumber.equal(new BN(this.houseId))
      expect(await this.escrow.houseAddress()).to.equal(this.houseAddress)
      expect(await this.escrow.price()).to.be.bignumber.equal(this.price)
    })
  })

  describe('Become a buyer', async () => {
    it('Cannot become a buyer if there is already a buyer', async () => {
      await this.escrow.becomeBuyer({ from: buyer })
      await expectRevert(this.escrow.becomeBuyer({ from: other }), 'There is alredy a buyer')
    })

    it('Cannot become a buyer if the house was already sold', async () => {
      // Selling a house
      await this.escrow.becomeBuyer({ from: buyer })
      await this.escrow.send(this.price, { from: buyer })
      await this.escrow.transferFundsToSeller({ from: intermediate })

      await expectRevert(this.escrow.becomeBuyer({ from: other }), 'There is alredy a buyer')
    })

    it('Should become a buyer successfully', async () => {
      await expectEvent(await this.escrow.becomeBuyer({ from: buyer }), 'NewBuyer', { buyer })
      expect(await this.escrow.buyer()).to.equal(buyer)
    })
  })

  describe('Remove a buyer', async () => {
    it('Cannot remove a buyer if it still has time to pay', async () => {
      await this.escrow.becomeBuyer({ from: buyer })
      await expectRevert(this.escrow.removeBuyer(), 'The buyer still has time to pay')
    })

    it('Cannot remove a buyer if the house is already sold', async () => {
      // Selling a house
      await this.escrow.becomeBuyer({ from: buyer })
      await this.escrow.send(this.price, { from: buyer })
      await this.escrow.transferFundsToSeller({ from: intermediate })

      await timeMachine.advanceTimeAndBlock(3 * SECONDS_IN_DAY)

      await expectRevert(this.escrow.removeBuyer(), 'The house is already sold')
    })

    it('Should remove a buyer if there is no buyer', async () => {
      const before = { buyer: await this.escrow.buyer() }
      
      await expectEvent(await this.escrow.removeBuyer(), 'RemoveBuyer', { buyer: ZERO_ADDRESS })

      const after = { buyer: await this.escrow.buyer() }

      expect(after.buyer).to.equal(ZERO_ADDRESS)
      expect(after.buyer).to.equal(before.buyer)
    })

    it('Should remove a buyer if time to pay has passed', async () => {
      const value = new BN(web3.utils.toWei('1', 'ether'))

      await this.escrow.becomeBuyer({ from: buyer })
      await this.escrow.send(value, { from: buyer })

      const before = {
        buyer: await this.escrow.buyer(),
        buyerBalance: new BN(await web3.eth.getBalance(buyer)),
        contractBalance: new BN(await web3.eth.getBalance(this.escrow.address)),
      }

      await timeMachine.advanceTimeAndBlock(3 * SECONDS_IN_DAY)

      await expectEvent(await this.escrow.removeBuyer(), 'RemoveBuyer', { buyer })
      await this.escrow.becomeBuyer({ from: other })

      const after = {
        buyer: await this.escrow.buyer(),
        buyerBalance: new BN(await web3.eth.getBalance(buyer)),
        contractBalance: new BN(await web3.eth.getBalance(this.escrow.address)),
      }

      expect(before.buyer).to.equal(buyer)
      expect(after.buyer).to.equal(other)
      expect(after.buyerBalance.sub(before.buyerBalance)).to.be.bignumber.equal(value)
      expect(before.contractBalance.sub(after.contractBalance)).to.be.bignumber.equal(value)
    })
  })

  describe('Receive funds', async () => {
    it('Non-buyer cannot send Ethers to the contract', async () => {
      const before = {
        contract: await web3.eth.getBalance(this.escrow.address),
      }
      await expectRevert(this.escrow.send(web3.utils.toWei('1', 'ether'), { from: other }), 'Only buyer can send Ether')
      const after = {
        contract: await web3.eth.getBalance(this.escrow.address),
      }

      expect(after.contract, 'Contract balance should not change').to.equal(before.contract)
    })

    it('Only buyer can send Ethers to the contract', async () => {
      const beforeContractBalance = new BN(await web3.eth.getBalance(this.escrow.address))
      const value = new BN(web3.utils.toWei('1', 'ether'))

      await this.escrow.becomeBuyer({ from: buyer })
      await expectEvent(await this.escrow.send(value, { from: buyer }), 'Payment', { payer: buyer, value })

      const afterContractBalance = new BN(await web3.eth.getBalance(this.escrow.address))

      expect(afterContractBalance.sub(beforeContractBalance)).to.be.bignumber.equal(value)
    })
  })

  describe('Transfer funds to the seller', async () => {
    it('Cannot transfer funds if the buyer has not payed enough', async () => {
      const lessThanPrice = this.price.sub(new BN(web3.utils.toWei('1', 'ether')))
      await this.escrow.becomeBuyer({ from: buyer })
      await this.escrow.send(lessThanPrice, { from: buyer })
      await expectRevert(this.escrow.transferFundsToSeller({ from: intermediate }), 'The buyer has not payed enough')
    })

    it('Cannot transfer funds if there is no buyer', async () => {
      await expectRevert(this.escrow.transferFundsToSeller({ from: intermediate }), 'The buyer has not payed enough')
    })

    it('Should transfer all funds to the seller', async () => {
      const beforeSellerBalance = new BN(await web3.eth.getBalance(seller))
      const moreThanPrice = this.price.add(new BN(web3.utils.toWei('1', 'ether')))

      await this.escrow.becomeBuyer({ from: buyer })
      await this.escrow.send(moreThanPrice, { from: buyer })
      await expectEvent(
        await this.escrow.transferFundsToSeller({ from: intermediate }),
        'TransferFundsToSeller',
        { seller, value: moreThanPrice }
      )

      const afterSellerBalance = new BN(await web3.eth.getBalance(seller))
      const isSold = await this.escrow.isSold()

      expect(isSold).to.equal(true)
      expect(afterSellerBalance.sub(beforeSellerBalance)).to.be.bignumber.equal(moreThanPrice)
    })
  })
})
