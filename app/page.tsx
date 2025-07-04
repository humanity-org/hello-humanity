'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import './styles/globals.css'
import MessageCard from './components/MessageCard'

export default function Page() {
  const [walletAddress, setWalletAddress] = useState()
  const [normalizedAddress, setNormalizedAddress] = useState('Connect Wallet')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setNormalizedAddress(
          accounts[0].substr(0, 4) +
            '...' +
            accounts[0].substr(accounts[0].length - 3, accounts[0].length)
        )
        setWalletAddress(accounts[0])
      } catch (error) {
        console.error('Error connecting to wallet:', error)
      }
    } else {
      alert('Please install MetaMask')
    }
  }

  const fetchData = async () => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/v1/human/verify?${walletAddress}`,
        {
          headers: {
            'X-HP-API-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      )

      const data = await response.json()

      // ? Update message based on API response
      if (data.is_human) {
        setIsSuccess(true)
      } else {
        setIsSuccess(false)
        toast.error('Sorry, you are not a verified human')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
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
          {normalizedAddress}
        </button>
      </div>
      <div className="mx-auto layout-content h-screen w-full flex align-center justify-around items-center">
        <div className="layout-left">
          <h1 className="text-[3.5rem] font-[200] text-text mb-8">
            Hello Humanity Auth
          </h1>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-secondary text-black rounded hover:bg-secondaryHover flex justify-around items-center"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Check your human credential'}
            <span className="ml-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-key-icon lucide-key"
              >
                <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                <path d="m21 2-9.6 9.6" />
                <circle cx="7.5" cy="15.5" r="5.5" />
              </svg>
            </span>
          </button>
        </div>
        <div className="layout-right">
          {
            isSuccess ? <MessageCard isSuccess={isSuccess} /> : null // ? Don't render anything if the fetch is complete and unsuccessful
          }
        </div>
      </div>
    </div>
  )
}
