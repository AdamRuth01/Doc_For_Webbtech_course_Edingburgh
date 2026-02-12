// Web Audio API Manager
// Generates sounds programmatically (secure, no external files)

const AudioManager = {
    audioContext: null,
    masterVolume: 0.7,
    soundEnabled: true,
    initialized: false,

    // Initialize AudioContext (requires user interaction)
    init() {
        if (this.initialized) return;
        
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                console.warn('Web Audio API not supported');
                return false;
            }
            
            this.audioContext = new AudioContextClass();
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Error initializing audio:', error);
            return false;
        }
    },

    // Ensure audio context is initialized (call on user interaction)
    ensureInit() {
        if (!this.initialized) {
            this.init();
        }
        // Resume audio context if suspended (browser autoplay policy)
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },

    // Set master volume (0.0 to 1.0)
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    },

    // Enable/disable sounds
    setEnabled(enabled) {
        this.soundEnabled = enabled;
    },

    // Generate and play a tone
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        this.ensureInit();
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            const finalVolume = volume * this.masterVolume;
            gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration / 1000);
        } catch (error) {
            console.error('Error playing tone:', error);
        }
    },

    // Sound effects
    playBoxOpen() {
        // Ascending tone for box opening
        this.playTone(440, 150, 'sine', 0.3);
        setTimeout(() => this.playTone(554, 100, 'sine', 0.25), 50);
    },

    playButtonClick() {
        // Short beep for button click
        this.playTone(800, 50, 'square', 0.2);
    },

    playSuccess() {
        // Pleasant chord progression
        this.playTone(523, 200, 'sine', 0.3); // C
        setTimeout(() => this.playTone(659, 200, 'sine', 0.3), 100); // E
        setTimeout(() => this.playTone(784, 300, 'sine', 0.35), 200); // G
    },

    playError() {
        // Low buzz for error
        this.playTone(200, 300, 'sawtooth', 0.25);
    },

    playCountdownTick() {
        // Subtle tick for countdown
        this.playTone(600, 30, 'sine', 0.15);
    },

    playRoomComplete() {
        // Celebration sound
        this.playTone(523, 150, 'sine', 0.3); // C
        setTimeout(() => this.playTone(659, 150, 'sine', 0.3), 100); // E
        setTimeout(() => this.playTone(784, 150, 'sine', 0.3), 200); // G
        setTimeout(() => this.playTone(1047, 300, 'sine', 0.35), 300); // C (high)
    },

    // Background ambient sound (optional, can be toggled)
    startAmbient() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        this.ensureInit();
        
        // Low-frequency ambient tone (very subtle)
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 60; // Low frequency
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05 * this.masterVolume, this.audioContext.currentTime);
            
            oscillator.start();
            
            // Store reference to stop later
            this.ambientOscillator = oscillator;
            this.ambientGain = gainNode;
        } catch (error) {
            console.error('Error starting ambient sound:', error);
        }
    },

    stopAmbient() {
        if (this.ambientOscillator) {
            try {
                this.ambientOscillator.stop();
                this.ambientOscillator = null;
                this.ambientGain = null;
            } catch (error) {
                console.error('Error stopping ambient sound:', error);
            }
        }
    },

    // Check if Web Audio API is supported
    isSupported() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }
};
