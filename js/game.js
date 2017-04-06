var Game = {
    Map: new Map(),
    RootEntity: new ObjectGroup(0, 0, 0, [], []),
    Teams: [],
    Setup: function () {
        this.Teams.push(this.SetupTeam("1", 0, 72, 640, 180, 1000));
        this.Teams.push(this.SetupTeam("2", 1, 520, 64, 0, 1500));
        this.Teams.push(this.SetupTeam("3", 2, 1008 - 40, 640, 180, 2000));
        this.Teams.push(this.SetupTeam("boss", -1, 520, 736, 180, 0));
        //this.Teams.push(this.SetupTeam("boss", -1, 520, 300, 180, 0));

        // var tankBot = new Sprite(300, 200, 45, 32, 32, "./images/tank.png", [new Behavior.Move(0,-0.01,-0.01)]);
        // tankBot.collider = new Collider(this.Map, "B", this.RootEntity, ["tank", "tankbot"]);
        // tankBot.class = "tankbot";
        // this.RootEntity.addChild(tankBot);

    },
    SetupTeam: function(name, networkIndex, spawnX, spawnY, spawnAngle, spawnCountdown) {
        if(typeof spawnCountdown == 'undefined')
            spawnCountdown = -1; // never
        var team = {
            teamId: networkIndex,
            name: name,
            spawnX: spawnX,
            spawnY: spawnY,
            spawnAngle: spawnAngle,
            kills: 0,
            deaths: 0,
            Inputs: {},
            tanksSpawnsIn: spawnCountdown,
            SpawnTank: function() {
                this.Tank = Game.spawnTank(this.spawnX, this.spawnY, this.spawnAngle, this.name, this.networkIndex);
                Game.RootEntity.addChild(this.Tank);
            }            
        };
        if(name == "boss") {
            team.Inputs.ThrottleInput = new KeyboardBiDiInput(App.Keyboard, 'W', 'S');
            team.Inputs.TankTurnInput = new KeyboardBiDiInput(App.Keyboard, 'D', 'A');
            // team.Inputs.LeftTrackInput = new KeyboardBiDiInput(App.Keyboard, 'Q', 'Z');
            // team.Inputs.RightTrackInput = new KeyboardBiDiInput(App.Keyboard, 'E', 'C');
            team.Inputs.TurretTurnInput = new KeyboardBiDiInput(App.Keyboard, 'L', 'J');
            team.Inputs.FireInput = new KeyboardCooldownInput(App.Keyboard, 'I', 400, false);
        } else {
            if(team.teamId < 0)
                throw "Misconfigured team";
            var viewModelFunction = function () {
                if (!Sockets.ViewModel.teams)
                    return null;
                if (Sockets.ViewModel.teams.length <= team.teamId)
                    return null;
                return Sockets.ViewModel.teams[team.teamId];
            };
            team.Inputs.ThrottleInput = new NetworkBiDiInput(viewModelFunction, 'moveForward', 'moveBackward', 'move1', 'move2');
            team.Inputs.TankTurnInput = new NetworkBiDiInput(viewModelFunction, 'turnRight', 'turnLeft', 'turn2', 'turn1');
            // team.Inputs.LeftTrackInput = new NetworkBiDiInput(viewModelFunction, 'leftTrackForward', 'leftTrackBackward');
            // team.Inputs.RightTrackInput = new NetworkBiDiInput(viewModelFunction, 'rightTrackForward', 'rightTrackBackward');
            team.Inputs.TurretTurnInput = new NetworkBiDiInput(viewModelFunction, 'turretRight', 'turretLeft', 'turret');
            team.Inputs.FireInput = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'fire', 'fire'), '2', 800, true);
            team.Inputs.ManagerGood = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerGood', 'manager'), '2', 5000, true);
            team.Inputs.ManagerBad = new KeyboardCooldownInput(new NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerBad', 'manager'), '2', 5000, true);
        }
        return team;
    },
    spawnTank: function (x, y, angle, type, networkTeamId) {
        var tank;
        if (type == "boss")
            tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
                new ObjectGroup(0, 22, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 26, 26, "./images/tank-head.png")
                ]),
                new Sprite(-18, -1, 0, 10, 38, "./images/tank-track.png", [new Behavior.Animate(5, 2)]),
                new Sprite(18, -1, 0, 10, 38, "./images/tank-track.png", [new Behavior.Animate(5, 2)]),
                new Sprite(0, -0.5, 180, 42, 48, "./images/tank-body.png"),
                //new Box(  0,-12, 0, 12, 8, "darkgreen"),
                new ObjectGroup(0, 0.5, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 22, 36, "./images/tank-turret.png")
                ])
            ]);
        else
            tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
                new Sprite(-11, -1, 0, 10, 30, "./images/tank-track-small.png", [new Behavior.Animate(5, 2)]),
                new Sprite(11, -1, 0, 10, 30, "./images/tank-track-small.png", [new Behavior.Animate(5, 2)]),
                new Sprite(0, 1, 180, 24, 34, "./images/tank-body-small-" + type + ".png"),
                new ObjectGroup(0, -2, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 18, 38, "./images/tank-turret-small.png")
                ])
            ]);
        tank.boss = type == "boss";
        if (tank.boss) tank.hidden = true;
        var offset = tank.boss ? 1 : 0;
        tank.hp = 9;
        tank.LeftTrack = tank.items[offset];
        tank.LeftTrack.torque = 0;
        tank.RightTrack = tank.items[offset + 1];
        tank.RightTrack.torque = 0;
        tank.Barrel = tank.items[offset + 3];
        tank.Barrel.recoil = 0;
        if (tank.boss)
            tank.Head = tank.items[0];

        tank.width = tank.boss ? 48 : 32; //this is for collision detection
        tank.height = tank.width;
        tank.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank", "tankbot"]);
        tank.class = "tank";

        //todo fix loop sound gap problem
        tank.throttleSound = Sound.Play('./sound/engine working long.mp3', 0, 1, type);
        //tank.idleSound = PlaySound('./sound/engine working2.mp3', 0, 1, type);

        tank.started = false;

        tank.setMovementSound = function (throttle) {
            if (this.speed == 0 && !this.started) return;

            this.started = true;

            var v = Math.max(
                0.05 + Math.abs(this.speed * 1 / this.maxSpeed),
                0.05 + Math.abs(this.rotationSpeed * 0.6 / this.maxRotationSpeed)
            );

            if (v > 1) v = 1;
            this.throttleSound.volume = v;
        }

        return tank;
    },
    spawnDirt: function (parent, back, move) {
        var sign = back ? -1 : 1;
        var offset = move ? 14 : 14;
        var speed = move ? -0.03 : -0.05;
        var rnd = Math.random() / 2 + 0.5;
        var dirt = new Box(-3 + Math.random() * 6, offset * sign, 160 + Math.random() * 40, 3, 3, "darkgoldenrod", [
            new Behavior.Move,
            new Behavior.TimedLife(300),
            new Behavior.Custom(function () {
                this.alpha = this.lifeTimeout / 100;
                this.moveYSpeed = this.lifeTimeout / 300 * rnd * speed * sign;
            })
        ]);
        this.RootEntity.changeCoordinatesFromDescendant(dirt, parent);
        this.RootEntity.addChild(dirt, 0);
    },
    spawnBullet: function (tank) {
        var bullet = new ObjectGroup(0, 20, 0, [
            new Behavior.Move(0, 0.3),
            new Behavior.LifeInBounds(-8, -8, 1032, 856)
        ], [
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
            //PlaySound("./sound/splat.wav", 100);
        };
        bullet.OnObjectCollision = function (obj) {
            Game.spawnExplosion(this.x, this.y, null, obj.class == "tank" ? "tank" : null);
            if (obj.class == "tank") {
                var tank = obj;
                tank.hp -= 1;
                if (tank.hp == 0) {
                    tank.addBehavior(new Behavior.TimedLife(3000));
                    tank.addBehavior(new Behavior.SpawnExplosions(200, 10));
                    tank.Barrel.dead = true;
                    tank.Barrel = null;
                    // tank.items[2].color = "black";
                    for(var i in Game.Teams) {
                        var team = Game.Teams[i];
                        if(tank == team.Tank) {
                            team.Tank = null;
                            team.tanksSpawnsIn = 2500;
                        }
                    }
                }
                // obj.moveXSpeed = 0;
                // obj.moveYSpeed = 0;
                // obj.moveAngSpeed = 0;
            }
            // if (obj.class == "tankbot") {
            //     obj.moveXSpeed /= 3;
            //     obj.moveYSpeed /= 3;
            //     obj.moveAngSpeed /= 3;
            //     obj.class = "deadtankbot";
            //     if (obj.setImage) {
            //         obj.setImage("./images/deadtank.png");
            //     }
            //     obj.addBehavior(new Behavior.TimedLife(3000));
            // }
            this.dead = true;
            //PlaySound("./sound/splat.wav", 100);
        }

        this.RootEntity.changeCoordinatesFromDescendant(bullet, tank.Barrel);
        this.RootEntity.addChild(bullet);
    },
    spawnMuzzleBlast: function (tank, big) {
        big = big || false;
        var blast = new Sprite(0, big ? 16 : 22, 180, 34, 62, "./images/" + (big ? "big-" : "") + "tank-fire.png", [new Behavior.Animate(17, 6, 50), new Behavior.TimedLife(299)]);
        tank.changeCoordinatesFromDescendant(blast, tank.Barrel);
        tank.addChild(blast);
    },
    spawnExplosion: function (x, y, size, type) {
        if (!size)
            size = 24
        var blast = new Sprite(x, y, Math.random() * 90, size, size, "./images/explosion.png", [new Behavior.Animate(18, 8, 50), new Behavior.TimedLife(399)]);
        Game.RootEntity.addChild(blast);

        if (type == "echo") {
            Sound.Play("./sound/longblast.mp3", 100);
        } else if (type == "tank") {
            Sound.Play("./sound/tank-fire.wav", 100);
        } else {
            if (Math.random() < 0.5)
                Sound.Play("./sound/blast1.mp3", 100);
            else
                Sound.Play("./sound/blast2.mp3", 100);
        }
    },
    showBalloonMessage: function (tank, message) {
        if (!message || tank.baloonShown)
            return;

        tank.baloonShown = true;
        var div = $('<div style="position: absolute;" class="balloon-frame"><div class="balloon-frame-inner">' + message + '</div></div>');
        div.appendTo($('body'));
        div.offset({top: tank.y + 10, left: tank.x + 10});

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
        div.offset({top: div.position().top - diffY, left: div.position().left - diffX});

        setTimeout(function () {
            div.remove();
            tank.baloonShown = false;
        }, 5000);
    },
    ConsumeInputs: function (timestamp) {
        var driveSpeed = 60 / 1000; //px/msec
        var turnSpeed = 90 / 1000; //deg/msec

        Game.Teams.forEach(function (team) {
            if(!team.Tank)
                return;
            var tank = team.Tank;

            var throttle = team.Inputs.ThrottleInput.read(timestamp);
            var turning = team.Inputs.TankTurnInput.read(timestamp);

            tank.setMovementSound(throttle);

            if (Math.abs(turning) < 1E-2) {
                tank.LeftTrack.torque = throttle;
                tank.RightTrack.torque = throttle;
            } else if (Math.abs(throttle) < 1E-2) {
                tank.LeftTrack.torque = turning;
                tank.RightTrack.torque = -turning;
            } else {
                tank.LeftTrack.torque = (throttle + turning) / 2;
                tank.RightTrack.torque = (throttle - turning) / 2;
            }

            // tank.LeftTrack.torque += team.Inputs.LeftTrackInput.read(timestamp);
            // tank.RightTrack.torque += team.Inputs.RightTrackInput.read(timestamp);

            // torques are stored in wrong tracks
            tank.LeftTrack.animDelay = tank.RightTrack.torque == 0 ? 0 : 100;
            tank.RightTrack.animDelay = tank.LeftTrack.torque == 0 ? 0 : 100;

            //tank.moveYSpeed = driveSpeed * tank.Inputs.LeftTrackInput.read(timestamp);
            //tank.moveXSpeed = driveSpeed/2 * tank.Inputs.StrafeInput.read(timestamp);
            //tank.moveAngSpeed = turnSpeed * tank.Inputs.RightTrackInput.read(timestamp);
            tank.Barrel.moveAngSpeed = turnSpeed * 0.75 * team.Inputs.TurretTurnInput.read(timestamp);
            var fireState = team.Inputs.FireInput.read(timestamp);
            if (fireState == 1)
                tank.Barrel.firing = true;
            if (!tank.boss)
                tank.Barrel.recoil = Math.min(fireState, 0);

            var phrases = null;
            if (team.Inputs.ManagerGood && (team.Inputs.ManagerGood.read(timestamp) == 1)) {
                phrases = Res.ManagerGoodPhrases;
            } else if (team.Inputs.ManagerBad && (team.Inputs.ManagerBad.read(timestamp) == 1)) {
                phrases = Res.ManagerBadPhrases;
            }
            if (phrases) {
                var phraseId =  Math.floor(Math.random() * phrases.length);
                var phrase = phrases[phraseId];
                Game.showBalloonMessage(tank, phrase);
            }
        });
    },
    Logic: function (delta) {
        Game.Teams.forEach(function (team) {
            if(!team.Tank) {
                // if already <0, abort and never spawn
                if(team.tanksSpawnsIn < 0)
                    return;
                else {
                    team.tanksSpawnsIn -= delta;
                    if(team.tanksSpawnsIn <= 0)
                        team.SpawnTank();
                }
            } else { // if can has tank
                var tank = team.Tank;

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

                    if (tank.boss) {
                        Sound.Play("./sound/shot3.mp3", 100);
                    } else {
                        Sound.Play("./sound/shot2.mp3", 80);
                    }
                }
                tank.Barrel.items[0].y = 7 + tank.Barrel.recoil * 6;

                if (tank.boss) {
                    tank.Head.angle = tank.Barrel.angle / 4 - Math.PI / 2;
                    if (tank.Head.angle < -Math.PI / 4) tank.Head.angle += Math.PI / 2;
                }
            }
        }, this);
    },
}

