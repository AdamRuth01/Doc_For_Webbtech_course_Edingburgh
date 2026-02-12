// Scoreboard Management
// Handles scoreboard display and sorting

const ScoreboardManager = {
    init() {
        this.displayScoreboard();
    },

    displayScoreboard() {
        const scores = StorageManager.getScoreboard();
        const scoreboardContainer = document.getElementById('scoreboard-list');
        
        if (!scoreboardContainer) return;
        
        if (scores.length === 0) {
            scoreboardContainer.innerHTML = '<p style="text-align: center; color: #a0a0a0; padding: 20px;">No scores yet. Complete the game to see your time here!</p>';
            return;
        }
        
        // Sort by time (ascending - fastest first)
        const sortedScores = [...scores].sort((a, b) => a.time - b.time);
        
        scoreboardContainer.innerHTML = '';
        
        sortedScores.forEach((score, index) => {
            const scoreItem = document.createElement('div');
            scoreItem.className = 'scoreboard-item';
            
            const rank = index + 1;
            const timeFormatted = this.formatTime(score.time);
            const dateFormatted = new Date(score.date).toLocaleDateString();
            
            // Add medal emoji for top 3
            let rankDisplay = rank;
            if (rank === 1) rankDisplay = '🥇 1st';
            else if (rank === 2) rankDisplay = '🥈 2nd';
            else if (rank === 3) rankDisplay = '🥉 3rd';
            else rankDisplay = `#${rank}`;
            
            scoreItem.innerHTML = `
                <div class="score-rank">${rankDisplay}</div>
                <div class="score-time">${timeFormatted}</div>
                <div class="score-rooms">${score.rooms} rooms</div>
                <div class="score-date">${dateFormatted}</div>
            `;
            
            // Add highlight for top score
            if (rank === 1) {
                scoreItem.classList.add('top-score');
            }
            
            scoreboardContainer.appendChild(scoreItem);
        });
    },

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    getBestTime() {
        const scores = StorageManager.getScoreboard();
        if (scores.length === 0) return null;
        
        const sortedScores = [...scores].sort((a, b) => a.time - b.time);
        return sortedScores[0];
    },

    getAverageTime() {
        const scores = StorageManager.getScoreboard();
        if (scores.length === 0) return null;
        
        const total = scores.reduce((sum, score) => sum + score.time, 0);
        return Math.round(total / scores.length);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof ScoreboardManager !== 'undefined') {
        ScoreboardManager.init();
    }
});
