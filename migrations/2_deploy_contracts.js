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
const Registry = artifacts.require('Registry')

module.exports = async (deployer) => {
  const houses = [
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '1',
      'Estr. dos Remédios, 760 - Afogados, Recife - PE, 50750-360, Brazil',
      '31000000000000000000',
    ],
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '2',
      'Av. de los Deportes 111, Tellería, 82017 Mazatlán, Sin., Mexico',
      '53000000000000000000',
    ],
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '3',
      'Польський бульвар, 26, Житомир, Житомирська область, 10000, Ukraine',
      '28000000000000000000',
    ],
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '4',
      'Via Fausto Noce, 8, 07026 Olbia SS, Italy',
      '30000000000000000000',
    ],
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '5',
      'Av. Simón Bolivar 1515, Pueblo Libre 15084, Peru',
      '20000000000000000000',
    ],
    [
      '0x4D07e28E9EE6DC715b98f589169d7927239d7318',
      '0x6d82eB95C3c3468E1815242AB375327903E5261e',
      '6',
      '317 Dundas St W, Toronto, ON M5T 1G4, Canada',
      '25000000000000000000',
    ],
  ]

  const registry = await deployProxy(Registry, [], { deployer })
  console.log({ registry: registry.address })

  // eslint-disable-next-line no-restricted-syntax
  for await (const house of houses) {
    console.log({ house })
    const escrow = await deployProxy(Escrow, house, { deployer })
    console.log({ escrow: escrow.address })
    await registry.addEscrow(escrow.address)
  }
}
