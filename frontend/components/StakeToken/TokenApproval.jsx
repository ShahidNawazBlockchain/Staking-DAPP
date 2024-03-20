"use client"
import { ethers } from 'ethers';
import {useContext,useRef, useState} from 'react'
import Web3Context from '@/context/Web3Context';
const TokenApproval =() => {
    const {stakeTokenContract, stakingContract}=useContext(Web3Context)
    const[transactionStatus,setTransactionStatus]=useState("")
    const approveTokenRef=useRef();
    const approveToken=async(e)=>{
        e.preventDefault();
        const amount=approveTokenRef.current.value.trim();
        if(isNaN(amount)|| amount<=0){
            console.error("Please enter valid positive number");
            return; 
        }
        const amountToSend=ethers.utils.parseUnits(amount,18).toString();
        console.log(amountToSend)
        try {
            const transaction= await stakeTokenContract.approve(stakingContract.address,amountToSend )
            setTransactionStatus("Transaction is pending.........")
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is in successful");
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                approveTokenRef.current.value="";
              }else{
                      setTransactionStatus("Transaction Failed")
                    }
        } catch (error) {
            console.error(error.message)
        }
    }
  return (
    <div>
    {transactionStatus}
    <form onSubmit={approveToken}>
    <lebe>Token Approval:</lebe>
    <input ref={approveTokenRef}/>
    <button onClick={approveToken}  type="submit">Approve Tokens</button>
    </form>
    </div>
  )
}

export default TokenApproval