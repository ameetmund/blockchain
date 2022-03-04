### This is the project to build blockchain smart contract using ethereum platform

> _This will follow ERC20 standards for balance check, approve, transfer functionalities. For details about ERC20, please visit https://ethereum.org/en/developers/docs/standards/tokens/erc-20/_

> 1. _truffle-config.js_ - This is the entry point to the application. This where we specify the connection to the blockchain and development network that connects to ganache. This also shows which compilers we are using and what is the location for our smart     contracts
> 2. _/src/components/App.js_ - React.js code for client side applications
> 3. _/src/contracts/Migrations.sol_ -  Default smart contract that comes with truffle project. Helps to deploy other smart contracts into the blockchain. 
> 4. /migrations/1_initial_migration.js - Migrations to put the default smart contract on the blockchain
> 5. _package.json_ - Project specific dependencies in order to build the project 
> 6. _EthSwap.sol_ - Smart contract for the EthSwap exchange
> 7. /migrations/_2_deploy_contracts.js - Migrations to put smart contract for EthSwap and Token into blockchain. This helps to change the state of the contract to the latest one. 
> 8. _Token.sol_ - Smart contract for the new cypto currency that is going to be used for swap with Ethereum
