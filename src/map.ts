class Map {
    public tileDictionary: any;
    public buildingArray: string[];
    public terrainArray: string[];
    public powerupPoints = {};
    public height: number;
    public width: number;
    public tilesImage;
    public tileArtHeight = 8;
    public tileArtWidth = 8;
    public tileHeight = 16;
    public tileWidth = 16;

    private degradation = ".,; Bb";
    private impassableTiles = "BS";

    constructor() {

        this.width = 65;
        this.height = 49;

        const terrain =
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

        const buildings =
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "               h                                  h              " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "            x                                                    " +
            "             x                                                   " +
            "              x                                                  " +
            "   h                                             x            h  " +
            "                                                x                " +
            "                                               x                 " +
            "                                D                                " +
            "                                                                 " +
            "                                                                 " +
            "            xx                                     xx            " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                               xxxx                              " +
            "                xx                             xx                " +
            "                                                                 " +
            "                                                                 " +
            "                        x               x                        " +
            "                        x               xx                       " +
            "            xx                                     xx            " +
            "                                                                 " +
            "                                H                                " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "               h                                  h              " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 ";


        if (terrain.length !== this.width * this.height) {
            throw new Error("Cannot load map from string!");
        }

        this.terrainArray = Array.from(terrain);
        this.buildingArray = (buildings)
            ? Array.from(buildings)
            : Array.from(Array(this.terrainArray.length + 1).join(" ")); // looks stupid, but wtf

        this.tileDictionary = {};
        this.tileDictionary["."] = { tileX: 0, tileY: 0, variants: 8, traction: 0.5 };
        this.tileDictionary[","] = { tileX: 0, tileY: 1, variants: 8, traction: 0.4 };
        this.tileDictionary[";"] = { tileX: 0, tileY: 2, variants: 8, traction: 0.3 };
        this.tileDictionary["-"] = { tileX: 0, tileY: 4, variants: 4, traction: 0.8 };
        this.tileDictionary["+"] = { tileX: 4, tileY: 4, variants: 4, traction: 0.8 };
        this.tileDictionary["|"] = { tileX: 0, tileY: 5, variants: 4, traction: 0.8 };
        this.tileDictionary["B"] = { tileX: 0, tileY: 9, variants: 2, traction: 0.1 };
        this.tileDictionary["S"] = { tileX: 2, tileY: 6, traction: 0.1 };
        this.tileDictionary["b"] = { tileX: 2, tileY: 9, variants: 2, traction: 0.9, speed: 0.5 };
        this.tileDictionary["a"] = { tileX: 0, tileY: 7, variants: 8, traction: 0.95 };
        this.tileDictionary["c"] = { tileX: 0, tileY: 8, variants: 4, traction: 0.95 };
        this.tileDictionary["f"] = { tileX: 4, tileY: 8, variants: 4, traction: 0.95 };

        // all buildings not listed in dictionary are considered powerup points and are removed from map
        this.tileDictionary["x"] = { tileX: 0, tileY: 3, variants: 4 };

        for (let i = 0; i < this.buildingArray.length; i++) {
            const char = this.buildingArray[i];
            if (char === " ") {
                continue;
            }
            if (char in this.tileDictionary) {
                continue;
            }
            let array;
            if (char in this.powerupPoints) {
                array = this.powerupPoints[char];
            } else {
                array = [];
                this.powerupPoints[char] = array;
            }
            array.push(new PowerupPoint(i % this.width, Math.floor(i / this.width)));
            this.buildingArray[i] = " ";
        }
    }

    public drawTile(ctx, x, y, tileChar) {
        const tileCfg = this.tileDictionary[tileChar];
        if (!tileCfg) {
            return;
        }
        let randomOffset = 0;
        if (tileCfg.variants) {
            randomOffset = (x * 17 + y * 13) % tileCfg.variants;
        }
        // can also rotate ground tiles?

        ctx.drawImage(this.tilesImage,
            (tileCfg.tileX + randomOffset) * this.tileArtWidth,
            tileCfg.tileY * this.tileArtHeight,
            this.tileArtWidth,
            this.tileArtHeight,
            x * this.tileWidth,
            y * this.tileHeight,
            this.tileWidth,
            this.tileHeight);
    }

    public drawMap(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        for (let cx = 0; cx < this.width; cx++) {
            for (let cy = 0; cy < this.height; cy++) {
                const char = this.getTerrainChar(cx, cy);
                this.drawTile(ctx, cx, cy, char);
                if (char !== "B" && char !== "S" && cy > 0 && cx > 0 && cy < 43 && cx < 64) {
                    let dx = 0;
                    let dy = 0;
                    let dxs = 0;
                    let dys = 0;
                    const tleft = this.getTerrainChar(cx - 1, cy);
                    const tright = this.getTerrainChar(cx + 1, cy);
                    const ttop = this.getTerrainChar(cx, cy - 1);
                    const tbottom = this.getTerrainChar(cx, cy + 1);
                    if (tleft === "B" || tleft === "S") { dx += 2; }
                    if (tright === "B" || tright === "S") { dx += 1; }
                    if (ttop === "B" || ttop === "S") { dy += 2; }
                    if (tbottom === "B" || tbottom === "S") { dy += 1; }
                    if (char !== "." && char !== "," && char !== ";") {
                        if (tleft === "." || tleft === "," || tleft === ";") { dxs += 2; }
                        if (tright === "." || tright === "," || tright === ";") { dxs += 1; }
                        if (ttop === "." || ttop === "," || ttop === ";") { dys += 2; }
                        if (tbottom === "." || tbottom === "," || tbottom === ";") { dys += 1; }
                    }
                    if (dxs || dys) {
                        ctx.drawImage(this.tilesImage,
                            (8 + dxs) * this.tileArtWidth,
                            (0 + dys) * this.tileArtHeight,
                            this.tileArtWidth,
                            this.tileArtHeight,
                            cx * this.tileWidth,
                            cy * this.tileHeight,
                            this.tileWidth,
                            this.tileHeight);
                    }
                    if (dx || dy) {
                        ctx.drawImage(this.tilesImage,
                            (12 + dx) * this.tileArtWidth,
                            (0 + dy) * this.tileArtHeight,
                            this.tileArtWidth,
                            this.tileArtHeight,
                            cx * this.tileWidth,
                            cy * this.tileHeight,
                            this.tileWidth,
                            this.tileHeight);
                    }
                }
                const bchar = this.getBuildingChar(cx, cy);
                if (bchar !== " ") {
                    this.drawTile(ctx, cx, cy, bchar);
                }
            }
        }

        ctx.restore();
    }

    public degradeTileAt(xpx, ypx) {
        const xcell = Math.floor(xpx / this.tileWidth);
        const ycell = Math.floor(ypx / this.tileHeight);
        this.degradeTile(xcell, ycell);
    }

    public degradeTile(xcell, ycell) {
        if (xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height) {
            const char = this.getTerrainChar(xcell, ycell);
            const idx = this.degradation.indexOf(char);
            if (idx > -1 && idx + 1 < this.degradation.length && this.degradation.charAt(idx + 1) !== " ") {
                this.setTerrainChar(xcell, ycell, this.degradation.charAt(idx + 1));
            }
        }
    }

    public getTileAt(xpx, ypx) {
        const xcell = Math.floor(xpx / this.tileWidth);
        const ycell = Math.floor(ypx / this.tileHeight);
        return this.getTile(xcell, ycell);
    }

    public getTile(xcell, ycell) {
        const tchar = this.getTerrainChar(xcell, ycell);
        const bchar = this.getBuildingChar(xcell, ycell);
        if (xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height) {
            return {
                terrain: tchar,
                building: bchar,
                tractionFactor: this.tileDictionary[tchar].traction,
                speed: this.tileDictionary[tchar].speed,
                passable: this.impassableTiles.indexOf(tchar) < 0 && bchar === " ",
            };
        }
    }

    public getBuildingChar(x, y): string {
        const index = y * this.width + x;
        return this.buildingArray[index];
    }

    public setTerrainChar(x, y, char) {
        const index = y * this.width + x;
        this.terrainArray[index] = char;
    }

    public getTerrainChar(x, y): string {
        const index = y * this.width + x;
        return this.terrainArray[index];
    }
}

function PowerupPoint(x, y) {
    this.x = x;
    this.y = y;
    this.powerup = null;
}

export default Map;
