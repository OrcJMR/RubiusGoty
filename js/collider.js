
function SoftCollider(objects){
    this.objects = objects;
}

SoftCollider.prototype = {
    CombineImpulses: function(array){
        if(!array || array.length == 0)
            return 0;
        var max = Number.MIN_SAFE_INTEGER;
        var min = Number.MAX_SAFE_INTEGER;
        var sum = 0;
        var allPositive = true;
        var allNegative = true;
        for(var i=0, count=array.length; i<count; i++){
            if(array[i] > 0) {
                allNegative = false;
                if(array[i] > max) max = array[i];
            }
            if(array[i] < 0) {
                allPositive = false;
                if(array[i] < min) min = array[i];
            }
            sum += array[i];
        }
        if(allNegative) return min;
        if(allPositive) return max;
        return sum / array.length;
    },
    Process: function(delta){
        //check objects
        
        var td = delta / 1000;

        for(var i=0, count=this.objects.length; i<count; i++ ) {
            var obj = this.objects[i];
            obj.frameColor = "green";
        }
        for(var i=0, count=this.objects.length; i<count; i++ ) {
            var iObj = this.objects[i];
            var iRect = new Geom.Rect(iObj.x + iObj.impulseX*td, iObj.y + iObj.impulseY*td, iObj.width, iObj.height, iObj.angle + iObj.impulseRot*td);
            iRect.mass = iObj.mass;
            for( var j=i+1; j<count; j++) {
                var jObj = this.objects[j];
                var jRect = new Geom.Rect(jObj.x + jObj.impulseX*td, jObj.y + jObj.impulseY*td, jObj.width, jObj.height, jObj.angle + jObj.impulseRot*td);
                jRect.mass = jObj.mass;

                if(Geom.Collide(iRect, jRect)) {
                    iObj.frameColor = "red";
                    jObj.frameColor = "red";
                    if(!iObj.impulseArrayX) iObj.impulseArrayX = [];
                    if(!iObj.impulseArrayY) iObj.impulseArrayY = [];
                    iObj.impulseArrayX.push(iRect.impulseX);
                    iObj.impulseArrayY.push(iRect.impulseY);
                    if(!jObj.impulseArrayX) jObj.impulseArrayX = [];
                    if(!jObj.impulseArrayY) jObj.impulseArrayY = [];
                    jObj.impulseArrayX.push(jRect.impulseX);
                    jObj.impulseArrayY.push(jRect.impulseY);
                }
            }
        }
        for(var i=0, count=this.objects.length; i<count; i++ ) {
            var obj = this.objects[i];
            var xmod, ymod;
            var impulseScalar = obj.impulseX*obj.impulseX + obj.impulseY*obj.impulseY;
            if(obj.impulseArrayX) {
                obj.impulseX += this.CombineImpulses(obj.impulseArrayX)/td;
                xmod = this.CombineImpulses(obj.impulseArrayX);
            }
            if(obj.impulseArrayY) {
                obj.impulseY += this.CombineImpulses(obj.impulseArrayY)/td;
                ymod = this.CombineImpulses(obj.impulseArrayY);
            }
            var impulseScalar2 = obj.impulseX*obj.impulseX + obj.impulseY*obj.impulseY;
            if(impulseScalar2 > impulseScalar){
                var factor = Math.sqrt(impulseScalar2 / impulseScalar);
                obj.impulseX /= factor;
                obj.impulseY /= factor;
            }
            if(obj.mass == 5)
                l("logTxt2").innerHTML += 
                    "<br/>---collider--- " + 
                    "<br/>modX: " + (xmod ? xmod : 0).toFixed(5) + 
                    "<br/>modY: " + (ymod ? ymod : 0).toFixed(5);
            delete obj.impulseArrayX;
            delete obj.impulseArrayY;
        }
    }
}

// collision detector

function Collider(map, impassableBlocks, rootEntity, impassableObjects){
    this.map = map;
    this.impassableBlocks = impassableBlocks;
    this.rootEntity = rootEntity;
    this.impassableObjects = impassableObjects;
}

Collider.prototype.IsCollided = function(rect, sourceObject){
    //check map
    var tw = this.map.tileWidth;
    var th = this.map.tileHeight;

    var rectMbr = rect.GetMbr();

    var tileXmin = Math.round(rectMbr.xmin / tw - 0.5);
    var tileYmin = Math.round(rectMbr.ymin / th - 0.5);
    var tileXmax = Math.round(rectMbr.xmax / tw - 0.5);
    var tileYmax = Math.round(rectMbr.ymax / th - 0.5);

    for (var tileX = tileXmin; tileX <= tileXmax; tileX++){
        for(var tileY = tileYmin; tileY <= tileYmax; tileY++){
            if (tileX >= 0 && tileX < this.map.width && tileY >= 0 && tileY < this.map.height){
                var mapChar = this.map.getTerrainChar(tileX, tileY);
                if (this.impassableBlocks.indexOf(mapChar) > -1){
                    // check for collision, yeah!
                    var tileRect = new Geom.Rect(
                        tileX*tw + tw/2,
                        tileY*th + th/2,
                        tw,
                        th,
                        0
                    )

                    if (Geom.Collide(rect, tileRect))
                    {
                        return false;// {tileX: tileX, tileY: tileY};
                    }
                }
            }
        }
    }

    //check objects

    if (this.rootEntity && this.impassableObjects){
        for (var i = 0; i < this.rootEntity.items.length; i++){
            var obj = this.rootEntity.items[i];
            if (obj != sourceObject && obj.class && this.impassableObjects.indexOf(obj.class) > -1){
                var objRect = new Geom.Rect(obj.x, obj.y, obj.width, obj.height, obj.angle);
                if (Geom.Intersect(rect, objRect))
                {
                    return obj;
                }
            }
        }
    }

    return false;
}