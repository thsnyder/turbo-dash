// Initialize time and weather when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    loadSettings();
    updateTime();
    updateWeather();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Update weather every 30 minutes
    setInterval(updateWeather, 30 * 60 * 1000);

    loadAndDisplayQuote();
    initializeHabits();
    loadAndDisplayJoke();
    setupPunchlineClick();
    initializeMindfulness();
});

function loadSettings() {
    // Load settings from localStorage
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {
        theme: 'cupcake',
        name: 'Tom',
        links: [
            { name: 'Marketer Tools', url: 'https://marketertools.co' },
            { name: "Tom's Blog", url: 'https://tomsnyder.blog' },
            { name: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/turbologic' }
        ],
        icons: [
            { icon: 'coffee', url: 'https://buymeacoffee.com/turbologic' },
            { icon: 'linkedin', url: 'https://linkedin.com' }
        ],
        showQuote: true,
        showCalculator: false,
        showHabits: false,
        habits: [],
        showMindfulness: false
    };

    // Apply settings
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.querySelector('h1').textContent = `Hi, ${settings.name}`;
    
    // Update links on tab.html
    const linksContainer = document.querySelector('.links');
    if (linksContainer) {
        // Clear existing links
        linksContainer.innerHTML = '';
        
        // Add all links from settings
        settings.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.name;
            linkElement.className = 'text-xl font-bold hover:text-primary hover:underline transition-all';
            linksContainer.appendChild(linkElement);
        });

        // Hide the container if there are no links
        const linksWrapper = document.querySelector('.links-container');
        if (linksWrapper) {
            linksWrapper.style.display = settings.links.length ? 'block' : 'none';
        }
    }

    // Update quick icons
    const iconsContainer = document.querySelector('.quick-icons');
    console.log('Icons from settings:', settings.icons); // Debug log
    console.log('Icons container found:', iconsContainer); // Debug log

    if (iconsContainer) {
        iconsContainer.innerHTML = '';
        settings.icons.forEach(icon => {
            console.log('Creating icon:', icon);
            const iconLink = document.createElement('a');
            iconLink.href = icon.url;
            iconLink.className = 'p-4 hover:bg-base-200 rounded-xl transition-all group';
            
            if (icon.icon === 'reddit-icon') {
                iconLink.innerHTML = `<img src="lib/uploaded/reddit.svg" class="w-6 h-6 group-hover:stroke-primary transition-colors">`;
            } else if (icon.icon === 'google-icon') {
                iconLink.innerHTML = `<img src="lib/uploaded/google.svg" class="w-6 h-6 group-hover:stroke-primary transition-colors">`;
            } else if (icon.icon === 'google-drive-icon') {
                iconLink.innerHTML = `<img src="lib/uploaded/google-drive.svg" class="w-6 h-6 group-hover:stroke-primary transition-colors">`;
            } else {
                iconLink.innerHTML = `<i data-feather="${icon.icon}" class="stroke-current group-hover:stroke-primary transition-colors"></i>`;
            }
            
            iconsContainer.appendChild(iconLink);
        });
        
        // Initialize Feather icons only for non-custom icons
        feather.replace();
    }

    // Handle todo list visibility and items
    const todoContainer = document.getElementById('todo-container');
    if (todoContainer) {
        if (settings.showTodo) {
            todoContainer.style.display = 'block';
            initializeTodoList();
        } else {
            todoContainer.style.display = 'none';
        }
    }

    // Handle weather container visibility
    const weatherContainer = document.getElementById('weather');
    if (weatherContainer) {
        if (settings.showWeather) {
            weatherContainer.style.display = 'block';
            updateWeather();
        } else {
            weatherContainer.style.display = 'none';
        }
    }

    // Handle quote widget visibility
    const quoteContainer = document.getElementById('quote-container');
    if (quoteContainer) {
        quoteContainer.style.display = settings.showQuote ? 'block' : 'none';
        if (settings.showQuote) {
            loadAndDisplayQuote();
        }
    }

    // Handle calculator container visibility
    const calculatorContainer = document.getElementById('calculator-container');
    if (calculatorContainer) {
        calculatorContainer.style.display = settings.showCalculator ? 'block' : 'none';
        if (settings.showCalculator) {
            initializeCalculator();
        }
    }

    // Handle habits container visibility
    const habitsContainer = document.getElementById('habits-container');
    if (habitsContainer) {
        habitsContainer.style.display = settings.showHabits ? 'block' : 'none';
        if (settings.showHabits) {
            initializeHabits();
        }
    }

    // Handle mindfulness container visibility
    const mindfulnessContainer = document.getElementById('mindfulness-container');
    if (mindfulnessContainer) {
        mindfulnessContainer.style.display = settings.showMindfulness ? 'block' : 'none';
        if (settings.showMindfulness) {
            initializeMindfulness();
        }
    }
}

