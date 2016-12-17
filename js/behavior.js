
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

var Behavior = {}

Behavior.Move = function(vx, vy, va) {
    this.init = function(obj) {
        obj.moveXSpeed = vx || 0;
        obj.moveYSpeed = vy || 0;
        obj.moveAngSpeed = va || 0;
    }
};
Behavior.Move.prototype = {
    name: "move",
    exec: function(obj, delta) {
        if(obj.moveYSpeed != 0) {
            obj.x -= Math.sin(obj.angle) * delta * obj.moveYSpeed;
            obj.y += Math.cos(obj.angle) * delta * obj.moveYSpeed;
        }
        if(obj.moveXSpeed != 0) {
            obj.x -= Math.cos(obj.angle) * delta * obj.moveXSpeed;
            obj.y -= Math.sin(obj.angle) * delta * obj.moveXSpeed;
        }
        if(obj.moveAngSpeed != 0) {
            obj.angle += delta * obj.moveAngSpeed / 180 * Math.PI;
            if( obj.angle < 0)
                obj.angle += Math.PI * 2;
            if( obj.angle > Math.PI * 2)
                obj.angle -= Math.PI * 2;
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