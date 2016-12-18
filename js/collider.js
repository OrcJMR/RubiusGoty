// collision detector

function Collider(map, impassableBlocks){
    this.map = map;
    this.impassableBlocks = impassableBlocks;
}

Collider.prototype.IsCollided = function(rect){
    var tw = this.map.tileWidth;
    var th = this.map.tileHeight;

    var tileXmin = Math.round(rect.x / tw - 0.5) - 1;
    var tileYmin = Math.round(rect.y / th - 0.5) - 1;

    for (var tileX = tileXmin; tileX < tileXmin + 3; tileX++){
        for(var tileY = tileYmin; tileY < tileYmin + 3; tileY++){
            if (tileX >= 0 && tileX < this.map.width && tileY >= 0 && tileY < this.map.height){
                var mapChar = this.map.getChar(tileX, tileY);
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
                        return true;
                    }
                }
            }
        }
    }

    return false;
}