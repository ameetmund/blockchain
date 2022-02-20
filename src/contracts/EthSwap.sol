pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "ETH Instant Exchange";
    Token public token; 
    uint public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    // public payable function
    function buyTokens() public payable{
        // Calculate number of tokens to buy
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}