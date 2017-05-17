
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

var Behavior = {}

Behavior.Move = function(vx, vy, va) {
    this.init = function(obj) {
        obj.moveXSpeed = vx || 0;
        obj.moveYSpeed = vy || 0;
        obj.moveAngSpeed = va || 0;
    };
};
Behavior.Move.prototype = {
    name: "move",
    exec: function(obj, delta) {
        var newx = obj.x;
        var newy = obj.y;
        var newAngle = obj.angle;

        if(obj.moveYSpeed != 0) {
            newx -= Math.sin(obj.angle) * delta * obj.moveYSpeed;
            newy += Math.cos(obj.angle) * delta * obj.moveYSpeed;
        }

        if(obj.moveXSpeed != 0) {
            newx -= Math.cos(obj.angle) * delta * obj.moveXSpeed;
            newy += Math.sin(obj.angle) * delta * obj.moveXSpeed;
        }

        if(obj.moveAngSpeed != 0) {
            newAngle += delta * obj.moveAngSpeed / 180 * Math.PI;
            if( newAngle < 0)
                newAngle += Math.PI * 2;
            if( newAngle > Math.PI * 2)
                newAngle -= Math.PI * 2;
        }

        var apply = true;

        if (obj.collider){
            var objRect = new Geom.Rect(newx, newy, obj.width, obj.height, newAngle);
            var colliderRetVal = obj.collider.IsCollided(objRect, obj);
            if (colliderRetVal){
                apply = false;

                if (colliderRetVal.tileX > -10000) { // detect if exists and number
                    if (obj.OnMapCollision) {
                        obj.OnMapCollision( colliderRetVal.tileX, colliderRetVal.tileY );
                    }
                } else {
                    if (obj.owner && obj.owner == colliderRetVal.object) {
                        apply = true;
                    } else if (obj.OnObjectCollision) {
                        obj.OnObjectCollision(colliderRetVal.object);
                    }
                }
            }
        }

        if (apply){
            obj.x = newx;
            obj.y = newy;
            obj.angle = newAngle;
        }
    }
};

Behavior.MoveTank = function(leftTrackSpeed, rightTrackSpeed) {
    this.init = function(obj) {
        obj.speed = 0;
        obj.maxSpeed = 60/1000; //px/msec
        obj.rotationSpeed = 0;
        obj.maxRotationSpeed = 60/1000; //deg/msec
    };
};
Behavior.MoveTank.prototype = {
    name: "movetank",
    exec: function(obj, delta) {
        var newx = obj.x;
        var newy = obj.y;
        var newAngle = obj.angle;

        var ltx = obj.x - Math.cos(obj.angle) * obj.LeftTrack.x - Math.sin(obj.angle) * obj.LeftTrack.y;
        var lty = obj.y + Math.cos(obj.angle) * obj.LeftTrack.y - Math.sin(obj.angle) * obj.LeftTrack.x;
        var rtx = obj.x - Math.cos(obj.angle) * obj.RightTrack.x - Math.sin(obj.angle) * obj.RightTrack.y;
        var rty = obj.y + Math.cos(obj.angle) * obj.RightTrack.y - Math.sin(obj.angle) * obj.RightTrack.x;

        var ltile = Game.Map.getTileAt(ltx, lty);
        var ltraction = ltile ? ltile.tractionFactor : 1;
        var llimit = ltile ? ltile.speed ? ltile.speed : 1 : 1;
        var rtile = Game.Map.getTileAt(rtx, rty);
        var rtraction = rtile ? rtile.tractionFactor : 1;
        var rlimit = rtile ? rtile.speed ? rtile.speed : 1 : 1;

        var traction = (ltraction + rtraction) / 2;
        var limit = (llimit + rlimit) / 2;
        if( obj.speedBonusTime )
            limit *= 2;

        if( Math.random() < 0.01 && obj.LeftTrack.torque != 0 )
            Game.Map.degradeTileAt(ltx, lty);
        if( Math.random() < 0.01 && obj.RightTrack.torque != 0 )
            Game.Map.degradeTileAt(rtx, rty);

        var rotationDir = obj.LeftTrack.torque - obj.RightTrack.torque;
        if (rotationDir != 0 && Math.sign(rotationDir) != Math.sign(obj.rotationSpeed)) obj.rotationSpeed *= 0.8;
        var maxRotationSpeed = obj.maxRotationSpeed * limit;
        obj.rotationSpeed = obj.rotationSpeed + rotationDir * traction * delta * maxRotationSpeed / 1000;
        if (Math.abs(obj.rotationSpeed) > maxRotationSpeed) obj.rotationSpeed = Math.sign(obj.rotationSpeed) * maxRotationSpeed;
        
        var speedDir = obj.LeftTrack.torque + obj.RightTrack.torque;
        if (speedDir != 0 && Math.sign(speedDir) != Math.sign(obj.speed)) obj.speed *= 0.8;
        var maxSpeed = obj.maxSpeed * limit;
        obj.speed = obj.speed + (obj.LeftTrack.torque + obj.RightTrack.torque) / 2 * traction * delta * maxSpeed / 1000;
        if (Math.abs(obj.speed) > maxSpeed) obj.speed = Math.sign(obj.speed) * maxSpeed;
        
        if(obj.speed != 0) {
            newx -= Math.sin(obj.angle) * delta * obj.speed;
            newy += Math.cos(obj.angle) * delta * obj.speed;
        }

        if(obj.rotationSpeed != 0) {
            newAngle += delta * obj.rotationSpeed / 180 * Math.PI;
            if( newAngle < 0)
                newAngle += Math.PI * 2;
            if( newAngle > Math.PI * 2)
                newAngle -= Math.PI * 2;
        }

        if (obj.LeftTrack.torque + obj.RightTrack.torque == 0) {
            obj.speed *= 1 - (0.10 * traction);
        }

        if (obj.LeftTrack.torque - obj.RightTrack.torque != 0) {
            obj.speed *= 1 - (0.02 * traction);
        } else {
            obj.rotationSpeed *= 0.9;
        }

        var colliderRetVal = false;

        if (obj.collider) {
            var objRect = new Geom.Rect(newx, newy, obj.width, obj.height, newAngle);
            colliderRetVal = obj.collider.IsCollided(objRect, obj);
        }

        if (!colliderRetVal) {
            obj.x = newx;
            obj.y = newy;
            obj.angle = newAngle;
        } else {
            if (colliderRetVal.tileX > -10000) { // detect if exists and number
                if (obj.OnMapCollision) {
                    obj.OnMapCollision( colliderRetVal.tileX, colliderRetVal.tileY );
                }
            } else if (obj.OnObjectCollision) {
                obj.OnObjectCollision(colliderRetVal.object);
            }

            var s = Math.max(
                Math.abs(obj.speed)*800,
                Math.abs(obj.rotationSpeed)*200);
            // only play collision sound if it was significant
            if (s > 10) Sound.Play("./sound/crash.wav", 70);
            // can spawn sparks as much as we want, it is throttled in Game
            Game.spawnSparks(colliderRetVal.points);
            Game.scrapeDetected = true;

            obj.speed = 0;
            obj.rotationSpeed = 0;
        }
    }
};

