document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
    }
});

setTimeout(() => {
     document.getElementById('loading-screen').style.opacity = '0';
        document.getElementById('loading-screen').style.visibility = 'hidden';
    if (elements.loadingScreen) {
        elements.loadingScreen.style.opacity = '0';
        elements.loadingScreen.style.visibility = 'hidden';
        
        // Set loading screen theme
        if (localStorage.getItem('theme') === 'dark') {
            elements.loadingScreen.classList.add('dark');
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            elements.loadingScreen.classList.remove('dark');
            updateThemeIcon(false);
        }
    }
}, 1500);
document.addEventListener('DOMContentLoaded', () => {
    // Initial loading 
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            if (localStorage.getItem('theme') === 'dark') {
                loadingScreen.classList.add('dark');
                document.body.classList.add('dark-mode');
                document.querySelector('#theme-toggle i')?.classList.replace('fa-moon', 'fa-sun');
            }
        }
    }, 1500);

    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const texts = ["Software Engineer", "Web Developer", "UI/UX Designer"];
        let textIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            typewriterText.textContent = currentText.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
            
            if (isDeleting) {
                charIndex--;
                typingSpeed = 50;
            } else {
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        };
        setTimeout(typeWriter, 1800);
    }

    //  Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            document.getElementById('loading-screen')?.classList.toggle('dark', isDark);
            if (themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isDark);
                themeIcon.classList.toggle('fa-sun', isDark);
            }
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenuBtn && navLinks) {
        const mobileMenuIcon = mobileMenuBtn.querySelector('i');
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            if (mobileMenuIcon) {
                const isActive = navLinks.classList.contains('active');
                mobileMenuIcon.classList.toggle('fa-bars', !isActive);
                mobileMenuIcon.classList.toggle('fa-times', isActive);
            }
        };
        mobileMenuBtn.addEventListener('click', toggleMenu);
        document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', toggleMenu));
    }

    // Acadamic Table
    const academicData = [
        { year: "2025-Present", institution: "University of Engineering and Technology", degree: "BS Software Engineering", grade: "3.5/4.0" },
        { year: "2023-2025", institution: "Noor School and College Mansehra", degree: "FSc Computer Science", grade: "A+" },
        { year: "2021-2023", institution: "The Peace School and College Mansehra", degree: "Matriculation", grade: "A+" },
        { year: "2025", institution: "DigiSkills", degree: "Freelancing", grade: "Ongoing" }
    ];

    const tableBody = document.getElementById('academic-table-body');
    if (tableBody) {
        const populateTable = (data) => {
            tableBody.innerHTML = data.map(item => 
                `<tr><td>${item.year}</td><td>${item.institution}</td><td>${item.degree}</td><td>${item.grade}</td></tr>`
            ).join('');
        };
        populateTable(academicData);
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            const debounce = (func, wait) => {
                let timeout;
                return (...args) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func(...args), wait);
                };
            };
            
            searchInput.addEventListener('input', debounce(() => {
                const term = searchInput.value.toLowerCase();
                const filtered = academicData.filter(item => 
                    item.institution.toLowerCase().includes(term) ||
                    item.degree.toLowerCase().includes(term) ||
                    item.grade.toLowerCase().includes(term)
                );
                populateTable(filtered);
            }, 300));
        }

        // Sort select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                const value = sortSelect.value;
                let sorted = [...academicData];
                
                if (value.includes('year')) {
                    sorted.sort((a, b) => {
                        const aYear = parseInt(a.year.split('-')[0]) || 0;
                        const bYear = parseInt(b.year.split('-')[0]) || 0;
                        return value === 'year-desc' ? bYear - aYear : aYear - bYear;
                    });
                } else if (value === 'institution' || value === 'degree') {
                    sorted.sort((a, b) => a[value].localeCompare(b[value]));
                } else if (value === 'grade-desc') {
                    sorted.sort((a, b) => b.grade.localeCompare(a.grade));
                }
                
                populateTable(sorted);
            });
        }
    }

    // Skill portion
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-card').forEach(card => {
            const progressBar = card.querySelector('.skill-progress');
            if (progressBar) {
                setTimeout(() => progressBar.style.width = progressBar.getAttribute('data-width') + '%', 300);
            }
        });
    };

