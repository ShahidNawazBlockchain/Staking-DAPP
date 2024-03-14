"use client"
import React from 'react'
import { useContext } from 'react';
import Web3Context from '@/context/Web3Context';

const ConnectedNetwork = () => {
    const{chainId}=useContext(Web3Context)

  return (
    <div>ConnectedNetwork:{chainId===11155111?"Sepolia":"Other"}</div>
  )
}

export default ConnectedNetwork