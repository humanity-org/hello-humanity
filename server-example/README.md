# Humanity Protocol Server Example

A Node.js Express server demonstrating server-side integration with the Humanity Protocol API, featuring Swagger documentation and proper error handling.

## Features

- **RESTful API Endpoints**: Proxy endpoints for Humanity Protocol API
- **Swagger UI Documentation**: Interactive API testing interface
- **Environment Configuration**: Secure API key management
- **Error Handling**: Comprehensive error messages and logging
- **CORS Support**: Enabled for cross-origin requests
- **Request Logging**: Timestamped console output for debugging

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Humanity Protocol API key

## Setup Instructions

### 1. Install Dependencies

```bash
cd server-example
npm install
```

### 2. Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:

```env
HP_API_KEY=your_actual_api_key_here
HP_API_URL=https://api.humanity.org
PORT=3002
```

**Important Configuration Notes**:
- Replace `your_actual_api_key_here` with your actual Humanity Protocol API key
- For testnet, use `HP_API_URL=https://testnet-api.humanity.org`
- Default port is 3002 to avoid conflicts with client example

### 3. Run the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3002`

## API Documentation

### Swagger UI

Once the server is running, access the interactive Swagger documentation at:
```
http://localhost:3002/api-docs
```

The Swagger UI provides:
- Interactive API testing interface
- Complete request/response documentation
- Schema definitions and examples
- Pre-populated example wallet: `0xdead00000000000000000000000000000000beef`

### Available Endpoints

#### 1. Verify Wallet Address
```
GET /verify/:walletAddress
```

Verifies if a wallet address belongs to a human.

**Parameters:**
- `walletAddress` (path parameter): The wallet address to verify (EIP-55 compliant)

**Example Request:**
```bash
curl -X GET "http://localhost:3002/verify/0xdead00000000000000000000000000000000beef" \
  -H "accept: application/json"
```

**Success Response (200):**
```json
{
  "wallet_address": "0xdead00000000000000000000000000000000beef",
  "is_human": true,
  "user_id": "user_123456",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "server": "humanity-protocol-server-example"
}
```

**Error Response (500):**
```json
{
  "error": "Server configuration error",
  "message": "API key not configured. Please check your .env file."
}
```

#### 2. Health Check
```
GET /health
```

Returns the server status and configuration.

**Example Request:**
```bash
curl -X GET "http://localhost:3002/health" \
  -H "accept: application/json"
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "apiUrl": "https://api.humanity.org"
}
```

## Project Structure

```
server-example/
├── index.js            # Main server file with routes and Swagger docs
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md          # This file
```

## Error Handling

The server provides detailed error messages for common issues:

1. **Missing Environment Variables**
   - Clear error messages indicating which variable is missing
   - Instructions to check `.env` file

2. **API Errors**
   - Forwards Humanity Protocol API errors with proper status codes
   - Adds server timestamp and identifier

3. **Network Errors**
   - Catches and logs connection failures
   - Returns user-friendly error messages

## Console Output

The server logs all operations with timestamps:

```
[2024-01-01T12:00:00.000Z] Verifying wallet: 0xdead00000000000000000000000000000000beef
[2024-01-01T12:00:00.100Z] Making request to: https://api.humanity.org/v1/human/verify?wallet_address=0xdead00000000000000000000000000000000beef
[2024-01-01T12:00:00.500Z] Response: { wallet_address: '0xdead...', is_human: true, user_id: 'user_123' }
```

## Security Considerations

1. **API Key Protection**
   - Never commit `.env` file to version control
   - Use environment variables for all sensitive data
   - Consider using secrets management in production

2. **Rate Limiting**
   - Implement rate limiting for production use
   - Monitor API usage to prevent abuse

3. **Input Validation**
   - The example trusts wallet address format validation to the Humanity Protocol API
   - Consider adding EIP-55 checksum validation for production

## Troubleshooting

### Server Won't Start

1. Check if port 3002 is already in use:
   ```bash
   lsof -i :3002
   ```

2. Change port in `.env` file if needed

### API Key Errors

1. Verify `.env` file exists (not just `.env.example`)
2. Check API key format and validity
3. Ensure no extra spaces or quotes in `.env` file

### Invalid URL Error

This indicates missing environment variables. Check:
1. `.env` file exists and is properly formatted
2. Server was restarted after creating `.env`
3. No typos in variable names

### Connection Errors

1. Check network connectivity
2. Verify API URL is correct (mainnet vs testnet)
3. Check if API key has proper permissions

## Development Tips

1. **Adding New Endpoints**
   - Add route handler in `index.js`
   - Add Swagger documentation above the handler
   - Update schema definitions if needed

2. **Testing**
   - Use Swagger UI for quick testing
   - Monitor console logs for debugging
   - Test with various wallet addresses

3. **Production Deployment**
   - Use process manager like PM2
   - Set up proper logging (consider Winston)
   - Implement monitoring and alerts

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `HP_API_KEY` | Your Humanity Protocol API key | - | Yes |
| `HP_API_URL` | Humanity Protocol API endpoint | `https://api.humanity.org` | Yes |
| `PORT` | Server port | `3002` | No |

## Links

- [Humanity Protocol Documentation](https://docs.humanity.org)
- [API Reference](https://api.humanity.org/docs)
- [Express.js Documentation](https://expressjs.com)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)