Behavior.TimedLife = function(time, spawnTime, dieTime) {
    this.init = function(obj){
        obj.lifeTimeout = time || 0;
        if(spawnTime) {
            obj.lifeSpawnTimeout = spawnTime;
            obj.lifeSpawnPassed = 0;
        }
        if(dieTime) {
            obj.lifeDieTimeout = dieTime;
        }
    }
};
Behavior.TimedLife.prototype = {
    name: "lifetimeout",
    exec: function(obj, delta) {
        if(obj.lifeTimeout < 0)
            return;
        
        obj.lifeTimeout -= delta;
        if(obj.lifeTimeout <= 0)
            obj.dead = true;
        if(obj.lifeSpawnTimeout) {
            obj.lifeSpawnPassed += delta;
            // spawn phase increases from 0 to 1
            obj.lifeSpawnPhase = Math.min(obj.lifeSpawnPassed / obj.lifeSpawnTimeout, 1);
            if(obj.lifeSpawnPhase == 1)
                delete obj.lifeSpawnTimeout;
        }
        if(obj.lifeDieTimeout && obj.lifeTimeout < obj.lifeDieTimeout) {
            // die phase appears at < 1 and decreases to 0
            obj.lifeDiePhase = Math.max(obj.lifeTimeout / obj.lifeDieTimeout, 0);
        }
    }
};

Behavior.LifeInBounds = function(minx, miny, maxx, maxy) {
    // here value of 0 is meaningful, so testing for undefined
    if(typeof minx === 'undefined') minx = Number.MIN_VALUE;
    if(typeof miny === 'undefined') miny = Number.MIN_VALUE;
    if(typeof maxx === 'undefined') maxx = Number.MAX_VALUE;
    if(typeof maxy === 'undefined') maxy = Number.MAX_VALUE;
    this.init = function(obj) {
        obj.lifeMinX = minx;
        obj.lifeMinY = miny;
        obj.lifeMaxX = maxx;
        obj.lifeMaxY = maxy;
    }
};
Behavior.LifeInBounds.prototype = {
        name: "lifebounds",
        exec: function(obj, delta) {
            if(obj.dead)
                return;
            if( obj.x < obj.lifeMinX ||
                obj.y < obj.lifeMinY ||
                obj.x > obj.lifeMaxX ||
                obj.y > obj.lifeMaxY)
                obj.dead = true;
    }
};

