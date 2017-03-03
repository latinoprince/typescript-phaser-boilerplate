
module Namespace.State {
    export class Level3 extends Phaser.State {
        // setting variables
		lastBullet:number
		lastEnemy:number
		lastTick:number
		speed:number
		bg1Speed:number
		bg2Speed:number
		bg3Speed:number
		enemySpeed:number
		bulletSpeed:number
		lives:number
		score:number

		bg:Phaser.TileSprite
		bg2:Phaser.TileSprite
		bg3:Phaser.TileSprite

		ship:Phaser.Sprite

		bullets:Phaser.Group
		enemies:Phaser.Group

		scoreText:Phaser.Text
		livesText:Phaser.Text

		WIDTH:number = 800;
		HEIGHT:number = 600;

		cursor:Phaser.CursorKeys
		spaceBar:Phaser.Key

		gameOver:boolean;

		init(){
			this.lastBullet = 0;
			this.lastEnemy = 0;
			this.lastTick = 0;
			this.speed = 100;
			this.bg1Speed = 30;
			this.bg2Speed =40;
			this.bg3Speed =50;
			this.enemySpeed = 200;
			this.bulletSpeed = 300;
			this.lives = 3;
			this.score = 0;

			let width = 800;
            let height = 600;

			//this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			this.scale.minWidth = width;
			this.scale.minHeight = height;
			this.scale.maxWidth = width;
			this.scale.maxHeight = height;

			this.gameOver = false;
		}

		preload(){
			this.game.load.image('bullet','assets/images/level3/bullet.png');
			this.game.load.image('bgSpace','assets/images/level3/farback.jpg');
			this.game.load.image('bgSpace2','assets/images/level3/starfield.png');
			this.game.load.spritesheet('ship','assets/images/level3/Spritesheet_64x29.png',64,29,4);
			this.game.load.spritesheet("enemyship1","assets/images/level3/eSpritesheet_40x30.png",40, 30, 6);
			this.game.load.spritesheet("enemyship2","assets/images/level3/eSpritesheet_40x30_hue1.png",40, 30, 6);
			this.game.load.spritesheet("enemyship3","assets/images/level3/eSpritesheet_40x30_hue2.png",40, 30, 6);
			this.game.load.spritesheet("enemyship4","assets/images/level3/eSpritesheet_40x30_hue3.png",40, 30, 6);
			this.game.load.spritesheet("enemyship5","assets/images/level3/eSpritesheet_40x30_hue4.png",40, 30, 6);
		}

