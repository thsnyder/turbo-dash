document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    loadSettings();
    initializeRoadmap();
    initializeTooltips();
    
    // Add theme change listener
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.documentElement.setAttribute('data-theme', this.value);
        });
    }

    // Fix save button listener
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        console.log('Adding click listener to save button');
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Save button clicked');
            try {
                saveSettings();
            } catch (error) {
                console.error('Error saving settings:', error);
                alert('There was an error saving your settings. Please check the console for details.');
            }
        });
    } else {
        console.error('Save button not found');
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

    // Add weather checkbox listener
    const weatherCheckbox = document.getElementById('show-weather');
    if (weatherCheckbox) {
        weatherCheckbox.addEventListener('change', function() {
            toggleWeatherSettings(this.checked);
        });
    }

    // Add habits checkbox listener
    const habitsCheckbox = document.getElementById('show-habits');
    if (habitsCheckbox) {
        habitsCheckbox.addEventListener('change', function() {
            toggleHabitsSettings(this.checked);
        });
    }

    // Add new habit button listener
    const addHabitButton = document.getElementById('addHabitButton');
    if (addHabitButton) {
        addHabitButton.addEventListener('click', function() {
            const habitsContainer = document.getElementById('habitsContainer');
            if (habitsContainer) {
                habitsContainer.appendChild(createHabitInput());
            }
        });
    }

    // Add roadmap button click handler
    const roadmapButton = document.getElementById('roadmapButton');
    const roadmapModal = document.getElementById('roadmap_modal');
    
    if (roadmapButton && roadmapModal) {
        roadmapButton.addEventListener('click', () => {
            roadmapModal.showModal();
        });
    }

    // Add joke checkbox listener
    const jokeCheckbox = document.getElementById('show-joke');
    if (jokeCheckbox) {
        jokeCheckbox.addEventListener('change', function() {
            toggleJokeSettings(this.checked);
        });
    }

    // Add event listener for the title section
    const titleSection = document.getElementById('title-section');
    if (titleSection) {
        titleSection.addEventListener('click', openChangelogModal);
    }
});

function createLinkInputs(name = '', url = '') {
    const linkDiv = document.createElement('div');
    linkDiv.className = 'flex gap-4 items-center';
    linkDiv.draggable = true;
    
    linkDiv.innerHTML = `
        <button class="drag-handle cursor-move">⋮⋮</button>
        <input type="text" placeholder="Link Name" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${name}"/>
        <input type="url" placeholder="https://example.com" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${url}"/>
        <button class="btn btn-ghost btn-sm text-error border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg">×</button>
    `;

    const removeButton = linkDiv.querySelector('button:last-child');
    removeButton.addEventListener('click', () => linkDiv.remove());

    addDragListeners(linkDiv);

    const urlInput = linkDiv.querySelector('input[type="url"]');
    addUrlValidationListener(urlInput);

    return linkDiv;
}

