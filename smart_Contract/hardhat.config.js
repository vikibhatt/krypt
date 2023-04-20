require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    Goerli : {
      url: "https://eth-goerli.g.alchemy.com/v2/o_aXJ86Owol6Se2oQi8uFdZCeIBhIrQH",
      accounts: ["27a8e10f4c13abbfe2f43d47a9c0269be415128bb96bd05734a783be74ede6da"]
    }
  }
};
