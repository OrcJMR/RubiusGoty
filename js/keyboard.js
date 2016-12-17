
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

    convertCodeToDirection: function(code) {
        switch (code) {
            case 'A':
                return 'left';
            case 'W':
                return 'up';
            case 'D':
                return 'right';
            case 'S':
                return 'down';
            default:
                return false;
        }
    },
    
    keyDown: function(e) {        
        var char = String.fromCharCode(e.keyCode);
        this._keysDown[char] = true;

        var dir = this.convertCodeToDirection(char);
        Core.Variables.PlayerTank.setDirection(dir);
        this.keyPressed = true;
    },
    
    keyUp: function(e) {
        var char = String.fromCharCode(e.keyCode);
        delete this._keysDown[char];

        this.keyPressed = false;
    },
};
