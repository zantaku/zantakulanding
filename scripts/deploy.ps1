# Secure Deploy Script for Zantaku
# This script handles the secure build and deployment process

# Ensure we're in the project root
$ErrorActionPreference = "Stop"
$project_dir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $project_dir

# Define colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Display banner
Write-ColorOutput "Green" "======================================================"
Write-ColorOutput "Green" "            ZANTAKU SECURE DEPLOYMENT                 "
Write-ColorOutput "Green" "======================================================"

# Check for uncommitted changes
Write-ColorOutput "Cyan" "Checking for uncommitted changes..."
git diff --quiet --exit-code
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Yellow" "WARNING: You have uncommitted changes. It's recommended to commit before deploying."
    $choice = Read-Host "Continue anyway? (y/n)"
    if ($choice -ne "y") {
        Write-ColorOutput "Red" "Deployment cancelled."
        exit 1
    }
}

# Run security checks
Write-ColorOutput "Cyan" "Running security checks..."
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Red" "Linting failed. Please fix the issues before deploying."
    exit 1
}

# Clean the build directory
Write-ColorOutput "Cyan" "Cleaning build directory..."
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# Run the secure build
Write-ColorOutput "Cyan" "Running secure build process..."
npm run secure-build
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Red" "Secure build failed. Deployment aborted."
    exit 1
}

# Create a backup of the current deployment (if exists)
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup_dir = "deployment_backups/$timestamp"

Write-ColorOutput "Cyan" "Creating backup in $backup_dir..."
if (!(Test-Path "deployment_backups")) {
    New-Item -ItemType Directory -Force -Path "deployment_backups"
}
New-Item -ItemType Directory -Force -Path $backup_dir

# Copy current deployment to backup (if exists)
if (Test-Path "\\yourserver\production\zantaku") {
    Copy-Item -Recurse "\\yourserver\production\zantaku\*" -Destination $backup_dir
    Write-ColorOutput "Green" "Backup created successfully."
} else {
    Write-ColorOutput "Yellow" "No existing deployment found to backup."
}

# Deploy the application
Write-ColorOutput "Cyan" "Deploying application..."
# Uncomment and configure for your deployment method
# Copy-Item -Recurse "dist\*" -Destination "\\yourserver\production\zantaku"

# For now, we'll just simulate the deployment
Write-ColorOutput "Cyan" "Application would be deployed to production server."
Write-ColorOutput "Cyan" "For actual deployment, configure the appropriate deployment method."

# Success message
Write-ColorOutput "Green" "======================================================"
Write-ColorOutput "Green" "        SECURE DEPLOYMENT COMPLETED SUCCESSFULLY      "
Write-ColorOutput "Green" "======================================================"
Write-ColorOutput "Green" "Remember to test the deployed application to ensure everything is working correctly." 