import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'
import Navbar from './Navbar';
import Main from './Main';
import './App.css';

class App extends Component {
  
  async componentWillMount() {
    await this.loadweb3()
    //console.log(window.web3)
    await this.loadblockChainData()
  }

  async loadblockChainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance: ethBalance })
    console.log("ethBalance", this.state.ethBalance)

    // Get the token data using the network
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      //  console.log("tokenAddress", tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      console.log("tokenBalance", this.state.tokenBalance.toString())
      this.setState({ tokenBalance: tokenBalance }) 
    }
    else {
      window.alert('Token contract is not deployed on the detected network')
    }

    // Get the ethSwap data using the network
    const ethSwapData = EthSwap.networks[networkId]
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
      console.log(this.state.ethSwap)
    }
    else {
      window.alert('EthSwap contract is not deployed on the detected network')
    }
   
    this.setState({ loading: false })
  }

  async loadweb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ethereum browser detected. You should consider Metamask')
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    //console.log(this.state.account)
    // Manage the loading of page
    let content
    if(this.state.loading) {
      content = <p id="loader"  className='text-center'>Loading...</p>
    }
    else {
      content = <Main />
    }
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
