
var Game = {
    Map: new Map(),
    RootEntity: new ObjectGroup(0, 0, 0, [], [
        new Sprite(100, 100, 45, 32, 32, "./images/tank.png", [new Behavior.TimedLife(5000), new Behavior.Move(0,-0.01,-0.01)]),
    ]),
    Setup: function() {
        this.Tank = new ObjectGroup(200, 150, 180, [new Behavior.MoveTank], [
            new Box(-12,  0, 0,  8, 32, "brown"),
            new Box( 12,  0, 0,  8, 32, "brown"),
            new Box(  0,  0, 0, 24, 24, "green"),
            new Box(  0,-12, 0, 12, 8, "darkolivegreen"),
            new ObjectGroup(0, 0, 0, [new Behavior.Move], [
                new Box(  0, 12, 0,  4, 24, "black")
            ])
        ]);
        this.RootEntity.addChild(this.Tank);
        this.Tank.LeftTrack = this.Tank.items[0];
        this.Tank.LeftTrack.torque = 0;
        this.Tank.RightTrack = this.Tank.items[1];
        this.Tank.RightTrack.torque = 0;
        this.Tank.Barrel = this.Tank.items[4];
        this.Tank.Barrel.recoil = 0;
        this.Tank.width = 32; //this is for collision detection
        this.Tank.height = 32;
        this.Tank.collider = new Collider(this.Map, "B");
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
        Game.Tank.Barrel.recoil = Math.min(fireState, 0);
    },
    Logic: function(delta) {
        
        if( Math.abs(this.Tank.LeftTrack.torque) > 1E-02) {
            var back = this.Tank.LeftTrack.torque > 0;
            this.spawnDirt(this.Tank.RightTrack, back, true);
        }

        if( Math.abs(this.Tank.RightTrack.torque) > 1E-02) {
            var back = this.Tank.RightTrack.torque > 0;
            this.spawnDirt(this.Tank.LeftTrack, back, true);
        }
        
        if( this.Tank.Barrel.firing) {
            var bullet = new Box(0, 20, 0, 3, 5, "orange", [
                new Behavior.Move(0, 0.5), 
                new Behavior.LifeInBounds(0,0,1000,1000)
            ]);
            bullet.collider = new Collider(this.Map, "B");
            bullet.OnCollision = function(x, y){
                Game.Map.degradeTile(x, y);
                this.dead = true;
                PlaySound("./sound/splat.wav", 100);
            };

            this.RootEntity.changeCoordinatesFromDescendant(bullet, this.Tank.Barrel);
            this.RootEntity.addChild(bullet);
            this.Tank.Barrel.firing = false;
            PlaySound("./sound/tank-fire.wav", 80);
        }
        this.Tank.Barrel.items[0].y = 12 + this.Tank.Barrel.recoil * 6;

        l('t1tl').style.visibility = Game.Tank.Barrel.moveAngSpeed < -1E-6 ? "visible" : "hidden";
        l('t1tr').style.visibility = Game.Tank.Barrel.moveAngSpeed > 1E-6 ? "visible" : "hidden";
        l('t1lf').style.visibility = Game.Tank.LeftTrack.torque > 1E-6 ? "visible" : "hidden";
        l('t1lb').style.visibility = Game.Tank.LeftTrack.torque < -1E-6 ? "visible" : "hidden";
        l('t1rf').style.visibility = Game.Tank.RightTrack.torque > 1E-6 ? "visible" : "hidden";
        l('t1rb').style.visibility = Game.Tank.RightTrack.torque < -1E-6 ? "visible" : "hidden";
    }
}

