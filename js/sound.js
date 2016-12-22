
var Sounds=[];
var PlaySound=function(url,vol,loops,id)
{
	var volume=1;
	if (vol!==undefined) volume=vol;
	//if (/*!Game.volume ||*/ volume==0) return 0;

    var newSound = function(){ 
        var s = new Audio(url);        
        s.onloadeddata=function(e){
            e.target.volume=Math.pow(volume/*Game.volume*//100,2);
            e.target.loop = !!loops;            
        }
        return s;
    }

    var key;
    if (id){
        key = url + "(" + id + ")";
    } else{
        key = url;
    }

    var soundList = Sounds[key];

	if (!soundList) {
        soundList = [];
        Sounds[key]=soundList;
    }
	else{
        for (var i = 0; i < soundList.length; i++){
            var sound = soundList[i];
            if (sound.ended){
                sound.currentTime = 0;
                sound.volume=Math.pow(volume/*Game.volume*//100,2);
                sound.loop = loops;
                sound.play();
                return sound;
            }
        }
        // all busy        
    } 
    var sound = newSound();
    soundList.push(sound);
    sound.play();
    return sound;
}
