
function l(what) {return document.getElementById(what);}

var App = {
    Inputs: {},
    Resources: {},
    UpdateFrame: function(delta) {
        Game.Logic(delta);
        Game.RootEntity.update(delta);
    },
    globalScale: 1,
    DrawFrame: function(interpolationPercentage) {
        var ctx = App.Context;
        ctx.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        ctx.save();
        ctx.scale(App.globalScale, App.globalScale);
        Game.Map.drawMap(ctx, 0, 0);
        Game.RootEntity.draw(ctx);
        ctx.restore();

        ctx = App.ContextHud;
        ctx.clearRect(0, 0, App.CanvasHud.width, App.CanvasHud.height);
        App.DrawTankGui(ctx, Game.Tank1, 0, 0);
        App.DrawTankGui(ctx, Game.Tank2, 256, 0);
        App.DrawTankGui(ctx, Game.Tank3, 512, 0);
        App.DrawTankGui(ctx, Game.Tank, 768, 0);
    },
    DrawTankGui: function(ctx, tank, x, y) {
        ctx.save();
        ctx.translate(x, y);
        if(!tank || tank.hidden) {
            ctx.font="22px Lucida Console";
            ctx.fillStyle="dimgray";
            ctx.fillText("Insert coin!", 37, 40);
        } else {
            var scale = 32 / tank.width;
            ctx.drawImage(App.Canvas, tank.x - tank.width, tank.y - tank.width,  tank.width*2, tank.width*2, 0, 0, 64, 64);
            ctx.translate(190, 0);
            App.DrawCube(ctx, tank);
            ctx.translate(-96, 0);
            App.DrawInputs(ctx, tank);
        }
        ctx.restore();
    },
    DrawCube: function(ctx, tank) {
        ctx.drawImage(App.Resources.hpLeaf, 8, 0, 16, 16);
        var hp = 9;
        for(var y = 16; y < 64; y += 16)
            for(var x = 0; x < 48; x += 16) {
                var lit = tank.hp >= hp;
                ctx.drawImage(lit ? App.Resources.hpCubeLit : App.Resources.hpCubeDim, x, y, 16, 16);
                hp--;
            }
    },
    DrawInputs: function(ctx, tank) {
        if(typeof tank.teamId == 'undefined')
            return;
        var team = Sockets.ViewModel.teams[tank.teamId];
        var positions = { // recreated each time to reset .taken
            turn1:   {x: 0, y:42, icon: App.Resources.arrowTop, rot:-Math.PI/2},
            turn2:   {x:42, y:42, icon: App.Resources.arrowTop, rot:Math.PI/2},
            move1:   {x:21, y:21, icon: App.Resources.arrowTop},
            move2:   {x:21, y:42, icon: App.Resources.arrowTop, rot:Math.PI},
            turret:  {x: 0, y: 0, icon: App.Resources.arrowLeft, flipx:41},
            fire:    {x:21, y: 0, icon: App.Resources.arrowShot},
            manager: {x:42, y:21, icon: App.Resources.arrowFlag},
        };
        if(team.members)
            team.members.forEach(function(member) {
                var ps = member.positionsTaken;
                for(pname in ps) {
                    positions[pname].taken = ps[pname];
                };
            });
        for(pname in positions) {
            var pos = positions[pname];
            ctx.save();
            ctx.globalAlpha = pos.taken ? 1 : 0.4;
            ctx.translate(pos.x+10.5, pos.y+10.5);
            if(pos.rot)
                ctx.rotate(pos.rot);
            ctx.drawImage(pos.icon, -10.5, -10.5, 21, 21);
            if(pos.flipx) {
                ctx.translate(pos.flipx, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(pos.icon, -10.5, -10.5, 21, 21);
            }
            ctx.restore();
        };
    },
    EndFrame: function(fps, panic) {
            if (panic) {
                var discardedTime = Math.round(MainLoop.resetFrameDelta());
                console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
            }
    },
    EntryPoint: function() {

        App.Keyboard = new Keyboard();
        App.Canvas = document.getElementById('gameCanvas');
        App.Context = App.Canvas.getContext('2d');
        App.Context.mozImageSmoothingEnabled = false;
        App.Context.webkitImageSmoothingEnabled = false;
        App.Context.msImageSmoothingEnabled = false;
        App.Context.imageSmoothingEnabled = false;
        App.CanvasHud = document.getElementById('topCanvas');
        App.ContextHud = App.CanvasHud.getContext('2d');

        App.Resources.hpCubeLit = new Image();
        App.Resources.hpCubeLit.src = "./images/hp-cube.png";
        App.Resources.hpCubeDim = new Image();
        App.Resources.hpCubeDim.src = "./images/hp-cube-off.png";
        App.Resources.hpLeaf = new Image();
        App.Resources.hpLeaf.src = "./images/hp-leaf.png";
        App.Resources.arrowTop = new Image();
        App.Resources.arrowTop.src = "./images/arrow-top.png";
        App.Resources.arrowLeft = new Image();
        App.Resources.arrowLeft.src = "./images/arrow-rot-left.png";
        App.Resources.arrowShot = new Image();
        App.Resources.arrowShot.src = "./images/arrow-shot.png";
        App.Resources.arrowFlag = new Image();
        App.Resources.arrowFlag.src = "./images/arrow-flag.png";

        Game.Setup();

        //PlaySound("./sound/bl-slaughter.mp3", 90, true);

        MainLoop.setBegin(Game.ConsumeInputs).setUpdate(App.UpdateFrame).setDraw(App.DrawFrame).setEnd(App.EndFrame).start();
    }
};

var documentReadyInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        App.EntryPoint();
        clearInterval(documentReadyInterval);
        window.onresize = function() {
            if (App.Canvas != undefined) {
                // App.Canvas.width = window.innerWidth;
                // App.Canvas.height = window.innerHeight;
            }
        };
    }
}, 50);
