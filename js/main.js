
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
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png", [new Behavior.TimedLife(5000), new Behavior.Move(0,-0.01,-0.01)]),
    ]),
    Setup: function() {
        this.Tank = new ObjectGroup(200, 150, 180, [new Behavior.Move], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new Box(  0,-12, 0, 12, 8, "darkolivegreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);
        this.RootEntity.addChild(this.Tank);
    },
    spawnDirt: function(left, back, move) {
        var sign = back ? -1 : 1;
        var offset = move ? 14 : 14;
        var speed = move ? -0.03 : -0.05;
        var rnd = Math.random() / 2 + 0.5;
        var dirt = new Box(-3 + Math.random()*6, offset*sign, 160 + Math.random() * 40, 3, 3, "darkgoldenrod", [
            new Behavior.Move,
            new Behavior.TimedLife(300),
            new Behavior.Custom(function() { 
                this.alpha = this.lifeTimeout / 100;
                this.moveYSpeed = this.lifeTimeout / 300 * rnd * speed * sign; })
        ]);
        var parent = left ? this.Tank.items[1] : this.Tank.items[0];
        this.RootEntity.changeCoordinatesFromDescendant(dirt, parent);
        this.RootEntity.addChild(dirt, 0);
    },
    Logic: function(delta) {
        var tank = this.Tank;
        var barrel = this.Tank.items[4];
        var linSpeed = 60/1000; //px/msec
        var angSpeed = 90/1000; //deg/msec

        tank.moveYSpeed = 0;
        if( App.Keyboard.isDown('W'))  tank.moveYSpeed += linSpeed;
        if( App.Keyboard.isDown('S'))  tank.moveYSpeed -= linSpeed;
        if( tank.moveYSpeed != 0) {
            var back = tank.moveYSpeed > 0;
            this.spawnDirt(true, back, true);
            this.spawnDirt(false, back, true);
        }

        tank.moveXSpeed = 0;
        if( App.Keyboard.isDown('E'))  tank.moveXSpeed += linSpeed;
        if( App.Keyboard.isDown('Q'))  tank.moveXSpeed -= linSpeed;

        tank.moveAngSpeed = 0;
        if( App.Keyboard.isDown('D')) tank.moveAngSpeed += angSpeed;
        if( App.Keyboard.isDown('A')) tank.moveAngSpeed -= angSpeed;
        if( tank.moveYSpeed == 0 && tank.moveAngSpeed != 0 ) {
            var cw = tank.moveAngSpeed > 0;
            this.spawnDirt(true, cw);
            this.spawnDirt(false, !cw);
        }
        
        barrel.moveAngSpeed = 0;
        if( App.Keyboard.isDown('L')) barrel.moveAngSpeed += angSpeed;
        if( App.Keyboard.isDown('J')) barrel.moveAngSpeed -= angSpeed;

        if( App.Keyboard.isDown('K')) {
            var bullet = new Box(0, 20, 0, 3, 5, "orange", [
                new Behavior.Move(0, 0.5), 
                new Behavior.LifeInBounds(0,0,500,400)
            ]);
            this.RootEntity.changeCoordinatesFromDescendant(bullet, barrel);
            this.RootEntity.addChild(bullet);
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

        Game.Setup();

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
