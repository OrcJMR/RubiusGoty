
var Game = {
    Map: new Map(),
    RootEntity: new ObjectGroup(0, 0, 0, [], [
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png", [new Behavior.TimedLife(5000), new Behavior.Move(0,-0.01,-0.01)]),
    ]),
    Setup: function() {
        this.spawnTank1();
        this.spawnTank2();
        this.spawnTankDefault();
        this.Tanks = [this.Tank1, this.Tank2, this.Tank];

        // var tankBot = new Sprite(300, 200, 45, 32, 32, "./images/tank.png", [new Behavior.Move(0,-0.01,-0.01)]);
        // tankBot.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        // tankBot.class = "tankbot";
        // this.RootEntity.addChild(tankBot);

    },
    spawnTank1: function() {
        this.Tank1 = this.spawnTank(80, 752 - 80, 180, "royalblue");
        this.RootEntity.addChild(this.Tank1);
        Game.Tank1.Inputs = {};
        Game.Tank1.Inputs.ThrottleInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'moveForward', 'moveBackward');
        Game.Tank1.Inputs.TankTurnInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'turnRight', 'turnLeft');
        Game.Tank1.Inputs.LeftTrackInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'leftTrackForward', 'leftTrackBackward');
        Game.Tank1.Inputs.RightTrackInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'rightTrackForward', 'rightTrackBackward');
        //Game.Tank1.Inputs.StrafeInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'strafeRight', 'strafeLeft');
        Game.Tank1.Inputs.TurretTurnInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team1;}, 'turretLeft', 'turretRight');
        Game.Tank1.Inputs.FireInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(function() {return Sockets.ViewModel.team1;}, 'fire'), '2', 600, true);
    },
    spawnTank2: function() {
        this.Tank2 = this.spawnTank(1008 - 80, 752 - 80, 180, "darkorange");
        this.RootEntity.addChild(this.Tank2);
        Game.Tank2.Inputs = {};
        Game.Tank2.Inputs.ThrottleInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'moveForward', 'moveBackward');
        Game.Tank2.Inputs.TankTurnInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'turnRight', 'turnLeft');
        Game.Tank2.Inputs.LeftTrackInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'leftTrackForward', 'leftTrackBackward');
        Game.Tank2.Inputs.RightTrackInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'rightTrackForward', 'rightTrackBackward');
        //Game.Tank2.Inputs.StrafeInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'strafeRight', 'strafeLeft');
        Game.Tank2.Inputs.TurretTurnInput = new NetworkBiDiInput(function() {return Sockets.ViewModel.team2;}, 'turretLeft', 'turretRight');
        Game.Tank2.Inputs.FireInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(function() {return Sockets.ViewModel.team2;}, 'fire'), '2', 600, true);
    },
    spawnTankDefault: function() {
        this.Tank = this.spawnTank(504, 80, 0, "dimgray");
        this.RootEntity.addChild(this.Tank);
        Game.Tank.Inputs = {};
        Game.Tank.Inputs.ThrottleInput = new KeyboardBiDiInput(App.Keyboard, 'W', 'S');
        Game.Tank.Inputs.TankTurnInput = new KeyboardBiDiInput(App.Keyboard, 'D', 'A');
        Game.Tank.Inputs.LeftTrackInput = new KeyboardBiDiInput(App.Keyboard, 'Q', 'Z');
        Game.Tank.Inputs.RightTrackInput = new KeyboardBiDiInput(App.Keyboard, 'E', 'C');
        //Game.Tank.Inputs.StrafeInput = new KeyboardBiDiInput(App.Keyboard, 'E', 'Q');
        Game.Tank.Inputs.TurretTurnInput = new KeyboardBiDiInput(App.Keyboard, '3', '1');
        Game.Tank.Inputs.FireInput = new KeyboardCooldownInput(App.Keyboard, '2', 400, false);
    },
    spawnTank: function(x, y, angle, color) {
        var tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
            new Box(-12,  0, 0,  8, 32, "saddlebrown"),
            new Box( 12,  0, 0,  8, 32, "saddlebrown"),
            new Box(  0,  0, 0, 24, 24, color),
            new Box(  0,-12, 0, 12, 8, "darkgreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);
        tank.hp = 9;
        tank.LeftTrack = tank.items[0];
        tank.LeftTrack.torque = 0;
        tank.RightTrack = tank.items[1];
        tank.RightTrack.torque = 0;
        tank.Barrel = tank.items[4];
        tank.Barrel.recoil = 0;
        tank.width = 32; //this is for collision detection
        tank.height = 32;
        tank.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank", "tankbot"]);
        tank.class = "tank";
        return tank;
    },
    spawnDirt: function(parent, back, move) {
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
        this.RootEntity.changeCoordinatesFromDescendant(dirt, parent);
        this.RootEntity.addChild(dirt, 0);
    },
    spawnBullet: function(tank) {
        var bullet = new Box(0, 20, 0, 3, 5, "orange", [
            new Behavior.Move(0, 0.3),
            new Behavior.LifeInBounds(0, 0, 1000, 1000)
        ]);
        bullet.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank", "tankbot"]);
        bullet.OnMapCollision = function (x, y) {
            Game.Map.degradeTile(x, y);
            this.dead = true;
            PlaySound("./sound/splat.wav", 100);
        };
        bullet.OnObjectCollision = function(obj){
            if (obj.class == "tank"){
                obj.hp -= 1;
                if(obj.hp == 0) {
                    obj.addBehavior(new Behavior.TimedLife(3000));
                    obj.items[2].color = "black";
                    if(obj == Game.Tank1)
                        Game.spawnTank1();
                    if(obj == Game.Tank2)
                        Game.spawnTank2();
                    if(obj == Game.Tank)
                        Game.spawnTankDefault();
                    Game.Tanks = [Game.Tank1, Game.Tank2, Game.Tank];
                }
                obj.moveXSpeed /= 0;
                obj.moveYSpeed /= 0;
                obj.moveAngSpeed /= 0;                
            }
            if (obj.class == "tankbot"){
                obj.moveXSpeed /= 3;
                obj.moveYSpeed /= 3;
                obj.moveAngSpeed /= 3;
                obj.class = "deadtankbot";
                if (obj.setImage){
                    obj.setImage("./images/deadtank.png");
                }
                obj.addBehavior(new Behavior.TimedLife(3000));
            }
            this.dead = true;
            PlaySound("./sound/splat.wav", 100);
        }

        this.RootEntity.changeCoordinatesFromDescendant(bullet, tank.Barrel);
        this.RootEntity.addChild(bullet);
    },
    ConsumeInputs: function(timestamp) {
        var driveSpeed = 60/1000; //px/msec
        var turnSpeed = 90/1000; //deg/msec

        Game.Tanks.forEach(function(tank) {

            var throttle = tank.Inputs.ThrottleInput.read(timestamp);
            var turning = tank.Inputs.TankTurnInput.read(timestamp);

            if(Math.abs(turning) < 1E-2) {
                tank.LeftTrack.torque = throttle;
                tank.RightTrack.torque = throttle;
            } else if(Math.abs(throttle) < 1E-2) {
                tank.LeftTrack.torque = turning;
                tank.RightTrack.torque = -turning;
            } else {
                tank.LeftTrack.torque = (throttle + turning) / 2;
                tank.RightTrack.torque = (throttle - turning) / 2;
            }

            tank.LeftTrack.torque =+ tank.Inputs.LeftTrackInput.read(timestamp);
            tank.RightTrack.torque =+ tank.Inputs.RightTrackInput.read(timestamp);

            //tank.moveYSpeed = driveSpeed * tank.Inputs.LeftTrackInput.read(timestamp);
            //tank.moveXSpeed = driveSpeed/2 * tank.Inputs.StrafeInput.read(timestamp);
            //tank.moveAngSpeed = turnSpeed * tank.Inputs.RightTrackInput.read(timestamp);
            tank.Barrel.moveAngSpeed = turnSpeed * tank.Inputs.TurretTurnInput.read(timestamp);
            var fireState = tank.Inputs.FireInput.read(timestamp);
            if(fireState == 1)
                tank.Barrel.firing = true;
            tank.Barrel.recoil = Math.min(fireState, 0);
        });

/*
        var throttle = App.Inputs.ThrottleInput.read(timestamp);
        var turning = App.Inputs.TankTurnInput.read(timestamp);

        if(Math.abs(turning) < 1E-2) {
            Game.Tank.LeftTrack.torque = throttle;
            Game.Tank.RightTrack.torque = throttle;
        } else if(Math.abs(throttle) < 1E-2) {
            Game.Tank.LeftTrack.torque = turning;
            Game.Tank.RightTrack.torque = -turning;
        } else {
            Game.Tank.LeftTrack.torque = (throttle + turning) / 2;
            Game.Tank.RightTrack.torque = (throttle - turning) / 2;
        }
        
        // Game.Tank.LeftTrack.torque = App.Inputs.LeftTrackInput.read(timestamp);
        // Game.Tank.RightTrack.torque = App.Inputs.RightTrackInput.read(timestamp);
        
        //Game.Tank.moveYSpeed = driveSpeed * App.Inputs.LeftTrackInput.read(timestamp);
        //Game.Tank.moveXSpeed = driveSpeed/2 * App.Inputs.StrafeInput.read(timestamp);
        //Game.Tank.moveAngSpeed = turnSpeed * App.Inputs.RightTrackInput.read(timestamp);
        Game.Tank.Barrel.moveAngSpeed = turnSpeed * App.Inputs.TurretTurnInput.read(timestamp);
        var fireState = App.Inputs.FireInput.read(timestamp);
        if(fireState == 1)
            Game.Tank.Barrel.firing = true;
        Game.Tank.Barrel.recoil = Math.min(fireState, 0);*/
    },
    Logic: function(delta) {
        Game.Tanks.forEach(function(tank) {
            //var tank = this.Tank;

            if (Math.abs(tank.LeftTrack.torque) > 1E-02) {
                var back = tank.LeftTrack.torque > 0;
                this.spawnDirt(tank.RightTrack, back, true);
            }

            if (Math.abs(tank.RightTrack.torque) > 1E-02) {
                var back = tank.RightTrack.torque > 0;
                this.spawnDirt(tank.LeftTrack, back, true);
            }

            if (tank.Barrel.firing) {
                this.spawnBullet(tank);
                tank.Barrel.firing = false;
                PlaySound("./sound/tank-fire.wav", 80);
            }
            tank.Barrel.items[0].y = 12 + tank.Barrel.recoil * 6;
            
            if(tank == Game.Tank1)
                this.updateTankGui(tank, "t1");
            if(tank == Game.Tank2)
                this.updateTankGui(tank, "t2");
        }, this);
    },
    updateTankGui: function(tank, prefix){
        for(var i = 1; i<10; i++) {
            l(prefix+'hp'+i).style.backgroundImage = tank.hp < i ? "url('images/hp-cube-off.png')" : "url('images/hp-cube.png')";
        }
        // l(prefix+'tl').style.visibility = tank.Barrel.moveAngSpeed < -1E-6 ? "visible" : "hidden";
        // l(prefix+'tr').style.visibility = tank.Barrel.moveAngSpeed > 1E-6 ? "visible" : "hidden";
        // l(prefix+'lf').style.visibility = tank.LeftTrack.torque > 1E-6 ? "visible" : "hidden";
        // l(prefix+'lb').style.visibility = tank.LeftTrack.torque < -1E-6 ? "visible" : "hidden";
        // l(prefix+'rf').style.visibility = tank.RightTrack.torque > 1E-6 ? "visible" : "hidden";
        // l(prefix+'rb').style.visibility = tank.RightTrack.torque < -1E-6 ? "visible" : "hidden";
    },
}