		create(){
			this.game.world.setBounds(0, 0, 800, 600);
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.bg = this.game.add.tileSprite(0,0,800,600,'bgSpace');
			this.bg.autoScroll(-this.bg1Speed,0);

			this.bg2 = this.game.add.tileSprite(0,0,800,600,'bgSpace2');
			this.bg2.autoScroll(-this.bg2Speed,0);

			this.bg3 = this.game.add.tileSprite(0,0,800,600,'bgSpace2');
			this.bg3.autoScroll(-this.bg3Speed,0);

			this.ship = this.game.add.sprite(10,this.HEIGHT/2, 'ship');
			this.ship.animations.add('move');
			this.ship.animations.play('move', 20, true);
			this.game.physics.arcade.enable(this.ship);

			this.bullets = this.game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(10,'bullet');			
    		this.bullets.setAll('outOfBoundsKill', true);
    		this.bullets.setAll('checkWorldBounds', true);

			this.enemies = this.game.add.group();
			this.enemies.enableBody = true;
			this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

			var style = { font: "28px Arial", fill: "#DE5F3D", align: "left" };
			this.scoreText = this.game.add.text(0,0,"Score : "+this.score,style);
			this.livesText = this.game.add.text(0,28,"Lives : "+this.lives,style);

			this.cursor = this.input.keyboard.createCursorKeys();
			this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
                                   				Phaser.Keyboard.DOWN,
				   								Phaser.Keyboard.LEFT,
                                   				Phaser.Keyboard.RIGHT,
				   								Phaser.Keyboard.SPACEBAR]);
		}

		update(){
			this.ship.body.velocity.setTo(0,0);
			if(this.cursor.left.isDown && this.ship.x > 0)
			{
				this.ship.body.velocity.x = -2*this.speed;
			}
			else if(this.cursor.right.isDown && this.ship.x < (this.WIDTH-this.ship.width))
			{
				this.ship.body.velocity.x = this.speed;
			}
			else if(this.cursor.up.isDown && this.ship.y > 0)
			{
				this.ship.body.velocity.y = -this.speed;
			}
			else if(this.cursor.down.isDown && this.ship.y < (this.HEIGHT-this.ship.height))
			{
				this.ship.body.velocity.y = +this.speed;
			}

			var curTime = this.game.time.now;

			if(this.spaceBar.isDown)
			{
				if(curTime - this.lastBullet > 300)
				{
					this.fireBullet();
					this.lastBullet = curTime;
				}
			}

			if(curTime - this.lastEnemy > 500)
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastTick > 10000)
			{
				if(this.speed < 500)
				{
					this.speed *= 1.1;
					this.enemySpeed *= 1.1;
					this.bulletSpeed *= 1.1;
					this.bg.autoScroll(-this.bg1Speed, 0);
					this.bg2.autoScroll(-this.bg2Speed, 0);
					this.bg3.autoScroll(-this.bg3Speed, 0);
					this.lastTick = curTime;
				}
			}

			this.game.physics.arcade.collide(this.enemies, this.ship, this.enemyHitPlayer,null, this);
			this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet,null, this);
		}

		fireBullet(){
			var bullet = this.bullets.getFirstExists(false);
			if(bullet)
			{
				bullet.reset(this.ship.x+this.ship.width,this.ship.y+this.ship.height/2);
				bullet.body.velocity.x = this.bulletSpeed;
			}
		}

		/**
		 * Generates an enemy
		 */
		generateEnemy(){
			// if game is over, there is nothing to do
			if(this.gameOver)return;

			// get the first enemy that doesn't exist
			var enemy = this.enemies.getFirstExists(false);

			// if there is one, we need to reset its position
			if(enemy)
			{
				enemy.reset(this.WIDTH - 30,Math.floor(Math.random()*(this.HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			else
			{
				// create a new one since there is none...
				enemy = this.enemies.create(this.WIDTH - 30,Math.floor(Math.random()*(this.HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			enemy.body.velocity.x = -this.enemySpeed;
			enemy.outOfBoundsKill = true;
			enemy.checkWorldBounds = true;
			enemy.animations.add('move');
			enemy.animations.play('move',20,true);
		}

		/**
		 * This function is called whenever an enemy ship collides with the ship.
		 * It does the following:
		 *  - Removes the enemy from the list of enemies
		 *  - calls the kill method from the enemy so it is removed from the screen
		 *  - decreases the number of lives from the player
		 *  - checks if there is no more lives for the player and sets the gameover to true
		 *  - calls the kill method from the player's ship so it is removed from the screen
		 *  - calls the goToMainMenu after 1 sec. if there are no more lives for the player
		 */
		enemyHitPlayer(player, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
			this.lives -= 1;
			this.livesText.setText("Lives : "+this.lives);
			if(this.lives < 0){
				this.gameOver = true;
				player.kill();
				this.enemies.forEach(enemy=>{
					enemy.kill();
				},null);
				this.game.time.events.add(1000, this.goToMainMenu, this);
			}
		}

		/**
		 * This function changes the state to the MainMenu
		 */
		goToMainMenu() {
            this.game.state.start('MainMenu', true, false, this.score);
        }

		/**
		 * This method gets called whenever a bullet hits one of the enemy ships
		 * It does the following:
		 * 	- Remove the enemy from the list of enemies
		 *  - calls the kill method so the enemy is removed from the screen
		 *  - calls the kill method on the bullet so the bullet is removed from the screen
		 *  - increases the score and displays the new score in the screen
		 */
		enemyHitBullet(bullet, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
			bullet.kill();
			this.score += 10;
			this.scoreText.setText("Score : "+this.score);
		}
	}
}