enchant();
IntroCutscene = Class.create(Scene, {
    initialize: function() {
        Scene.apply(this);
        introscenesheet = new Sprite(stgWidth, stgHeight);
        introscenesheet.image = game.assets['assets/images/introscenesheet.png'];
        introscenesheet.frame = 0;
        
        introNarration = new Array();
        introNarration[0] = new Audio('assets/sounds/narr0.mp3');
        introNarration[1] = new Audio('assets/sounds/narr1.mp3');
        introNarration[2] = new Audio('assets/sounds/narr2.mp3');
        introNarration[3] = new Audio('assets/sounds/narr3.mp3');
        introNarration[4] = new Audio('assets/sounds/narr4.mp3');
        introNarration[5] = new Audio('assets/sounds/narr5.mp3');
        introNarration[6] = new Audio('assets/sounds/pausemusic.mp3');
        narrationIndex = 0;
        
        this.addChild(introscenesheet);
        
        this.addEventListener('enter', function() {
            introNarration[narrationIndex++].play();
        });
        
        this.addEventListener('touchstart', function(e) {
            if(introscenesheet.frame > 5) {
                introNarration[narrationIndex-1].pause();
                game.replaceScene(level1);
                return;
            }
            introscenesheet.frame++;
            introNarration[narrationIndex-1].pause();
            if (e.x > 50 || e.y < stgHeight - 50) {
                introNarration[narrationIndex++].play();
            }
        });
        
        // Add pause icon
        skipCutsceneButton = new Sprite(50, 50);
        skipCutsceneButton.image = game.assets['assets/images/skipCutscene.png'];
        skipCutsceneButton.x = 0;
        skipCutsceneButton.y = stgHeight - skipCutsceneButton.height;
        skipCutsceneButton.addEventListener('touchstart', function(e) {
            introNarration[narrationIndex-1].pause();
            game.replaceScene(level1);
        });
        this.addChild(skipCutsceneButton);
    }
});