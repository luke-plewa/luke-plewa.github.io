enchant();
var M_attack_distance = 250;
var M_ATTACK_TIME = 50;
var M_ENEMY_HEIGHT = 185; //73
var M_ENEMY_WIDTH = 185; //96

Mustachio = Class.create(Sprite, {

    initialize: function(x, y) {

        this.xoffset = 0;
        this.yoffset = 0;

        this.currentHit = false;
        this.health = 10;
        this.rightFacing = true;
        Sprite.call(this, x, y);
        this.image = game.assets['assets/images/mustachiobot.png'];
		this.frame = 0;
        //It's time for PHYSICS!
        //this.z = 0;
        this.yvel = 0;
        this.xvel = 0;
        this.rotvel = 0;
        this.rotation = 0;
        this.ground = 0;
        this.xpow = 6;
        this.ypow = 8;
        //this.zvel = 0;
        //More flags! It's like the UN up in this bitch!
        this.airborne = false;

        this.dying = false;
        enemyList.push(this);
        this.attackTime = 0;
        this.drawing = false;
    },
    attack: function() { // enemy in range to hit
        //this.y += 5; //temp animation
        if(this.attackTime <= 0){ //player is hit
            this.frame = 8;
			//this.image = game.assets['../assets/tank_attack.png'];
            this.attackTime = M_ATTACK_TIME;
            if(!this.rightFacing){
                bullet = new Bullet(this.x+M_ENEMY_WIDTH, this.y+M_ENEMY_HEIGHT/4);
            game.currentScene.addChild(bullet);
                bullet = new Bullet(this.x+M_ENEMY_WIDTH, this.y+M_ENEMY_HEIGHT/2);
            game.currentScene.addChild(bullet);
            }
            else{
                bullet = new Bullet(this.x, this.y+M_ENEMY_HEIGHT/4);
            game.currentScene.addChild(bullet);
                bullet = new Bullet(this.x, this.y+M_ENEMY_HEIGHT/2);
            game.currentScene.addChild(bullet);
            }
        }
        else if(this.attackTime < 3*M_ATTACK_TIME/4 && !this.drawing){ //reset sprite after 1/4 cooldown
            this.frame = 0;
			//this.image = game.assets['../assets/tank.png'];
        }
    },
    hitTranslation: function(pointx, pointy) {
		if (this.health > 0)
		{
                mag = this.xpow + Math.random()*(this.xpow -1);
                spinmag = .01 + Math.random()*.0075;
                distance = Math.sqrt((pointx-this.x)*(pointx-this.x) + (pointy-this.y)*(pointy-this.y));
                theta = Math.atan2((pointx-this.x),(pointy-this.y));
                this.yvel = -this.ypow;
                this.xvel = -mag*Math.sin(theta);
                if (player.x < this.x)
                	this.xvel *= -1;
		}
		else
		{
				mag = 12 + Math.random()*5.0;
                spinmag = .01 + Math.random()*.0075;
                distance = Math.sqrt((pointx-this.x)*(pointx-this.x) + (pointy-this.y)*(pointy-this.y));
                theta = Math.atan2((pointx-this.x),(pointy-this.y));
                this.yvel = -mag*Math.cos(theta)*.66;
                this.xvel = -mag*Math.sin(theta);
                this.rotvel = distance * spinmag * -Math.sin(theta + Math.PI/2.0);
        		this.dying = true;
        		if (player.x < this.x)
                	this.xvel *= -1;
		}
    },

    hitBoxCheck: function(pointx, pointy) {
        if(!this.currentHit)
        {
            if(((pointx) > this.x) && (pointx) <= ((M_ENEMY_WIDTH + this.x)))
            {
            	if((pointy > this.y) && pointy <= ((M_ENEMY_HEIGHT + this.y)))
            	{
            		hitsound0.volume = 1.0;
            		hitsound0.currenttime = 0;
            		hitsound0.play();
                    this.xpow = 6;
                    this.ypow = 8;
	            	this.hitTranslation(pointx, pointy);
                	this.health--;
                	this.currentHit = true;
                	this.airborne = true;
                	if (this.ground == 0)
                		this.ground = this.y;
                	this.frame = 16;
                    player.superCharge += 1;
            	}

            }
        }

    },

    hitStop: function(){
        this.currentHit = false;
    },

    spawnEnemy: function(){
        if((this.age+30) % 150 == 0){ //anim
            this.drawing = true;
            this.frame = 12;
        }
        else if((this.age+25) % 150 == 0){ // spawn cloud
            this.frame = 13;
            if(this.cloud != null)
                this.cloud.remove();//remove cloud

            this.cloud = new Sprite(50, 50);
            this.cloud.x = this.x;
            this.cloud.y = this.y+M_ENEMY_HEIGHT/2;
            if(!this.rightFacing) this.cloud.x += M_ENEMY_WIDTH/4;
            else this.cloud.x -= M_ENEMY_WIDTH/4;
            this.cloud.image = game.assets['assets/images/cloud.png'];
            game.currentScene.addChild(this.cloud);
        }
        else if((this.age+20) % 150 == 0){ // anim
            this.frame = 14;
        }
        else if(this.age % 150 == 0 && this.cloud != null){ // spawn enemy
            this.frame = 15;
            enemy_type = 0.5-Math.random();
            if(enemy_type > 0) enemy_type = 1;
            else enemy_type = 2;
            game.currentScene.addEnemy(this.cloud.x, this.cloud.y, enemy_type);

            this.cloud.remove();//remove cloud
            this.drawing = false;
        }
    },

    onenterframe: function() {
        if (theGameIsPaused == false) {
            this.attackTime--;
            this.spawnEnemy(); // check to spawn enemy
            if(this.x > stgWidth-M_ENEMY_WIDTH){
                this.x = stgWidth-M_ENEMY_WIDTH;
            }
            else if(this.x < 0) this.x = 0;
        	if (this.airborne)
        	{
        		if (this.y > this.ground)
        		{
        			this.airborne = false;
        			this.y = this.ground;
        			this.ground = 0;
        			this.yvel = 0;
        			this.xvel = 0;
        			this.rotvel = 0;
        			this.rotation = 0;
        			this.rotate(0);
        		}
        		else{
    	            this.yvel += .5;
    	            this.rotation += this.rotvel;
    	            this.x += this.xvel;
    	            this.y += this.yvel;
    	            this.rotate(this.rotation);
    	       }
        	}
        	else{
                xs = this.x - player.x;
                ys = this.y - player.y;
                if(Math.sqrt( xs*xs + ys*ys ) > 3*M_attack_distance/4){
        		  if(xs + this.xoffset > 30)
        		  {
        		  	if(this.xvel > -3.0)
        		  	{
        		  		this.xvel -= .3;
        		  	}
        		  	else {
        		  		this.xvel = -3.0;
        		  	}
        		  }
        		  else if(xs + this.xoffset < -30)
        		  {
        		  	if(this.xvel < 3.0)
        		  	{
        		  		this.xvel += .3;
        		  	}
        		  	else {
        		  		this.xvel = 3.0;
        		  	}
        		  }
        		  else{
        		  	this.xvel /= 2.0;
        		  }
        		  	
        		  if (ys + this.yoffset > 10)
        		  {
        		  	if(this.xyvel > -3.0)
        		  	{
        		  		this.yvel -= .3;
        		  	}
        		  	else {
        		  		this.yvel = -3.0;
        		  	}
        		  }
        		  else if(ys + this.yoffset < -20)
        		  {
        		  	if(this.yvel < 3.0)
        		  	{
        		  		this.yvel += .3;
        		  	}
        		  	else{
        		  		this.yvel = 3.0;
        		  	}
        		  }
        		  else
        		  	this.yvel /= 2.0;
                }
                else
                {
                	this.yvel = 0.0;
                	this.xvel = 0.0;
                    if (ys + this.yoffset > 5)
                  {
                    if(this.xyvel > -3.0)
                    {
                        this.yvel -= .3;
                    }
                    else {
                        this.yvel = -3.0;
                    }
                  }
                  else if(ys + this.yoffset < -5)
                  {
                    if(this.yvel < 3.0)
                    {
                        this.yvel += .3;
                    }
                    else{
                        this.yvel = 3.0;
                    }
                  }
                  else
                    this.yvel /= 2.0;
                }
    	        if(Math.sqrt( xs*xs + ys*ys ) < M_attack_distance){
    	            this.attack();
    	        }
                else{
                    this.frame = 0;
                }
    	        if(xs-50 < 0){
    	            if (this.rightFacing)
    	                this.scale(-1.0, 1);
    	            this.rightFacing = false;
    	        }
    	        else if(xs+50 > 0){
    	            if (!this.rightFacing)
    	                this.scale(-1.0, 1);
    	            this.rightFacing = true;
    	        }
    	        if (this.dying){
                    if(this.cloud != null) this.cloud.remove();
    	        	this.remove();
                }
    	        this.x += this.xvel;
    	        this.y += this.yvel;
    	        
           }
           if(right)
        		this.x -= 6;
        	
       		if(left)
    	   		this.x += 6;
        }
    },
    
    superMove: function() {
        this.xpow = 10;
        this.ypow = 15;
    	this.hitTranslation(this.x+(this.width/2), player.y);
    	this.currentHit = true;
    	this.airborne = true;
        this.health -= 2;
    	if (this.ground == 0)
    		this.ground = this.y;
    	this.frame = 15;
        player.superCharge = 0;
        //this.dying = true;
    }
});
