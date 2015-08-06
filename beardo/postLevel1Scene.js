enchant();
PostLevel1Scene = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        
        postLevel1Scenebg = new Sprite(stgWidth, stgHeight);
        postLevel1Scenebg.image = game.assets['assets/images/postLevel1Scene.png'];
        this.addChild(postLevel1Scenebg);
        
        this.addEventListener('touchstart', function(e) {
            if(this.age > 60) game.replaceScene(level2);
            theGameIsPaused = false;
        });
        
        this.addEventListener('enter', function(){
        });
        
        this.addEventListener('exit', function(){
        });
    }
});