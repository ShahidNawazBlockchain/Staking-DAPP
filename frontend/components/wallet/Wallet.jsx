"use client"
import React, { useState, useEffect } from 'react';
import { connectWallet } from '@/utils/connectWallet';
import Web3Context from "@/context/Web3Context";
import { handleAccountChange } from '@/utils/handleAccountChange';
import { handleChange } from '@/utils/handleChainChange';


const Wallet = () => {
 const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
 });

 const [loading, setLoading] = useState(false);

useEffect(()=>{
 window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
 window.ethereum.on('accountsChanged',()=>handleChange(setState)) 
},[])

 const handleWallet = async () => {
    try {
      setLoading(true);
   
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      console.log(provider, selectedAccount, stakingContract, stakeTokenContract, chainId);
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId });
    } catch (error) {
      console.error("Error connecting wallet", error.message);
    } finally {
      setLoading(false);
    }
 };

 return (
    <Web3Context.Provider value={state}>
      <div>
        <button onClick={handleWallet} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    </Web3Context.Provider>
 );
};

export default Wallet;
