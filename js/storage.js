// Storage Utilities for localStorage
// Handles game progress, settings, and scoreboard persistence

const StorageManager = {
    // Storage keys
    KEYS: {
        SETTINGS: 'escapeRoom_settings',
        SCOREBOARD: 'escapeRoom_scoreboard',
        GAME_PROGRESS: 'escapeRoom_progress'
    },

    // Settings management
    saveSettings(settings) {
        try {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    },

    loadSettings() {
        try {
            const stored = localStorage.getItem(this.KEYS.SETTINGS);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        // Default settings
        return {
            soundEnabled: true,
            volume: 0.7,
            graphicsQuality: 'high'
        };
    },

    // Scoreboard management
    saveScore(timeInSeconds, roomsCompleted) {
        try {
            const scores = this.getScoreboard();
            const newScore = {
                time: timeInSeconds,
                date: new Date().toISOString().split('T')[0],
                rooms: roomsCompleted,
                timestamp: Date.now()
            };
            
            scores.push(newScore);
            // Sort by time (ascending - fastest first)
            scores.sort((a, b) => a.time - b.time);
            // Keep only top 10
            scores.splice(10);
            
            localStorage.setItem(this.KEYS.SCOREBOARD, JSON.stringify(scores));
            return true;
        } catch (error) {
            console.error('Error saving score:', error);
            return false;
        }
    },

    getScoreboard() {
        try {
            const stored = localStorage.getItem(this.KEYS.SCOREBOARD);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading scoreboard:', error);
        }
        return [];
    },

    clearScoreboard() {
        try {
            localStorage.removeItem(this.KEYS.SCOREBOARD);
            return true;
        } catch (error) {
            console.error('Error clearing scoreboard:', error);
            return false;
        }
    },

    // Game progress management
    saveProgress(gameState) {
        try {
            const progress = {
                currentRoom: gameState.currentRoom,
                startTime: gameState.startTime,
                achievements: gameState.achievements,
                roomsSolved: Object.keys(gameState.rooms)
                    .filter(roomNum => gameState.rooms[roomNum].solved)
                    .map(Number),
                rooms: {}
            };
            
            // Save room-specific state
            Object.keys(gameState.rooms).forEach(roomNum => {
                const room = gameState.rooms[roomNum];
                progress.rooms[roomNum] = {
                    solved: room.solved,
                    // Save room-specific data
                    openedBoxes: room.openedBoxes || [],
                    sequence: room.sequence || [],
                    selectedChemicals: room.selectedChemicals || [],
                    countdown: room.countdown || 60,
                    foundDigits: room.foundDigits || []
                };
            });
            
            localStorage.setItem(this.KEYS.GAME_PROGRESS, JSON.stringify(progress));
            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    },

    loadProgress() {
        try {
            const stored = localStorage.getItem(this.KEYS.GAME_PROGRESS);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
        return null;
    },

    clearProgress() {
        try {
            localStorage.removeItem(this.KEYS.GAME_PROGRESS);
            return true;
        } catch (error) {
            console.error('Error clearing progress:', error);
            return false;
        }
    },

    // Utility: Check if localStorage is available
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
};
