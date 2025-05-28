# Zantaku Deployment Guide

## Prerequisites
- SSH access to your VPS
- SSH key authentication configured
- PowerShell installed on your local machine

## Deployment Process

### Building the Application
To create a production build:

```powershell
npm run build
```

This creates optimized files in the `dist/` directory with all console logs removed.

### Deploying to VPS

#### Option 1: Using the deployment script
Run the automated deployment script:

```powershell
./scripts/deploy.ps1
```

#### Option 2: Manual SCP deployment
Use the following PowerShell commands to securely copy files to your VPS:

```powershell
# Adjust these variables before running
$VPS_USER = "your-username"
$VPS_IP = "your-server-ip"
$REMOTE_PATH = "/path/to/zantaku-landing"
$LOCAL_DIST_PATH = "./dist/*"

# Create backup of current deployment
ssh $VPS_USER@$VPS_IP "cd $REMOTE_PATH && mkdir -p backup && cp -r * backup/ --exclude=backup"

# Copy new files to server
scp -r $LOCAL_DIST_PATH "$VPS_USER@$VPS_IP:$REMOTE_PATH"
```

### Verifying Deployment
After deployment, verify your application by visiting your domain in a browser.

### Rollback (if needed)
If you need to rollback to the previous version:

```powershell
ssh $VPS_USER@$VPS_IP "cd $REMOTE_PATH && cp -r backup/* . --exclude=backup"
```

## Troubleshooting
- If you encounter permission errors, use `chmod -R 755 $REMOTE_PATH`
- If the site doesn't update, check your web server cache configuration 