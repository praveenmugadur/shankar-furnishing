# 🌐 Domain Setup Guide — shankarfurnishing.com

You bought **shankarfurnishing.com** on Hostinger. Here's how to connect it to Netlify.

## Step 1: Get Netlify DNS Values

1. Go to [app.netlify.com](https://app.netlify.com) → Select your site
2. Go to **Domain settings** (or **Site settings → Domain management**)
3. Click **"Add custom domain"**
4. Enter: `shankarfurnishing.com` → Click **"Verify"** → **"Add domain"**
5. It will also add `www.shankarfurnishing.com` automatically
6. Netlify will show you DNS records to configure

## Step 2: Configure DNS in Hostinger

1. Go to [hpanel.hostinger.com/domains](https://hpanel.hostinger.com/domains)
2. Click **"Manage"** next to `shankarfurnishing.com`
3. Go to **"DNS / Nameservers"** section

### Option A: Use Netlify DNS (Recommended)
Change nameservers to Netlify's:
```
dns1.p06.nsone.net
dns2.p06.nsone.net
dns3.p06.nsone.net
dns4.p06.nsone.net
```
*(Netlify will show you the exact nameservers in Step 1)*

### Option B: Keep Hostinger DNS (Add Records)
Add these DNS records:
- **A Record:** `@` → `75.2.60.5`
- **CNAME Record:** `www` → `shankarfurnishing.netlify.app`

## Step 3: Wait for DNS Propagation

- Takes **15 minutes to 48 hours** (usually under 1 hour)
- Check progress at [dnschecker.org](https://dnschecker.org)

## Step 4: Enable HTTPS

1. Back in Netlify → Domain settings
2. Scroll to **"HTTPS"** section
3. Click **"Verify DNS configuration"**
4. Once verified, click **"Provision certificate"**
5. HTTPS will be auto-enabled (free via Let's Encrypt)

## ✅ Done!

Your website will be live at:
- `https://shankarfurnishing.com`
- `https://www.shankarfurnishing.com`

Both will work with automatic HTTPS!
