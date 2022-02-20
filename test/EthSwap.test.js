const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

// Function to convert tokens to wei(compared to cents)
function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}
contract('EthSwap', ([deployer, investor]) => {

    let token, ethSwap

    // Common code 
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

    describe('buyTokens()', async () => {
        it('Allows users to instantly purchase tokens from ethSwap for a fixed price', async () => {
            await ethSwap.buyTokens({ from: investor, value: tokens('4')})
        })
    })


})