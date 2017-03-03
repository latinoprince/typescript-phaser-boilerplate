var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Namespace;
(function (Namespace) {
    var State;
    (function (State) {
        var Level4 = (function (_super) {
            __extends(Level4, _super);
            function Level4() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.WIDTH = 800;
                _this.HEIGHT = 600;
                return _this;
                /**
                 * This method gets called whenever a bullet hits one of the enemy ships
                 * It does the following:
                 * 	- Remove the enemy from the list of enemies
                 *  - calls the kill method so the enemy is removed from the screen
                 *  - calls the kill method on the bullet so the bullet is removed from the screen
                 *  - increases the score and displays the new score in the screen
                 */
                // enemyHitBullet(bullet, enemy){
                // 	if(this.enemies.getIndex(enemy) > -1)
                // 		this.enemies.remove(enemy);
                // 	enemy.kill();
                // 	bullet.kill();
                // 	this.score += 10;
                // 	this.scoreText.setText("Score : "+this.score);
                // }
            }
            Level4.prototype.init = function () {
                this.lastBullet = 0;
                this.lastEnemy = 0;
                this.lastTick = 0;
                this.speed = 100;
                this.bg1Speed = 30;
                this.bg2Speed = 40;
                this.bg3Speed = 50;
                this.bulletSpeed = 300;
                this.lives = 3;
                this.score = 0;
                var width = 800;
                var height = 600;
                //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                this.scale.minWidth = width;
                this.scale.minHeight = height;
                this.scale.maxWidth = width;
                this.scale.maxHeight = height;
                this.gameOver = false;
            };
            Level4.prototype.preload = function () {
                //http://nightlycoding.com/index.php/2015/01/phaser-io-how-to-use-atlashash-to-your-advantage/
                this.game.load.atlasJSONHash('ship', 'assets/images/level4/ships.png', 'assets/images/level4/ships.json');
                this.game.load.image('bullet', 'assets/images/level3/bullet.png');
                this.game.load.image('bgSpace', 'assets/images/level3/farback.jpg');
                this.game.load.image('bgSpace2', 'assets/images/level3/starfield.png');
                //this.game.load.spritesheet('ship','assets/images/level3/Spritesheet_64x29.png',64,29,4);
                this.game.load.spritesheet("enemyship1", "assets/images/level3/eSpritesheet_40x30.png", 40, 30, 6);
                this.game.load.spritesheet("enemyship2", "assets/images/level3/eSpritesheet_40x30_hue1.png", 40, 30, 6);
                this.game.load.spritesheet("enemyship3", "assets/images/level3/eSpritesheet_40x30_hue2.png", 40, 30, 6);
                this.game.load.spritesheet("enemyship4", "assets/images/level3/eSpritesheet_40x30_hue3.png", 40, 30, 6);
                this.game.load.spritesheet("enemyship5", "assets/images/level3/eSpritesheet_40x30_hue4.png", 40, 30, 6);
                var rndGenerator = new Phaser.RandomDataGenerator();
                var peerId = 'player-' + rndGenerator.between(1, 100);
                this.peer = new Peer(peerId, { host: 'localhost', port: 9001, path: '/peerjs' });
                var self = this;
                this.peer.on('open', function (id) {
                    self.myPeerId = id;
                    //alert("id: " + id);
                });
            };
            Level4.prototype.create = function () {
                this.game.world.setBounds(0, 0, 800, 600);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'bgSpace');
                //this.bg.autoScroll(0,this.bg1Speed);
                this.bg2 = this.game.add.tileSprite(0, 0, 800, 600, 'bgSpace2');
                this.bg2.autoScroll(0, this.bg2Speed);
                this.bg3 = this.game.add.tileSprite(0, 0, 800, 600, 'bgSpace2');
                this.bg3.autoScroll(0, this.bg3Speed);
                this.localShip = this.game.add.sprite(this.WIDTH / 2, this.HEIGHT - 20, 'ship', 'ship-blue');
                this.localShip.scale.set(0.25, 0.25);
                this.localShip.anchor.set(0.5, 0.5);
                //this.localShip.animations.add('move');
                //this.localShip.animations.play('move', 20, true);
                this.game.physics.arcade.enable(this.localShip);
                this.bullets = this.game.add.group();
                this.bullets.enableBody = true;
                this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
                this.bullets.createMultiple(10, 'bullet');
                this.bullets.setAll('outOfBoundsKill', true);
                this.bullets.setAll('checkWorldBounds', true);
                // this.enemies = this.game.add.group();
                // this.enemies.enableBody = true;
                // this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
                var style = { font: "28px Arial", fill: "#DE5F3D", align: "left" };
                this.scoreText = this.game.add.text(0, 0, "Score : " + this.score, style);
                this.livesText = this.game.add.text(0, 28, "Lives : " + this.lives, style);
                this.peerIdText = this.game.add.text(0, 56, "Peer ID : " + this.myPeerId, style);
                var input = this.game.add.inputField(10, 90, {
                    font: '18px Arial',
                    fill: '#212121',
                    fillAlpha: 0.5,
                    fontWeight: 'bold',
                    width: 150,
                    max: '20',
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: 'Username',
                    textAlign: 'center',
                    zoom: true
                });
                input.setText('prefilled name');
                input.blockInput = false;
                this.cursor = this.input.keyboard.createCursorKeys();
                this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
                    Phaser.Keyboard.DOWN,
                    Phaser.Keyboard.LEFT,
                    Phaser.Keyboard.RIGHT,
                    Phaser.Keyboard.SPACEBAR]);
            };
            Level4.prototype.update = function () {
                this.localShip.body.velocity.setTo(0, 0);
                if (this.cursor.left.isDown && this.localShip.x > (this.localShip.width / 2)) {
                    this.localShip.body.velocity.x = -this.speed;
                }
                else if (this.cursor.right.isDown && this.localShip.x < (this.WIDTH - (this.localShip.width / 2))) {
                    this.localShip.body.velocity.x = this.speed;
                }
                else if (this.cursor.up.isDown && this.localShip.y > (this.localShip.height / 2)) {
                    this.localShip.body.velocity.y = -this.speed;
                }
                else if (this.cursor.down.isDown && this.localShip.y < (this.HEIGHT - (this.localShip.height / 2))) {
                    this.localShip.body.velocity.y = +this.speed;
                }
                var curTime = this.game.time.now;
                if (this.spaceBar.isDown) {
                    if (curTime - this.lastBullet > 300) {
                        this.fireBullet();
                        this.lastBullet = curTime;
                    }
                }
                if (curTime - this.lastEnemy > 500) {
                    //this.generateEnemy();
                    this.lastEnemy = curTime;
                }
                if (curTime - this.lastTick > 10000) {
                    if (this.speed < 500) {
                        this.speed *= 1.1;
                        //this.enemySpeed *= 1.1;
                        this.bulletSpeed *= 1.1;
                        //this.bg.autoScroll(0,this.bg1Speed);
                        this.bg2.autoScroll(0, this.bg2Speed);
                        this.bg3.autoScroll(0, this.bg3Speed);
                        this.lastTick = curTime;
                    }
                }
                // this.game.physics.arcade.collide(this.enemies, this.ship, this.enemyHitPlayer,null, this);
                // this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet,null, this);
            };
            Level4.prototype.fireBullet = function () {
                var bullet = this.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.localShip.x - 5, this.localShip.y - (this.localShip.height / 2));
                    bullet.body.velocity.y = -this.bulletSpeed;
                }
            };
            /**
             * Generates an enemy
             */
            // generateEnemy(){
            // 	// if game is over, there is nothing to do
            // 	if(this.gameOver)return;
            // 	// get the first enemy that doesn't exist
            // 	var enemy = this.enemies.getFirstExists(false);
            // 	// if there is one, we need to reset its position
            // 	if(enemy)
            // 	{
            // 		enemy.reset(this.WIDTH - 30,Math.floor(Math.random()*(this.HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
            // 	}
            // 	else
            // 	{
            // 		// create a new one since there is none...
            // 		enemy = this.enemies.create(this.WIDTH - 30,Math.floor(Math.random()*(this.HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
            // 	}
            // 	enemy.body.velocity.x = -this.enemySpeed;
            // 	enemy.outOfBoundsKill = true;
            // 	enemy.checkWorldBounds = true;
            // 	enemy.animations.add('move');
            // 	enemy.animations.play('move',20,true);
            // }
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
            // enemyHitPlayer(player, enemy){
            // 	if(this.enemies.getIndex(enemy) > -1)
            // 		this.enemies.remove(enemy);
            // 	enemy.kill();
            // 	this.lives -= 1;
            // 	this.livesText.setText("Lives : "+this.lives);
            // 	if(this.lives < 0){
            // 		this.gameOver = true;
            // 		player.kill();
            // 		this.enemies.forEach(enemy=>{
            // 			enemy.kill();
            // 		},null);
            // 		this.game.time.events.add(1000, this.goToMainMenu, this);
            // 	}
            // }
            /**
             * This function changes the state to the MainMenu
             */
            Level4.prototype.goToMainMenu = function () {
                this.game.state.start('MainMenu', true, false, this.score);
            };
            return Level4;
        }(Phaser.State));
        State.Level4 = Level4;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Level4.js.map