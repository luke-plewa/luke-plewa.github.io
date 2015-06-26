enchant();
//01 Player Class
var walkArr = [4, 4, 4, 5, 5, 5, 6, 6, 6];
var PLAYER_WIDTH = 69;
var PLAYER_HEIGHT = 96;
Player = Class.create(Sprite, {
    initialize: function() {
        //Sprite.call(this, 100, 97);
        Sprite.call(this, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.image = game.assets['assets/images/beardo.png'];
		this.frame = 0;
        this.x = stgWidth/2;
        this.y = stgHeight/2;

        // Bind Keys
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');

        // Mouse Variables
        this.tx = this.x;
        this.ty = this.y;

        // movement variables
        this.moveToX = this.x;
        this.moveToY = this.y;
        
        // sprite variables
        this.rightFacing = true;
        
        this.superSound = game.assets['assets/sounds/special.mp3'];
        
        // Gesture variables
        __playerBeardDistance = 0;
        this.maxGestureDistance = 170;
        __lastFrameTouchX = 0;
        __lastFrameTouchY = 0;
        __xTouchOffset = 10;
        __yTouchOffset = 10;
        this.doBeardAction = false;
        this.superCharge = 0;
        
        // Event Listeners
        this.addEventListener('touchstart', function(e){
            if ((player.y+player.height/3-10) < e.y) {
                __playerBeardDistance = 0;
                
                e.y -= __xTouchOffset;
                e.x -= __yTouchOffset;
                
                __lastFrameTouchX = e.x;
                __lastFrameTouchY = e.y;
                
                this.doBeardAction = true;
                
                this.frame = 8;
            }
        });

        this.beardArray = new Array();
        
        this.addEventListener('touchmove', function(e){
            if (this.doBeardAction) {
                this.frame = 9;
                if(e.x > this.x+PLAYER_WIDTH/2){
                    if(!this.rightFacing) this.scale(-1.0, 1.0);
                    this.rightFacing = true;
                }
                else{
                    if(this.rightFacing) this.scale(-1.0, 1.0);
                    this.rightFacing = false;
                }
                e.y -= __xTouchOffset;
                e.x -= __yTouchOffset;
                if(__playerBeardDistance < this.maxGestureDistance){
                    for (i = 0; i < enemyList.length; i ++) {
                        enemyList[i].hitBoxCheck(e.x, e.y);
                    }
                    var numInterpolBeards = 2;
                    for (var i = 0; i < numInterpolBeards; i++) {
                        beardPixel = new Beard((e.x - (e.x - __lastFrameTouchX)/numInterpolBeards*i), e.y - (e.y - __lastFrameTouchY) / numInterpolBeards*i);
                        this.beardArray.push(beardPixel);
                        game.currentScene.addChild(beardPixel);
                    }
                    beardPixel = new Beard(e.x, e.y);
                    this.beardArray.push(beardPixel);
                    game.currentScene.addChild(beardPixel);
                    
                    __playerBeardDistance += Math.sqrt(Math.pow(e.x - __lastFrameTouchX,2) + Math.pow(e.y - __lastFrameTouchY,2));
                    __lastFrameTouchX = e.x;
                    __lastFrameTouchY = e.y;
                }
            }
        });
        
        this.addEventListener('touchend', function(e){
            if (this.doBeardAction) {
                e.y -= __xTouchOffset;
                e.x -= __yTouchOffset;
                for (i = 0; i < enemyList.length; i ++)
                    enemyList[i].hitStop();    
                for(i = 0; i < this.beardArray.length; i++)
                    this.beardArray[i].remove();        
                gestureEndLocationX = e.x;
                gestureEndLocationY = e.y;
                this.doBeardAction = false;
                this.frame = 4;
            }
        });
    },

    getHit: function() {
    	hitsound1.volume = 1.0;
    	hitsound1.currenttime = 0;
    	hitsound1.play();
        this.frame = 12;
        health--;
        if(health >= 0 && health < health_bar.length) health_bar[health].healthDecrement();
        if(health <= 0){
            this.superCharge = 0;
            health = HEALTH_MAX;
            game = Game.instance;
            curr_level = 0;
            // death scene
            if(game.currentScene == level1){
                curr_level = 1;
                level1 = new Level1Scene();
            }
            else if(game.currentScene == level2){
                curr_level = 2;
                level2 = new Level2Scene();
            }
            else if(game.currentScene == level3){
                curr_level = 3;
                level3 = new Level3Scene();
            }
            deathScene = new DeathScene(curr_level);
            game.replaceScene(deathScene);
        }
    },

    translatePlayer: function() {
        if(this.age % 5 != 0) return;
        if(this.frame == 0)
        {
           this.frame = 4;
        }
        else
        {
           if(this.frame >= 7)
           {
              this.frame = 4;
           }
           else
           {
              this.frame += 1;
           }
        }
    },
	
    onenterframe: function() {
        // Player Controls
        if(this.age % 150 == 0 && health < health_bar.length && health >= 0){
            health_bar[health].frame = 0;
            health++;
        }
        if(game.input.left && !game.input.right){
		    if(this.frame == 0)
			{
		       this.frame = 4;
			}
			else
			{
			   if(this.frame >= 7)
			   {
			      this.frame = 4;
			   }
			   else
			   {
			      this.frame += 1;
			   }
				  
			}
            this.tx = this.x -= moveSpeed;
            this.x -= moveSpeed;
        }
        else if(game.input.right && !game.input.left){
		    if(this.frame == 0)
			{
		       this.frame = 4;
			}
			else
			{
			   if(this.frame >= 7)
			   {
			      this.frame = 4;
			   }
			   else
			   {
			      this.frame += 1;
			   }
				  
			}
            this.tx = this.x += moveSpeed;
            this.x += moveSpeed;
        }
        if(game.input.up && !game.input.down){
            this.ty = this.y -= moveSpeed;
            this.y -= moveSpeed;
        }
        else if(game.input.down && !game.input.up){
            this.ty = this.y += moveSpeed;
            this.y += moveSpeed;
        }
        // Mouse Update
        curr_x = this.x;
        curr_y = this.y;
        this.x += (this.tx - this.x)/10;
        this.y += (this.ty - this.y)/10;
        if((this.x-3 > curr_x || this.x+3 < curr_x)
            || (this.y-3 > curr_y || this.y+3 < curr_y)){
            this.translatePlayer();
        }
        if(this.y < stgHeight/3.0){
            this.y = stgHeight/3.0 - 1;
        }
        if(this.x < 0){
            this.x = 0;
        }
		//this.image.width
        else if (this.x > stgWidth-69){
            this.x = stgWidth-69;
        }
		//this.image.height
        if(this.y > stgHeight-96)
            this.y = stgHeight-96;
            
        if (this.superCharge > 15) {
            if (superbutton.scene == null) {
                game.currentScene.addChild(superbutton);
            }
        }
    },
    
    supermove: function(){
        this.superSound.play();
        for (var i = 0; i < enemyList.length; i++) {
            enemyList[i].superMove();
        }
        superCharge = 0;  
        this.frame = 11;      
    }
});
