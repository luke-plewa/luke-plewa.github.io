enchant();

HealthBar = Class.create(Sprite, {

    initialize: function(x, y, index) {
        Sprite.call(this, x, y);
        this.image = game.assets['assets/images/bar.png'];
        this.frame = 0;
        this.scale(1.0, 0.4);
        this.x = stgWidth/2-500*0.4+index*10;
        this.y = -100*.3;
        this.index = index;
    },

    healthDecrement: function() {
    	this.frame = 1;
    }
});