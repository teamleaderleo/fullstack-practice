## 🎯 **Interview Snake: Step-by-Step Process**

**If interviewer says: "Build Snake in 45 minutes"**

### **Step 1: Clarify & Plan (5 mins)**
```
Interviewer: "Build Snake"
You: "Let me clarify the requirements:
- Arrow key controls?
- Food spawning and score?
- Game over on wall/self collision?
- Any specific size or styling?"

Then outline: "I'll start with basic movement, add food, then collisions"
```

### **Step 2: HTML Scaffold (2 mins)**
```html
<canvas id="game" width="400" height="400"></canvas>
<div id="score">Score: 0</div>
```
**Why this first:** Get something visible immediately

### **Step 3: Basic Setup (5 mins)**
```javascript
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gridSize = 20;

let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
```
**Interviewer thinking:** "Good, they understand coordinates and data structures"

### **Step 4: Render Loop (8 mins)**
```javascript
function draw() {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw snake
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
}

function gameLoop() {
    draw();
    setTimeout(gameLoop, 200); // Call again
}

gameLoop(); // Start
```
**Goal:** See a green square on screen

### **Step 5: Movement (8 mins)**
```javascript
function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    snake.pop(); // Remove tail
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 200);
}

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') direction = {x: 0, y: -1};
    // ... other directions
});
```
**Goal:** Snake moves with arrow keys

### **Step 6: Food & Growth (10 mins)**
```javascript
let food = {x: 15, y: 15};
let score = 0;

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop(); // Only remove tail if no food eaten
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
}
```

### **Step 7: Collision Detection (7 mins)**
```javascript
function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        return true;
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}
```

## 🧠 **The Interviewer's Mental Process:**

**Minutes 0-10:** "Can they structure a problem and get something on screen?"  
**Minutes 10-25:** "Do they understand game loops and basic movement?"  
**Minutes 25-35:** "Can they handle game logic and state management?"  
**Minutes 35-45:** "How do they approach edge cases and debugging?"

## 💡 **Key Interview Insights:**

**The throughline is:**
1. **Visual first** (get something on screen)
2. **Movement** (basic interactivity) 
3. **Game mechanics** (rules and scoring)
4. **Edge cases** (collisions and game over)

**NOT:** "Let me plan the perfect architecture first"

**The skill being tested:** Can you break down a complex problem into manageable chunks and build incrementally?

That make sense? The process is more about **problem decomposition** than knowing every Canvas API method.