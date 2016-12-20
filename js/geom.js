// 2D geometry functions

var Geom = {}

Geom.Point = function(x, y){
    this.x = x;
    this.y = y;
}

Geom.Point.prototype.Rotate = function(angle){
    var cosa = Math.cos(angle);
    var sina = Math.sin(angle);
    return new Geom.Point(
        this.x*cosa - this.y*sina,
        this.x*sina + this.y*cosa);
}

Geom.Point.prototype.Translate = function(x, y){
    return new Geom.Point(this.x + x, this.y + y);
}

Geom.Mbr = function(xmin, xmax, ymin, ymax){
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
}

Geom.Mbr.prototype.addPoint = function(p) {
    if (p.x > this.xmax) this.xmax = p.x;
    if (p.x < this.xmin) this.xmin = p.x;
    if (p.y > this.ymax) this.ymax = p.y;
    if (p.y < this.ymin) this.ymin = p.y;
}

Geom.Rect = function(x, y, width, height, angle){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
}

Geom.Rect.prototype.Rotate = function(angle){
    var cosa = Math.cos(angle);
    var sina = Math.sin(angle);
    var newrect = new Geom.Rect(
        this.x*cosa - this.y*sina,
        this.x*sina + this.y*cosa,
        this.width,
        this.height,
        this.angle + angle
    );
    return newrect;
}

Geom.Rect.prototype.Translate = function(x, y){
    return new Geom.Rect(this.x + x, this.y + y, this.width, this.height, this.angle);
}

Geom.Rect.prototype.GetMbr = function(){
    var w = this.width;
    var h = this.height;
    
    var p = (new Geom.Point(w/2, -h/2)).Rotate(this.angle).Translate(this.x, this.y);

    var mbr = new Geom.Mbr(p.x, p.x, p.y, p.y);

    p = (new Geom.Point(w/2, h/2)).Rotate(this.angle).Translate(this.x, this.y);
    mbr.addPoint(p);

    p = (new Geom.Point(-w/2, h/2)).Rotate(this.angle).Translate(this.x, this.y);
    mbr.addPoint(p);    

    p = (new Geom.Point(-w/2, -h/2)).Rotate(this.angle).Translate(this.x, this.y);
    mbr.addPoint(p);

    return mbr;
}

Geom.IntersectAABB = function (r1, r2){
    var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle); //in this coords r1 is in the origin and along axis
    var mbr = rotrect.GetMbr();

    var xmin = -r1.width/2;
    var xmax = r1.width/2;
    var ymin = -r1.height/2;
    var ymax = r1.height/2;

    return (mbr.xmax > xmin) && (mbr.xmin < xmax) && (mbr.ymax > ymin) && (mbr.ymin < ymax); //if r2 projection on r1 edges overlaps the edges
}

Geom.Intersect = function(rect1, rect2){

    if (!Geom.IntersectAABB(rect1, rect2)) return false;
    if (!Geom.IntersectAABB(rect2, rect1)) return false;

    return true;
}

Geom.CollideAABB = function (r1, r2){
    var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle); //in this coords r1 is in the origin and along axis
    var mbr = rotrect.GetMbr();

    var xmin = -r1.width/2;
    var xmax = r1.width/2;
    var ymin = -r1.height/2;
    var ymax = r1.height/2;


    return Math.max(mbr.xmax - xmin, xmax - mbr.xmin, mbr.ymax - ymin, ymax - mbr.ymin, 0); //if r2 projection on r1 edges overlaps the edges
}

