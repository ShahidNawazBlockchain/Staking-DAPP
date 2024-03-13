// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract RewardToken is ERC20{
constructor(uint256 initialSupply)  ERC20("Reward","RWD"){
    _mint(msg.sender,initialSupply*10**18);
}
}