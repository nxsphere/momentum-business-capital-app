# Cloudflare Deployment Guide

This guide explains how to deploy the Momentum Business Capital landing page to Cloudflare Workers/Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Node.js**: Version 18 or higher
3. **Yarn**: Package manager (already configured)

## Installation

1. Install dependencies:
```bash
yarn install
```

2. Install Wrangler CLI globally (optional, but recommended):
```bash
npm install -g wrangler
```

## Configuration

### 1. Authenticate with Cloudflare

```bash
# Login to your Cloudflare account
wrangler auth login
```

### 2. Configure wrangler.toml

Update the `wrangler.toml` file with your project details:

```toml
name = "momentum-business-capital-landing"  # Change this to your preferred name
compatibility_date = "2024-01-15"
compatibility_flags = ["nodejs_compat"]

[build]
command = "npm run build"

pages_build_output_dir = "dist"

[vars]
# Add environment variables here if needed
# EXAMPLE_VAR = "value"
```

### 3. Environment Variables

For sensitive data, use Wrangler secrets:

```bash
# Set a secret (will be prompted for value)
wrangler secret put API_KEY

# List all secrets
wrangler secret list
```

## Deployment Commands

### Development

```bash
# Local development
npm run dev

# Local development with Cloudflare features
wrangler pages dev dist --port 3000
```

### Build and Deploy

```bash
# Build the application
npm run build

# Deploy to Cloudflare Workers
npm run deploy

# Check deployment without actually deploying
npm run check
```

### Manual Deployment Steps

1. **Build the project**:
```bash
npm run build
```

2. **Deploy to Cloudflare Pages**:
```bash
wrangler pages deploy dist
```

3. **Deploy to Cloudflare Workers** (if using worker functionality):
```bash
wrangler deploy
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare
- `npm run check` - Validate build and deployment configuration
- `npm run cf-typegen` - Generate TypeScript types for Cloudflare bindings
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Page components
├── lib/                # Utility functions
├── worker/             # Cloudflare Worker code
│   └── index.ts        # Worker entry point
└── ...

dist/                   # Built application (generated)
wrangler.toml          # Cloudflare configuration
tsconfig.worker.json   # TypeScript config for worker
```

## Features

### Current Features
- **Static Site Hosting**: React application served via Cloudflare Pages
- **Global CDN**: Fast loading worldwide
- **HTTPS**: Automatic SSL/TLS certificates
- **Custom Domains**: Easy domain configuration

### Available Worker Features (Optional)
- **API Endpoints**: Server-side functionality
- **Form Processing**: Handle form submissions
- **Authentication**: User authentication
- **Database Integration**: Connect to Cloudflare D1 or other databases

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Ensure all dependencies are installed: `yarn install`
   - Check TypeScript errors: `npm run build`

2. **Deployment Errors**:
   - Verify Wrangler authentication: `wrangler whoami`
   - Check wrangler.toml configuration

3. **Worker Issues**:
   - Generate types: `npm run cf-typegen`
   - Check worker logs: `wrangler tail`

### Useful Commands

```bash
# Check Wrangler version
wrangler --version

# View deployment logs
wrangler tail

# List all deployments
wrangler deployments list

# Rollback to previous deployment
wrangler rollback [deployment-id]
```

## Custom Domain Setup

1. **Add domain in Cloudflare Dashboard**:
   - Go to your Cloudflare dashboard
   - Add your domain to Cloudflare
   - Update nameservers

2. **Configure Pages custom domain**:
   - In Cloudflare Pages, go to your project
   - Add custom domain in the settings
   - Configure DNS records

## Security

- **Environment Variables**: Use Wrangler secrets for sensitive data
- **CORS**: Configure CORS headers if needed
- **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Monitoring

- **Analytics**: Available in Cloudflare Dashboard
- **Logs**: Use `wrangler tail` for real-time logs
- **Performance**: Monitor Core Web Vitals in the dashboard

## Support

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/) 