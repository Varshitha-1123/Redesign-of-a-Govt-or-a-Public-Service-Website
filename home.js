// GovConnect - Government Services Portal
// Main Application JavaScript

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const contrastToggle = document.getElementById('contrastToggle');
const emergencyBanner = document.getElementById('emergencyBanner');
const emergencyMessage = document.getElementById('emergencyMessage');
const emergencyLink = document.getElementById('emergencyLink');
const globalSearch = document.getElementById('globalSearch');
const globalSearchBtn = document.getElementById('globalSearchBtn');
const loginBtn = document.getElementById('loginBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
const sections = document.querySelectorAll('.dashboard-section');
const categoriesGrid = document.getElementById('categoriesGrid');
const servicesGrid = document.getElementById('servicesGrid');
const newsGrid = document.getElementById('newsGrid');
const alertsList = document.getElementById('alertsList');
const statusGrid = document.getElementById('statusGrid');
const quicklinks = document.querySelectorAll('.quicklink');
const viewAllServices = document.getElementById('viewAllServices');
const loginModal = document.getElementById('loginModal');
const loginModalClose = document.getElementById('loginModalClose');
const loginForm = document.getElementById('loginForm');
const showPasswordBtn = document.getElementById('showPasswordBtn');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationModalClose = document.getElementById('confirmationModalClose');
const confirmationBody = document.getElementById('confirmationBody');
const feedbackToggle = document.getElementById('feedbackToggle');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackFormContent = document.getElementById('feedbackFormContent');
const languageBtns = document.querySelectorAll('.language-btn');
const feedbackWidget = document.getElementById('feedbackWidget');

// State
let services = [];
let categories = [];
let news = [];
let alerts = [];
let serviceStatus = [];
let currentLanguage = 'en';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Load sample data
    loadSampleData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial content
    renderCategories();
    renderPopularServices();
    renderNews();
    renderAlerts();
    renderServiceStatus();
    
    // Check for emergency alerts
    checkEmergencyAlerts();
});

