require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider'); //HDWalletProvide unlocks your account to deploy to any Network you want
const { Web3 } = require('web3'); // Web3 is a library that allows us to interact with the Ethereum network
const { interface, bytecode } = require('./compile'); // interface is the ABI, bytecode is the actual contract

// We are using the HDWalletProvider to unlock our account and connect to the network
const provider = new HDWalletProvider(
  process.env.SECRET_WALLET_MNEMONIC,
  process.env.INFURA_URL
);

// We are using the Web3 library to connect to the network
const web3 = new Web3(provider);

// We are using the deploy function to deploy our contract to the network
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
