'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import './styles/globals.css'

export default function Page() {
  const [walletAddress, setWalletAddress] = useState('Connect Wallet')
  const [message, setMessage] = useState('Humanity Protocol')
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setWalletAddress(
          accounts[0].substr(0, 4) +
            '...' +
            accounts[0].substr(accounts[0].length - 3, accounts[0].length)
        )
      } catch (error) {
        console.error('Error connecting to wallet:', error)
      }
    } else {
      alert('Please install MetaMask')
    }
  }

  const fetchData = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/v1/human/verify?wallet_address=${walletAddress}`,
        {
          headers: {
            'X-HP-API-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      )

      // if (!response.ok) {
      //   throw new Error('Network response was not ok')
      // }

      const data = await response.json()

      console.log(data)

      // Update message based on API response
      if (data.is_human) {
        setMessage(`Hello human ${data.user_id}`)
      } else {
        setMessage('You are an Asshole')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="layout-container bg-background">
      <div className="layout-header fixed right-[3rem] top-[3rem]">
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-primary rounded-full text-[0.875rem] font-semibold text-white rounded hover:bg-primaryHover"
        >
          {walletAddress}
        </button>
      </div>
      <div className="mx-auto layout-content h-screen w-full flex align-center justify-around items-center">
        <div className="layout-left">
          <h1 className="text-[4rem] font-[200] text-text mb-8">{message}</h1>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-secondary text-black rounded hover:bg-secondaryHover"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Check your humanity'}
          </button>
        </div>
        <div className="layout-right">
          {/* API result will be displayed here */}
        </div>
      </div>
      {/* {walletAddress && (
        <div className="mt-4">
          <p className="text-3xl fixed top-[3rem] left-[3rem]">
            {walletAddress}
          </p>
        </div>
      )} */}
    </div>
  )
}
