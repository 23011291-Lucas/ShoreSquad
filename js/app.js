// ShoreSquad JavaScript Application
// Main application functionality with performance optimizations

class ShoreSquadApp {
    constructor() {
        this.maps = {
            hero: null,
            main: null
        };
        this.weather = {
            apiKey: 'demo_key', // Replace with actual API key
            currentData: null
        };
        this.events = [];
        this.userLocation = null;
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            // Show loading overlay
            this.showLoading();
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        } catch (error) {
            console.error('Failed to initialize ShoreSquad app:', error);
            this.hideLoading();
        }
    }

    // Initialize all components
    async initializeComponents() {
        try {
            // Initialize navigation
            this.initNavigation();
            
            // Initialize maps
            await this.initMaps();
            
            // Get user location and weather
            await this.getUserLocation();
            await this.initWeather();
            
            // Load sample events
            this.loadSampleEvents();
            
            // Initialize scroll animations
            this.initScrollAnimations();
            
            // Initialize performance optimizations
            this.initPerformanceOptimizations();
            
            // Hide loading overlay
            setTimeout(() => this.hideLoading(), 1500);
            
        } catch (error) {
            console.error('Error initializing components:', error);
            this.hideLoading();
        }
    }

    // Navigation functionality
    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', 
                    navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
                );
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Initialize maps
    async initMaps() {
        try {
            // Initialize hero map preview
            await this.initHeroMap();
            
            // Initialize main interactive map
            await this.initMainMap();
            
        } catch (error) {
            console.error('Error initializing maps:', error);
        }
    }

    // Hero map preview
    async initHeroMap() {
        const heroMapContainer = document.getElementById('hero-map');
        if (!heroMapContainer) return;

        try {
            this.maps.hero = L.map('hero-map', {
                zoomControl: false,
                scrollWheelZoom: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                attributionControl: false
            }).setView([34.0522, -118.2437], 10); // Los Angeles area

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.maps.hero);

            // Add sample cleanup markers
            const sampleLocations = [
                { lat: 34.0195, lng: -118.4912, name: 'Santa Monica Beach' },
                { lat: 33.9850, lng: -118.4695, name: 'Manhattan Beach' },
                { lat: 33.8536, lng: -118.3927, name: 'Redondo Beach' }
            ];

            sampleLocations.forEach(location => {
                const marker = L.marker([location.lat, location.lng]).addTo(this.maps.hero);
                marker.bindPopup(`<strong>${location.name}</strong><br>Beach Cleanup Event`);
            });

        } catch (error) {
            console.error('Error initializing hero map:', error);
            // Fallback: show a styled placeholder
            heroMapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #2E86AB, #83A598); color: white; font-size: 24px;">
                    🗺️ Interactive Map Preview
                </div>
            `;
        }
    }

    // Main interactive map
    async initMainMap() {
        const mainMapContainer = document.getElementById('main-map');
        if (!mainMapContainer) return;

        try {
            this.maps.main = L.map('main-map').setView([34.0522, -118.2437], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.maps.main);

            // Add user location marker when available
            if (this.userLocation) {
                L.marker([this.userLocation.lat, this.userLocation.lng])
                    .addTo(this.maps.main)
                    .bindPopup('Your Location')
                    .openPopup();
            }

        } catch (error) {
            console.error('Error initializing main map:', error);
            mainMapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #6c757d; font-size: 18px;">
                    Map temporarily unavailable. Please try again later.
                </div>
            `;
        }
    }

    // Get user location
    async getUserLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                console.log('Geolocation not supported');
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(this.userLocation);
                },
                (error) => {
                    console.log('Geolocation error:', error.message);
                    // Default to Los Angeles if location access denied
                    this.userLocation = { lat: 34.0522, lng: -118.2437 };
                    resolve(this.userLocation);
                },
                { timeout: 10000 }
            );
        });
    }

    // Weather functionality
    async initWeather() {
        try {
            // Use mock data for demo (replace with actual API)
            await this.loadMockWeatherData();
            this.updateWeatherDisplay();
            
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.displayWeatherError();
        }
    }

    // Load mock weather data
    async loadMockWeatherData() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.weather.currentData = {
            location: 'Santa Monica, CA',
            condition: 'Partly Cloudy',
            temperature: 72,
            wind: 8,
            humidity: 65,
            visibility: 16,
            icon: '⛅'
        };
    }

    // Update weather display
    updateWeatherDisplay() {
        if (!this.weather.currentData) return;

        const data = this.weather.currentData;
        
        document.getElementById('weather-location').textContent = data.location;
        document.getElementById('weather-condition').textContent = data.condition;
        document.getElementById('weather-temp').textContent = `${data.temperature}°F`;
        document.getElementById('weather-wind').textContent = `${data.wind} mph`;
        document.getElementById('weather-humidity').textContent = `${data.humidity}%`;
        document.getElementById('weather-visibility').textContent = `${data.visibility} mi`;
        document.getElementById('weather-icon').textContent = data.icon;
    }

    // Display weather error
    displayWeatherError() {
        document.getElementById('weather-location').textContent = 'Weather Unavailable';
        document.getElementById('weather-condition').textContent = 'Please try again later';
        document.getElementById('weather-temp').textContent = '--°';
        document.getElementById('weather-wind').textContent = '-- mph';
        document.getElementById('weather-humidity').textContent = '--%';
        document.getElementById('weather-visibility').textContent = '-- mi';
    }

    // Load sample events
    loadSampleEvents() {
        this.events = [
            {
                id: 1,
                title: 'Santa Monica Beach Cleanup',
                date: '2025-06-15',
                time: '09:00',
                location: 'Santa Monica Pier',
                attendees: 24,
                description: 'Join us for a morning beach cleanup!'
            },
            {
                id: 2,
                title: 'Venice Beach Squad Meetup',
                date: '2025-06-18',
                time: '16:00',
                location: 'Venice Beach Boardwalk',
                attendees: 18,
                description: 'Evening cleanup with snacks provided'
            },
            {
                id: 3,
                title: 'Malibu Coastal Cleanup',
                date: '2025-06-22',
                time: '08:00',
                location: 'Malibu Creek State Park',
                attendees: 31,
                description: 'Help protect our beautiful coastline'
            }
        ];

        this.updateEventsList();
    }

    // Update events list display
    updateEventsList() {
        const eventList = document.getElementById('event-list');
        if (!eventList) return;

        eventList.innerHTML = this.events.map(event => `
            <div class="event-item" style="
                background: white;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <h4 style="margin: 0 0 0.5rem 0; color: #1B263B;">${event.title}</h4>
                <p style="margin: 0 0 0.5rem 0; color: #6C757D; font-size: 0.9rem;">
                    📅 ${new Date(event.date).toLocaleDateString()} at ${event.time}
                </p>
                <p style="margin: 0 0 0.5rem 0; color: #6C757D; font-size: 0.9rem;">
                    📍 ${event.location}
                </p>
                <p style="margin: 0; color: #2E86AB; font-weight: 500;">
                    👥 ${event.attendees} attending
                </p>
            </div>
        `).join('');
    }

    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .stat, .weather-widget').forEach(el => {
            observer.observe(el);
        });
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Lazy load images when they come into view
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Throttled scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        });
    }

    // Handle window resize
    handleResize() {
        // Invalidate map sizes if they exist
        if (this.maps.hero) {
            this.maps.hero.invalidateSize();
        }
        if (this.maps.main) {
            this.maps.main.invalidateSize();
        }
    }

    // Handle scroll events
    handleScroll() {
        // Add any scroll-based functionality here
        // For example, parallax effects, progress indicators, etc.
    }

    // Utility functions
    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    // Public API methods for interaction
    searchLocation(query) {
        console.log('Searching for:', query);
        // Implement location search functionality
    }

    joinEvent(eventId) {
        console.log('Joining event:', eventId);
        // Implement event joining functionality
    }

    createEvent(eventData) {
        console.log('Creating event:', eventData);
        // Implement event creation functionality
    }

    shareEvent(eventId) {
        console.log('Sharing event:', eventId);
        // Implement social sharing functionality
        if (navigator.share) {
            navigator.share({
                title: 'ShoreSquad Beach Cleanup Event',
                text: 'Join me for this beach cleanup event!',
                url: window.location.href
            });
        }
    }
}

