enchant();
TitleScreen = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        this.startbg = new Sprite(stgWidth, stgHeight);
        this.startbg.image = game.assets['assets/images/titleScreen.png'];
        this.addChild(this.startbg);
        
        this.playButton = new Sprite(100, 50);
        this.playButton.image = game.assets['assets/images/playButton.png'];
        this.playButton.x = this.startbg.width - this.playButton.width;
        this.playButton.y = this.playButton.height*2;
        this.addChild(this.playButton);
        
        this.creditsButton = new Sprite(100, 50);
        this.creditsButton.image = game.assets['assets/images/creditsButton.png'];
        this.creditsButton.x = this.startbg.width - this.creditsButton.width;
        this.creditsButton.y = this.startbg.height - this.creditsButton.height*2;
        this.addChild(this.creditsButton);
        
        this.titleMusic = new Audio('assets/sounds/titleMusic.mp3');
        this.titleMusic.autoplay = true;
        
        this.addEventListener('enter', function() {
            this.titleMusic.play();
        });
        
        this.addEventListener('exit', function() {
            
        });
        
        this.addEventListener('enterframe', function() {
            if (this.titleMusic.currentTime >= this.titleMusic.duration){
                this.titleMusic.play()
            }
        });
        
        this.creditsButton.addEventListener('touchstart', function(e) {
            game.replaceScene(creditsScreen);
        });
        
        this.playButton.addEventListener('touchstart', function(e) {
            game.currentScene.titleMusic.pause();
            game.replaceScene(introCutscene);
        });
    }
});