### This is the project to build blockchain smart contract using ethereum platform

> _This will follow ERC20 standards for balance check, approve, transfer functionalities. For details about ERC20, please visit https://ethereum.org/en/developers/docs/standards/tokens/erc-20/_

### Description of each component
> 1. _truffle-config.js_ - This is the entry point to the application. This where we specify the connection to the blockchain and development network that connects to ganache. This also shows which compilers we are using and what is the location for our smart     contracts
> 2. _/src/components/App.js_ - React.js code for client side applications
> 3. _/src/contracts/Migrations.sol_ -  Default smart contract that comes with truffle project. Helps to deploy other smart contracts into the blockchain. 
> 4. /migrations/1_initial_migration.js - Migrations to put the default smart contract on the blockchain
> 5. _package.json_ - Project specific dependencies in order to build the project 
> 6. _EthSwap.sol_ - Smart contract for the EthSwap exchange
> 7. /migrations/_2_deploy_contracts.js - Migrations to put smart contract for EthSwap and Token into blockchain. This helps to change the state of the contract to the latest one. 
> 8. _Token.sol_ - Smart contract for the new cypto currency that is going to be used for swap with Ethereum
> 9. _test/EthSwap.test.js_ - File to write test cases in javascript. Solidity smart contract test will be done using this. The testings are carried out with the help of 'chai assertion library' which is added to the code.

### Working steps
> - _test the codes using EthSwap.test.js_ - Ensure that the code functionality is tested usin test.js. This is by following TDD approach. 
> - _set up front end_ -
>   - _connect browser to blockchain_ - Use Metamask to connect the browser to blockchain. The reason for this is web browser doesn't talk to the blockchain directly. So this browser extension helps to achieve that. Set up ganache test network by choosing the private key for one of the accounts.
>   - _connect app to blockchain_ - We will do this by using web3. It works with the concept of an ethereum provider. Metamask connects to an ethereum node and talk to the blockchain, and it does that using ganache, and then metamask exposes that as a provider to web3 library. 
>     - _loadweb3_ - load web3 in App.js
>     - _loadblockchaindata_ - Get all the account details through metamask account that is connected.
>     - _set the state variables_ - create a constructor functions to set the state of the variables like account, tokens etc to a default value.
>     - _create Navbar.js_ - Create Navbar.js and add features to show account and identicon. Add Navbar in App.js 
>     - _import smart contracts_ - Import EthSwap and Token abis files into App.js to, which will allow the front end to interact with smart contracts. 
```Javascript 
Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
``` 
