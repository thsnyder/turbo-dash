<!DOCTYPE html>
<html lang="en" data-theme="cupcake">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - Brutalist Tab</title>
    <link rel="stylesheet" href="src/output.css">
    <script src="lib/feather.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">

    <style>
        /* Existing styles */
        
        .title-font {
            font-family: 'Dela Gothic One', system-ui;
        }
    </style>

</head>
<body>
<div class="min-h-screen bg-base-300 text-base-content p-10">
    <!-- Back Button -->
    <a href="tab.html" class="btn btn-square btn-base-100 absolute top-4 left-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="square" stroke-linejoin="miter" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
    </a>

    <div class="max-w-3xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-4 mb-2">
                <img src="icons/turbo-dash-logo.png" alt="Turbo Dash Logo" class="w-16 h-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h1 class="text-5xl title-font mb-2">Turbo Dash</h1>
            </div>
            <p class="text-base-content/70">Your personal dashboard, turbocharged.</p>
        </div>

        <h2 class="text-2xl font-bold mb-8">Settings</h2>
        
        <div class="space-y-8">
            <!-- Theme Selection -->
            <div class="form-control mb-6">
                <label class="label">
                    <span class="label-text text-lg font-bold">Theme</span>
                </label>
                <select id="theme-select" class="select w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100">
                    <option value="cupcake">Cupcake</option>
                    <option value="dark">Dark</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="forest">Forest</option>
                    <option value="business">Business</option>
                    <option value="night">Night</option>
                    <option value="bumblebee">Bumblebee</option>
                    <option value="retro">Retro</option>
                    <option value="synthwave">Synthwave</option>
                    <option value="valentine">Valentine</option>
                    <option value="aqua">Aqua</option>
                    <option value="dracula">Dracula</option>
                    <option value="luxury">Luxury</option>
                    <option value="coffee">Coffee</option>
                    <option value="winter">Winter</option>
                    <option value="garden">Garden</option>
                    <option value="lofi">Lo-Fi</option>
                    <option value="pastel">Pastel</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="wireframe">Wireframe</option>
                </select>
            </div>

            <!-- Name Input -->
            <div class="form-control mb-6">
                <label class="label">
                    <span class="label-text text-lg font-bold">Your Name</span>
                </label>
                <input type="text" id="name-input" placeholder="Enter your name" class="input w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" />
            </div>

            <!-- Weather Settings -->
            <div class="form-control mb-8">
                <label class="label">
                    <span class="label-text text-lg font-bold">Weather Settings</span>
                </label>
                
                <!-- Accordion for API Instructions -->
                <div class="collapse collapse-arrow bg-base-100 border-2 border-black rounded-xl mb-4">
                    <input type="checkbox" /> 
                    <div class="collapse-title text-lg font-bold">
                        How to get your free OpenWeather API key
                    </div>
                    <div class="collapse-content">
                        <ol class="list-decimal list-inside space-y-2">
                            <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">OpenWeather API</a></li>
                            <li>Click "Subscribe" under the Free tier</li>
                            <li>Create an account or sign in</li>
                            <li>Go to your API keys section</li>
                            <li>Copy your API key and paste it below</li>
                            <li>Note: New API keys may take a few hours to activate</li>
                        </ol>
                    </div>
                </div>

                <!-- API Key Input -->
                <input type="text" 
                       id="weather-api-key" 
                       placeholder="Paste your OpenWeather API key here" 
                       class="input w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100 mb-4" />

                <!-- Latitude and Longitude Inputs -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="label">
                            <span class="label-text">Latitude</span>
                        </label>
                        <input type="number" 
                               id="weather-lat" 
                               step="0.000001"
                               placeholder="e.g., 40.7128" 
                               class="input w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" />
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text">Longitude</span>
                        </label>
                        <input type="number" 
                               id="weather-lon" 
                               step="0.000001"
                               placeholder="e.g., -74.0060" 
                               class="input w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none rounded-xl bg-base-100" />
                    </div>
                </div>
                <div class="mt-2 text-sm text-base-content/70">
                    <p>Find your coordinates at: <a href="https://www.latlong.net" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">latlong.net</a></p>
                </div>
            </div>

            <!-- Add-ons -->
            <div class="form-control mb-8">
                <label class="label">
                    <span class="label-text text-lg font-bold">Add-ons</span>
                </label>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center">
                        <label class="label cursor-pointer">
                            <input type="checkbox" id="show-search" class="checkbox checkbox-primary border-2 border-black" />
                            <span class="label-text ml-2">Show Google Search Bar</span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="label cursor-pointer">
                            <input type="checkbox" id="show-todo" class="checkbox checkbox-primary border-2 border-black" />
                            <span class="label-text ml-2">Show To-Do List</span>
                        </label>
                    </div>
                    <div class="flex items-center">
                        <label class="label cursor-pointer">
                            <input type="checkbox" id="show-weather" class="checkbox checkbox-primary border-2 border-black" />
                            <span class="label-text ml-2">Show Weather Widget</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Quick Icons Configuration -->
            <div class="form-control mb-8">
                <label class="label">
                    <span class="label-text text-lg font-bold">Quick Icons</span>
                </label>
                <div id="iconContainer" class="grid gap-4">
                    <!-- Icons will be added here dynamically -->
                </div>
                <button id="addIconButton" class="btn btn-base-100 mt-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl">
                    + Add Quick Icon
                </button>
            </div>

            <!-- Links Configuration -->
            <div class="space-y-4 mb-8">
                <label class="label">
                    <span class="label-text text-lg font-bold">Quick Links</span>
                </label>
                <div id="linkContainer" class="grid gap-4">
                    <!-- Links will be added here dynamically -->
                </div>
                <button id="addLinkButton" class="btn btn-base-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl">
                    + Add Another Link
                </button>
            </div>
        </div>

        <div class="mt-10">
            <button id="saveButton" class="btn btn-primary border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl">Save Changes</button>
            
            <a href="https://buymeacoffee.com/turbologic" 
               target="_blank" 
               rel="noopener noreferrer"
               class="btn btn-accent h-16 w-16 rounded-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center text-3xl fixed bottom-8 right-8">
                ☕️
            </a>
        </div>

        <div class="mt-8 text-center text-sm text-base-content/70">
            <p>Version 1.0.0 • Made with ♥ by 
                <a href="https://tomsnyder.blog" target="_blank" rel="noopener noreferrer" class="hover:underline">
                    Tom
                </a>
            </p>
        </div>
    </div>
</div>
<script src="settings.js"></script>
<style>
    /* Existing styles */
    
    .title-font {
        font-family: 'Dela Gothic One', system-ui;
    }
</style>
</body>
</html> 
