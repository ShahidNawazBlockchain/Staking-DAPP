"use client"
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/context/Web3Context";
import { ethers} from "ethers";

const RewardRate = () => {
  const {stakingContract} =useContext(Web3Context);
  const [rewardRate , setRewardRate]=useState("0")
  useEffect(()=>{
 const  fetchRewardRate=async()=>{
  try {
    const rewardRate=await stakingContract.REWARD_RATE();
    const rate = ethers.utils.formatUnits(rewardRate.toString(),18);
    setRewardRate(rate)
    console.log(rate)
  } catch (error) {
    console.log(error)
  }
 }
 stakingContract&&fetchRewardRate();
  },[stakingContract])
  return (
    <div>RewardRate:{rewardRate}</div>
  )
}

export default RewardRate