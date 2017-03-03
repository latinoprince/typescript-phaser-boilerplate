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
        var Level1 = (function (_super) {
            __extends(Level1, _super);
            function Level1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Level1.prototype.create = function () {
                //set world dimensions
                this.game.world.setBounds(0, 0, 1920, 1920);
                //background
                this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
                //create player
                this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
                this.player.scale.setTo(2);
                this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
                this.player.animations.play('fly');
                //player initial score of zero
                this.playerScore = 0;
                //enable player physics
                this.game.physics.arcade.enable(this.player);
                this.playerSpeed = 120;
                this.player.body.collideWorldBounds = true;
                //the camera will follow the player in the world
                this.game.camera.follow(this.player);
                //generate game elements
                this.generateCollectables();
                this.generateAsteriods();
                //show score
                this.showLabels();
                //sounds
                this.explosionSound = this.game.add.audio('explosion');
                console.log(this.explosionSound);
                this.collectSound = this.game.add.audio('collect');
            };
            Level1.prototype.update = function () {
                if (this.game.input.activePointer.justPressed()) {
                    //move on the direction of the input
                    this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
                }
                //collision between player and asteroids
                this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
                //overlapping between player and collectables
                this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
            };
            Level1.prototype.generateCollectables = function () {
                this.collectables = this.game.add.group();
                //enable physics in them
                this.collectables.enableBody = true;
                this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
                //phaser's random number generator
                var numCollectables = this.game.rnd.integerInRange(100, 150);
                var collectable;
                for (var i = 0; i < numCollectables; i++) {
                    //add sprite
                    collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
                    collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
                    collectable.animations.play('fly');
                }
            };
            Level1.prototype.generateAsteriods = function () {
                this.asteroids = this.game.add.group();
                //enable physics in them
                this.asteroids.enableBody = true;
                //phaser's random number generator
                var numAsteroids = this.game.rnd.integerInRange(100, 300);
                var asteriod;
                for (var i = 0; i < numAsteroids; i++) {
                    //add sprite
                    asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
                    asteriod.scale.setTo(this.game.rnd.integerInRange(10, 30) / 10);
                    //physics properties
                    asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
                    asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
                    asteriod.body.immovable = false;
                    asteriod.body.collideWorldBounds = true;
                }
            };
            Level1.prototype.hitAsteroid = function (player, asteroid) {
                //play explosion sound
                this.explosionSound.play();
                //make the player explode
                var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
                emitter.makeParticles('playerParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 1000, null, 100);
                this.player.kill();
                this.game.time.events.add(1000, this.gameOver, this);
            };
            Level1.prototype.gameOver = function () {
                //pass it the score as a parameter
                this.game.state.start('MainMenu', true, false, this.playerScore);
            };
            Level1.prototype.collect = function (player, collectable) {
                //play collect sound
                this.collectSound.play();
                //update score
                this.playerScore++;
                this.scoreLabel.text = this.playerScore + '';
                //remove sprite
                collectable.destroy();
            };
            Level1.prototype.showLabels = function () {
                //score text
                var text = "0";
                var style = { font: "20px Arial", fill: "#fff", align: "center" };
                this.scoreLabel = this.game.add.text(this.game.width - 50, this.game.height - 50, text, style);
                this.scoreLabel.fixedToCamera = true;
            };
            return Level1;
        }(Phaser.State));
        State.Level1 = Level1;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Level1.js.map