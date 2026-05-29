/* ============================================
   SHANKAR FURNISHING — Admin Portal Logic
   ============================================ */

// ---- State ----
let firebaseReady = false;
let currentSection = 'gallery';
let editingImageId = null;
let editingTestimonialId = null;
let selectedFile = null;
let adminFilter = 'all';

// ---- Default Data (fallback) ----
const DEFAULT_CATEGORIES = [
    { id: 'curtains', name: 'Curtains', icon: '🪟', slug: 'curtains' },
    { id: 'blinds', name: 'Roman Blinds', icon: '🏠', slug: 'blinds' },
    { id: 'headboards', name: 'Headboards', icon: '🛏️', slug: 'headboards' },
    { id: 'upholstery', name: 'Upholstery', icon: '🛋️', slug: 'upholstery' }
];

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    firebaseReady = initFirebase();
    if (firebaseReady) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) showDashboard();
            else showLogin();
        });
    } else {
        showLogin();
        console.warn('Firebase not configured. See FIREBASE_SETUP.md');
    }
    setupEventListeners();
});

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
    loadGallery();
    loadCategories();
    loadSiteContent();
    loadTestimonials();
    loadContactInfo();
}

// ---- Event Listeners ----
function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('mobile-logout').addEventListener('click', handleLogout);
    // Sidebar nav
    document.querySelectorAll('.nav-item[data-section]').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });
    // Mobile menu
    document.getElementById('menu-toggle').addEventListener('click', toggleMobileMenu);
    // Gallery: add image
    document.getElementById('add-image-btn').addEventListener('click', () => openUploadModal());
    document.getElementById('upload-modal-close').addEventListener('click', closeUploadModal);
    document.getElementById('upload-cancel').addEventListener('click', closeUploadModal);
    document.getElementById('upload-save').addEventListener('click', handleSaveImage);
    // Upload zone
    const zone = document.getElementById('upload-zone');
    zone.addEventListener('click', () => document.getElementById('image-file-input').click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', handleFileDrop);
    document.getElementById('image-file-input').addEventListener('change', handleFileSelect);
    document.getElementById('remove-preview').addEventListener('click', clearFilePreview);
    // Gallery filters
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            adminFilter = btn.dataset.filter;
            loadGallery();
        });
    });
    // Categories
    document.getElementById('add-category-btn').addEventListener('click', handleAddCategory);
    // Content save
    document.getElementById('save-content-btn').addEventListener('click', handleSaveContent);
    // Testimonials
    document.getElementById('add-testimonial-btn').addEventListener('click', () => openTestimonialModal());
    document.getElementById('testimonial-modal-close').addEventListener('click', closeTestimonialModal);
    document.getElementById('testimonial-cancel').addEventListener('click', closeTestimonialModal);
    document.getElementById('testimonial-save').addEventListener('click', handleSaveTestimonial);
    // Contact save
    document.getElementById('save-contact-btn').addEventListener('click', handleSaveContact);
}

// ---- Auth ----
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');
    errEl.textContent = '';
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Signing in...';
    try {
        if (!firebaseReady) throw new Error('Firebase not configured. See FIREBASE_SETUP.md');
        await firebase.auth().signInWithEmailAndPassword(email, pwd);
    } catch (err) {
        errEl.textContent = err.code === 'auth/invalid-credential' ? 'Invalid email or password' :
            err.code === 'auth/too-many-requests' ? 'Too many attempts. Try later.' : err.message;
    }
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Sign In';
}

function handleLogout() {
    if (firebaseReady) firebase.auth().signOut();
    showLogin();
}

// ---- Navigation ----
function switchSection(section) {
    currentSection = section;
    document.querySelectorAll('.nav-item[data-section]').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${section}"]`).classList.add('active');
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(`section-${section}`).style.display = 'block';
    // Close mobile menu
    document.getElementById('sidebar').classList.remove('open');
}

