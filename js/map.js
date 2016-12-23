
function Map(){

    this.width = 65;
    this.height = 44;

    var terrain = 
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "S...........c||||c...........,||,||,...........c||||c...........S" +
    "S...........c||||c.........,,,||,||,,..........c||||c...........S" +
    "S...........c||||c.....BBBBaaa||a||aaaBBBB.....c||||c...........S" +
    "S...........c||||c.....BcccaaaaaaaaaaacccB.....c||||c...........S" +
    "S...........c||||c.....BcccaaaaaaaaaaacccB.....c||||c...........S" +
    "S...........c||||c.....BcccaaaaaaaaaaacccB.....c||||c...........S" +
    "S...........c||||c,....ccccaaaaaaaaaaacccc.....c||||c...........S" +
    "S...........c||||c.....ccccccccccccccccccc.....c||||c...........S" +
    "S...........c||||c.....ccccccccccccccccccc.....c||||c...........S" +
    "S...........c||||c.....BcccccccccccccccccB.....c||||c...........S" +
    "S...........c||||c.....BcccBBBaaaaaBBBcccB.....c||||c...........S" +
    "S...........c||||c.....BcccB..aaaaa..BcccB.....c||||c...........S" +
    "Scccccccccccc||||ccccccccccccccccccccccccccccccc||||ccccccccccccS" +
    "S------------++++-------------------------------++++------------S" +
    "S------------++++-------------------------------++++------------S" +
    "S------------++++-------------------------------++++------------S" +
    "S------------++++-------------------------------++++------------S" +
    "Scccccccccccc||||ccccccccccccccccccccccccccccccc||||ccccccccccccS" +
    "ScccccccccBBc||||c....S.......aaSaa.......S....c||||cBBcccccccccS" +
    "SccccccccBBSc||||caaaaSaaaaaaaaaSaaaaaaaaaSaaaac||||cSBBccccccccS" +
    "S........BS.c||||caaaaSaaaaaaaaaSaaaaaaaaaSaaaac||||c.SB........S" +
    "S..........,c||||caaaaaaaaaSaaaaaaaaaSaaaaaaaaac||||c,..........S" +
    "S..cccc...,,c||||caaaaaaaaaSaaaaaaaaaSaaaaaaaaac||||c,,...cccc..S" +
    "S..cBBc....,c||||c.........S.........S.........c||||c,....cBBc..S" +
    "S..cBBc..BB.c||||c.SSSS....BBBBBBBBBBB....SSSS.c||||c.BB..cBBc..S" +
    "S..cccc..BB.c||||c.S.......BBBBBBBBBBB.......S.c||||c.BB..cccc..S" +
    "S,,......BB.c||||c.S.........B.....B.........S.c||||c.BB......,,S" +
    "S,,,,....BB.c||||c.S......B..B..B..B..B......S.c||||c.BB....,,,,S" +
    "S,;;,BBBBBB.c||||c.BB.....B.....B.....B.....BB.c||||c.BBBBBB,;;,S" +
    "S,;;,BBBBBB.c||||c.BB.....B..B..B..B..B.....BB.c||||c.BBBBBB,;;,S" +
    "S.,,,.......c||||c.BB........B.....B........BB.c||||c.......,,,.S" +
    "Saaaaaaaaaaac||||c.BBBBBBBBBBBBBBBBBBBBBBBBBBB.c||||caaaaaaaaaaaS" +
    "Saaaaaaaaaaac||||c.BBBBBBBBBBBBBBBBBBBBBBBBBBB.c||||caaaaaaaaaaaS" +
    "Saaaaaaaaaaac||||c.BB........BB,,,,.........BB.c||||caaaaaaaaaaaS" +
    "Saaaaaaaaaaac||||c.BB......,,BB;;;;;,,......BB.c||||caaaaaaaaaaaS" +
    "S...aaaa....c||||c.BB..,..;;;BB,,,;;;;;..,..BB.c||||c....aaaa...S" +
    "SSSSaaaaSSS.c||||c.BB.,;BB,,.BB...BBBBBBB;,.BB.c||||c.SSSaaaaSSSS" +
    "SSccccccccS.c||||c,BB,;;BB...BB...BBBBBBB;;,BB,c||||c.SccccccccSS" +
    "SSccccccccS.c||||c;;;;;;BB.............BB;;;;;;c||||c.SccccccccSS" +
    "SSccccccccS.c||||c;;;;;;BB.............BB;;;;;;c||||c.SccccccccSS" +
    "SSccccccccS.c||||c;;;;;;BB.............BB;;;;;;c||||c.SccccccccSS" +
    "SSccccccccS.c||||c.BB...,,........BB...,,...BB.c||||c.SccccccccSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";

    var buildings = false;
    // var buildings =
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                      **                                       " +
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                      **                                       " +
    // "                                                               " +
    // "                                                               " +
    // "                                                               " +
    // "                            │        │                         " +
    // "      ╶╌╴                   │        │                         " +
    // "                            ╎        ╎                         " +
    // "     ┌─┬─┐                  │        │                         " +
    // "     │ │ │  ╷               │        │                         " +
    // "     ├─┼─┤  ╎               ╎        ╎                         " +
    // "     │ │ │  ╵               │        │                         " +
    // "     └─┴─┘                  │        │                         " +
    // "                            └──╴  ╶──┘                         " +
    // "                                                               "

    this.tilesImage = new Image();
    this.tilesImage.src = "./images/tiles-winter.png"
    if(terrain.length != this.width * this.height)
        throw "Cannot load map from string!";

    this.terrainArray = Array.from(terrain);
    this.buildingArray = (buildings) ? Array.from(buildings) : Array.from(Array(this.terrainArray.length + 1).join(' ')); // looks stupid, but wtf

    this.tileDictionary = {};
    this.tileDictionary['.'] = {tileX: 0, tileY: 0, variants: 8, traction: 0.5};
    this.tileDictionary[','] = {tileX: 0, tileY: 1, variants: 8, traction: 0.4};
    this.tileDictionary[';'] = {tileX: 0, tileY: 2, variants: 8, traction: 0.3};
    this.tileDictionary['-'] = {tileX: 0, tileY: 4, variants: 4, traction: 0.8};
    this.tileDictionary['+'] = {tileX: 4, tileY: 4, variants: 4, traction: 0.8};
    this.tileDictionary['|'] = {tileX: 0, tileY: 5, variants: 4, traction: 0.8};
    this.tileDictionary['B'] = {tileX: 0, tileY: 9, variants: 2, traction: 0.1};
    this.tileDictionary['S'] = {tileX: 2, tileY: 6, traction: 0.1};
    this.tileDictionary['b'] = {tileX: 2, tileY: 9, variants: 2, traction: 0.9, speed: 0.3};
    this.tileDictionary['a'] = {tileX: 0, tileY: 7, variants: 8, traction: 0.95};
    this.tileDictionary['c'] = {tileX: 0, tileY: 8, variants: 4, traction: 0.95};

    this.tileDictionary['x'] = {tileX:  0, tileY: 3, variants: 4};

    return this;
}

