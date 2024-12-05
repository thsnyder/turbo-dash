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
            { icon: 'search', url: 'https://google.com' },
            { icon: 'coffee', url: 'https://buymeacoffee.com/turbologic' },
            { icon: 'linkedin', url: 'https://linkedin.com' }
        ]
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
            console.log('Creating icon:', icon); // Debug log
            const iconLink = document.createElement('a');
            iconLink.href = icon.url;
            iconLink.className = 'p-4 hover:bg-base-200 rounded-xl transition-all group';
            iconLink.innerHTML = `<i data-feather="${icon.icon}" class="stroke-current group-hover:stroke-primary transition-colors"></i>`;
            iconsContainer.appendChild(iconLink);
        });
        
        // Initialize Feather icons
        console.log('Initializing Feather icons'); // Debug log
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

    // Handle search container visibility
    const searchContainer = document.getElementById('search-container');
    if (searchContainer) {
        searchContainer.style.display = settings.showSearch ? 'block' : 'none';
    }

    // Initialize feather icons
    feather.replace();
}

function saveSettings() {
    const settings = {
        theme: document.getElementById('theme-select').value,
        name: document.getElementById('name-input').value,
        links: []
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
    if (!weatherElement) return;

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
        if (todoInput.value.trim() && settings.todos.length < 3) {
            addTodoItem(todoInput.value.trim());
            todoInput.value = '';
            saveTodos();
        }
    });

    // Enter key handler
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && todoInput.value.trim() && settings.todos.length < 3) {
            addTodoItem(todoInput.value.trim());
            todoInput.value = '';
            saveTodos();
        }
    });
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

