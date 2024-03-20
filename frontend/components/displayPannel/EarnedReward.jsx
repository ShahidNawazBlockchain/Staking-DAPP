"use client"
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/context/Web3Context";
import { ethers} from "ethers";

const EarnedReward = () => {
  const {stakingContract ,selectedAccount}=useContext(Web3Context);
  const [earn , setEarn]=useState("0")
  useEffect(()=>{
 const  fetchEearn=async()=>{
  try {
    const EarnedReward=await stakingContract.earned(selectedAccount);
    const earned = ethers.utils.formatUnits(EarnedReward.toString(),18);
    setEarn(earned)
    console.log(earned)
  } catch (error) {
    console.log(error.message)
  }
 }
 stakingContract&&fetchEearn();
  },[stakingContract])
  return (
    <div>Earn Reward:{earn}</div>
  )
}

export default EarnedReward