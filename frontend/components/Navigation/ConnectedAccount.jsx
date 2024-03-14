"use client"
import { useContext } from 'react'
import Web3Context from '../../context/Web3Context'
const ConnectedAccount = () => {
        const {selectedAccount}=useContext(Web3Context);
        console.log(selectedAccount)
        return <span>Connected Account:{selectedAccount}</span>
}

export default ConnectedAccount