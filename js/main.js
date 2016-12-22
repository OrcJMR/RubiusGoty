
function l(what) {return document.getElementById(what);}

var App = {
    Inputs: {},
    Resources: {},
    UpdateFrame: function(delta) {
        Game.Logic(delta);
        Game.RootEntity.update(delta);
    },
    globalScale: 1,
    DrawFrame: function(interpolationPercentage) {
        var ctx = App.Context;
        ctx.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        ctx.save();
        ctx.scale(App.globalScale, App.globalScale);
        Game.Map.drawMap(ctx, 0, 0);
        Game.RootEntity.draw(ctx);
        ctx.restore();
        ctx.clearRect(0, 0, App.Canvas.width, 64);
        if( Game.Tank1 ) 
            App.DrawTankGui(ctx, Game.Tank1, 0, 0);
        if( Game.Tank2 ) 
            App.DrawTankGui(ctx, Game.Tank2, 256, 0);
        if( Game.Tank3 ) 
            App.DrawTankGui(ctx, Game.Tank3, 512, 0);
        if( Game.Tank ) 
            App.DrawTankGui(ctx, Game.Tank, 768, 0);
    },
    DrawTankGui: function(ctx, tank, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(ctx.canvas, tank.x - 32, tank.y - 32, 64, 64, 0, 0, 64, 64);
        ctx.translate(64, 0);
        App.DrawCube(ctx, tank);
        ctx.restore();
    },
    DrawCube: function(ctx, tank) {
        ctx.drawImage(App.Resources.hpLeaf, 8, 0, 16, 16);
        var hp = 9;
        for(var y = 16; y < 64; y += 16)
            for(var x = 0; x < 48; x += 16) {
                var lit = tank.hp >= hp;
                ctx.drawImage(lit ? App.Resources.hpCubeLit : App.Resources.hpCubeDim, x, y, 16, 16);
                hp--;
            }
    },
    EndFrame: function(fps, panic) {
            if (panic) {
                var discardedTime = Math.round(MainLoop.resetFrameDelta());
                console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
            }
    },
    EntryPoint: function() {

        App.Keyboard = new Keyboard();
        App.Canvas = document.getElementById('gameCanvas');
        // App.Canvas.width = window.innerWidth;
        // App.Canvas.height = window.innerHeight;
        App.Context = App.Canvas.getContext('2d');
        App.Context.mozImageSmoothingEnabled = false;
        App.Context.webkitImageSmoothingEnabled = false;
        App.Context.msImageSmoothingEnabled = false;
        App.Context.imageSmoothingEnabled = false;

        App.Resources.hpCubeLit = new Image();
        App.Resources.hpCubeLit.src = "./images/hp-cube.png";
        App.Resources.hpCubeDim = new Image();
        App.Resources.hpCubeDim.src = "./images/hp-cube-off.png";
        App.Resources.hpLeaf = new Image();
        App.Resources.hpLeaf.src = "./images/hp-leaf.png";

        Game.Setup();

        //PlaySound("./sound/bl-slaughter.mp3", 90, true);

        MainLoop.setBegin(Game.ConsumeInputs).setUpdate(App.UpdateFrame).setDraw(App.DrawFrame).setEnd(App.EndFrame).start();
    }
};

var documentReadyInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        App.EntryPoint();
        clearInterval(documentReadyInterval);
        window.onresize = function() {
            if (App.Canvas != undefined) {
                // App.Canvas.width = window.innerWidth;
                // App.Canvas.height = window.innerHeight;
            }
        };
    }
}, 50);
