
var EntityBase = {

    addBehavior: function(beh) {
        var name = beh.name;
        beh.init(this);
        this._behaviors[name] = beh.exec;
    },

    draw: function(ctx) {
        if(typeof this.items != 'undefined')
            this.items.forEach(function(item, i, arr){
                ctx.save();
                if(typeof item.alpha != 'undefined')
                    ctx.globalAlpha = item.alpha;
                ctx.translate(item.x, item.y);
                ctx.rotate(item.angle);
                if(typeof item.scaleX != 'undefined')
                    ctx.scale(item.scaleX, item.scaleY);
                item.draw(ctx);
                ctx.restore();
            });
        else // don't try to draw groups. if enabling, make sure "undercofigured object" is not raised
        if(typeof this.image != 'undefined') {
            if(!this.spriteWidth)
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            else
                ctx.drawImage(this.image, this.spriteIndex * this.spriteWidth, 0, this.spriteWidth, this.image.height,
                                          -this.width / 2, -this.height / 2, this.width, this.height);

        } else if(typeof this.color != 'undefined') {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        }
        //else if (typeof this.speed != 'undefined'){
        //    ctx.fillText(this.speed, 0, 0);
        //}
        else
            console.debug("Underconfigured object, unable to draw");
    },

    update: function(delta) {

        // run updates
        for(var behavior in this._behaviors)
            this._behaviors[behavior](this, delta);

        // run updates on children an remove dead children, if any
        if(typeof this.items != 'undefined')
            for(var i = 0; i < this.items.length; i++) {
                this.items[i].update(delta);
                if(this.items[i].dead){
                    this.items.splice(i, 1);
                    i--;
                }
            }
    },

    addChild: function(child, index) {
        if(typeof index == 'undefined')
            this.items.push(child);
        else
            this.items.splice(index, 0, child);
        child.parent = this;
    },

    // takes an obj in descendantParent's coordinate system, and changes its coordinates to this'.
    // this must be a predecessor of descendantParent
    changeCoordinatesFromDescendant: function(obj, descendantParent) {
        var currentParent = descendantParent,
            lastX, lastY, lastA;
        while (currentParent != this) {
            lastX = obj.x,
            lastY = obj.y,
            lastA = obj.angle;
            obj.x = currentParent.x - Math.sin(currentParent.angle) * lastY + Math.cos(currentParent.angle) * lastX;
            obj.y = currentParent.y + Math.cos(currentParent.angle) * lastY + Math.sin(currentParent.angle) * lastX;
            obj.angle = currentParent.angle + lastA;

            currentParent = currentParent.parent;
        };
    }
}

function ObjectGroup(x, y, angle, behaviors, items) {
    this.x = x;
    this.y = y;
    this.angle = angle / 180 * Math.PI;
    this.items = items;
    for(var i = 0, len = this.items.length; i < len; i++)
        this.items[i].parent = this;
    this._behaviors = {};
    for(var i = 0; i < behaviors.length; i++)
        this.addBehavior(behaviors[i]);
}

function Sprite(x, y, angle, width, height, image, behaviors) {
    this.x = x;
    this.y = y;
    this.angle = angle / 180 * Math.PI;
    this.width = width;
    this.height = height;
    if( typeof image == 'string' ) {
        var imgObj = new Image();
        imgObj.src = image;
        image = imgObj;
    }
    this.image = image;
    this._behaviors = {};
    if(typeof behaviors != 'undefined')
        for(var i = 0; i < behaviors.length; i++)
            this.addBehavior(behaviors[i]);
}

function Box(x, y, angle, width, height, color, behaviors) {
    this.x = x;
    this.y = y;
    this.angle = angle / 180 * Math.PI;
    this.width = width;
    this.height = height;
    this.color = color;
    this._behaviors = {};
    if(typeof behaviors != 'undefined')
        for(var i = 0; i < behaviors.length; i++)
            this.addBehavior(behaviors[i]);
}

function Balloon(text, behaviors) {
    this.balloonText = text;
    this._behaviors = {};
    if(typeof behaviors != 'undefined')
        for(var i = 0; i < behaviors.length; i++)
            this.addBehavior(behaviors[i]);
}

ObjectGroup.prototype = EntityBase;
Box.prototype = EntityBase;
Sprite.prototype = {
    __proto__: EntityBase,
    setImage: function(image){
        if( typeof image == 'string' ) {
            var imgObj = new Image();
            imgObj.src = image;
            image = imgObj;
        }
        this.image = image;
    }
};
Balloon.prototype = {
    __proto__: EntityBase,
    draw: function(ctx) {
        // if not measured
        if(!this.balloonTextWidth) {
            ctx.font = "16px 'Russo One'";
            this.balloonTextWidth = ctx.measureText(this.balloonText).width;
            console.log("Balloon.draw - init");
        // if text was measured and direction was resolved
        } else if(this.balloonLeft) {
            console.log("Balloon.draw - draw");
            ctx.lineCap = "round";
            ctx.lineWidth = 30;
            var spawnPhase = this.lifeSpawnPhase || 0;
            var deathPhase = this.lifeDiePhase || 1;
            ctx.lineWidth *= spawnPhase;
            var calloutWidth = spawnPhase * deathPhase * 10;
            var calloutHeight = spawnPhase * deathPhase * 30;
            var balloonY =
                Math.max(this.balloonMinY - this.y + 20,
                Math.min(this.balloonMaxY - this.y - 20, this.balloonY));
            var balloonLeft = this.balloonLeft;
            var balloonRight = this.balloonRight;
            var overshootRight = this.balloonRight + this.x + 20 - this.balloonMaxX;
            if (overshootRight > 0) {
                balloonRight -= overshootRight;
                balloonLeft -= overshootRight;
            } else {
                var overshootLeft = this.balloonMinX - this.balloonLeft - this.x + 20;
                if (overshootLeft > 0) {
                    balloonRight += overshootLeft;
                    balloonLeft += overshootLeft;
                }
            }
            var originX = Math.max(balloonLeft, Math.min(balloonRight, 0));
            calloutHeight *= Math.sqrt(balloonY*balloonY + originX*originX) / 45;
            var calloutAngle = Math.atan2(-balloonY, -originX) - Math.PI/2;

            var drawFunc = function() {
                ctx.globalAlpha = deathPhase;
                if (deathPhase == 1) {
                    ctx.save();
                    ctx.translate(originX, balloonY);
                    ctx.rotate(calloutAngle);
                    ctx.beginPath();
                    ctx.moveTo(-calloutWidth, 0);
                    ctx.lineTo(0, calloutHeight);
                    ctx.lineTo(calloutWidth, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                ctx.beginPath();
                var y = Math.max()
                ctx.moveTo(balloonLeft, balloonY);
                ctx.lineTo(balloonRight, balloonY);
                ctx.stroke();
            };

            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 20;
            if (deathPhase > 0.7)
                drawFunc();
            ctx.shadowBlur = 0;
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "dimgray";
            ctx.fillStyle = "dimgray";
            if (deathPhase > 0.5)
                drawFunc();
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "darkgray";
            ctx.fillStyle = "darkgray";
            if (deathPhase > 0.3)
                drawFunc();
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            drawFunc();

            if (spawnPhase > 0.8) {
                ctx.font = "16px 'Russo One'";
                ctx.fillStyle = "black";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(this.balloonText, (balloonRight + balloonLeft) / 2, balloonY);
            }
        }
    }
};