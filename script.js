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

    //  theme button
    const themeToggle = document.getElementById('theme-button');
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
// Function to animate skill bars
const animateSkillBars = () => {
    document.querySelectorAll('.skill-card').forEach(card => {
        const progressBar = card.querySelector('.skill-progress');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progressBar.getAttribute('data-width') + '%';
            }, 300);
        }
    });
};

// Function to reset skill bars to 0%
const resetSkillBars = () => {
    document.querySelectorAll('.skill-progress').forEach(progressBar => {
        progressBar.style.width = '0%';
    });
};

const skillsSection = document.getElementById('skills');

if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            } else {
                resetSkillBars();
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(skillsSection);
}
// Cv portion
const viewBtn = document.getElementById("view-cv");
const modal = document.getElementById("cv-modal");
const closeBtn = document.getElementById("close-cv");
const navbar = document.getElementById("nav-links");
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

// Project Tracker
const DEFAULT_TASKS = [
  { id: 1, completed: false },
  { id: 2, completed: false },
  { id: 3, completed: false },
  { id: 4, completed: false },
  { id: 5, completed: false },
  { id: 6, completed: false }
];
let tasks = [];
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('projectTasks')) || [];
  tasks = DEFAULT_TASKS.map(defaultTask => {
    const savedTask = saved.find(t => t.id === defaultTask.id);
    return savedTask ? savedTask : defaultTask;
  });

  saveTasks();
}
function saveTasks() {
  localStorage.setItem('projectTasks', JSON.stringify(tasks));
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / total) * 100);

  document.getElementById('progressFill').style.width = percent + '%';
  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('completedTasks').textContent = completed;
  document.getElementById('totalTasks').textContent = total;

  updateStatusMessage(completed, total);
  updateTaskCards();
}

// STATUS MESSAGE 
function updateStatusMessage(done, total) {
  const el = document.getElementById('statusMessage');
  if (!el) return;
}

function updateTaskCards() {
  document.querySelectorAll('.task-card').forEach(card => {
    const id = Number(card.dataset.task);
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    card.classList.toggle('completed', task.completed);
  });
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  saveTasks();
  updateProgress();
}

document.getElementById('tasksContainer').addEventListener('click', e => {
  const card = e.target.closest('.task-card');
  if (!card) return;
  toggleTask(Number(card.dataset.task));
});

// ===== 9. INIT =====
loadTasks();
updateProgress();

// Project Data
const projects = {
  'smart-home': {
    title: 'Smart Home Control System',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    description: 'A comprehensive smart home simulation built in C language.',
    details: 'The system features real-time monitoring, automated scheduling, and energy consumption tracking.',
    technologies: ['C Programming', 'Data Structures', 'File Handling'],
    liveDemo: '#',
    github: '#'
  },
  'analytics-dashboard': {
    title: 'Analytics Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    description: 'Interactive data visualization dashboard.',
    details: 'Features include dynamic charts and real-time data updates.',
    technologies: ['React', 'D3.js', 'Node.js'],
    liveDemo: '#',
    github: '#'
  },
  'fitness-app': {
    title: 'Fitness App UI',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    description: 'Mobile fitness application design.',
    details: 'Includes workout plans and progress tracking.',
    technologies: ['React Native', 'Firebase'],
    liveDemo: '#',
    github: '#'
  }
};
function initProjects() {
  const modal = document.querySelector('.project-detail-overlay');
  const closeBtn = document.querySelector('.close-btn');
  
  console.log('Modal found:', !!modal);
  console.log('Close button found:', !!closeBtn);
  console.log('Gallery items found:', document.querySelectorAll('.gallery-item').length);
  
  //  close button
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }
  
  //  outside click to close
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
  
  //  project clicks
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.onclick = () => {
      console.log('Clicked project:', item.getAttribute('data-project'));
      const projectKey = item.getAttribute('data-project');
      const project = projects[projectKey];
      
      if (project && modal) {
        modal.querySelector('.project-detail-image').src = project.image;
        modal.querySelector('.project-detail-title').textContent = project.title;
        modal.querySelector('.project-detail-description').textContent = project.description;
        modal.querySelector('.project-detail-full').textContent = project.details;
        
        const techContainer = modal.querySelector('.project-technologies');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = tech;
          techContainer.appendChild(span);
        });
        modal.querySelector('.live-demo-btn').href = project.liveDemo;
        modal.querySelector('.github-btn').href = project.github;
        
        // Show modal
        modal.style.display = 'flex';
        console.log('Modal should be visible');
      }
    };
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
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
            
            [nameError, emailError, messageError].forEach(el => el && (el.style.display = 'none'));
            [nameInput, emailInput, messageInput].forEach(el => el && el.classList.remove('error'));
            formSuccess && (formSuccess.style.display = 'none');
            
            let isValid = true;
            
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
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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