// Load sample data
function loadSampleData() {
    // Categories data
    categories = [
        {
            id: 'transportation',
            name: 'Transportation',
            description: 'Driver licenses, vehicle registration, road services',
            icon: 'fas fa-car',
            services: 15
        },
        {
            id: 'tax',
            name: 'Tax Services',
            description: 'File taxes, make payments, get assistance',
            icon: 'fas fa-file-invoice-dollar',
            services: 12
        },
        {
            id: 'health',
            name: 'Health & Social',
            description: 'Healthcare, benefits, social services',
            icon: 'fas fa-heartbeat',
            services: 25
        },
        {
            id: 'business',
            name: 'Business',
            description: 'Business registration, permits, regulations',
            icon: 'fas fa-briefcase',
            services: 18
        },
        {
            id: 'education',
            name: 'Education',
            description: 'Schools, student aid, training programs',
            icon: 'fas fa-graduation-cap',
            services: 10
        },
        {
            id: 'housing',
            name: 'Housing',
            description: 'Property, utilities, assistance programs',
            icon: 'fas fa-home',
            services: 14
        },
        {
            id: 'legal',
            name: 'Legal & Safety',
            description: 'Courts, law enforcement, public safety',
            icon: 'fas fa-balance-scale',
            services: 20
        },
        {
            id: 'environment',
            name: 'Environment',
            description: 'Parks, conservation, environmental services',
            icon: 'fas fa-leaf',
            services: 8
        }
    ];

    // Services data
    services = [
        {
            id: 1,
            name: 'Renew Driver License',
            description: 'Renew your driver license online. You will need your current license and payment method.',
            category: 'transportation',
            time: '10-15 minutes',
            popular: true,
            online: true
        },
        {
            id: 2,
            name: 'File Income Tax',
            description: 'File your annual income tax return electronically. Free for eligible taxpayers.',
            category: 'tax',
            time: '20-30 minutes',
            popular: true,
            online: true
        },
        {
            id: 3,
            name: 'Apply for Benefits',
            description: 'Apply for healthcare, food, or housing assistance programs.',
            category: 'health',
            time: '30-45 minutes',
            popular: true,
            online: true
        },
        {
            id: 4,
            name: 'Register Vehicle',
            description: 'Register a new or used vehicle and get license plates.',
            category: 'transportation',
            time: '15-20 minutes',
            popular: false,
            online: true
        },
        {
            id: 5,
            name: 'Business License',
            description: 'Apply for or renew a business operating license.',
            category: 'business',
            time: '25-40 minutes',
            popular: true,
            online: true
        },
        {
            id: 6,
            name: 'Property Tax Payment',
            description: 'Make property tax payments online with multiple payment options.',
            category: 'tax',
            time: '5-10 minutes',
            popular: true,
            online: true
        },
        {
            id: 7,
            name: 'Birth Certificate',
            description: 'Request a certified copy of a birth certificate.',
            category: 'legal',
            time: '10-15 minutes',
            popular: false,
            online: true
        },
        {
            id: 8,
            name: 'Building Permit',
            description: 'Apply for residential or commercial building permits.',
            category: 'housing',
            time: '30-60 minutes',
            popular: false,
            online: true
        }
    ];

    // News data
    news = [
        {
            id: 1,
            title: 'New Online Tax Filing System Launched',
            excerpt: 'The government has launched a new, simplified tax filing system with enhanced security features.',
            date: '2023-10-15',
            category: 'announcement',
            readTime: '2 min'
        },
        {
            id: 2,
            title: 'Extended Hours for DMV Services',
            excerpt: 'To better serve citizens, DMV offices will now be open on Saturdays from 9 AM to 1 PM.',
            date: '2023-10-12',
            category: 'announcement',
            readTime: '1 min'
        },
        {
            id: 3,
            title: '2024 Budget Proposal Released',
            excerpt: 'The proposed budget focuses on education, healthcare, and infrastructure improvements.',
            date: '2023-10-10',
            category: 'policy',
            readTime: '5 min'
        },
        {
            id: 4,
            title: 'Public Health Advisory: Flu Season',
            excerpt: 'Health department urges vaccination as flu cases rise across the state.',
            date: '2023-10-08',
            category: 'announcement',
            readTime: '3 min'
        }
    ];

    // Alerts data
    alerts = [
        {
            id: 1,
            title: 'Severe Weather Warning',
            message: 'Severe thunderstorms expected in northern counties until 8 PM tonight.',
            time: '2 hours ago',
            type: 'urgent'
        },
        {
            id: 2,
            title: 'Tax Deadline Extension',
            message: 'Quarterly business tax deadline extended to October 20 due to system maintenance.',
            time: '1 day ago',
            type: 'info'
        },
        {
            id: 3,
            title: 'Road Closure Alert',
            message: 'Main Street between 5th and 8th will be closed for repairs this weekend.',
            time: '2 days ago',
            type: 'info'
        }
    ];

    // Service status data
    serviceStatus = [
        {
            id: 1,
            name: 'Tax Filing System',
            status: 'operational',
            message: 'All systems functioning normally'
        },
        {
            id: 2,
            name: 'DMV Online Services',
            status: 'operational',
            message: 'No issues reported'
        },
        {
            id: 3,
            name: 'Benefits Portal',
            status: 'degraded',
            message: 'Slower response times reported'
        },
        {
            id: 4,
            name: 'Online Payments',
            status: 'operational',
            message: 'Processing payments normally'
        }
    ];
}

