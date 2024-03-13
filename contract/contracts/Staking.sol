// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
    using SafeMath for uint256;
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint public  constant REWARD_RATE=10;
    uint private  totalStakedToken;
    uint public  rewardPerTokenStored; 
    uint public  lastUpdateTime;


    mapping (address=>uint) public  stakedBalance;
    mapping (address=>uint) public  rewards;
    mapping (address=>uint) public userRewardPerTokenPaid;

    event Staked(address indexed user,uint256 indexed amount);
    event Withdrawn(address indexed  user,uint256 indexed amount);
    event RewardClaimed(address indexed user,uint256 amount);

    constructor(address _stakingToken,address _rewardToken){
     s_stakingToken=IERC20(_stakingToken);
     s_rewardToken=IERC20(_rewardToken);
    }

    function rewardPertoken() public  view returns (uint){
        if(totalStakedToken==0){
            return  rewardPerTokenStored;
        }
        uint totalTime=block.timestamp - lastUpdateTime;
        uint totalRewards=REWARD_RATE*totalTime;
        return rewardPerTokenStored+  totalRewards/totalStakedToken;
    }
    function earned(address account)public view returns (uint){
        return (stakedBalance[account])*(rewardPertoken()-userRewardPerTokenPaid[account]);
    }
    modifier updatereward(address account){
        rewardPerTokenStored= rewardPertoken();
        lastUpdateTime=block.timestamp;
        rewards[account]=earned((account));
        userRewardPerTokenPaid[account]=rewardPerTokenStored;
        _;
    }

    function stake(uint amount) external nonReentrant updatereward(msg.sender){
    require(amount>0,"An amount must be greater than zero");
    totalStakedToken+=amount;
    stakedBalance[msg.sender]+=amount;
    emit Staked(msg.sender,amount);
    bool success=s_stakingToken.transferFrom(msg.sender, address(this), amount);
    require( success,"transferr Fail");
    }

    function withdrawn(uint amount)external nonReentrant updatereward(msg.sender){
     require(amount>0,"Amount must be greater than zero");
     totalStakedToken-=amount;
     stakedBalance[msg.sender]-=amount;
     emit Withdrawn(msg.sender, amount);
     bool success=s_stakingToken.transfer(msg.sender,amount);
     require(success,"Transfer amount fain");
    }

    function getReward() external nonReentrant updatereward(msg.sender){
     uint reward=rewards[msg.sender];
     require(reward>0,"no reward to claim or get");
     rewards[msg.sender]=0;
     emit RewardClaimed(msg.sender, reward);
     bool success = s_rewardToken.transfer(msg.sender, reward);
    require(success,"Transfer Failed");
    }
}