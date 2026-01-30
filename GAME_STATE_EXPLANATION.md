# Hur Spelstatusen Lagras och Uppdateras

## 📊 Översikt

Spelet använder ett **centralt state-objekt** (`gameState`) som lagrar all information om spelarens framsteg och aktioner. Detta är en vanlig teknik i JavaScript-spel som kallas för **"State Management"**.

---

## 🗂️ State-Struktur

### Huvudobjektet: `gameState`

```javascript
const gameState = {
    currentRoom: 1,              // Vilket rum spelaren befinner sig i
    startTime: null,              // När spelet startade (för timer)
    rooms: {                      // Status för varje rum
        1: { 
            solved: false,        // Är rummet löst?
            openedBoxes: []       // Vilka lådor som öppnats
        },
        2: { 
            solved: false,
            sequence: [],         // Vilken sekvens spelaren tryckt
            correctSequence: [1, 3, 2, 4]
        },
        3: { 
            solved: false,
            selectedChemicals: [], // Vilka kemikalier som valts
            correctCombination: ['A', 'C', 'E']
        },
        4: { 
            solved: false,
            countdown: 60,        // Tid kvar på timern
            code: '',             // Kod som spelaren skrivit
            correctCode: '7359'
        },
        5: { 
            solved: false,
            foundDigits: [],      // Siffror som hittats
            correctCode: [7, 1, 5, 3, 4]
        }
    }
};
```

---

## 🔄 Hur Information Uppdateras

### Exempel 1: Rum 1 - Öppna en låda

**När spelaren klickar på en låda:**

```javascript
function openBox(boxId, boxElement, room) {
    // 1. Hitta lådans data
    const boxData = room.boxes.find(b => b.id === boxId);
    
    // 2. UPPDATERA STATE - Lägg till boxId i arrayen
    gameState.rooms[1].openedBoxes.push(boxId);
    
    // 3. Uppdatera visuellt (DOM)
    boxElement.classList.add('opened');
    boxElement.innerHTML = `<div class="box-content">${boxData.number}</div>`;
    
    // 4. Uppdatera kod-display
    updateCodeDisplay();
    
    // 5. Kontrollera om rummet är klart
    checkRoom1Complete();
}
```

**State före:** `openedBoxes: []`  
**State efter:** `openedBoxes: [1]` (om låda 1 klickades)

---

### Exempel 2: Rum 2 - Tryck på knapp

**När spelaren trycker på en knapp:**

```javascript
function handleButtonClick(btnId, btnElement, room) {
    const sequence = gameState.rooms[2].sequence;
    
    // 1. UPPDATERA STATE - Lägg till knapp-ID i sekvensen
    sequence.push(btnId);
    
    // 2. Uppdatera visuellt
    btnElement.classList.add('active');
    
    // 3. Kontrollera om sekvensen är korrekt
    const correctSequence = room.correctSequence;
    const currentIndex = sequence.length - 1;
    
    if (sequence[currentIndex] !== correctSequence[currentIndex]) {
        // Fel - reset state
        setTimeout(() => {
            resetRoom2();  // Återställer sequence till []
        }, 1000);
    } else if (sequence.length === correctSequence.length) {
        // Korrekt - markera som löst
        gameState.rooms[2].solved = true;
    }
}
```

**State före:** `sequence: []`  
**State efter första klick:** `sequence: [1]`  
**State efter fel klick:** `sequence: []` (reset)  
**State när korrekt:** `sequence: [1, 3, 2, 4]` och `solved: true`

---

### Exempel 3: Rum 3 - Välj kemikalie

**När spelaren klickar på en kemikalie:**

```javascript
function toggleChemical(chemId, chemElement) {
    const selected = gameState.rooms[3].selectedChemicals;
    const index = selected.indexOf(chemId);
    
    if (index > -1) {
        // Ta bort om redan vald
        selected.splice(index, 1);
        chemElement.classList.remove('selected');
    } else {
        // Lägg till om inte vald
        if (selected.length < 3) {
            selected.push(chemId);
            chemElement.classList.add('selected');
        }
    }
    
    updateSelectedChemicals();
}
```

**State före:** `selectedChemicals: []`  
**State efter klick på A:** `selectedChemicals: ['A']`  
**State efter klick på C:** `selectedChemicals: ['A', 'C']`  
**State efter klick på E:** `selectedChemicals: ['A', 'C', 'E']`

---

### Exempel 4: Rum 4 - Skriv kod

**När spelaren skriver en kod:**

```javascript
function checkCode4(code, room) {
    if (code === room.correctCode) {
        // UPPDATERA STATE - Markera som löst
        gameState.rooms[4].solved = true;
        gameState.rooms[4].countdown = 0; // Stoppa timer
    } else {
        // Fel kod - state förblir oförändrad
    }
}
```

---

## 🎯 Varför Detta Sätt?

### Fördelar:

1. **Centraliserad Data:** All information på ett ställe
2. **Lätt att Felsöka:** Kan logga hela state-objektet
3. **Konsistent:** Samma struktur för alla rum
4. **Enkel Återställning:** Kan återställa hela spelet genom att reset state

### Exempel på Återställning:

```javascript
function restartGame() {
    // Återställ hela state-objektet
    gameState.currentRoom = 1;
    gameState.startTime = null;
    gameState.rooms = {
        1: { solved: false, openedBoxes: [] },
        2: { solved: false, sequence: [], correctSequence: [1, 3, 2, 4] },
        // ... etc
    };
}
```

---

## 🔍 Debugging - Se State i Konsolen

Du kan öppna Developer Tools (F12) och skriva:

```javascript
console.log(gameState);  // Se hela state-objektet
console.log(gameState.rooms[1].openedBoxes);  // Se öppnade lådor
console.log(gameState.currentRoom);  // Se aktuellt rum
```

---

## 📝 Sammanfattning

- **State lagras i minnet** (inte i databas eller localStorage)
- **Varje spelaraktion uppdaterar state** innan visuella ändringar
- **State kontrollerar spelets logik** (är rummet löst? kan vi gå vidare?)
- **State kan återställas** för att starta om spelet

**Viktigt:** Om användaren laddar om sidan försvinner all state (eftersom det bara finns i minnet). Om du vill spara framsteg skulle du behöva använda `localStorage` eller en server.
