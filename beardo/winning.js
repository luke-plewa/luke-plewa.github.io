enchant();
WinningScene = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        
        postLevel1Scenebg = new Sprite(stgWidth, stgHeight);
        postLevel1Scenebg.image = game.assets['assets/images/winScreen.png'];
        this.addChild(postLevel1Scenebg);
        
        this.addEventListener('touchstart', function(e) {
            if(this.age > 60) {
                titleScreen = new TitleScreen();
                pauseScreen = new PauseScreen();
                creditsScreen = new CreditsScreen();
                introCutscene = new IntroCutscene();
                level1 = new Level1Scene();
                health = HEALTH_MAX;
                game.replaceScene(titleScreen);
                theGameIsPaused = false;
            }
        });
        
        this.addEventListener('enter', function(){
        });
        
        this.addEventListener('exit', function(){
        });
    }
});