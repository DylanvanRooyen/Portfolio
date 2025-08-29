// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TYPING EFFECT ---
    const roles = ["Web Developer", "Python Programmer", "Data Analyst"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-effect');
    const cursorElement = document.getElementById('cursor');

    function type() {
        if (typingElement && charIndex < roles[roleIndex].length) {
            typingElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (typingElement && charIndex > 0) {
            typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }

    // --- 2. DYNAMIC PROJECT LOADING & FILTERING ---
    const projectsGrid = document.querySelector('.projects-grid');
    const filtersContainer = document.getElementById('project-filters');
    let allProjects = []; // To store all fetched projects

    // Fetch project data from the JSON file
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allProjects = data;
            displayProjects(allProjects);
            createFilterButtons(allProjects);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            if(projectsGrid) {
                projectsGrid.innerHTML = `<p style="text-align: center; color: var(--accent-color);">Could not load projects. Please check the console for errors.</p>`;
            }
        });

        function displayProjects(projects) {
            if (!projectsGrid) return;
            projectsGrid.innerHTML = ''; // Clear existing projects
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.dataset.tags = project.tags.join(',');

                // Store the link for the "Live Demo" button
                const liveUrl = project.url ? `href="${project.url}" target="_blank" rel="noopener noreferrer"` : 'href="#"';
                
                // Store the link for the "View Code" button
                const codeUrl = project.codeUrl ? `href="${project.codeUrl}" target="_blank" rel="noopener noreferrer"` : 'href="#"';

                // --- THIS IS THE NEW HTML STRUCTURE ---
                projectCard.innerHTML = `
                    <div class="project-image-wrapper">
                        <img src="${project.image}" alt="${project.title} Screenshot" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a2e/e0e0e0?text=Image+Not+Found';">
                        <div class="project-hover-overlay">
                            <a ${liveUrl} class="overlay-btn">Live Demo</a>
                            <a ${codeUrl} class="overlay-btn">View Code</a>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `;

                projectsGrid.appendChild(projectCard);
            });
        }

    function createFilterButtons(projects) {
        if (!filtersContainer) return;
        const tags = new Set();
        projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.classList.add('filter-btn', 'active');
        allButton.addEventListener('click', () => filterProjects('All'));
        filtersContainer.appendChild(allButton);

        tags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.classList.add('filter-btn');
            button.addEventListener('click', () => filterProjects(tag));
            filtersContainer.appendChild(button);
        });
    }
    
    function filterProjects(tag) {
        const filteredProjects = tag === 'All' 
            ? allProjects 
            : allProjects.filter(p => p.tags.includes(tag));
        
        displayProjects(filteredProjects);
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === tag) {
                btn.classList.add('active');
            }
        });
    }

    // --- 3. HERO TITLE HOVER EFFECT ---
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        heroTitle.innerHTML = ''; // Clear original text
        
        const words = originalText.split(' ');
        const allEffectSpans = []; // Spans that get the hover effect

        words.forEach((word, index) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.style.display = 'inline-block'; // Prevents the word from breaking

            for (const letter of word) {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter'; // Add class for styling
                letterSpan.textContent = letter;
                wordWrapper.appendChild(letterSpan);
                allEffectSpans.push(letterSpan);
            }
            heroTitle.appendChild(wordWrapper);

            if (index < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'letter'; // Add class for styling
                spaceSpan.innerHTML = '&nbsp;';
                heroTitle.appendChild(spaceSpan);
                allEffectSpans.push(spaceSpan);
            }
        });

        allEffectSpans.forEach((span, index) => {
            span.addEventListener('mouseover', () => {
                span.classList.add('hover-yellow');
                if (allEffectSpans[index - 1]) allEffectSpans[index - 1].classList.add('hover-yellow');
                if (allEffectSpans[index + 1]) allEffectSpans[index + 1].classList.add('hover-yellow');
            });

            span.addEventListener('mouseout', () => {
                span.classList.remove('hover-yellow');
                if (allEffectSpans[index - 1]) allEffectSpans[index - 1].classList.remove('hover-yellow');
                if (allEffectSpans[index + 1]) allEffectSpans[index + 1].classList.remove('hover-yellow');
            });
        });
    }

    // --- 4. MOBILE NAVIGATION ---
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- 5. CUSTOM CURSOR & TRAIL EFFECT ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Animate dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Animate outline with a slight delay for a smoother feel
        const ease = 0.1;
        outlineX += (mouseX - outlineX) * ease;
        outlineY += (mouseY - outlineY) * ease;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .burger-menu');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.classList.add('cursor-grow');
        });
        el.addEventListener('mouseout', () => {
            cursorOutline.classList.remove('cursor-grow');
        });
    });

    // Add color inversion effect ONLY for the contact section
    const contactSection = document.getElementById('contact');
    contactSection.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-invert');
    });
    contactSection.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-invert');
    });

    // Start the animations
    animateCursor();
    if (typingElement) {
        type();
    }
});