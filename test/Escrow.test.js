const { expect } = require('chai')
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { ZERO_ADDRESS } = require('@openzeppelin/test-helpers/src/constants')
const timeMachine = require('ganache-time-traveler')
const web3 = require('../utils/test')

const Escrow = artifacts.require('Escrow')

contract('Escrow', ([seller, intermediate, buyer, other]) => {
  before(async () => {
    this.price = new BN(web3.utils.toWei('100', 'ether'))
    this.escrow = await Escrow.new()
    await this.escrow.initialize(seller, intermediate, this.price)

    const snapshot = await timeMachine.takeSnapshot()
    this.snapshotId = snapshot.result
  })

  afterEach(async () => {
    await timeMachine.revertToSnapshot(this.snapshotId)
  })

  it('Should be initialized with correct values', async () => {
    expect(await this.escrow.buyer()).to.equal(ZERO_ADDRESS)
    expect(await this.escrow.price()).to.be.bignumber.equal(this.price)
  })

  it('Should become buyer successfully', async () => {
    await this.escrow.becomeBuyer({ from: buyer })
    expect(await this.escrow.buyer()).to.equal(buyer)
  })

  it('Non-buyer cannot send Ethers to the contract', async () => {
    const before = {
      contract: await web3.eth.getBalance(this.escrow.address),
    }
    await expectRevert(
      this.escrow.send(web3.utils.toWei('1', 'ether'), { from: other }),
      'Only buyer can send Ether',
    )
    const after = {
      contract: await web3.eth.getBalance(this.escrow.address),
    }

    expect(after.contract, 'Contract balance should not change').to.equal(
      before.contract,
    )
  })

  it('Only buyer can send Ethers to the contract', async () => {
    const before = {
      contract: new BN(await web3.eth.getBalance(this.escrow.address)),
    }
    const value = new BN(web3.utils.toWei('1', 'ether'))

    await this.escrow.becomeBuyer({ from: buyer })
    await this.escrow.send(value, { from: buyer })

    const after = {
      contract: new BN(await web3.eth.getBalance(this.escrow.address)),
    }

    expect(after.contract.sub(before.contract)).to.be.bignumber.equal(value)
  })
})