function toggleMobileMenu() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ---- Gallery CRUD ----
async function loadGallery() {
    const grid = document.getElementById('admin-gallery-grid');
    if (!firebaseReady) {
        grid.innerHTML = '<div class="gallery-loading">⚠️ Firebase not configured. Set up Firebase to manage gallery.</div>';
        return;
    }
    grid.innerHTML = '<div class="gallery-loading">Loading...</div>';
    try {
        const snap = await db.collection('gallery').orderBy('createdAt', 'desc').get();
        let items = [];
        snap.forEach(doc => {
            const d = doc.data();
            d._id = doc.id;
            items.push(d);
        });
        // Client-side filtering
        if (adminFilter !== 'all') {
            items = items.filter(item => item.category === adminFilter);
        }
        if (items.length === 0) {
            grid.innerHTML = '<div class="gallery-loading">No images yet. Click "Add Image" to get started.</div>';
            return;
        }
        grid.innerHTML = '';
        items.forEach(d => {
            grid.innerHTML += `
                <div class="admin-gallery-item" data-id="${d._id}">
                    <img src="${d.imageUrl}" alt="${d.title}" loading="lazy">
                    <div class="admin-gallery-item-info">
                        <div class="admin-gallery-item-title">${d.title}</div>
                        <div class="admin-gallery-item-cat">${d.category}</div>
                        <div class="admin-gallery-item-actions">
                            <button class="btn-small btn-edit" onclick="editImage('${d._id}')">Edit</button>
                            <button class="btn-danger" onclick="deleteImage('${d._id}','${d.storagePath || ''}')">Delete</button>
                        </div>
                    </div>
                </div>`;
        });
    } catch (err) {
        grid.innerHTML = `<div class="gallery-loading">Error: ${err.message}</div>`;
    }
}

function openUploadModal(id) {
    editingImageId = id || null;
    document.getElementById('upload-modal-title').textContent = id ? 'Edit Image' : 'Add Gallery Image';
    document.getElementById('upload-modal').style.display = 'flex';
    if (!id) {
        document.getElementById('image-title').value = '';
        document.getElementById('image-category').value = 'curtains';
        clearFilePreview();
    }
}

function closeUploadModal() {
    document.getElementById('upload-modal').style.display = 'none';
    editingImageId = null;
    selectedFile = null;
    clearFilePreview();
}

function handleFileDrop(e) {
    e.preventDefault();
    document.getElementById('upload-zone').classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) { selectedFile = file; showPreview(file); }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) { selectedFile = file; showPreview(file); }
}

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('preview-img').src = e.target.result;
        document.getElementById('upload-preview').style.display = 'block';
        document.getElementById('upload-zone').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function clearFilePreview() {
    selectedFile = null;
    document.getElementById('upload-preview').style.display = 'none';
    document.getElementById('upload-zone').style.display = 'block';
    document.getElementById('image-file-input').value = '';
}

