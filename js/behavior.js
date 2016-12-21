
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

var Behavior = {}

// Screen-space movement
// impulses are in pixels per second and radians per second
Behavior.BaseMove = {
    protoInit: function(obj, impulseX, impulseY, impulseRot) {
        obj.impulseX = impulseX || 0;
        obj.impulseY = impulseY || 0;
        obj.impulseRot = impulseRot || 0;
    },
    postExec: function(obj, delta){
        obj.x += obj.impulseX / 1000 * delta;
        obj.y += obj.impulseY / 1000 * delta;
        obj.angle += obj.impulseRot / 1000 * delta;

        if(obj.mass == 5)
            l("logTxt2").innerHTML += 
                "<br/>---baseMove---" + 
                "<br/>impX: " + obj.impulseX.toFixed(5) + 
                "<br/>impY: " + obj.impulseY.toFixed(5) + 
                "<br/>impRot: " + obj.impulseRot.toFixed(5);

        if( obj.angle < 0)
            obj.angle += Math.PI * 2;
        if( obj.angle > Math.PI * 2)
            obj.angle -= Math.PI * 2;
    }
}

// Object-space movement
// angular velocity is in degrees per second
Behavior.SimpleMove = function(vFwd, vSide, vAng) {
    this.init = function(obj) {
        this.protoInit(obj, 0, 0, 0);
        obj.forwardSpeed = vFwd || 0;
        obj.sidewaysSpeed = vSide || 0;
        obj.turnSpeed = vAng || 0;
    };
};
Behavior.SimpleMove.prototype = {
    __proto__: Behavior.BaseMove,
    name: "simplemove",
    exec: function(obj, delta) {
        obj.impulseX = 0;
        obj.impulseY = 0;

        if(obj.forwardSpeed != 0) {
            obj.impulseX -= Math.sin(obj.angle) * obj.forwardSpeed;
            obj.impulseY += Math.cos(obj.angle) * obj.forwardSpeed;
        }
        if(obj.sidewaysSpeed != 0) {
            obj.impulseX -= Math.cos(obj.angle) * obj.sidewaysSpeed;
            obj.impulseY += Math.sin(obj.angle) * obj.sidewaysSpeed;
        }
        if(obj.turnSpeed != 0) {
            obj.impulseRot = obj.turnSpeed / 180 * Math.PI;
        }
    }
};

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
        }
    }
};

Behavior.SteerTank = function(leftTrackSpeed, rightTrackSpeed) {
    this.init = function(obj) {
        this.protoInit(obj, 0, 0, 0)
        obj.speed = 0;
        obj.maxSpeed = 120/1000; //px/msec
        obj.rotationSpeed = 0;
        obj.maxRotationSpeed = 180/1000; //deg/msec
    };
};
Behavior.SteerTank.prototype = {
    __proto__: Behavior.BaseMove,
    name: "steertank",
    exec: function(obj, delta) {
        var ltx = obj.x - Math.cos(obj.angle) * obj.LeftTrack.x - Math.sin(obj.angle) * obj.LeftTrack.y;
        var lty = obj.y + Math.cos(obj.angle) * obj.LeftTrack.y - Math.sin(obj.angle) * obj.LeftTrack.x;
        var rtx = obj.x - Math.cos(obj.angle) * obj.RightTrack.x - Math.sin(obj.angle) * obj.RightTrack.y;
        var rty = obj.y + Math.cos(obj.angle) * obj.RightTrack.y - Math.sin(obj.angle) * obj.RightTrack.x;

        var ltile = Game.Map.getTileAt(ltx, lty);
        var ltraction = ltile ? ltile.tractionFactor : 1;
        var rtile = Game.Map.getTileAt(rtx, rty);
        var rtraction = rtile ? rtile.tractionFactor : 1;

        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(ltx, lty);
        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(rtx, rty);

        var moveAngle = Math.atan2(obj.impulseX, obj.impulseY) - obj.angle;
        
        obj.impulseRot += (obj.LeftTrack.torque * ltraction - obj.RightTrack.torque * rtraction) * obj.maxRotationSpeed / 2;
        //if (Math.abs(obj.rotationSpeed) > obj.maxRotationSpeed) obj.rotationSpeed = Math.sign(obj.rotationSpeed) * obj.maxRotationSpeed;
        
        // max 1 px/
        var accel = (obj.LeftTrack.torque * ltraction + obj.RightTrack.torque * rtraction) * 2;
        //if (Math.abs(obj.speed) > obj.maxSpeed) obj.speed = Math.sign(obj.speed) * obj.maxSpeed;
        
        obj.impulseX *= 0.95;
        obj.impulseY *= 0.95;
        obj.impulseRot *= 0.95;
        obj.simpleMoveForward = accel;
        if(accel != 0) {
            obj.impulseX -= Math.sin(obj.angle) * accel;
            obj.impulseY += Math.cos(obj.angle) * accel;
        }
        l("logTxt2").innerHTML = 
            "---steering---" + 
            "<br/>impX: " + obj.impulseX.toFixed(5) + 
            "<br/>impY: " + obj.impulseY.toFixed(5) + 
            "<br/>impRot: " + obj.impulseRot.toFixed(5);
    },
    applyForcePoint: function(obj, xoffset, yoffset, torque, movementAngle, movementSpeed) {
        var globalx = obj.x - Math.cos(obj.angle) * xoffset - Math.sin(obj.angle) * yoffset;
        var globaly = obj.y + Math.cos(obj.angle) * yoffset - Math.sin(obj.angle) * xoffset;
        var tile = Game.Map.getTileAt(globalx, globaly);
        var traction = tile ? tile.tractionFactor : 1;
        var angleToForcePoint = Math.atan2(yoffset, xoffset);

        var brakeForce = 1;
        var pullForce = 1;
        if( torque == 0 ) {
            // just apply braking
            var braking = brakeForce * traction;
            var moveForce = -braking * Math.cos(movementAngle - angleToForcePoint);
            var torque = braking * Math.sin(movementAngle - angleToForcePoint) * Math.sqrt(xoffset*xoffset + yoffset*yoffset);
            return {accel: moveForce, torque: torque};
        } else {
            // apply both torque and braking
            var braking = brakeForce * traction * Math.abs(Math.sin(movementAngle));
            var pull = pullForce * traction * Math.cos(movementAngle);
            var moveForce = -braking * Math.sin(movementAngle - angleToForcePoint) + pull;
        }
    }
};

Behavior.MoveTank = function(leftTrackSpeed, rightTrackSpeed) {
    this.init = function(obj) {
        obj.speed = 0;
        obj.maxSpeed = 120/1000; //px/msec
        obj.rotationSpeed = 0;
        obj.maxRotationSpeed = 180/1000; //deg/msec
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

        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(ltx, lty);
        if( Math.random() < 0.01 )
            Game.Map.degradeTileAt(rtx, rty);

        obj.rotationSpeed = obj.rotationSpeed + (obj.LeftTrack.torque * ltraction - obj.RightTrack.torque * rtraction) * delta * obj.maxRotationSpeed / 1000;
        if (Math.abs(obj.rotationSpeed) > obj.maxRotationSpeed) obj.rotationSpeed = Math.sign(obj.rotationSpeed) * obj.maxRotationSpeed;
        
        obj.speed = obj.speed + (obj.LeftTrack.torque * ltraction + obj.RightTrack.torque * rtraction) / 2 * delta * obj.maxSpeed / 1000;
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

        obj.speed *= 0.95; // get coef from terrain
        obj.rotationSpeed *= 0.95; // get coef from terrain

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