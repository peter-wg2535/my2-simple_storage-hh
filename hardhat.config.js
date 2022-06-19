require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL
 const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const PRIVATE_KEY =process.env.PRIVATE_KEY 

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42,
    },
    localhost: {
      url: "http://localhost:8545",  // npx hardhat node
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}
