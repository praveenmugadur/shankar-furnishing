# 🚀 GitHub Pages Deployment Guide

## Prerequisites

1. **GitHub Account** - Create free account at [github.com](https://github.com)
2. **Git Installed** - Download from [git-scm.com/download/win](https://git-scm.com/download/win)

---

## Option A: Automated Script (Recommended)

### Steps:

1. **Right-click** on `deploy-to-github.ps1`
2. Select **"Run with PowerShell"**
3. If you see a security warning, type `Y` and press Enter
4. Follow the on-screen instructions
5. The script will guide you through the entire process!

**The script will:**
- ✅ Initialize Git repository
- ✅ Create initial commit
- ✅ Provide exact commands to copy-paste
- ✅ Give you your website URL

---

## Option B: Manual Deployment

### Step 1: Initialize Git

Open PowerShell in the Website_Dev folder and run:

```powershell
git init
git add .
git commit -m "Initial deployment of Shankar Furnishing website"
git branch -M main
```

### Step 2: Create GitHub Repository

1. Go to: [github.com/new](https://github.com/new)
2. **Repository name:** `shankar-furnishing`
3. **Public** repository
4. **DO NOT** check "Add README"
5. Click **"Create repository"**

### Step 3: Push to GitHub

Replace `YOUR-USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/shankar-furnishing.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository settings:
   `https://github.com/YOUR-USERNAME/shankar-furnishing/settings/pages`

2. Under **"Source"**, select: **Branch: main**

3. Click **"Save"**

4. Wait 1-2 minutes, then visit:
   `https://YOUR-USERNAME.github.io/shankar-furnishing`

---

## 🎉 Your Website is Live!

Your website URL will be:
```
https://YOUR-USERNAME.github.io/shankar-furnishing
```

Share this URL with anyone - it works on all devices!

---

## 🔄 Update Your Website Later

When you edit files (like changing prices in `script.js`):

```powershell
git add .
git commit -m "Updated prices"
git push
```

Your website updates automatically in 1-2 minutes!

---

## 🌐 Custom Domain (Optional)

Want `www.shankarfurnishing.com`?

1. Buy domain from Namecheap/GoDaddy (~₹500/year)
2. In GitHub Pages settings, add your custom domain
3. Update DNS settings as instructed by GitHub

---

## ❓ Troubleshooting

**"Git not recognized"?**
- Install Git from: [git-scm.com/download/win](https://git-scm.com/download/win)
- Restart PowerShell after installation

**404 Error after deployment?**
- Wait 2-3 minutes, GitHub Pages takes time to build
- Check if GitHub Pages is enabled in repository settings

**Can't run PowerShell script?**
- Run PowerShell as Administrator
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Then run the script again

---

## 📞 Need Help?

If you get stuck, you can:
1. Check the commands saved in `github-commands.txt`
2. Follow the Netlify guide instead (easier alternative)
3. Ask for help with the specific error message
