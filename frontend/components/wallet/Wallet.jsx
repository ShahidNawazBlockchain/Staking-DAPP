"use client"
import React, { useState, useEffect } from 'react';
import { connectWallet } from '@/utils/connectWallet';

const Wallet = () => {
 const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
 });

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const handleWallet = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous error
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      console.log(provider, selectedAccount, stakingContract, stakeTokenContract, chainId);
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId });
    } catch (error) {
      console.error("Error connecting wallet", error.message);
      setError(error.message); // Set the error message to state
    } finally {
      setLoading(false);
    }
 };



 return (
    <div>
      <button onClick={handleWallet} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
 );
};

export default Wallet;
