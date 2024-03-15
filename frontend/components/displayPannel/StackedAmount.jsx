"use client"
import { useState, useEffect, useContext } from "react";
import Web3Context from "@/context/Web3Context";
import { ethers} from "ethers";

const StackedAmount = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [stakeAmount, setStakedAmount] = useState("0");

    useEffect(() => {
        const fetchStakedBalance = async () => {
            try {
                if (stakingContract && selectedAccount) {
                    const amountStacked = await stakingContract.stakedBalance(selectedAccount);
                   // console.log(amountStacked);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

            stakingContract&&fetchStakedBalance();
    }, [stakingContract, selectedAccount]);

  
};

export default StackedAmount;
