enchant();
BULLET_SPEED = 5;
MAX_BULLET_DISTANCE = 300;
BULLET_BUMP = 25;
Bullet = Class.create(Sprite, {
    initialize: function(locX, locY) {
        Sprite.call(this, 40, 30);
        this.image = game.assets['assets/images/bullet.png'];
        
        this.x = locX;
        this.y = locY;
        this.startX = this.x;
        this.rightFace = false;
        if(this.x < (player.x + PLAYER_WIDTH/2)){
            this.scale(-1.0, 1.0);
            this.rightFace = true;
        }
    },

    onenterframe: function() {
        if (theGameIsPaused == false) {
            if(this.rightFace)
                this.x += 5;
            else
                this.x -= 5;
        
            if(this.intersect(player)){
                player.getHit();
                if(this.x > player.x+PLAYER_WIDTH/2 )
                    player.tx -= BULLET_BUMP;
                else player.tx += BULLET_BUMP;
                if(this.y > player.y+PLAYER_HEIGHT/2 )
                    player.ty -= BULLET_BUMP;
                else player.ty += BULLET_BUMP;
                this.remove();
            }
            else if(Math.abs(this.x - this.startX) > MAX_BULLET_DISTANCE){
                this.remove();
            }
        }
    }
});