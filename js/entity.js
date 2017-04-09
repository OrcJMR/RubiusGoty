
var EntityBase = {

    addBehavior: function(beh) {
        var name = beh.name;
        beh.init(this);
        this._behaviors[name] = beh.exec;
    },

    draw: function(ctx) {
        var that = this;
        if(typeof this.items != 'undefined')
            this.items.forEach(function(item, i, arr){
                ctx.save();
                if(typeof item.alpha != 'undefined')
                    ctx.globalAlpha = item.alpha;
                if(item.balloonText) {
                    ctx.rotate(-that.angle);
                } else {
                    ctx.translate(item.x, item.y);
                    ctx.rotate(item.angle);
                }
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

        } else if(this.balloonText) {
            ctx.font = "16px 'Russo One'";
            ctx.fillStyle = "black";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            if(!this.balloonWidth)
                this.balloonWidth = ctx.measureText(this.balloonText).width + 20;
            ctx.scale(this.scaleX, this.scaleY);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, this.balloonWidth, -30);
            ctx.fillStyle = "black";
            ctx.fillText(this.balloonText, this.balloonWidth / 2, -15);
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
    this.x = 0;
    this.y = 0;
    this.balloonText = text;
    this._behaviors = {};
    this.addBehavior(new Behavior.TextBalloon(500));
    if(typeof behaviors != 'undefined')
        for(var i = 0; i < behaviors.length; i++)
            this.addBehavior(behaviors[i]);
}

ObjectGroup.prototype = EntityBase;
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
Box.prototype = EntityBase;
Balloon.prototype = EntityBase;