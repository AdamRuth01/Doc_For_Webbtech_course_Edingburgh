# Web Technologies Coursework Project

**Module:** SET08101/401/801 Web Technologies  
**Institution:** Edinburgh Napier University  
**Academic Year:** 2025-2026 Trimester 2  
**Module Leader:** Zakwan Jaroucheh

---

## 📋 Project Overview

This project is a statically hosted website built using core web technologies (HTML, CSS, and JavaScript) that demonstrates understanding of client-side web development. The site focuses on creating an engaging and fun user experience while showcasing mastery of fundamental web technologies.

### Project Theme: Escape Room Game
An interactive web-based escape room game where players must solve puzzles across 5 different rooms to escape from an abandoned complex. Each room presents unique challenges that require problem-solving skills and logical thinking.

---

## 🎯 Project Aims

The primary objectives of this project are to:

- Design and implement a fully functional, statically hosted website
- Demonstrate proficiency in HTML5, CSS3, and vanilla JavaScript
- Create an intuitive and visually appealing user interface
- Implement interactive features and user engagement elements
- Deploy the site using GitHub Pages
- Provide a well-documented codebase with clear structure

---

## ✨ Features & Functionality

### Core Features
- [x] **5 Unique Escape Rooms:** Each room has distinct puzzles and challenges
  - **Room 1 - The Cell:** Find the door code by opening numbered boxes
  - **Room 2 - Control Room:** Activate power by pressing buttons in correct sequence
  - **Room 3 - Laboratory:** Mix correct chemicals to unlock the cabinet
  - **Room 4 - Machine Room:** Solve a riddle to stop the countdown timer
  - **Room 5 - Exit:** Combine knowledge from all rooms to escape
- [x] **Progressive Difficulty:** Puzzles increase in complexity as players advance
- [x] **Timer System:** Countdown timer in Room 4 adds urgency and challenge
- [x] **Game State Management:** Tracks progress through all rooms

### Interactive Elements
- [x] **User Input Handling:** Code input fields with validation
- [x] **Dynamic Content Generation:** Rooms and puzzles generated dynamically via JavaScript
- [x] **Responsive Design:** Mobile-friendly layout that works on all screen sizes
- [x] **Click Interactions:** Interactive boxes, buttons, and chemical selection
- [x] **Visual Feedback:** Color-coded success/error states and animations
- [x] **Game Timer:** Tracks total escape time

### Additional Features
- [x] **Dark Theme Design:** Immersive escape room atmosphere
- [x] **Smooth Animations:** Fade-in transitions and hover effects
- [x] **Progress Tracking:** Visual indicators for room completion
- [x] **Win Screen:** Celebration screen with escape time display
- [x] **Web Audio API:** Programmatic sound effects for all game actions
- [x] **Dual Navigation:** Hash-based routing and separate HTML pages per room
- [x] **Persistent Storage:** localStorage for settings, scoreboard, and game progress
- [x] **Settings Page:** Customizable audio and graphics settings
- [x] **Scoreboard System:** Leaderboard with top 10 best times
- [x] **Quote API Integration:** Dynamic inspirational quotes from quotable.io
- [x] **Cross-Browser Compatibility:** Tested and optimized for Chrome, Firefox, Edge, Safari
- [x] **Comprehensive Testing Suite:** Audio, storage, and browser compatibility tests

---

## 🏗️ Design & Architecture

### Site Structure
```
project-root/
├── index.html              # Main entry point with hash navigation
├── room1.html              # Separate page for Room 1
├── room2.html              # Separate page for Room 2
├── room3.html              # Separate page for Room 3
├── room4.html              # Separate page for Room 4
├── room5.html              # Separate page for Room 5
├── settings.html           # Settings page
├── scoreboard.html         # Scoreboard/leaderboard page
├── css/
│   └── styles.css          # Complete styling with cross-browser support
├── js/
│   ├── main.js             # Game logic, room management, and puzzle mechanics
│   ├── audio.js            # Web Audio API manager
│   ├── storage.js          # localStorage utilities
│   ├── scoreboard.js       # Scoreboard management
│   ├── settings.js         # Settings management
│   └── quote-api.js        # Quote API integration
├── tests/
│   ├── audio-tests.html    # Web Audio API tests
│   ├── storage-tests.html  # localStorage tests
│   └── browser-tests.html # Cross-browser compatibility tests
└── README.md               # This file
```

