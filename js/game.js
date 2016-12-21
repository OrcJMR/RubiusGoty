
var Game = {
    Map: new Map(),
    RootEntity: new ObjectGroup(0, 0, 0, [], [
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png", [new Behavior.TimedLife(5000), new Behavior.Move(0,-0.01,-0.01)]),
    ]),
    Setup: function() {
        this.Tank = new ObjectGroup(450, 140, 90, [new Behavior.MoveTank], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new Box(  0,-12, 0, 12, 8, "darkolivegreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);

        this.Tank1 = new ObjectGroup(40, 140, 90, [new Behavior.MoveTank], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new Box(  0,-12, 0, 12, 8, "darkolivegreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);
        this.Tank2 = new ObjectGroup(250, 140, 90, [new Behavior.MoveTank], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new Box(  0,-12, 0, 12, 8, "darkolivegreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);

        this.RootEntity.addChild(this.Tank1);
        this.Tank1.LeftTrack = this.Tank1.items[0];
        this.Tank1.LeftTrack.torque = 0;
        this.Tank1.RightTrack = this.Tank1.items[1];
        this.Tank1.RightTrack.torque = 0;
        this.Tank1.Barrel = this.Tank1.items[4];
        this.Tank1.Barrel.recoil = 0;
        this.Tank1.width = 32; //this is for collision detection
        this.Tank1.height = 32;
        this.Tank1.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        this.Tank1.class = "tank"

        this.RootEntity.addChild(this.Tank2);
        this.Tank2.LeftTrack = this.Tank2.items[0];
        this.Tank2.LeftTrack.torque = 0;
        this.Tank2.RightTrack = this.Tank2.items[1];
        this.Tank2.RightTrack.torque = 0;
        this.Tank2.Barrel = this.Tank2.items[4];
        this.Tank2.Barrel.recoil = 0;
        this.Tank2.width = 32; //this is for collision detection
        this.Tank2.height = 32;
        this.Tank2.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        this.Tank2.class = "tank"
        this.Tanks = [this.Tank1, this.Tank2, this.Tank];


        this.RootEntity.addChild(this.Tank);
        this.Tank.LeftTrack = this.Tank.items[0];
        this.Tank.LeftTrack.torque = 0;
        this.Tank.RightTrack = this.Tank.items[1];
        this.Tank.RightTrack.torque = 0;
        this.Tank.Barrel = this.Tank.items[4];
        this.Tank.Barrel.recoil = 0;
        this.Tank.width = 32; //this is for collision detection
        this.Tank.height = 32;
        this.Tank.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        this.Tank.class = "tank"



        var tankBot = new Sprite(300, 200, 45, 32, 32, "./images/tank.png", [new Behavior.Move(0,-0.01,-0.01)]);
        tankBot.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        tankBot.class = "tankbot";
        this.RootEntity.addChild(tankBot);

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

            // tank.LeftTrack.torque = tank.Inputs.LeftTrackInput.read(timestamp);
            // tank.RightTrack.torque = tank.Inputs.RightTrackInput.read(timestamp);

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
                var bullet = new Box(0, 20, 0, 3, 5, "orange", [
                    new Behavior.Move(0, 0.5),
                    new Behavior.LifeInBounds(0, 0, 1000, 1000)
                ]);
                bullet.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
                bullet.OnMapCollision = function (x, y) {
                    Game.Map.degradeTile(x, y);
                    this.dead = true;
                    PlaySound("./sound/splat.wav", 100);
                };
                bullet.OnObjectCollision = function(obj){
                    if (obj.class == "tank"){
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
                tank.Barrel.firing = false;
                PlaySound("./sound/tank-fire.wav", 80);
            }
            tank.Barrel.items[0].y = 12 + tank.Barrel.recoil * 6;

            l('t1tl').style.visibility = tank.Barrel.moveAngSpeed < -1E-6 ? "visible" : "hidden";
            l('t1tr').style.visibility = tank.Barrel.moveAngSpeed > 1E-6 ? "visible" : "hidden";
            l('t1lf').style.visibility = tank.LeftTrack.torque > 1E-6 ? "visible" : "hidden";
            l('t1lb').style.visibility = tank.LeftTrack.torque < -1E-6 ? "visible" : "hidden";
            l('t1rf').style.visibility = tank.RightTrack.torque > 1E-6 ? "visible" : "hidden";
            l('t1rb').style.visibility = tank.RightTrack.torque < -1E-6 ? "visible" : "hidden";
        }, this);
    }
}

