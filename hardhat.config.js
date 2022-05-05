/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "";
const ROPSTEN_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.9",

  networks: {
    ropsten: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};

// Useful Commands
// To install hardhat - npm install --save-dev hardhat
// To run hardhat - npx hardhat
// To install chai and others - npm install --save-dev @nomiclabs/hardhat-ethers ethers // npx hardhat compile
// To run testcases - npx hardhat test
// To deploy contract on test/mainnet - npx hardhat run scripts/deploy.js --network ropsten