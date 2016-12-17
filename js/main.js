
var Game = {
    Map: new Map(16, 12,
    "...,,,,...,,,,,," +
    ".,,,,,,,,,,,,,,," +
    ",,,,..........,," +
    ",,.....BBBBBBBB." +
    ",......B,,,,,,B." +
    ",......B,,,,,,B." +
    ",,,....B,,,,,,B." +
    ",,,,...B,,,,,,B." +
    ".,,,,,.B,,,,,,B." +
    "...,,,,B,,,,,,B." +
    "....,,,BBBBBBBB." +
    "......,,........"),
    RootEntity: new ObjectGroup(0, 0, 0, [], [
        new ObjectGroup(200, 150, 180, [new Behavior.Move], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]),
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png", [new Behavior.TimedLife(5000), new Behavior.Move(0,-0.01,-0.01)]),
    ]),
    Logic: function(delta) {
        var tank = this.RootEntity.items[0];
        var barrel = tank.items[3];
        var linSpeed = 60/1000; //px/msec
        var angSpeed = 90/1000; //deg/msec

        tank.moveYSpeed = 0;
        if( App.Keyboard.isDown('W'))  tank.moveYSpeed += linSpeed;
        if( App.Keyboard.isDown('S'))  tank.moveYSpeed -= linSpeed;

        tank.moveXSpeed = 0;
        if( App.Keyboard.isDown('E'))  tank.moveXSpeed += linSpeed;
        if( App.Keyboard.isDown('Q'))  tank.moveXSpeed -= linSpeed;

        tank.moveAngSpeed = 0;
        if( App.Keyboard.isDown('D')) tank.moveAngSpeed += angSpeed;
        if( App.Keyboard.isDown('A')) tank.moveAngSpeed -= angSpeed;
        
        barrel.moveAngSpeed = 0;
        if( App.Keyboard.isDown('L')) barrel.moveAngSpeed += angSpeed;
        if( App.Keyboard.isDown('J')) barrel.moveAngSpeed -= angSpeed;

        if( App.Keyboard.isDown('K')) {
            var bullet = new Box(0, 20, 0, 3, 5, "orange", [
                new Behavior.Move(0, 0.5), 
                new Behavior.LifeInBounds(0,0,400,400)
            ]);
            this.RootEntity.changeCoordinatesFromDescendant(bullet, barrel);
            this.RootEntity.items.push(bullet);
        }
    }
}


var App = {
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

        MainLoop.setUpdate(App.UpdateFrame).setDraw(App.DrawFrame).setEnd(App.EndFrame).start();
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
