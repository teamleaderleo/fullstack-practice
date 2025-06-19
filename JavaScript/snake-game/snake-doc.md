# Snake Game - Interview Study Guide

## **Interview Context**
**Time to build:** 30-45 minutes  
**Difficulty:** Beginner-Intermediate  
**Key concepts:** Game loops, 2D arrays, collision detection, event handling

## **How to Run**
just click the .html

## **Core Concepts we wanna demo**

### 1. **Game Loop Pattern**
```javascript
function main() {
    if (hasGameEnded()) return;
    
    setTimeout(function onTick() {
        // Update game state
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        main(); // Recursive call
    }, 100);
}
```
**Why this matters:** Shows understanding of animation, timing, and recursive patterns.

### 2. **Data Structure Choice**
```javascript
let snake = [{x: 10, y: 10}]; // Array of coordinate objects
```
**Interview talking points:**
- Why array over linked list? (Simpler, good enough for this scale)
- Snake grows/shrinks like a queue (add head, remove tail)
- Alternative: Could use a circular buffer for optimization

### 3. **Collision Detection**
```javascript
// Wall collision - boundary checking
const hitLeftWall = snake[0].x < 0;
const hitRightWall = snake[0].x >= tileCount;

// Self collision - nested loop
for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
    }
}
```
**Complexity:** O(n) for self-collision check  
**Optimization ideas:** Use Set for O(1) lookup, spatial partitioning

### 4. **Event Handling & State Management**
```javascript
if (e.key === 'ArrowLeft' && dx !== 1) { // Prevent reversal
    dx = -1; dy = 0;
}
```
**Key insight:** Direction validation prevents impossible moves

### 5. **Canvas API Basics**
```javascript
ctx.fillStyle = 'green';
ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
```
**Shows:** Understanding of coordinate systems, rendering loops

## 🎤 **Common Interview Questions**

### "How would you optimize this for performance?"
- **Use requestAnimationFrame** instead of setTimeout for smoother animation
- **Spatial partitioning** for collision detection in larger games
- **Object pooling** to avoid garbage collection
- **Dirty rectangle rendering** to only redraw changed areas

### "How would you add multiplayer?"
- **Separate game state** from rendering
- **Event-driven architecture** for player actions
- **State synchronization** between clients
- **Conflict resolution** for simultaneous moves

### "What if the grid was much larger?"
- **Viewport/camera system** to show only visible area
- **Chunk-based loading** for infinite worlds
- **Quadtree or spatial hash** for efficient collision detection

### "How would you make it responsive?"
- **Dynamic canvas sizing** based on screen size
- **Touch controls** for mobile
- **CSS media queries** for different layouts

## 🔧 **Extension Ideas**

**Easy additions (5-10 mins):**
- Speed increases as snake grows
- Different colored food with different points
- Simple sound effects

**Medium additions (15-30 mins):**
- Power-ups (temporary invincibility, slow motion)
- Obstacles/walls on the game field
- Multiple difficulty levels

**Advanced features (30+ mins):**
- AI opponent snake
- Level progression with different maps
- Particle effects and animations

## **Common Bugs & Solutions**

**Snake moves too fast:** Adjust setTimeout delay  
**Snake reverses into itself:** Add direction validation  
**Food spawns on snake:** Check all snake segments when generating food  
**Game doesn't restart properly:** Reset all state variables

## **Related Concepts**

- **Game development patterns:** Game loop, state machines, entity-component systems
- **Algorithms:** Pathfinding (A*), collision detection, spatial partitioning
- **Data structures:** Queues, 2D arrays, graphs for game maps
- **Performance:** Animation optimization, memory management, rendering techniques

---

## **Interview Tips**

1. **Start simple** - Get basic movement working first
2. **Explain your thinking** - Talk through data structure choices
3. **Plan for extensions** - Mention how you'd add features
4. **Consider edge cases** - What happens at boundaries?
5. **Discuss trade-offs** - Simple vs. optimized solutions