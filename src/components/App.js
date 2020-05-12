import React, { Component } from "react";
import Web3 from "web3";
import Token from "../abis/Token.json";
import PikaSwap from "../abis/PikaSwap.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    // console.log(window.web3);
    await this.loadBlockChainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    // console.log(window.web3);
  }

  async loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    console.log(this.state.account);

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });
    console.log(this.state.ethBalance);

    //load token
    const abi = Token.abi;
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const address = tokenData.address;
      const token = new web3.eth.Contract(abi, address);
      this.setState({ token });

      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      console.log(tokenBalance.toString());
      this.setState({
        tokenBalance: tokenBalance.toString(),
      });
    } else {
      window.alert("Token contract not deployed to detected network");
    }

    // load PikaSwap
    const pikaSwapData = PikaSwap.networks[networkId];
    if (pikaSwapData) {
      const pikaSwap = new web3.eth.Contract(
        PikaSwap.abi,
        pikaSwapData.address
      );
      this.setState({ pikaSwap });
    } else {
      window.alert("PikaSwap contract not deployed to detected network");
    }
    // console.log(this.state.pikaSwap);
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      pikaSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
      loading: true,
    };
  }



  render() {

    let content;

    if (this.state.loading) {
      content = (
        <p id='loader' className='text-center'>
          Loading...
        </p>
      );
    } else {
      content = (
        <p >
          pikaexchange
        </p>
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className='container-fluid mt-5'>
          <div className='row'>
            <main role='main' className='col-lg-12 d-flex text-center'>
              <div className='content mr-auto ml-auto'>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
