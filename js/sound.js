
var Sounds=[];
var PlaySound=function(url,vol,loops)
{
	var volume=1;
	if (vol!==undefined) volume=vol;
	if (/*!Game.volume ||*/ volume==0) return 0;
	if (!Sounds[url]) {
        Sounds[url]=new Audio(url);
        Sounds[url].onloadeddata=function(e){
            e.target.volume=Math.pow(volume/*Game.volume*//100,2);
            e.target.loop = !!loops;
        }
    }
	else if (Sounds[url].readyState>=2) {
        Sounds[url].currentTime=0;
        Sounds[url].volume=Math.pow(volume/*Game.volume*//100,2);
    }
	Sounds[url].play();
}