function saveSettings() {
    const settings = {
        theme: document.getElementById('theme-select').value,
        name: document.getElementById('name-input').value,
        showQuote: document.getElementById('show-quote').checked,
        links: [],
        showCalculator: document.getElementById('show-calculator').checked,
        showHabits: document.getElementById('show-habits').checked,
        habits: [],
        showMindfulness: document.getElementById('show-mindfulness').checked
    };

    // Get link values
    const linkInputs = document.querySelectorAll('.grid.gap-4 input');
    for (let i = 0; i < linkInputs.length; i += 2) {
        settings.links.push({
            name: linkInputs[i].value,
            url: linkInputs[i + 1].value
        });
    }

    // Save to localStorage
    localStorage.setItem('tabSettings', JSON.stringify(settings));

    // Apply settings
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.querySelector('h1').textContent = `Hi, ${settings.name}`;

    // Update link buttons
    const linkButtons = document.querySelectorAll('.links a');
    settings.links.forEach((link, index) => {
        linkButtons[index].textContent = link.name;
        linkButtons[index].href = link.url;
    });

    // Close modal
    document.getElementById('settings_modal').close();

    // Update quote display based on new settings
    const quoteContainer = document.getElementById('quote-container');
    if (quoteContainer) {
        quoteContainer.style.display = settings.showQuote ? 'block' : 'none';
        if (settings.showQuote) {
            loadAndDisplayQuote();
        }
    }

    // Handle calculator container visibility
    const calculatorContainer = document.getElementById('calculator-container');
    if (calculatorContainer) {
        calculatorContainer.style.display = settings.showCalculator ? 'block' : 'none';
        if (settings.showCalculator) {
            initializeCalculator();
        }
    }

    // Handle habits container visibility
    const habitsContainer = document.getElementById('habits-container');
    if (habitsContainer) {
        habitsContainer.style.display = settings.showHabits ? 'block' : 'none';
        if (settings.showHabits) {
            initializeHabits();
        }
    }

    // Handle mindfulness container visibility
    const mindfulnessContainer = document.getElementById('mindfulness-container');
    if (mindfulnessContainer) {
        mindfulnessContainer.style.display = settings.showMindfulness ? 'block' : 'none';
        if (settings.showMindfulness) {
            initializeMindfulness();
        }
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeElement = document.getElementById('clock');
    if (!timeElement) {
        console.error('Clock element not found');
        return;
    }
    timeElement.textContent = timeString;
}

async function updateWeather() {
    console.log('updateWeather function called');
    const weatherElement = document.getElementById('weather');
    if (!weatherElement || !JSON.parse(localStorage.getItem('tabSettings'))?.showWeather) return;

    // Get settings from localStorage
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const apiKey = settings.weatherApiKey;
    const lat = settings.weatherLat;
    const lon = settings.weatherLon;

    const loadingDiv = weatherElement.querySelector('.weather-loading');
    const errorDiv = weatherElement.querySelector('.weather-error'); 
    const dataDiv = weatherElement.querySelector('.weather-data');
    const tempSpan = dataDiv.querySelector('.temp');
    const descSpan = dataDiv.querySelector('.description');

    // Show loading, hide others
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    dataDiv.style.display = 'none';

    if (!apiKey || !lat || !lon) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = !apiKey ? 'Add Weather API Key in Settings' : 'Add Location in Settings';
        return;
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(response.status === 401 ? 'Invalid API key' : 'Weather data not available');
        }
        
        const data = await response.json();
        console.log('Weather data:', data);

        const temp = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert Kelvin to Fahrenheit
        const condition = data.weather[0].main;
        
        // Map OpenWeather conditions to Feather icons
        const weatherIcons = {
            'Clear': 'sun',
            'Clouds': 'cloud',
            'Rain': 'cloud-rain',
            'Drizzle': 'cloud-drizzle',
            'Thunderstorm': 'cloud-lightning',
            'Snow': 'cloud-snow',
            'Mist': 'cloud',
            'Smoke': 'cloud',
            'Haze': 'cloud',
            'Dust': 'wind',
            'Fog': 'cloud',
            'Sand': 'wind',
            'Ash': 'wind',
            'Squall': 'wind',
            'Tornado': 'wind'
        };

        const iconName = weatherIcons[condition] || 'cloud';
        
        weatherElement.innerHTML = `
            <div class="flex items-center justify-center gap-6">
                <i data-feather="${iconName}" class="w-20 h-20 stroke-current"></i>
                <span>${condition}, ${temp}°F</span>
            </div>
        `;
        
        feather.replace();
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherElement.innerHTML = `
            <div class="flex items-center justify-center gap-4">
                <i data-feather="alert-triangle" class="w-12 h-12"></i>
                <span>${error.message === 'Invalid API key' ? 'Invalid API Key' : 'Weather Unavailable'}</span>
            </div>
        `;
        feather.replace();
    }
}

