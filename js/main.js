
var App = {
    Inputs: {},
    UpdateFrame: function(delta) {
        Game.Logic(delta);
        Game.RootEntity.update(delta);
    },
    DrawFrame: function(interpolationPercentage) {
        App.Context.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        Game.Map.drawMap(App.Context, 0, 0);
        Game.RootEntity.draw(App.Context);
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
        App.Context.scale(1.5, 1.5);

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
                App.Context.scale(1.5, 1.5);
            }
        };
    }
}, 50);
