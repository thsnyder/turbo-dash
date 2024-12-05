document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    
    // Add theme change listener
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.documentElement.setAttribute('data-theme', this.value);
        });
    }

    // Add save button listener
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', saveSettings);
    }

    // Add new link button listener
    const addLinkButton = document.getElementById('addLinkButton');
    if (addLinkButton) {
        addLinkButton.addEventListener('click', addNewLink);
    }

    // Add new icon button listener
    const addIconButton = document.getElementById('addIconButton');
    if (addIconButton) {
        addIconButton.addEventListener('click', function() {
            const iconContainer = document.getElementById('iconContainer');
            if (iconContainer) {
                iconContainer.appendChild(createIconInputs());
            }
        });
    }
});

function createLinkInputs(name = '', url = '') {
    const linkDiv = document.createElement('div');
    linkDiv.className = 'flex gap-4 items-center';
    
    linkDiv.innerHTML = `
        <input type="text" placeholder="Link Name" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${name}"/>
        <input type="url" placeholder="https://example.com" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${url}"/>
        <button class="btn btn-ghost btn-sm text-error border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg">×</button>
    `;

    const removeButton = linkDiv.querySelector('button');
    removeButton.addEventListener('click', () => linkDiv.remove());

    return linkDiv;
}

function createIconInputs(icon = '', url = '') {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'flex gap-4 items-center';
    
    iconDiv.innerHTML = `
        <select class="icon-select input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100">
            <option value="battery" ${icon === 'battery' ? 'selected' : ''}>Battery</option>
            <option value="bell" ${icon === 'bell' ? 'selected' : ''}>Bell</option>
            <option value="bluetooth" ${icon === 'bluetooth' ? 'selected' : ''}>Bluetooth</option>
            <option value="book" ${icon === 'book' ? 'selected' : ''}>Book</option>
            <option value="bookmark" ${icon === 'bookmark' ? 'selected' : ''}>Bookmark</option>
            <option value="briefcase" ${icon === 'briefcase' ? 'selected' : ''}>Briefcase</option>
            <option value="calendar" ${icon === 'calendar' ? 'selected' : ''}>Calendar</option>
            <option value="camera" ${icon === 'camera' ? 'selected' : ''}>Camera</option>
            <option value="chrome" ${icon === 'chrome' ? 'selected' : ''}>Chrome</option>
            <option value="cloud" ${icon === 'cloud' ? 'selected' : ''}>Cloud</option>
            <option value="code" ${icon === 'code' ? 'selected' : ''}>Code</option>
            <option value="coffee" ${icon === 'coffee' ? 'selected' : ''}>Coffee</option>
            <option value="compass" ${icon === 'compass' ? 'selected' : ''}>Compass</option>
            <option value="credit-card" ${icon === 'credit-card' ? 'selected' : ''}>Credit Card</option>
            <option value="dollar-sign" ${icon === 'dollar-sign' ? 'selected' : ''}>Dollar</option>
            <option value="download" ${icon === 'download' ? 'selected' : ''}>Download</option>
            <option value="edit" ${icon === 'edit' ? 'selected' : ''}>Edit</option>
            <option value="file" ${icon === 'file' ? 'selected' : ''}>File</option>
            <option value="film" ${icon === 'film' ? 'selected' : ''}>Film</option>
            <option value="flag" ${icon === 'flag' ? 'selected' : ''}>Flag</option>
            <option value="folder" ${icon === 'folder' ? 'selected' : ''}>Folder</option>
            <option value="github" ${icon === 'github' ? 'selected' : ''}>GitHub</option>
            <option value="heart" ${icon === 'heart' ? 'selected' : ''}>Heart</option>
            <option value="home" ${icon === 'home' ? 'selected' : ''}>Home</option>
            <option value="image" ${icon === 'image' ? 'selected' : ''}>Image</option>
            <option value="inbox" ${icon === 'inbox' ? 'selected' : ''}>Inbox</option>
            <option value="key" ${icon === 'key' ? 'selected' : ''}>Key</option>
            <option value="linkedin" ${icon === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
            <option value="location" ${icon === 'location' ? 'selected' : ''}>Location</option>
            <option value="lock" ${icon === 'lock' ? 'selected' : ''}>Lock</option>
            <option value="mail" ${icon === 'mail' ? 'selected' : ''}>Mail</option>
            <option value="map" ${icon === 'map' ? 'selected' : ''}>Map</option>
            <option value="music" ${icon === 'music' ? 'selected' : ''}>Music</option>
            <option value="phone" ${icon === 'phone' ? 'selected' : ''}>Phone</option>
            <option value="printer" ${icon === 'printer' ? 'selected' : ''}>Printer</option>
            <option value="search" ${icon === 'search' ? 'selected' : ''}>Search</option>
            <option value="send" ${icon === 'send' ? 'selected' : ''}>Send</option>
            <option value="settings" ${icon === 'settings' ? 'selected' : ''}>Settings</option>
            <option value="shopping-cart" ${icon === 'shopping-cart' ? 'selected' : ''}>Shopping Cart</option>
            <option value="star" ${icon === 'star' ? 'selected' : ''}>Star</option>
            <option value="tablet" ${icon === 'tablet' ? 'selected' : ''}>Tablet</option>
            <option value="tag" ${icon === 'tag' ? 'selected' : ''}>Tag</option>
            <option value="trash" ${icon === 'trash' ? 'selected' : ''}>Trash</option>
            <option value="tv" ${icon === 'tv' ? 'selected' : ''}>TV</option>
            <option value="twitter" ${icon === 'twitter' ? 'selected' : ''}>Twitter</option>
            <option value="unlock" ${icon === 'unlock' ? 'selected' : ''}>Unlock</option>
            <option value="upload" ${icon === 'upload' ? 'selected' : ''}>Upload</option>
            <option value="user" ${icon === 'user' ? 'selected' : ''}>User</option>
            <option value="users" ${icon === 'users' ? 'selected' : ''}>Users</option>
            <option value="video" ${icon === 'video' ? 'selected' : ''}>Video</option>
            <option value="wifi" ${icon === 'wifi' ? 'selected' : ''}>WiFi</option>
            <option value="youtube" ${icon === 'youtube' ? 'selected' : ''}>YouTube</option>
        </select>
        <input type="url" placeholder="https://example.com" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${url}"/>
        <button class="btn btn-ghost btn-sm text-error border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg">×</button>
    `;

    const removeButton = iconDiv.querySelector('button');
    removeButton.addEventListener('click', () => iconDiv.remove());

    return iconDiv;
}

