
function Map(){

    this.width = 63;
    this.height = 47;

    var terrain = 
    "................B...........,||,||,...........B................" +
    "................B...........,||,||,...........B................" +
    "................B.........,,,||,||,,..........B................" +
    "................B.....BBBBaaa||a||aaaBBBB.....B................" +
    "................B.....BcccaaaaaaaaaaacccB.....B................" +
    "................B.....BcccaaaaaaaaaaacccB.....B................" +
    "................B.....BcccaaaaaaaaaaacccB.....B................" +
    "................B,....ccccaaaaaaaaaaacccc.....B................" +
    "................B.....ccccccccccccccccccc.....B................" +
    "................B.....ccccccccccccccccccc.....B................" +
    "................B.....BcccccccccccccccccB.....B................" +
    "................B.....BcccBBBaaaaaBBBcccB.....B................" +
    "................B.....BcccB..aaaaa..BcccB.....B................" +
    "................B.....BBcBB..aaaaa..BBcBB.....B................" +
    "................B............aaaaa............B................" +
    "................B......SSS...aaaaa...SSS......B................" +
    "BBBBBBBBBBBBBBBBB.........S..aaaaa..S.........BBBBBBBBBBBBBBBBB" +
    "cccccccccBB...............S..aaaaa..S...............BBccccccccc" +
    "cccccccccbb...............S..aaaaa..S...............bbccccccccc" +
    "cccccccccBB..........S.......aaSaa.......S..........BBccccccccc" +
    "ccccccccBBS.aaaaaaaaaSaaaaaaaaaSaaaaaaaaaSaaaaaaaaa.SBBcccccccc" +
    "........BS..aaaaaaaaaSaaaaaaaaaSaaaaaaaaaSaaaaaaaaa..SB........" +
    "..........,,aaaaaaaaaaaaaaSaaaaaaaaaSaaaaaaaaaaaaaa,,.........." +
    "..cccc...,,,aaaaaaaaaaaaaaSaaaaaaaaaSaaaaaaaaaaaaaa,,,...cccc.." +
    "..cBBc....,,aaaa..........S.........S..........aaaa,,....cBBc.." +
    "..cBBc..BB..aaaa..SSSS....BBBBBBBBBBB....SSSS..aaaa..BB..cBBc.." +
    "..cccc..BB..aaaa..S.......BBBBBBBBBBB.......S..aaaa..BB..cccc.." +
    ",,......BB..aaaa..S.........B.....B.........S..aaaa..BB......,," +
    ",,,,....BB..aaaa..S......B..B..B..B..B......S..aaaa..BB....,,,," +
    ",::,BBBBBB..aaaa..BB.....B.....B.....B.....BB..aaaa..BBBBBB,::," +
    ",::,BBBBBB..aaaa..BB.....B..B..B..B..B.....BB..aaaa..BBBBBB,::," +
    ".,,,........aaaa..BB........B.....B........BB..aaaa........,,,." +
    "aaaaaaaaaaaaaaaa..BBBBBBBBBBBBBBBBBBBBBBBBBBB..aaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaa..BBBBBBBBBBBBBBBBBBBBBBBBBBB..aaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaa..BB........BB,,,,.........BB..aaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaa..BB......,,BB:::::,,......BB..aaaaaaaaaaaaaaaa" +
    "...aaaa.....aaaa..BB..,..:::BB,,,:::::..,..BB..aaaa.....aaaa..." +
    "SSSaaaaSSS..aaaa..BB.,:BB,,.BB...BBBBBBB:,.BB..aaaa..SSSaaaaSSS" +
    "SccccccccS..aaaa,,BB,::BB...BB...BBBBBBB::,BB,,aaaa..SccccccccS" +
    "SccccccccS..aaaa:::::::BB.............BB:::::::aaaa..SccccccccS" +
    "SccccccccS..aaaa:::::::BB.............BB:::::::aaaa..SccccccccS" +
    "SccccccccS..aaaa:::::::BB.............BB:::::::aaaa..SccccccccS" +
    "SccccccccS..aaaa,,BB,::BBBBBBB...BB...BB::,BB,,aaaa..SccccccccS" +
    "SccccccccS..aaaa..BB.,:BBBBBBB...BB...BB:,.BB..aaaa..SccccccccS" +
    "SccccccccS..||||..BB..,:,,.......BB..,,:,..BB..||||..SccccccccS" +
    "SccccccccS..||||..BB...,,........BB...,,...BB..||||..SccccccccS" +
    "SSSSSSSSSS..||||..BB.............BB........BB..||||..SSSSSSSSSS";

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
    this.tileDictionary['.'] = {tileX: 0, tileY: 0, variants: 8, traction: 1};
    this.tileDictionary[','] = {tileX: 0, tileY: 1, variants: 8, traction: 0.9};
    this.tileDictionary[':'] = {tileX: 0, tileY: 2, variants: 8, traction: 0.8};
    this.tileDictionary[';'] = {tileX: 0, tileY: 3, variants: 8, traction: 0.7};
    this.tileDictionary['&'] = {tileX: 0, tileY: 4, variants: 8, traction: 0.5};
    this.tileDictionary['|'] = {tileX: 0, tileY: 5, variants: 4, traction: 1.5};
    this.tileDictionary['B'] = {tileX: 0, tileY: 9, variants: 2, traction: 0};
    this.tileDictionary['S'] = {tileX: 2, tileY: 6, traction: 0};
    this.tileDictionary['b'] = {tileX: 2, tileY: 9, variants: 2, traction: 0.3};
    this.tileDictionary['a'] = {tileX: 0, tileY: 7, variants: 8, traction: 2};
    this.tileDictionary['c'] = {tileX: 0, tileY: 8, variants: 8, traction: 2};

    this.tileDictionary['╶'] = {tileX:  8, tileY: 0};
    this.tileDictionary['╴'] = {tileX:  9, tileY: 0};
    this.tileDictionary['╵'] = {tileX: 10, tileY: 0};
    this.tileDictionary['╷'] = {tileX: 11, tileY: 0};
    this.tileDictionary['└'] = {tileX:  8, tileY: 1};
    this.tileDictionary['┌'] = {tileX:  9, tileY: 1};
    this.tileDictionary['┘'] = {tileX: 10, tileY: 1};
    this.tileDictionary['┐'] = {tileX: 11, tileY: 1};
    this.tileDictionary['├'] = {tileX:  8, tileY: 2};
    this.tileDictionary['┬'] = {tileX:  9, tileY: 2};
    this.tileDictionary['┴'] = {tileX: 10, tileY: 2};
    this.tileDictionary['┤'] = {tileX: 11, tileY: 2};
    this.tileDictionary['*'] = {tileX:  8, tileY: 3};
    this.tileDictionary['╎'] = {tileX:  9, tileY: 3};
    this.tileDictionary['╌'] = {tileX: 10, tileY: 3};
    this.tileDictionary['┼'] = {tileX: 11, tileY: 3};
    this.tileDictionary['│'] = {tileX:  8, tileY: 4, variants: 4};
    this.tileDictionary['─'] = {tileX:  8, tileY: 5, variants: 4};

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
    getTile: function(xcell, ycell) {
        var tchar = this.getTerrainChar(xcell, ycell);
        var bchar = this.getBuildingChar(xcell, ycell);
        if( xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height )
            return {
                terrain: tchar,
                building: bchar,
                tractionFactor: this.tileDictionary[tchar].traction,
                passable: tchar != 'B' && bchar == ' ',
            };
    },
    getTileAt: function(xpx, ypx) {
        var xcell = Math.floor(xpx / this.tileWidth);
        var ycell = Math.floor(ypx / this.tileHeight);
        return this.getTile(xcell, ycell);
    },
    degradation: ".,:;& Bb",
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