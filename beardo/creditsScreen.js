enchant();
CreditsScreen = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        
        creditsbg = new Sprite(stgWidth, stgHeight);
        creditsbg.image = game.assets['assets/images/credits.png'];
        this.addChild(creditsbg);
        
        this.addEventListener('touchstart', function(e) {
            game.replaceScene(titleScreen);
        });
        
        this.addEventListener('enterframe', function(e) {
            if (titleScreen.titleMusic.currentTime >= titleScreen.titleMusic.duration){
                titleScreen.titleMusic.play();
            }
            
        });
    }
});