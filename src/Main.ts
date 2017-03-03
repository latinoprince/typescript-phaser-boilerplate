//https://github.com/cloakedninjas/phaser-typescript-boilerplate

module Namespace {
    export class Main extends Phaser.Game {

        constructor() {
            super({
                //width: window.innerWidth,
                //height: window.innerHeight,
                width: 800,
                height: 600,
                renderer: Phaser.AUTO,
                forceSetTimeOut: false
            });

            this.state.add('Boot', State.Boot);
            this.state.add('Preload', State.Preload);
            this.state.add('MainMenu', State.MainMenu);
            this.state.add('Level1', State.Level1);
            this.state.add('Level2', State.Level2);
            this.state.add('Level3', State.Level3);
            this.state.add('Level4', State.Level4);
            this.state.add('Level5', State.Level5);

            //Start with the Boot State
            this.state.start('Boot');
        }

    }
}

// export Game to window
var Game = new Namespace.Main();

Phaser.Device.whenReady(function () {
    Game.plugins.add(PhaserInput.Plugin);
    Game.plugins.add(PhaserNineSlice.Plugin);
});