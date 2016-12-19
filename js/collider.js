// collision detector

function Collider(map, impassableBlocks){
    this.map = map;
    this.impassableBlocks = impassableBlocks;
}

Collider.prototype.IsCollided = function(rect){
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

                    if (Geom.Intersect(rect, tileRect))
                    {
                        return {tileX: tileX, tileY: tileY};
                    }
                }
            }
        }
    }

    return false;
}