### Game Architecture
- **Dual Navigation System:** 
  - Hash-based routing in `index.html` (e.g., `#room1`, `#room2`)
  - Separate HTML pages for each room with hyperlinks
- **State Management:** JavaScript object tracks game progress with localStorage persistence
- **Modular Room System:** Each room has its own load function and puzzle logic
- **Event-Driven:** User interactions trigger puzzle validation and room progression
- **Audio System:** Web Audio API for programmatic sound generation (no external files)
- **Data Persistence:** localStorage for settings, scores, and game progress
- **External API Integration:** Quote API for dynamic hints and messages

### Design Principles
- **User Experience:** Intuitive puzzle progression with clear visual feedback
- **Responsiveness:** Mobile-first approach ensuring compatibility across devices
- **Accessibility:** Semantic HTML structure and keyboard navigation support
- **Performance:** Lightweight vanilla JavaScript with no external dependencies
- **Visual Design:** 
  - Dark theme with gradient backgrounds (blues and dark tones)
  - Accent color: Red (#ff6b6b) for important elements
  - Success color: Green (#2ecc71) for completed puzzles
  - Error color: Red (#e74c3c) for incorrect attempts
  - Smooth animations and transitions for better user engagement

---

## 🛠️ Technologies Used

- **HTML5:** Semantic markup and structure
- **CSS3:** Styling, layout, animations, and responsive design (with vendor prefixes for cross-browser support)
- **JavaScript (ES6+):** Client-side interactivity and logic
- **Web Audio API:** Programmatic sound generation
- **localStorage API:** Client-side data persistence
- **Fetch API:** External API integration (quotable.io)
- **Git & GitHub:** Version control and deployment
- **GitHub Pages:** Static site hosting

*Note: This project uses vanilla JavaScript to demonstrate core skills. Frameworks like React.js are not used to ensure clear demonstration of fundamental JavaScript abilities.*

### External APIs
- **Quotable.io:** Free, secure quote API (https://api.quotable.io/random) - No API key required, HTTPS only

---

## 📝 Implementation Plan

### Phase 1: Planning & Design
- [x] Define project concept and scope (Escape Room Game)
- [x] Plan 5-room structure with unique puzzles
- [x] Design game flow and progression system
- [x] Identify puzzle mechanics for each room

### Phase 2: Core Development
- [x] Set up project structure (HTML, CSS, JS)
- [x] Implement HTML structure for game screens
- [x] Develop CSS styling with dark escape room theme
- [x] Build core JavaScript game logic and room system

### Phase 3: Enhancement & Integration
- [x] Add interactive puzzle features for all 5 rooms
- [x] Implement timer system for Room 4
- [x] Add visual feedback and animations
- [x] Optimize code structure and performance

### Phase 4: Enhancement & Advanced Features
- [x] Implement Web Audio API for sound effects
- [x] Add hash-based navigation system
- [x] Create separate HTML pages for each room
- [x] Implement localStorage for settings and scoreboard
- [x] Integrate Quote API for dynamic messages
- [x] Create settings and scoreboard pages
- [x] Build comprehensive test suite

### Phase 5: Testing & Deployment
- [x] Cross-browser testing (Chrome, Firefox, Edge, Safari)
- [x] Responsive design validation
- [x] Audio API testing
- [x] Storage functionality testing
- [x] Browser compatibility testing
- [ ] Code review and optimization
- [ ] Deploy to GitHub Pages
- [x] Final documentation

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome recommended for development)
- A text editor (e.g., VS Code, Notepad++, Sublime Text)
- Git installed on your system
- A GitHub account

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdamRuth01/Doc_For_Webbtech_course_Edingburgh.git
   cd Doc_For_Webbtech_course_Edingburgh
   ```

2. **Open the project:**
   - Open `index.html` in your web browser, or
   - Use a local development server (e.g., Live Server extension in VS Code)

3. **Development:**
   - Edit HTML files in the root directory
   - Modify styles in the `css/` directory
   - Update JavaScript in the `js/` directory

4. **Testing:**
   - Test in multiple browsers (Chrome, Firefox, Edge, Safari)
   - Use Chrome Developer Tools for debugging
   - Validate HTML and CSS using online validators

---

## 📦 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Select the source branch (usually `main` or `master`)
   - Choose the root directory
   - Save changes

2. **Access your site:**
   - Your site will be available at: **https://adamruth01.github.io/Doc_For_Webbtech_course_Edingburgh/**
   - Changes may take 1-2 minutes to propagate
   - The site updates automatically when you push changes to the `main` branch

3. **Update and deploy:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

---

## 🧪 Testing

### Test Suite
Comprehensive test files are available in the `tests/` directory:
- **audio-tests.html:** Tests Web Audio API support, sound generation, and volume control
- **storage-tests.html:** Tests localStorage functionality, data persistence, and storage limits
- **browser-tests.html:** Tests browser compatibility, feature detection, and known issues

### Browser Compatibility
- [x] Chrome (latest) - Fully tested
- [x] Firefox (latest) - Fully tested
- [x] Edge (latest) - Fully tested
- [x] Safari (latest) - Tested with vendor prefixes

### Responsive Design
- [x] Mobile devices (320px - 768px) - Tested
- [x] Tablets (768px - 1024px) - Tested
- [x] Desktop (1024px+) - Tested

### Functionality Testing
- [x] All interactive features work as expected
- [x] User input validation
- [x] Error handling with graceful degradation
- [x] Audio system with feature detection
- [x] Storage system with availability checks
- [x] Cross-browser compatibility
- [x] Hash navigation and direct room links
- [x] Settings persistence
- [x] Scoreboard functionality

---

## 📚 Resources & References

### Course Materials
- Unit 1-9 Activity Sets (Edinburgh Napier University)
- Assessment Specification Document

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [Chrome Developer Tools Documentation](https://developer.chrome.com/docs/devtools/)

### Background Reading
- Introducing Web Development
- Practical Web Design for Absolute Beginners
- Moving to Responsive Web Design
- Beginning Responsive Web Design with HTML 5 and CSS3
- Sustainable Web Ecosystem Design

---

## 📄 Project Status

**Current Status:** Implementation Complete - Ready for Testing

**Last Updated:** January 2025

**Game Status:**
- ✅ All 5 rooms implemented and functional
- ✅ All puzzle mechanics working
- ✅ Responsive design implemented
- ✅ Dark theme styling complete
- ✅ Web Audio API integrated with sound effects
- ✅ Dual navigation system (hash + separate pages)
- ✅ localStorage persistence for settings and scores
- ✅ Settings and scoreboard pages
- ✅ Quote API integration
- ✅ Comprehensive test suite
- ✅ Cross-browser compatibility verified
- ⏳ GitHub Pages deployment pending

---

## 👤 Author

**Student Name:** Adam Ruth  
**Student ID:** [Your Student ID]  
**Course:** SET08101/401/801 Web Technologies  
**Institution:** Edinburgh Napier University

---

## 📝 Notes

- This project is part of coursework for Edinburgh Napier University
- All code is original work using vanilla HTML, CSS, and JavaScript
- The site is hosted on GitHub Pages for static web hosting
- Game features 5 unique escape rooms with increasing difficulty
- No external libraries or frameworks used - pure web technologies
- Puzzles are designed to be challenging but solvable with logical thinking

---

## 🔒 Academic Integrity

This work is submitted in accordance with Edinburgh Napier University's Academic Integrity regulations. All code and content are original work, and no AI tools or commissioned material have been used in the development of this project.

---

**© 2025-2026 Edinburgh Napier University**
