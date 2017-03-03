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
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preload.prototype.preload = function () {
                //show loading screen
                this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
                this.splash.anchor.setTo(0.5);
                this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
                this.preloadBar.anchor.setTo(0.5);
                this.load.setPreloadSprite(this.preloadBar);
                //load game assets for MainMenu
                this.load.image('space', 'assets/images/space.png');
                //load game assets for level 1
                this.load.image('rock', 'assets/images/level1/rock.png');
                this.load.spritesheet('playership', 'assets/images/level1/player.png', 12, 12);
                this.load.spritesheet('power', 'assets/images/level1/power.png', 12, 12);
                this.load.image('playerParticle', 'assets/images/level1/player-particle.png');
                this.load.audio('collect', 'assets/audio/level1/collect.ogg');
                this.load.audio('explosion', 'assets/audio/level1/explosion.ogg');
                // load game assets for level 2
                this.load.atlas('breakout', 'assets/images/level2/breakout.png', 'assets/images/level2/breakout.json');
                this.load.image('starfield', 'assets/images/level2/starfield.jpg');
            };
            Preload.prototype.create = function () {
                this.game.state.start('MainMenu');
            };
            return Preload;
        }(Phaser.State));
        State.Preload = Preload;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Preload.js.map