function addNewLink() {
    const linkContainer = document.getElementById('linkContainer');
    linkContainer.appendChild(createLinkInputs());
}

function addNewIcon() {
    const iconContainer = document.getElementById('iconContainer');
    if (iconContainer) {
        iconContainer.appendChild(createIconInputs());
    }
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {
        theme: 'cupcake',
        name: 'Tom',
        weatherApiKey: '',
        weatherLat: '',
        weatherLon: '',
        showTodo: false,
        todos: [],
        links: [
            { name: 'Link 1', url: '#' },
            { name: 'Link 2', url: '#' },
            { name: 'Link 3', url: '#' }
        ],
        icons: [
            { icon: 'search', url: 'https://google.com' },
            { icon: 'coffee', url: 'https://buymeacoffee.com/turbologic' }
        ],
        showSearch: false,
    };

    // Set form values
    document.getElementById('theme-select').value = settings.theme;
    document.getElementById('name-input').value = settings.name;
    document.getElementById('weather-api-key').value = settings.weatherApiKey || '';
    document.getElementById('weather-lat').value = settings.weatherLat || '';
    document.getElementById('weather-lon').value = settings.weatherLon || '';
    document.getElementById('show-todo').checked = settings.showTodo;
    document.getElementById('show-search').checked = settings.showSearch;

    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Set link values
    const linkContainer = document.getElementById('linkContainer');
    if (linkContainer) {
        linkContainer.innerHTML = ''; // Clear existing links
        settings.links.forEach(link => {
            linkContainer.appendChild(createLinkInputs(link.name, link.url));
        });
    }

    // Set icon values
    const iconContainer = document.getElementById('iconContainer');
    if (iconContainer) {
        iconContainer.innerHTML = '';
        settings.icons.forEach(icon => {
            iconContainer.appendChild(createIconInputs(icon.icon, icon.url));
        });
    }
}

function saveSettings() {
    const settings = {
        theme: document.getElementById('theme-select').value,
        name: document.getElementById('name-input').value,
        weatherApiKey: document.getElementById('weather-api-key').value.trim(),
        weatherLat: document.getElementById('weather-lat').value.trim(),
        weatherLon: document.getElementById('weather-lon').value.trim(),
        showTodo: document.getElementById('show-todo').checked,
        todos: JSON.parse(localStorage.getItem('tabSettings'))?.todos || [],
        links: [],
        icons: [],
        showSearch: document.getElementById('show-search').checked,
    };

    // Get link values
    const linkInputs = document.querySelectorAll('#linkContainer .flex');
    linkInputs.forEach(row => {
        const nameInput = row.querySelector('input[type="text"]');
        const urlInput = row.querySelector('input[type="url"]');
        
        if (nameInput && urlInput) {
            settings.links.push({
                name: nameInput.value.trim() || `Link ${settings.links.length + 1}`,
                url: formatUrl(urlInput.value.trim()) || '#'
            });
        }
    });

    // Get icon values
    const iconInputs = document.querySelectorAll('#iconContainer .flex');
    iconInputs.forEach(row => {
        const iconSelect = row.querySelector('select');
        const urlInput = row.querySelector('input[type="url"]');
        
        if (iconSelect && urlInput) {
            settings.icons.push({
                icon: iconSelect.value,
                url: formatUrl(urlInput.value.trim()) || '#'
            });
        }
    });

    // Save to localStorage
    localStorage.setItem('tabSettings', JSON.stringify(settings));

    // Redirect back to main page
    window.location.href = 'tab.html';
}

// Helper function to format URLs
function formatUrl(url) {
    if (!url) return '#';
    
    // Handle special cases for icon URLs
    if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('file:')) {
        return url;
    }
    
    // If the URL doesn't start with http:// or https://, add https://
    if (!url.match(/^https?:\/\//i)) {
        return 'https://' + url;
    }
    
    return url;
}