function createIconInputs(icon = '', url = '') {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'flex gap-4 items-center';
    iconDiv.draggable = true;
    
    iconDiv.innerHTML = `
        <button class="drag-handle cursor-move">⋮⋮</button>
        <select class="icon-select input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100">
            <option value="activity" ${icon === 'activity' ? 'selected' : ''}>Activity</option>
            <option value="airplay" ${icon === 'airplay' ? 'selected' : ''}>Airplay</option>
            <option value="alert-circle" ${icon === 'alert-circle' ? 'selected' : ''}>Alert Circle</option>
            <option value="alert-octagon" ${icon === 'alert-octagon' ? 'selected' : ''}>Alert Octagon</option>
            <option value="alert-triangle" ${icon === 'alert-triangle' ? 'selected' : ''}>Alert Triangle</option>
            <option value="align-center" ${icon === 'align-center' ? 'selected' : ''}>Align Center</option>
            <option value="align-justify" ${icon === 'align-justify' ? 'selected' : ''}>Align Justify</option>
            <option value="align-left" ${icon === 'align-left' ? 'selected' : ''}>Align Left</option>
            <option value="align-right" ${icon === 'align-right' ? 'selected' : ''}>Align Right</option>
            <option value="anchor" ${icon === 'anchor' ? 'selected' : ''}>Anchor</option>
            <option value="aperture" ${icon === 'aperture' ? 'selected' : ''}>Aperture</option>
            <option value="archive" ${icon === 'archive' ? 'selected' : ''}>Archive</option>
            <option value="arrow-down" ${icon === 'arrow-down' ? 'selected' : ''}>Arrow Down</option>
            <option value="arrow-down-circle" ${icon === 'arrow-down-circle' ? 'selected' : ''}>Arrow Down Circle</option>
            <option value="arrow-down-left" ${icon === 'arrow-down-left' ? 'selected' : ''}>Arrow Down Left</option>
            <option value="arrow-down-right" ${icon === 'arrow-down-right' ? 'selected' : ''}>Arrow Down Right</option>
            <option value="arrow-left" ${icon === 'arrow-left' ? 'selected' : ''}>Arrow Left</option>
            <option value="arrow-left-circle" ${icon === 'arrow-left-circle' ? 'selected' : ''}>Arrow Left Circle</option>
            <option value="arrow-right" ${icon === 'arrow-right' ? 'selected' : ''}>Arrow Right</option>
            <option value="arrow-right-circle" ${icon === 'arrow-right-circle' ? 'selected' : ''}>Arrow Right Circle</option>
            <option value="arrow-up" ${icon === 'arrow-up' ? 'selected' : ''}>Arrow Up</option>
            <option value="arrow-up-circle" ${icon === 'arrow-up-circle' ? 'selected' : ''}>Arrow Up Circle</option>
            <option value="arrow-up-left" ${icon === 'arrow-up-left' ? 'selected' : ''}>Arrow Up Left</option>
            <option value="arrow-up-right" ${icon === 'arrow-up-right' ? 'selected' : ''}>Arrow Up Right</option>
            <option value="at-sign" ${icon === 'at-sign' ? 'selected' : ''}>At Sign</option>
            <option value="award" ${icon === 'award' ? 'selected' : ''}>Award</option>
            <option value="bar-chart" ${icon === 'bar-chart' ? 'selected' : ''}>Bar Chart</option>
            <option value="battery" ${icon === 'battery' ? 'selected' : ''}>Battery</option>
            <option value="battery-charging" ${icon === 'battery-charging' ? 'selected' : ''}>Battery Charging</option>
            <option value="bell" ${icon === 'bell' ? 'selected' : ''}>Bell</option>
            <option value="bell-off" ${icon === 'bell-off' ? 'selected' : ''}>Bell Off</option>
            <option value="bluetooth" ${icon === 'bluetooth' ? 'selected' : ''}>Bluetooth</option>
            <option value="book" ${icon === 'book' ? 'selected' : ''}>Book</option>
            <option value="book-open" ${icon === 'book-open' ? 'selected' : ''}>Book Open</option>
            <option value="bookmark" ${icon === 'bookmark' ? 'selected' : ''}>Bookmark</option>
            <option value="box" ${icon === 'box' ? 'selected' : ''}>Box</option>
            <option value="briefcase" ${icon === 'briefcase' ? 'selected' : ''}>Briefcase</option>
            <option value="calendar" ${icon === 'calendar' ? 'selected' : ''}>Calendar</option>
            <option value="camera" ${icon === 'camera' ? 'selected' : ''}>Camera</option>
            <option value="camera-off" ${icon === 'camera-off' ? 'selected' : ''}>Camera Off</option>
            <option value="cast" ${icon === 'cast' ? 'selected' : ''}>Cast</option>
            <option value="check-circle" ${icon === 'check-circle' ? 'selected' : ''}>Check Circle</option>
            <option value="check-square" ${icon === 'check-square' ? 'selected' : ''}>Check Square</option>
            <option value="chevron-down" ${icon === 'chevron-down' ? 'selected' : ''}>Chevron Down</option>
            <option value="chevron-left" ${icon === 'chevron-left' ? 'selected' : ''}>Chevron Left</option>
            <option value="chevron-right" ${icon === 'chevron-right' ? 'selected' : ''}>Chevron Right</option>
            <option value="chevron-up" ${icon === 'chevron-up' ? 'selected' : ''}>Chevron Up</option>
            <option value="chrome" ${icon === 'chrome' ? 'selected' : ''}>Chrome</option>
            <option value="clipboard" ${icon === 'clipboard' ? 'selected' : ''}>Clipboard</option>
            <option value="clock" ${icon === 'clock' ? 'selected' : ''}>Clock</option>
            <option value="cloud" ${icon === 'cloud' ? 'selected' : ''}>Cloud</option>
            <option value="cloud-drizzle" ${icon === 'cloud-drizzle' ? 'selected' : ''}>Cloud Drizzle</option>
            <option value="cloud-lightning" ${icon === 'cloud-lightning' ? 'selected' : ''}>Cloud Lightning</option>
            <option value="cloud-off" ${icon === 'cloud-off' ? 'selected' : ''}>Cloud Off</option>
            <option value="cloud-rain" ${icon === 'cloud-rain' ? 'selected' : ''}>Cloud Rain</option>
            <option value="cloud-snow" ${icon === 'cloud-snow' ? 'selected' : ''}>Cloud Snow</option>
            <option value="code" ${icon === 'code' ? 'selected' : ''}>Code</option>
            <option value="codepen" ${icon === 'codepen' ? 'selected' : ''}>Codepen</option>
            <option value="coffee" ${icon === 'coffee' ? 'selected' : ''}>Coffee</option>
            <option value="command" ${icon === 'command' ? 'selected' : ''}>Command</option>
            <option value="compass" ${icon === 'compass' ? 'selected' : ''}>Compass</option>
            <option value="copy" ${icon === 'copy' ? 'selected' : ''}>Copy</option>
            <option value="corner-down-left" ${icon === 'corner-down-left' ? 'selected' : ''}>Corner Down Left</option>
            <option value="corner-down-right" ${icon === 'corner-down-right' ? 'selected' : ''}>Corner Down Right</option>
            <option value="corner-left-down" ${icon === 'corner-left-down' ? 'selected' : ''}>Corner Left Down</option>
            <option value="corner-left-up" ${icon === 'corner-left-up' ? 'selected' : ''}>Corner Left Up</option>
            <option value="corner-right-down" ${icon === 'corner-right-down' ? 'selected' : ''}>Corner Right Down</option>
            <option value="corner-right-up" ${icon === 'corner-right-up' ? 'selected' : ''}>Corner Right Up</option>
            <option value="corner-up-left" ${icon === 'corner-up-left' ? 'selected' : ''}>Corner Up Left</option>
            <option value="corner-up-right" ${icon === 'corner-up-right' ? 'selected' : ''}>Corner Up Right</option>
            <option value="cpu" ${icon === 'cpu' ? 'selected' : ''}>CPU</option>
            <option value="credit-card" ${icon === 'credit-card' ? 'selected' : ''}>Credit Card</option>
            <option value="crop" ${icon === 'crop' ? 'selected' : ''}>Crop</option>
            <option value="crosshair" ${icon === 'crosshair' ? 'selected' : ''}>Crosshair</option>
            <option value="database" ${icon === 'database' ? 'selected' : ''}>Database</option>
            <option value="disc" ${icon === 'disc' ? 'selected' : ''}>Disc</option>
            <option value="dollar-sign" ${icon === 'dollar-sign' ? 'selected' : ''}>Dollar Sign</option>
            <option value="download" ${icon === 'download' ? 'selected' : ''}>Download</option>
            <option value="download-cloud" ${icon === 'download-cloud' ? 'selected' : ''}>Download Cloud</option>
            <option value="droplet" ${icon === 'droplet' ? 'selected' : ''}>Droplet</option>
            <option value="edit" ${icon === 'edit' ? 'selected' : ''}>Edit</option>
            <option value="edit-2" ${icon === 'edit-2' ? 'selected' : ''}>Edit 2</option>
            <option value="edit-3" ${icon === 'edit-3' ? 'selected' : ''}>Edit 3</option>
            <option value="external-link" ${icon === 'external-link' ? 'selected' : ''}>External Link</option>
            <option value="eye" ${icon === 'eye' ? 'selected' : ''}>Eye</option>
            <option value="eye-off" ${icon === 'eye-off' ? 'selected' : ''}>Eye Off</option>
            <option value="facebook" ${icon === 'facebook' ? 'selected' : ''}>Facebook</option>
            <option value="fast-forward" ${icon === 'fast-forward' ? 'selected' : ''}>Fast Forward</option>
            <option value="feather" ${icon === 'feather' ? 'selected' : ''}>Feather</option>
            <option value="figma" ${icon === 'figma' ? 'selected' : ''}>Figma</option>
            <option value="file" ${icon === 'file' ? 'selected' : ''}>File</option>
            <option value="file-minus" ${icon === 'file-minus' ? 'selected' : ''}>File Minus</option>
            <option value="file-plus" ${icon === 'file-plus' ? 'selected' : ''}>File Plus</option>
            <option value="file-text" ${icon === 'file-text' ? 'selected' : ''}>File Text</option>
            <option value="film" ${icon === 'film' ? 'selected' : ''}>Film</option>
            <option value="filter" ${icon === 'filter' ? 'selected' : ''}>Filter</option>
            <option value="flag" ${icon === 'flag' ? 'selected' : ''}>Flag</option>
            <option value="folder" ${icon === 'folder' ? 'selected' : ''}>Folder</option>
            <option value="folder-minus" ${icon === 'folder-minus' ? 'selected' : ''}>Folder Minus</option>
            <option value="folder-plus" ${icon === 'folder-plus' ? 'selected' : ''}>Folder Plus</option>
            <option value="framer" ${icon === 'framer' ? 'selected' : ''}>Framer</option>
            <option value="frown" ${icon === 'frown' ? 'selected' : ''}>Frown</option>
            <option value="gift" ${icon === 'gift' ? 'selected' : ''}>Gift</option>
            <option value="git-branch" ${icon === 'git-branch' ? 'selected' : ''}>Git Branch</option>
            <option value="git-commit" ${icon === 'git-commit' ? 'selected' : ''}>Git Commit</option>
            <option value="git-merge" ${icon === 'git-merge' ? 'selected' : ''}>Git Merge</option>
            <option value="git-pull-request" ${icon === 'git-pull-request' ? 'selected' : ''}>Git Pull Request</option>
            <option value="github" ${icon === 'github' ? 'selected' : ''}>GitHub</option>
            <option value="gitlab" ${icon === 'gitlab' ? 'selected' : ''}>GitLab</option>
            <option value="globe" ${icon === 'globe' ? 'selected' : ''}>Globe</option>
            <option value="google-drive-icon" ${icon === 'google-drive-icon' ? 'selected' : ''}>Google Drive</option>
            <option value="google-icon" ${icon === 'google-icon' ? 'selected' : ''}>Google</option>
            <option value="grid" ${icon === 'grid' ? 'selected' : ''}>Grid</option>
            <option value="hard-drive" ${icon === 'hard-drive' ? 'selected' : ''}>Hard Drive</option>
            <option value="hash" ${icon === 'hash' ? 'selected' : ''}>Hash</option>
            <option value="headphones" ${icon === 'headphones' ? 'selected' : ''}>Headphones</option>
            <option value="heart" ${icon === 'heart' ? 'selected' : ''}>Heart</option>
            <option value="help-circle" ${icon === 'help-circle' ? 'selected' : ''}>Help Circle</option>
            <option value="hexagon" ${icon === 'hexagon' ? 'selected' : ''}>Hexagon</option>
            <option value="home" ${icon === 'home' ? 'selected' : ''}>Home</option>
            <option value="image" ${icon === 'image' ? 'selected' : ''}>Image</option>
            <option value="inbox" ${icon === 'inbox' ? 'selected' : ''}>Inbox</option>
            <option value="info" ${icon === 'info' ? 'selected' : ''}>Info</option>
            <option value="instagram" ${icon === 'instagram' ? 'selected' : ''}>Instagram</option>
            <option value="italic" ${icon === 'italic' ? 'selected' : ''}>Italic</option>
            <option value="key" ${icon === 'key' ? 'selected' : ''}>Key</option>
            <option value="layers" ${icon === 'layers' ? 'selected' : ''}>Layers</option>
            <option value="layout" ${icon === 'layout' ? 'selected' : ''}>Layout</option>
            <option value="life-buoy" ${icon === 'life-buoy' ? 'selected' : ''}>Life Buoy</option>
            <option value="link" ${icon === 'link' ? 'selected' : ''}>Link</option>
            <option value="linkedin" ${icon === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
            <option value="list" ${icon === 'list' ? 'selected' : ''}>List</option>
            <option value="loader" ${icon === 'loader' ? 'selected' : ''}>Loader</option>
            <option value="lock" ${icon === 'lock' ? 'selected' : ''}>Lock</option>
            <option value="log-in" ${icon === 'log-in' ? 'selected' : ''}>Log In</option>
            <option value="log-out" ${icon === 'log-out' ? 'selected' : ''}>Log Out</option>
            <option value="mail" ${icon === 'mail' ? 'selected' : ''}>Mail</option>
            <option value="map" ${icon === 'map' ? 'selected' : ''}>Map</option>
            <option value="map-pin" ${icon === 'map-pin' ? 'selected' : ''}>Map Pin</option>
            <option value="maximize" ${icon === 'maximize' ? 'selected' : ''}>Maximize</option>
            <option value="maximize-2" ${icon === 'maximize-2' ? 'selected' : ''}>Maximize 2</option>
            <option value="meh" ${icon === 'meh' ? 'selected' : ''}>Meh</option>
            <option value="menu" ${icon === 'menu' ? 'selected' : ''}>Menu</option>
            <option value="message-circle" ${icon === 'message-circle' ? 'selected' : ''}>Message Circle</option>
            <option value="message-square" ${icon === 'message-square' ? 'selected' : ''}>Message Square</option>
            <option value="mic" ${icon === 'mic' ? 'selected' : ''}>Mic</option>
            <option value="mic-off" ${icon === 'mic-off' ? 'selected' : ''}>Mic Off</option>
            <option value="minimize" ${icon === 'minimize' ? 'selected' : ''}>Minimize</option>
            <option value="minimize-2" ${icon === 'minimize-2' ? 'selected' : ''}>Minimize 2</option>
            <option value="minus" ${icon === 'minus' ? 'selected' : ''}>Minus</option>
            <option value="minus-circle" ${icon === 'minus-circle' ? 'selected' : ''}>Minus Circle</option>
            <option value="minus-square" ${icon === 'minus-square' ? 'selected' : ''}>Minus Square</option>
            <option value="monitor" ${icon === 'monitor' ? 'selected' : ''}>Monitor</option>
            <option value="moon" ${icon === 'moon' ? 'selected' : ''}>Moon</option>
            <option value="more-horizontal" ${icon === 'more-horizontal' ? 'selected' : ''}>More Horizontal</option>
            <option value="more-vertical" ${icon === 'more-vertical' ? 'selected' : ''}>More Vertical</option>
            <option value="mouse-pointer" ${icon === 'mouse-pointer' ? 'selected' : ''}>Mouse Pointer</option>
            <option value="move" ${icon === 'move' ? 'selected' : ''}>Move</option>
            <option value="music" ${icon === 'music' ? 'selected' : ''}>Music</option>
            <option value="navigation" ${icon === 'navigation' ? 'selected' : ''}>Navigation</option>
            <option value="navigation-2" ${icon === 'navigation-2' ? 'selected' : ''}>Navigation 2</option>
            <option value="octagon" ${icon === 'octagon' ? 'selected' : ''}>Octagon</option>
            <option value="package" ${icon === 'package' ? 'selected' : ''}>Package</option>
            <option value="paperclip" ${icon === 'paperclip' ? 'selected' : ''}>Paperclip</option>
            <option value="pause" ${icon === 'pause' ? 'selected' : ''}>Pause</option>
            <option value="pause-circle" ${icon === 'pause-circle' ? 'selected' : ''}>Pause Circle</option>
            <option value="pen-tool" ${icon === 'pen-tool' ? 'selected' : ''}>Pen Tool</option>
            <option value="percent" ${icon === 'percent' ? 'selected' : ''}>Percent</option>
            <option value="phone" ${icon === 'phone' ? 'selected' : ''}>Phone</option>
            <option value="phone-call" ${icon === 'phone-call' ? 'selected' : ''}>Phone Call</option>
            <option value="phone-forwarded" ${icon === 'phone-forwarded' ? 'selected' : ''}>Phone Forwarded</option>
            <option value="phone-incoming" ${icon === 'phone-incoming' ? 'selected' : ''}>Phone Incoming</option>
            <option value="phone-missed" ${icon === 'phone-missed' ? 'selected' : ''}>Phone Missed</option>
            <option value="phone-off" ${icon === 'phone-off' ? 'selected' : ''}>Phone Off</option>
            <option value="phone-outgoing" ${icon === 'phone-outgoing' ? 'selected' : ''}>Phone Outgoing</option>
            <option value="pie-chart" ${icon === 'pie-chart' ? 'selected' : ''}>Pie Chart</option>
            <option value="play" ${icon === 'play' ? 'selected' : ''}>Play</option>
            <option value="play-circle" ${icon === 'play-circle' ? 'selected' : ''}>Play Circle</option>
            <option value="plus" ${icon === 'plus' ? 'selected' : ''}>Plus</option>
            <option value="plus-circle" ${icon === 'plus-circle' ? 'selected' : ''}>Plus Circle</option>
            <option value="plus-square" ${icon === 'plus-square' ? 'selected' : ''}>Plus Square</option>
            <option value="pocket" ${icon === 'pocket' ? 'selected' : ''}>Pocket</option>
            <option value="power" ${icon === 'power' ? 'selected' : ''}>Power</option>
            <option value="printer" ${icon === 'printer' ? 'selected' : ''}>Printer</option>
            <option value="radio" ${icon === 'radio' ? 'selected' : ''}>Radio</option>
            <option value="reddit-icon" ${icon === 'reddit-icon' ? 'selected' : ''}>Reddit</option>
            <option value="refresh-ccw" ${icon === 'refresh-ccw' ? 'selected' : ''}>Refresh CCW</option>
            <option value="refresh-cw" ${icon === 'refresh-cw' ? 'selected' : ''}>Refresh CW</option>
            <option value="repeat" ${icon === 'repeat' ? 'selected' : ''}>Repeat</option>
            <option value="rewind" ${icon === 'rewind' ? 'selected' : ''}>Rewind</option>
            <option value="rotate-ccw" ${icon === 'rotate-ccw' ? 'selected' : ''}>Rotate CCW</option>
            <option value="rotate-cw" ${icon === 'rotate-cw' ? 'selected' : ''}>Rotate CW</option>
            <option value="rss" ${icon === 'rss' ? 'selected' : ''}>RSS</option>
            <option value="save" ${icon === 'save' ? 'selected' : ''}>Save</option>
            <option value="scissors" ${icon === 'scissors' ? 'selected' : ''}>Scissors</option>
            <option value="search" ${icon === 'search' ? 'selected' : ''}>Search</option>
            <option value="send" ${icon === 'send' ? 'selected' : ''}>Send</option>
            <option value="server" ${icon === 'server' ? 'selected' : ''}>Server</option>
            <option value="settings" ${icon === 'settings' ? 'selected' : ''}>Settings</option>
            <option value="share" ${icon === 'share' ? 'selected' : ''}>Share</option>
            <option value="share-2" ${icon === 'share-2' ? 'selected' : ''}>Share 2</option>
            <option value="shield" ${icon === 'shield' ? 'selected' : ''}>Shield</option>
            <option value="shield-off" ${icon === 'shield-off' ? 'selected' : ''}>Shield Off</option>
            <option value="shopping-bag" ${icon === 'shopping-bag' ? 'selected' : ''}>Shopping Bag</option>
            <option value="shopping-cart" ${icon === 'shopping-cart' ? 'selected' : ''}>Shopping Cart</option>
            <option value="shuffle" ${icon === 'shuffle' ? 'selected' : ''}>Shuffle</option>
            <option value="sidebar" ${icon === 'sidebar' ? 'selected' : ''}>Sidebar</option>
            <option value="skip-back" ${icon === 'skip-back' ? 'selected' : ''}>Skip Back</option>
            <option value="skip-forward" ${icon === 'skip-forward' ? 'selected' : ''}>Skip Forward</option>
            <option value="slack" ${icon === 'slack' ? 'selected' : ''}>Slack</option>
            <option value="slash" ${icon === 'slash' ? 'selected' : ''}>Slash</option>
            <option value="sliders" ${icon === 'sliders' ? 'selected' : ''}>Sliders</option>
            <option value="smartphone" ${icon === 'smartphone' ? 'selected' : ''}>Smartphone</option>
            <option value="smile" ${icon === 'smile' ? 'selected' : ''}>Smile</option>
            <option value="speaker" ${icon === 'speaker' ? 'selected' : ''}>Speaker</option>
            <option value="square" ${icon === 'square' ? 'selected' : ''}>Square</option>
            <option value="star" ${icon === 'star' ? 'selected' : ''}>Star</option>
            <option value="stop-circle" ${icon === 'stop-circle' ? 'selected' : ''}>Stop Circle</option>
            <option value="sun" ${icon === 'sun' ? 'selected' : ''}>Sun</option>
            <option value="sunrise" ${icon === 'sunrise' ? 'selected' : ''}>Sunrise</option>
            <option value="sunset" ${icon === 'sunset' ? 'selected' : ''}>Sunset</option>
            <option value="tablet" ${icon === 'tablet' ? 'selected' : ''}>Tablet</option>
            <option value="tag" ${icon === 'tag' ? 'selected' : ''}>Tag</option>
            <option value="target" ${icon === 'target' ? 'selected' : ''}>Target</option>
            <option value="terminal" ${icon === 'terminal' ? 'selected' : ''}>Terminal</option>
            <option value="thermometer" ${icon === 'thermometer' ? 'selected' : ''}>Thermometer</option>
            <option value="thumbs-down" ${icon === 'thumbs-down' ? 'selected' : ''}>Thumbs Down</option>
            <option value="thumbs-up" ${icon === 'thumbs-up' ? 'selected' : ''}>Thumbs Up</option>
            <option value="toggle-left" ${icon === 'toggle-left' ? 'selected' : ''}>Toggle Left</option>
            <option value="toggle-right" ${icon === 'toggle-right' ? 'selected' : ''}>Toggle Right</option>
            <option value="tool" ${icon === 'tool' ? 'selected' : ''}>Tool</option>
            <option value="trash" ${icon === 'trash' ? 'selected' : ''}>Trash</option>
            <option value="trash-2" ${icon === 'trash-2' ? 'selected' : ''}>Trash 2</option>
            <option value="trello" ${icon === 'trello' ? 'selected' : ''}>Trello</option>
            <option value="trending-down" ${icon === 'trending-down' ? 'selected' : ''}>Trending Down</option>
            <option value="trending-up" ${icon === 'trending-up' ? 'selected' : ''}>Trending Up</option>
            <option value="triangle" ${icon === 'triangle' ? 'selected' : ''}>Triangle</option>
            <option value="truck" ${icon === 'truck' ? 'selected' : ''}>Truck</option>
            <option value="tv" ${icon === 'tv' ? 'selected' : ''}>TV</option>
            <option value="twitch" ${icon === 'twitch' ? 'selected' : ''}>Twitch</option>
            <option value="twitter" ${icon === 'twitter' ? 'selected' : ''}>Twitter</option>
            <option value="type" ${icon === 'type' ? 'selected' : ''}>Type</option>
            <option value="umbrella" ${icon === 'umbrella' ? 'selected' : ''}>Umbrella</option>
            <option value="underline" ${icon === 'underline' ? 'selected' : ''}>Underline</option>
            <option value="unlock" ${icon === 'unlock' ? 'selected' : ''}>Unlock</option>
            <option value="upload" ${icon === 'upload' ? 'selected' : ''}>Upload</option>
            <option value="upload-cloud" ${icon === 'upload-cloud' ? 'selected' : ''}>Upload Cloud</option>
            <option value="user" ${icon === 'user' ? 'selected' : ''}>User</option>
            <option value="user-check" ${icon === 'user-check' ? 'selected' : ''}>User Check</option>
            <option value="user-minus" ${icon === 'user-minus' ? 'selected' : ''}>User Minus</option>
            <option value="user-plus" ${icon === 'user-plus' ? 'selected' : ''}>User Plus</option>
            <option value="user-x" ${icon === 'user-x' ? 'selected' : ''}>User X</option>
            <option value="users" ${icon === 'users' ? 'selected' : ''}>Users</option>
            <option value="video" ${icon === 'video' ? 'selected' : ''}>Video</option>
            <option value="video-off" ${icon === 'video-off' ? 'selected' : ''}>Video Off</option>
            <option value="voicemail" ${icon === 'voicemail' ? 'selected' : ''}>Voicemail</option>
            <option value="volume" ${icon === 'volume' ? 'selected' : ''}>Volume</option>
            <option value="volume-1" ${icon === 'volume-1' ? 'selected' : ''}>Volume 1</option>
            <option value="volume-2" ${icon === 'volume-2' ? 'selected' : ''}>Volume 2</option>
            <option value="volume-x" ${icon === 'volume-x' ? 'selected' : ''}>Volume X</option>
            <option value="watch" ${icon === 'watch' ? 'selected' : ''}>Watch</option>
            <option value="wifi" ${icon === 'wifi' ? 'selected' : ''}>WiFi</option>
            <option value="wifi-off" ${icon === 'wifi-off' ? 'selected' : ''}>WiFi Off</option>
            <option value="wind" ${icon === 'wind' ? 'selected' : ''}>Wind</option>
            <option value="x" ${icon === 'x' ? 'selected' : ''}>X</option>
            <option value="x-circle" ${icon === 'x-circle' ? 'selected' : ''}>X Circle</option>
            <option value="x-octagon" ${icon === 'x-octagon' ? 'selected' : ''}>X Octagon</option>
            <option value="x-square" ${icon === 'x-square' ? 'selected' : ''}>X Square</option>
            <option value="youtube" ${icon === 'youtube' ? 'selected' : ''}>YouTube</option>
            <option value="zap" ${icon === 'zap' ? 'selected' : ''}>Zap</option>
            <option value="zap-off" ${icon === 'zap-off' ? 'selected' : ''}>Zap Off</option>
            <option value="zoom-in" ${icon === 'zoom-in' ? 'selected' : ''}>Zoom In</option>
            <option value="zoom-out" ${icon === 'zoom-out' ? 'selected' : ''}>Zoom Out</option>
        </select>
        <div class="icon-preview w-6 h-6 flex items-center justify-center">
            ${icon === 'reddit-icon' 
                ? `<img src="lib/uploaded/reddit.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">` 
                : icon === 'google-icon'
                ? `<img src="lib/uploaded/google.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">`
                : icon === 'google-drive-icon'
                ? `<img src="lib/uploaded/google-drive.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">`
                : `<i data-feather="${icon || 'help-circle'}" class="w-6 h-6"></i>`
            }
        </div>
        <input type="url" placeholder="https://example.com" class="input w-1/2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${url}"/>
        <button class="btn btn-ghost btn-sm text-error border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg">×</button>
    `;

    // Add icon preview update listener
    const select = iconDiv.querySelector('select');
    const iconPreview = iconDiv.querySelector('.icon-preview');
    
    select.addEventListener('change', function() {
        if (this.value === 'reddit-icon') {
            iconPreview.innerHTML = `<img src="lib/uploaded/reddit.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">`;
        } else if (this.value === 'google-icon') {
            iconPreview.innerHTML = `<img src="lib/uploaded/google.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">`;
        } else if (this.value === 'google-drive-icon') {
            iconPreview.innerHTML = `<img src="lib/uploaded/google-drive.svg" class="w-6 h-6" style="fill: currentColor; stroke: currentColor;">`;
        } else {
            iconPreview.innerHTML = `<i data-feather="${this.value}" class="w-6 h-6"></i>`;
            feather.replace();
        }
    });

    const removeButton = iconDiv.querySelector('button:last-child');
    removeButton.addEventListener('click', () => iconDiv.remove());

    addDragListeners(iconDiv);

    const urlInput = iconDiv.querySelector('input[type="url"]');
    addUrlValidationListener(urlInput);

    // Initialize Feather icons for the preview
    feather.replace();

    return iconDiv;
}

