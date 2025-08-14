// Make sure the DOM is ready before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get my elements from the page
    const questForm = document.getElementById('add-quest-form');
    const questInput = document.getElementById('quest-input');
    const questList = document.getElementById('quest-list');
    const levelDisplay = document.getElementById('level');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const levelUpModal = document.getElementById('level-up-modal');
    const modalLevelText = document.querySelector('#level-up-modal p'); // The modal's text
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const controls = document.querySelector('.controls');

    // Sound effects
    const coinSound = document.getElementById('coin-sound');
    const completeSound = document.getElementById('complete-sound');
    const levelupSound = document.getElementById('levelup-sound');

    // Game variables - load from localStorage or set defaults
    let quests = JSON.parse(localStorage.getItem('quests')) || [];
    let level = parseInt(localStorage.getItem('level')) || 1;
    let xp = parseInt(localStorage.getItem('xp')) || 0;
    const xpForNextLevel = 100; // How much XP for a level up

    // Event Listeners

    // Handle adding new quests
    questForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting normally
        const questText = questInput.value.trim();

        if (questText !== '') {
            addQuest(questText);
            questInput.value = ''; // Clear the input
        }
    });

    // Handle clicks on the quest list itself (for complete or delete)
    questList.addEventListener('click', (e) => {
        const questItem = e.target.closest('.quest-item');
        if (!questItem) return; // Ignore clicks that aren't on a quest item

        const questId = questItem.dataset.id;

        // Check for delete button click
        if (e.target.classList.contains('delete-btn')) {
            deleteQuest(questId);
        } else {
            // Otherwise, it was a click to complete the quest
            toggleComplete(questId);
        }
    });

    // Handle closing the modal
    modalCloseBtn.addEventListener('click', () => {
        levelUpModal.classList.remove('show');
    });
    
    // My game functions

    function addQuest(text) {
        const newQuest = {
            id: Date.now().toString(), // Simple unique ID
            text: text,
            completed: false
        };
        quests.push(newQuest);
        coinSound.play(); // Play the coin sound!
        saveAndRender();
    }

    function toggleComplete(id) {
        const quest = quests.find(q => q.id === id);
        if (quest && !quest.completed) {
            quest.completed = true;
            addXp(25); // Give some XP
            completeSound.play();
        } else if (quest) {
            // Optional: allow un-completing a task
            // quest.completed = false;
        }
        saveAndRender();
    }

    function deleteQuest(id) {
        quests = quests.filter(q => q.id !== id);
        saveAndRender();
    }

    function addXp(amount) {
        xp += amount;
        if (xp >= xpForNextLevel) {
            levelUp();
        }
        updateStats();
    }

    function levelUp() {
        level++;
        xp -= xpForNextLevel; // Reset XP but carry over any extra
        levelupSound.play();

        // Show our custom modal instead of the ugly alert!
        modalLevelText.textContent = `You are now Level ${level}!`; // Update the level text in the modal
        levelUpModal.classList.add('show'); // Show the modal
    }

    function updateStats() {
        levelDisplay.textContent = level;
        const xpPercentage = (xp / xpForNextLevel) * 100;
        xpBarFill.style.width = `${xpPercentage}%`;
    }

    function renderQuests() {
        questList.innerHTML = ''; // Clear the list before redrawing
        quests.forEach(quest => {
            const questElement = document.createElement('li');
            questElement.classList.add('quest-item');
            questElement.dataset.id = quest.id; // Store the id on the element

            if (quest.completed) {
                questElement.classList.add('completed');
            }

            // Set the inner HTML for the quest item
            questElement.innerHTML = `
                <span>${quest.text}</span>
                <button class="delete-btn">X</button>
            `;
            questList.appendChild(questElement);
        });
    }
    
    function saveAndRender() {
        // Save everything to localStorage
        localStorage.setItem('quests', JSON.stringify(quests));
        localStorage.setItem('level', level);
        localStorage.setItem('xp', xp);

        // Redraw the UI
        renderQuests();
        updateStats();
    }

    // Start the game on page load
    saveAndRender();
    
    // My fix for the mobile keyboard covering the input
    function handleVirtualKeyboard() {
        // Don't run this on older browsers
        if (!window.visualViewport) {
            return;
        }

        // This relies on the CSS being set to position: fixed
        const onResize = () => {
            // Figure out how tall the keyboard is
            const keyboardHeight = window.innerHeight - window.visualViewport.height;
            
            // And push the controls up by that amount
            controls.style.bottom = `${keyboardHeight}px`;
        };

        window.visualViewport.addEventListener('resize', onResize);
    }

    // Set up the keyboard fix
    handleVirtualKeyboard();
});