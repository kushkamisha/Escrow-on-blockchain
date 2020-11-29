// const Escrow = artifacts.require('Escrow')

// const { deployProxy } = require('@openzeppelin/truffle-upgrades')

// module.exports = async function (deployer) {
//   const arguments = [
//     '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
//     '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
//     '123',
//     '401 Seventh Avenue, New York, NY',
//     '1000000000000000000',
//   ]
//   const instance = await deployProxy(Escrow, arguments, { deployer })
//   console.log('Deployed', instance.address);
// }

const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const Escrow = artifacts.require('Escrow')

module.exports = async function (deployer) {
  const arguments = [
    '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
    '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
    '123',
    '401 Seventh Avenue, New York, NY',
    '1000000000000000000',
  ]
  const instance = await deployProxy(Escrow, arguments, { deployer })
  console.log('Deployed', instance.address)
}
