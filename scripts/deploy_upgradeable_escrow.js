async function main() {
  const Escrow = await ethers.getContractFactory('Escrow')
  console.log('Deploying Escrow...')
  const escrow = await Escrow.deploy('Alice')
  console.log('Escrow deployed to:', escrow.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
