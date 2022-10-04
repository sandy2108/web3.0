//https://eth-goerli.g.alchemy.com/v2/HiA6LelA4XSE7LpQl8_ZqN3EJ15sLVBs

require('@nomiclabs/hardhat-waffle'); //hardhat waffle it is plugin to build smart contracts

module.exports = {
  solidity: '0.8.0',
  networks:{
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/HiA6LelA4XSE7LpQl8_ZqN3EJ15sLVBs',
      accounts:['6a5f9560ef32c5769317a952c657f570268e4d1927ddb213b4a8577607ccfaac']
    }
  }
}
