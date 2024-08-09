// import { useState } from 'react'
import React, {useState} from 'react';
import {ethers} from 'ethers';


const App=() => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
      if(window.ethereum) {
          window.ethereum.request({method: 'eth_requestAccounts'})
          .then(result =>{
              accountChanged([result[0]])
          
          })

      } else{
          setErrorMessage('Install MetaMask please!')
      
      }
  };
  const accountChanged = (accountName) => {
      setDefaultAccount(accountName)
      getUserBalance(accountName)
  };
  const getUserBalance = (accountAddress) => {
      window.ethereum.request({method:'eth_getBalance',params: [String(accountAddress),"latest"]})
      .then(balance => {
          setUserBalance(ethers.utils.formatEther(balance));

      })
  };

  async function sendTransaction() {
   let params = [{
      from: "0xD954dCd3B9bB2470495cEF33C984f719f4b8FA00",
      to: "0x6d4a66EB4E4985D4424012999B38C1d475F76b38",
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value: Number(100000000000000).toString(16),    

   }] 
   let result =await window.ethereum.request({method:"eth_sendTransaction",params}).catch((err) =>{
      console.log(err)
   })

  }
  return (
      <div>
      <center>
          <h1>MetaMask Wallet Connecton </h1>
          <button onClick = {connectWallet}>Connect Wallet Button </button>
          <h3>Address: {defaultAccount}</h3>
          <h3>Balance: {userBalance}</h3>

          <form onSubmit={sendTransaction}>
          <input type="submit" value="Submit"/>
          </form>

          {errorMessage}
          </center>
          </div>

   );
};

export default App
