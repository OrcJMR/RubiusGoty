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

Geom.OverlapMbr = function (r1, r2){
    var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle); //in this coords r1 is in the origin and along axis
    var mbr = rotrect.GetMbr();

    var xmin = -r1.width/2;
    var xmax = r1.width/2;
    var ymin = -r1.height/2;
    var ymax = r1.height/2;

    // if r2 projection on r1 edges overlaps the edges
    return (mbr.xmax > xmin) && (mbr.xmin < xmax) && (mbr.ymax > ymin) && (mbr.ymin < ymax);
}

Geom.Intersect = function(rect1, rect2){
    if (!Geom.OverlapMbr(rect1, rect2)) return false;
    if (!Geom.OverlapMbr(rect2, rect1)) return false;

    return true;
}

Geom.FindPointsInRect = function(r1, r2) {
    var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle);
    // dbg += printRect(rotrect) + "<br/>";

    var xmin = -r1.width/2;
    var xmax = r1.width/2;
    var ymin = -r1.height/2;
    var ymax = r1.height/2;

    var w = rotrect.width;
    var h = rotrect.height;
    var p;
    var retval = [];
    var testFunc = function(p, retval) {
        // dbg += "&nbsp;&nbsp;x" + p.x.toFixed(2) + " y" + p.y.toFixed(2);
        if(p.x < xmax && p.x > xmin && p.y < ymax && p.y > ymin) {
            var cpoint = p.Rotate(r1.angle).Translate(r1.x, r1.y);//.Rotate(r1.angle).Translate(r1.x, r1.y);
            // dbg += " hit.</br>&nbsp;&nbsp;&nbsp;x" + cpoint.x.toFixed(2) + " y" + cpoint.y.toFixed(2) + "<br/>";
            retval.push(cpoint);
        } //else {
        //     dbg += " miss.</br>"
        // }
    };
    p = (new Geom.Point(w/2, -h/2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y);
    testFunc(p, retval);
    p = (new Geom.Point(w/2, h/2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y);
    testFunc(p, retval);
    p = (new Geom.Point(-w/2, h/2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y);
    testFunc(p, retval);
    p = (new Geom.Point(-w/2, -h/2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y);
    testFunc(p, retval);
    return retval;    
}
// var dbg;
// var printRect = function(r) {
//     return "R: x" + r.x.toFixed(0) + " y" + r.y.toFixed(0) + " a" + r.angle.toFixed(2) + " w" + r.width + " h" + r.height;
// }
Geom.Intersect2 = function(rect1, rect2){
    // dbg = printRect(rect1) + "<br/>" + printRect(rect2) + "<br/><br/>";
    var arr1 = Geom.FindPointsInRect(rect1, rect2);
    var arr2 = Geom.FindPointsInRect(rect2, rect1);
    var arr = arr1.concat(arr2);
    if (arr.length == 0)
        return false;
    // l("debugText").innerHTML = dbg;
    return arr;
}




