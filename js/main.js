// Game State
const gameState = {
    currentRoom: 1,
    startTime: null,
    rooms: {
        1: { solved: false, openedBoxes: [] },
        2: { solved: false, sequence: [], correctSequence: [1, 3, 2, 4] },
        3: { solved: false, selectedChemicals: [], correctCombination: ['A', 'C', 'E'] },
        4: { solved: false, countdown: 60, code: '', correctCode: '7359' },
        5: { solved: false, foundDigits: [], correctCode: [3, 1, 5, 2, 4] }
    }
};

// Room Data
const roomData = {
    1: {
        title: 'Rum 1: Cellen',
        description: 'Du befinner dig i en mörk cell. Hitta koden till dörrlåset genom att öppna lådorna. Varje låda innehåller en siffra.',
        boxes: [
            { id: 1, number: 4, hint: 'Första siffran: 4' },
            { id: 2, number: 2, hint: 'Andra siffran: 2' },
            { id: 3, number: 7, hint: 'Tredje siffran: 7' }
        ],
        correctCode: '427'
    },
    2: {
        title: 'Rum 2: Kontrollrummet',
        description: 'Du är i kontrollrummet. Aktivera strömmen genom att trycka på knapparna i rätt ordning. Ledtråd: "Börja med den minsta, sedan den största, sedan mitten, och slutligen den fjärde."',
        buttons: [
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' }
        ],
        correctSequence: [1, 3, 2, 4]
    },
    3: {
        title: 'Rum 3: Laboratoriet',
        description: 'I laboratoriet måste du blanda rätt kemikalier. Välj de tre kemikalier som tillsammans bildar en säker kombination. Ledtråd: "Välj de som börjar på A, C och E."',
        chemicals: [
            { id: 'A', name: 'Ammoniak', hint: 'Börjar på A' },
            { id: 'B', name: 'Bensen', hint: 'Inte rätt' },
            { id: 'C', name: 'Klor', hint: 'Börjar på C' },
            { id: 'D', name: 'Diklor', hint: 'Inte rätt' },
            { id: 'E', name: 'Etanol', hint: 'Börjar på E' },
            { id: 'F', name: 'Formaldehyd', hint: 'Inte rätt' }
        ],
        correctCombination: ['A', 'C', 'E']
    },
    4: {
        title: 'Rum 4: Maskinrummet',
        description: 'En nedräkning har startat! Lös gåtan för att stoppa den. "Tre siffror efter sju, tre siffror före nio, fem siffror efter tre, nio siffror efter minus sex."',
        countdown: 60,
        correctCode: '7359'
    },
    5: {
        title: 'Rum 5: Utgången',
        description: 'Sista rummet! Använd allt du har lärt dig. Koden består av 5 siffror. Ledtråd 1: Tredje siffran från rum 1. Ledtråd 2: Första siffran från rum 2. Ledtråd 3: Antal kemikalier från rum 3. Ledtråd 4: Andra siffran från rum 4. Ledtråd 5: Antal rum totalt.',
        hints: [
            'Ledtråd 1: Tredje siffran från rum 1 (7)',
            'Ledtråd 2: Första siffran från rum 2 (1)',
            'Ledtråd 3: Antal kemikalier från rum 3 (5)',
            'Ledtråd 4: Andra siffran från rum 4 (3)',
            'Ledtråd 5: Antal rum totalt (4)'
        ],
        correctCode: [7, 1, 5, 3, 4]
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
    
    // Update header
    document.getElementById('room-title').textContent = room.title;
    document.getElementById('current-room').textContent = roomNumber;
    document.getElementById('room-description').innerHTML = `<p>${room.description}</p>`;
    
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
    
    codeDisplay.innerHTML = `<div class="status-message">Kod: ${code || '___'}</div>`;
}

function checkRoom1Complete() {
    if (gameState.rooms[1].openedBoxes.length === 3) {
        const code = gameState.rooms[1].openedBoxes.sort().map(id => {
            const box = roomData[1].boxes.find(b => b.id === id);
            return box.number;
        }).join('');
        
        if (code === roomData[1].correctCode) {
            gameState.rooms[1].solved = true;
            document.getElementById('puzzle-status').innerHTML = 
                '<div class="status-message">✓ Korrekt kod! Dörren är öppen!</div>';
            document.getElementById('next-room-btn').classList.remove('hidden');
        }
    }
}

// Room 2: Control Room - Button Sequence
function loadRoom2(container, room) {
    container.innerHTML = `
        <div class="sequence-hint">
            <p>Tryck på knapparna i rätt ordning för att aktivera strömmen.</p>
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
        document.getElementById('puzzle-status').innerHTML = 
            '<div class="status-message">✓ Strömmen är aktiverad!</div>';
        document.getElementById('next-room-btn').classList.remove('hidden');
    }
}

function updateSequenceDisplay() {
    const display = document.getElementById('sequence-display');
    const sequence = gameState.rooms[2].sequence;
    display.innerHTML = `<div class="status-message">Sekvens: ${sequence.join(' → ')}</div>`;
}

function resetRoom2() {
    gameState.rooms[2].sequence = [];
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'wrong');
    });
    document.getElementById('sequence-display').innerHTML = 
        '<div class="status-error">Fel ordning! Försök igen.</div>';
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
            <p>Valda kemikalier: <span id="selected-list">Inga valda</span></p>
        </div>
        <button class="mix-button btn-primary" id="mix-btn">Blanda Kemikalier</button>
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
        display.textContent = 'Inga valda';
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
        resultDiv.innerHTML = '<div class="status-error">Du måste välja exakt 3 kemikalier!</div>';
        return;
    }
    
    if (JSON.stringify(selected) === JSON.stringify(correct)) {
        gameState.rooms[3].solved = true;
        resultDiv.innerHTML = '<div class="status-message">✓ Rätt kombination! Skåpet öppnas!</div>';
        document.getElementById('next-room-btn').classList.remove('hidden');
    } else {
        resultDiv.innerHTML = '<div class="status-error">Fel kombination! Försök igen.</div>';
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
            <p><strong>Gåta:</strong> "Tre siffror efter sju, tre siffror före nio, fem siffror efter tre, nio siffror efter minus sex."</p>
        </div>
        <div class="countdown-container">
            <div class="countdown-timer" id="countdown">60</div>
            <p>Tid kvar innan systemet kraschar!</p>
        </div>
        <div class="code-input-container">
            <input type="text" class="code-input" id="code-input" placeholder="Kod" maxlength="4" pattern="[0-9]*">
            <button class="btn-primary" id="submit-code-btn" style="margin-top: 15px;">Skicka Kod</button>
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
                '<div class="status-error">Tiden är ute! Systemet kraschar... Försök igen!</div>';
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
        resultDiv.innerHTML = '<div class="status-message">✓ Korrekt kod! Nedräkningen stoppad!</div>';
        document.getElementById('next-room-btn').classList.remove('hidden');
    } else {
        resultDiv.innerHTML = '<div class="status-error">Fel kod! Försök igen.</div>';
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
                <p><strong>Använd allt du har lärt dig för att hitta koden!</strong></p>
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
                <input type="text" class="code-input" id="final-code-input" placeholder="Ange 5-siffrig kod" maxlength="5" pattern="[0-9]*">
                <button class="btn-primary" id="submit-final-code-btn" style="margin-top: 15px;">Skicka Kod</button>
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
        resultDiv.innerHTML = '<div class="status-message">✓ Korrekt! Du har flytt från komplexet!</div>';
        setTimeout(() => {
            showWinScreen();
        }, 1500);
    } else {
        resultDiv.innerHTML = '<div class="status-error">Fel kod! Tänk på ledtrådarna.</div>';
        
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
    showScreen('win-screen');
}

function restartGame() {
    // Reset game state
    gameState.currentRoom = 1;
    gameState.startTime = null;
    gameState.rooms = {
        1: { solved: false, openedBoxes: [] },
        2: { solved: false, sequence: [], correctSequence: [1, 3, 2, 4] },
        3: { solved: false, selectedChemicals: [], correctCombination: ['A', 'C', 'E'] },
        4: { solved: false, countdown: 60, code: '', correctCode: '7359' },
        5: { solved: false, foundDigits: [], correctCode: [7, 1, 5, 3, 4] }
    };
    
    showScreen('start-screen');
}
