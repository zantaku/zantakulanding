#!/usr/bin/env pwsh
# Zantaku Landing Page Deployment Script

# Configuration - MODIFY THESE VALUES
$VPS_USER = "your-username" # Replace with your actual VPS username
$VPS_IP = "your-server-ip"  # Replace with your actual VPS IP
$REMOTE_PATH = "/var/www/zantaku-landing" # Replace with your actual remote path
$LOCAL_DIST_PATH = "$PSScriptRoot/../dist/*"

# Colors for output
$Green = [ConsoleColor]::Green
$Red = [ConsoleColor]::Red
$Yellow = [ConsoleColor]::Yellow
$Cyan = [ConsoleColor]::Cyan

# Helper function for status messages
function Write-Status {
    param (
        [Parameter(Mandatory=$true)][string]$Message,
        [ConsoleColor]$Color = [ConsoleColor]::White
    )
    Write-Host "[$((Get-Date).ToString('HH:mm:ss'))]" -NoNewline
    Write-Host " $Message" -ForegroundColor $Color
}

# Verify build exists
if (-not (Test-Path (Split-Path -Parent $LOCAL_DIST_PATH))) {
    Write-Status "Error: Build directory not found. Run 'npm run build' first." -Color $Red
    exit 1
}

# Start deployment
Write-Status "Starting deployment to $VPS_IP..." -Color $Cyan
Write-Status "Creating backup of current deployment..." -Color $Yellow

try {
    # Create backup of current deployment
    $backupCmd = "cd $REMOTE_PATH && mkdir -p backup && cp -r * backup/ --exclude=backup"
    ssh $VPS_USER@$VPS_IP $backupCmd
    
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create backup on remote server."
    }
    
    Write-Status "Backup created successfully." -Color $Green
    
    # Deploy new files
    Write-Status "Copying new files to server..." -Color $Yellow
    scp -r $LOCAL_DIST_PATH "${VPS_USER}@${VPS_IP}:${REMOTE_PATH}"
    
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to copy files to remote server."
    }
    
    Write-Status "Files copied successfully." -Color $Green
    
    # Set proper permissions
    Write-Status "Setting proper permissions..." -Color $Yellow
    ssh $VPS_USER@$VPS_IP "chmod -R 755 $REMOTE_PATH"
    
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to set permissions on remote server."
    }
    
    Write-Status "Deployment completed successfully!" -Color $Green
    Write-Status "Your site should now be available at your configured domain." -Color $Cyan
    
} catch {
    Write-Status "Error during deployment: ${_}" -Color $Red
    Write-Status "Attempting to rollback to backup..." -Color $Yellow
    
    # Rollback to backup if available
    ssh $VPS_USER@$VPS_IP "if [ -d $REMOTE_PATH/backup ]; then cp -r $REMOTE_PATH/backup/* $REMOTE_PATH/ --exclude=backup; fi"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Status "Rollback completed." -Color $Yellow
    } else {
        Write-Status "Rollback failed. Manual intervention required." -Color $Red
    }
    
    exit 1
}

# Provide rollback instructions
Write-Status "If you need to rollback, run the following command:" -Color $Yellow
Write-Status "ssh $VPS_USER@$VPS_IP `"cd $REMOTE_PATH && cp -r backup/* . --exclude=backup`"" -Color $Cyan 