// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TYPING EFFECT ---
    const roles = ["Web Developer", "Python Programmer", "UI/UX Enthusiast"];
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

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title} Screenshot" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a2e/e0e0e0?text=Image+Not+Found';">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
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

    // Start the typing effect
    if (typingElement) {
        type();
    }
});
