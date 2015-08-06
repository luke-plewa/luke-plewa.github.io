enchant();
Beard = Class.create(Sprite, {
    initialize: function(locX, locY) {
        Sprite.call(this, 50, 30);
        this.image = game.assets['assets/images/beard_unit.png'];
        
        this.x = locX;
        this.y = locY;
    }
});