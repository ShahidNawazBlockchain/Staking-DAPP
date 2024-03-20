"use client"
import { ethers } from 'ethers';
import {useContext,useRef, useState} from 'react'
import Web3Context from '@/context/Web3Context';

const Withdraw = () => {
    const {stakingContract}=useContext(Web3Context)
    const[transactionStatus,setTransactionStatus]=useState("")
    const withdrawTokenRef=useRef();
    const withdrawToken=async(e)=>{
        e.preventDefault();
        const amount=withdrawTokenRef.current.value.trim();
        if(isNaN(amount)|| amount<=0){
            console.error("Please enter valid positive number");
            return; 
        }
        const amountToSend=ethers.utils.parseUnits(amount,18).toString();
        console.log(amountToSend)
        try {
            const transaction= await stakingContract.withdrawn(amountToSend)
            setTransactionStatus("Transaction is pending.........")
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is in successful");
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                withdrawTokenRef.current.value="";
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
    <form onSubmit={withdrawToken}>
    <lebe>Token Withdraw:</lebe>
    <input ref={withdrawTokenRef}/>
    <button onClick={withdrawToken}  type="submit">Withdrawn Tokens</button>
    </form>
    </div>
  )
}
export default Withdraw