
function l(what) {return document.getElementById(what);}

var App = {
    Inputs: {},
    globalScale: 1.5,
    DrawFrame: function(interpolationPercentage) {
        var ctx = App.Context;
        ctx.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        ctx.save();
        ctx.scale(App.globalScale, App.globalScale);
        Game.Map.drawMap(ctx, 0, 0);
        Game.RootEntity.draw(ctx);
        ctx.restore();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#f00";
        ctx.strokeRect(0, 0, 1024, 768);
        ctx.strokeStyle = "#0a0";
        ctx.strokeRect(8, 8, 752, 752);
        ctx.drawImage(App.tankPH, 776, 136, 240, 240);
        ctx.drawImage(App.tankPH, 776, 520, 240, 240);
        if(Game.debugCollider) {
            var z = Game.debugCollider;
            ctx.save();
            ctx.translate(350, 400);
            ctx.scale(2, 2);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#00f";

            ctx.beginPath();
            ctx.moveTo(z.p1pts[0].x, z.p1pts[0].y);
            ctx.lineTo(z.p1pts[1].x, z.p1pts[1].y);
            ctx.lineTo(z.p1pts[2].x, z.p1pts[2].y);
            ctx.lineTo(z.p1pts[3].x, z.p1pts[3].y);
            ctx.lineTo(z.p1pts[0].x, z.p1pts[0].y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(z.p2pts[0].x, z.p2pts[0].y);
            ctx.lineTo(z.p2pts[1].x, z.p2pts[1].y);
            ctx.lineTo(z.p2pts[2].x, z.p2pts[2].y);
            ctx.lineTo(z.p2pts[3].x, z.p2pts[3].y);
            ctx.lineTo(z.p2pts[0].x, z.p2pts[0].y);
            ctx.stroke();

            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(0, 0);
            //ctx.lineTo(100*Math.sin(z.colAngle), 100*Math.cos(z.colAngle));
            ctx.lineTo(0, 100);
            ctx.stroke();

            var cross = 5;
            ctx.strokeStyle = "#0f0";
            ctx.beginPath();
            ctx.moveTo(z.r1xmax - cross, z.r1ymax);
            ctx.lineTo(z.r1xmax + cross, z.r1ymax);
            ctx.moveTo(z.r1xmax, z.r1ymax - cross);
            ctx.lineTo(z.r1xmax, z.r1ymax + cross);
            ctx.stroke();

            ctx.strokeStyle = "#af0";
            ctx.beginPath();
            ctx.moveTo(z.r1xmax2 - cross, z.r1ymax2);
            ctx.lineTo(z.r1xmax2 + cross, z.r1ymax2);
            ctx.moveTo(z.r1xmax2, z.r1ymax2 - cross);
            ctx.lineTo(z.r1xmax2, z.r1ymax2 + cross);
            ctx.stroke();

            ctx.strokeStyle = "#f40";
            ctx.beginPath();
            ctx.moveTo(z.r2xmin - cross, z.r2ymin);
            ctx.lineTo(z.r2xmin + cross, z.r2ymin);
            ctx.moveTo(z.r2xmin, z.r2ymin - cross);
            ctx.lineTo(z.r2xmin, z.r2ymin + cross);
            ctx.stroke();

            ctx.strokeStyle = "#f00";
            ctx.beginPath();
            ctx.moveTo(z.r2xmin, z.r2ymin);
            ctx.lineTo(z.r2xmin, z.r2ymin + z.penetrationDist);
            ctx.stroke();

            ctx.strokeStyle = "#0f0";
            ctx.beginPath();
            ctx.moveTo(z.r1xmax, z.r1ymax);
            ctx.lineTo(z.r1xmax, z.r1ymax - z.penetrationDist);
            ctx.stroke();

            ctx.restore();
        // Game.debugCollider = {
        //     p1pts = p1pts,
        //     p2pts = p2pts,
        //     colAngle = collisionAngle,
        //     r1xmax = r1xmax,
        //     r1xmax2 = r1xmax2,
        //     r1ymax = r1ymax,
        //     r1ymax2 = r1ymax2,
        //     r2xmax = r2xmax,
        //     r2ymax = r2ymax,
        //     penetrationDist = penetrationDist,
        //     penetrationX = penetrationX,
        //     penetrationY = penetrationY,
        // };

        }
    },
    EndFrame: function(fps, panic) {
            if (panic) {
                var discardedTime = Math.round(MainLoop.resetFrameDelta());
                console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
            }
    },
    EntryPoint: function() {

        App.tankPH = new Image();
        App.tankPH.src = "./images/tank.png";


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

        MainLoop.setBegin(Game.ConsumeInputs).setUpdate(Game.Logic).setDraw(App.DrawFrame).setEnd(App.EndFrame).start();
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
