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
        this.x*sina + this.y*cosa,
    )
}

Geom.Point.prototype.Translate = function(x, y){
    return new Geom.Point(this.x + x, this.y + y);
}

Geom.Mbr = function(xmin, xmax, ymin, ymax){
    this.xmin = xmain;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
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
    var newrect = new GeomHelper.Rect(
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
    var p = (new Geom.Point(w/2, -h/2)).Rotate(this.angle).Translate(this.x, this.y);

    var xmin = p.x;
    var xmax = p.x;
    var ymin = p.y;
    var ymax = p.y;

    p = (new Geom.Point(w/2, h/2)).Rotate(this.angle).Translate(this.x, this.y);

    if (p.x > xmax) xmax = p.x;
    if (p.x < xmin) xmin = p.x;
    if (p.y > ymax) ymax = p.y;
    if (p.y < ymin) ymin = p.y;

    p = (new Geom.Point(-w/2, h/2)).Rotate(this.angle).Translate(this.x, this.y);

    if (p.x > xmax) xmax = p.x;
    if (p.x < xmin) xmin = p.x;
    if (p.y > ymax) ymax = p.y;
    if (p.y < ymin) ymin = p.y;

    p = (new Geom.Point(-w/2, -h/2)).Rotate(this.angle).Translate(this.x, this.y);

    if (p.x > xmax) xmax = p.x;
    if (p.x < xmin) xmin = p.x;
    if (p.y > ymax) ymax = p.y;
    if (p.y < ymin) ymin = p.y;

    return new Geom.Mbr(xmin, xmax, ymin, ymax);    
}

Geom.Intersect = function(rect1, rect2){
    var IntersectPart = function (r1, r2){
        var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle); //in this coords r1 is in the origin and along axis
        var mbr = rotrect.GetMbr();

        var xmin = -r1.width/2;
        var xmax = r1.width/2;
        var ymin = -r1.height/2;
        var ymax = r1.heigth/2;

        return (mbr.xmax > xmin) && (mbr.xmin < xmax) && (mbr.ymax > ymin) && (mbr.ymin < ymax); //if r2 projection on r1 edges overlaps the edges
    }

    if (!IntersectPart(rect1, rect2)) return false;
    if (!IntersectPart(rect2, rect1)) return false;

    return true;
}




