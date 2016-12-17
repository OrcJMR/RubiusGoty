
var EntityBase = {
    ctor: function() {
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.angSpeed = 0;
    },
    draw: function(ctx) {
        if(typeof this.items != 'undefined')
            this.items.forEach(function(item, i, arr){
                ctx.save();
                ctx.translate(item.x, item.y);
                ctx.rotate(item.angle);
                item.draw(ctx);
                ctx.restore();
            });
        else if(typeof this.image != 'undefined')
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        else if(typeof this.color != 'undefined') {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
        else
            console.debug("Underconfigured object, unable to draw");
    },
    update: function(delta) {
        if(this.ySpeed != 0) {
            this.x -= Math.sin(this.angle) * delta * this.ySpeed;
            this.y += Math.cos(this.angle) * delta * this.ySpeed;
        }
        if(this.xSpeed != 0) {
            this.x -= Math.cos(this.angle) * delta * this.xSpeed;
            this.y -= Math.sin(this.angle) * delta * this.xSpeed;
        }
        if(this.angSpeed != 0) {
            this.angle += delta * this.angSpeed / 180 * Math.PI;
            if( this.angle < 0)
                this.angle += Math.PI * 2;
            if( this.angle > Math.PI * 2)
                this.angle -= Math.PI * 2;
        }

        if(typeof this.items != 'undefined')
            this.items.forEach(function(item, i, arr){
                item.update(delta);
            });
    }
}

function ObjectGroup(x, y, angle, items) {
    this.ctor();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.items = items;
}

function Sprite(x, y, angle, width, height, image) {
    this.ctor();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
    if( typeof image == 'string' ) {
        var imgObj = new Image();
        imgObj.src = image;
        image = imgObj;
    }
    this.image = image;
}

function Box(x, y, angle, width, height, color) {
    this.ctor();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
    this.color = color;
}

ObjectGroup.prototype = EntityBase;
Sprite.prototype = EntityBase;
Box.prototype = EntityBase;