enchant();
DeathScene = Class.create(Scene, {
    initialize: function(index) {
        Scene.apply(this);
        introscenesheet = new Sprite(stgWidth, stgHeight);
        introscenesheet.image = game.assets['assets/images/loseScreen.png'];
        introscenesheet.frame = 0;
        
        this.addChild(introscenesheet);
        
        this.addEventListener('touchstart', function(e) {
            if(this.age > 60) {
                if(index == 1) game.replaceScene(level1);
                else if(index == 2) game.replaceScene(level2);
                else if(index == 3) game.replaceScene(level3);
            }
        });
    }
});