function addDragListeners(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('opacity-50');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('border-t-2', 'border-primary');
}

function handleDragLeave(e) {
    this.classList.remove('border-t-2', 'border-primary');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('border-t-2', 'border-primary');
    
    if (draggedElement !== this) {
        const container = this.parentNode;
        const allItems = [...container.children];
        const draggedIndex = allItems.indexOf(draggedElement);
        const droppedIndex = allItems.indexOf(this);

        if (draggedIndex < droppedIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }
    
    draggedElement.classList.remove('opacity-50');
    draggedElement = null;
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

function createHabitInput(name = '') {
    const habitDiv = document.createElement('div');
    habitDiv.className = 'flex gap-4 items-center';
    habitDiv.draggable = true;
    
    habitDiv.innerHTML = `
        <button class="drag-handle cursor-move">⋮⋮</button>
        <input type="text" placeholder="Habit Name" class="input w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" value="${name}"/>
        <button class="btn btn-ghost btn-sm text-error border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg">×</button>
    `;

    const removeButton = habitDiv.querySelector('button:last-child');
    removeButton.addEventListener('click', () => habitDiv.remove());

    addDragListeners(habitDiv);

    return habitDiv;
}

function toggleHabitsSettings(show) {
    const habitsSettings = document.querySelectorAll('.habits-setting');
    habitsSettings.forEach(element => {
        element.style.display = show ? 'block' : 'none';
    });
}

function loadSettings() {
    // Load settings from localStorage with better default values
    const settings = JSON.parse(localStorage.getItem('tabSettings')) || {
        theme: 'cupcake',
        name: '',
        weatherApiKey: '',
        weatherLat: '',
        weatherLon: '',
        showTodo: false,
        showWeather: false,
        showQuote: false,
        showHabits: false,
        showCalculator: false,
        habits: [],
        todos: [],
        links: [
            { name: 'Google', url: 'https://google.com' },
            { name: 'GitHub', url: 'https://github.com' },
            { name: 'Gmail', url: 'https://gmail.com' }
        ],
        icons: [
            { icon: 'search', url: 'https://google.com' },
            { icon: 'github', url: 'https://github.com' },
            { icon: 'mail', url: 'https://gmail.com' }
        ]
    };

    // Set theme
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = settings.theme;
        document.documentElement.setAttribute('data-theme', settings.theme);
    }

    // Set name
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        nameInput.value = settings.name;
    }

    // Set weather settings
    const weatherApiKey = document.getElementById('weather-api-key');
    const weatherLat = document.getElementById('weather-lat');
    const weatherLon = document.getElementById('weather-lon');
    const showWeather = document.getElementById('show-weather');

    if (weatherApiKey) weatherApiKey.value = settings.weatherApiKey;
    if (weatherLat) weatherLat.value = settings.weatherLat;
    if (weatherLon) weatherLon.value = settings.weatherLon;
    if (showWeather) {
        showWeather.checked = settings.showWeather;
        toggleWeatherSettings(settings.showWeather);
    }

    // Set other checkboxes
    const showTodo = document.getElementById('show-todo');
    const showQuote = document.getElementById('show-quote');
    const showHabits = document.getElementById('show-habits');
    const showCalculator = document.getElementById('show-calculator');

    if (showTodo) showTodo.checked = settings.showTodo;
    if (showQuote) showQuote.checked = settings.showQuote;
    if (showHabits) {
        showHabits.checked = settings.showHabits;
        toggleHabitsSettings(settings.showHabits);
    }
    if (showCalculator) showCalculator.checked = settings.showCalculator;

    // Set links
    const linkContainer = document.getElementById('linkContainer');
    if (linkContainer) {
        linkContainer.innerHTML = ''; // Clear existing links
        settings.links.forEach(link => {
            linkContainer.appendChild(createLinkInputs(link.name, link.url));
        });
    }

    // Set icons
    const iconContainer = document.getElementById('iconContainer');
    if (iconContainer) {
        iconContainer.innerHTML = '';
        settings.icons.forEach(icon => {
            iconContainer.appendChild(createIconInputs(icon.icon, icon.url));
        });
    }

    // Set habits
    const habitsContainer = document.getElementById('habitsContainer');
    if (habitsContainer) {
        habitsContainer.innerHTML = '';
        settings.habits.forEach(habit => {
            habitsContainer.appendChild(createHabitInput(habit.name));
        });
    }

    // Set joke checkbox
    const jokeCheckbox = document.getElementById('show-joke');
    if (jokeCheckbox) {
        jokeCheckbox.checked = settings.showJoke;
    }

    // Set mindfulness checkbox
    const showMindfulness = document.getElementById('show-mindfulness');
    if (showMindfulness) {
        showMindfulness.checked = settings.showMindfulness;
    }

    console.log('Settings loaded:', settings);
}

