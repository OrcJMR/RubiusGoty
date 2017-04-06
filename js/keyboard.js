
function KeyboardBiDiInput(kybd, charForward, charBackward) {
    this.kybd = kybd;
    this.char1 = charForward;
    this.char2 = charBackward;
}

KeyboardBiDiInput.prototype = {
    read: function() {
        this.valueForward = this.kybd.isDown(this.char1);
        this.valueBackward = this.kybd.isDown(this.char2);
        if(this.valueForward == this.valueBackward)
            return 0;
        if(this.valueForward)
            return 1;
        if(this.valueBackward)
            return -1;
    }
}

function KeyboardCooldownInput(kybd, char, cooldown, manualRefire) {
    this.kybd = kybd;
    this.char = char;
    this.cooldown = cooldown;
    this.lastFired = Number.MIN_SAFE_INTEGER;
    this.manualRefire = manualRefire;
    this.armed = true;

    this.vacant = this.kybd.vacant; // real keyboard does not have it, but network stubs do
}

KeyboardCooldownInput.prototype = {
    read: function(timestamp) {        
        var elapsed = timestamp - this.lastFired;

         // if on cooldown, report progress, negative value from -1 to 0
        if( elapsed < this.cooldown) {
            this.value = (elapsed - this.cooldown) / this.cooldown;
        // if has to be rearmed, only check after cooldown passes
        } else if(!this.armed) {
            if (!this.kybd.isDown(this.char))
                this.armed = true;
            this.value = 0;
        // fire!!
        } else if(this.kybd.isDown(this.char)) {
            this.lastFired = timestamp;
            if(this.manualRefire)
                this.armed = false;
            this.value = 1;
        } else 
            this.value = 0;
        
        this.vacant = this.kybd.vacant; // real keyboard does not have it, but network stubs do
        return this.value;
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
