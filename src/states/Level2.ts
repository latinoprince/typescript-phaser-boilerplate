module Namespace.State {
    export class Level2 extends Phaser.State {
        // setting variables
        bricks:Phaser.Group;
        paddle:Phaser.Sprite;
        starfield:Phaser.TileSprite;
        ball:Phaser.Sprite;

        // setting up default values
        ballOnPaddle:boolean = true;

        lives:number = 3;
        score:number = 0;

        // Text to display
        scoreText:Phaser.Text;
        livesText:Phaser.Text;
        introText:Phaser.Text;

        init() {
            let width = 800;
            let height = 600;

            this.ballOnPaddle = true;
            this.lives = 3;
            this.score = 0;

			//this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			this.scale.minWidth = width;
			this.scale.minHeight = height;
			this.scale.maxWidth = width;
			this.scale.maxHeight = height;

            // set up input max pointers
            this.input.maxPointers = 1;
            
            // set up stage disable visibility change.  False pauses the screen
            // when the window loses focus.  True will continue the game regardless
            this.stage.disableVisibilityChange = false;

            // Set up the scaling method used by the ScaleManager
            // Valid values for scaleMode are:
            // * EXACT_FIT
            // * NO_SCALE
            // * SHOW_ALL
            // * RESIZE
            // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

            // If you wish to align your game in the middle of the page then you can
            // set this value to true. It will place a re-calculated margin-left
            // pixel value onto the canvas element which is updated on orientation /
            // resizing events. It doesn't care about any other DOM element that may
            // be on the page, it literally just sets the margin.
            // this.scale.pageAlignHorizontally = true;
            // this.scale.pageAlignVertically = true;

            // Force the orientation in landscape or portrait.
            // * Set first to true to force landscape. 
            // * Set second to true to force portrait.
            //this.scale.forceOrientation(false, true);

            // Sets the callback that will be called when the window resize event
            // occurs, or if set the parent container changes dimensions. Use this 
            // to handle responsive game layout options. Note that the callback will
            // only be called if the ScaleManager.scaleMode is set to RESIZE.
            this.scale.setResizeCallback(this.gameResized, this);

            // Re-calculate scale mode and update screen size. This only applies if
            // ScaleMode is not set to RESIZE.
            this.scale.refresh();

        }
 
        preload() {
            // Here we load the assets required for our preloader
            // However, we loaded them in the Preload State

            // this.load.atlas('breakout', 'assets/images/level2/breakout.png', 'assets/images/level2/breakout.json');
            // this.load.image('starfield', 'assets/images/level2/starfield.jpg');
        }

        create() {
            this.game.world.setBounds(0, 0, 800, 600);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  We check bounds collisions against all walls other than the bottom one
            this.game.physics.arcade.checkCollision.down = false;

            this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');

            this.bricks = this.game.add.group();
            this.bricks.enableBody = true;
            this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

            var brick;

            for (var y = 0; y < 4; y++)
            {
                for (var x = 0; x < 15; x++)
                {
                    brick = this.bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
            }

            this.paddle = this.game.add.sprite(this.game.world.centerX, 500, 'breakout', 'paddle_big.png');
            this.paddle.anchor.setTo(0.5, 0.5);

            this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);

            this.paddle.body.collideWorldBounds = true;
            this.paddle.body.bounce.set(1);
            this.paddle.body.immovable = true;

            this.ball = this.game.add.sprite(this.game.world.centerX, this.paddle.y - 16, 'breakout', 'ball_1.png');
            this.ball.anchor.set(0.5);
            this.ball.checkWorldBounds = true;

            this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);

            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.set(1);

            this.ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

            this.ball.events.onOutOfBounds.add(this.ballLost, this);

            this.scoreText = this.game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.livesText = this.game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.introText = this.game.add.text(this.game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
            this.introText.anchor.setTo(0.5, 0.5);

            this.game.input.onDown.add(this.releaseBall, this);

        }

        update(){
            //  Fun, but a little sea-sick inducing :) Uncomment if you like!
            //this.starfield.tilePosition.x += (this.game.input.speed.x / 2);

            // if the screen loses focus, so does the world boundaries...
            // set it back if it is not set correctly...
            if(this.game.world.width > 800){
                this.game.world.setBounds(0, 0, 800, 600);
            }

            this.paddle.x = this.game.input.x;

            if (this.paddle.x < 24)
            {
                this.paddle.x = 24;
            }
            else if (this.paddle.x > this.game.world.width - 24)
            {
                this.paddle.x = this.game.world.width - 24;
            }

            if (this.ballOnPaddle)
            {
                this.ball.body.x = this.paddle.x;
            }
            else
            {
                this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
                this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
            }
            
        }
        
        releaseBall() {

            if (this.ballOnPaddle)
            {
                this.ballOnPaddle = false;
                this.ball.body.velocity.y = -300;
                this.ball.body.velocity.x = -75;
                this.ball.animations.play('spin');
                this.introText.visible = false;
            }

        }
        
        ballLost() {

            this.lives--;
            this.livesText.text = 'lives: ' + this.lives;

            if (this.lives === 0)
            {
                // wait for 1 second before calling the gameOver function
                this.game.time.events.add(1000, this.gameOver, this);
            }
            else
            {
                this.ballOnPaddle = true;

                this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);

                this.ball.animations.stop();
            }

        }

        gameOver() {

            this.ball.body.velocity.setTo(0, 0);

            this.introText.text = 'Game Over!';
            this.introText.visible = true;

            this.game.state.start('MainMenu', true, false, this.score);

        }

        gameResized(width, height) {

            // This could be handy if you need to do any extra processing if the 
            // game resizes. A resize could happen if for example swapping 
            // orientation on a device or resizing the browser window. Note that 
            // this callback is only really useful if you use a ScaleMode of RESIZE 
            // and place it inside your main game state.
        }
        
        ballHitBrick(_ball, _brick) {

            _brick.kill();

            this.score += 10;

            this.scoreText.text = 'score: ' + this.score;

            //  Are they any bricks left?
            if (this.bricks.countLiving() === 0)
            {
                //  New level starts
                this.score += 1000;
                this.scoreText.text = 'score: ' + this.score;
                this.introText.text = '- Next Level -';

                //  Let's move the ball back to the paddle
                this.ballOnPaddle = true;
                this.ball.body.velocity.set(0);
                this.ball.x = this.paddle.x + 16;
                this.ball.y = this.paddle.y - 16;
                this.ball.animations.stop();

                //  And bring the bricks back from the dead :)
                this.bricks.callAll('revive',null);
            }

        }

        ballHitPaddle(_ball, _paddle) {

            var diff = 0;

            if (_ball.x < _paddle.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = _paddle.x - _ball.x;
                _ball.body.velocity.x = (-10 * diff);
            }
            else if (_ball.x > _paddle.x)
            {
                //  Ball is on the right-hand side of the paddle
                diff = _ball.x -_paddle.x;
                _ball.body.velocity.x = (10 * diff);
            }
            else
            {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                _ball.body.velocity.x = 2 + Math.random() * 8;
            }

        }

    }
}