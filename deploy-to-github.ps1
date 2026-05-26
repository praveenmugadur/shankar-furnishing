# Automated GitHub Pages Deployment Script
# This script will deploy your Shankar Furnishing website to GitHub Pages

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Shankar Furnishing - GitHub Pages Deploy   " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installing, run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

Write-Host ""
Write-Host "This script will:" -ForegroundColor Yellow
Write-Host "  1. Initialize a Git repository" -ForegroundColor White
Write-Host "  2. Create a GitHub repository" -ForegroundColor White
Write-Host "  3. Push your website to GitHub" -ForegroundColor White
Write-Host "  4. Enable GitHub Pages" -ForegroundColor White
Write-Host ""

# Get GitHub username
Write-Host "Please enter your GitHub username:" -ForegroundColor Cyan
$githubUsername = Read-Host
Write-Host ""

# Confirm deployment
Write-Host "Ready to deploy to: https://$githubUsername.github.io/shankar-furnishing" -ForegroundColor Green
Write-Host "Continue? (Y/N)" -ForegroundColor Yellow
$confirm = Read-Host

if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

Write-Host ""
Write-Host "Starting deployment..." -ForegroundColor Cyan
Write-Host ""

# Initialize Git repository
Write-Host "[1/5] Initializing Git repository..." -ForegroundColor Cyan
git init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to initialize Git repository" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Add all files
Write-Host ""
Write-Host "[2/5] Adding files to repository..." -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Files added successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Create initial commit
Write-Host ""
Write-Host "[3/5] Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial deployment of Shankar Furnishing website"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit created successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create commit" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Rename branch to main
Write-Host ""
Write-Host "[4/5] Setting up main branch..." -ForegroundColor Cyan
git branch -M main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Main branch configured" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to configure branch" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Instructions for GitHub
Write-Host ""
Write-Host "[5/5] Next steps - Manual GitHub setup required:" -ForegroundColor Cyan
Write-Host ""
Write-Host "================================================" -ForegroundColor Yellow
Write-Host "MANUAL STEPS (Do this now):" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host ""
Write-Host "2. Repository name: shankar-furnishing" -ForegroundColor White
Write-Host ""
Write-Host "3. Keep it PUBLIC" -ForegroundColor White
Write-Host ""
Write-Host "4. DO NOT initialize with README" -ForegroundColor White
Write-Host ""
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "6. Copy these commands and run in PowerShell:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/$githubUsername/shankar-furnishing.git" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "7. After pushing, go to your repository settings:" -ForegroundColor White
Write-Host "   https://github.com/$githubUsername/shankar-furnishing/settings/pages" -ForegroundColor Cyan
Write-Host ""
Write-Host "8. Under 'Source', select: Branch: main" -ForegroundColor White
Write-Host ""
Write-Host "9. Click 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "10. Your website will be live at:" -ForegroundColor White
Write-Host "    https://$githubUsername.github.io/shankar-furnishing" -ForegroundColor Green
Write-Host ""
Write-Host "================================================" -ForegroundColor Yellow
Write-Host ""

# Save commands to file for easy copy-paste
$commandsFile = "github-commands.txt"
$commands = @"
Git commands to run after creating GitHub repository:

git remote add origin https://github.com/$githubUsername/shankar-furnishing.git
git push -u origin main

Your website URL after deployment:
https://$githubUsername.github.io/shankar-furnishing

GitHub Pages Settings:
https://github.com/$githubUsername/shankar-furnishing/settings/pages
"@

$commands | Out-File -FilePath $commandsFile -Encoding UTF8
Write-Host "✓ Commands saved to: $commandsFile" -ForegroundColor Green
Write-Host ""
Write-Host "Deployment setup complete!" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
