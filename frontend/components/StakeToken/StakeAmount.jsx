"use client"
import { ethers } from 'ethers';
import {useContext,useRef, useState} from 'react'
import Web3Context from '@/context/Web3Context';
const StakeAmount = () => {
    const {stakingContract}=useContext(Web3Context)
    const[transactionStatus,setTransactionStatus]=useState("")
    const stakeTokenRef=useRef();
    const stakeToken=async(e)=>{
        e.preventDefault();
        const amount=stakeTokenRef.current.value.trim();
        if(isNaN(amount)|| amount<=0){
            console.error("Please enter valid positive number");
            return; 
        }
        const amountToSend=ethers.utils.parseUnits(amount,18).toString();
        console.log(amountToSend)
        try {
            const transaction= await stakingContract.stake(amountToSend)
            setTransactionStatus("Transaction is pending.........")
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is in successful");
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                stakeTokenRef.current.value="";
              }else{
                      setTransactionStatus("Transaction Failed")
                    }
        } catch (error) {
            console.error(error.message)
        }
    }
  return (
    <div>{transactionStatus}
    <form onSubmit={stakeToken}>
    <lebe>Token Stake:</lebe>
    <input ref={stakeTokenRef}/>
    <button onClick={stakeToken}  type="submit">stake Tokens</button>
    </form>
    </div>
  )
}
export default StakeAmount