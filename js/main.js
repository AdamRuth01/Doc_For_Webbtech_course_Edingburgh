// Game State
const gameState = {
    currentRoom: 1,
    startTime: null,
    achievements: [],
    rooms: {
        1: { solved: false, openedBoxes: [] },
        2: { solved: false, sequence: [], correctSequence: [1, 4, 2, 3] },
        3: { solved: false, selectedChemicals: [], correctCombination: ['A', 'C', 'E'] },
        4: { solved: false, countdown: 60, code: '', correctCode: '7359' },
        5: { solved: false, foundDigits: [], correctCode: [7, 1, 3, 3, 5] }
    }
};

// Room Data
const roomData = {
    1: {
        title: 'Room 1: The Cell',
        description: 'You find yourself in a dark cell. Find the door code by opening the boxes. Each box contains a digit. Open all three boxes to reveal the 3-digit code.',
        boxes: [
            { id: 1, number: 4, hint: 'First digit: 4' },
            { id: 2, number: 2, hint: 'Second digit: 2' },
            { id: 3, number: 7, hint: 'Third digit: 7' }
        ],
        correctCode: '427'
    },
    2: {
        title: 'Room 2: Control Room',
        description: 'You are in the control room. Activate the power by pressing the buttons in the correct order. Hint: "Start with the smallest number (1), then the largest (4), then the middle-left (2), and finally the middle-right (3)."',
        buttons: [
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' }
        ],
        correctSequence: [1, 4, 2, 3]
    },
    3: {
        title: 'Room 3: Laboratory',
        description: 'In the laboratory, you must mix the correct chemicals. Select the three chemicals that together form a safe combination. Hint: "Choose the ones that start with the letters A, C, and E."',
        chemicals: [
            { id: 'A', name: 'Ammonia', hint: 'Starts with A' },
            { id: 'B', name: 'Benzene', hint: 'Not correct' },
            { id: 'C', name: 'Chlorine', hint: 'Starts with C' },
            { id: 'D', name: 'Dichloride', hint: 'Not correct' },
            { id: 'E', name: 'Ethanol', hint: 'Starts with E' },
            { id: 'F', name: 'Formaldehyde', hint: 'Not correct' }
        ],
        correctCombination: ['A', 'C', 'E']
    },
    4: {
        title: 'Room 4: Machine Room',
        description: 'A countdown has started! Solve the riddle to stop it. Riddle: "The first digit is seven. The second is three (half of six). The third is five. The fourth is nine (three squared)."',
        countdown: 60,
        correctCode: '7359'
    },
    5: {
        title: 'Room 5: The Exit',
        description: 'Final room! Use everything you have learned. The code consists of 5 digits. Hint 1: Third digit from Room 1. Hint 2: First digit from Room 2. Hint 3: Number of chemicals selected in Room 3. Hint 4: Second digit from Room 4. Hint 5: Total number of rooms.',
        hints: [
            'Hint 1: Third digit from Room 1 = 7',
            'Hint 2: First digit from Room 2 = 1',
            'Hint 3: Number of chemicals from Room 3 = 3',
            'Hint 4: Second digit from Room 4 = 3',
            'Hint 5: Total number of rooms = 5'
        ],
        correctCode: [7, 1, 3, 3, 5]
    }
};

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    const startBtn = document.getElementById('start-btn');
    const nextRoomBtn = document.getElementById('next-room-btn');
    const restartBtn = document.getElementById('restart-btn');
    const playAgainBtn = document.getElementById('play-again-btn');

    startBtn.addEventListener('click', startGame);
    nextRoomBtn.addEventListener('click', goToNextRoom);
    restartBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', restartGame);

    // Initialize first room if needed
    if (document.getElementById('room-container').classList.contains('active')) {
        loadRoom(gameState.currentRoom);
    }
}