function initializeTodoList() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const todoList = document.getElementById('todo-list');
    const todoInput = document.querySelector('.todo-input input');
    const addButton = document.querySelector('.add-todo');

    // Clear existing todos
    todoList.innerHTML = '';

    // Load saved todos
    settings.todos?.forEach(todo => {
        addTodoItem(todo.text, todo.completed);
    });

    // Add new todo handler
    addButton.addEventListener('click', () => {
        if (todoInput.value.trim()) {
            addTodoItem(todoInput.value.trim());
            todoInput.value = '';
            saveTodos();
        }
    });

    // Enter key handler
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && todoInput.value.trim()) {
            addTodoItem(todoInput.value.trim());
            todoInput.value = '';
            saveTodos();
        }
    });
}

function checkAllTodosComplete() {
    const todoItems = document.querySelectorAll('.todo-item');
    if (todoItems.length === 0) return false;
    
    const allComplete = Array.from(todoItems).every(item => item.querySelector('input').checked);
    if (allComplete) {
        const todoContainer = document.getElementById('todo-container');
        try {
            party.confetti(todoContainer, {
                count: party.variation.range(80, 100),
                spread: party.variation.range(50, 70),
            });
            console.log('Todo completion confetti triggered successfully');
        } catch (error) {
            console.error('Error triggering todo completion confetti:', error);
        }
    }
    return allComplete;
}

function addTodoItem(text, completed = false) {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item flex items-center gap-4 group';
    
    todoItem.innerHTML = `
        <input type="checkbox" class="checkbox checkbox-primary border-2 border-black" ${completed ? 'checked' : ''}>
        <span class="flex-grow text-xl ${completed ? 'line-through opacity-50' : ''}">${text}</span>
        <button class="delete-todo opacity-0 group-hover:opacity-100 transition-opacity btn btn-ghost btn-xs text-error">
            <i data-feather="x"></i>
        </button>
    `;

    // Add event listeners
    const checkbox = todoItem.querySelector('input');
    checkbox.addEventListener('change', () => {
        const span = todoItem.querySelector('span');
        span.classList.toggle('line-through');
        span.classList.toggle('opacity-50');
        saveTodos();
        checkAllTodosComplete();
    });

    const deleteButton = todoItem.querySelector('.delete-todo');
    deleteButton.addEventListener('click', () => {
        todoItem.remove();
        saveTodos();
    });

    todoList.appendChild(todoItem);
    feather.replace();
}

