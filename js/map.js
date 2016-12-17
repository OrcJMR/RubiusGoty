
function Map2(width, height, mapString){
    this.width = width;
    this.height = height;
    this.tilesImage = new Image();
    this.tilesImage.src = "./images/tiles.png"
    if(mapString.length != width * height)
        throw "Cannot load map from string!";
    this.mapString = mapString;
    return this;
}

Map2.prototype = {
    tileWidth: 32,
    tileHeight: 32,
    getChar: function(x, y) {
        var index = y*this.width + x;
        return this.mapString.charAt(index);
    },
    getTile: function(x, y) {
        var char = this.getChar(x, y);
        return {
            code: char,
            tractionFactor: char == ',' ? 0.5 : 1,
            passable: char != 'B',
        };
    },
    drawMap: function(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        for(var cx = 0; cx < this.width; cx ++)
            for(var cy = 0; cy < this.height; cy ++)
                this.drawTile(ctx, cx, cy, this.getChar(cx, cy));
        ctx.restore();
    },
    drawTile: function(ctx, x, y, tileChar) {
        switch(tileChar){
            case '.':
                ctx.drawImage(this.tilesImage, 160, 96, 32, 32,
                    x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight);
                break;
            case ',':
                ctx.drawImage(this.tilesImage, 128, 96, 32, 32,
                    x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight);
                break;
            case 'B':
                ctx.drawImage(this.tilesImage, 64, 96, 32, 32,
                    x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight);
                break;
            default:
        }
    }
}