const { expect } = require('chai')

describe('Escrow', () => {
  before(async () => {
    this.Escrow = await ethers.getContractFactory('Escrow')
  })

  beforeEach(async () => {
    this.escrow = await this.Escrow.deploy('Alice')
    await this.escrow.deployed()
  })

  it('Set name', async () => {
    expect(await this.escrow.name()).to.equal('Alice')
  })

  it('Retrieve name', async () => {
    await this.escrow.setName('Bob')
    expect(await this.escrow.name()).to.equal('Bob')
  })
})