const viewBtn = document.getElementById("view-cv");
const modal = document.getElementById("cv-modal");
const closeBtn = document.getElementById("close-cv");
const navbar = document.getElementById("nav-links");

// Cv portion
viewBtn.addEventListener("click", () => {
    const navHeight = navbar.offsetHeight;

    modal.style.display = "flex";
    modal.style.alignItems = "flex-start";
    modal.style.paddingTop = navHeight + 40 + "px";

    document.body.style.overflow = "hidden";
});

// Close with cross
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Close when clicking outside CV
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
    // Project Data
const projects = {
  'smart-home': {
    title: 'Smart Home Control System',
    image: 'images/image.jpg',
    description: 'A comprehensive smart home simulation built in C language using functions and control structures to manage various home appliances. This project implements a user-friendly interface for controlling lights, temperature, security systems, and other home devices.',
    details: 'The system features real-time monitoring, automated scheduling, and energy consumption tracking. Users can control devices remotely and set up automated routines based on time or sensor inputs.',
    technologies: ['C Programming', 'Data Structures', 'File Handling', 'Control Systems'],
    liveDemo: '#',
    github: '#'
  },
  'analytics-dashboard': {
    title: 'Analytics Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    description: 'Interactive data visualization dashboard built with D3.js and React. This dashboard provides real-time analytics and insights for business intelligence.',
    details: 'Features include dynamic charts, real-time data updates, user authentication, and customizable widgets. The dashboard supports multiple data sources and export functionality.',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Express'],
    liveDemo: '#',
    github: '#'
  },
  'fitness-app': {
    title: 'Fitness App UI',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    description: 'Mobile fitness application design with React Native for tracking workouts, nutrition, and progress.',
    details: 'Includes workout plans, exercise library, progress tracking, calorie counter, and social features. The app syncs with wearable devices and provides personalized recommendations.',
    technologies: ['React Native', 'Redux', 'Firebase', 'REST API'],
    liveDemo: '#',
    github: '#'
  },
  'finance-dashboard': {
    title: 'Finance Dashboard',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    description: 'Real-time financial tracking and management application with advanced reporting features.',
    details: 'Track expenses, income, investments, and generate financial reports. Includes budgeting tools, bill reminders, and investment portfolio management.',
    technologies: ['JavaScript', 'Chart.js', 'Python', 'Django', 'PostgreSQL'],
    liveDemo: '#',
    github: '#'
  }
};

    // Contact With me
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const formSuccess = document.getElementById('form-success');
        
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Reset errors
            [nameError, emailError, messageError].forEach(el => el && (el.style.display = 'none'));
            [nameInput, emailInput, messageInput].forEach(el => el && el.classList.remove('error'));
            formSuccess && (formSuccess.style.display = 'none');
            
            let isValid = true;
            
            // Validate inputs
            if (!nameInput?.value.trim()) {
                nameError && (nameError.style.display = 'block');
                nameInput?.classList.add('error');
                isValid = false;
            }
            
            if (!emailInput?.value.trim()) {
                emailError && (emailError.textContent = 'Email is required', emailError.style.display = 'block');
                emailInput?.classList.add('error');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError && (emailError.textContent = 'Please enter a valid email address', emailError.style.display = 'block');
                emailInput?.classList.add('error');
                isValid = false;
            }
            
            if (!messageInput?.value.trim()) {
                messageError && (messageError.style.display = 'block');
                messageInput?.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                formSuccess && (formSuccess.style.display = 'block');
                contactForm.reset();
                formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                contactForm.style.transform = 'scale(1.02)';
                setTimeout(() => contactForm.style.transform = 'scale(1)', 300);
            }
        });
    }
    // Scroll animations 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') animateSkillBars();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.profile-card, .academic-table, .cv-viewer, .skill-card, .gallery-item, .contact-form').forEach(el => observer.observe(el));

    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Active nav bar
    const highlightNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
});