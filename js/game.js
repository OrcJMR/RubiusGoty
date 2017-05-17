var Game = {
    Map: new Map(),
    RootEntity: new ObjectGroup(0, 0, 0, [], []),
    GuiEntity: new ObjectGroup(0, 0, 0, [], []),
    Teams: [],
    Setup: function () {
        this.Teams.push(this.SetupTeam("1", 0, 72, 640, 180, 1400));
        this.Teams.push(this.SetupTeam("2", 1, 520, 64, 0, 2300));
        this.Teams.push(this.SetupTeam("3", 2, 1008 - 40, 640, 180, 3200));
        this.Teams.push(this.SetupTeam("boss", -1, 520, 736, 180, 0));
        //this.Teams.push(this.SetupTeam("boss", -1, 520, 300, 180, 0));

        //this.ScrapeSound = Sound.Play("./sound/metal-scrape.mp3", 0, true);
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
            team.Inputs.ThrottleInput = new NetworkBiDiInput(viewModelFunction, 'moveForward', 'moveBackward', 'move1');
            team.Inputs.TankTurnInput = new NetworkBiDiInput(viewModelFunction, 'turnRight', 'turnLeft', 'turn1');
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
                    new Sprite(0, 7, 180, 26, 26, App.Images.tankHead)
                ]),
                new Sprite(-18, -1, 0, 10, 38, App.Images.tankTrack, [new Behavior.Animate(5, 2)]),
                new Sprite(18, -1, 0, 10, 38, App.Images.tankTrack, [new Behavior.Animate(5, 2)]),
                new Sprite(0, -0.5, 180, 42, 48, App.Images.tankBody),
                //new Box(  0,-12, 0, 12, 8, "darkgreen"),
                new ObjectGroup(0, 0.5, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 22, 36, App.Images.tankTurret)
                ])
            ]);
        else
            tank = new ObjectGroup(x, y, angle, [new Behavior.MoveTank], [
                new Sprite(-11, -1, 0, 10, 30, App.Images.tankTrackSmall, [new Behavior.Animate(5, 2)]),
                new Sprite(11, -1, 0, 10, 30, App.Images.tankTrackSmall, [new Behavior.Animate(5, 2)]),
                new Sprite(0, 1, 180, 24, 34, App.Images["tankBodySmall" + type]),
                new ObjectGroup(0, -2, 0, [new Behavior.Move], [
                    new Sprite(0, 7, 180, 18, 38, App.Images.tankTurretSmall)
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
        if (tank.boss) {
            tank.Head = tank.items[0];
            tank.width = 48; // this is for collision detection
            tank.height = 44;
        } else {
            tank.width = 32; // this is for collision detection
            tank.height = 32;
        }
        tank.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank"]);
        tank.class = "tank";

        //todo fix loop sound gap problem
        tank.throttleSound = Sound.Play('./sound/engine working long.mp3', 0, true, type);

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
    sparksCooldown: 0,
    spawnSparks: function (points) {
        var i = 0;
        while (this.sparksCooldown > 0) {
            var p = points[i];
            var speed = Math.random() * 0.06;
            var color = '#FFFF' + (0x100 + Math.random() * 0xFF).toString(16).substr(1,2); 
            var spark = new Box(p.x, p.y, Math.random() * 360, 2, 3, color, [
                new Behavior.Move,
                new Behavior.TimedLife(300),
                new Behavior.Custom(function () {
                    this.alpha = this.lifeTimeout / 100;
                })
            ]);
            spark.moveYSpeed = speed;
            this.RootEntity.addChild(spark);

            this.sparksCooldown -= 10;
            i++;
            if (i == points.length)
                i = 0;
        }
    },
    powerupTimings: {
        h: {period:10000, cooldown:10000},
        M: {period:30000, cooldown:30000},
    },
    spawnBonus: function (key) {
        var points = this.Map.powerupPoints[key];
        var i = Math.floor(Math.random() * points.length);
        if(points[i].powerup)
            return;
        var sprite;
        var angle;
        if(key == 'h') {
            key = 'hp',
            sprite = App.Images.bonusHp;
            angle = 0;
        } else if (Math.random() < 0.5) {
            key = 'damage';
            sprite = App.Images.bonusDamage;
            angle = 0;
        } else {
            key = 'speed';
            sprite = App.Images.arrowChevron;
            angle = 90;
        }
        var bonus = new Sprite(points[i].x * this.Map.tileWidth, points[i].y * this.Map.tileHeight, angle, 24, 24,
            sprite, [new Behavior.Move(), new Behavior.Wobble(10, 1, 0.1, 3)]);
        bonus.class = 'pickup';
        bonus.effectType = key;
        points[i].powerup = bonus;
        bonus.spawn = points[i];

        bonus.collider = new Collider(this.Map, null, this.RootEntity, ["tank"]);
        bonus.OnObjectCollision = function (obj) {
            var flashSprite = bonus.effectType === "hp" ? App.Images.heal : App.Images.flash;
            // let's try pickup flash on tank itself
            var flash = new Sprite(0, 0, Math.random() * 360, 60, 60, flashSprite, [
                new Behavior.Animate(40, 8, 70), 
                new Behavior.TimedLife(539)
            ]);
            obj.addChild(flash);

            Sound.Play("./sound/bonus.ogg", 100);
            if (obj.class == "tank") {
                if (this.effectType === "hp") {
                    obj.hp = Math.min(obj.hp + 2, 9);
                } else if (this.effectType === "damage") {
                    obj.damageBonusTime = 30000;
                    if (obj.Head) obj.Head.items[0].imageGlow = true;
                    if (obj.Barrel) obj.Barrel.items[0].imageGlow = true;
                    obj.damageBonusEnd = function() {
                        delete this.damageBonusTime;
                        if (this.Head) delete this.Head.items[0].imageGlow;
                        if (this.Barrel) delete this.Barrel.items[0].imageGlow;
                    }
                } else if(this.effectType === "speed") {
                    obj.speedBonusTime = 30000;
                    obj.RightTrack.imageGlow = true;
                    obj.LeftTrack.imageGlow = true;
                    obj.speedBonusEnd = function() {
                        delete this.speedBonusTime;
                        delete this.RightTrack.imageGlow;
                        delete this.LeftTrack.imageGlow;
                    }                    
                }
            }
            this.spawn.powerup = null;
            this.dead = true;
        }
        Game.RootEntity.addChild(bonus);
        this.spawnFlash(bonus.x, bonus.y, 60);
    },
    spawnBullet: function (tank, team) {
        var damage = 1;
        if (tank.damageBonusTime) {
            damage = 2;
        }
        var bullet = new ObjectGroup(0, 20, 0, [
            new Behavior.Move(0, 0.3),
            new Behavior.LifeInBounds(-8, -8, 1032, 856)
        ], [
            new Box(0, 0, 0, 3 + damage*2, 4 + damage*3, "black"),
            new Box(0, 0, 0, 1 + damage*2, 2 + damage*3, damage>1 ? "yellow" : "orange")
        ]);
        bullet.owner = tank;
        bullet.width = 1 + damage*2;
        bullet.height = 2 + damage*3;
        bullet.collider = new Collider(this.Map, "BS", this.RootEntity, ["tank"]);
        bullet.OnMapCollision = function (x, y) {
            Game.spawnExplosion(this.x, this.y, 12 + damage*12);
            Game.Map.degradeTile(x, y);
            this.dead = true;
        };
        var ourTeam = team;
        bullet.OnObjectCollision = function (obj) {
            Game.spawnExplosion(this.x, this.y, 12 + damage*12, obj.class == "tank" ? "tank" : null);
            if (obj.class == "tank") {
                var tank = obj;
                tank.hp = Math.max(0, tank.hp - damage);
                if (tank.hp <= 0) {
                    ourTeam.kills ++;
                    ourTeam.popKills = true;
                    tank.addBehavior(new Behavior.TimedLife(3000));
                    tank.addBehavior(new Behavior.SpawnExplosions(200, 10));
                    tank.Barrel.dead = true;
                    tank.Barrel = null;
                    for(var i in Game.Teams) {
                        var team = Game.Teams[i];
                        if(tank == team.Tank) {
                            team.Tank = null;
                            team.tanksSpawnsIn = 2500;
                        }
                    }
                }
                tank.LeftTrack.torque = 0;
                tank.RightTrack.torque = 0;
                tank.LeftTrack.animDelay = 0;
                tank.RightTrack.animDelay = 0;
            }
            this.dead = true;
        }

        this.RootEntity.changeCoordinatesFromDescendant(bullet, tank.Barrel);
        this.RootEntity.addChild(bullet);
    },
    spawnMuzzleBlast: function (tank, big) {
        big = big || false;
        var blast = new Sprite(0, big ? 16 : 22, 180, 34, 62, big ? App.Images.tankFireBig : App.Images.tankFire, [new Behavior.Animate(17, 6, 50), new Behavior.TimedLife(299)]);
        tank.changeCoordinatesFromDescendant(blast, tank.Barrel);
        tank.addChild(blast);
    },
    spawnExplosion: function (x, y, size, type) {
        if (!size)
            size = 24
        var blast = new Sprite(x, y, Math.random() * 90, size, size, App.Images.explosion, [new Behavior.Animate(18, 8, 50), new Behavior.TimedLife(399)]);
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
    spawnFlash: function (x, y, size) {
        if (!size)
            size = 40
        var flash = new Sprite(x, y, Math.random() * 360, size, size, App.Images.flash, [new Behavior.Animate(40, 8, 70), new Behavior.TimedLife(539)]);
        Game.RootEntity.addChild(flash);

        Sound.Play("./sound/spawn.ogg", 100);
    },
    showBalloonMessage: function (tank, message) {
        var tanks = [];
        this.Teams.forEach(function(team) {
            if(team.Tank && team.Tank != tank)
                tanks.push(team.Tank);
        });
        var newBalloon = new Balloon(message, [
            new Behavior.PositionBalloon(tank, tanks, 8, 8, 1032, 776), // 688 height?
            new Behavior.TimedLife(6000, 300, 600)]);
        
        // soft-kill the previous balloon for same tank
        for (var i = 0; i < this.GuiEntity.items.length; i++) {
            var oldBalloon = this.GuiEntity.items[i];
            if (oldBalloon.balloonTank == tank)
                oldBalloon.lifeTimeout = oldBalloon.lifeDieTimeout || 0;
        }
        this.GuiEntity.addChild(newBalloon);
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

            // torques are stored in wrong tracks
            tank.LeftTrack.animDelay = tank.RightTrack.torque == 0 ? 0 : 100;
            tank.RightTrack.animDelay = tank.LeftTrack.torque == 0 ? 0 : 100;

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
    //scrapeDetected: false,
    Logic: function (delta) {

        if (this.sparksCooldown < 100) {
            this.sparksCooldown += delta;
            if (this.sparksCooldown > 100)
                this.sparksCooldown == 100;
        }

        this.bonusCooldown -= delta;
        if (this.bonusCooldown < 0) {
            this.spawnBonus();
            this.bonusCooldown = 10000;
        }

        this.Teams.forEach(function (team) {

            if (team.popKillsTime >= 0)
                team.popKillsTime += delta;
            if (team.popKills) {
                team.popKillsTime = 0;
                team.popKills = false;
            }

            if(!team.Tank) {
                // if already <0, abort and never spawn
                if(team.tanksSpawnsIn < 0)
                    return;
                else {
                    team.tanksSpawnsIn -= delta;
                    if(team.tanksSpawnsIn <= 0) {
                        team.SpawnTank();
                        if (team.name != "boss")
                            this.spawnFlash(team.spawnX, team.spawnY, 80);
                        if (!team.poppedOnStart) {
                            team.popKills = true;
                            team.poppedOnStart = true;
                        }
                    }
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
                    this.spawnBullet(tank, team);
                    this.spawnMuzzleBlast(tank, tank.boss);
                    tank.Barrel.firing = false;

                    if (tank.boss) {
                        Sound.Play("./sound/shot3.mp3", 100);
                    } else {
                        Sound.Play("./sound/shot2.mp3", 80);
                    }
                }
                tank.Barrel.items[0].y = 7 + tank.Barrel.recoil * 6;

                if (tank.damageBonusTime) {
                    tank.damageBonusTime -= delta;
                    if(tank.damageBonusTime <= 0)
                        tank.damageBonusEnd();
                }
                if (tank.speedBonusTime) {
                    tank.speedBonusTime -= delta;
                    if(tank.speedBonusTime <= 0)
                        tank.speedBonusEnd();
                }

                if (tank.boss) {
                    tank.Head.angle = tank.Barrel.angle / 4 - Math.PI / 2;
                    if (tank.Head.angle < -Math.PI / 4) tank.Head.angle += Math.PI / 2;
                }
            }
        }, this); 

        Object.keys(this.powerupTimings).forEach(function(key) {
            var spawnTiming = this.powerupTimings[key];
            spawnTiming.cooldown -= delta;
            if(spawnTiming.cooldown <= 0) {
                Game.spawnBonus(key);
                spawnTiming.cooldown = spawnTiming.period;
            }
        }, this);

        //this.scrapeDetected = false;
        this.RootEntity.update(delta);
        this.GuiEntity.update(delta);
        //this.ScrapeSound.volume = this.scrapeDetected ? 1 : 0;
    },
}