function startGame() {
    gameState.startTime = Date.now();
    showScreen('room-container');
    loadRoom(1);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function loadRoom(roomNumber) {
    gameState.currentRoom = roomNumber;
    const room = roomData[roomNumber];
    
    // Animate room transition
    const roomContainer = document.getElementById('room-container');
    roomContainer.style.opacity = '0';
    roomContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // Update header
        document.getElementById('room-title').textContent = room.title;
        document.getElementById('current-room').textContent = roomNumber;
        document.getElementById('room-description').innerHTML = `<p>${room.description}</p>`;
        
        // Update progress bar
        updateProgressBar();
        
        // Hide next room button
        document.getElementById('next-room-btn').classList.add('hidden');
        document.getElementById('puzzle-status').innerHTML = '';

        // Load room-specific content
        const roomContent = document.getElementById('room-content');
        
        switch(roomNumber) {
            case 1:
                loadRoom1(roomContent, room);
                break;
            case 2:
                loadRoom2(roomContent, room);
                break;
            case 3:
                loadRoom3(roomContent, room);
                break;
            case 4:
                loadRoom4(roomContent, room);
                break;
            case 5:
                loadRoom5(roomContent, room);
                break;
        }
        
        // Animate in
        roomContainer.style.opacity = '1';
        roomContainer.style.transform = 'translateY(0)';
        roomContainer.style.transition = 'all 0.5s ease-out';
    }, 200);
}

function updateProgressBar() {
    const solvedRooms = Object.values(gameState.rooms).filter(r => r.solved).length;
    const progress = (solvedRooms / 5) * 100;
    
    let progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-bar-container';
        progressContainer.innerHTML = '<div id="progress-bar" class="progress-bar"></div>';
        const roomHeader = document.querySelector('.room-header');
        roomHeader.appendChild(progressContainer);
        progressBar = document.getElementById('progress-bar');
    }
    
    progressBar.style.width = progress + '%';
}

// Room 1: The Cell - Box Puzzle
function loadRoom1(container, room) {
    container.innerHTML = `
        <div class="boxes-container">
            ${room.boxes.map(box => `
                <div class="box" data-box-id="${box.id}">
                    <div class="box-content">${box.id}</div>
                </div>
            `).join('')}
        </div>
        <div id="code-display" class="puzzle-status"></div>
    `;

    const boxes = container.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const boxId = parseInt(box.dataset.boxId);
            if (!gameState.rooms[1].openedBoxes.includes(boxId)) {
                openBox(boxId, box, room);
            }
        });
    });
}

function openBox(boxId, boxElement, room) {
    const boxData = room.boxes.find(b => b.id === boxId);
    gameState.rooms[1].openedBoxes.push(boxId);
    
    boxElement.classList.add('opened');
    boxElement.innerHTML = `<div class="box-content">${boxData.number}</div>`;
    
    updateCodeDisplay();
    checkRoom1Complete();
}

function updateCodeDisplay() {
    const codeDisplay = document.getElementById('code-display');
    const openedBoxes = gameState.rooms[1].openedBoxes.sort();
    const code = openedBoxes.map(id => {
        const box = roomData[1].boxes.find(b => b.id === id);
        return box.number;
    }).join('');
    
    codeDisplay.innerHTML = `<div class="status-message">Code: ${code || '___'}</div>`;
}

function checkRoom1Complete() {
    if (gameState.rooms[1].openedBoxes.length === 3) {
        const code = gameState.rooms[1].openedBoxes.sort().map(id => {
            const box = roomData[1].boxes.find(b => b.id === id);
            return box.number;
        }).join('');
        
        if (code === roomData[1].correctCode) {
            gameState.rooms[1].solved = true;
            createParticleEffect(document.getElementById('puzzle-status'));
            document.getElementById('puzzle-status').innerHTML = 
                '<div class="status-message">✓ Correct code! The door is open!</div>';
            document.getElementById('next-room-btn').classList.remove('hidden');
            unlockAchievement('First Escape', 'You opened your first door!');
            updateProgressBar();
        }
    }
}