// Set up event listeners
function setupEventListeners() {
    // High contrast toggle
    contrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        this.setAttribute('aria-label', isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode');
        showConfirmation(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
    });

    // Language selection
    languageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Global search
    globalSearchBtn.addEventListener('click', performGlobalSearch);
    globalSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performGlobalSearch();
    });

    // Login button
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
    });

    loginModalClose.addEventListener('click', function() {
        loginModal.classList.remove('active');
    });

    // Show password toggle
    showPasswordBtn.addEventListener('click', function() {
        const passwordInput = document.getElementById('loginPassword');
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate login process
        if (username && password) {
            loginModal.classList.remove('active');
            showConfirmation('Successfully signed in! Welcome back.');
            loginBtn.innerHTML = '<i class="fas fa-user-check"></i><span>My Account</span>';
        } else {
            showConfirmation('Please enter both username and password.', 'error');
        }
    });

    // Mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section id
            let targetId;
            if (this.id.includes('mobile')) {
                targetId = this.id.replace('mobile', '').replace('Link', 'Section');
            } else {
                targetId = this.id.replace('Link', 'Section');
            }
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                navLink.parentElement.classList.remove('active');
            });
            this.classList.add('active');
            this.parentElement.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Quick links
    quicklinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.id.replace('quick', '');
            navigateToService(service);
        });
    });

    // View all services
    viewAllServices.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('servicesLink').click();
    });

    // Confirmation modal close
    confirmationModalClose.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
    });

    // Feedback widget
    feedbackToggle.addEventListener('click', function() {
        feedbackForm.classList.toggle('active');
    });

    // Feedback form submission
    feedbackFormContent.addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = document.querySelector('.rating-stars i.active')?.getAttribute('data-rating') || 0;
        const comment = document.getElementById('feedbackComment').value;
        
        // Simulate feedback submission
        feedbackForm.classList.remove('active');
        showConfirmation('Thank you for your feedback! We appreciate your input.');
        
        // Reset form
        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.classList.remove('active');
        });
        document.getElementById('feedbackComment').value = '';
    });

    // Rating stars
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-star')) {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            const stars = document.querySelectorAll('.rating-stars i');
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === confirmationModal) {
            confirmationModal.classList.remove('active');
        }
        if (!feedbackWidget.contains(e.target) && !e.target.classList.contains('feedback-toggle')) {
            feedbackForm.classList.remove('active');
        }
    });

    // Emergency alert link
    emergencyLink.addEventListener('click', function(e) {
        e.preventDefault();
        showEmergencyDetails();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + / for search
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            globalSearch.focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            loginModal.classList.remove('active');
            confirmationModal.classList.remove('active');
            mobileMenu.classList.remove('active');
            feedbackForm.classList.remove('active');
        }
        
        // Alt + 1-7 for navigation
        if (e.altKey && e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            const links = Array.from(navLinks).filter(link => !link.id.includes('mobile'));
            if (links[index]) {
                links[index].click();
            }
        }
    });

    // Text size controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-btn')) {
            const size = e.target.getAttribute('data-size');
            setTextSize(size);
        }
        
        if (e.target.classList.contains('contrast-btn')) {
            const contrast = e.target.getAttribute('data-contrast');
            setContrastMode(contrast);
        }
        
        if (e.target.id === 'readAloudBtn') {
            toggleReadAloud();
        }
    });
}

// Render categories
function renderCategories() {
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-category', category.id);
        
        card.innerHTML = `
            <i class="${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-meta">
                <span>${category.services} services</span>
            </div>
        `;
        
        card.addEventListener('click', function() {
            navigateToCategory(category.id);
        });
        
        categoriesGrid.appendChild(card);
    });
}

// Render popular services
function renderPopularServices() {
    servicesGrid.innerHTML = '';
    
    const popularServices = services.filter(service => service.popular);
    
    popularServices.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        
        card.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-meta">
                <div class="service-time">
                    <i class="fas fa-clock"></i>
                    <span>${service.time}</span>
                </div>
                <button class="btn-service" data-service="${service.id}">
                    ${service.online ? 'Start Online' : 'Learn More'}
                </button>
            </div>
        `;
        
        const serviceBtn = card.querySelector('.btn-service');
        serviceBtn.addEventListener('click', function() {
            startService(service.id);
        });
        
        servicesGrid.appendChild(card);
    });
}

// Render news
function renderNews() {
    newsGrid.innerHTML = '';
    
    // Show only 3 latest news items on home page
    const latestNews = news.slice(0, 3);
    
    latestNews.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <div class="news-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${formattedDate}</span>
                <span>•</span>
                <span>${item.readTime} read</span>
            </div>
            <p>${item.excerpt}</p>
            <a href="#" class="btn-read-more" data-news="${item.id}">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        const readMoreBtn = newsItem.querySelector('.btn-read-more');
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            viewNewsArticle(item.id);
        });
        
        newsGrid.appendChild(newsItem);
    });
}

// Render alerts
function renderAlerts() {
    alertsList.innerHTML = '';
    
    alerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.type}`;
        
        alertItem.innerHTML = `
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
            <div class="alert-time">${alert.time}</div>
        `;
        
        alertItem.addEventListener('click', function() {
            showAlertDetails(alert.id);
        });
        
        alertsList.appendChild(alertItem);
    });
}

