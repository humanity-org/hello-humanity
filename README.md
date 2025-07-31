# Hello Humanity - Humanity Protocol Examples

This repository contains example implementations for integrating with the Humanity Protocol API.

## Project Structure

- **`client-example/`** - Next.js frontend application demonstrating:
  - Wallet connection with MetaMask
  - Connected wallet verification
  - Arbitrary wallet address verification
  - Real-time console logging of API interactions

- **`server-example/`** - Node.js Express server demonstrating:
  - Server-side API integration
  - Proxy endpoints for wallet verification
  - Proper API key handling

## Features

### Client Example
- Two-panel interface:
  - **Connected Wallet Panel**: Verify the humanity of your connected MetaMask wallet
  - **Arbitrary Wallet Panel**: Check any wallet address without connecting
- Console log display showing real-time API interactions
- Toast notifications for user feedback

### Server Example
- Express.js API server
- `/verify/:walletAddress` endpoint for wallet verification
- `/health` endpoint for server status
- Proper error handling and logging

## Getting Started

### Client Example
```bash
cd client-example
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```

### Server Example
```bash
cd server-example
npm install
cp .env.example .env
# Add your API key to .env
npm start
```


### Key Endpoints
- `GET /v1/human/verify?wallet_address={address}` - Verify if a wallet belongs to a human

### Authentication
All requests require an API key in the `X-HP-API-Key` header.

## Environment Variables

### Client (.env.local)
- `NEXT_PUBLIC_API_KEY` - Your Humanity Protocol API key
- `NEXT_PUBLIC_API_ADDRESS` - API endpoint (default: https://api.humanity.org)

### Server (.env)
- `HP_API_KEY` - Your Humanity Protocol API key
- `HP_API_URL` - API endpoint (default: https://testnet-api.humanity.org)
- `PORT` - Server port (default: 3002)