Geom.Collide = function(r1, r2){

    if (!Geom.IntersectAABB(r1, r2)) return false;
    if (!Geom.IntersectAABB(r2, r1)) return false;

    r1.mass = 1;
    r2.mass = 2;

    if (r1.mass && r2.mass){
        var xdist = r2.x - r1.x;
        var ydist = r2.y - r1.y;
        var collisionAngle = Math.atan2(xdist, ydist);
        var r1rot = r1.Translate(-r1.x, -r1.y).Rotate(collisionAngle);
        var r2rot = r2.Translate(-r1.x, -r1.y).Rotate(collisionAngle);
        var w1 = r1.width;
        var h1 = r1.height;
        var p1pts = [
            new Geom.Point(w1/2, h1/2).Rotate(r1rot.angle),
            new Geom.Point(-w1/2, h1/2).Rotate(r1rot.angle),
            new Geom.Point(w1/2, -h1/2).Rotate(r1rot.angle),
            new Geom.Point(-w1/2, -h1/2).Rotate(r1rot.angle),
        ];
        // coordinates of two points with max y towards collision
        var r1ymax = Number.MIN_SAFE_INTEGER, r1xmax;
        var r1ymax2 = Number.MIN_SAFE_INTEGER, r1xmax2;
        for(var i=0; i<4; i++) {
            if( p1pts[i].y > r1ymax) {
                r1ymax2 = r1ymax;
                r1xmax2 = r1xmax;
                r1ymax = p1pts[i].y;
                r1xmax = p1pts[i].x;
            } else if( p1pts[i].y > r1ymax2) {
                r1ymax2 = p1pts[i].y;
                r1xmax2 = p1pts[i].x;
            }
        }
        var w2 = r2.width;
        var h2 = r2.height;
        var p2pts = [
            new Geom.Point(w2/2, h2/2).Rotate(r2rot.angle).Translate(r2rot.x, r2rot.y),
            new Geom.Point(-w2/2, h2/2).Rotate(r2rot.angle).Translate(r2rot.x, r2rot.y),
            new Geom.Point(w2/2, -h2/2).Rotate(r2rot.angle).Translate(r2rot.x, r2rot.y),
            new Geom.Point(-w2/2, -h2/2).Rotate(r2rot.angle).Translate(r2rot.x, r2rot.y),
        ];
        // coordinates of point with min y towards collision
        var r2ymin = Number.MAX_SAFE_INTEGER, r2xmin;
        for(var i=0; i<4; i++) {
            if( p2pts[i].y < r2ymin) {
                r2ymin = p2pts[i].y;
                r2xmin = p2pts[i].x;
            }
        }
        var penetrationDist = r2ymin - r1ymax2 - (r1ymax - r1ymax2) / (r1xmax - r1xmax2) * (r2xmin - r1xmax2);
        var penetrationX = penetrationDist * Math.sin(collisionAngle);
        var penetrationY = penetrationDist * Math.cos(collisionAngle);
        var massSum = r1.mass + r2.mass;
        r1.impulseX = -penetrationX * r1.mass / massSum;
        r2.impulseX = penetrationX * r2.mass / massSum;
        r1.impulseY = -penetrationY * r1.mass / massSum;
        r2.impulseY = penetrationY * r2.mass / massSum;
        l("logTxt").innerHTML = 
            "colAng local: " + (collisionAngle + r1.angle) + 
            "<br/>colAng: " + collisionAngle + 
            "<br/>r1rot: " + r1rot.angle + 
            "<br/>r2rot: " + r2rot.angle + 
            // "<br/>r1xmax: " + r1xmax + 
            // "<br/>r1ymax: " + r1ymax +
            // "<br/>r1xmax2: " + r1xmax2 + 
            // "<br/>r1ymax2: " + r1ymax2 +
            // "<br/>r2xmin: " + r2xmin + 
            // "<br/>r2ymin: " + r2ymin +
            "<br/>penetr: " + penetrationDist +
            "<br/>penetrX: " + penetrationX +
            "<br/>penetrY: " + penetrationY +
            "<br/>r1imp: " + r1.impulseX + ";" + r1.impulseY +
            "<br/>r2imp: " + r2.impulseX + ";" + r2.impulseY;
        return true;
    } else if( r1.mass || r2.mass ) {}
    var r1r2penetration = Geom.CollideAABB(r1, r2);
    var r2r1penetration = Geom.CollideAABB(r2, r1);
    if (!r1r2penetration || !r2r1penetration) return false;

    return true;
}