function validateUrl(url) {
    if (url === '#' || url === '') return true;
    try {
        new URL(formatUrl(url));
        return true;
    } catch (e) {
        return false;
    }
}

function saveSettings() {
    console.log('saveSettings function called');
    const settings = {
        theme: document.getElementById('theme-select')?.value || 'cupcake',
        name: document.getElementById('name-input')?.value || '',
        weatherApiKey: document.getElementById('weather-api-key')?.value?.trim() || '',
        weatherLat: document.getElementById('weather-lat')?.value?.trim() || '',
        weatherLon: document.getElementById('weather-lon')?.value?.trim() || '',
        showTodo: document.getElementById('show-todo')?.checked || false,
        showWeather: document.getElementById('show-weather')?.checked || false,
        showQuote: document.getElementById('show-quote')?.checked || false,
        showHabits: document.getElementById('show-habits')?.checked || false,
        showCalculator: document.getElementById('show-calculator')?.checked || false,
        habits: [],
        todos: JSON.parse(localStorage.getItem('tabSettings'))?.todos || [],
        links: [],
        icons: [],
        showJoke: document.getElementById('show-joke').checked,
        showMindfulness: document.getElementById('show-mindfulness')?.checked || false
    };
    console.log('Initial settings object created:', settings);

    // Get link values with more permissive validation
    const linkInputs = document.querySelectorAll('#linkContainer .flex');
    linkInputs.forEach(row => {
        const nameInput = row.querySelector('input[type="text"]');
        const urlInput = row.querySelector('input[type="url"]');
        
        if (nameInput && urlInput) {
            const url = formatUrl(urlInput.value.trim());
            if (url === '#' || validateUrl(url)) {
                settings.links.push({
                    name: nameInput.value.trim() || `Link ${settings.links.length + 1}`,
                    url: url
                });
            }
        }
    });
    console.log('Links added:', settings.links);

    // Get icon values with more permissive validation
    const iconInputs = document.querySelectorAll('#iconContainer .flex');
    iconInputs.forEach(row => {
        const iconSelect = row.querySelector('select');
        const urlInput = row.querySelector('input[type="url"]');
        
        if (iconSelect && urlInput) {
            const url = formatUrl(urlInput.value.trim());
            if (url === '#' || validateUrl(url)) {
                settings.icons.push({
                    icon: iconSelect.value,
                    url: url
                });
            }
        }
    });
    console.log('Icons added:', settings.icons);

    // Get habit values
    const habitInputs = document.querySelectorAll('#habitsContainer .flex input');
    const oldSettings = JSON.parse(localStorage.getItem('tabSettings')) || {};
    const oldHabits = oldSettings.habits || [];
    
    habitInputs.forEach(input => {
        if (input.value.trim()) {
            const existingHabit = oldHabits.find(h => h.name === input.value.trim());
            settings.habits.push({
                name: input.value.trim(),
                lastCompleted: existingHabit ? existingHabit.lastCompleted : null
            });
        }
    });
    console.log('Habits added:', settings.habits);

    try {
        // Save to localStorage
        console.log('Saving settings to localStorage:', settings);
        localStorage.setItem('tabSettings', JSON.stringify(settings));

        // Redirect back to main page
        console.log('Redirecting to tab.html');
        window.location.href = 'tab.html';
    } catch (error) {
        console.error('Error saving settings:', error);
        alert('There was an error saving your settings. Please check the console for details.');
    }
}

