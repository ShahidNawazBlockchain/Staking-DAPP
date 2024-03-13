const hre = require("hardhat");
async function main() {

  
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
 const unlockTime = currentTimestampInSeconds + 60;
  // const unlockTime = 1710193808;
  const initialSupply = 10000;
   const lockedAmount = hre.ethers.utils.parseEther("0.001");
   const StakeToken = await hre.ethers.deployContract("StackToken",[initialSupply]);
   await StakeToken.deployed()
   console.log(
    `StakeToken with ${hre.ethers.utils.formatEther(
      lockedAmount
    )} ETH and  timestamp ${unlockTime} is deployed to ${StakeToken.address}`
  );
  const StakeTokenAddress=StakeToken.address;
  console.log("verification process...")

  await run("verify:verify", {
    address: StakeTokenAddress,
    contract: "contracts/StakeToken.sol:StackToken", 
    constructorArguments: [initialSupply],
});



   const RewardToken = await hre.ethers.deployContract("RewardToken",[initialSupply]);
   await RewardToken.deployed()
   console.log(
    `RewardToken with ${hre.ethers.utils.formatEther(
      lockedAmount
    )} ETH and  timestamp ${unlockTime} is deployed to ${RewardToken.address}`
  );
  const RewardTokenAddress=RewardToken.address;
  console.log("verification process...")

  await run("verify:verify", {
    address: RewardTokenAddress,
    contract: "contracts/RewardToken.sol:RewardToken", 
    constructorArguments: [initialSupply],
});


  const Staking = await hre.ethers.deployContract("Staking",[StakeTokenAddress, RewardTokenAddress]);
  await Staking.deployed()
  console.log(
    `Stake contract with ${hre.ethers.utils.formatEther(
      lockedAmount
    )} ETH and  timestamp ${unlockTime} is deployed to ${Staking.address}`
  );


  console.log("verification process...")

  await run("verify:verify", {
    address: Staking.address,
    contract: "contracts/Staking.sol:Staking", 
    constructorArguments: [StakeTokenAddress, RewardTokenAddress],
});
 
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
