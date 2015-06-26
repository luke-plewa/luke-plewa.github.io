enchant();
//Stage Variables
var moveSpeed = 4;
var HEALTH_MAX = 15;
var health = HEALTH_MAX;
var stgWidth = 640;
var stgHeight = 320;
var enemyList = new Array();
var player;
var game;
var health_bar;
var RESPAWN_TIME = 250;
var superbutton;

var level = 0;

var left = false;
var right = false;
var level1;
var level2;
var level3;
var creditsScreen;
var introCutscene;
var postLevel1Scene;
var postLevel2Scene;
var pauseScreen;
var titleScreen;
var emptyScene;
var theGameIsPaused;


var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
//Begin game code
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    //Preload images
    //Any resources not preloaded will not appear
    game.preload('assets/images/beardo_side.png', 'assets/images/scroll_bg.png', 'assets/images/beard_unit.png');
    game.preload('assets/images/bullet.png', 'assets/images/beardo.png', 'assets/images/tank.png', 'assets/images/stick.png');
    game.preload('assets/images/bar.png', 'assets/images/button.png', 'assets/images/supermovebutton.png',
        'assets/images/mustachiobot.png', 'assets/images/winScreen.png');
    game.preload('assets/images/titleScreen.png', 'assets/images/credits.png',
        'assets/images/pauseScreen.png', 'assets/images/cloud.png', 'assets/images/postLevel2Scene.png');
    game.preload('assets/images/introscenesheet.png', 'assets/images/skipCutscene.png',
        'assets/images/postLevel1Scene.png', 'assets/images/loseScreen.png');
    game.preload('assets/sounds/level1.mp3', 'assets/sounds/pausemusic.mp3', 'assets/sounds/level2.mp3', 'assets/sounds/titleMusic.mp3', 'assets/sounds/level3.mp3');
    game.preload('assets/sounds/narr0.mp3', 'assets/sounds/narr1.mp3', 'assets/sounds/narr2.mp3', 'assets/sounds/narr3.mp3', 'assets/sounds/narr4.mp3', 'assets/sounds/narr5.mp3');
    game.preload('assets/sounds/hit0.mp3', 'assets/sounds/hit1.mp3', 'assets/sounds/hit2.mp3', 'assets/sounds/special.mp3');
    game.preload('assets/images/creditsButton.png', 'assets/images/playButton.png');
    
    hitsound0 = new Audio('assets/sounds/hit0.mp3');
    hitsound0.preload = 'auto';
    hitsound1 = new Audio('assets/sounds/hit1.mp3');  
    hitsound1.preload = 'auto'; 
    hitsound2 = new Audio('assets/sounds/hit2.mp3');
    hitsound2.preload = 'auto';

    
    game.onload = function() { //Prepares the game
        // Sets up scenes
        level1 = new Level1Scene();
        hitsound0.load();
		hitsound0.volume = 0.00000001;
		hitsound0.play();
        
        hitsound1.load();
		hitsound1.volume = 0.00000001;
		hitsound1.play();

        hitsound2.load();
		hitsound2.volume = 0.00000001;
		hitsound2.play();
        //level3 = new Level3Scene();

        postLevel1Scene = new PostLevel1Scene();

        titleScreen = new TitleScreen();
        pauseScreen = new PauseScreen();
        creditsScreen = new CreditsScreen();
        introCutscene = new IntroCutscene();
        emptyScene = new EmptyScene();
        game.pushScene(emptyScene);
        


    }
    game.start(); // Begin the game
}
