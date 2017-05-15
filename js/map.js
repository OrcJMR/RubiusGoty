
function Map(){

    this.width = 65;
    this.height = 49

    var terrain = 
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "Sffffffffff,c||||cBBB.......SfffffffS.......BBBc||||c,ffffffffffS" +
    "Sffffffffff,c||||cBB.......,SfffffffS,.......BBc||||c,ffffffffffS" +
    "Sffffffffff,c||||cB.......,;fffffffff;,.......Bc||||c,ffffffffffS" +
    "Sffffffffff,c||||c......S.,;fffffffff;,.S......c||||c,ffffffffffS" +
    "SffffBBBBBB.c||||.......S.,;fffffffff;,.S......c||||c.BBBBBBffffS" +
    "SffffBBBBBB.c|||........S..,SfffffffS,..S......c||||c.BBBBBBffffS" +
    "SffffffffBB.c|||....B...S..,SSSSSSSSS,..S...B..c||||c.BBffffffffS" +
    "SffffffffBB.c||||..BB...BBBBBBBBBBBBBBBBB...BB.c||||c.BBffffffffS" +
    "SffffffffBB.c||||c.BB.......BBBBBBBBB.......BB.c||||c.BBffffffffS" +
    "SBBBBffffBB.c||||c,,,,......,,,,,..............c||||c.BBffffBBBBS" +
    "SBBBBffffBB.c||||c...............,,,,,.........c||||c.BBffffBBBBS" +
    "S....,,,,...c||||c.....B.................B.....c||||c...,,ff,...S" +
    "Sccccccccccc.||||c....BSB......,,;,.....BSB....c||||ccccccccccccS" +
    "S------------.+||c.BBBBBBBBBBBBBbbBBBBBBBBBBBB.c||++------------S" +
    "S------------+++|c.BBBBBBBBBBBBbbBBBBBBBBBBBBB..|+++------------S" +
    "S------------+++|c.BBfffffffffffffffffffffffBB....++------------S" +
    "S------------++||c.,faaffffffffffbbffbbfffbfBB...|++------------S" +
    "Scccccccccccc||||c,;fafaffaffafafbfbfbfbfbfbf,,.||||cccc..ccccccS" +
    "SfffBBBBBBBBc||||c,;fafafafafafafbbffbbffbfbf;,c||||cBBBBBBBBfffS" +
    "SfffBBBBBBBBc||||c.;fafafaaffafafbfffbfbfbfbf;,c||||cBBBBBBBBfffS" +
    "SfffffffffBBc||||c.,faafffaaffaffbfffbfbffbff,.c||||cBBfffffffffS" +
    "SfffffffffBBc||||c.BBfffffffffffffffffffffffBB.c||||cBBfffffffffS" +
    "SfffffffffBBc||||c.BBB;;;;BBBBBBBBBBBBB;;;;BBB.c||||cBBfffffffffS" +
    "SBBBBBBfffBBc||||c.BBB,,,,BBBBBBBBBBBBB,,,,BBB.c||||cBBfffBBBBBBS" +
    "SBBBBBBfffBBc||||c.............................c||||cBBfffBBBBBBS" +
    "S;;;;BBfffBBc||||cccccccccccccc....ccccccccccccc||||cBBfffBB;;;;S" +
    "S,,,,BBfffBBc||++-------------------------------++||cBBfffBB,,,,S" +
    "S....BBfffBBc|+++-------------------------------+++|cBBfffBB....S" +
    "S...........c|+++-------------------------------+++|c...........S" +
    "S............||++-----------------------.-------++||c...........S" +
    "S...,,,,.....||||cccccccccccccccccccccc...cccccc||||c....,,,,...S" +
    "S.,;SSSSBBBB.||||cBBBBBBBBBBBB.ccc.BBBBBBBBBBBBc||||cBBBBSSSS;,.S" +
    "S....,,,;;;Bc||||cBBBBBBBBBBBB.ccc.BBBBBBBBBBBBc||||cB;;;,,,....S" +
    "S......,,;;Bc||||cBB........BB.ccc.BB........BBc||||cB;;,,......S" +
    "S.......,,;Bc||||cBB........BB.ccc.BB........BBc||||cB;,,.......S" +
    "SSSfffSS.,,Sc||||cBB...........ccc...........BBc||||cS,,.SSfffSSS" +
    "SffffffS..,Sc||||c.....,B,.....ccc.....,B,.....c||||cS,..SffffffS" +
    "Sfffffff..,Sc||||c.....BSB.....ccc.....BSB.....c||||cS,..fffffffS" +
    "Sfffffff...Sc||||c.....,B,.....ccc.....,B,.....c||||cS...fffffffS" +
    "Sfffffff....c||||cBB.........BBBBBBB.........BBc||||c....fffffffS" +
    "SffffffS....c||||cBB........BBBBBBBBB........BBc||||.....SffffffS" +
    "SffffffS....c||||cBB.......BBBBBBBBBBB.......BBc|||......SffffffS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";

    var buildings = 
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "            x                                                    "  +
    "             x                                                   "  +
    "              x                                                  "  +
    "                                                 x               "  +
    "                                                x                "  +
    "                                               x                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "            xx                                     xx            "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                               xxxx                              "  +
    "                xx                             xx                "  +
    "                                                                 "  +
    "                                                                 "  +
    "                        x               x                        "  +
    "                        x               xx                       "  +
    "            xx                                     xx            "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 "  +
    "                                                                 ";

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
    this.tileDictionary['b'] = {tileX: 2, tileY: 9, variants: 2, traction: 0.9, speed: 0.5};
    this.tileDictionary['a'] = {tileX: 0, tileY: 7, variants: 8, traction: 0.95};
    this.tileDictionary['c'] = {tileX: 0, tileY: 8, variants: 4, traction: 0.95};
    this.tileDictionary['f'] = {tileX: 4, tileY: 8, variants: 4, traction: 0.95};

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
                speed: this.tileDictionary[tchar].speed,
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
                var char = this.getTerrainChar(cx, cy);
                this.drawTile(ctx, cx, cy, char);
                if(char != 'B' && char != 'S' && cy > 0 && cx > 0 && cy < 43 && cx < 64) {
                    var dx = 0;
                    var dy = 0;
                    var dxs = 0;
                    var dys = 0;
                    var tleft = this.getTerrainChar(cx-1,cy);
                    var tright = this.getTerrainChar(cx+1,cy);
                    var ttop = this.getTerrainChar(cx,cy-1);
                    var tbottom = this.getTerrainChar(cx,cy+1);
                    if(tleft == 'B' || tleft == 'S')  {dx += 2; }
                    if(tright == 'B' || tright == 'S')  dx += 1;
                    if(ttop == 'B' || ttop == 'S')  dy += 2;
                    if (tbottom == 'B' || tbottom == 'S') dy += 1;
                    if (char != '.' && char != ',' && char != ';'){
                        if (tleft == '.' || tleft == ',' || tleft == ';') dxs += 2;
                        if (tright == '.' || tright == ',' || tright == ';') dxs += 1;
                        if (ttop == '.' || ttop == ',' || ttop == ';') dys += 2;
                        if (tbottom == '.' || tbottom == ',' || tbottom == ';') dys += 1;
                    }
                    if(dxs || dys)
                        ctx.drawImage(this.tilesImage, (8+dxs) * this.tileArtWidth, (0+dys) * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight,
                            cx * this.tileWidth, cy * this.tileHeight, this.tileWidth, this.tileHeight);                                                
                    if (dx || dy)
                        ctx.drawImage(this.tilesImage, (12 + dx) * this.tileArtWidth, (0 + dy) * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight,
                            cx * this.tileWidth, cy * this.tileHeight, this.tileWidth, this.tileHeight);

                }
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