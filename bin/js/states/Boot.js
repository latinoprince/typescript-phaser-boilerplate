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
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.image('logo', 'assets/images/logo.png');
                this.load.image('preloadbar', 'assets/images/preloader-bar.png');
            };
            Boot.prototype.create = function () {
                // Background color to black
                this.game.stage.backgroundColor = '#fff';
                //scaling options for the whole games
                this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                this.scale.minWidth = 240;
                this.scale.minHeight = 170;
                this.scale.maxWidth = 2880;
                this.scale.maxHeight = 1920;
                //have the game centered horizontally
                this.scale.pageAlignHorizontally = true;
                //physics system for movement
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.state.start('Preload');
            };
            return Boot;
        }(Phaser.State));
        State.Boot = Boot;
    })(State = Namespace.State || (Namespace.State = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Boot.js.map