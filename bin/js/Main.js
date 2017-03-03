//https://github.com/cloakedninjas/phaser-typescript-boilerplate
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
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this, {
                //width: window.innerWidth,
                //height: window.innerHeight,
                width: 800,
                height: 600,
                renderer: Phaser.AUTO,
                forceSetTimeOut: false
            }) || this;
            _this.state.add('Boot', Namespace.State.Boot);
            _this.state.add('Preload', Namespace.State.Preload);
            _this.state.add('MainMenu', Namespace.State.MainMenu);
            _this.state.add('Level1', Namespace.State.Level1);
            _this.state.add('Level2', Namespace.State.Level2);
            _this.state.add('Level3', Namespace.State.Level3);
            _this.state.add('Level4', Namespace.State.Level4);
            _this.state.add('Level5', Namespace.State.Level5);
            //Start with the Boot State
            _this.state.start('Boot');
            return _this;
        }
        return Main;
    }(Phaser.Game));
    Namespace.Main = Main;
})(Namespace || (Namespace = {}));
// export Game to window
var Game = new Namespace.Main();
Phaser.Device.whenReady(function () {
    Game.plugins.add(PhaserInput.Plugin);
    Game.plugins.add(PhaserNineSlice.Plugin);
});
//# sourceMappingURL=Main.js.map