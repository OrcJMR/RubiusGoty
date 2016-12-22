
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
        this.Tank1 = this.spawnTank(80, 752 - 80, 180, "1", 0);
        this.RootEntity.addChild(this.Tank1);
    },
    spawnTank2: function() {
        this.Tank2 = this.spawnTank(1008 - 80, 752 - 80, 180, "2", 1);
        this.RootEntity.addChild(this.Tank2);
    },
    spawnTankDefault: function() {
        //this.Tank = this.spawnTank(80, 600, 0, "dimgray", 30); // right before enemy
        this.Tank = this.spawnTank(504, 80, 0, "boss", -1);
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
    spawnTank: function(x, y, angle, type, networkTeamId) {
        var tank;
        if(type == "boss")
            tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
                new ObjectGroup(0, 22, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 26, 26, "./images/tank-head.png")
                ]),
                new Sprite(-18, -1, 0,  10, 38, "./images/tank-track.png", [new Behavior.Animate(5, 2)]),
                new Sprite( 18, -1, 0,  10, 38, "./images/tank-track.png", [new Behavior.Animate(5, 2)]),
                new Sprite(  0,-0.5, 180, 42, 48, "./images/tank-body.png"),
                //new Box(  0,-12, 0, 12, 8, "darkgreen"),
                new ObjectGroup(0,0.5, 0, [new Behavior.Move], [
                    new Sprite( 0, 7, 180,  22, 36, "./images/tank-turret.png")
                ])
            ]);
        else
            tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
                new Sprite(-11, -1, 0,  10, 30, "./images/tank-track-small.png", [new Behavior.Animate(5, 2)]),
                new Sprite( 11, -1, 0,  10, 30, "./images/tank-track-small.png", [new Behavior.Animate(5, 2)]),
                new Sprite(  0,  1, 180, 24, 34, "./images/tank-body-small-"+type+".png"),
                new ObjectGroup(0, -2, 0, [new Behavior.Move], [
                    new Sprite( 0, 7, 180,  18, 38, "./images/tank-turret-small.png")
                ])
            ]);
        tank.boss = type == "boss";
        var offset = tank.boss ? 1 : 0;
        tank.hp = 9;
        tank.LeftTrack = tank.items[offset];
        tank.LeftTrack.torque = 0;
        tank.RightTrack = tank.items[offset+1];
        tank.RightTrack.torque = 0;
        tank.Barrel = tank.items[offset+3];
        tank.Barrel.recoil = 0;
        if(tank.boss)
            tank.Head = tank.items[0];

        tank.width = tank.boss ? 48 : 32; //this is for collision detection
        tank.height = tank.width;
        tank.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank", "tankbot"]);
        tank.class = "tank";
        if(networkTeamId >= 0) {
        var viewModelFunction = function() {
            if (!Sockets.ViewModel.teams)
                return null;

            if (Sockets.ViewModel.teams.length <= networkTeamId)
                return null;

            return Sockets.ViewModel.teams[networkTeamId];
        };

        var managerGoodInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerGood'), '2', 10000, true);
        var managerBadInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerBad'), '2', 10000, true);
        setInterval(function() {
            var replics = null;
            if (managerGoodInput.read(new Date().getTime())== 1) {
                replics = _managerGoodReplics;
            } else if (managerBadInput.read(new Date().getTime())== 1) {
                replics = _managerBadReplics;
            }
            if (replics) {
                var replicId =  Math.floor(Math.random() * replics.length);
                var replic = replics[replicId];
                var div = $('<div style="position: absolute;" class="blue-frame">'+replic+'</div>');
                div.appendTo($('body'));
                div.offset({ top: tank.y + 10, left: tank.x + 10 });

                var width = Game.Map.width * Game.Map.tileWidth;
                var height = Game.Map.height * Game.Map.tileHeight;
                var divRight = div.width() + div.position().left;
                var divBottom = div.height() + div.position().top;
                var diffX = 0;
                if (divRight > width)
                    diffX = divRight - width;
                var diffY = 0;
                if (divBottom > height)
                    diffY = divBottom - height;
                div.offset({ top: div.position().top - diffY, left: div.position().left - diffX });

                setTimeout(function () {
                    div.remove();
                },5000);
            }
        }, 200);
        tank.Inputs = {};
        tank.Inputs.ThrottleInput = new NetworkBiDiInput(viewModelFunction, 'moveForward', 'moveBackward');
        tank.Inputs.TankTurnInput = new NetworkBiDiInput(viewModelFunction, 'turnRight', 'turnLeft');
        tank.Inputs.LeftTrackInput = new NetworkBiDiInput(viewModelFunction, 'leftTrackForward', 'leftTrackBackward');
        tank.Inputs.RightTrackInput = new NetworkBiDiInput(viewModelFunction, 'rightTrackForward', 'rightTrackBackward');
        //tank.Inputs.StrafeInput = new NetworkBiDiInput(viewModelFunction, 'strafeRight', 'strafeLeft');
        tank.Inputs.TurretTurnInput = new NetworkBiDiInput(viewModelFunction, 'turretLeft', 'turretRight');
        tank.Inputs.FireInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'fire'), '2', 600, true);
        }


        //todo fix loop sound gap problem
        //tank.throttleSound = PlaySound('./sound/engine working.mp3', 100, 1, type);
        //tank.idleSound = PlaySound('./sound/engine working2.mp3', 0, 1, type);

        tank.setMovementSound = function(throttle){
            // if (throttle == 0){
            //     this.throttleSound.volume = 0;
            //     this.idleSound.volume = 0.8;
            // } else{
            //     this.throttleSound.volume = 0.8;
            //     this.idleSound.volume = 0;
            // }
        }

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
        var bullet = new ObjectGroup(0, 20, 0, [
            new Behavior.Move(0, 0.3),
            new Behavior.LifeInBounds(0, 0, 1000, 1000)
            ],[
            new Box(0, 0, 0, 5, 7, "black"),
            new Box(0, 0, 0, 3, 5, "orange")            
        ]);
        bullet.owner = tank;
        bullet.width = 3;
        bullet.height = 5;
        bullet.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank", "tankbot"]);
        bullet.OnMapCollision = function (x, y) {
            Game.spawnExplosion(this.x, this.y);
            Game.Map.degradeTile(x, y);
            this.dead = true;
            PlaySound("./sound/splat.wav", 100);
        };
        bullet.OnObjectCollision = function(obj){
            Game.spawnExplosion(this.x, this.y);
            if (obj.class == "tank"){
                obj.hp -= 1;
                if(obj.hp == 0) {
                    obj.addBehavior(new Behavior.TimedLife(3000));
                    obj.addBehavior(new Behavior.SpawnExplosions(200, 10));
                    obj.items[2].color = "black";
                    if(obj == Game.Tank1)
                        Game.spawnTank1();
                    if(obj == Game.Tank2)
                        Game.spawnTank2();
                    if(obj == Game.Tank)
                        Game.spawnTankDefault();
                    Game.Tanks = [Game.Tank1, Game.Tank2, Game.Tank];
                }
                obj.moveXSpeed = 0;
                obj.moveYSpeed = 0;
                obj.moveAngSpeed = 0;
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
    spawnMuzzleBlast: function(tank, big) {
        big = big || false;
        var blast = new Sprite(0, big ? 16 : 22, 180, 34, 62, "./images/" + (big?"big-":"") + "tank-fire.png", [new Behavior.Animate(17, 6, 50), new Behavior.TimedLife(299)]);
        tank.changeCoordinatesFromDescendant(blast, tank.Barrel);
        tank.addChild(blast);
    },
    spawnExplosion: function(x, y, size) {
        if(!size)
            size = 24
        var blast = new Sprite(x, y, Math.random()*90, size, size, "./images/explosion.png", [new Behavior.Animate(18, 8, 50), new Behavior.TimedLife(399)]);
        Game.RootEntity.addChild(blast);
        PlaySound("./sound/tank-fire.wav", 100);
    },
    ConsumeInputs: function(timestamp) {
        var driveSpeed = 60/1000; //px/msec
        var turnSpeed = 90/1000; //deg/msec

        Game.Tanks.forEach(function(tank) {

            var throttle = tank.Inputs.ThrottleInput.read(timestamp);
            var turning = tank.Inputs.TankTurnInput.read(timestamp);

            tank.setMovementSound(throttle);

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

            tank.LeftTrack.torque += tank.Inputs.LeftTrackInput.read(timestamp);
            tank.RightTrack.torque += tank.Inputs.RightTrackInput.read(timestamp);

            // torques are stored in wrong tracks
            tank.LeftTrack.animDelay = tank.RightTrack.torque == 0 ? 0 : 100;
            tank.RightTrack.animDelay = tank.LeftTrack.torque == 0 ? 0 : 100;
            
            //tank.moveYSpeed = driveSpeed * tank.Inputs.LeftTrackInput.read(timestamp);
            //tank.moveXSpeed = driveSpeed/2 * tank.Inputs.StrafeInput.read(timestamp);
            //tank.moveAngSpeed = turnSpeed * tank.Inputs.RightTrackInput.read(timestamp);
            tank.Barrel.moveAngSpeed = turnSpeed * tank.Inputs.TurretTurnInput.read(timestamp);
            var fireState = tank.Inputs.FireInput.read(timestamp);
            if(fireState == 1)
                tank.Barrel.firing = true;
            if(!tank.boss)
                tank.Barrel.recoil = Math.min(fireState, 0);
        });
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
                this.spawnMuzzleBlast(tank, tank.boss);
                tank.Barrel.firing = false;
                PlaySound("./sound/tank-fire.wav", 80);
            }
            tank.Barrel.items[0].y = 7 + tank.Barrel.recoil * 6;

            if(tank.boss) {
                tank.Head.angle = tank.Barrel.angle / 4 - Math.PI / 2;
                if(tank.Head.angle < -Math.PI / 4) tank.Head.angle += Math.PI / 2;
            }

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

