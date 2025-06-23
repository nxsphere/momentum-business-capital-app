# GitHub Actions Automatic Deployment Setup

This guide will help you set up automatic deployment from GitHub to Cloudflare Workers.

## 🚀 **Current Status**

- ✅ **GitHub Repository**: https://github.com/nxsphere/momentum-business-capital-app
- ✅ **Workflow Files**: Created and committed to repository
- ✅ **Branch Strategy**: `dev` → dev environment, `main` → production
- ⚠️ **Missing**: GitHub Secrets (required for deployment)

## 🔑 **Step 1: Create Cloudflare API Token**

1. **Visit**: https://dash.cloudflare.com/profile/api-tokens
2. **Click**: "Create Token"
3. **Select**: "Custom token"
4. **Configure Permissions**:
   ```
   Account: Cloudflare Workers:Edit
   Zone: Zone:Read (All zones)
   Account: Account:Read
   ```
5. **Account Resources**: Include your account ID
6. **Create Token** and copy it (starts with something like `abc123...`)

## 🔧 **Step 2: Set GitHub Repository Secrets**

1. **Go to**: https://github.com/nxsphere/momentum-business-capital-app/settings/secrets/actions
2. **Click**: "New repository secret"
3. **Add each of these secrets**:

### Required Secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `CLOUDFLARE_API_TOKEN` | [Your API token from Step 1] | Allows GitHub to deploy to Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | `1b9c10b60b429c93d8c05ee918154305` | Your Cloudflare account ID |
| `RESEND_API_KEY_DEV` | [Your Resend API key] | For development email notifications |
| `RESEND_API_KEY_PROD` | [Your Resend API key] | For production email notifications |

### How to Add Each Secret:
1. Click "New repository secret"
2. Enter the **Name** (e.g., `CLOUDFLARE_API_TOKEN`)
3. Enter the **Secret** (the actual value)
4. Click "Add secret"
5. Repeat for each secret

## ✅ **Step 3: Verify Setup**

Once all secrets are added:

1. **Check Workflow Status**:
   - Go to: https://github.com/nxsphere/momentum-business-capital-app/actions
   - You should see a "Deploy to Development" workflow running

2. **Test Deployment**:
   - Make any small change on the `dev` branch
   - Push to GitHub: `git push origin dev`
   - Check Actions tab to see deployment progress

3. **Monitor Logs**:
   - Click on the running workflow to see detailed logs
   - Verify deployment succeeds without errors

## 🌐 **Step 4: Expected Results**

After successful setup:

### Development Workflow:
- **Push to `dev` branch** → Auto-deploys to: `momentum-business-capital-app-dev.shy-math-4d31.workers.dev`
- **View logs** at: https://github.com/nxsphere/momentum-business-capital-app/actions

### Production Workflow:
- **Push to `main` branch** → Auto-deploys to: `momentum-business-capital-landing.shy-math-4d31.workers.dev`

## 🐛 **Troubleshooting**

### Common Issues:

1. **"Invalid API token"**
   - Verify the `CLOUDFLARE_API_TOKEN` is correct
   - Ensure token has proper permissions
   - Check token hasn't expired

2. **"Account not found"**
   - Verify `CLOUDFLARE_ACCOUNT_ID` is correct: `1b9c10b60b429c93d8c05ee918154305`

3. **"Secret not found"**
   - Ensure all 4 secrets are added to the repository
   - Check secret names match exactly (case-sensitive)

4. **"Build fails"**
   - Check the Actions logs for specific error messages
   - Verify `package.json` and dependencies are correct

### Debug Commands:

```bash
# View recent GitHub Actions runs
gh run list --limit 10

# View specific run details
gh run view [run-id] --log

# Check current branch and remote
git branch -v
git remote -v
```

## 🎉 **Success Indicators**

You'll know it's working when:

- ✅ GitHub Actions shows green checkmarks
- ✅ Development site updates automatically: `momentum-business-capital-app-dev.shy-math-4d31.workers.dev`
- ✅ No errors in the Actions logs
- ✅ Email notifications work properly

## 📞 **Next Steps After Setup**

1. **Test the complete flow**:
   ```bash
   # Make a small change
   echo "// Updated $(date)" >> src/worker/index.ts
   git add . && git commit -m "test: verify auto-deployment"
   git push origin dev
   ```

2. **Check deployment**: Visit the Actions tab and verify deployment

3. **When ready for production**: Merge `dev` to `main`
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

## 🔗 **Useful Links**

- **Repository**: https://github.com/nxsphere/momentum-business-capital-app
- **Actions**: https://github.com/nxsphere/momentum-business-capital-app/actions
- **Secrets**: https://github.com/nxsphere/momentum-business-capital-app/settings/secrets/actions
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Dev Site**: https://momentum-business-capital-app-dev.shy-math-4d31.workers.dev
- **Production Site**: https://momentum-business-capital-landing.shy-math-4d31.workers.dev

---

**Need Help?** Check the Actions logs first, then review this troubleshooting guide. Most issues are related to missing or incorrect secrets. 