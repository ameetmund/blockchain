const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

// Function to convert tokens to wei(compared to cents)
function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

// Deployer - First account within ganache
// Investor - Other accounts in ganache. It's used to buy tokens.
contract('EthSwap', ([deployer, investor]) => {

    let token, ethSwap

    // Common code. Pass the token address to the EthSwap, so that it
    // can use it for buy or sell later. 
    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        // Tranfer 1 million tokens
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    // Test to check Token
    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })    
    })

    // Test to check EthSwap
    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, 'ETH Instant Exchange')
        })
        
        it('contract has token', async () => {
            let balance = await token.balanceOf(ethSwap.address)
            // Test balance for 1 million tokens
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    // Test for buyTokens functionality
    describe('buyTokens()', async () => {
        let result

        // Common code 
        // from: represents the msg.sender in EthSwap.sol 
        // value: represents the msg.value in EthSwap.sol
        before(async () => {
            // Purchase tokens
            result = await ethSwap.buyTokens({ from: investor, value: tokens('1')})
        })

        it('Allows users to instantly purchase tokens from ethSwap for a fixed price', async () => {
            // Check investor token balance
            // Investor balance will go up by 100 tokens
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            // Check ethSwap balance after purchase
            // EthSwap exchange balance will go down by 100 tokens
            // Ether value will go down by 1 eth
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1'))

            // Print the event logs
            console.log(result.logs[0])

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })
    })

    // Test for sellTokens functionality
    describe('sellTokens()', async () => {
        let result

        // Common code 
        before(async () => {
            // Investors must approve the tokens before the purchase
            await token.approve(ethSwap.address, tokens('100'), { from: investor})

            // Investor sells tokens
            result = await ethSwap.sellTokens(tokens('100'), { from: investor})
        })

        it('Allows users to instantly sell tokens to ethSwap for a fixed price', async () => {
            // Check investor token balance
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('0'))

            // Check ethSwap balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('0'))

            // Print the logs
            console.log(result.logs[0])

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100') 

            // FAILURE: Investors can't sell more tokens than they have
            //await ethSwap.sellTokens(tokens('500'), {from: investor}).should.be.rejected;
        })  
    })


})