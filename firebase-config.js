/* ============================================
   FIREBASE CONFIGURATION
   ============================================
   
   HOW TO SET UP:
   1. Go to https://console.firebase.google.com
   2. Click "Create a project" → Name it "shankar-furnishing"
   3. Disable Google Analytics (optional, not needed)
   4. Once created, click the Web icon (</>) to add a web app
   5. Name it "Shankar Furnishing Website"
   6. Copy the firebaseConfig values below
   7. Replace the placeholder values with your actual values
   
   See FIREBASE_SETUP.md for detailed step-by-step instructions.
   ============================================ */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app, db, auth, storage;

function initFirebase() {
    try {
        // Check if config has been set up
        if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
            console.warn('Firebase not configured yet. Using fallback data. See FIREBASE_SETUP.md');
            return false;
        }
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}
