pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "ETH Instant Exchange";
    Token public token; 
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    // public payable function for buying tokens
    function buyTokens() public payable{
        // Calculate number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // Users can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate total amount of ether to redeem
        uint etherAmount = _amount / rate;

        // EthSwap must have enough ether 
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit event 
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}