// Room 2: Control Room - Button Sequence
function loadRoom2(container, room) {
    container.innerHTML = `
        <div class="sequence-hint">
            <p>Press the buttons in the correct order to activate the power.</p>
        </div>
        <div class="buttons-container">
            ${room.buttons.map(btn => `
                <button class="control-button" data-btn-id="${btn.id}">${btn.label}</button>
            `).join('')}
        </div>
        <div id="sequence-display" class="puzzle-status"></div>
    `;

    const buttons = container.querySelectorAll('.control-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            handleButtonClick(parseInt(btn.dataset.btnId), btn, room);
        });
    });
}

function handleButtonClick(btnId, btnElement, room) {
    const sequence = gameState.rooms[2].sequence;
    
    if (sequence.includes(btnId)) {
        return; // Already clicked
    }
    
    sequence.push(btnId);
    btnElement.classList.add('active');
    
    updateSequenceDisplay();
    
    // Check if sequence is correct so far
    const correctSequence = room.correctSequence;
    const currentIndex = sequence.length - 1;
    
    if (sequence[currentIndex] !== correctSequence[currentIndex]) {
        // Wrong sequence - reset
        setTimeout(() => {
            resetRoom2();
        }, 1000);
        btnElement.classList.add('wrong');
        } else if (sequence.length === correctSequence.length) {
            // Complete and correct
            gameState.rooms[2].solved = true;
            createParticleEffect(document.getElementById('puzzle-status'));
            document.getElementById('puzzle-status').innerHTML = 
                '<div class="status-message">✓ Power activated!</div>';
            document.getElementById('next-room-btn').classList.remove('hidden');
            unlockAchievement('Power Master', 'You activated the control room!');
            updateProgressBar();
        }
}

function updateSequenceDisplay() {
    const display = document.getElementById('sequence-display');
    const sequence = gameState.rooms[2].sequence;
    display.innerHTML = `<div class="status-message">Sequence: ${sequence.join(' → ')}</div>`;
}

function resetRoom2() {
    gameState.rooms[2].sequence = [];
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'wrong');
    });
    document.getElementById('sequence-display').innerHTML = 
        '<div class="status-error">Wrong order! Try again.</div>';
}

// Room 3: Laboratory - Chemical Mixing
function loadRoom3(container, room) {
    container.innerHTML = `
        <div class="chemicals-container">
            ${room.chemicals.map(chem => `
                <div class="chemical" data-chem-id="${chem.id}">
                    <div class="chemical-name">${chem.name}</div>
                    <div class="chemical-hint">${chem.hint}</div>
                </div>
            `).join('')}
        </div>
        <div class="selected-chemicals">
            <p>Selected chemicals: <span id="selected-list">None selected</span></p>
        </div>
        <button class="mix-button btn-primary" id="mix-btn">Mix Chemicals</button>
        <div id="mix-result" class="puzzle-status"></div>
    `;

    const chemicals = container.querySelectorAll('.chemical');
    chemicals.forEach(chem => {
        chem.addEventListener('click', () => {
            toggleChemical(chem.dataset.chemId, chem);
        });
    });

    document.getElementById('mix-btn').addEventListener('click', () => {
        mixChemicals(room);
    });
}

function toggleChemical(chemId, chemElement) {
    const selected = gameState.rooms[3].selectedChemicals;
    const index = selected.indexOf(chemId);
    
    if (index > -1) {
        selected.splice(index, 1);
        chemElement.classList.remove('selected');
    } else {
        if (selected.length < 3) {
            selected.push(chemId);
            chemElement.classList.add('selected');
        }
    }
    
    updateSelectedChemicals();
}

function updateSelectedChemicals() {
    const selected = gameState.rooms[3].selectedChemicals;
    const display = document.getElementById('selected-list');
    
    if (selected.length === 0) {
        display.textContent = 'None selected';
    } else {
        const names = selected.map(id => {
            const chem = roomData[3].chemicals.find(c => c.id === id);
            return chem.name;
        });
        display.textContent = names.join(', ');
    }
}

