
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

                if (colliderRetVal.tileX){
                    if (obj.OnMapCollision){
                        obj.OnMapCollision( colliderRetVal.tileX, colliderRetVal.tileY );
                    }
                } else {
                    if (obj.owner && obj.owner == colliderRetVal){
                        apply = true;
                    }
                    else if (obj.OnObjectCollision){
                            obj.OnObjectCollision(colliderRetVal);
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
        var rtile = Game.Map.getTileAt(rtx, rty);
        var rtraction = rtile ? rtile.tractionFactor : 1;

        var traction = (ltraction + rtraction) / 2;

        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(ltx, lty);
        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(rtx, rty);

        obj.rotationSpeed = obj.rotationSpeed + (obj.LeftTrack.torque - obj.RightTrack.torque) * traction * delta * obj.maxRotationSpeed / 1000;
        if (Math.abs(obj.rotationSpeed) > obj.maxRotationSpeed) obj.rotationSpeed = Math.sign(obj.rotationSpeed) * obj.maxRotationSpeed;
        
        obj.speed = obj.speed + (obj.LeftTrack.torque + obj.RightTrack.torque) / 2 * traction * delta * obj.maxSpeed / 1000;
        if (Math.abs(obj.speed) > obj.maxSpeed) obj.speed = Math.sign(obj.speed) * obj.maxSpeed;
        
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

        if (obj.LeftTrack.torque + obj.RightTrack.torque == 0)
        {
            obj.speed *= 1 - (0.10 * traction);
        }

        if (obj.LeftTrack.torque - obj.RightTrack.torque != 0) {
            obj.speed *= 1 - (0.02 * traction);
        } else {
            obj.rotationSpeed *= 0.9;
        }

        var apply = true;

        if (obj.collider){
            var objRect = new Geom.Rect(newx, newy, obj.width, obj.height, newAngle);
            var colliderRetVal = obj.collider.IsCollided(objRect, obj);
            if (colliderRetVal){
                apply = false;
                if (colliderRetVal.tileX){
                    if (obj.OnMapCollision){
                        obj.OnMapCollision( colliderRetVal.tileX, colliderRetVal.tileY );
                    }
                } else{
                    if (obj.OnObjectCollision){
                            obj.OnObjectCollision(colliderRetVal);
                        }
                }
            }
        }

        if (apply){
            obj.x = newx;
            obj.y = newy;
            obj.angle = newAngle;
        } else{
            var s = Math.max(
                Math.abs(obj.speed)*800,
                Math.abs(obj.rotationSpeed)*200);
            if (s > 25) s = 25;
            if (s > 100) s = 100;
            PlaySound("./sound/crash.wav", s);
            obj.speed = 0;
            obj.rotationSpeed = 0;
        }
    }
};

Behavior.TimedLife = function(time) {
    this.init = function(obj){
        obj.lifeTimeout = time || -1;
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

Behavior.Animate = function(images, msecPerFrame, startFrame) {
    this.init = function(obj) {
        obj.animFrames = [];
        for(var i=0, count=images.length; i<count; i++) {
            if(typeof images[i] == 'string') {
                var img = new Image();
                img.src = images[i];
                images[i] = img;
            }
            obj.animFrames.push(images[i]);
        }
        obj.animDelay = msecPerFrame || 0;
        obj.animFrame = startFrame || 0;
        obj.animCurrentTime = 0;
        obj.setImage(obj.animFrames[obj.animFrame]);
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
            var newFrame = (obj.animFrame + frameInc) % obj.animFrames.length;
            if(newFrame != obj.animFrame) {
                obj.animFrame = newFrame;
                obj.setImage(obj.animFrames[obj.animFrame]);
            }
            obj.animCurrentTime = obj.animCurrentTime % obj.animDelay;
        }
    }
}