Behavior.Custom = function(func) {
    this.init = function(obj) {
        obj.customFunc = func
    }
};
Behavior.Custom.prototype = {
        name: "custom",
        exec: function(obj, delta) {
            obj.customFunc(delta)
    }
};

Behavior.Animate = function(spriteWidth, spriteCount, msecPerFrame, startFrame) {
    this.init = function(obj) {
        obj.spriteWidth = spriteWidth;
        obj.spriteIndex = startFrame || 0;
        obj.spriteCount = spriteCount || 1;
        obj.animDelay = msecPerFrame || 0;
        obj.animCurrentTime = 0;
    };
};

Behavior.Animate.prototype = {
    name: "animate",
    exec: function(obj, delta) {
        if(!obj.animDelay)
            return;
        obj.animCurrentTime += delta;
        var frameInc = Math.floor(obj.animCurrentTime / obj.animDelay);
        if(frameInc > 0) {
            obj.spriteIndex = (obj.spriteIndex + frameInc) % obj.spriteCount;
            obj.animCurrentTime = obj.animCurrentTime % obj.animDelay;
        }
    }
}

Behavior.Wobble = function(rotateAngle, rotatePeriod, scaleFactor, scalePeriod) {
    this.init = function(obj) {
        obj.wobbleBaseAngle = obj.angle;
        obj.wobbleAngle = rotateAngle;
        obj.wobbleAnglePeriod = rotatePeriod;
        obj.wobbleScale = scaleFactor;
        obj.wobbleScalePeriod = scalePeriod;
    };
};

Behavior.Wobble.prototype = {
    name: "wobble",
    exec: function(obj, delta) {
        obj.angle = obj.wobbleBaseAngle +
            obj.wobbleAngle / 180 * Math.sin(App.elapsedMsec/1000*Math.PI*obj.wobbleAnglePeriod);
        obj.scaleX = 1 + obj.wobbleScale * Math.sin(App.elapsedMsec/1000*Math.PI*obj.wobbleScalePeriod);
        obj.scaleY = obj.scaleX;
    }
}

Behavior.SpawnExplosions = function(delay, count) {
    this.init = function(obj) {
        obj.explosionCurrentTime = 0;
        obj.explosionsLeft = count || 1;
        obj.explosionDelay = delay || 0;
    };
};

Behavior.SpawnExplosions.prototype = {
    name: "spawnexplosions",
    exec: function(obj, delta) {
        if(obj.explosionsLeft == 0)
            return;
        obj.explosionCurrentTime += delta;
        var pendingExplosions = Math.min(Math.floor(obj.explosionCurrentTime / obj.explosionDelay), obj.explosionsLeft);
        while(pendingExplosions > 0){
            var pt = new Geom.Point(-obj.width/2 + Math.random() * obj.width, -obj.height/2 + Math.random() * obj.height);
            pt = pt.Rotate(obj.angle).Translate(obj.x, obj.y);
            var type = null;
            if (pendingExplosions == 1) type = "echo";
            Game.spawnExplosion(pt.x, pt.y, 24 + Math.random()*16, type);
            pendingExplosions--;
            obj.explosionsLeft--;
        }
        obj.explosionCurrentTime %= obj.explosionDelay;
    }
}

Behavior.PositionBalloon = function(tank, otherTanks, minx, miny, maxx, maxy) {
    this.init = function(obj) {
        obj.x = 0;
        obj.y = 0;
        obj.angle = 0;
        obj.balloonTank = tank;
        obj.balloonOtherTanks = otherTanks;
        obj.balloonMinX = minx;
        obj.balloonMinY = miny;
        obj.balloonMaxX = maxx;
        obj.balloonMaxY = maxy;
    };
};