function formatUrl(url) {
    if (!url || url === '#') return '#';
    
    // Handle special cases
    if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('file:')) {
        return url;
    }
    
    // If the URL doesn't start with a protocol, add https://
    if (!url.match(/^https?:\/\//i)) {
        return 'https://' + url;
    }
    
    return url;
}

function toggleWeatherSettings(show) {
    const weatherSettings = document.querySelectorAll('.weather-setting');
    weatherSettings.forEach(element => {
        element.style.display = show ? 'block' : 'none';
    });
}

async function initializeRoadmap() {
    try {
        const response = await fetch('data/roadmap.json');
        const data = await response.json();
        const roadmapItems = data.items;

        // Load saved votes from localStorage
        const savedVotes = JSON.parse(localStorage.getItem('roadmapVotes')) || {};
        
        const roadmapContainer = document.getElementById('roadmap-items');
        roadmapContainer.innerHTML = '';

        roadmapItems.forEach(item => {
            item.votes = savedVotes[item.id]?.votes || 0;
            const statusColors = {
                'planned': 'badge-primary',
                'in-progress': 'badge-accent',
                'considering': 'badge-secondary',
                'completed': 'badge-success'
            };

            const itemElement = document.createElement('div');
            itemElement.className = 'bg-base-200 p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-base-300';
            itemElement.innerHTML = `
                <div class="flex flex-col gap-6">
                    <div class="flex items-start justify-between">
                        <div class="flex-grow">
                            <div class="flex flex-wrap items-center gap-4 mb-4">
                                <h4 class="font-bold text-xl text-primary">${item.title}</h4>
                                <span class="badge ${statusColors[item.status]} badge-md font-bold uppercase tracking-wide px-4 py-3">${item.status}</span>
                            </div>
                            <p class="text-base-content/80 leading-relaxed px-1">${item.description}</p>
                        </div>
                        <div class="flex flex-col items-center gap-2 ml-6">
                            <button class="vote-button btn btn-circle btn-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none transition-all ${savedVotes[item.id]?.voted ? 'btn-primary' : 'btn-ghost'} p-4" data-id="${item.id}">
                                <i data-feather="arrow-up" class="w-5 h-5"></i>
                            </button>
                            <span class="vote-count font-bold text-lg text-primary">${item.votes}</span>
                        </div>
                    </div>
                </div>
            `;

            const voteButton = itemElement.querySelector('.vote-button');
            voteButton.addEventListener('click', () => {
                const currentVotes = savedVotes[item.id] || { votes: 0, voted: false };
                if (currentVotes.voted) {
                    currentVotes.votes--;
                    currentVotes.voted = false;
                    voteButton.classList.remove('btn-primary');
                } else {
                    currentVotes.votes++;
                    currentVotes.voted = true;
                    voteButton.classList.add('btn-primary');
                }
                savedVotes[item.id] = currentVotes;
                localStorage.setItem('roadmapVotes', JSON.stringify(savedVotes));
                itemElement.querySelector('.vote-count').textContent = currentVotes.votes;
            });

            roadmapContainer.appendChild(itemElement);
        });

        feather.replace();
    } catch (error) {
        console.error('Error loading roadmap:', error);
    }
}

