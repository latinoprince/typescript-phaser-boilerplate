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
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.highestScore = 0;
                _this.optionCount = 0;
                return _this;
            }
            MainMenu.prototype.init = function (score) {
                //changing scaling options for the Main Menu
                this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                this.scale.minWidth = 240;
                this.scale.minHeight = 170;
                this.scale.maxWidth = 2880;
                this.scale.maxHeight = 1920;
                //have the game centered horizontally
                this.scale.pageAlignHorizontally = true;
                // local score to be the score passed or 0
                var myScore = score || 0;
                // the highest score is the max of the passed in or the current highest
                this.highestScore = Math.max(myScore, this.highestScore);
            };
            MainMenu.prototype.create = function () {
                // set the boundary for the Main Menu
                this.game.world.setBounds(0, 0, 1920, 600);
                //show the space tile, repeated
                this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
                //give it speed in x
                this.background.autoScroll(-20, 0);
                //highest score
                var highscoretext = "Highest score: " + this.highestScore;
                var style = { font: "bold 20px Arial", fill: "#fff", align: "center" };
                var h = this.game.add.text(window.innerWidth / 2, 120, highscoretext, style);
                h.anchor.set(0.5);
                var self = this;
                var title = "My Super Games";
                this.titleText = this.game.make.text(window.innerWidth / 2, 50, title, {
                    font: 'bold 60pt Arial',
                    fill: '#FDFFB5',
                    align: 'center'
                });
                this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                this.titleText.anchor.set(0.5);
                this.optionCount = 1;
                // uncomment if you want the game to continue playing 
                // even if the window loses focus.
                //this.game.stage.disableVisibilityChange = true;
                this.game.add.existing(this.titleText);
                this.addMenuOption('SpaceHipster', function () {
                    self.game.state.start('Level1', true);
                });
                this.addMenuOption('Breakout', function () {
                    self.game.state.start('Level2', true);
                });
                this.addMenuOption('SpaceShooter', function () {
                    self.game.state.start('Level3', true);
                });
                this.addMenuOption('Multiplayer Shooter', function () {
                    self.game.state.start('Level4', true);
                });
                this.addMenuOption('RPG', function () {
                    self.game.state.start('Level5', true);
                });
            };
            MainMenu.prototype.addMenuOption = function (text, callback) {
                var txt = this.game.add.text(window.innerWidth / 2, (this.optionCount * 80) + 100, text, Namespace.Utils.Style.navitem.default);
                txt.anchor.set(0.5);
                txt.inputEnabled = true;
                txt.events.onInputUp.add(callback);
                txt.events.onInputOver.add(function (target) {
                    target.setStyle(Namespace.Utils.Style.navitem.hover);
                });
                txt.events.onInputOut.add(function (target) {
                    target.setStyle(Namespace.Utils.Style.navitem.default);
                });
                this.optionCount++;
            };
            return MainMenu;
        }(Phaser.State));
        State.MainMenu = MainMenu;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=MainMenu.js.map