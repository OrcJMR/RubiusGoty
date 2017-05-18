
var Sound = {

    // should probably not cache Audio elements per URL, but rather reuse same pool
    // for all required sounds, shouldn't have overhead. but not today.
    Cache: [],
    GetKey(url, id) {
	    if(id)
		    return url + "(" + id + ")";
	    return url;
    },
    PutAudio(key, audio) {
	    var array = this.Cache[key];
	    if(!array) {
		    array = [];
		    this.Cache[key] = array;
	    }
	    array.push(audio);
    },
    GetIdleAudio(key) {
	    var array = this.Cache[key];

	    if (!array)
		    return null;

	    for (var i = 0; i < array.length; i++){
		    var sound = array[i];
		    if (sound.ended || sound.paused) {
			    sound.currentTime = 0;
			    return sound;
		    }
	    }
	    // all cached are playing
	    return null;
    },
    Load(url, onloaded, id, onlyStart) {
	    var key = this.GetKey(url, id);
	    var audio = new Audio(url);
	    if (onlyStart)
		    audio.oncanplay = onloaded;
	    else
		    audio.oncanplaythrough = onloaded;
	    this.PutAudio(key, audio);
    },
    Play(url, vol, loops, id) {
	    var key = this.GetKey(url, id);
	    var audio = this.GetIdleAudio(key);
	    if(!audio) {
		    audio = new Audio(url);
		    this.PutAudio(key, audio);
		    // there shouldn't be a need to wait for this to load, if we called Load on start
	    } else {
		    audio.currentTime = 0;
	    }
	    audio.volume = volumeToFraction(vol);
	    audio.loop = loops;
	    audio.play();
	    return audio;
    }
};

var volumeToFraction = intVolume => Math.pow(intVolume/100, 2)

var volumeToInteger = fracVolume => Math.sqrt(fracVolume) * 100

export default Sound;
