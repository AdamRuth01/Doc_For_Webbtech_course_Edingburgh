// Settings Management
// Handles settings UI and persistence

const SettingsManager = {
    init() {
        this.loadAndDisplaySettings();
        this.setupEventListeners();
    },

    loadAndDisplaySettings() {
        const settings = StorageManager.loadSettings();
        
        // Update UI elements
        const soundToggle = document.getElementById('sound-toggle');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');
        const graphicsSelect = document.getElementById('graphics-quality');
        
        if (soundToggle) {
            soundToggle.checked = settings.soundEnabled;
        }
        
        if (volumeSlider) {
            volumeSlider.value = settings.volume * 100; // Convert to percentage
        }
        
        if (volumeValue) {
            volumeValue.textContent = Math.round(settings.volume * 100) + '%';
        }
        
        if (graphicsSelect) {
            graphicsSelect.value = settings.graphicsQuality || 'high';
        }
        
        // Apply settings
        this.applySettings(settings);
    },

    setupEventListeners() {
        const soundToggle = document.getElementById('sound-toggle');
        const volumeSlider = document.getElementById('volume-slider');
        const graphicsSelect = document.getElementById('graphics-quality');
        const resetProgressBtn = document.getElementById('reset-progress-btn');
        const clearScoreboardBtn = document.getElementById('clear-scoreboard-btn');
        const saveBtn = document.getElementById('save-settings-btn');
        
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                this.updateSetting('soundEnabled', e.target.checked);
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.updateSetting('volume', volume);
                const volumeValue = document.getElementById('volume-value');
                if (volumeValue) {
                    volumeValue.textContent = e.target.value + '%';
                }
            });
        }
        
        if (graphicsSelect) {
            graphicsSelect.addEventListener('change', (e) => {
                this.updateSetting('graphicsQuality', e.target.value);
            });
        }
        
        if (resetProgressBtn) {
            resetProgressBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset your game progress? This cannot be undone.')) {
                    StorageManager.clearProgress();
                    alert('Game progress has been reset.');
                }
            });
        }
        
        if (clearScoreboardBtn) {
            clearScoreboardBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear the scoreboard? This cannot be undone.')) {
                    StorageManager.clearScoreboard();
                    alert('Scoreboard has been cleared.');
                }
            });
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveSettings();
                alert('Settings saved!');
            });
        }
    },

    updateSetting(key, value) {
        const settings = StorageManager.loadSettings();
        settings[key] = value;
        StorageManager.saveSettings(settings);
        this.applySettings(settings);
    },

    applySettings(settings) {
        // Apply audio settings
        if (AudioManager.isSupported()) {
            AudioManager.setEnabled(settings.soundEnabled);
            AudioManager.setVolume(settings.volume);
        }
        
        // Apply graphics settings (could be used for future enhancements)
        document.documentElement.setAttribute('data-graphics-quality', settings.graphicsQuality);
    },

    saveSettings() {
        const settings = StorageManager.loadSettings();
        
        // Get current values from UI
        const soundToggle = document.getElementById('sound-toggle');
        const volumeSlider = document.getElementById('volume-slider');
        const graphicsSelect = document.getElementById('graphics-quality');
        
        if (soundToggle) {
            settings.soundEnabled = soundToggle.checked;
        }
        
        if (volumeSlider) {
            settings.volume = volumeSlider.value / 100;
        }
        
        if (graphicsSelect) {
            settings.graphicsQuality = graphicsSelect.value;
        }
        
        StorageManager.saveSettings(settings);
        this.applySettings(settings);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof SettingsManager !== 'undefined') {
        SettingsManager.init();
    }
});
