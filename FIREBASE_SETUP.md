# 🔥 Firebase Setup Guide for Shankar Furnishing

## Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. **Project name:** `shankar-furnishing`
4. **Disable Google Analytics** (not needed) → Click **"Create project"**
5. Wait for it to finish, then click **"Continue"**

## Step 2: Add Web App

1. On the project dashboard, click the **Web icon** (`</>`)
2. **App nickname:** `Shankar Furnishing Website`
3. ✅ Check **"Also set up Firebase Hosting"** — Skip this for now
4. Click **"Register app"**
5. You'll see a code block with `firebaseConfig`. **Copy the values**.

## Step 3: Update firebase-config.js

Open `firebase-config.js` in the project and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",           // ← Paste your actual values
    authDomain: "shankar-furnishing.firebaseapp.com",
    projectId: "shankar-furnishing",
    storageBucket: "shankar-furnishing.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

## Step 4: Enable Authentication

1. In Firebase Console → Click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"** → Toggle **Enable** → Click **"Save"**
4. Go to **"Users"** tab → Click **"Add user"**
5. Enter your brother's email and a password
   - Example: `admin@shankarfurnishing.com` / `StrongPassword123!`
6. Click **"Add user"**

## Step 5: Set Up Firestore Database

1. In Firebase Console → Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location: **asia-south1 (Mumbai)** ← Closest to India
5. Click **"Enable"**

### Set Firestore Rules

Go to **Firestore → Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can READ (public website needs this)
    match /{document=**} {
      allow read: if true;
    }
    // Only authenticated users can WRITE (admin portal)
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**.

## Step 6: Set Up Firebase Storage

1. In Firebase Console → Click **"Storage"** in left sidebar
2. Click **"Get started"**
3. Select **"Start in production mode"** → Click **"Next"**
4. Choose location: **asia-south1** → Click **"Done"**

### Set Storage Rules

Go to **Storage → Rules** tab and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Anyone can READ images (public website)
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**.

## Step 7: Seed Initial Data (Optional)

Open the admin portal (`admin.html`), log in, and start uploading your existing images. Or you can run the seed script to auto-populate from the current gallery data.

## ✅ Done!

Your Firebase backend is ready. The admin portal will now work with login, image uploads, and content management.

### Admin Login Credentials
- **URL:** `https://shankarfurnishing.com/admin.html`
- **Email:** (what you set in Step 4)
- **Password:** (what you set in Step 4)
