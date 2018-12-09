

// Enemies our player must avoid


class Enemy {
    
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x,y,speed) 
    {
        // set position for enemy
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 50;
        this.height = 50;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) 
    {
        this.x = this.x + (this.speed * dt);
        if(this.x > 500){
            this.x = -100;
        }
        this.handleCollision();
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
      
    }

    
    // Draw the enemy on the screen, required method for game
    render() 
    {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    
    //handle collision with the player
    handleCollision() 
    {
	    {
	        if (this.x < player.x + player.width &&
	           this.x + this.width > player.x &&
	           this.y < player.y + player.height &&
               this.height + this.y > player.y) 
            {
	            // collision detected!
	            player.reset();
	            player.noOfCrosses--;
	        }
	    }
	}
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player 
{
    constructor() 
    {
        //set initial position of player
        this.x = 0;
        this.y = 300;
        this.width = 50;
        this.height = 50;
        this.noOfCrosses = 0;

        //the image/sprite for our player
        this.sprite = 'images/char-princess-girl.png';
    }

    
    //Update the player's position
    update(dt) 
    {
        document.body.querySelector('.showCrosses').textContent = `Number of Crosses : ${this.noOfCrosses}.`;
    }

    //Draw the player on the screen
    render() 
    {
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    }

    //Handle the input provided by the user .. Its a function to handle the movement by the user in the game 
    handleInput(inputKey) 
    {
        switch(inputKey) 
        {
            case 'left' : 
            {
                this.x -= 100;
                if(this.x < 0)
                {
                    this.x = 0;
                }
                break;
            };
            case 'right' : 
            {
                this.x += 100;
                if(this.x > 400) 
                {
                    this.x = 400;
                }
                break;
            };
            case 'up' : 
            {
                this.y -= 85;
                if(this.y < -40) 
                {
                    this.y = -40;
                }
                if(this.y === -40) 
                {
                    this.noOfCrosses++; 
                    setTimeout(() =>
                        this.reset(),300);
                    if(this.noOfCrosses === 8) 
                    {
            			win();
        			}
                }  
                break;
            };
            case 'down' : 
            {
                this.y += 85;
                if(this.y>385) 
                {
                    this.y = 385;
                } 
                break;
            }
        }
    }

    //reset the move of player to initial position
    reset() 
    {
        this.x = 0;
        this.y = 300;
    }    
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let e1 = new Enemy(-300,60,400);
let e2 = new Enemy(-50,145,200);
let e3 = new Enemy(-100,230,550);
let enemCollection = [e1,e2,e3];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) 
{
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Function to basically handle the modal when the player has won the game... It will display "You Win"
function win() 
{
    swal({
    	icon: "success",
    	title: "You Win !!",
    }).then(() => 
    {
    	player.noOfCrosses = 0;
    });
}