// Render service status
function renderServiceStatus() {
    statusGrid.innerHTML = '';
    
    serviceStatus.forEach(status => {
        const statusCard = document.createElement('div');
        statusCard.className = 'status-card';
        
        statusCard.innerHTML = `
            <div class="status-icon ${status.status}">
                <i class="fas fa-${getStatusIcon(status.status)}"></i>
            </div>
            <div class="status-info">
                <h4>${status.name}</h4>
                <p>${status.message}</p>
            </div>
        `;
        
        statusGrid.appendChild(statusCard);
    });
}

// Navigate to category
function navigateToCategory(categoryId) {
    document.getElementById('servicesLink').click();
    
    // In a real app, this would filter services by category
    showConfirmation(`Showing services for ${categoryId} category`);
}

// Start service
function startService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    if (service.online) {
        showConfirmation(`Starting ${service.name}... Redirecting to service form.`);
        // In a real app, this would redirect to the actual service
        setTimeout(() => {
            document.getElementById('documentsLink').click();
        }, 1000);
    } else {
        showConfirmation(`Please visit a service center for ${service.name}`);
    }
}

// View news article
function viewNewsArticle(newsId) {
    const article = news.find(n => n.id === newsId);
    if (!article) return;
    
    const date = new Date(article.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    confirmationBody.innerHTML = `
        <h2>${article.title}</h2>
        <div class="news-meta">
            <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
            <span><i class="fas fa-clock"></i> ${article.readTime} read</span>
            <span><i class="fas fa-tag"></i> ${article.category}</span>
        </div>
        <div class="news-content">
            <p>This is a detailed news article about "${article.title}". In a real implementation, this would contain the full article content.</p>
            <p>The government is committed to keeping citizens informed about important developments and initiatives.</p>
            <p>For more information, please contact the relevant department or visit your local government office.</p>
        </div>
        <div class="news-actions">
            <button class="btn-secondary" id="printArticleBtn">
                <i class="fas fa-print"></i> Print Article
            </button>
            <button class="btn-secondary" id="shareArticleBtn">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;
    
    // Add event listeners for action buttons
    document.getElementById('printArticleBtn').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('shareArticleBtn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`${article.title}\n\n${article.excerpt}`);
            showConfirmation('Article link copied to clipboard!');
        }
    });
    
    confirmationModal.classList.add('active');
}

// Show alert details
function showAlertDetails(alertId) {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;
    
    confirmationBody.innerHTML = `
        <h2>${alert.title}</h2>
        <div class="alert-meta">
            <span><i class="fas fa-clock"></i> ${alert.time}</span>
            <span class="alert-type ${alert.type}">${alert.type.toUpperCase()}</span>
        </div>
        <div class="alert-content">
            <p>${alert.message}</p>
            <p><strong>Action Required:</strong> ${getAlertAction(alert.type)}</p>
        </div>
        <div class="alert-actions">
            <button class="btn-primary" id="acknowledgeAlertBtn">
                <i class="fas fa-check"></i> Acknowledge Alert
            </button>
        </div>
    `;
    
    document.getElementById('acknowledgeAlertBtn').addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        showConfirmation('Alert acknowledged. Thank you for staying informed.');
    });
    
    confirmationModal.classList.add('active');
}

// Navigate to service from quick link
function navigateToService(service) {
    switch(service) {
        case 'License':
            showConfirmation('Opening Driver License services...');
            document.getElementById('servicesLink').click();
            break;
        case 'Tax':
            showConfirmation('Opening Tax services...');
            document.getElementById('servicesLink').click();
            break;
        case 'Vote':
            showConfirmation('Opening Voter Registration...');
            document.getElementById('documentsLink').click();
            break;
        case 'Permit':
            showConfirmation('Opening Permits & Licenses...');
            document.getElementById('servicesLink').click();
            break;
        case 'Benefits':
            showConfirmation('Opening Benefits & Assistance...');
            document.getElementById('servicesLink').click();
            break;
        case 'Report':
            showConfirmation('Opening Issue Reporting...');
            document.getElementById('contactLink').click();
            break;
    }
}

// Perform global search
function performGlobalSearch() {
    const query = globalSearch.value.trim().toLowerCase();
    
    if (!query) {
        showConfirmation('Please enter a search term', 'error');
        return;
    }
    
    // Simulate search results
    const results = [
        ...services.filter(s => s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)),
        ...categories.filter(c => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query))
    ];
    
    if (results.length === 0) {
        confirmationBody.innerHTML = `
            <h2>No Results Found</h2>
            <p>No matches found for "${query}".</p>
            <p>Try searching with different keywords or browse our services by category.</p>
            <button class="btn-primary" id="browseServicesBtn">
                <i class="fas fa-concierge-bell"></i> Browse All Services
            </button>
        `;
        
        document.getElementById('browseServicesBtn').addEventListener('click', function() {
            confirmationModal.classList.remove('active');
            document.getElementById('servicesLink').click();
        });
    } else {
        confirmationBody.innerHTML = `
            <h2>Search Results for "${query}"</h2>
            <p>Found ${results.length} results:</p>
            <div class="search-results">
                ${results.slice(0, 5).map(result => `
                    <div class="search-result">
                        <h4>${result.name}</h4>
                        <p>${result.description || `Contains ${result.services} services`}</p>
                    </div>
                `).join('')}
            </div>
            ${results.length > 5 ? `<p>... and ${results.length - 5} more results</p>` : ''}
        `;
    }
    
    confirmationModal.classList.add('active');
    globalSearch.value = '';
}

// Check for emergency alerts
function checkEmergencyAlerts() {
    // Simulate checking for alerts
    const hasEmergency = Math.random() > 0.7; // 30% chance of emergency
    
    if (hasEmergency) {
        const emergencies = [
            {
                message: 'Severe weather warning in effect until 8 PM.',
                link: '#'
            },
            {
                message: 'Road closures due to emergency repairs.',
                link: '#'
            },
            {
                message: 'Public health advisory: High air quality alert.',
                link: '#'
            }
        ];
        
        const emergency = emergencies[Math.floor(Math.random() * emergencies.length)];
        emergencyMessage.textContent = emergency.message;
        emergencyLink.href = emergency.link;
        emergencyBanner.style.display = 'block';
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            emergencyBanner.style.display = 'none';
        }, 30000);
    }
}

// Show emergency details
function showEmergencyDetails() {
    confirmationBody.innerHTML = `
        <h2>Emergency Alert Details</h2>
        <div class="emergency-content">
            <p><strong>Severity:</strong> HIGH</p>
            <p><strong>Affected Areas:</strong> Multiple counties</p>
            <p><strong>Valid Until:</strong> Today, 8:00 PM</p>
            
            <h3>Instructions:</h3>
            <ul>
                <li>Stay indoors if possible</li>
                <li>Avoid unnecessary travel</li>
                <li>Monitor local news for updates</li>
                <li>Have emergency supplies ready</li>
            </ul>
            
            <h3>Emergency Contacts:</h3>
            <ul>
                <li>Emergency Services: 911</li>
                <li>Non-emergency Police: 311</li>
                <li>Weather Updates: 1-800-WEATHER</li>
            </ul>
        </div>
        <button class="btn-primary" id="acknowledgeEmergencyBtn">
            <i class="fas fa-check-circle"></i> I Understand
        </button>
    `;
    
    document.getElementById('acknowledgeEmergencyBtn').addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        emergencyBanner.style.display = 'none';
        showConfirmation('Emergency alert acknowledged. Stay safe!');
    });
    
    confirmationModal.classList.add('active');
}

// Set language
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    languageBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Show confirmation
    const languages = {
        en: 'English',
        es: 'Spanish',
        fr: 'French'
    };
    
    showConfirmation(`Language changed to ${languages[lang]}`);
    
    // In a real app, this would load translations
    // For now, we'll just simulate it
    if (lang !== 'en') {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            // In real implementation, this would fetch from translation dictionary
        });
    }
}

// Show confirmation message
function showConfirmation(message, type = 'success') {
    confirmationBody.innerHTML = `
        <div class="confirmation-message ${type}">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <h3>${message}</h3>
            <p>${getConfirmationText(type)}</p>
        </div>
        <button class="btn-primary" id="closeConfirmationBtn">
            OK
        </button>
    `;
    
    document.getElementById('closeConfirmationBtn').addEventListener('click', function() {
        confirmationModal.classList.remove('active');
    });
    
    confirmationModal.classList.add('active');
    
    // Auto-close after 3 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (confirmationModal.classList.contains('active')) {
                confirmationModal.classList.remove('active');
            }
        }, 3000);
    }
}

// Set text size
function setTextSize(size) {
    document.body.classList.remove('text-small', 'text-large', 'text-xlarge');
    
    if (size !== 'medium') {
        document.body.classList.add(`text-${size}`);
    }
    
    // Update active button
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-size') === size);
    });
    
    localStorage.setItem('govconnect-text-size', size);
    showConfirmation(`Text size set to ${size}`);
}

// Set contrast mode
function setContrastMode(mode) {
    document.body.classList.remove('high-contrast', 'dark-mode');
    
    if (mode === 'high') {
        document.body.classList.add('high-contrast');
    } else if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Update active button
    document.querySelectorAll('.contrast-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-contrast') === mode);
    });
    
    localStorage.setItem('govconnect-contrast-mode', mode);
    showConfirmation(`Contrast mode set to ${mode}`);
}

// Toggle read aloud
function toggleReadAloud() {
    const isReading = document.body.classList.toggle('reading-mode');
    
    if (isReading) {
        // In a real app, this would use the Web Speech API
        showConfirmation('Reading assistance enabled. Text will be easier to read.');
    } else {
        showConfirmation('Reading assistance disabled.');
    }
}

// Helper functions
function getStatusIcon(status) {
    switch(status) {
        case 'operational': return 'check-circle';
        case 'degraded': return 'exclamation-triangle';
        case 'disrupted': return 'times-circle';
        default: return 'question-circle';
    }
}

function getAlertAction(type) {
    switch(type) {
        case 'urgent': return 'Take immediate precautions and follow official instructions.';
        case 'info': return 'Be aware of this information. No immediate action required.';
        default: return 'Review this information when convenient.';
    }
}

function getConfirmationText(type) {
    switch(type) {
        case 'success': return 'Your request has been processed successfully.';
        case 'error': return 'Please try again or contact support if the problem persists.';
        default: return 'Thank you for using GovConnect.';
    }
}

// Load saved preferences
function loadPreferences() {
    const savedSize = localStorage.getItem('govconnect-text-size');
    if (savedSize) {
        setTextSize(savedSize);
    }
    
    const savedContrast = localStorage.getItem('govconnect-contrast-mode');
    if (savedContrast) {
        setContrastMode(savedContrast);
    }
}

// Initialize preferences
loadPreferences();

// Accessibility features
// Add ARIA labels where needed
document.addEventListener('DOMContentLoaded', function() {
    // Add aria-current to active navigation
    const updateAriaCurrent = () => {
        document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
            if (link.classList.contains('active')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };
    
    // Update on navigation
    document.addEventListener('click', updateAriaCurrent);
    updateAriaCurrent();
    
    // Focus trap for modals
    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    };
    
    trapFocus(loginModal.querySelector('.modal-content'));
    trapFocus(confirmationModal.querySelector('.modal-content'));
});

// Keyboard navigation for service cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('service-card')) {
        const serviceId = e.target.querySelector('.btn-service')?.getAttribute('data-service');
        if (serviceId) startService(parseInt(serviceId));
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData && perfData.loadEventEnd) {
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log(`GovConnect loaded in ${loadTime.toFixed(2)}ms`);
            
            // Report slow loads for improvement
            if (loadTime > 3000) {
                console.warn('Page load time exceeded 3 seconds - consider optimization');
            }
        }
    });
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Offline detection
window.addEventListener('online', function() {
    showConfirmation('You are back online. All services are available.');
});

window.addEventListener('offline', function() {
    showConfirmation('You are currently offline. Some features may be limited.', 'error');
});

// Analytics simulation (privacy-friendly)
function trackEvent(category, action, label) {
    console.log(`[Analytics] ${category}: ${action} - ${label}`);
    // In a real app, this would send to Google Analytics or similar
}

// Track page views
trackEvent('Navigation', 'Page View', 'Home Page');