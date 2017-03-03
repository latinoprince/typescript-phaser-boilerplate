module Namespace.State {
    export class Boot extends Phaser.State {
		preload(){			
			this.load.image('logo', 'assets/images/logo.png');
			this.load.image('preloadbar', 'assets/images/preloader-bar.png');
		}

        create() {
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
        }
    }
}
