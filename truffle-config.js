require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: process.env.GANACHE_PORT || 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.ROPSTEN_PRIVATE_KEY,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
        ),
      network_id: 3, // Ropsten's id
      gas: 7500000,
      gasPrice: 10000000000,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.RINKEBY_PRIVATE_KEY,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        ),
      network_id: 4, // Rinkeby's id
      gas: 9000000,
      gasPrice: 10000000000,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(process.env.KOVAN_PRIVATE_KEY, `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 42, // Kovan's id
      gas: 12000000,
      gasPrice: 10000000000,
    },
    main: {
      provider: () =>
        new HDWalletProvider(
          process.env.MAINNET_PRIVATE_KEY,
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        ),
      network_id: 1,
      gas: 12000000,
      gasPrice: 10000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.6.12', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
}
