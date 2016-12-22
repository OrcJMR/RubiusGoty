
function l(what) {return document.getElementById(what);}

var App = {
    Inputs: {},
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
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0a0";
        ctx.strokeRect(0, 0, 752, 752);
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
