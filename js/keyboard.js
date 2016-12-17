
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