async function handleSaveImage() {
    const title = document.getElementById('image-title').value.trim();
    const category = document.getElementById('image-category').value;
    if (!title) return showToast('Please enter a title', true);
    if (!selectedFile && !editingImageId) return showToast('Please select an image', true);
    const btn = document.getElementById('upload-save');
    btn.disabled = true;
    btn.textContent = 'Saving...';
    try {
        let imageUrl = '';
        let storagePath = '';
        if (selectedFile) {
            const ext = selectedFile.name.split('.').pop();
            storagePath = `gallery/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
            const ref = storage.ref(storagePath);
            await ref.put(selectedFile);
            imageUrl = await ref.getDownloadURL();
        }
        if (editingImageId) {
            const update = { title, category, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
            if (imageUrl) { update.imageUrl = imageUrl; update.storagePath = storagePath; }
            await db.collection('gallery').doc(editingImageId).update(update);
            showToast('Image updated!');
        } else {
            await db.collection('gallery').add({
                title, category, imageUrl, storagePath,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            showToast('Image added!');
        }
        closeUploadModal();
        loadGallery();
    } catch (err) {
        showToast('Error: ' + err.message, true);
    }
    btn.disabled = false;
    btn.textContent = 'Save Image';
}

async function editImage(id) {
    try {
        const doc = await db.collection('gallery').doc(id).get();
        const d = doc.data();
        editingImageId = id;
        document.getElementById('image-title').value = d.title;
        document.getElementById('image-category').value = d.category;
        document.getElementById('preview-img').src = d.imageUrl;
        document.getElementById('upload-preview').style.display = 'block';
        document.getElementById('upload-zone').style.display = 'none';
        document.getElementById('upload-modal-title').textContent = 'Edit Image';
        document.getElementById('upload-modal').style.display = 'flex';
    } catch (err) { showToast('Error loading image', true); }
}

async function deleteImage(id, path) {
    if (!confirm('Delete this image?')) return;
    try {
        await db.collection('gallery').doc(id).delete();
        if (path) { try { await storage.ref(path).delete(); } catch(e) {} }
        showToast('Image deleted');
        loadGallery();
    } catch (err) { showToast('Error: ' + err.message, true); }
}

// ---- Categories ----
async function loadCategories() {
    const list = document.getElementById('categories-list');
    if (!firebaseReady) {
        list.innerHTML = '<div class="gallery-loading">⚠️ Firebase not configured.</div>';
        return;
    }
    try {
        const snap = await db.collection('categories').orderBy('name').get();
        if (snap.empty) {
            // Seed defaults
            for (const cat of DEFAULT_CATEGORIES) {
                await db.collection('categories').doc(cat.id).set(cat);
            }
            loadCategories();
            return;
        }
        list.innerHTML = '';
        // Get counts
        const galSnap = await db.collection('gallery').get();
        const counts = {};
        galSnap.forEach(d => { const c = d.data().category; counts[c] = (counts[c] || 0) + 1; });

        snap.forEach(doc => {
            const d = doc.data();
            list.innerHTML += `
                <div class="category-item">
                    <div class="category-info">
                        <div class="category-icon">${d.icon || '📁'}</div>
                        <div>
                            <div class="category-name">${d.name}</div>
                            <div class="category-count">${counts[d.slug] || 0} images</div>
                        </div>
                    </div>
                    <div class="category-actions">
                        <button class="btn-danger" onclick="deleteCategory('${doc.id}')">Delete</button>
                    </div>
                </div>`;
        });
        // Update category dropdown in upload modal
        const select = document.getElementById('image-category');
        select.innerHTML = '';
        snap.forEach(doc => {
            const d = doc.data();
            select.innerHTML += `<option value="${d.slug}">${d.name}</option>`;
        });
    } catch (err) { list.innerHTML = `<div class="gallery-loading">Error: ${err.message}</div>`; }
}

async function handleAddCategory() {
    const name = prompt('Enter category name:');
    if (!name) return;
    const icon = prompt('Enter emoji icon (e.g. 🪟):', '📁') || '📁';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    try {
        await db.collection('categories').doc(slug).set({ id: slug, name, icon, slug });
        showToast('Category added!');
        loadCategories();
    } catch (err) { showToast('Error: ' + err.message, true); }
}

async function deleteCategory(id) {
    if (!confirm('Delete this category? Images in it won\'t be deleted.')) return;
    try {
        await db.collection('categories').doc(id).delete();
        showToast('Category deleted');
        loadCategories();
    } catch (err) { showToast('Error: ' + err.message, true); }
}

// ---- Site Content ----
async function loadSiteContent() {
    if (!firebaseReady) return;
    try {
        const doc = await db.collection('siteContent').doc('main').get();
        if (!doc.exists) return;
        const d = doc.data();
        if (d.heroBadge) document.getElementById('hero-badge').value = d.heroBadge;
        if (d.heroTitle) document.getElementById('hero-title').value = d.heroTitle;
        if (d.heroSubtitle) document.getElementById('hero-subtitle').value = d.heroSubtitle;
        if (d.statProjects) document.getElementById('stat-projects').value = d.statProjects;
        if (d.statYears) document.getElementById('stat-years').value = d.statYears;
        if (d.statClients) document.getElementById('stat-clients').value = d.statClients;
        if (d.statRating) document.getElementById('stat-rating').value = d.statRating;
        if (d.aboutTitle) document.getElementById('about-title').value = d.aboutTitle;
        if (d.aboutDesc) document.getElementById('about-desc').value = d.aboutDesc;
    } catch (err) { console.error('Load content error:', err); }
}

async function handleSaveContent() {
    if (!firebaseReady) return showToast('Firebase not configured', true);
    const btn = document.getElementById('save-content-btn');
    btn.disabled = true;
    try {
        await db.collection('siteContent').doc('main').set({
            heroBadge: document.getElementById('hero-badge').value,
            heroTitle: document.getElementById('hero-title').value,
            heroSubtitle: document.getElementById('hero-subtitle').value,
            statProjects: parseInt(document.getElementById('stat-projects').value) || 5000,
            statYears: parseInt(document.getElementById('stat-years').value) || 25,
            statClients: parseInt(document.getElementById('stat-clients').value) || 10000,
            statRating: document.getElementById('stat-rating').value || '4.8',
            aboutTitle: document.getElementById('about-title').value,
            aboutDesc: document.getElementById('about-desc').value,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        showToast('Content saved!');
    } catch (err) { showToast('Error: ' + err.message, true); }
    btn.disabled = false;
}

// ---- Testimonials ----
async function loadTestimonials() {
    const list = document.getElementById('testimonials-list');
    if (!firebaseReady) {
        list.innerHTML = '<div class="gallery-loading">⚠️ Firebase not configured.</div>';
        return;
    }
    try {
        const snap = await db.collection('testimonials').orderBy('createdAt', 'desc').get();
        if (snap.empty) { list.innerHTML = '<div class="gallery-loading">No reviews yet.</div>'; return; }
        list.innerHTML = '';
        snap.forEach(doc => {
            const d = doc.data();
            const initials = d.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            const stars = '★'.repeat(d.stars || 5);
            list.innerHTML += `
                <div class="testimonial-item">
                    <div class="testimonial-item-header">
                        <div class="testimonial-item-author">
                            <div class="testimonial-avatar">${initials}</div>
                            <div>
                                <div class="testimonial-item-name">${d.name}</div>
                                <div class="testimonial-item-loc">${d.location}</div>
                            </div>
                        </div>
                        <div class="testimonial-item-actions">
                            <button class="btn-small btn-edit" onclick="editTestimonial('${doc.id}')">Edit</button>
                            <button class="btn-danger" onclick="deleteTestimonial('${doc.id}')">Delete</button>
                        </div>
                    </div>
                    <div class="testimonial-item-stars">${stars}</div>
                    <div class="testimonial-item-text">"${d.text}"</div>
                </div>`;
        });
    } catch (err) { list.innerHTML = `<div class="gallery-loading">Error: ${err.message}</div>`; }
}

function openTestimonialModal(id) {
    editingTestimonialId = id || null;
    document.getElementById('testimonial-modal-title').textContent = id ? 'Edit Review' : 'Add Review';
    document.getElementById('testimonial-modal').style.display = 'flex';
    if (!id) {
        document.getElementById('review-name').value = '';
        document.getElementById('review-location').value = '';
        document.getElementById('review-stars').value = '5';
        document.getElementById('review-text').value = '';
    }
}

function closeTestimonialModal() {
    document.getElementById('testimonial-modal').style.display = 'none';
    editingTestimonialId = null;
}

async function handleSaveTestimonial() {
    const name = document.getElementById('review-name').value.trim();
    const location = document.getElementById('review-location').value.trim();
    const stars = parseInt(document.getElementById('review-stars').value);
    const text = document.getElementById('review-text').value.trim();
    if (!name || !text) return showToast('Name and review text required', true);
    try {
        const data = { name, location, stars, text, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
        if (editingTestimonialId) {
            await db.collection('testimonials').doc(editingTestimonialId).update(data);
            showToast('Review updated!');
        } else {
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('testimonials').add(data);
            showToast('Review added!');
        }
        closeTestimonialModal();
        loadTestimonials();
    } catch (err) { showToast('Error: ' + err.message, true); }
}

async function editTestimonial(id) {
    try {
        const doc = await db.collection('testimonials').doc(id).get();
        const d = doc.data();
        editingTestimonialId = id;
        document.getElementById('review-name').value = d.name;
        document.getElementById('review-location').value = d.location;
        document.getElementById('review-stars').value = d.stars;
        document.getElementById('review-text').value = d.text;
        document.getElementById('testimonial-modal-title').textContent = 'Edit Review';
        document.getElementById('testimonial-modal').style.display = 'flex';
    } catch (err) { showToast('Error loading review', true); }
}

async function deleteTestimonial(id) {
    if (!confirm('Delete this review?')) return;
    try {
        await db.collection('testimonials').doc(id).delete();
        showToast('Review deleted');
        loadTestimonials();
    } catch (err) { showToast('Error: ' + err.message, true); }
}

// ---- Contact Info ----
async function loadContactInfo() {
    if (!firebaseReady) return;
    try {
        const doc = await db.collection('siteContent').doc('contact').get();
        if (!doc.exists) return;
        const d = doc.data();
        if (d.owner) document.getElementById('contact-owner').value = d.owner;
        if (d.phone) document.getElementById('contact-phone').value = d.phone;
        if (d.whatsapp) document.getElementById('contact-whatsapp').value = d.whatsapp;
        if (d.location) document.getElementById('contact-location').value = d.location;
        if (d.hours) document.getElementById('contact-hours').value = d.hours;
        if (d.mapsUrl) document.getElementById('contact-maps').value = d.mapsUrl;
    } catch (err) { console.error('Load contact error:', err); }
}

async function handleSaveContact() {
    if (!firebaseReady) return showToast('Firebase not configured', true);
    const btn = document.getElementById('save-contact-btn');
    btn.disabled = true;
    try {
        await db.collection('siteContent').doc('contact').set({
            owner: document.getElementById('contact-owner').value,
            phone: document.getElementById('contact-phone').value,
            whatsapp: document.getElementById('contact-whatsapp').value,
            location: document.getElementById('contact-location').value,
            hours: document.getElementById('contact-hours').value,
            mapsUrl: document.getElementById('contact-maps').value,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        showToast('Contact info saved!');
    } catch (err) { showToast('Error: ' + err.message, true); }
    btn.disabled = false;
}

// ---- Toast ----
function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    document.getElementById('toast-icon').textContent = isError ? '✕' : '✓';
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- Seed Existing Data ----
const EXISTING_GALLERY = [
    { src: 'images/curtain-dark-living-room-1.jpg', title: 'Dark Elegance Living Room', category: 'curtains' },
    { src: 'images/curtain-dark-living-room-2.jpg', title: 'Premium Living Room Drapes', category: 'curtains' },
    { src: 'images/curtain-beige-bedroom-1.jpg', title: 'Beige Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-double-1.jpg', title: 'Double Layer Beige Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-sheer-1.jpg', title: 'Sheer Beige Window Treatment', category: 'curtains' },
    { src: 'images/curtain-beige-skylight-1.jpg', title: 'Skylight Curtain Installation', category: 'curtains' },
    { src: 'images/curtain-beige-skylight-3.jpg', title: 'Skylight Beige Drapes', category: 'curtains' },
    { src: 'images/curtain-beige-tall-1.jpg', title: 'Tall Window Beige Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-tall-2.jpg', title: 'Floor-to-Ceiling Drapes', category: 'curtains' },
    { src: 'images/curtain-cream-living-1.jpg', title: 'Cream Living Room Curtains', category: 'curtains' },
    { src: 'images/curtain-cream-living-2.jpg', title: 'Elegant Cream Drapes', category: 'curtains' },
    { src: 'images/curtain-cream-sheer-bedroom.jpg', title: 'Sheer Cream Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-bedroom-1.jpg', title: 'Grey Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-sheer-1.jpg', title: 'Grey Sheer Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-sheer-2.jpg', title: 'Double Grey Sheer Panels', category: 'curtains' },
    { src: 'images/curtain-grey-skylight-2.jpg', title: 'Grey Skylight Curtains', category: 'curtains' },
    { src: 'images/curtain-room-view-1.jpg', title: 'Complete Room Curtain View', category: 'curtains' },
    { src: 'images/curtain-room-view-3.jpg', title: 'Bedroom Curtain Ensemble', category: 'curtains' },
    { src: 'images/curtain-room-view-4.jpg', title: 'Curtain Room Transformation', category: 'curtains' },
    { src: 'images/curtain-stairway-dark.jpg', title: 'Stairway Dark Curtains', category: 'curtains' },
    { src: 'images/curtain-white-sheer-stairway.jpg', title: 'White Sheer Stairway Drapes', category: 'curtains' },
    { src: 'images/roman-blind-beige-1.jpg', title: 'Beige Roman Blind', category: 'blinds' },
    { src: 'images/roman-blind-beige-2.jpg', title: 'Roman Blind with Curtain Combo', category: 'blinds' },
    { src: 'images/curtain-roman-blind-room.jpg', title: 'Roman Blind & Curtain Setup', category: 'blinds' },
    { src: 'images/sofa-cushion-grey-1.jpg', title: 'Grey Sofa Cushion Set', category: 'upholstery' },
    { src: 'images/sofa-cushion-grey-2.jpg', title: 'Cushion Collection', category: 'upholstery' },
    { src: 'images/sofa-cushion-grey-3.jpg', title: 'Decorative Cushion Arrangement', category: 'upholstery' },
    { src: 'images/headboard-teal-diamond-chandelier.jpg', title: 'Teal Diamond with Crystal Chandelier', category: 'headboards' },
    { src: 'images/headboard-luxury-velvet-gold.jpg', title: 'Luxury Velvet with Gold Accents', category: 'headboards' },
    { src: 'images/headboard-herringbone-cushions.jpg', title: 'Herringbone Pattern with Cushions', category: 'headboards' },
    { src: 'images/headboard-blue-led-diamond.jpg', title: 'Blue LED Diamond Pattern', category: 'headboards' },
    { src: 'images/headboard-marble-led-channels.jpg', title: 'Marble Wall with LED Channels', category: 'headboards' },
    { src: 'images/headboard-luxury-tufted-bedroom.jpg', title: 'Luxury Tufted Bedroom Setup', category: 'headboards' },
    { src: 'images/headboard-scalloped-white-curtains.jpg', title: 'Scalloped Headboard with White Curtains', category: 'headboards' },
    { src: 'images/headboard-scalloped-curtains-angle2.jpg', title: 'Designer Scalloped Headboard', category: 'headboards' },
    { src: 'images/headboard-tropical-wallpaper.jpg', title: 'Tropical Wallpaper Bedroom', category: 'headboards' },
    { src: 'images/headboard-tan-leather-panel.jpg', title: 'Tan Leather Panel Headboard', category: 'headboards' },
    { src: 'images/headboard-purple-arch-blinds.jpg', title: 'Purple Arch with Roman Blinds', category: 'headboards' },
    { src: 'images/headboard-diamond-tufted-amber.jpg', title: 'Diamond Tufted Amber Headboard', category: 'headboards' },
    { src: 'images/headboard-braided-gold-accent.jpg', title: 'Braided Pink & Gold Accent Wall', category: 'headboards' },
    { src: 'images/headboard-honeycomb-gold-panel.jpg', title: 'Honeycomb Gold Panel Design', category: 'headboards' },
    { src: 'images/headboard-geometric-gold-led.jpg', title: 'Geometric Diamond with Gold LED', category: 'headboards' },
    { src: 'images/curtain-bedroom-dark-1.jpg', title: 'Dark Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-worker-install.jpg', title: 'Professional Curtain Installation', category: 'curtains' },
];

async function seedExistingData() {
    if (!firebaseReady) return showToast('Firebase not ready', true);
    const btn = document.getElementById('seed-data-btn');
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = 'Migrating... 0/' + EXISTING_GALLERY.length;

    const baseUrl = window.location.origin + '/';
    let count = 0;
    let errors = 0;

    for (const item of EXISTING_GALLERY) {
        try {
            // Check if already exists by title
            const existing = await db.collection('gallery')
                .where('title', '==', item.title).get();
            if (!existing.empty) {
                count++;
                btn.textContent = `Skipping duplicates... ${count}/${EXISTING_GALLERY.length}`;
                continue;
            }
            await db.collection('gallery').add({
                title: item.title,
                category: item.category,
                imageUrl: baseUrl + item.src,
                storagePath: '',
                createdAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now() - (EXISTING_GALLERY.length - count) * 60000))
            });
            count++;
            btn.textContent = `Migrating... ${count}/${EXISTING_GALLERY.length}`;
        } catch (err) {
            errors++;
            console.error('Seed error for', item.title, err);
        }
    }

    btn.textContent = '✓ Migration Complete!';
    btn.style.background = 'rgba(46, 204, 113, 0.2)';
    btn.style.color = '#2ecc71';
    btn.style.borderColor = '#2ecc71';
    showToast(`Migrated ${count - errors} images! ${errors ? errors + ' errors.' : ''}`);
    loadGallery();
}
