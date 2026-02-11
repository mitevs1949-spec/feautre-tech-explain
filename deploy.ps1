# GitHub Deployment Script
$RepoUrl = "https://github.com/mitevs1949-spec/feautre-tech-explain"
$LiveUrl = "https://mitevs1949-spec.github.io/feautre-tech-explain/"

Write-Host "🚀 Starting Deployment..." -ForegroundColor Cyan

if (!(Test-Path .git)) {
    git init
    git remote add origin $RepoUrl
}

git add .
$msg = "Update " + (Get-Date -Format "HH:mm")
git commit -m "$msg"
git branch -M main
git push -u origin main

Write-Host "🎉 DONE!" -ForegroundColor Green
Write-Host "Your blog is live at: $LiveUrl" -ForegroundColor Cyan
