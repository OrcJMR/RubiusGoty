
var App = {
    Inputs: {},
    UpdateFrame: function(delta) {
        Game.Logic(delta);
        Game.RootEntity.update(delta);
    },
    globalScale: 2,
    DrawFrame: function(interpolationPercentage) {
        App.Context.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        App.Context.save();
        App.Context.scale(App.globalScale, App.globalScale);
        Game.Map.drawMap(App.Context, 0, 0);
        Game.RootEntity.draw(App.Context);
        App.Context.restore();
        App.Context.lineWidth = 2;
        App.Context.strokeStyle = "#f00";
        App.Context.strokeRect(0, 0, 1024, 768);
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
        App.Canvas.width = window.innerWidth;
        App.Canvas.height = window.innerHeight;
        App.Context = App.Canvas.getContext('2d');
        App.Context.mozImageSmoothingEnabled = false;
        App.Context.webkitImageSmoothingEnabled = false;
        App.Context.msImageSmoothingEnabled = false;
        App.Context.imageSmoothingEnabled = false;

        App.Inputs.ThrottleInput = new KeyboardBiDiInput(App.Keyboard, 'W', 'S');
        App.Inputs.TankTurnInput = new KeyboardBiDiInput(App.Keyboard, 'D', 'A');
        // App.Inputs.LeftTrackInput = new KeyboardBiDiInput(App.Keyboard, 'A', 'Z');
        // App.Inputs.RightTrackInput = new KeyboardBiDiInput(App.Keyboard, 'D', 'C');
        //App.Inputs.StrafeInput = new KeyboardBiDiInput(App.Keyboard, 'E', 'Q');
        App.Inputs.TurretTurnInput = new KeyboardBiDiInput(App.Keyboard, 'E', 'Q');
        App.Inputs.FireInput = new KeyboardCooldownInput(App.Keyboard, '2', 300, false);

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
                App.Canvas.width = window.innerWidth;
                App.Canvas.height = window.innerHeight;
            }
        };
    }
}, 50);
