
function KeyboardBiDiInput(kybd, charForward, charBackward) {
    this.kybd = kybd;
    this.char1 = charForward;
    this.char2 = charBackward;
}

KeyboardBiDiInput.prototype = {
    read: function() {
        var flag1 = this.kybd.isDown(this.char1);
        var flag2 = this.kybd.isDown(this.char2);
        if(flag1 == flag2)
            return 0;
        if(flag1)
            return 1;
        if(flag2)
            return -1;
    }
}

function KeyboardCooldownInput(kybd, char, cooldown, manualRefire) {
    this.kybd = kybd;
    this.char = char;
    this.cooldown = cooldown;
    this.lastFired = Number.MIN_VALUE;
    this.manualRefire = manualRefire;
    this.armed = true;
}

KeyboardCooldownInput.prototype = {
    read: function(timestamp) {        
        var elapsed = timestamp - this.lastFired;

         // if on cooldown, report progress, negative value from -1 to 0
        if( elapsed < this.cooldown) {
            return (elapsed - this.cooldown) / this.cooldown;
        // if has to be rearmed, only check after cooldown passes
        } else if(!this.armed) {
            if (!this.kybd.isDown(this.char))
                this.armed = true;
            return 0;
        // fire!!
        } else if(this.kybd.isDown(this.char)) {
            this.lastFired = timestamp;
            if(this.manualRefire)
                this.armed = false;
            return 1;
        }
        return 0;
    }
}

function Keyboard() {
    this._keysDown = {};
    var closureSelf = this;
    document.onkeydown = function(e) { closureSelf.keyDown(e); };
    document.onkeyup = function(e) { closureSelf.keyUp(e); };
}

Keyboard.prototype = {

    isDown: function(char) {
        return this._keysDown[char];
    },

    keyDown: function(e) {        
        var char = String.fromCharCode(e.keyCode);
        this._keysDown[char] = true;
    },
    
    keyUp: function(e) {
        var char = String.fromCharCode(e.keyCode);
        delete this._keysDown[char];
    },
};