function mixChemicals(room) {
    const selected = gameState.rooms[3].selectedChemicals.sort();
    const correct = room.correctCombination.sort();
    const resultDiv = document.getElementById('mix-result');
    
    if (selected.length !== 3) {
        resultDiv.innerHTML = '<div class="status-error">You must select exactly 3 chemicals!</div>';
        return;
    }
    
    if (JSON.stringify(selected) === JSON.stringify(correct)) {
        gameState.rooms[3].solved = true;
        createParticleEffect(resultDiv);
        resultDiv.innerHTML = '<div class="status-message">✓ Correct combination! The cabinet opens!</div>';
        document.getElementById('next-room-btn').classList.remove('hidden');
        unlockAchievement('Chemist', 'You mixed the perfect combination!');
        updateProgressBar();
    } else {
        resultDiv.innerHTML = '<div class="status-error">Wrong combination! Try again.</div>';
        // Reset selection
        gameState.rooms[3].selectedChemicals = [];
        document.querySelectorAll('.chemical').forEach(chem => {
            chem.classList.remove('selected');
        });
        updateSelectedChemicals();
    }
}

// Room 4: Machine Room - Countdown Timer
function loadRoom4(container, room) {
    container.innerHTML = `
        <div class="riddle">
            <p><strong>Riddle:</strong> "The first digit is seven. The second is three (half of six). The third is five. The fourth is nine (three squared)."</p>
        </div>
        <div class="countdown-container">
            <div class="countdown-timer" id="countdown">60</div>
            <p>Time remaining before system crashes!</p>
        </div>
        <div class="code-input-container">
            <input type="text" class="code-input" id="code-input" placeholder="Code" maxlength="4" pattern="[0-9]*">
            <button class="btn-primary" id="submit-code-btn" style="margin-top: 15px;">Submit Code</button>
        </div>
        <div id="code-result" class="puzzle-status"></div>
    `;

    const codeInput = document.getElementById('code-input');
    codeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('submit-code-btn').addEventListener('click', () => {
        checkCode4(codeInput.value, room);
    });

    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkCode4(codeInput.value, room);
        }
    });

    // Start countdown
    startCountdown();
}

function startCountdown() {
    let timeLeft = gameState.rooms[4].countdown;
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        if (gameState.rooms[4].solved) {
            clearInterval(timer);
            return;
        }
        
        timeLeft--;
        gameState.rooms[4].countdown = timeLeft;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            countdownElement.style.color = '#e74c3c';
            countdownElement.style.animation = 'pulse 0.5s infinite';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.textContent = '0';
            document.getElementById('code-result').innerHTML = 
                '<div class="status-error">Time is up! System crashed... Try again!</div>';
            setTimeout(() => {
                resetRoom4();
            }, 2000);
        }
    }, 1000);
}

function checkCode4(code, room) {
    const resultDiv = document.getElementById('code-result');
    
    if (code === room.correctCode) {
        gameState.rooms[4].solved = true;
        gameState.rooms[4].countdown = 0; // Stop countdown
        createParticleEffect(resultDiv);
        resultDiv.innerHTML = '<div class="status-message">✓ Correct code! Countdown stopped!</div>';
        document.getElementById('next-room-btn').classList.remove('hidden');
        unlockAchievement('Time Master', 'You stopped the countdown in time!');
        updateProgressBar();
    } else {
        resultDiv.innerHTML = '<div class="status-error">Wrong code! Try again.</div>';
        document.getElementById('code-input').value = '';
    }
}

function resetRoom4() {
    gameState.rooms[4].countdown = 60;
    document.getElementById('code-input').value = '';
    document.getElementById('code-result').innerHTML = '';
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.color = '#ff6b6b';
    countdownElement.style.animation = '';
    startCountdown();
}

