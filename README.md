#Classic Arcade Game
===============================
A classic arcade game where player tries to cross the road while avoiding enemies that move across the screen.


## Background

This game was developed to complete a project for the Udacity Front-End Web Developer Nanodegree.

## Dependencies

- jQuery

- engine.js
   Game loop functionaltiy that draws the inital game board and handles updating and rendering of all game entities.
   To add new entities to the game you should first add them to resources so they are cached.
   If the entities added are of a new class they also need to be incorporated within `updateEntities()` and `renderEntities()` functions.
```Javascript
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-cat-girl.png',
        'images/star.png'
    ]);
```

- resources.js
   Utility to load images.

- app.js
   Stores classes and handles creation of entities that display and move on game board.
   Handles game logic and stats.

- images
   Image files that will be drawn on the canvas stored in this folder.

## Functionality

### Game Logic
- A game board is rendered on screen with a player, enemies and star entities placed across the board.
- Enemies cross the screen at varying speeds.
- The player can be moved in any direction but will not be allowed to move off screen.
- As the player moves across the board:
   If the player collides with an enemy the counter for collisions will be incremented and player will be moved back to starting position and any hidden stars will be shown.
   If the player collides with a star the counter for stars will be incremented and the star will be hidden.
   If the player reaches the top the counter for wins will be incremented, the player will be moved back to starting position and any hidden stars will be shown.

### Game Stats
- The game employs counters to track wins, collisions and stars collected.
- See `winCount`, `collisionCount` and `starCount` variables that handle storage, update and display of counts.
- These counts will continue to increment unless the user clicks the Reset Game button which will reset stats.

### Customizations
- The enemy position and speeds can be changed in app.js. Array position 0 identifies the row position that will later be translated to a y coordinate to start drawing on canvas and position 1 represents the speed at which the enemy moves.
```Javascript
	// array of arrays to store initial configuration of enemies [0] is the row position [1] is the move speed
	// update this array to change row position and move speed of enemies
	const enemies = [
	    [1, 80],
	    [1, 400],
	    [2, 300],
	    [2, 175],
	    [3, 100],
	    [3, 255]
	];
```
- The enemy class has an update method that handles their movement and handles collisions with player.
- Star entities are placed on the screen and their position can be changed in app.js. Array position 0 identifies the row and position 1 identifies the column positions that will later be translated to x/y coordinates to start drawing on canvas.
```Javascript
	const stars = [
	    [1,2],
	    [2,0],
	    [3,4]
	];
```
- The star class has an update method that handles updates when player collides with it and a reset method that places it back on the board when necessary.
- The player class has methods to handle movement of the player entity and handle game outcomes such as collisions and successfully crossing the blocks.