function saveTodos() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('span').textContent,
            completed: item.querySelector('input').checked
        });
    });
    settings.todos = todos;
    localStorage.setItem('tabSettings', JSON.stringify(settings));
}

async function loadAndDisplayQuote() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const quoteContainer = document.getElementById('quote-container');
    
    if (!settings.showQuote || !quoteContainer) {
        if (quoteContainer) quoteContainer.style.display = 'none';
        return;
    }

    quoteContainer.style.display = 'block';

    try {
        const response = await fetch('data/quotes.json');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        
        const quotes = await response.json();
        if (!Array.isArray(quotes) || quotes.length === 0) throw new Error('Invalid quotes data');
        
        const today = new Date().toISOString().split('T')[0];
        const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % quotes.length;
        
        const quote = quotes[randomIndex];
        
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        if (quoteText && quoteAuthor) {
            quoteText.textContent = `"${quote.quoteText}"`;
            quoteText.className = 'text-2xl font-serif italic leading-relaxed';
            const authorName = quote.quoteAuthor || 'Unknown';
            quoteAuthor.innerHTML = `- <a href="https://www.google.com/search?q=${encodeURIComponent(authorName)}" target="_blank" class="hover:text-primary hover:underline transition-colors">${authorName}</a>`;
            quoteAuthor.className = 'text-right text-lg font-medium text-base-content/80';
        }
    } catch (error) {
        console.error('Error loading quote:', error);
        if (quoteContainer) {
            quoteContainer.innerHTML = `
                <div class="flex flex-col gap-4">
                    <p class="text-2xl font-serif italic">Failed to load quote</p>
                    <p class="text-right text-lg font-medium text-base-content/80">Please try again later</p>
                </div>
            `;
        }
    }
}

function initializeCalculator() {
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    calcButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                // Clear the display and reset variables
                currentInput = '';
                operator = '';
                firstOperand = null;
            } else if (value === '=') {
                if (firstOperand !== null && operator) {
                    currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
                    firstOperand = null;
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
            }

            calcDisplay.value = currentInput;
        });
    });
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

function checkAllHabitsComplete() {
    const habitItems = document.querySelectorAll('.habit-item');
    if (habitItems.length === 0) return false;
    
    const allComplete = Array.from(habitItems).every(item => item.querySelector('input').checked);
    if (allComplete) {
        const habitsContainer = document.getElementById('habits-container');
        try {
            party.confetti(habitsContainer, {
                count: party.variation.range(80, 100),
                spread: party.variation.range(50, 70),
            });
            console.log('Habits completion confetti triggered successfully');
        } catch (error) {
            console.error('Error triggering habits completion confetti:', error);
        }
    }
    return allComplete;
}

function initializeHabits() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const habitsList = document.getElementById('habits-list');
    if (!habitsList || !settings.showHabits) return;

    // Clear existing habits
    habitsList.innerHTML = '';

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Load habits and their completion status
    settings.habits.forEach(habit => {
        const habitItem = document.createElement('div');
        habitItem.className = 'habit-item flex items-center gap-4 group';
        const isCompleted = habit.lastCompleted === today;
        
        habitItem.innerHTML = `
            <input type="checkbox" class="checkbox checkbox-primary border-2 border-black" ${isCompleted ? 'checked' : ''}>
            <span class="flex-grow text-xl ${isCompleted ? 'line-through opacity-50' : ''}">${habit.name}</span>
        `;

        // Add event listener for checkbox
        const checkbox = habitItem.querySelector('input');
        checkbox.addEventListener('change', () => {
            const span = habitItem.querySelector('span');
            span.classList.toggle('line-through');
            span.classList.toggle('opacity-50');
            
            // Update completion status in settings
            const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
            const habitIndex = settings.habits.findIndex(h => h.name === habit.name);
            if (habitIndex !== -1) {
                settings.habits[habitIndex].lastCompleted = checkbox.checked ? today : null;
                localStorage.setItem('tabSettings', JSON.stringify(settings));
                checkAllHabitsComplete(); // Check if all habits are complete after checkbox change
            }
        });

        habitsList.appendChild(habitItem);
    });
}

