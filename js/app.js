/**
* @description Represents an Enemy
* @constructor
* @param {number} row - the row position for enemy
* @param {integer} moveSpeed - the amount to increment x coordinate for enemy movement
*/
var Enemy = function(row, moveSpeed) {
    this.sprite = 'images/enemy-bug.png';
    //enemy should be drawn off screen initially
    this.x = -101;
    //set y coordinate to draw and offset to properly position image
    this.y = row * 83 - 23;
    this.moveSpeed = moveSpeed;

};

/**
* @description Update the x coordinate to draw enemy image
* @param dt {number} dt - time delta to make movement consistent
*/
Enemy.prototype.update = function(dt) {
    const x = this.x + this.moveSpeed * dt;
    //if movement pushes the enemy outside canvas then reset it
    x < 606 ? this.x = x : this.x = -101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Represents a Player
* @constructor
*/
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.row = 5;
        this.col = 2;
        this.x = 0;
        this.y = 0;
        this.yOffset = 23;
    }

    update(){
        this.x = this.col * 101;
        this.y = this.row * 83 - this.yOffset;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
const enemyI = new Enemy(1, 50);
const enemyII = new Enemy(3, 70);
const allEnemies = [enemyI, enemyII];
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
