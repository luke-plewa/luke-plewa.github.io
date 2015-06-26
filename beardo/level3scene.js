enchant();

Level3Scene = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        theGameIsPaused = true;
        
        // Distance Counter
        distance = 0;
		accumulator = 0;
        
        // Random enemy stuff
        var timerflag = false;
        var enemyTimer = 250;
        var enemyCounter = 10;
        var enemyTimeMax = 250;
        var enemyBias = 0.9;
        
        // Touch vars
        var gestureStartLocationX;
        var gestureStartLocationY;
        var gestureEndLocationX;
        var gestureEndLocationY;
        
        // Add Background
        bg = new Sprite(stgWidth, stgHeight);
        bg.image = game.assets['assets/images/scroll_bg.png'];
        bg.frame = 0;
        bg.opacity = 0.75;
        bg2 = new Sprite(stgWidth, stgHeight);
        bg2.image = bg.image;
        bg2.frame = 1;
        bg2.opacity = 0.75;
        bg2.x = stgWidth;
        this.addChild(bg);
        this.addChild(bg2);

        // Add Bars
        health_bar = new Array();
        for(i = 0; i < HEALTH_MAX; i++){
            health_bar.push(new HealthBar(10, 100, i));
            this.addChild(health_bar[i]);
        }

        // Add pause icon
        button = new Sprite(50, 50);
        button.image = game.assets['assets/images/button.png'];
        button.x = 0;
        button.y = 0;
        button.addEventListener('touchstart', function(e) {
            theGameIsPaused = true;
            game.replaceScene(pauseScreen);
        });
        this.addChild(button);
        
        //Super move button
        superbutton = new Sprite(100, 50);
        superbutton.image = game.assets['assets/images/supermovebutton.png'];
        superbutton.x = 0;
        superbutton.y = 270;
        superbutton.addEventListener('touchstart', function(e) {
            player.supermove();
            game.currentScene.removeChild(superbutton);
            player.superCharge = 0;
        });
        
        // Add Player
        player = new Player();
        this.addChild(player);

        this.mustachio = new Mustachio(M_ENEMY_WIDTH, M_ENEMY_HEIGHT);
        this.mustachio.x = stgWidth;
        this.mustachio.y = stgHeight/2;
        this.addChild(this.mustachio);

        game.timer = RESPAWN_TIME;
        
        this.level2music = new Audio('assets/sounds/level3.mp3');
        
        // Scene begins
        this.addEventListener('enter', function() {
            theGameIsPaused = false;
            console.log("Level 3");
            this.level2music.play();
        });
        
        this.addEventListener('exit', function() {
            theGameIsPaused = true;
            this.level2music.pause();
        });
        
        // Touch listener to move player
        this.addEventListener('touchstart', function(e) {
            if (e.x > .66*stgWidth) {
                e.x = .77*stgWidth;
            }
            if (e.x < .33*stgWidth) {
                e.x = .22*stgWidth;
            }
            var touchingPlayerX = e.x > (player.x - player.width/2) && e.x < (player.x + player.width/2);
            var touchingPlayerY = e.y > (player.y - player.height/2) && e.y < (player.y + player.height/2);
            var touchingPlayer = touchingPlayerX && touchingPlayerY;
            if (!touchingPlayer && (e.x > 50 && e.y > 50)) {
                player.tx = e.x - player.width/2;
                player.ty = e.y - player.height/2;
            
                if(player.frame == 0)
                {
                   player.frame = 4;
                }
                else
                {
                   if(player.frame >= 7)
                   {
                      player.frame = 4;
                   }
                   else
                   {
                      player.frame += 1;
                   }
                  
                }
            }

            if(player.x < e.x){
                if(!player.rightFacing) 
                    player.scale(-1.0, 1.0);
                player.rightFacing = true;
            }
            else{
                if(player.rightFacing) 
                    player.scale(-1.0, 1.0);
                player.rightFacing = false;
            }
        });
        
        //Game Condition Check
        this.addEventListener('enterframe', function() {
        if (this.level2music.currentTime >= this.level2music.duration){
            this.level2music.play();
        }
            
            // Game Over
            // spawn units
            
            game.timer --;
            if(game.timer <= 0){
                
                player.maxGestureDistance += 5;
                game.timer = RESPAWN_TIME;
                
            }
            
            // Some of the random enemy stuff.
            if (this.timerFlag)
            {
            	this.enemyTimer--;
            	if(this.enemyTimer <= 0)
            	{
	            	enemy_switch = Math.random()*2.0;
	                if(enemy_switch > this.enemyBias)
	                {
	                    this.addEnemy(stgWidth*0.9, stgHeight*0.5, 1);
	                }
	                else
	                {
	                    this.addEnemy(stgWidth*0.9, stgHeight*0.5, 2);
	                }
	
	                this.enemyCounter --;
	                if (this.enemyCounter <= 0)
	                	this.timerFlag = false;
                	this.enemyTimer = this.enemyTimeMax;
	            }
	            
            }
            
            this.levelUpdate();



            // Scrolling background
            if(player.x < .33*stgWidth && bg.x < 0){
            	distance --;
                player.tx+=5;
                left = true;
                right = false;
                for(temp_enemy in this.enemyList){
                    temp_enemy.tx += 5;
                }
                bg.x+=5;
                bg2.x+=5;
                if(bg2.x >= stgWidth && bg.frame > 0){
                    bg.x = -stgWidth;
                    bg.frame--;
                    bg2.x = 0;
                    bg2.frame = bg.frame+1;
                }
            }
            else if(player.x > .66*stgWidth){
            	distance ++;
            	right = true;
            	left = false;
            	if (distance > accumulator)
            		accumulator = distance;
                player.tx-=5;
                for(temp_enemy in this.enemyList){
                    temp_enemy.tx -= 5;
                }
                bg.x-=5;
                bg2.x-=5;
            }
            else{
            	left = false;
            	right = false;
            }

            if(bg.x < -stgWidth){
                bg.x = 0;
                bg.frame++;
                bg2.x = stgWidth;
                bg2.frame = bg.frame+1;
            }
        });
    },
    addEnemy: function(x, y, type) {
    	if (type == 1)
        	new_enemy = new Enemy(ENEMY_WIDTH, ENEMY_HEIGHT);
        else
            new_enemy = new Enemy2(ENEMY_WIDTH2, ENEMY_HEIGHT2);
        new_enemy.x = x;
        new_enemy.y = y;
        enemyList.push(new_enemy);

        this.addChild(new_enemy);
    },
    
    levelUpdate: function()
    {
	    // Win Condition for level 
	    if (this.mustachio == null || this.mustachio.health <= 0) {
    	    //level3 = new Level3Scene();
    	    game.replaceScene(new WinningScene());
	    }
    }
});