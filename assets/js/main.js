// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TYPING EFFECT ---
    const roles = ["Web Developer", "Programmer", "Data Anayst", ];
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

            // Store the inner content of the card in a variable
            const cardContent = `
                <img src="${project.image}" alt="${project.title} Screenshot" onerror="this.onerror=null;this.src='https.placehold.co/600x400/1a1a2e/e0e0e0?text=Image+Not+Found';">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            `;

            // Check if the project has a URL
            if (project.url) {
                const projectLink = document.createElement('a');
                projectLink.href = project.url;
                projectLink.target = "_blank"; // Open in a new tab
                projectLink.rel = "noopener noreferrer";
                projectLink.style.textDecoration = 'none'; // Remove underline from link
                projectLink.style.color = 'inherit';      // Use parent text color
                projectLink.innerHTML = cardContent;
                projectCard.appendChild(projectLink);
            } else {
                // If no URL, just set the content directly
                projectCard.innerHTML = cardContent;
            }

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
        const text = heroTitle.innerText;
        heroTitle.innerHTML = ''; // Clear original text
        const letters = text.split('');

        // Wrap each letter in a span
        letters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            if (letter.trim() === '') {
                // Use a non-breaking space to make spaces hoverable
                span.innerHTML = '&nbsp;';
            }
            heroTitle.appendChild(span);
        });

        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.addEventListener('mouseover', () => {
                // Add class to the hovered span and its direct neighbors
                span.classList.add('hover-yellow');
                if (spans[index - 1]) spans[index - 1].classList.add('hover-yellow');
                if (spans[index + 1]) spans[index + 1].classList.add('hover-yellow');
            });

            span.addEventListener('mouseout', () => {
                // Remove classes on mouse out
                span.classList.remove('hover-yellow');
                if (spans[index - 1]) spans[index - 1].classList.remove('hover-yellow');
                if (spans[index + 1]) spans[index + 1].classList.remove('hover-yellow');
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
    const trailCount = 10;
    const trails = [];

    // Create trail elements
    for(let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        document.body.appendChild(trail);
        trails.push({
            el: trail,
            x: -20,
            y: -20
        });
    }

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
        
        // Animate trail
        let prevTrail = {x: outlineX, y: outlineY};
        trails.forEach((trail, index) => {
            const currentTrail = trail;
            const nextTrail = trails[index + 1] || trails[0];
            
            currentTrail.x += (prevTrail.x - currentTrail.x) * 0.4;
            currentTrail.y += (prevTrail.y - currentTrail.y) * 0.4;
            
            const size = 10 - index * 0.5; // Decrease size for each trail element
            currentTrail.el.style.width = `${size}px`;
            currentTrail.el.style.height = `${size}px`;
            currentTrail.el.style.left = `${currentTrail.x}px`;
            currentTrail.el.style.top = `${currentTrail.y}px`;

            prevTrail = currentTrail;
        });


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

    // Add color inversion effect for the contact section
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
