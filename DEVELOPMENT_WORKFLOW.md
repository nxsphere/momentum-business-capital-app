# Development Workflow Guide

This document outlines the development workflow for the Momentum Business Capital application.

## Repository Structure

🔗 **GitHub Repository**: https://github.com/nxsphere/momentum-business-capital-app

### Branch Strategy

- **`main`** - Production branch (protected)
  - Contains stable, production-ready code
  - Auto-deploys to: https://momentum-business-capital-landing.shy-math-4d31.workers.dev
  - Requires pull request reviews

- **`dev`** - Development branch
  - Active development work
  - Auto-deploys to: https://momentum-business-capital-app-dev.shy-math-4d31.workers.dev
  - All feature branches merge here first

## Development Workflow

### 🔄 Standard Development Process

1. **Start on dev branch**:
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create feature branch** (optional for small changes):
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Edit code, add features, fix bugs
   - Test locally with `npm run dev`
   - Build and test with `npm run build`

4. **Commit and push to dev**:
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   git checkout dev  # if on feature branch
   git merge feature/your-feature-name  # if on feature branch
   git push origin dev
   ```

5. **Automatic deployment to dev environment**:
   - GitHub Actions automatically deploys to dev environment
   - Test at: https://momentum-business-capital-app-dev.shy-math-4d31.workers.dev

6. **When ready for production**:
   ```bash
   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

7. **Automatic production deployment**:
   - GitHub Actions automatically deploys to production
   - Live at: https://momentum-business-capital-landing.shy-math-4d31.workers.dev

## Environment Configuration

### Development Environment
- **Worker Name**: `momentum-business-capital-app-dev`
- **Environment**: `development`
- **Email Recipient**: Uses `dev-leads@momentumbusiness.capital` (from config file)
- **Secrets**: `RESEND_API_KEY_DEV`

### Production Environment
- **Worker Name**: `momentum-business-capital-landing`
- **Environment**: `production`
- **Email Recipient**: Uses `leads@momentumbusiness.capital` (from config file)
- **Secrets**: `RESEND_API_KEY_PROD`

## GitHub Actions Workflows

### Development Deployment (`.github/workflows/deploy-dev.yml`)
- **Triggers**: Push to `dev` branch, Pull requests to `dev`
- **Actions**:
  - Install dependencies
  - Build application
  - Deploy to Cloudflare Workers dev environment
  - Comment on pull requests with preview URL

### Production Deployment (`.github/workflows/deploy-production.yml`)
- **Triggers**: Push to `main` branch
- **Actions**:
  - Install dependencies
  - Build application
  - Deploy to Cloudflare Workers production environment
  - Uses GitHub environment protection for production

## Required GitHub Secrets

Set these in your GitHub repository settings → Secrets and variables → Actions:

### Cloudflare Secrets
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID (1b9c10b60b429c93d8c05ee918154305)

### Development Environment
- `RESEND_API_KEY_DEV` - Resend API key for development

### Production Environment  
- `RESEND_API_KEY_PROD` - Resend API key for production

## Quick Commands

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Manual deploy to current environment
```

### Git Workflow
```bash
# Quick dev deployment
git add . && git commit -m "feat: your changes" && git push origin dev

# Promote to production  
git checkout main && git merge dev && git push origin main

# Emergency hotfix
git checkout main
git checkout -b hotfix/urgent-fix
# make changes
git add . && git commit -m "hotfix: urgent fix"
git checkout main && git merge hotfix/urgent-fix && git push origin main
```

## Testing Strategy

### Before Pushing to Dev
- ✅ Test locally with `npm run dev`
- ✅ Build successfully with `npm run build`
- ✅ Verify form submission works
- ✅ Check email template rendering

### Before Promoting to Production
- ✅ Test on dev environment thoroughly
- ✅ Verify email notifications work correctly
- ✅ Test DocuSign integration
- ✅ Check all form validations
- ✅ Verify responsive design

## Rollback Strategy

### If Production Deployment Fails
1. **Quick rollback**:
   ```bash
   git checkout main
   git reset --hard HEAD~1  # Goes back one commit
   git push --force-with-lease origin main
   ```

2. **Hotfix approach**:
   ```bash
   git checkout main
   git checkout -b hotfix/revert-changes
   # Fix the issue
   git add . && git commit -m "hotfix: fix production issue"
   git checkout main && git merge hotfix/revert-changes
   git push origin main
   ```

## Monitoring & Logs

### View Worker Logs
```bash
# Development environment
wrangler tail --env dev

# Production environment  
wrangler tail --env production
```

### Health Checks
- **Dev**: https://momentum-business-capital-app-dev.shy-math-4d31.workers.dev/api/health
- **Prod**: https://momentum-business-capital-landing.shy-math-4d31.workers.dev/api/health

## Collaboration Guidelines

1. **Always work on dev branch** for new features
2. **Create pull requests** for major changes
3. **Test thoroughly** before promoting to production
4. **Use descriptive commit messages** (feat:, fix:, docs:, etc.)
5. **Keep production stable** - only merge tested code
6. **Monitor deployments** and check logs after releases

## Emergency Contacts

- **Cloudflare Account**: support@joinmbc.com
- **GitHub Repository**: https://github.com/nxsphere/momentum-business-capital-app
- **Live Application**: https://momentum-business-capital-landing.shy-math-4d31.workers.dev 