import React from 'react'
import EarnedReward from './EarnedReward'
import RewardRate from './RewardRate'
import StackedAmount from './StackedAmount'

const DisplayPannel = () => {
  return (
    <div>
    <StackedAmount/>
    <EarnedReward/>
    <RewardRate/>
    </div>
  )
}

export default DisplayPannel