/* ============================================
   THINKPHARMA - MAIN JAVASCRIPT
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 ThinkPharma Loaded Successfully!");
    
    // Initialize all functions
    initHamburgerMenu();
    initSmoothScroll();
    initActiveNavLink();
    initScrollEffects();
});

/* ============================================
   HAMBURGER MENU (Mobile Navigation)
   ============================================ */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle menu
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   SCROLL EFFECTS (Navbar Shadow)
   ============================================ */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

/* ============================================
   SEMESTER PAGE REDIRECT
   ============================================ */
function openSemester(semNumber) {
    // Redirect to semester page
    window.location.href = `semesters/sem${semNumber}.html`;
}

/* ============================================
   SUBJECT PAGE REDIRECT
   ============================================ */
function openSubject(semNumber, subjectName) {
    // Redirect to subject page
    window.location.href = `subjects/sem${semNumber}/${subjectName}.html`;
}

/* ============================================
   GO BACK FUNCTION
   ============================================ */
function goBack() {
    window.history.back();
}

/* ============================================
   GO TO HOME
   ============================================ */
function goHome() {
    // Check current path depth and adjust
    const path = window.location.pathname;
    
    if (path.includes('/subjects/')) {
        window.location.href = '../../index.html';
    } else if (path.includes('/semesters/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

/* ============================================
   DOWNLOAD TRACKING (Optional)
   ============================================ */
function trackDownload(fileName) {
    console.log(`📥 Downloaded: ${fileName}`);
    // You can add analytics here later
}

/* ============================================
   SEARCH FUNCTIONALITY (For Future)
   ============================================ */
function searchSubjects(query) {
    query = query.toLowerCase().trim();
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        
        if (text.includes(query) || query === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ============================================
   LOADING ANIMATION
   ============================================ */
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader-overlay';
    loader.innerHTML = `
        <div class="loader">
            <i class="fas fa-pills fa-spin"></i>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader-overlay');
    if (loader) {
        loader.remove();
    }
}

/* ============================================
   TOAST NOTIFICATION (For Future)
   ============================================ */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
/* ============================================
   TAB SWITCHING FUNCTIONALITY
   ============================================ */
function showTab(tabName) {
    // Hide all tab contents
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all tab buttons
    const allTabs = document.querySelectorAll('.tab-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
    
    // Smooth scroll to content
    setTimeout(() => {
        selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}
