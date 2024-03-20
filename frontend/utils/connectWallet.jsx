import { ethers, Contract,BrowserProvider } from "ethers";
import StakingABI from "../ABI/stakingABI.json";
import StakeTokenABI from "../ABI/stakeTokenABI.json";
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if (accounts.length === 0) {
            throw new Error("No Ethereum account is available");
        }

        const chainIdHex = await window.ethereum.request({
            method: "eth_chainId"
        });
        const chainId = parseInt(chainIdHex, 16);
        const selectedAccount = accounts[0];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const stakingContractAddress = "0x4a0f25b3d6Bb5d72c47054d104739ff9402d1988";
        const stakeTokenAddress = "0x6aE2BD2C4452A8Fce62830c7F114CCE3C35d87A9";

        const stakingContract = new Contract(stakingContractAddress, StakingABI, signer);
        const stakeTokenContract = new Contract(stakeTokenAddress, StakeTokenABI, signer);

        return { provider, selectedAccount, stakeTokenContract, stakingContract, chainId };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
