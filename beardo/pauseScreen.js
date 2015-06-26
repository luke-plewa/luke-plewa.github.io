enchant();
PauseScreen = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        
        pausebg = new Sprite(stgWidth, stgHeight);
        pausebg.image = game.assets['assets/images/pauseScreen.png'];
        this.addChild(pausebg);
        
        this.pauseMusic = new Audio('assets/sounds/pausemusic.mp3');
        
        this.addEventListener('touchstart', function(e) {
            game.replaceScene(level1);
            theGameIsPaused = false;
        });
        
        this.addEventListener('enter', function(){
            this.pauseMusic.play();
        });
        
        this.addEventListener('enterframe', function(){
            if (this.pauseMusic.currentTime >= this.pauseMusic.elapsedTime) {
                this.pauseMusic.play();
            }
        });
        
        this.addEventListener('exit', function(){
            this.pauseMusic.pause();
        });
    }
});