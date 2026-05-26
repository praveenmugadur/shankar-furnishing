# Shankar Furnishing - Wholesale Home Furnishings

Welcome to the Shankar Furnishing website! This is a modern, premium wholesale business website featuring your products with beautiful design and easy-to-edit content.

## 🚀 Quick Start

### View the Website
Simply double-click `index.html` to open the website in your browser.

---

## 🌐 Deploy Your Website Online

Choose one of these options to make your website accessible from anywhere:

### **Option 1: Netlify (Easiest - 2 minutes)**
📄 See: [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)
- Drag and drop deployment
- No account needed initially
- Instant URL: `https://shankar-furnishing.netlify.app`

### **Option 2: GitHub Pages (Automated)**
📄 See: [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md)
- Run `deploy-to-github.ps1` script
- Free GitHub hosting
- URL: `https://your-username.github.io/shankar-furnishing`

---

## ✏️ How to Edit Prices and Products

### Editing Prices
1. Open `script.js` in any text editor (Notepad, VS Code, etc.)
2. Find the `PRODUCTS` array at the top of the file
3. Change the `mrp` and `price` values for any product
4. Save the file
5. Refresh your browser to see changes

**Example:**
```javascript
{
    name: "Premium Orthopedic Mattress",
    mrp: 15000,    // ← Change this number
    price: 9999,   // ← Change this number
}
```

### Replacing Product Images
1. Put your new image in the `images` folder
2. Either:
   - Name it the same as the old image (it will replace it automatically)
   - Or update the image path in `script.js`

**Example:**
```javascript
image: "images/your-new-image.jpg"  // ← Change image name here
```

### Adding New Products
In `script.js`, copy an existing product and modify:
```javascript
{
    id: 9,  // Give a new unique number
    name: "Your Product Name",
    category: "Your Category",
    image: "images/your-image.png",
    mrp: 5000,
    price: 3500,
}
```

### Removing Products
In `script.js`, delete the entire product object (everything between `{ }`) from the PRODUCTS array.

---

## 📁 File Structure
```
Website_Dev/
├── index.html                    # Main website file
├── style.css                     # Design and colors
├── script.js                     # Products and prices (EDIT THIS!)
├── images/                       # Product images folder
│   ├── shankar-shop-exterior.jpg # Your shop photo
│   ├── mattress_product_1_[...].png
│   ├── cushion_product_1_[...].png
│   └── ... (all product images)
├── README.md                     # This file
├── NETLIFY_DEPLOYMENT.md         # Netlify deployment guide
├── GITHUB_DEPLOYMENT.md          # GitHub Pages deployment guide
└── deploy-to-github.ps1          # Automated deployment script
```

---

## 📞 Contact Information
- **Owner:** Siddu Hanchinal  
- **Phone:** +91 7337688800
- **Location:** See Google Maps on the website

---

## 🎨 Customization Tips

### Change Colors
Edit `style.css` at the top where it says `:root {`

### Update Business Name or Description
Edit `index.html` - the text is easy to find and change

### Replace Shop Image
Replace `images/shankar-shop-exterior.jpg` with your new photo

---

## 💡 Tips
- Always save files after editing
- Refresh your browser (F5 or Ctrl+R) to see changes
- Keep backup copies of your original images
- Product images work best at 400x300 pixels or similar ratio

---

## ✅ Features
✨ Modern dark theme with vibrant colors  
✨ Automatic discount percentage calculation  
✨ Fully responsive (works on phones, tablets, computers)  
✨ Google Maps integration  
✨ Real shop photo showcase  
✨ Smooth animations and effects  
✨ SEO optimized for search engines  
✨ Easy to deploy online (Netlify or GitHub Pages)

---

## 🔄 After Deployment

Once your website is live:
1. Share the URL with customers
2. Update prices locally when needed
3. Re-deploy to update the live site
4. Access from any device with internet

---

**Need Help?** 
- Check deployment guides: `NETLIFY_DEPLOYMENT.md` or `GITHUB_DEPLOYMENT.md`
- All product data is in `script.js` - that's the main file you'll edit!