Behavior.PositionBalloon.prototype = {
    name: "positionballoon",
    exec: function (obj, delta) {
        // first try to init
        if (typeof obj.balloonY == 'undefined' && obj.balloonTextWidth) {
            console.log("Behavior.PositionBalloon - init");
            var balloonWidth = obj.balloonTextWidth;
            var offset = 45;
            var tankY = obj.balloonTank.y;
            var tankX = obj.balloonTank.x;

            // check for boundaries
            var canUp = tankY > obj.balloonMinY + 60;
            var canDown = tankY < obj.balloonMaxY - 60;
            var mustLeft = tankX > obj.balloonMaxX - 100;
            var mustRight = tankX < obj.balloonMinX + 100;

            // check if enemies are near
            var enemyInTL = false;
            var enemyInTR = false;
            var enemyToLeft = false;
            var enemyToRight = false;
            var enemyInBL = false;
            var enemyInBR = false;            
            for (var i=0; i<obj.balloonOtherTanks.length; i++) {
                var enemyY = obj.balloonOtherTanks[i].y;
                var enemyX = obj.balloonOtherTanks[i].x;
                var toLeft = tankX - balloonWidth - 80 < enemyX && enemyX < tankX;
                var toRight = tankX < enemyX && enemyX < tankX + 80 + balloonWidth;
                // top and bottom stripes are wider because they include diagonal positions
                if (tankY - 80 < enemyY && enemyY < tankY)
                    if (toLeft) enemyInTL = true;
                    else if (toRight) enemyInTR = true;
                if (tankY - 30 < enemyY && enemyY < tankY + 30)
                    if (toLeft) enemyToLeft = true;
                    else if (toRight) enemyToRight = true;
                if (tankY< enemyY && enemyY < tankY + 80)
                    if (toLeft) enemyInBL = true;
                    else if (toRight) enemyInBR = true;
            }

            var setLeft = function() {
                obj.balloonLeft = -offset - balloonWidth;
                obj.balloonRight = -offset;
            }
            var setRight = function() {
                obj.balloonLeft = offset;
                obj.balloonRight = offset + balloonWidth;
            }
            var setMiddle = function() {
                if (tankX < obj.balloonMinX + 100 + balloonWidth / 2) {
                    obj.balloonLeft = obj.balloonMinX + 100 - tankX;
                    obj.balloonRight = obj.balloonLeft + balloonWidth;
                } else if (tankX > obj.balloonMaxX - 100 - balloonWidth / 2) {
                    obj.balloonRight = obj.balloonMaxX - 100 - tankX;
                    obj.balloonLeft = obj.balloonRight - balloonWidth;
                } else {
                    obj.balloonLeft = -balloonWidth / 2;
                    obj.balloonRight = -obj.balloonLeft;
                }
            }

            // solve direction
            if (mustLeft) {
                setLeft();

                if (canUp && !enemyInTL)
                    obj.balloonY = -offset;
                else if (!enemyToLeft)
                    obj.balloonY = 0;
                else if (canDown && !enemyInBL)
                    obj.balloonY = offset;
                else
                    obj.balloonY = canUp ? -offset : 0;

            } else if (mustRight) {
                setRight();

                if (canUp && !enemyInTR)
                    obj.balloonY = -offset;
                else if (!enemyToRight)
                    obj.balloonY = 0;
                else if (canDown && !enemyInBR)
                    obj.balloonY = offset;
                else
                    obj.balloonY = canUp ? -offset : 0;

            } else { // can mid
                if (canUp && !(enemyInTL && enemyInTR)) {
                    obj.balloonY = -offset;
                    if (enemyInTL)
                        setRight();
                    else if (enemyInTR)
                        setLeft();
                    else
                        setMiddle();

                } else if (canDown && !(enemyInBL && enemyInBR)) {
                    obj.balloonY = offset;
                    if (enemyInBL)
                        setRight();
                    else if (enemyInBR)
                        setLeft();
                    else 
                        setMiddle();

                } else if (!enemyToLeft || !enemyToRight) {
                    obj.balloonY = 0;
                    if (enemyToLeft)
                        setRight();
                    else if (enemyToRight)
                        setLeft();

                } else {
                    obj.balloonY = canUp ? -offset : offset;
                    setMiddle();
                }
            }
            // adjust diagonal positions
            if (obj.balloonY != 0) {
                if (obj.balloonLeft > 0) {
                    var multiplier = 45 / Math.sqrt(obj.balloonY*obj.balloonY + obj.balloonLeft*obj.balloonLeft);
                    obj.balloonY *= multiplier;
                    var xShift = (1 - multiplier) * obj.balloonLeft;
                    obj.balloonLeft -= xShift;
                    obj.balloonRight -= xShift;
                }
                else if (obj.balloonRight < 0) {
                    var multiplier = 45 / Math.sqrt(obj.balloonY*obj.balloonY + obj.balloonRight*obj.balloonRight);
                    obj.balloonY *= multiplier;
                    var xShift = (1 - multiplier) * obj.balloonRight;
                    obj.balloonLeft -= xShift;
                    obj.balloonRight -= xShift;
                }
            }
        } else { // if initialized and not dead, follow tank
            console.log("Behavior.PositionBalloon - follow");
            if (!("lifeDiePhase" in obj)) {
                obj.x = obj.balloonTank.x;
                obj.y = obj.balloonTank.y;
            }
        }
    }
};