function setupPunchlineClick() {
    const jokePunchline = document.getElementById('joke-punchline');

    if (jokePunchline) {
        jokePunchline.addEventListener('click', function() {
            jokePunchline.classList.remove('blur'); // Remove blur on click
        });
    }
}

async function loadAndDisplayJoke() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const jokeContainer = document.getElementById('joke-container');

    if (!settings.showJoke || !jokeContainer) {
        if (jokeContainer) jokeContainer.style.display = 'none';
        return;
    }

    jokeContainer.style.display = 'block';

    try {
        const response = await fetch('data/jokes.json');
        if (!response.ok) throw new Error('Failed to fetch jokes');

        const jokes = await response.json();
        if (!Array.isArray(jokes) || jokes.length === 0) throw new Error('Invalid jokes data');

        // Generate a consistent daily joke
        const today = new Date().toISOString().split('T')[0];
        const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % jokes.length;

        const joke = jokes[randomIndex];

        const jokeSetup = document.getElementById('joke-setup');
        const jokePunchline = document.getElementById('joke-punchline');

        if (jokeSetup && jokePunchline) {
            jokeSetup.textContent = joke.setup;
            jokePunchline.textContent = joke.punchline;
            jokePunchline.classList.add('blur'); // Ensure punchline is blurred initially

            // Ensure clicking unblurs it
            jokePunchline.addEventListener('click', function() {
                jokePunchline.classList.remove('blur');
            }, { once: true }); // Ensures the event only triggers once
        }
    } catch (error) {
        console.error('Error loading joke:', error);
        if (jokeContainer) {
            jokeContainer.innerHTML = `
                <div class="flex flex-col gap-4">
                    <p class="text-lg font-bold">Failed to load joke</p>
                    <p class="text-right text-sm">Please try again later</p>
                </div>
            `;
        }
    }
}

function initializeMindfulness() {
    const startButton = document.getElementById('start-mindfulness');
    const stopButton = document.getElementById('stop-mindfulness');
    const mindfulnessOverlay = document.getElementById('mindfulness-overlay');
    const breathingOrb = document.getElementById('breathing-orb');
    const progressBar = document.getElementById('mindfulness-progress');
    const countdownText = document.getElementById('mindfulness-timer');

    if (!startButton || !stopButton || !mindfulnessOverlay || !breathingOrb || !progressBar || !countdownText) return;

    let mindfulnessActive = false;
    let countdownInterval;

    function stopMindfulness() {
        mindfulnessActive = false;
        mindfulnessOverlay.style.display = 'none';
        breathingOrb.style.animation = 'none';
        breathingOrb.style.opacity = '0';
        breathingOrb.style.width = '80px'; // Reset orb size
        breathingOrb.style.height = '80px'; // Reset orb size
        progressBar.style.width = '0%';
        document.body.style.filter = 'none'; // Reset brightness
        clearInterval(countdownInterval);
        countdownText.style.display = 'none';
    }

    startButton.addEventListener('click', () => {
        if (mindfulnessActive) return; // Prevent multiple activations

        mindfulnessActive = true;

        // Show the overlay and orb
        mindfulnessOverlay.style.display = 'flex';
        breathingOrb.style.animation = 'pulse 12s ease-in-out infinite';
        breathingOrb.style.opacity = '1';
        breathingOrb.style.width = '200px'; // Make the orb larger
        breathingOrb.style.height = '200px'; // Make the orb larger

        // Dim other elements
        document.body.style.filter = 'brightness(50%)';

        // Start the progress bar animation
        progressBar.style.width = '100%';
        progressBar.style.transition = 'width 60s linear';

        // Start countdown timer
        let timeLeft = 60;
        countdownText.textContent = `${timeLeft}s`;
        countdownText.style.display = 'block';

        countdownInterval = setInterval(() => {
            timeLeft -= 1;
            countdownText.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                stopMindfulness();
            }
        }, 1000);
    });

    stopButton.addEventListener('click', stopMindfulness);
}
