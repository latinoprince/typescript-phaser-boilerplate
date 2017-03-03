var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Namespace;
(function (Namespace) {
    var State;
    (function (State) {
        var Splash = (function (_super) {
            __extends(Splash, _super);
            function Splash() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Splash.prototype.loadScripts = function () {
                this.game.load.script('WebFont', 'vendor/webfontloader.js');
                this.game.load.script('gamemenu', 'states/gamemenu.js');
                this.game.load.script('thegame', 'states/thegame.js');
                this.game.load.script('gameover', 'states/gameover.js');
                this.game.load.script('credits', 'states/credits.js');
                this.game.load.script('options', 'states/options.js');
            };
            Splash.prototype.loadBgm = function () {
                this.game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
                this.game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
            };
            // varios freebies found from google image search
            Splash.prototype.loadImages = function () {
                this.game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
                this.game.load.image('options-bg', 'assets/images/options-bg.jpg');
                this.game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
            };
            Splash.prototype.loadFonts = function () {
                var WebFontConfig = {
                    custom: {
                        families: ['TheMinion'],
                        urls: ['assets/style/theminion.css']
                    }
                };
            };
            Splash.prototype.init = function () {
                this.loadingBar = this.game.make.sprite(this.game.world.centerX - (387 / 2), 400, "loading");
                this.logo = this.game.make.sprite(this.game.world.centerX, 200, 'brand');
                this.status = this.game.make.text(this.game.world.centerX, 380, 'Loading...', { fill: 'white' });
                this.logo.anchor.setTo(0.5);
                this.status.anchor.setTo(0.5);
            };
            Splash.prototype.preload = function () {
                this.game.add.sprite(0, 0, 'stars');
                this.game.add.existing(this.logo).scale.setTo(0.5);
                this.game.add.existing(this.loadingBar);
                this.game.add.existing(this.status);
                this.load.setPreloadSprite(this.loadingBar);
                this.loadScripts();
                this.loadImages();
                this.loadFonts();
                this.loadBgm();
            };
            Splash.prototype.addGameStates = function () {
                this.game.state.add("GameMenu", State.GameMenu);
                this.game.state.add("Game", State.Game);
                this.game.state.add("GameOver", State.GameOver);
                this.game.state.add("Credits", State.Credits);
                this.game.state.add("Options", State.Options);
            };
            Splash.prototype.addGameMusic = function () {
                this.music = this.game.add.audio('dangerous');
                this.music.loop = true;
                this.music.play();
            };
            Splash.prototype.create = function () {
                this.status.setText('Ready!');
                this.addGameStates();
                this.addGameMusic();
                setTimeout(function () {
                    //game.state.start("GameMenu");
                }, 5000);
            };
            return Splash;
        }(Phaser.State));
        State.Splash = Splash;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Splash.js.map