// Room 5: Exit - Final Puzzle
function loadRoom5(container, room) {
    container.innerHTML = `
        <div class="final-puzzle">
            <div class="hint-box">
                <p><strong>Use everything you have learned to find the code!</strong></p>
            </div>
            ${room.hints.map((hint, index) => `
                <div class="hint-box">
                    <p>${hint}</p>
                </div>
            `).join('')}
            <div class="code-display">
                ${room.correctCode.map((digit, index) => `
                    <div class="code-digit" data-digit-index="${index}">?</div>
                `).join('')}
            </div>
            <div class="code-input-container">
                <input type="text" class="code-input" id="final-code-input" placeholder="Enter 5-digit code" maxlength="5" pattern="[0-9]*">
                <button class="btn-primary" id="submit-final-code-btn" style="margin-top: 15px;">Submit Code</button>
            </div>
            <div id="final-result" class="puzzle-status"></div>
        </div>
    `;

    const codeInput = document.getElementById('final-code-input');
    codeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('submit-final-code-btn').addEventListener('click', () => {
        checkFinalCode(codeInput.value, room);
    });

    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkFinalCode(codeInput.value, room);
        }
    });
}

function checkFinalCode(code, room) {
    const resultDiv = document.getElementById('final-result');
    const correctCode = room.correctCode.join('');
    
    if (code === correctCode) {
        gameState.rooms[5].solved = true;
        resultDiv.innerHTML = '<div class="status-message">✓ Correct! You have escaped from the complex!</div>';
        setTimeout(() => {
            showWinScreen();
        }, 1500);
    } else {
        resultDiv.innerHTML = '<div class="status-error">Wrong code! Think about the hints.</div>';
        
        // Show which digits are correct
        const digits = code.split('').map(Number);
        const correctDigits = room.correctCode;
        const digitElements = document.querySelectorAll('.code-digit');
        
        digits.forEach((digit, index) => {
            if (index < correctDigits.length && digit === correctDigits[index]) {
                digitElements[index].textContent = digit;
                digitElements[index].classList.add('found');
            }
        });
    }
}

function goToNextRoom() {
    if (gameState.currentRoom < 5) {
        loadRoom(gameState.currentRoom + 1);
    } else {
        showWinScreen();
    }
}

function showWinScreen() {
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('escape-time').textContent = timeString;
    
    // Unlock final achievement
    unlockAchievement('Escape Artist', 'You escaped from all rooms!');
    
    // Show achievements
    const achievementsList = document.getElementById('achievements-list');
    const achievementsCount = document.getElementById('achievements-count');
    achievementsCount.textContent = gameState.achievements.length;
    
    achievementsList.innerHTML = '';
    gameState.achievements.forEach(achievement => {
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.textContent = `🏆 ${achievement}`;
        achievementsList.appendChild(badge);
    });
    
    // Create confetti effect
    createConfetti();
    
    showScreen('win-screen');
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff6b6b', '#2ecc71', '#3498db', '#f39c12', '#9b59b6'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = ['#2ecc71', '#ff6b6b', '#3498db', '#f39c12'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let x = centerX;
        let y = centerY;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

function unlockAchievement(name, description) {
    if (gameState.achievements.includes(name)) {
        return; // Already unlocked
    }
    
    gameState.achievements.push(name);
    
    const achievementDiv = document.createElement('div');
    achievementDiv.className = 'achievement-badge';
    achievementDiv.innerHTML = `🏆 ${name}`;
    achievementDiv.style.position = 'fixed';
    achievementDiv.style.top = '20px';
    achievementDiv.style.right = '20px';
    achievementDiv.style.zIndex = '10000';
    
    document.body.appendChild(achievementDiv);
    
    setTimeout(() => {
        achievementDiv.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            achievementDiv.remove();
        }, 500);
    }, 3000);
}

function restartGame() {
    // Reset game state
    gameState.currentRoom = 1;
    gameState.startTime = null;
    gameState.achievements = [];
    gameState.rooms = {
        1: { solved: false, openedBoxes: [] },
        2: { solved: false, sequence: [], correctSequence: [1, 4, 2, 3] },
        3: { solved: false, selectedChemicals: [], correctCombination: ['A', 'C', 'E'] },
        4: { solved: false, countdown: 60, code: '', correctCode: '7359' },
        5: { solved: false, foundDigits: [], correctCode: [7, 1, 3, 3, 5] }
    };
    
    // Remove progress bar if exists
    const progressContainer = document.querySelector('.progress-bar-container');
    if (progressContainer) {
        progressContainer.remove();
    }
    
    showScreen('start-screen');
}