function addUrlValidationListener(urlInput) {
    urlInput.addEventListener('blur', function() {
        const url = formatUrl(this.value.trim());
        if (!validateUrl(url) && url !== '#') {
            this.classList.add('input-error');
            // Add error message
            let errorMsg = this.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message text-error text-sm mt-1';
                this.parentNode.insertBefore(errorMsg, this.nextSibling);
            }
            errorMsg.textContent = 'Please enter a valid URL';
        } else {
            this.classList.remove('input-error');
            // Remove error message if it exists
            const errorMsg = this.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
}

function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tip]');
    
    tooltips.forEach(element => {
        // Add mouseenter event
        element.addEventListener('mouseenter', (e) => {
            const tip = element.getAttribute('data-tip');
            
            // Remove any existing tooltips first
            const existingTooltip = document.querySelector('.tooltip-popup');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-popup';
            tooltip.textContent = tip;
            tooltip.style.cssText = `
                position: fixed;
                background: var(--fallback-b1,oklch(var(--b1)));
                color: var(--fallback-bc,oklch(var(--bc)));
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                white-space: nowrap;
                border: 2px solid black;
                box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
                z-index: 9999;
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.15s ease-in-out;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position the tooltip
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // For tooltip-top
            if (element.closest('.tooltip-top')) {
                const left = rect.left + (rect.width - tooltipRect.width) / 2;
                const top = rect.top - tooltipRect.height - 12;
                
                tooltip.style.left = `${Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8))}px`;
                tooltip.style.top = `${Math.max(8, top)}px`;
            }
            // For tooltip-left
            else if (element.closest('.tooltip-left')) {
                const left = rect.left - tooltipRect.width - 12;
                const top = rect.top + (rect.height - tooltipRect.height) / 2;
                
                tooltip.style.left = `${Math.max(8, left)}px`;
                tooltip.style.top = `${Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8))}px`;
            }

            // Force a reflow to ensure the transition works
            tooltip.offsetHeight;
            tooltip.style.opacity = '1';
        });
        
        // Add mouseleave event
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip-popup');
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 150);
            }
        });
    });
}

function toggleJokeSettings(show) {
    const jokeContainer = document.getElementById('joke-container');
    if (jokeContainer) {
        jokeContainer.style.display = show ? 'block' : 'none';
    }
}

function openChangelogModal() {
    console.log('openChangelogModal called'); // Debugging log
    const changelogModal = document.getElementById('changelog_modal');
    const changelogContent = document.getElementById('changelog-content');

    if (!changelogModal) {
        console.error('Changelog modal not found');
        return;
    }

    fetch('data/roadmap.json')
        .then(response => response.json())
        .then(data => {
            const completedItems = data.items.filter(item => item.status === 'completed');
            const groupedByVersion = completedItems.reduce((acc, item) => {
                if (!acc[item.version]) {
                    acc[item.version] = [];
                }
                acc[item.version].push(item);
                return acc;
            }, {});

            changelogContent.innerHTML = ''; // Clear previous content

            // Sort versions in descending order
            const sortedVersions = Object.keys(groupedByVersion).sort((a, b) => {
                return b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });
            });

            for (const version of sortedVersions) {
                const items = groupedByVersion[version];
                const versionSection = document.createElement('div');
                versionSection.classList.add('mb-4');

                const versionTitle = document.createElement('h4');
                versionTitle.classList.add('font-bold', 'text-xl', 'mb-2');
                versionTitle.textContent = `Version ${version}`;
                versionSection.appendChild(versionTitle);

                const itemList = document.createElement('ul');
                itemList.classList.add('list-disc', 'list-inside');

                items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${item.title}</strong>: ${item.description}`;
                    itemList.appendChild(listItem);
                });

                versionSection.appendChild(itemList);
                changelogContent.appendChild(versionSection);
            }
        })
        .catch(error => console.error('Error fetching roadmap:', error));

    changelogModal.showModal();
}