// Initialize the application
const shoreSquadApp = new ShoreSquadApp();

// Global functions for button interactions
window.searchLocation = function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
        shoreSquadApp.searchLocation(searchInput.value.trim());
    }
};

window.joinSquad = function() {
    console.log('Join Squad clicked');
    // Implement user registration/login
    alert('Join Squad feature coming soon! 🌊');
};

window.startExploring = function() {
    document.querySelector('#map').scrollIntoView({ behavior: 'smooth' });
};

window.watchDemo = function() {
    console.log('Watch Demo clicked');
    alert('Demo video coming soon! 🎥');
};

window.createEvent = function() {
    console.log('Create Event clicked');
    alert('Event creation feature coming soon! 📅');
};

window.findSquad = function() {
    console.log('Find Squad clicked');
    alert('Squad finder feature coming soon! 👥');
};

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.searchLocation();
            }
        });
    }

    // Add click handlers to buttons
    const buttons = {
        '.btn:contains("Start Exploring")': window.startExploring,
        '.btn:contains("Watch Demo")': window.watchDemo,
        '.btn:contains("Join Squad")': window.joinSquad,
        '.btn:contains("Create Event")': window.createEvent,
        '.btn:contains("Find Squad")': window.findSquad
    };

    // More robust button selection and event binding
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Start Exploring')) {
            btn.addEventListener('click', window.startExploring);
        } else if (btn.textContent.includes('Watch Demo')) {
            btn.addEventListener('click', window.watchDemo);
        } else if (btn.textContent.includes('Join Squad')) {
            btn.addEventListener('click', window.joinSquad);
        } else if (btn.textContent.includes('Create Event')) {
            btn.addEventListener('click', window.createEvent);
        } else if (btn.textContent.includes('Find Squad')) {
            btn.addEventListener('click', window.findSquad);
        }
    });
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoreSquadApp;
}
