
class KeyboardBiDiInput {
	char2;
	char1;
	kybd;

	constructor(kybd, charForward, charBackward) {
		this.kybd = kybd;
		this.char1 = charForward;
		this.char2 = charBackward;
	}
}

KeyboardBiDiInput.prototype = {
	read() {
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

class KeyboardCooldownInput {
	vacant;
	armed;
	manualRefire;
	lastFired;
	cooldown;
	char;
	kybd;

	constructor(kybd, char, cooldown, manualRefire) {
		this.kybd = kybd;
		this.char = char;
		this.cooldown = cooldown;
		this.lastFired = Number.MIN_SAFE_INTEGER;
		this.manualRefire = manualRefire;
		this.armed = true;

		this.vacant = this.kybd.vacant; // real keyboard does not have it, but network stubs do
	}
}

KeyboardCooldownInput.prototype = {
	read(timestamp) {        
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

class Keyboard {
	_keysDown;

	keyUp(e) {
		var char = String.fromCharCode(e.keyCode);
		delete this._keysDown[char];
	}

	keyDown(e) {        
		var char = String.fromCharCode(e.keyCode);
		this._keysDown[char] = true;
	}

	isDown(char) {
		return this._keysDown[char];
	}

	constructor() {
		this._keysDown = {};
		document.onkeydown = e => { this.keyDown(e); };
		document.onkeyup = e => { this.keyUp(e); };
	}
}

export { Keyboard, KeyboardBiDiInput, KeyboardCooldownInput };