Map.prototype = {
    tileWidth: 16,
    tileHeight: 16,
    tileArtWidth: 8,
    tileArtHeight: 8,
    getTerrainChar: function(x, y) {
        var index = y*this.width + x;
        return this.terrainArray[index];
    },
    setTerrainChar: function(x, y, char) {
        var index = y*this.width + x;
        this.terrainArray[index] = char;
    },
    getBuildingChar: function(x, y) {
        var index = y*this.width + x;
        return this.buildingArray[index];
    },
    impassableTiles: "BS",
    getTile: function(xcell, ycell) {
        var tchar = this.getTerrainChar(xcell, ycell);
        var bchar = this.getBuildingChar(xcell, ycell);
        if( xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height )
            return {
                terrain: tchar,
                building: bchar,
                tractionFactor: this.tileDictionary[tchar].traction,
                passable: this.impassableTiles.indexOf(tchar) < 0 && bchar == ' ',
            };
    },
    getTileAt: function(xpx, ypx) {
        var xcell = Math.floor(xpx / this.tileWidth);
        var ycell = Math.floor(ypx / this.tileHeight);
        return this.getTile(xcell, ycell);
    },
    degradation: ".,; Bb",
    degradeTile: function(xcell, ycell) {
        if( xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height ) {
            var char = this.getTerrainChar(xcell, ycell);
            var idx = this.degradation.indexOf(char);
            if( idx > -1 && idx + 1 < this.degradation.length && this.degradation.charAt(idx + 1) != ' ')
                this.setTerrainChar(xcell, ycell, this.degradation.charAt(idx + 1));
        }
    },
    degradeTileAt: function(xpx, ypx) {
        var xcell = Math.floor(xpx / this.tileWidth);
        var ycell = Math.floor(ypx / this.tileHeight);
        this.degradeTile(xcell, ycell);
    },
    drawMap: function(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        for(var cx = 0; cx < this.width; cx ++)
            for(var cy = 0; cy < this.height; cy ++) {
                this.drawTile(ctx, cx, cy, this.getTerrainChar(cx, cy));
                var bchar = this.getBuildingChar(cx, cy);
                if( bchar != ' ')
                    this.drawTile(ctx, cx, cy, bchar);
            }
        ctx.restore();
    },
    drawTile: function(ctx, x, y, tileChar) {
        var tileCfg = this.tileDictionary[tileChar];
        var randomOffset = 0;
        if(tileCfg.variants)
            randomOffset = (x * 17 + y * 13) % tileCfg.variants;
            // can also rotate ground tiles?

        ctx.drawImage(this.tilesImage, (tileCfg.tileX + randomOffset) * this.tileArtWidth, tileCfg.tileY * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight,
            x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    }
}