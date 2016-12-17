
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
    RootEntity: new ObjectGroup(0, 0, 0, [
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png"),
        new ObjectGroup(200, 200, 0, [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new ObjectGroup(0, 0, 0, [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ])
    ]),
    Logic: function(delta) {
        var tank = Game.RootEntity.items[1];
        var barrel = tank.items[3];
        var linSpeed = 60/1000; //px/msec
        var angSpeed = 90/1000; //deg/msec

        tank.ySpeed = 0;
        if( App.Keyboard.isDown('W'))  tank.ySpeed += linSpeed;
        if( App.Keyboard.isDown('S'))  tank.ySpeed -= linSpeed;

        tank.xSpeed = 0;
        if( App.Keyboard.isDown('E'))  tank.xSpeed += linSpeed;
        if( App.Keyboard.isDown('Q'))  tank.xSpeed -= linSpeed;

        tank.angSpeed = 0;
        if( App.Keyboard.isDown('D')) tank.angSpeed += angSpeed;
        if( App.Keyboard.isDown('A')) tank.angSpeed -= angSpeed;
        
        barrel.angSpeed = 0;
        if( App.Keyboard.isDown('L')) barrel.angSpeed += angSpeed;
        if( App.Keyboard.isDown('J')) barrel.angSpeed -= angSpeed;
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
