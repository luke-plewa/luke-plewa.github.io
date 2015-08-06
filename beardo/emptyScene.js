enchant();
EmptyScene = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        this.addEventListener('enterframe', function() {
            game.replaceScene(titleScreen);
        });
    }
});