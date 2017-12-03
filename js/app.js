/**
* @description Represents an Entity in game
* @constructor
* @param {string} sprite - the image to be drawn for this entity
* @param {number} x - the x coordinate where the sprite is to be drawn
* @param {number} y - the y coordiante where the sprite is to be drawn
* @param {number} yOffset - amount to offset y coordinate so that entity is positioned properly
*/
class Entity {
    constructor(sprite, x, y, yOffset) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.yOffset = yOffset;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
* @description Represents an Enemy
* @constructor
* @param {number} row - the row position for enemy
* @param {integer} moveSpeed - the amount to increment x coordinate for enemy movement
*/
class Enemy extends Entity {
    constructor(row, moveSpeed, x = -101, yOffset = 23, sprite = 'images/enemy-bug.png'){
        const y = row * 83 - yOffset;
        super(sprite, x, y, yOffset);
        this.moveSpeed = moveSpeed;
    }

    update(dt){
        const x = this.x + this.moveSpeed * dt;
        //if movement pushes the enemy outside canvas then reset it
        x < 606 ? this.x = x : this.x = -101;
        //identify enemy and player collision
        //offset position for size of player and movement
        const playerLeft = player.x + 30;
        const playerRight = playerLeft + 101 - 50;
        //get position of enemy
        const enemyLeft = this.x;
        const enemyRight = enemyLeft + 101;
        //if enemy and player are on the same y position and the enemy is intersecting the player
        if(enemyRight >= playerLeft && enemyLeft <= playerRight && this.y === player.y) {player.reset();}
    }
}

/**
* @description Represents a Player
* @constructor
*/
class Player extends Entity {
    constructor(row = 5, col = 2, yOffset = 23, sprite = 'images/char-boy.png', x = 0, y = 0){
        super(sprite, x, y, yOffset);
        this.row = row;
        this.col = col;
    }

    update(){
        this.x = this.col * 101;
        this.y = this.row * 83 - this.yOffset;
    }

    handleInput(keyCode){
        //based on key pressed; increment or decrement column/row; do nothing if move is outside canvas
        switch(keyCode){
            case 'left':
                if(this.col > 0) {this.col -= 1;}
                break;
            case 'up':
                //if the player makes it to the top then reset position to begining
                this.row > 1 ? this.row -= 1 : this.reset();
                break;
            case 'right':
                if(this.col < 4) {this.col += 1;}
                break;
            case 'down':
                if(this.row < 5) {this.row += 1;}
                break;
            default:
        }
    }

    reset(){
        this.row = 5;
        this.col = 2;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const enemies = [
    [1, 50],
    [1, 200],
    [2, 300],
    [2, 500],
    [3, 300],
    [3, 255]
];
for (const enemy of enemies) {
    allEnemies.push(new Enemy(enemy[0],enemy[1]));
}
console.log(allEnemies);
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
* @description On character selection update the character image and render on screen
*/
function playerSelected(){
    player.sprite = 'images/' + $(this).val();
    player.render();
    //stop arrow keys from changing the radio selection
    $(this).blur();
}

$(function(){
    $('.char-sel').click(playerSelected);
});