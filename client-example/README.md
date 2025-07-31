# Humanity Protocol Client Example

A Next.js application demonstrating client-side integration with the Humanity Protocol API for wallet verification.

## Features

- **Dual Verification Modes**:
  - Connected wallet verification via MetaMask
  - Arbitrary wallet address verification (pre-populated with example: `0xdead00000000000000000000000000000000beef`)
- **Real-time Console Logging**: Track all API interactions with timestamped logs
- **Toast Notifications**: User-friendly feedback for all actions
- **Responsive Design**: Two-panel layout with dark theme

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- MetaMask browser extension (for connected wallet verification)
- Humanity Protocol API key

## Setup Instructions

### 1. Install Dependencies

```bash
cd client-example
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_API_ADDRESS=https://api.humanity.org
```

**Important**: 
- Replace `your_actual_api_key_here` with your Humanity Protocol API key
- For testnet, use `https://testnet-api.humanity.org`

### 3. Run the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The application will be available at `http://localhost:3001`

## Usage Guide

### Connected Wallet Verification

1. Click "Connect Wallet" button in the top-right corner
2. Approve MetaMask connection request
3. Click "Check your human credential" to verify your connected wallet
4. View results in the panel and console logs

### Arbitrary Wallet Verification

1. Enter any wallet address in the right panel (or use the pre-filled example)
2. Click "Verify Address"
3. View verification results below the input
4. Check console logs for detailed API interactions

### Console Logs

The console at the bottom displays:
- **Blue (INFO)**: General information and API requests
- **Green (SUCCESS)**: Successful operations
- **Yellow (WARNING)**: Non-critical issues
- **Red (ERROR)**: Failed operations

## Project Structure

```
client-example/
├── app/
│   ├── components/
│   │   ├── ConsoleLog.tsx      # Console log display component
│   │   └── MessageCard.tsx     # Success message component
│   ├── styles/
│   │   └── globals.css         # Global styles and Tailwind config
│   ├── layout.tsx              # Root layout with toast provider
│   └── page.tsx                # Main application page
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## API Integration

The client integrates with Humanity Protocol API v1:

```javascript
// Endpoint
GET https://api.humanity.org/v1/human/verify?wallet_address={address}

// Headers
X-HP-API-Key: your_api_key

// Response
{
  "wallet_address": "0x...",
  "is_human": true/false,
  "user_id": "user_123" // if verified
}
```

## Troubleshooting

### MetaMask Not Detected
- Ensure MetaMask is installed and enabled
- Refresh the page after installing MetaMask
- Check browser console for specific errors

### API Key Issues
- Verify your API key is correctly set in `.env.local`
- Ensure the file is named `.env.local` (not `.env`)
- Restart the development server after changing environment variables

### CORS Errors
- The API supports CORS for client-side requests
- If issues persist, consider using the server example as a proxy

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_KEY` | Your Humanity Protocol API key | - | Yes |
| `NEXT_PUBLIC_API_ADDRESS` | API endpoint URL | `https://api.humanity.org` | Yes |

## Security Notes

- Never commit `.env.local` to version control
- API keys are exposed to the client - use server-side proxy for production
- Consider implementing rate limiting for production use

## Links

- [Humanity Protocol Documentation](https://docs.humanity.org)
- [API Reference](https://api.humanity.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)