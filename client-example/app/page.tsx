'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import './styles/globals.css'
import MessageCard from './components/MessageCard'
import ConsoleLog from './components/ConsoleLog'

interface LogEntry {
  timestamp: string;
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}

export default function Page() {
  const [walletAddress, setWalletAddress] = useState<string>()
  const [normalizedAddress, setNormalizedAddress] = useState('Connect Wallet')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [arbitraryAddress, setArbitraryAddress] = useState('0xdead00000000000000000000000000000000beef')
  const [arbitraryLoading, setArbitraryLoading] = useState(false)
  const [arbitraryResult, setArbitraryResult] = useState<any>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const addLog = (type: LogEntry['type'], message: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setLogs(prev => [...prev, newLog]);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        addLog('info', 'Requesting wallet connection...');
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const address = accounts[0];
        setNormalizedAddress(
          address.substr(0, 4) + '...' + address.substr(address.length - 3, address.length)
        )
        setWalletAddress(address)
        addLog('success', `Wallet connected: ${address}`);
      } catch (error: any) {
        addLog('error', `Failed to connect wallet: ${error.message}`);
        console.error('Error connecting to wallet:', error)
      }
    } else {
      addLog('warning', 'MetaMask not detected. Please install MetaMask.');
      alert('Please install MetaMask')
    }
  }

  const fetchData = async () => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first')
      addLog('warning', 'Wallet not connected');
      return
    }

    setLoading(true)
    addLog('info', `Verifying wallet: ${walletAddress}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/v1/human/verify?wallet_address=${walletAddress}`,
        {
          headers: {
            'X-HP-API-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      )

      const data = await response.json()
      addLog('info', `API Response: ${JSON.stringify(data)}`);

      if (data.is_human) {
        setIsSuccess(true)
        addLog('success', 'Wallet verified as human!');
      } else {
        setIsSuccess(false)
        addLog('warning', 'Wallet not verified as human');
        toast.error('Sorry, your wallet cannot be verified as owned by a human')
      }
    } catch (error: any) {
      addLog('error', `API Error: ${error.message}`);
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const verifyArbitraryWallet = async () => {
    if (!arbitraryAddress) {
      toast.error('Please enter a wallet address')
      addLog('warning', 'No wallet address entered');
      return
    }

    setArbitraryLoading(true)
    addLog('info', `Verifying arbitrary wallet: ${arbitraryAddress}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/v1/human/verify?wallet_address=${arbitraryAddress}`,
        {
          headers: {
            'X-HP-API-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      )

      const data = await response.json()
      setArbitraryResult(data)
      addLog('info', `API Response: ${JSON.stringify(data)}`);
      
      if (data.is_human) {
        addLog('success', `Wallet ${arbitraryAddress} verified as human!`);
        toast.success('Wallet verified as human!')
      } else {
        addLog('warning', `Wallet ${arbitraryAddress} not verified as human`);
        toast.error('Wallet not verified as human')
      }
    } catch (error: any) {
      addLog('error', `API Error: ${error.message}`);
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    } finally {
      setArbitraryLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed right-[3rem] top-[3rem] z-10">
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-primary rounded-full text-[0.875rem] font-semibold text-white rounded hover:bg-primaryHover"
        >
          {normalizedAddress}
        </button>
      </div>
      
      <div className="container mx-auto px-8 pt-24 pb-8">
        <h1 className="text-[3.5rem] font-[200] text-text mb-12 text-center">
          Hello Humanity Auth
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Connected Wallet Verification</h2>
            <p className="text-gray-400 mb-6">Connect your wallet and verify your humanity</p>
            
            <button
              onClick={fetchData}
              className="w-full px-4 py-3 bg-secondary text-black rounded hover:bg-secondaryHover flex justify-center items-center"
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
            
            {isSuccess && (
              <div className="mt-6">
                <MessageCard isSuccess={isSuccess} />
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Arbitrary Wallet Check</h2>
            <p className="text-gray-400 mb-6">Enter any wallet address to verify</p>
            
            <input
              type="text"
              value={arbitraryAddress}
              onChange={(e) => setArbitraryAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            <button
              onClick={verifyArbitraryWallet}
              className="w-full px-4 py-3 bg-primary text-white rounded hover:bg-primaryHover"
              disabled={arbitraryLoading}
            >
              {arbitraryLoading ? 'Verifying...' : 'Verify Address'}
            </button>
            
            {arbitraryResult && (
              <div className="mt-6 p-4 bg-gray-700 rounded">
                <h3 className="text-white font-semibold mb-2">Result:</h3>
                <p className="text-gray-300">
                  Address: {arbitraryResult.wallet_address}
                </p>
                <p className="text-gray-300">
                  Is Human: <span className={arbitraryResult.is_human ? 'text-green-400' : 'text-red-400'}>
                    {arbitraryResult.is_human ? 'Yes' : 'No'}
                  </span>
                </p>
                {arbitraryResult.user_id && (
                  <p className="text-gray-300">User ID: {arbitraryResult.user_id}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <ConsoleLog logs={logs} />
      </div>
    </div>
  )
}
