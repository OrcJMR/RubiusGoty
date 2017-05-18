/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale_russian_1 = __webpack_require__(19);
var urlToJoinGame = null; // put the url to connect to here
exports.urlToJoinGame = urlToJoinGame;
var webSocketUrl;
exports.webSocketUrl = webSocketUrl;
if (location.host.indexOf("github.io") > -1) {
    exports.webSocketUrl = webSocketUrl = "wss://cactus-trapezoid.glitch.me/";
    exports.urlToJoinGame = urlToJoinGame = location.host + "/RubiusGoty";
}
else {
    exports.webSocketUrl = webSocketUrl = "ws://" + location.host;
    if (!urlToJoinGame)
        exports.urlToJoinGame = urlToJoinGame = location.host;
}
var _positions = [
    {
        title: locale_russian_1.default.Roles.ManageRole,
        id: 'manager',
        actions: [
            { action: 'managerGood', text: locale_russian_1.default.Roles.ManageGood, icon: 'button-good.png' },
            { action: 'managerBad', text: locale_russian_1.default.Roles.ManageBad, icon: 'button-bad.png' }
        ]
    },
    {
        title: locale_russian_1.default.Roles.ShootRole,
        id: 'fire',
        actions: [
            { action: 'fire', text: locale_russian_1.default.Roles.Shoot, icon: 'button-fire.png' }
        ]
    },
    {
        title: locale_russian_1.default.Roles.TurretRole,
        id: 'turret',
        actions: [
            { action: 'turretLeft', text: locale_russian_1.default.Roles.TurretLeft, icon: 'button-turret-left.png' },
            { action: 'turretRight', text: locale_russian_1.default.Roles.TurretRight, icon: 'button-turret-right.png' }
        ]
    },
    {
        title: locale_russian_1.default.Roles.MoveRole,
        id: 'move1',
        actions: [
            { action: 'moveForward', text: locale_russian_1.default.Roles.Forward, icon: 'button-forward.png' },
            { action: 'moveBackward', text: locale_russian_1.default.Roles.Backward, icon: 'button-backward.png' }
        ]
    },
    {
        title: locale_russian_1.default.Roles.TurnRole,
        id: 'turn1',
        actions: [
            { action: 'turnLeft', text: locale_russian_1.default.Roles.Left, icon: 'button-left.png' },
            { action: 'turnRight', text: locale_russian_1.default.Roles.Right, icon: 'button-right.png' }
        ]
    }
];
exports._positions = _positions;
var _socket;
exports._socket = _socket;
if (webSocketUrl != "ws://") {
    exports._socket = _socket = new ReconnectingWebSocket(webSocketUrl);
    _socket.sendJson = function (message, callback) {
        _socket.waitForConnection(function () {
            _socket.send(JSON.stringify(message));
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 300);
    };
    _socket.waitForConnection = function (callback, interval) {
        var _this = this;
        if (_socket.readyState === 1) {
            callback();
        }
        else {
            // optional: implement backoff for interval here
            setTimeout(function () {
                _this.waitForConnection(callback, interval);
            }, interval);
        }
    };
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketsconfig_1 = __webpack_require__(1);
var NetworkCooldownInputKeyboardStub = (function () {
    function NetworkCooldownInputKeyboardStub(team, property, position) {
        this.team = team;
        this.property = property;
        this.position = position;
        this.vacant = true;
    }
    NetworkCooldownInputKeyboardStub.prototype.isDown = function (char) {
        var _this = this;
        var team = this.team();
        if (!team)
            return 0;
        var flag1 = 0;
        this.vacant = true;
        team.members.forEach(function (member) {
            var state = member.state;
            if (!state)
                return;
            if (member.position == _this.position)
                _this.vacant = false;
            if (state[_this.property] == 1)
                flag1 = 1;
        });
        return flag1;
    };
    return NetworkCooldownInputKeyboardStub;
}());
exports.NetworkCooldownInputKeyboardStub = NetworkCooldownInputKeyboardStub;
var NetworkBiDiInput = (function () {
    function NetworkBiDiInput(team, propertyForward, propertyBackward, positionForward, positionBackward) {
        this.team = team;
        this.propertyForward = propertyForward;
        this.propertyBackward = propertyBackward;
        this.positionForward = positionForward;
        this.positionBackward = positionBackward ? positionBackward : positionForward;
        this.vacantForward = true;
        this.vacantBackward = true;
    }
    NetworkBiDiInput.prototype.read = function () {
        var _this = this;
        this.valueForward = 0;
        this.valueBackward = 0;
        this.vacantForward = true;
        this.vacantBackward = true;
        var team = this.team();
        if (!team)
            return 0;
        team.members.forEach(function (member) {
            var state = member.state;
            if (!state)
                return;
            if (member.position == _this.positionForward)
                _this.vacantForward = false;
            if (state[_this.propertyForward] == 1)
                _this.valueForward = 1;
            if (member.position == _this.positionBackward)
                _this.vacantBackward = false;
            if (state[_this.propertyBackward] == 1)
                _this.valueBackward = 1;
        });
        if (this.valueForward == this.valueBackward)
            return 0;
        if (this.valueForward)
            return 1;
        if (this.valueBackward)
            return -1;
    };
    return NetworkBiDiInput;
}());
exports.NetworkBiDiInput = NetworkBiDiInput;
var Sockets = (function () {
    if (socketsconfig_1._socket) {
        socketsconfig_1._socket.onopen = function () {
            socketsconfig_1._socket.sendJson({
                isAdmin: true,
            });
        };
        /*setInterval(function () {
            Sockets.SendState();
        }, 5000);
    */
        socketsconfig_1._socket.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            console.log('got msg ' + msg.data);
            if (data.type == 'ViewModel') {
                Sockets.ViewModel = data;
                if (Sockets.UpdateCallback) {
                    Sockets.UpdateCallback();
                }
            }
        };
    }
    return {
        ViewModel: {
            teams: [],
        },
        /*SendState: function() {
            Sockets.sendJson({type: 'gameState', state: Sockets.ViewModel.gameStarted});
        },*/
        UpdateCallback: null
    };
})();
exports.Sockets = Sockets;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sound = {
    // should probably not cache Audio elements per URL, but rather reuse same pool
    // for all required sounds, shouldn't have overhead. but not today.
    Cache: [],
    GetKey: function (url, id) {
        if (id)
            return url + "(" + id + ")";
        return url;
    },
    PutAudio: function (key, audio) {
        var array = this.Cache[key];
        if (!array) {
            array = [];
            this.Cache[key] = array;
        }
        array.push(audio);
    },
    GetIdleAudio: function (key) {
        var array = this.Cache[key];
        if (!array)
            return null;
        for (var i = 0; i < array.length; i++) {
            var sound = array[i];
            if (sound.ended || sound.paused) {
                sound.currentTime = 0;
                return sound;
            }
        }
        // all cached are playing
        return null;
    },
    Load: function (url, onloaded, id, onlyStart) {
        var key = this.GetKey(url, id);
        var audio = new Audio(url);
        if (onlyStart)
            audio.oncanplay = onloaded;
        else
            audio.oncanplaythrough = onloaded;
        this.PutAudio(key, audio);
    },
    Play: function (url, vol, loops, id) {
        var key = this.GetKey(url, id);
        var audio = this.GetIdleAudio(key);
        if (!audio) {
            audio = new Audio(url);
            this.PutAudio(key, audio);
            // there shouldn't be a need to wait for this to load, if we called Load on start
        }
        else {
            audio.currentTime = 0;
        }
        audio.volume = volumeToFraction(vol);
        audio.loop = loops;
        audio.play();
        return audio;
    }
};
var volumeToFraction = function (intVolume) { return Math.pow(intVolume / 100, 2); };
var volumeToInteger = function (fracVolume) { return Math.sqrt(fracVolume) * 100; };
exports.default = Sound;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(5);
var sound_1 = __webpack_require__(3);
var keyboard_1 = __webpack_require__(9);
var locale_russian_1 = __webpack_require__(19);
var mainloop_1 = __webpack_require__(14);
var socketsconfig_1 = __webpack_require__(1);
function l(what) { return document.getElementById(what); }
var App = {
    Inputs: {},
    Images: {},
    UpdateFrame: function (delta) {
        App.GuiLogic(delta);
        game_1.default.Logic(delta);
    },
    globalScale: 1,
    elapsedMsec: 0,
    GuiLogic: function (delta) {
        this.elapsedMsec += delta;
    },
    DrawFrame: function (interpolationPercentage) {
        var ctx = App.Context;
        ctx.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        ctx.save();
        ctx.scale(App.globalScale, App.globalScale);
        game_1.default.Map.drawMap(ctx, 0, 0);
        game_1.default.RootEntity.draw(ctx);
        game_1.default.GuiEntity.draw(ctx);
        ctx.restore();
        ctx = App.ContextHud;
        ctx.clearRect(0, 0, App.CanvasHud.width, App.CanvasHud.height);
        App.DrawTankGui(ctx, game_1.default.Teams[0], 0, 0);
        App.DrawTankGui(ctx, game_1.default.Teams[1], 256, 0);
        App.DrawTankGui(ctx, game_1.default.Teams[2], 512, 0);
        App.DrawJoinTicker(ctx, 896, 32);
    },
    DrawTankGui: function (ctx, team, x, y) {
        ctx.save();
        ctx.translate(x, y);
        var tank = team.Tank;
        if (tank && !tank.hidden) {
            var scale = 30 / tank.width;
            ctx.drawImage(App.Canvas, tank.x - tank.width, tank.y - tank.width, tank.width * 2, tank.width * 2, 2, 1, 60, 60);
        }
        else {
            var phase = Math.floor(this.elapsedMsec / 50 % 4);
            //l("debugText").innerHTML = "phase: " + phase;
            ctx.drawImage(App.Images.noise, phase * 30, 0, 30, 30, 2, 1, 60, 60);
        }
        ctx.translate(64, 0);
        App.DrawInputs(ctx, team);
        ctx.translate(64, 0);
        App.DrawScore(ctx, team);
        ctx.translate(62, -2);
        App.DrawHealthCube(ctx, team);
        ctx.restore();
    },
    GuiPositions: null,
    DrawInputs: function (ctx, team) {
        for (var i = 0; i < this.GuiPositions.length; i++) {
            var guiSpec = this.GuiPositions[i];
            if (!(guiSpec.name in team.Inputs))
                continue;
            var input = team.Inputs[guiSpec.name];
            var valueProp = "value";
            var vacantProp = "vacant";
            if (guiSpec.p) {
                valueProp += guiSpec.p;
                vacantProp += guiSpec.p;
            }
            var vacant = input[vacantProp];
            var value = input[valueProp];
            ctx.save();
            ctx.translate(guiSpec.x + 10.5, guiSpec.y + 10.5);
            if (value == 1) {
                ctx.fillStyle = "#FFFFA0";
                ctx.fillRect(-10.5, -10.5, 21, 21);
            }
            else if (value < 0) {
                ctx.fillStyle = "#808080";
                ctx.fillRect(-10.5, 10.5 + 21 * value, 21, -21 * value);
            }
            ctx.globalAlpha = (vacant || value < 0) ? 0.4 : 1;
            if (guiSpec.rot)
                ctx.rotate(guiSpec.rot);
            if (guiSpec.flipx)
                ctx.scale(-1, 1);
            ctx.drawImage(guiSpec.icon, -10.5, -10.5, 21, 21);
            ctx.restore();
        }
    },
    DrawScore: function (ctx, team) {
        ctx.save();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        var tank = team.Tank;
        if (tank && !tank.hidden && team.teamId >= 0)
            ctx.fillStyle = locale_russian_1.default.TeamStyles[team.teamId];
        else
            ctx.fillStyle = "gray";
        ctx.globalAlpha = 0.6;
        ctx.font = "14px 'Russo One'";
        ctx.fillText(locale_russian_1.default.Score, 31, 48);
        ctx.globalAlpha = 1;
        ctx.font = "18px 'Press Start 2P'";
        ctx.translate(31, 30);
        ctx.fillText(team.kills, 0, 0);
        if (team.popKillsTime > 0) {
            var phase = team.popKillsTime / 500;
            if (phase > 1)
                team.popKillsTime = -1;
            else {
                ctx.globalAlpha = 1 - phase * phase;
                var scalePhase = 1 + Math.sin(phase * Math.PI / 2) * 2;
                ctx.scale(scalePhase, scalePhase);
                ctx.fillText(team.kills, 0, 0);
            }
        }
        ctx.restore();
    },
    DrawHealthCube: function (ctx, team) {
        if (team.Tank)
            ctx.drawImage(App.Images.hpLeaf, 8, 0, 16, 16);
        var hp = 9;
        var tankHp = team.Tank ? team.Tank.hp : 0;
        for (var y = 16; y < 64; y += 16)
            for (var x = 0; x < 48; x += 16) {
                var lit = tankHp >= hp;
                ctx.drawImage(lit ? App.Images.hpCubeLit : App.Images.hpCubeDim, x, y, 16, 16);
                hp--;
            }
    },
    DrawJoinTicker: function (ctx, x, y) {
        ctx.font = "bold 14px Roboto";
        ctx.fillStyle = "#F00";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        if (!socketsconfig_1.urlToJoinGame)
            socketsconfig_1.urlToJoinGame = location.host;
        ctx.save();
        ctx.translate(x, y);
        // 5 degrees max tilt, Pi seconds period
        ctx.rotate(5 / 180 * Math.PI * Math.sin(this.elapsedMsec / 1000));
        // song is 128 bpm = 2,1333 bps, 1000 / Pi / 2,1333 = 149
        var scale = 1.1 + 0.1 * Math.sin(this.elapsedMsec / 149);
        ctx.scale(scale, scale);
        ctx.fillText(socketsconfig_1.urlToJoinGame, 0, 0);
        ctx.restore();
    },
    EndFrame: function (fps, panic) {
        if (panic) {
            var discardedTime = Math.round(mainloop_1.default.resetFrameDelta());
            console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
        }
    },
    assetsLoaded: 0,
    EntryPoint: function () {
        App.Keyboard = new keyboard_1.Keyboard();
        App.Canvas = document.getElementById('gameCanvas');
        App.Context = App.Canvas.getContext('2d');
        App.Context.mozImageSmoothingEnabled = false;
        App.Context.webkitImageSmoothingEnabled = false;
        App.Context.msImageSmoothingEnabled = false;
        App.Context.imageSmoothingEnabled = false;
        App.CanvasHud = document.getElementById('topCanvas');
        App.ContextHud = App.CanvasHud.getContext('2d');
        var sounds = [
            "./sound/crash.wav",
            "./sound/longblast.mp3",
            "./sound/blast1.mp3",
            "./sound/blast2.mp3",
            "./sound/tank-fire.wav",
            "./sound/shot2.mp3",
            "./sound/shot3.mp3",
            "./sound/spawn.ogg",
            "./sound/bonus.ogg",
        ];
        var assetCount = sounds.length + 2; // "engine working" and music
        var onloaded = function () {
            App.assetsLoaded++;
            if (App.assetsLoaded == assetCount)
                App.FinishEntry();
        };
        var loadImage = function (url) {
            var img = new Image();
            img.src = url;
            img.onloaded = onloaded;
            return img;
        };
        App.Images.hpCubeLit = loadImage("./images/hp-cube.png");
        App.Images.hpCubeDim = loadImage("./images/hp-cube-off.png");
        App.Images.hpLeaf = loadImage("./images/hp-leaf.png");
        App.Images.arrowTop = loadImage("./images/arrow-top.png");
        App.Images.arrowLeft = loadImage("./images/arrow-rot-left.png");
        App.Images.arrowShot = loadImage("./images/arrow-shot.png");
        App.Images.arrowChevron = loadImage("./images/arrow-flag.png");
        App.Images.noise = loadImage("./images/noise.png");
        game_1.default.Map.tilesImage = loadImage("./images/tiles-winter.png");
        App.Images.tankHead = loadImage("./images/tank-head.png");
        App.Images.tankTrack = loadImage("./images/tank-track.png");
        App.Images.tankTrackSmall = loadImage("./images/tank-track-small.png");
        App.Images.tankBody = loadImage("./images/tank-body.png");
        App.Images.tankBodySmall1 = loadImage("./images/tank-body-small-1.png");
        App.Images.tankBodySmall2 = loadImage("./images/tank-body-small-2.png");
        App.Images.tankBodySmall3 = loadImage("./images/tank-body-small-3.png");
        App.Images.tankTurret = loadImage("./images/tank-turret.png");
        App.Images.tankTurretSmall = loadImage("./images/tank-turret-small.png");
        App.Images.explosion = loadImage("./images/explosion.png");
        App.Images.flash = loadImage("./images/flash.png");
        App.Images.tankFire = loadImage("./images/tank-fire.png");
        App.Images.tankFireBig = loadImage("./images/big-tank-fire.png");
        App.Images.bonusHp = loadImage("./images/bonus-hp.png");
        App.Images.heal = loadImage("./images/heal.png");
        App.Images.bonusDamage = loadImage("./images/bonus-damage.png");
        // for input definitions, see Game.SetupTeam()
        this.GuiPositions = [
            { name: "TankTurnInput", p: "Backward", x: 0, y: 42, icon: App.Images.arrowTop, rot: -Math.PI / 2 },
            { name: "TankTurnInput", p: "Forward", x: 42, y: 42, icon: App.Images.arrowTop, rot: Math.PI / 2 },
            { name: "ThrottleInput", p: "Forward", x: 21, y: 21, icon: App.Images.arrowTop },
            { name: "ThrottleInput", p: "Backward", x: 21, y: 42, icon: App.Images.arrowTop, rot: Math.PI },
            { name: "TurretTurnInput", p: "Backward", x: 0, y: 0, icon: App.Images.arrowLeft },
            { name: "TurretTurnInput", p: "Forward", x: 42, y: 0, icon: App.Images.arrowLeft, flipx: true },
            { name: "FireInput", x: 21, y: 0, icon: App.Images.arrowShot },
            { name: "ManagerGood", x: 0, y: 21, icon: App.Images.arrowChevron },
            { name: "ManagerBad", x: 42, y: 21, icon: App.Images.arrowChevron, rot: Math.PI },
            { name: "ManagerBoss", x: 42, y: 21, icon: App.Images.arrowChevron },
        ];
        for (var i in sounds)
            sound_1.default.Load(sounds[i], onloaded);
        sound_1.default.Load("./sound/engine working long.mp3", onloaded, "1");
        sound_1.default.Load("./sound/background.mp3", onloaded, false, true);
    },
    FinishEntry: function () {
        game_1.default.Setup();
        // Background music: Plug it In
        //                by AlumoMusic - http://www.alumomusic.com
        // 
        // Licensed for use within this project and its derivatives - please don't extract and reuse separately.
        // Listen for free at http://www.jamendo.com
        game_1.default.Music = sound_1.default.Play("./sound/background.mp3", 60, true);
        App.SetVolumeText(60);
        document.onkeypress = function (e) {
            if (e.key == '-') {
                var vol = volumeToInteger(game_1.default.Music.volume);
                if (vol > 0) {
                    vol -= 10;
                    vol = Math.max(vol, 0);
                    game_1.default.Music.volume = volumeToFraction(vol);
                    if (vol == 0 && !game_1.default.Music.paused) {
                        game_1.default.Music.pause();
                        game_1.default.Music.currentTime = 0;
                    }
                    App.SetVolumeText(vol);
                }
            }
            else if (e.key == '=') {
                var vol = volumeToInteger(game_1.default.Music.volume);
                if (vol < 100) {
                    vol += 10;
                    vol = Math.min(vol, 100);
                    game_1.default.Music.volume = volumeToFraction(vol);
                    if (vol > 0 && game_1.default.Music.paused) {
                        game_1.default.Music.play();
                    }
                    App.SetVolumeText(vol);
                }
            }
        };
        // no address here, it is drawn in DrawJoinTicker
        document.getElementById("hud4message").innerHTML = locale_russian_1.default.inviteLine1 + "<br/><br/>" + locale_russian_1.default.inviteLine3;
        mainloop_1.default.setBegin(game_1.default.ConsumeInputs).setUpdate(App.UpdateFrame).setDraw(App.DrawFrame).setEnd(App.EndFrame).start();
    },
    SetVolumeText: function (intVolume) {
        var str = intVolume == 0
            ? locale_russian_1.default.volumeOff
            : intVolume < 100
                ? "&nbsp;" + intVolume.toString() + "%"
                : intVolume.toString() + "%";
        document.getElementById("musicVolume").innerHTML = str;
    }
};
exports.default = App;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = __webpack_require__(10);
var collider_1 = __webpack_require__(11);
var entity_1 = __webpack_require__(12);
var keyboard_1 = __webpack_require__(9);
var locale_russian_1 = __webpack_require__(19);
var main_1 = __webpack_require__(4);
var map_1 = __webpack_require__(15);
var network_1 = __webpack_require__(2);
var sound_1 = __webpack_require__(3);
var Game = {
    Map: new map_1.default(),
    RootEntity: new entity_1.ObjectGroup(0, 0, 0, [], []),
    GuiEntity: new entity_1.ObjectGroup(0, 0, 0, [], []),
    Teams: [],
    Setup: function () {
        this.Teams.push(this.SetupTeam("1", 0, 72, 640, 180, 1400));
        this.Teams.push(this.SetupTeam("2", 1, 520, 64, 0, 2300));
        this.Teams.push(this.SetupTeam("3", 2, 1008 - 40, 640, 180, 3200));
        this.Teams.push(this.SetupTeam("boss", -1, 520, 736, 180, 0));
        // this.Teams.push(this.SetupTeam("boss", -1, 520, 300, 180, 0));
        //this.ScrapeSound = Sound.Play("./sound/metal-scrape.mp3", 0, true);
    },
    SetupTeam: function (name, networkIndex, spawnX, spawnY, spawnAngle, spawnCountdown) {
        if (typeof spawnCountdown == 'undefined')
            spawnCountdown = -1; // never
        var team = {
            teamId: networkIndex,
            name: name,
            spawnX: spawnX,
            spawnY: spawnY,
            spawnAngle: spawnAngle,
            kills: 0,
            deaths: 0,
            Inputs: {},
            tanksSpawnsIn: spawnCountdown,
            SpawnTank: function () {
                this.Tank = Game.spawnTank(this.spawnX, this.spawnY, this.spawnAngle, this.name, this.networkIndex);
                Game.RootEntity.addChild(this.Tank);
            }
        };
        if (name == "boss") {
            team.Inputs.ThrottleInput = new keyboard_1.KeyboardBiDiInput(main_1.default.Keyboard, 'W', 'S');
            team.Inputs.TankTurnInput = new keyboard_1.KeyboardBiDiInput(main_1.default.Keyboard, 'D', 'A');
            team.Inputs.TurretTurnInput = new keyboard_1.KeyboardBiDiInput(main_1.default.Keyboard, 'L', 'J');
            team.Inputs.FireInput = new keyboard_1.KeyboardCooldownInput(main_1.default.Keyboard, 'I', 400, false);
        }
        else {
            if (team.teamId < 0)
                throw "Misconfigured team";
            var viewModelFunction = function () {
                if (!network_1.Sockets.ViewModel.teams)
                    return null;
                if (network_1.Sockets.ViewModel.teams.length <= team.teamId)
                    return null;
                return network_1.Sockets.ViewModel.teams[team.teamId];
            };
            team.Inputs.ThrottleInput = new network_1.NetworkBiDiInput(viewModelFunction, 'moveForward', 'moveBackward', 'move1');
            team.Inputs.TankTurnInput = new network_1.NetworkBiDiInput(viewModelFunction, 'turnRight', 'turnLeft', 'turn1');
            team.Inputs.TurretTurnInput = new network_1.NetworkBiDiInput(viewModelFunction, 'turretRight', 'turretLeft', 'turret');
            team.Inputs.FireInput = new keyboard_1.KeyboardCooldownInput(new network_1.NetworkCooldownInputKeyboardStub(viewModelFunction, 'fire', 'fire'), '2', 800, true);
            team.Inputs.ManagerGood = new keyboard_1.KeyboardCooldownInput(new network_1.NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerGood', 'manager'), '2', 5000, true);
            team.Inputs.ManagerBad = new keyboard_1.KeyboardCooldownInput(new network_1.NetworkCooldownInputKeyboardStub(viewModelFunction, 'managerBad', 'manager'), '2', 5000, true);
        }
        return team;
    },
    spawnTank: function (x, y, angle, type, networkTeamId) {
        var tank;
        if (type === "boss") {
            tank = new entity_1.ObjectGroup(x, y, angle, [new behavior_1.default.MoveTank()], [
                new entity_1.ObjectGroup(0, 22, 0, [new behavior_1.default.Move()], [
                    new entity_1.Sprite(0, 7, 180, 26, 26, main_1.default.Images.tankHead)
                ]),
                new entity_1.Sprite(-18, -1, 0, 10, 38, main_1.default.Images.tankTrack, [new behavior_1.default.Animate(5, 2)]),
                new entity_1.Sprite(18, -1, 0, 10, 38, main_1.default.Images.tankTrack, [new behavior_1.default.Animate(5, 2)]),
                new entity_1.Sprite(0, -0.5, 180, 42, 48, main_1.default.Images.tankBody),
                // new Box(  0,-12, 0, 12, 8, "darkgreen"),
                new entity_1.ObjectGroup(0, 0.5, 0, [new behavior_1.default.Move()], [
                    new entity_1.Sprite(0, 7, 180, 22, 36, main_1.default.Images.tankTurret)
                ])
            ]);
        }
        else {
            tank = new entity_1.ObjectGroup(x, y, angle, [new behavior_1.default.MoveTank()], [
                new entity_1.Sprite(-11, -1, 0, 10, 30, main_1.default.Images.tankTrackSmall, [new behavior_1.default.Animate(5, 2)]),
                new entity_1.Sprite(11, -1, 0, 10, 30, main_1.default.Images.tankTrackSmall, [new behavior_1.default.Animate(5, 2)]),
                new entity_1.Sprite(0, 1, 180, 24, 34, main_1.default.Images["tankBodySmall" + type]),
                new entity_1.ObjectGroup(0, -2, 0, [new behavior_1.default.Move()], [
                    new entity_1.Sprite(0, 7, 180, 18, 38, main_1.default.Images.tankTurretSmall)
                ])
            ]);
        }
        tank.boss = type == "boss";
        if (tank.boss)
            tank.hidden = true;
        var offset = tank.boss ? 1 : 0;
        tank.hp = 9;
        tank.LeftTrack = tank.items[offset];
        tank.LeftTrack.torque = 0;
        tank.RightTrack = tank.items[offset + 1];
        tank.RightTrack.torque = 0;
        tank.Barrel = tank.items[offset + 3];
        tank.Barrel.recoil = 0;
        if (tank.boss) {
            tank.Head = tank.items[0];
            tank.width = 48; // this is for collision detection
            tank.height = 44;
        }
        else {
            tank.width = 32; // this is for collision detection
            tank.height = 32;
        }
        tank.collider = new collider_1.default(this.Map, "BS", this.RootEntity, ["tank"]);
        tank.class = "tank";
        // todo fix loop sound gap problem
        tank.throttleSound = sound_1.default.Play('./sound/engine working long.mp3', 0, true, type);
        tank.started = false;
        tank.setMovementSound = function (throttle) {
            if (this.speed == 0 && !this.started)
                return;
            this.started = true;
            var v = Math.max(0.05 + Math.abs(this.speed * 1 / this.maxSpeed), 0.05 + Math.abs(this.rotationSpeed * 0.6 / this.maxRotationSpeed));
            if (v > 1)
                v = 1;
            this.throttleSound.volume = v;
        };
        return tank;
    },
    spawnDirt: function (parent, back, move) {
        var sign = back ? -1 : 1;
        var offset = move ? 14 : 14;
        var speed = move ? -0.03 : -0.05;
        var rnd = Math.random() / 2 + 0.5;
        var dirt = new entity_1.Box(-3 + Math.random() * 6, offset * sign, 160 + Math.random() * 40, 3, 3, "darkgoldenrod", [
            new behavior_1.default.Move(),
            new behavior_1.default.TimedLife(300),
            new behavior_1.default.Custom(function () {
                this.alpha = this.lifeTimeout / 100;
                this.moveYSpeed = this.lifeTimeout / 300 * rnd * speed * sign;
            })
        ]);
        this.RootEntity.changeCoordinatesFromDescendant(dirt, parent);
        this.RootEntity.addChild(dirt, 0);
    },
    sparksCooldown: 0,
    spawnSparks: function (points) {
        var i = 0;
        while (this.sparksCooldown > 0 && points.length > 0) {
            var p = points[i];
            var speed = Math.random() * 0.06;
            var color = '#FFFF' + (0x100 + Math.random() * 0xFF).toString(16).substr(1, 2);
            var spark = new entity_1.Box(p.x, p.y, Math.random() * 360, 2, 3, color, [
                new behavior_1.default.Move(),
                new behavior_1.default.TimedLife(300),
                new behavior_1.default.Custom(function () {
                    this.alpha = this.lifeTimeout / 100;
                })
            ]);
            spark.moveYSpeed = speed;
            this.RootEntity.addChild(spark);
            this.sparksCooldown -= 10;
            i++;
            if (i == points.length)
                i = 0;
        }
    },
    powerupTimings: {
        h: { period: 10000, cooldown: 10000 },
        D: { period: 30000, cooldown: 30000 },
        H: { period: 15000, cooldown: 30000 },
    },
    spawnBonus: function (key) {
        var points = this.Map.powerupPoints[key];
        var i = Math.floor(Math.random() * points.length);
        if (points[i].powerup)
            return;
        var sprite;
        var angle;
        var offset = 0.5;
        if (key == 'h') {
            key = 'hp',
                sprite = main_1.default.Images.bonusHp;
            angle = 0;
            offset = 0;
        }
        else if (key == 'D') {
            key = 'damage';
            sprite = main_1.default.Images.bonusDamage;
            angle = 0;
        }
        else if (key == 'H') {
            key = 'speed';
            sprite = main_1.default.Images.arrowChevron;
            angle = 90;
        }
        var bonus = new entity_1.Sprite((points[i].x + offset) * this.Map.tileWidth, (points[i].y + offset) * this.Map.tileHeight, angle, 24, 24, sprite, [new behavior_1.default.Move(), new behavior_1.default.Wobble(10, 1, 0.1, 3)]);
        bonus.class = 'pickup';
        bonus.effectType = key;
        points[i].powerup = bonus;
        bonus.spawn = points[i];
        bonus.collider = new collider_1.default(this.Map, null, this.RootEntity, ["tank"]);
        bonus.OnObjectCollision = function (obj) {
            var flashSprite = bonus.effectType === "hp" ? main_1.default.Images.heal : main_1.default.Images.flash;
            // let's try pickup flash on tank itself
            var flash = new entity_1.Sprite(0, 0, Math.random() * 360, 80, 80, flashSprite, [
                new behavior_1.default.Animate(40, 8, 70),
                new behavior_1.default.TimedLife(539)
            ]);
            obj.addChild(flash);
            sound_1.default.Play("./sound/bonus.ogg", 100);
            if (obj.class == "tank") {
                if (this.effectType === "hp") {
                    obj.hp = Math.min(obj.hp + 2, 9);
                }
                else if (this.effectType === "damage") {
                    obj.damageBonusTime = 20000;
                    if (obj.Head)
                        obj.Head.items[0].imageGlow = true;
                    if (obj.Barrel)
                        obj.Barrel.items[0].imageGlow = true;
                    obj.damageBonusEnd = function () {
                        delete this.damageBonusTime;
                        if (this.Head)
                            delete this.Head.items[0].imageGlow;
                        if (this.Barrel)
                            delete this.Barrel.items[0].imageGlow;
                    };
                }
                else if (this.effectType === "speed") {
                    obj.speedBonusTime = 20000;
                    obj.RightTrack.imageGlow = true;
                    obj.LeftTrack.imageGlow = true;
                    obj.speedBonusEnd = function () {
                        delete this.speedBonusTime;
                        delete this.RightTrack.imageGlow;
                        delete this.LeftTrack.imageGlow;
                    };
                }
            }
            this.spawn.powerup = null;
            this.dead = true;
        };
        Game.RootEntity.addChild(bonus);
        this.spawnFlash(bonus.x, bonus.y, 60);
    },
    spawnBullet: function (tank, team) {
        var damage = 1;
        if (tank.damageBonusTime) {
            damage = 2;
        }
        var bullet = new entity_1.ObjectGroup(0, 20, 0, [
            new behavior_1.default.Move(0, 0.3),
            new behavior_1.default.LifeInBounds(-8, -8, 1032, 856)
        ], [
            new entity_1.Box(0, 0, 0, 3 + damage * 2, 4 + damage * 3, "black"),
            new entity_1.Box(0, 0, 0, 1 + damage * 2, 2 + damage * 3, damage > 1 ? "yellow" : "orange")
        ]);
        bullet.owner = tank;
        bullet.width = 1 + damage * 2;
        bullet.height = 2 + damage * 3;
        bullet.collider = new collider_1.default(this.Map, "BS", this.RootEntity, ["tank"]);
        bullet.OnMapCollision = function (x, y) {
            Game.spawnExplosion(this.x, this.y, 12 + damage * 12);
            Game.Map.degradeTile(x, y);
            this.dead = true;
        };
        var ourTeam = team;
        bullet.OnObjectCollision = function (obj) {
            Game.spawnExplosion(this.x, this.y, 12 + damage * 12, obj.class == "tank" ? "tank" : null);
            if (obj.class == "tank") {
                var tank = obj;
                tank.hp = Math.max(0, tank.hp - damage);
                if (tank.hp <= 0) {
                    ourTeam.kills++;
                    ourTeam.popKills = true;
                    tank.addBehavior(new behavior_1.default.TimedLife(3000));
                    tank.addBehavior(new behavior_1.default.SpawnExplosions(200, 10));
                    tank.Barrel.dead = true;
                    for (var i in Game.Teams) {
                        var team = Game.Teams[i];
                        if (tank == team.Tank) {
                            team.Tank = null;
                            team.tanksSpawnsIn = 2500;
                        }
                    }
                }
                tank.LeftTrack.torque = 0;
                tank.RightTrack.torque = 0;
                tank.LeftTrack.animDelay = 0;
                tank.RightTrack.animDelay = 0;
            }
            this.dead = true;
        };
        this.RootEntity.changeCoordinatesFromDescendant(bullet, tank.Barrel);
        this.RootEntity.addChild(bullet);
    },
    spawnMuzzleBlast: function (tank, big) {
        big = big || false;
        var blast = new entity_1.Sprite(0, big ? 16 : 22, 180, 34, 62, big ? main_1.default.Images.tankFireBig : main_1.default.Images.tankFire, [new behavior_1.default.Animate(17, 6, 50), new behavior_1.default.TimedLife(299)]);
        tank.changeCoordinatesFromDescendant(blast, tank.Barrel);
        tank.addChild(blast);
    },
    spawnExplosion: function (x, y, size, type) {
        if (!size)
            size = 24;
        var blast = new entity_1.Sprite(x, y, Math.random() * 90, size, size, main_1.default.Images.explosion, [new behavior_1.default.Animate(18, 8, 50), new behavior_1.default.TimedLife(399)]);
        Game.RootEntity.addChild(blast);
        if (type == "echo") {
            sound_1.default.Play("./sound/longblast.mp3", 100);
        }
        else if (type == "tank") {
            sound_1.default.Play("./sound/tank-fire.wav", 100);
        }
        else {
            if (Math.random() < 0.5)
                sound_1.default.Play("./sound/blast1.mp3", 100);
            else
                sound_1.default.Play("./sound/blast2.mp3", 100);
        }
    },
    spawnFlash: function (x, y, size) {
        if (!size)
            size = 40;
        var flash = new entity_1.Sprite(x, y, Math.random() * 360, size, size, main_1.default.Images.flash, [new behavior_1.default.Animate(40, 8, 70), new behavior_1.default.TimedLife(539)]);
        Game.RootEntity.addChild(flash);
        sound_1.default.Play("./sound/spawn.ogg", 100);
    },
    showBalloonMessage: function (tank, message) {
        var tanks = [];
        this.Teams.forEach(function (team) {
            if (team.Tank && team.Tank != tank)
                tanks.push(team.Tank);
        });
        var newBalloon = new entity_1.Balloon(message, [
            new behavior_1.default.PositionBalloon(tank, tanks, 8, 8, 1032, 776),
            new behavior_1.default.TimedLife(6000, 300, 600)
        ]);
        // soft-kill the previous balloon for same tank
        for (var i = 0; i < this.GuiEntity.items.length; i++) {
            var oldBalloon = this.GuiEntity.items[i];
            if (oldBalloon.balloonTank == tank)
                oldBalloon.lifeTimeout = oldBalloon.lifeDieTimeout || 0;
        }
        this.GuiEntity.addChild(newBalloon);
    },
    ConsumeInputs: function (timestamp) {
        var driveSpeed = 60 / 1000; // px/msec
        var turnSpeed = 90 / 1000; // deg/msec
        Game.Teams.forEach(function (team) {
            if (!team.Tank)
                return;
            var tank = team.Tank;
            var throttle = team.Inputs.ThrottleInput.read(timestamp);
            var turning = team.Inputs.TankTurnInput.read(timestamp);
            tank.setMovementSound(throttle);
            if (Math.abs(turning) < 1E-2) {
                tank.LeftTrack.torque = throttle;
                tank.RightTrack.torque = throttle;
            }
            else if (Math.abs(throttle) < 1E-2) {
                tank.LeftTrack.torque = turning;
                tank.RightTrack.torque = -turning;
            }
            else {
                tank.LeftTrack.torque = (throttle + turning) / 2;
                tank.RightTrack.torque = (throttle - turning) / 2;
            }
            // torques are stored in wrong tracks
            tank.LeftTrack.animDelay = tank.RightTrack.torque == 0 ? 0 : 100;
            tank.RightTrack.animDelay = tank.LeftTrack.torque == 0 ? 0 : 100;
            tank.Barrel.moveAngSpeed = turnSpeed * 0.75 * team.Inputs.TurretTurnInput.read(timestamp);
            var fireState = team.Inputs.FireInput.read(timestamp);
            if (fireState == 1)
                tank.Barrel.firing = true;
            if (!tank.boss)
                tank.Barrel.recoil = Math.min(fireState, 0);
            var phrases = null;
            if (team.Inputs.ManagerGood && (team.Inputs.ManagerGood.read(timestamp) == 1)) {
                phrases = locale_russian_1.default.ManagerGoodPhrases;
            }
            else if (team.Inputs.ManagerBad && (team.Inputs.ManagerBad.read(timestamp) == 1)) {
                phrases = locale_russian_1.default.ManagerBadPhrases;
            }
            if (phrases) {
                var phraseId = Math.floor(Math.random() * phrases.length);
                var phrase = phrases[phraseId];
                Game.showBalloonMessage(tank, phrase);
            }
        });
    },
    // scrapeDetected: false,
    Logic: function (delta) {
        if (this.sparksCooldown < 100) {
            this.sparksCooldown += delta;
            if (this.sparksCooldown > 100)
                this.sparksCooldown == 100;
        }
        this.Teams.forEach(function (team) {
            if (team.popKillsTime >= 0)
                team.popKillsTime += delta;
            if (team.popKills) {
                team.popKillsTime = 0;
                team.popKills = false;
            }
            if (!team.Tank) {
                // if already <0, abort and never spawn
                if (team.tanksSpawnsIn < 0)
                    return;
                else {
                    team.tanksSpawnsIn -= delta;
                    if (team.tanksSpawnsIn <= 0) {
                        team.SpawnTank();
                        if (team.name != "boss")
                            this.spawnFlash(team.spawnX, team.spawnY, 80);
                        if (!team.poppedOnStart) {
                            team.popKills = true;
                            team.poppedOnStart = true;
                        }
                    }
                }
            }
            else {
                var tank = team.Tank;
                if (Math.abs(tank.LeftTrack.torque) > 1E-02) {
                    var back = tank.LeftTrack.torque > 0;
                    this.spawnDirt(tank.RightTrack, back, true);
                }
                if (Math.abs(tank.RightTrack.torque) > 1E-02) {
                    var back = tank.RightTrack.torque > 0;
                    this.spawnDirt(tank.LeftTrack, back, true);
                }
                if (tank.Barrel.firing) {
                    this.spawnBullet(tank, team);
                    this.spawnMuzzleBlast(tank, tank.boss);
                    tank.Barrel.firing = false;
                    if (tank.boss) {
                        sound_1.default.Play("./sound/shot3.mp3", 100);
                    }
                    else {
                        sound_1.default.Play("./sound/shot2.mp3", 80);
                    }
                }
                tank.Barrel.items[0].y = 7 + tank.Barrel.recoil * 6;
                if (tank.damageBonusTime) {
                    tank.damageBonusTime -= delta;
                    if (tank.damageBonusTime <= 0)
                        tank.damageBonusEnd();
                }
                if (tank.speedBonusTime) {
                    tank.speedBonusTime -= delta;
                    if (tank.speedBonusTime <= 0)
                        tank.speedBonusEnd();
                }
                if (tank.boss) {
                    tank.Head.angle = tank.Barrel.angle / 4 - Math.PI / 2;
                    if (tank.Head.angle < -Math.PI / 4)
                        tank.Head.angle += Math.PI / 2;
                }
            }
        }, this);
        Object.keys(this.powerupTimings).forEach(function (key) {
            var spawnTiming = this.powerupTimings[key];
            spawnTiming.cooldown -= delta;
            if (spawnTiming.cooldown <= 0) {
                Game.spawnBonus(key);
                spawnTiming.cooldown = spawnTiming.period;
            }
        }, this);
        // this.scrapeDetected = false;
        this.RootEntity.update(delta);
        this.GuiEntity.update(delta);
        // this.ScrapeSound.volume = this.scrapeDetected ? 1 : 0;
    },
};
exports.default = Game;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mbr_1 = __webpack_require__(7);
var point_1 = __webpack_require__(8);
var rect_1 = __webpack_require__(13);
var Geom = {
    Point: point_1.Point,
    Mbr: mbr_1.Mbr,
    Rect: rect_1.Rect,
    OverlapMbr: function (r1, r2) {
        // in this coords r1 is in the origin and along axis
        var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle);
        var mbr = rotrect.GetMbr();
        var xmin = -r1.width / 2;
        var xmax = r1.width / 2;
        var ymin = -r1.height / 2;
        var ymax = r1.height / 2;
        // if r2 projection on r1 edges overlaps the edges
        return (mbr.xmax > xmin) && (mbr.xmin < xmax) && (mbr.ymax > ymin) && (mbr.ymin < ymax);
    },
    Intersect: function (rect1, rect2) {
        if (!Geom.OverlapMbr(rect1, rect2)) {
            return false;
        }
        if (!Geom.OverlapMbr(rect2, rect1)) {
            return false;
        }
        return true;
    },
    FindPointsInRect: function (r1, r2) {
        var rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle);
        var xmin = -r1.width / 2;
        var xmax = r1.width / 2;
        var ymin = -r1.height / 2;
        var ymax = r1.height / 2;
        var w = rotrect.width;
        var h = rotrect.height;
        var retval = [];
        var testFunc = function (p) {
            if (p.x < xmax && p.x > xmin && p.y < ymax && p.y > ymin) {
                var cpoint = p.Rotate(r1.angle).Translate(r1.x, r1.y); // .Rotate(r1.angle).Translate(r1.x, r1.y);
                retval.push(cpoint);
            }
        };
        testFunc((new Geom.Point(w / 2, -h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(w / 2, h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(-w / 2, h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(-w / 2, -h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        return retval;
    },
    Intersect2: function (rect1, rect2) {
        // dbg = printRect(rect1) + "<br/>" + printRect(rect2) + "<br/><br/>";
        var arr1 = Geom.FindPointsInRect(rect1, rect2);
        var arr2 = Geom.FindPointsInRect(rect2, rect1);
        var arr = arr1.concat(arr2);
        return arr;
    }
};
exports.default = Geom;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Mbr = (function () {
    function Mbr(xmin, xmax, ymin, ymax) {
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    return Mbr;
}());
exports.Mbr = Mbr;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.Translate = function (x, y) {
        return new Point(this.x + x, this.y + y);
    };
    Point.prototype.Rotate = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        return new Point(this.x * cosa - this.y * sina, this.x * sina + this.y * cosa);
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardBiDiInput = (function () {
    function KeyboardBiDiInput(kybd, charForward, charBackward) {
        this.kybd = kybd;
        this.char1 = charForward;
        this.char2 = charBackward;
    }
    return KeyboardBiDiInput;
}());
exports.KeyboardBiDiInput = KeyboardBiDiInput;
KeyboardBiDiInput.prototype = {
    read: function () {
        this.valueForward = this.kybd.isDown(this.char1);
        this.valueBackward = this.kybd.isDown(this.char2);
        if (this.valueForward == this.valueBackward)
            return 0;
        if (this.valueForward)
            return 1;
        if (this.valueBackward)
            return -1;
    }
};
var KeyboardCooldownInput = (function () {
    function KeyboardCooldownInput(kybd, char, cooldown, manualRefire) {
        this.kybd = kybd;
        this.char = char;
        this.cooldown = cooldown;
        this.lastFired = Number.MIN_SAFE_INTEGER;
        this.manualRefire = manualRefire;
        this.armed = true;
        this.vacant = this.kybd.vacant; // real keyboard does not have it, but network stubs do
    }
    return KeyboardCooldownInput;
}());
exports.KeyboardCooldownInput = KeyboardCooldownInput;
KeyboardCooldownInput.prototype = {
    read: function (timestamp) {
        var elapsed = timestamp - this.lastFired;
        // if on cooldown, report progress, negative value from -1 to 0
        if (elapsed < this.cooldown) {
            this.value = (elapsed - this.cooldown) / this.cooldown;
            // if has to be rearmed, only check after cooldown passes
        }
        else if (!this.armed) {
            if (!this.kybd.isDown(this.char))
                this.armed = true;
            this.value = 0;
            // fire!!
        }
        else if (this.kybd.isDown(this.char)) {
            this.lastFired = timestamp;
            if (this.manualRefire)
                this.armed = false;
            this.value = 1;
        }
        else
            this.value = 0;
        this.vacant = this.kybd.vacant; // real keyboard does not have it, but network stubs do
        return this.value;
    }
};
var Keyboard = (function () {
    function Keyboard() {
        var _this = this;
        this._keysDown = {};
        document.onkeydown = function (e) { _this.keyDown(e); };
        document.onkeyup = function (e) { _this.keyUp(e); };
    }
    Keyboard.prototype.keyUp = function (e) {
        var char = String.fromCharCode(e.keyCode);
        delete this._keysDown[char];
    };
    Keyboard.prototype.keyDown = function (e) {
        var char = String.fromCharCode(e.keyCode);
        this._keysDown[char] = true;
    };
    Keyboard.prototype.isDown = function (char) {
        return this._keysDown[char];
    };
    return Keyboard;
}());
exports.Keyboard = Keyboard;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(5);
var geom_1 = __webpack_require__(6);
var main_1 = __webpack_require__(4);
var sound_1 = __webpack_require__(3);
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.
var Behavior = {};
Behavior.Move = function (vx, vy, va) {
    this.init = function (obj) {
        obj.moveXSpeed = vx || 0;
        obj.moveYSpeed = vy || 0;
        obj.moveAngSpeed = va || 0;
    };
};
Behavior.Move.prototype = {
    name: "move",
    exec: function (obj, delta) {
        var newx = obj.x;
        var newy = obj.y;
        var newAngle = obj.angle;
        if (obj.moveYSpeed != 0) {
            newx -= Math.sin(obj.angle) * delta * obj.moveYSpeed;
            newy += Math.cos(obj.angle) * delta * obj.moveYSpeed;
        }
        if (obj.moveXSpeed != 0) {
            newx -= Math.cos(obj.angle) * delta * obj.moveXSpeed;
            newy += Math.sin(obj.angle) * delta * obj.moveXSpeed;
        }
        if (obj.moveAngSpeed != 0) {
            newAngle += delta * obj.moveAngSpeed / 180 * Math.PI;
            if (newAngle < 0)
                newAngle += Math.PI * 2;
            if (newAngle > Math.PI * 2)
                newAngle -= Math.PI * 2;
        }
        var apply = true;
        if (obj.collider) {
            var objRect = new geom_1.default.Rect(newx, newy, obj.width, obj.height, newAngle);
            var colliderRetVal = obj.collider.IsCollided(objRect, obj);
            if (colliderRetVal) {
                apply = false;
                if (colliderRetVal.tileX > -10000) {
                    if (obj.OnMapCollision) {
                        obj.OnMapCollision(colliderRetVal.tileX, colliderRetVal.tileY);
                    }
                }
                else {
                    if (obj.owner && obj.owner == colliderRetVal.object) {
                        apply = true;
                    }
                    else if (obj.OnObjectCollision) {
                        obj.OnObjectCollision(colliderRetVal.object);
                    }
                }
            }
        }
        if (apply) {
            obj.x = newx;
            obj.y = newy;
            obj.angle = newAngle;
        }
    }
};
Behavior.MoveTank = function (leftTrackSpeed, rightTrackSpeed) {
    this.init = function (obj) {
        obj.speed = 0;
        obj.maxSpeed = 60 / 1000; //px/msec
        obj.rotationSpeed = 0;
        obj.maxRotationSpeed = 60 / 1000; //deg/msec
    };
};
Behavior.MoveTank.prototype = {
    name: "movetank",
    exec: function (obj, delta) {
        var newx = obj.x;
        var newy = obj.y;
        var newAngle = obj.angle;
        var ltx = obj.x - Math.cos(obj.angle) * obj.LeftTrack.x - Math.sin(obj.angle) * obj.LeftTrack.y;
        var lty = obj.y + Math.cos(obj.angle) * obj.LeftTrack.y - Math.sin(obj.angle) * obj.LeftTrack.x;
        var rtx = obj.x - Math.cos(obj.angle) * obj.RightTrack.x - Math.sin(obj.angle) * obj.RightTrack.y;
        var rty = obj.y + Math.cos(obj.angle) * obj.RightTrack.y - Math.sin(obj.angle) * obj.RightTrack.x;
        var ltile = game_1.default.Map.getTileAt(ltx, lty);
        var ltraction = ltile ? ltile.tractionFactor : 1;
        var llimit = ltile ? ltile.speed ? ltile.speed : 1 : 1;
        var rtile = game_1.default.Map.getTileAt(rtx, rty);
        var rtraction = rtile ? rtile.tractionFactor : 1;
        var rlimit = rtile ? rtile.speed ? rtile.speed : 1 : 1;
        var traction = (ltraction + rtraction) / 2;
        var limit = (llimit + rlimit) / 2;
        if (obj.speedBonusTime)
            limit *= 2;
        if (Math.random() < 0.01 && obj.LeftTrack.torque != 0)
            game_1.default.Map.degradeTileAt(ltx, lty);
        if (Math.random() < 0.01 && obj.RightTrack.torque != 0)
            game_1.default.Map.degradeTileAt(rtx, rty);
        var rotationDir = obj.LeftTrack.torque - obj.RightTrack.torque;
        if (rotationDir != 0 && Math.sign(rotationDir) != Math.sign(obj.rotationSpeed))
            obj.rotationSpeed *= 0.8;
        var maxRotationSpeed = obj.maxRotationSpeed * limit;
        obj.rotationSpeed = obj.rotationSpeed + rotationDir * traction * delta * maxRotationSpeed / 1000;
        if (Math.abs(obj.rotationSpeed) > maxRotationSpeed)
            obj.rotationSpeed = Math.sign(obj.rotationSpeed) * maxRotationSpeed;
        var speedDir = obj.LeftTrack.torque + obj.RightTrack.torque;
        if (speedDir != 0 && Math.sign(speedDir) != Math.sign(obj.speed))
            obj.speed *= 0.8;
        var maxSpeed = obj.maxSpeed * limit;
        obj.speed = obj.speed + (obj.LeftTrack.torque + obj.RightTrack.torque) / 2 * traction * delta * maxSpeed / 1000;
        if (Math.abs(obj.speed) > maxSpeed)
            obj.speed = Math.sign(obj.speed) * maxSpeed;
        if (obj.speed != 0) {
            newx -= Math.sin(obj.angle) * delta * obj.speed;
            newy += Math.cos(obj.angle) * delta * obj.speed;
        }
        if (obj.rotationSpeed != 0) {
            newAngle += delta * obj.rotationSpeed / 180 * Math.PI;
            if (newAngle < 0)
                newAngle += Math.PI * 2;
            if (newAngle > Math.PI * 2)
                newAngle -= Math.PI * 2;
        }
        if (obj.LeftTrack.torque + obj.RightTrack.torque == 0) {
            obj.speed *= 1 - (0.10 * traction);
        }
        if (obj.LeftTrack.torque - obj.RightTrack.torque != 0) {
            obj.speed *= 1 - (0.02 * traction);
        }
        else {
            obj.rotationSpeed *= 0.9;
        }
        var colliderRetVal = false;
        if (obj.collider) {
            var objRect = new geom_1.default.Rect(newx, newy, obj.width, obj.height, newAngle);
            colliderRetVal = obj.collider.IsCollided(objRect, obj);
        }
        if (!colliderRetVal) {
            obj.x = newx;
            obj.y = newy;
            obj.angle = newAngle;
        }
        else {
            if (colliderRetVal.tileX > -10000) {
                if (obj.OnMapCollision) {
                    obj.OnMapCollision(colliderRetVal.tileX, colliderRetVal.tileY);
                }
            }
            else if (obj.OnObjectCollision) {
                obj.OnObjectCollision(colliderRetVal.object);
            }
            var s = Math.max(Math.abs(obj.speed) * 800, Math.abs(obj.rotationSpeed) * 200);
            // only play collision sound if it was significant
            if (s > 10)
                sound_1.default.Play("./sound/crash.wav", 70);
            // can spawn sparks as much as we want, it is throttled in Game
            game_1.default.spawnSparks(colliderRetVal.points);
            game_1.default.scrapeDetected = true;
            obj.speed = 0;
            obj.rotationSpeed = 0;
        }
    }
};
Behavior.TimedLife = function (time, spawnTime, dieTime) {
    this.init = function (obj) {
        obj.lifeTimeout = time || 0;
        if (spawnTime) {
            obj.lifeSpawnTimeout = spawnTime;
            obj.lifeSpawnPassed = 0;
        }
        if (dieTime) {
            obj.lifeDieTimeout = dieTime;
        }
    };
};
Behavior.TimedLife.prototype = {
    name: "lifetimeout",
    exec: function (obj, delta) {
        if (obj.lifeTimeout < 0)
            return;
        obj.lifeTimeout -= delta;
        if (obj.lifeTimeout <= 0)
            obj.dead = true;
        if (obj.lifeSpawnTimeout) {
            obj.lifeSpawnPassed += delta;
            // spawn phase increases from 0 to 1
            obj.lifeSpawnPhase = Math.min(obj.lifeSpawnPassed / obj.lifeSpawnTimeout, 1);
            if (obj.lifeSpawnPhase == 1)
                delete obj.lifeSpawnTimeout;
        }
        if (obj.lifeDieTimeout && obj.lifeTimeout < obj.lifeDieTimeout) {
            // die phase appears at < 1 and decreases to 0
            obj.lifeDiePhase = Math.max(obj.lifeTimeout / obj.lifeDieTimeout, 0);
        }
    }
};
Behavior.LifeInBounds = function (minx, miny, maxx, maxy) {
    // here value of 0 is meaningful, so testing for undefined
    if (typeof minx === 'undefined')
        minx = Number.MIN_VALUE;
    if (typeof miny === 'undefined')
        miny = Number.MIN_VALUE;
    if (typeof maxx === 'undefined')
        maxx = Number.MAX_VALUE;
    if (typeof maxy === 'undefined')
        maxy = Number.MAX_VALUE;
    this.init = function (obj) {
        obj.lifeMinX = minx;
        obj.lifeMinY = miny;
        obj.lifeMaxX = maxx;
        obj.lifeMaxY = maxy;
    };
};
Behavior.LifeInBounds.prototype = {
    name: "lifebounds",
    exec: function (obj, delta) {
        if (obj.dead)
            return;
        if (obj.x < obj.lifeMinX ||
            obj.y < obj.lifeMinY ||
            obj.x > obj.lifeMaxX ||
            obj.y > obj.lifeMaxY)
            obj.dead = true;
    }
};
Behavior.Custom = function (func) {
    this.init = function (obj) {
        obj.customFunc = func;
    };
};
Behavior.Custom.prototype = {
    name: "custom",
    exec: function (obj, delta) {
        obj.customFunc(delta);
    }
};
Behavior.Animate = function (spriteWidth, spriteCount, msecPerFrame, startFrame) {
    this.init = function (obj) {
        obj.spriteWidth = spriteWidth;
        obj.spriteIndex = startFrame || 0;
        obj.spriteCount = spriteCount || 1;
        obj.animDelay = msecPerFrame || 0;
        obj.animCurrentTime = 0;
    };
};
Behavior.Animate.prototype = {
    name: "animate",
    exec: function (obj, delta) {
        if (!obj.animDelay)
            return;
        obj.animCurrentTime += delta;
        var frameInc = Math.floor(obj.animCurrentTime / obj.animDelay);
        if (frameInc > 0) {
            obj.spriteIndex = (obj.spriteIndex + frameInc) % obj.spriteCount;
            obj.animCurrentTime = obj.animCurrentTime % obj.animDelay;
        }
    }
};
Behavior.Wobble = function (rotateAngle, rotatePeriod, scaleFactor, scalePeriod) {
    this.init = function (obj) {
        obj.wobbleBaseAngle = obj.angle;
        obj.wobbleAngle = rotateAngle;
        obj.wobbleAnglePeriod = rotatePeriod;
        obj.wobbleScale = scaleFactor;
        obj.wobbleScalePeriod = scalePeriod;
    };
};
Behavior.Wobble.prototype = {
    name: "wobble",
    exec: function (obj, delta) {
        obj.angle = obj.wobbleBaseAngle +
            obj.wobbleAngle / 180 * Math.sin(main_1.default.elapsedMsec / 1000 * Math.PI * obj.wobbleAnglePeriod);
        obj.scaleX = 1 + obj.wobbleScale * Math.sin(main_1.default.elapsedMsec / 1000 * Math.PI * obj.wobbleScalePeriod);
        obj.scaleY = obj.scaleX;
    }
};
Behavior.SpawnExplosions = function (delay, count) {
    this.init = function (obj) {
        obj.explosionCurrentTime = 0;
        obj.explosionsLeft = count || 1;
        obj.explosionDelay = delay || 0;
    };
};
Behavior.SpawnExplosions.prototype = {
    name: "spawnexplosions",
    exec: function (obj, delta) {
        if (obj.explosionsLeft == 0)
            return;
        obj.explosionCurrentTime += delta;
        var pendingExplosions = Math.min(Math.floor(obj.explosionCurrentTime / obj.explosionDelay), obj.explosionsLeft);
        while (pendingExplosions > 0) {
            var pt = new geom_1.default.Point(-obj.width / 2 + Math.random() * obj.width, -obj.height / 2 + Math.random() * obj.height);
            pt = pt.Rotate(obj.angle).Translate(obj.x, obj.y);
            var type = null;
            if (pendingExplosions == 1)
                type = "echo";
            game_1.default.spawnExplosion(pt.x, pt.y, 24 + Math.random() * 16, type);
            pendingExplosions--;
            obj.explosionsLeft--;
        }
        obj.explosionCurrentTime %= obj.explosionDelay;
    }
};
Behavior.PositionBalloon = function (tank, otherTanks, minx, miny, maxx, maxy) {
    this.init = function (obj) {
        obj.x = 0;
        obj.y = 0;
        obj.angle = 0;
        obj.balloonTank = tank;
        obj.balloonOtherTanks = otherTanks;
        obj.balloonMinX = minx;
        obj.balloonMinY = miny;
        obj.balloonMaxX = maxx;
        obj.balloonMaxY = maxy;
    };
};
Behavior.PositionBalloon.prototype = {
    name: "positionballoon",
    exec: function (obj, delta) {
        // first try to init
        if (typeof obj.balloonY == 'undefined' && obj.balloonTextWidth) {
            console.log("Behavior.PositionBalloon - init");
            var balloonWidth = obj.balloonTextWidth;
            var offset = 45;
            var tankY = obj.balloonTank.y;
            var tankX = obj.balloonTank.x;
            // check for boundaries
            var canUp = tankY > obj.balloonMinY + 60;
            var canDown = tankY < obj.balloonMaxY - 60;
            var mustLeft = tankX > obj.balloonMaxX - 100;
            var mustRight = tankX < obj.balloonMinX + 100;
            // check if enemies are near
            var enemyInTL = false;
            var enemyInTR = false;
            var enemyToLeft = false;
            var enemyToRight = false;
            var enemyInBL = false;
            var enemyInBR = false;
            for (var i = 0; i < obj.balloonOtherTanks.length; i++) {
                var enemyY = obj.balloonOtherTanks[i].y;
                var enemyX = obj.balloonOtherTanks[i].x;
                var toLeft = tankX - balloonWidth - 80 < enemyX && enemyX < tankX;
                var toRight = tankX < enemyX && enemyX < tankX + 80 + balloonWidth;
                // top and bottom stripes are wider because they include diagonal positions
                if (tankY - 80 < enemyY && enemyY < tankY)
                    if (toLeft)
                        enemyInTL = true;
                    else if (toRight)
                        enemyInTR = true;
                if (tankY - 30 < enemyY && enemyY < tankY + 30)
                    if (toLeft)
                        enemyToLeft = true;
                    else if (toRight)
                        enemyToRight = true;
                if (tankY < enemyY && enemyY < tankY + 80)
                    if (toLeft)
                        enemyInBL = true;
                    else if (toRight)
                        enemyInBR = true;
            }
            var setLeft = function () {
                obj.balloonLeft = -offset - balloonWidth;
                obj.balloonRight = -offset;
            };
            var setRight = function () {
                obj.balloonLeft = offset;
                obj.balloonRight = offset + balloonWidth;
            };
            var setMiddle = function () {
                if (tankX < obj.balloonMinX + 100 + balloonWidth / 2) {
                    obj.balloonLeft = obj.balloonMinX + 100 - tankX;
                    obj.balloonRight = obj.balloonLeft + balloonWidth;
                }
                else if (tankX > obj.balloonMaxX - 100 - balloonWidth / 2) {
                    obj.balloonRight = obj.balloonMaxX - 100 - tankX;
                    obj.balloonLeft = obj.balloonRight - balloonWidth;
                }
                else {
                    obj.balloonLeft = -balloonWidth / 2;
                    obj.balloonRight = -obj.balloonLeft;
                }
            };
            // solve direction
            if (mustLeft) {
                setLeft();
                if (canUp && !enemyInTL)
                    obj.balloonY = -offset;
                else if (!enemyToLeft)
                    obj.balloonY = 0;
                else if (canDown && !enemyInBL)
                    obj.balloonY = offset;
                else
                    obj.balloonY = canUp ? -offset : 0;
            }
            else if (mustRight) {
                setRight();
                if (canUp && !enemyInTR)
                    obj.balloonY = -offset;
                else if (!enemyToRight)
                    obj.balloonY = 0;
                else if (canDown && !enemyInBR)
                    obj.balloonY = offset;
                else
                    obj.balloonY = canUp ? -offset : 0;
            }
            else {
                if (canUp && !(enemyInTL && enemyInTR)) {
                    obj.balloonY = -offset;
                    if (enemyInTL)
                        setRight();
                    else if (enemyInTR)
                        setLeft();
                    else
                        setMiddle();
                }
                else if (canDown && !(enemyInBL && enemyInBR)) {
                    obj.balloonY = offset;
                    if (enemyInBL)
                        setRight();
                    else if (enemyInBR)
                        setLeft();
                    else
                        setMiddle();
                }
                else if (!enemyToLeft || !enemyToRight) {
                    obj.balloonY = 0;
                    if (enemyToLeft)
                        setRight();
                    else if (enemyToRight)
                        setLeft();
                }
                else {
                    obj.balloonY = canUp ? -offset : offset;
                    setMiddle();
                }
            }
            // adjust diagonal positions
            if (obj.balloonY != 0) {
                if (obj.balloonLeft > 0) {
                    var multiplier = 45 / Math.sqrt(obj.balloonY * obj.balloonY + obj.balloonLeft * obj.balloonLeft);
                    obj.balloonY *= multiplier;
                    var xShift = (1 - multiplier) * obj.balloonLeft;
                    obj.balloonLeft -= xShift;
                    obj.balloonRight -= xShift;
                }
                else if (obj.balloonRight < 0) {
                    var multiplier = 45 / Math.sqrt(obj.balloonY * obj.balloonY + obj.balloonRight * obj.balloonRight);
                    obj.balloonY *= multiplier;
                    var xShift = (1 - multiplier) * obj.balloonRight;
                    obj.balloonLeft -= xShift;
                    obj.balloonRight -= xShift;
                }
            }
        }
        else {
            console.log("Behavior.PositionBalloon - follow");
            if (!("lifeDiePhase" in obj)) {
                obj.x = obj.balloonTank.x;
                obj.y = obj.balloonTank.y;
            }
        }
    }
};
exports.default = Behavior;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom_1 = __webpack_require__(6);
// collision detector
var Collider = (function () {
    function Collider(map, impassableBlocks, rootEntity, impassableObjects) {
        this.map = map;
        this.impassableBlocks = impassableBlocks;
        this.rootEntity = rootEntity;
        this.impassableObjects = impassableObjects;
    }
    Collider.prototype.IsCollided = function (rect, sourceObject) {
        //check map
        if (this.impassableBlocks) {
            var tw = this.map.tileWidth;
            var th = this.map.tileHeight;
            var rectMbr = rect.GetMbr();
            var tileXmin = Math.round(rectMbr.xmin / tw - 0.5);
            var tileYmin = Math.round(rectMbr.ymin / th - 0.5);
            var tileXmax = Math.round(rectMbr.xmax / tw - 0.5);
            var tileYmax = Math.round(rectMbr.ymax / th - 0.5);
            for (var tileX = tileXmin; tileX <= tileXmax; tileX++) {
                for (var tileY = tileYmin; tileY <= tileYmax; tileY++) {
                    if (tileX >= 0 && tileX < this.map.width && tileY >= 0 && tileY < this.map.height) {
                        var mapTile = this.map.getTile(tileX, tileY);
                        if (!mapTile.passable) {
                            // check for collision, yeah!
                            var tileRect = new geom_1.default.Rect(tileX * tw + tw / 2, tileY * th + th / 2, tw, th, 0);
                            var intersection = geom_1.default.Intersect2(rect, tileRect);
                            if (intersection.length > 0) {
                                return { tileX: tileX, tileY: tileY, points: intersection };
                            }
                        }
                    }
                }
            }
        }
        //check objects
        if (this.rootEntity && this.impassableObjects) {
            for (var i = 0; i < this.rootEntity.items.length; i++) {
                var obj = this.rootEntity.items[i];
                if (obj != sourceObject && obj.class && this.impassableObjects.indexOf(obj.class) > -1) {
                    var objRect = new geom_1.default.Rect(obj.x, obj.y, obj.width, obj.height, obj.angle);
                    var intersection = geom_1.default.Intersect2(rect, objRect);
                    if (intersection.length > 0) {
                        return { object: obj, points: intersection };
                    }
                }
            }
        }
        return false;
    };
    return Collider;
}());
exports.default = Collider;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntityBase = (function () {
    function EntityBase() {
        this.items = [];
    }
    EntityBase.prototype.addBehavior = function (beh) {
        var name = beh.name;
        beh.init(this);
        this._behaviors[name] = beh.exec;
    };
    EntityBase.prototype.draw = function (ctx) {
        if (typeof this.items != 'undefined')
            this.items.forEach(function (item, i, arr) {
                ctx.save();
                if (typeof item.alpha != 'undefined')
                    ctx.globalAlpha = item.alpha;
                ctx.translate(item.x, item.y);
                ctx.rotate(item.angle);
                if (typeof item.scaleX != 'undefined')
                    ctx.scale(item.scaleX, item.scaleY);
                item.draw(ctx);
                ctx.restore();
            });
        else if (typeof this.image != 'undefined') {
            if (!this.spriteWidth)
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            else
                ctx.drawImage(this.image, this.spriteIndex * this.spriteWidth, 0, this.spriteWidth, this.image.height, -this.width / 2, -this.height / 2, this.width, this.height);
            if (this.imageGlow) {
                ctx.globalCompositeOperation = 'color-dodge'; // 'color-dodge' for turrets 'lighter' for tracks
                if (!this.spriteWidth)
                    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
                else
                    ctx.drawImage(this.image, this.spriteIndex * this.spriteWidth, 0, this.spriteWidth, this.image.height, -this.width / 2, -this.height / 2, this.width, this.height);
                ctx.globalCompositeOperation = 'source-over';
            }
        }
        else if (typeof this.color != 'undefined') {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }
        else
            console.debug("Underconfigured object, unable to draw");
    };
    EntityBase.prototype.update = function (delta) {
        // run updates
        for (var behavior in this._behaviors)
            this._behaviors[behavior](this, delta);
        // run updates on children an remove dead children, if any
        if (this.items)
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].update(delta);
                if (this.items[i].dead) {
                    this.items.splice(i, 1);
                    i--;
                }
            }
    };
    EntityBase.prototype.addChild = function (child, index) {
        if (!index)
            this.items.push(child);
        else
            this.items.splice(index, 0, child);
        child.parent = this;
    };
    // takes an obj in descendantParent's coordinate system, and changes its coordinates to this'.
    // this must be a predecessor of descendantParent
    EntityBase.prototype.changeCoordinatesFromDescendant = function (obj, descendantParent) {
        var currentParent = descendantParent, lastX, lastY, lastA;
        while (currentParent != this) {
            lastX = obj.x,
                lastY = obj.y,
                lastA = obj.angle;
            obj.x = currentParent.x - Math.sin(currentParent.angle) * lastY + Math.cos(currentParent.angle) * lastX;
            obj.y = currentParent.y + Math.cos(currentParent.angle) * lastY + Math.sin(currentParent.angle) * lastX;
            obj.angle = currentParent.angle + lastA;
            currentParent = currentParent.parent;
        }
    };
    return EntityBase;
}());
exports.EntityBase = EntityBase;
var ObjectGroup = (function (_super) {
    __extends(ObjectGroup, _super);
    function ObjectGroup(x, y, angle, behaviors, items) {
        var _this = this;
        _this.x = x;
        _this.y = y;
        _this.angle = angle / 180 * Math.PI;
        _this.items = items;
        for (var i = 0, len = _this.items.length; i < len; i++)
            _this.items[i].parent = _this;
        _this._behaviors = {};
        for (var i = 0; i < behaviors.length; i++)
            _this.addBehavior(behaviors[i]);
        return _this;
    }
    return ObjectGroup;
}(EntityBase));
exports.ObjectGroup = ObjectGroup;
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(x, y, angle, width, height, image, behaviors) {
        var _this = this;
        _this.x = x;
        _this.y = y;
        _this.angle = angle / 180 * Math.PI;
        _this.width = width;
        _this.height = height;
        if (typeof image == 'string') {
            var imgObj = new Image();
            imgObj.src = image;
            image = imgObj;
        }
        _this.image = image;
        _this._behaviors = {};
        if (typeof behaviors != 'undefined')
            for (var i = 0; i < behaviors.length; i++)
                _this.addBehavior(behaviors[i]);
        return _this;
    }
    Sprite.prototype.setImage = function (image) {
        if (typeof image == 'string') {
            var imgObj = new Image();
            imgObj.src = image;
            image = imgObj;
        }
        this.image = image;
    };
    return Sprite;
}(EntityBase));
exports.Sprite = Sprite;
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(x, y, angle, width, height, color, behaviors) {
        var _this = this;
        _this.x = x;
        _this.y = y;
        _this.angle = angle / 180 * Math.PI;
        _this.width = width;
        _this.height = height;
        _this.color = color;
        _this._behaviors = {};
        if (typeof behaviors != 'undefined')
            for (var i = 0; i < behaviors.length; i++)
                _this.addBehavior(behaviors[i]);
        return _this;
    }
    return Box;
}(ObjectGroup));
exports.Box = Box;
var Balloon = (function (_super) {
    __extends(Balloon, _super);
    function Balloon(text, behaviors) {
        var _this = this;
        _this.balloonText = text;
        _this._behaviors = {};
        if (typeof behaviors != 'undefined')
            for (var i = 0; i < behaviors.length; i++)
                _this.addBehavior(behaviors[i]);
        return _this;
    }
    ;
    Balloon.prototype.draw = function (ctx) {
        // if not measured
        if (!this.balloonTextWidth) {
            ctx.font = "16px 'Russo One'";
            this.balloonTextWidth = ctx.measureText(this.balloonText).width;
            console.log("Balloon.draw - init");
            // if text was measured and direction was resolved
        }
        else if (this.balloonLeft) {
            console.log("Balloon.draw - draw");
            ctx.lineCap = "round";
            ctx.lineWidth = 30;
            var spawnPhase = this.lifeSpawnPhase || 0;
            var deathPhase = this.lifeDiePhase || 1;
            ctx.lineWidth *= spawnPhase;
            var calloutWidth = spawnPhase * deathPhase * 10;
            var calloutHeight = spawnPhase * deathPhase * 30;
            var balloonY = Math.max(this.balloonMinY - this.y + 20, Math.min(this.balloonMaxY - this.y - 20, this.balloonY));
            var balloonLeft = this.balloonLeft;
            var balloonRight = this.balloonRight;
            var overshootRight = this.balloonRight + this.x + 20 - this.balloonMaxX;
            if (overshootRight > 0) {
                balloonRight -= overshootRight;
                balloonLeft -= overshootRight;
            }
            else {
                var overshootLeft = this.balloonMinX - this.balloonLeft - this.x + 20;
                if (overshootLeft > 0) {
                    balloonRight += overshootLeft;
                    balloonLeft += overshootLeft;
                }
            }
            var originX = Math.max(balloonLeft, Math.min(balloonRight, 0));
            calloutHeight *= Math.sqrt(balloonY * balloonY + originX * originX) / 45;
            var calloutAngle = Math.atan2(-balloonY, -originX) - Math.PI / 2;
            var drawFunc = function () {
                ctx.globalAlpha = deathPhase;
                if (deathPhase == 1) {
                    ctx.save();
                    ctx.translate(originX, balloonY);
                    ctx.rotate(calloutAngle);
                    ctx.beginPath();
                    ctx.moveTo(-calloutWidth, 0);
                    ctx.lineTo(0, calloutHeight);
                    ctx.lineTo(calloutWidth, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                ctx.beginPath();
                var y = Math.max();
                ctx.moveTo(balloonLeft, balloonY);
                ctx.lineTo(balloonRight, balloonY);
                ctx.stroke();
            };
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 20;
            if (deathPhase > 0.7)
                drawFunc();
            ctx.shadowBlur = 0;
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "dimgray";
            ctx.fillStyle = "dimgray";
            if (deathPhase > 0.5)
                drawFunc();
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "darkgray";
            ctx.fillStyle = "darkgray";
            if (deathPhase > 0.3)
                drawFunc();
            ctx.lineWidth -= 2;
            calloutWidth -= 1;
            calloutHeight -= 4;
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            drawFunc();
            if (spawnPhase > 0.8) {
                ctx.font = "16px 'Russo One'";
                ctx.fillStyle = "black";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(this.balloonText, (balloonRight + balloonLeft) / 2, balloonY);
            }
        }
    };
    return Balloon;
}(EntityBase));
exports.Balloon = Balloon;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mbr_1 = __webpack_require__(7);
var point_1 = __webpack_require__(8);
var Rect = (function () {
    function Rect(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }
    Rect.prototype.GetMbr = function () {
        var w = this.width;
        var h = this.height;
        var p = (new point_1.Point(w / 2, -h / 2)).Rotate(this.angle).Translate(this.x, this.y);
        var xmin = p.x;
        var xmax = p.x;
        var ymin = p.y;
        var ymax = p.y;
        p = (new point_1.Point(w / 2, h / 2)).Rotate(this.angle).Translate(this.x, this.y);
        if (p.x > xmax) {
            xmax = p.x;
        }
        if (p.x < xmin) {
            xmin = p.x;
        }
        if (p.y > ymax) {
            ymax = p.y;
        }
        if (p.y < ymin) {
            ymin = p.y;
        }
        p = (new point_1.Point(-w / 2, h / 2)).Rotate(this.angle).Translate(this.x, this.y);
        if (p.x > xmax) {
            xmax = p.x;
        }
        if (p.x < xmin) {
            xmin = p.x;
        }
        if (p.y > ymax) {
            ymax = p.y;
        }
        if (p.y < ymin) {
            ymin = p.y;
        }
        p = (new point_1.Point(-w / 2, -h / 2)).Rotate(this.angle).Translate(this.x, this.y);
        if (p.x > xmax) {
            xmax = p.x;
        }
        if (p.x < xmin) {
            xmin = p.x;
        }
        if (p.y > ymax) {
            ymax = p.y;
        }
        if (p.y < ymin) {
            ymin = p.y;
        }
        return new mbr_1.Mbr(xmin, xmax, ymin, ymax);
    };
    Rect.prototype.Translate = function (x, y) {
        return new Rect(this.x + x, this.y + y, this.width, this.height, this.angle);
    };
    Rect.prototype.Rotate = function (angle) {
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);
        var newrect = new Rect(this.x * cosa - this.y * sina, this.x * sina + this.y * cosa, this.width, this.height, this.angle + angle);
        return newrect;
    };
    return Rect;
}());
exports.Rect = Rect;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * A main loop useful for games and other animated applications.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// The amount of time (in milliseconds) to simulate each time update()
// runs. See `MainLoop.setSimulationTimestep()` for details.
var simulationTimestep = 1000 / 60, 
// The cumulative amount of in-app time that hasn't been simulated yet.
// See the comments inside animate() for details.
frameDelta = 0, 
// The timestamp in milliseconds of the last time the main loop was run.
// Used to compute the time elapsed between frames.
lastFrameTimeMs = 0, 
// An exponential moving average of the frames per second.
fps = 60, 
// The timestamp (in milliseconds) of the last time the `fps` moving
// average was updated.
lastFpsUpdate = 0, 
// The number of frames delivered in the current second.
framesThisSecond = 0, 
// The number of times update() is called in a given frame. This is only
// relevant inside of animate(), but a reference is held externally so that
// this variable is not marked for garbage collection every time the main
// loop runs.
numUpdateSteps = 0, 
// The minimum amount of time in milliseconds that must pass since the last
// frame was executed before another frame can be executed. The
// multiplicative inverse caps the FPS (the default of zero means there is
// no cap).
minFrameDelay = 0, 
// Whether the main loop is running.
running = false, 
// `true` if `MainLoop.start()` has been called and the most recent time it
// was called has not been followed by a call to `MainLoop.stop()`. This is
// different than `running` because there is a delay of a few milliseconds
// after `MainLoop.start()` is called before the application is considered
// "running." This delay is due to waiting for the next frame.
started = false, 
// Whether the simulation has fallen too far behind real time.
// Specifically, `panic` will be set to `true` if too many updates occur in
// one frame. This is only relevant inside of animate(), but a reference is
// held externally so that this variable is not marked for garbage
// collection every time the main loop runs.
panic = false, 
// The object most likely to have `requestAnimationFrame` attached is
// `window`, if it's available in this environment. Otherwise, fall back to
// the root context.
windowOrRoot = typeof window === 'object' ? window : root, 
// The function that runs the main loop. The unprefixed version of
// `window.requestAnimationFrame()` is available in all modern browsers
// now, but node.js doesn't have it, so fall back to timers. The polyfill
// is adapted from the MIT-licensed
// https://github.com/underscorediscovery/realtime-multiplayer-in-html5
requestAnimationFrame = windowOrRoot.requestAnimationFrame || (function () {
    var lastTimestamp = Date.now(), now, timeout;
    return function (callback) {
        now = Date.now();
        // The next frame should run no sooner than the simulation allows,
        // but as soon as possible if the current frame has already taken
        // more time to run than is simulated in one timestep.
        timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
        lastTimestamp = now + timeout;
        return setTimeout(function () {
            callback(now + timeout);
        }, timeout);
    };
})(), 
// The function that stops the main loop. The unprefixed version of
// `window.cancelAnimationFrame()` is available in all modern browsers now,
// but node.js doesn't have it, so fall back to timers.
cancelAnimationFrame = windowOrRoot.cancelAnimationFrame || clearTimeout, 
// In all major browsers, replacing non-specified functions with NOOPs
// seems to be as fast or slightly faster than using conditions to only
// call the functions if they are specified. This is probably due to empty
// functions being optimized away. http://jsperf.com/noop-vs-condition
NOOP = function () { }, 
// A function that runs at the beginning of the main loop.
// See `MainLoop.setBegin()` for details.
begin = NOOP, 
// A function that runs updates (i.e. AI and physics).
// See `MainLoop.setUpdate()` for details.
update = NOOP, 
// A function that draws things on the screen.
// See `MainLoop.setDraw()` for details.
draw = NOOP, 
// A function that runs at the end of the main loop.
// See `MainLoop.setEnd()` for details.
end = NOOP, 
// The ID of the currently executing frame. Used to cancel frames when
// stopping the loop.
rafHandle;
/**
 * Manages the main loop that runs updates and rendering.
 *
 * The main loop is a core part of any application in which state changes
 * even if no events are handled. In games, it is typically responsible for
 * computing physics and AI as well as drawing the result on the screen.
 *
 * The body of this particular loop is run every time the browser is ready to
 * paint another frame. The frequency with which this happens depends primarily
 * on the monitor's refresh rate, which is typically 60 frames per second. Most
 * applications aim to run at 60 FPS for this reason, meaning that the main
 * loop runs about once every 16.7 milliseconds. With this target, everything
 * that happens in the main loop (e.g. all updates and drawing) needs to occur
 * within the "budget" of 16.7 milliseconds.  See
 * `MainLoop.setSimulationTimestep()` for more information about typical
 * monitor refresh rates and frame rate targets.
 *
 * The main loop can be started and stopped, but there can only be one MainLoop
 * (except that each Web Worker can have its own MainLoop). There are four main
 * parts of the loop: {@link #setBegin begin}(), {@link #setUpdate update}(),
 * {@link #setDraw draw}(), and {@link #setEnd end}(), in that order. See the
 * functions that set each of them for descriptions of what they are used for.
 * Note that update() can run zero or more times per loop.
 *
 * @class MainLoop
 */
var MainLoop = {
    /**
     * Gets how many milliseconds should be simulated by every run of update().
     *
     * See `MainLoop.setSimulationTimestep()` for details on this value.
     *
     * @return {Number}
     *   The number of milliseconds that should be simulated by every run of
     *   {@link #setUpdate update}().
     */
    getSimulationTimestep: function () {
        return simulationTimestep;
    },
    /**
     * Sets how many milliseconds should be simulated by every run of update().
     *
     * The perceived frames per second (FPS) is effectively capped at the
     * multiplicative inverse of the simulation timestep. That is, if the
     * timestep is 1000 / 60 (which is the default), then the maximum perceived
     * FPS is effectively 60. Decreasing the timestep increases the maximum
     * perceived FPS at the cost of running {@link #setUpdate update}() more
     * times per frame at lower frame rates. Since running update() more times
     * takes more time to process, this can actually slow down the frame rate.
     * Additionally, if the amount of time it takes to run update() exceeds or
     * very nearly exceeds the timestep, the application will freeze and crash
     * in a spiral of death (unless it is rescued; see `MainLoop.setEnd()` for
     * an explanation of what can be done if a spiral of death is occurring).
     *
     * The exception to this is that interpolating between updates for each
     * render can increase the perceived frame rate and reduce visual
     * stuttering. See `MainLoop.setDraw()` for an explanation of how to do
     * this.
     *
     * If you are considering decreasing the simulation timestep in order to
     * raise the maximum perceived FPS, keep in mind that most monitors can't
     * display more than 60 FPS. Whether humans can tell the difference among
     * high frame rates depends on the application, but for reference, film is
     * usually displayed at 24 FPS, other videos at 30 FPS, most games are
     * acceptable above 30 FPS, and virtual reality might require 75 FPS to
     * feel natural. Some gaming monitors go up to 144 FPS. Setting the
     * timestep below 1000 / 144 is discouraged and below 1000 / 240 is
     * strongly discouraged. The default of 1000 / 60 is good in most cases.
     *
     * The simulation timestep should typically only be changed at
     * deterministic times (e.g. before the main loop starts for the first
     * time, and not in response to user input or slow frame rates) to avoid
     * introducing non-deterministic behavior. The update timestep should be
     * the same for all players/users in multiplayer/multi-user applications.
     *
     * See also `MainLoop.getSimulationTimestep()`.
     *
     * @param {Number} timestep
     *   The number of milliseconds that should be simulated by every run of
     *   {@link #setUpdate update}().
     */
    setSimulationTimestep: function (timestep) {
        simulationTimestep = timestep;
        return this;
    },
    /**
     * Returns the exponential moving average of the frames per second.
     *
     * @return {Number}
     *   The exponential moving average of the frames per second.
     */
    getFPS: function () {
        return fps;
    },
    /**
     * Gets the maximum frame rate.
     *
     * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep`
     * for details.
     *
     * See also `MainLoop.setMaxAllowedFPS()`.
     *
     * @return {Number}
     *   The maximum number of frames per second allowed.
     */
    getMaxAllowedFPS: function () {
        return 1000 / minFrameDelay;
    },
    /**
     * Sets a maximum frame rate.
     *
     * See also `MainLoop.getMaxAllowedFPS()`.
     *
     * @param {Number} [fps=Infinity]
     *   The maximum number of frames per second to execute. If Infinity or not
     *   passed, there will be no FPS cap (although other factors do limit the
     *   FPS; see `MainLoop.setSimulationTimestep` for details). If zero, this
     *   will stop the loop, and when the loop is next started, it will return
     *   to the previous maximum frame rate. Passing negative values will stall
     *   the loop until this function is called again with a positive value.
     *
     * @chainable
     */
    setMaxAllowedFPS: function (fps) {
        if (typeof fps === 'undefined') {
            fps = Infinity;
        }
        if (fps === 0) {
            this.stop();
        }
        else {
            // Dividing by Infinity returns zero.
            minFrameDelay = 1000 / fps;
        }
        return this;
    },
    /**
     * Reset the amount of time that has not yet been simulated to zero.
     *
     * This introduces non-deterministic behavior if called after the
     * application has started running (unless it is being reset, in which case
     * it doesn't matter). However, this can be useful in cases where the
     * amount of time that has not yet been simulated has grown very large
     * (for example, when the application's tab gets put in the background and
     * the browser throttles the timers as a result). In applications with
     * lockstep the player would get dropped, but in other networked
     * applications it may be necessary to snap or ease the player/user to the
     * authoritative state and discard pending updates in the process. In
     * non-networked applications it may also be acceptable to simply resume
     * the application where it last left off and ignore the accumulated
     * unsimulated time.
     *
     * @return {Number}
     *   The cumulative amount of elapsed time in milliseconds that has not yet
     *   been simulated, but is being discarded as a result of calling this
     *   function.
     */
    resetFrameDelta: function () {
        var oldFrameDelta = frameDelta;
        frameDelta = 0;
        return oldFrameDelta;
    },
    /**
     * Sets the function that runs at the beginning of the main loop.
     *
     * The begin() function is typically used to process input before the
     * updates run. Processing input here (in chunks) can reduce the running
     * time of event handlers, which is useful because long-running event
     * handlers can sometimes delay frames.
     *
     * Unlike {@link #setUpdate update}(), which can run zero or more times per
     * frame, begin() always runs exactly once per frame. This makes it useful
     * for any updates that are not dependent on time in the simulation.
     * Examples include adjusting HUD calculations or performing long-running
     * updates incrementally. Compared to {@link #setEnd end}(), generally
     * actions should occur in begin() if they affect anything that
     * {@link #setUpdate update}() or {@link #setDraw draw}() use.
     *
     * @param {Function} begin
     *   The begin() function.
     * @param {Number} [begin.timestamp]
     *   The current timestamp (when the frame started), in milliseconds. This
     *   should only be used for comparison to other timestamps because the
     *   epoch (i.e. the "zero" time) depends on the engine running this code.
     *   In engines that support `DOMHighResTimeStamp` (all modern browsers
     *   except iOS Safari 8) the epoch is the time the page started loading,
     *   specifically `performance.timing.navigationStart`. Everywhere else,
     *   including node.js, the epoch is the Unix epoch (1970-01-01T00:00:00Z).
     * @param {Number} [begin.delta]
     *   The total elapsed time that has not yet been simulated, in
     *   milliseconds.
     */
    setBegin: function (fun) {
        begin = fun || begin;
        return this;
    },
    /**
     * Sets the function that runs updates (e.g. AI and physics).
     *
     * The update() function should simulate anything that is affected by time.
     * It can be called zero or more times per frame depending on the frame
     * rate.
     *
     * As with everything in the main loop, the running time of update()
     * directly affects the frame rate. If update() takes long enough that the
     * frame rate drops below the target ("budgeted") frame rate, parts of the
     * update() function that do not need to execute between every frame can be
     * moved into Web Workers. (Various sources on the internet sometimes
     * suggest other scheduling patterns using setTimeout() or setInterval().
     * These approaches sometimes offer modest improvements with minimal
     * changes to existing code, but because JavaScript is single-threaded, the
     * updates will still block rendering and drag down the frame rate. Web
     * Workers execute in separate threads, so they free up more time in the
     * main loop.)
     *
     * This script can be imported into a Web Worker using importScripts() and
     * used to run a second main loop in the worker. Some considerations:
     *
     * - Profile your code before doing the work to move it into Web Workers.
     *   It could be the rendering that is the bottleneck, in which case the
     *   solution is to decrease the visual complexity of the scene.
     * - It doesn't make sense to move the *entire* contents of update() into
     *   workers unless {@link #setDraw draw}() can interpolate between frames.
     *   The lowest-hanging fruit is background updates (like calculating
     *   citizens' happiness in a city-building game), physics that doesn't
     *   affect the scene (like flags waving in the wind), and anything that is
     *   occluded or happening far off screen.
     * - If draw() needs to interpolate physics based on activity that occurs
     *   in a worker, the worker needs to pass the interpolation value back to
     *   the main thread so that is is available to draw().
     * - Web Workers can't access the state of the main thread, so they can't
     *   directly modify objects in your scene. Moving data to and from Web
     *   Workers is a pain. The fastest way to do it is with Transferable
     *   Objects: basically, you can pass an ArrayBuffer to a worker,
     *   destroying the original reference in the process.
     *
     * You can read more about Web Workers and Transferable Objects at
     * [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/workers/basics/).
     *
     * @param {Function} update
     *   The update() function.
     * @param {Number} [update.delta]
     *   The amount of time in milliseconds to simulate in the update. In most
     *   cases this timestep never changes in order to ensure deterministic
     *   updates. The timestep is the same as that returned by
     *   `MainLoop.getSimulationTimestep()`.
     */
    setUpdate: function (fun) {
        update = fun || update;
        return this;
    },
    /**
     * Sets the function that draws things on the screen.
     *
     * The draw() function gets passed the percent of time that the next run of
     * {@link #setUpdate update}() will simulate that has actually elapsed, as
     * a decimal. In other words, draw() gets passed how far between update()
     * calls it is. This is useful because the time simulated by update() and
     * the time between draw() calls is usually different, so the parameter to
     * draw() can be used to interpolate motion between frames to make
     * rendering appear smoother. To illustrate, if update() advances the
     * simulation at each vertical bar in the first row below, and draw() calls
     * happen at each vertical bar in the second row below, then some frames
     * will have time left over that is not yet simulated by update() when
     * rendering occurs in draw():
     *
     *     update() timesteps:  |  |  |  |  |  |  |  |  |
     *     draw() calls:        |   |   |   |   |   |   |
     *
     * To interpolate motion for rendering purposes, objects' state after the
     * last update() must be retained and used to calculate an intermediate
     * state. Note that this means renders will be up to one update() behind.
     * This is still better than extrapolating (projecting objects' state after
     * a future update()) which can produce bizarre results. Storing multiple
     * states can be difficult to set up, and keep in mind that running this
     * process takes time that could push the frame rate down, so it's often
     * not worthwhile unless stuttering is visible.
     *
     * @param {Function} draw
     *   The draw() function.
     * @param {Number} [draw.interpolationPercentage]
     *   The cumulative amount of time that hasn't been simulated yet, divided
     *   by the amount of time that will be simulated the next time update()
     *   runs. Useful for interpolating frames.
     */
    setDraw: function (fun) {
        draw = fun || draw;
        return this;
    },
    /**
     * Sets the function that runs at the end of the main loop.
     *
     * Unlike {@link #setUpdate update}(), which can run zero or more times per
     * frame, end() always runs exactly once per frame. This makes it useful
     * for any updates that are not dependent on time in the simulation.
     * Examples include cleaning up any temporary state set up by
     * {@link #setBegin begin}(), lowering the visual quality if the frame rate
     * is too low, or performing long-running updates incrementally. Compared
     * to begin(), generally actions should occur in end() if they use anything
     * that update() or {@link #setDraw draw}() affect.
     *
     * @param {Function} end
     *   The end() function.
     * @param {Number} [end.fps]
     *   The exponential moving average of the frames per second. This is the
     *   same value returned by `MainLoop.getFPS()`. It can be used to take
     *   action when the FPS is too low (or to restore to normalcy if the FPS
     *   moves back up). Examples of actions to take if the FPS is too low
     *   include exiting the application, lowering the visual quality, stopping
     *   or reducing activities outside of the main loop like event handlers or
     *   audio playback, performing non-critical updates less frequently, or
     *   increasing the simulation timestep (by calling
     *   `MainLoop.setSimulationTimestep()`). Note that this last option
     *   results in more time being simulated per update() call, which causes
     *   the application to behave non-deterministically.
     * @param {Boolean} [end.panic=false]
     *   Indicates whether the simulation has fallen too far behind real time.
     *   Specifically, `panic` will be `true` if too many updates occurred in
     *   one frame. In networked lockstep applications, the application should
     *   wait for some amount of time to see if the user can catch up before
     *   dropping the user. In networked but non-lockstep applications, this
     *   typically indicates that the user needs to be snapped or eased to the
     *   current authoritative state. When this happens, it may be convenient
     *   to call `MainLoop.resetFrameDelta()` to discard accumulated pending
     *   updates. In non-networked applications, it may be acceptable to allow
     *   the application to keep running for awhile to see if it will catch up.
     *   However, this could also cause the application to look like it is
     *   running very quickly for a few frames as it transitions through the
     *   intermediate states. An alternative that may be acceptable is to
     *   simply ignore the unsimulated elapsed time by calling
     *   `MainLoop.resetFrameDelta()` even though this introduces
     *   non-deterministic behavior. In all cases, if the application panics
     *   frequently, this is an indication that the main loop is running too
     *   slowly. However, most of the time the drop in frame rate will probably
     *   be noticeable before a panic occurs. To help the application catch up
     *   after a panic caused by a spiral of death, the same steps can be taken
     *   that are suggested above if the FPS drops too low.
     */
    setEnd: function (fun) {
        end = fun || end;
        return this;
    },
    /**
     * Starts the main loop.
     *
     * Note that the application is not considered "running" immediately after
     * this function returns; rather, it is considered "running" after the
     * application draws its first frame. The distinction is that event
     * handlers should remain paused until the application is running, even
     * after `MainLoop.start()` is called. Check `MainLoop.isRunning()` for the
     * current status. To act after the application starts, register a callback
     * with requestAnimationFrame() after calling this function and execute the
     * action in that callback. It is safe to call `MainLoop.start()` multiple
     * times even before the application starts running and without calling
     * `MainLoop.stop()` in between, although there is no reason to do this;
     * the main loop will only start if it is not already started.
     *
     * See also `MainLoop.stop()`.
     */
    start: function () {
        if (!started) {
            // Since the application doesn't start running immediately, track
            // whether this function was called and use that to keep it from
            // starting the main loop multiple times.
            started = true;
            // In the main loop, draw() is called after update(), so if we
            // entered the main loop immediately, we would never render the
            // initial state before any updates occur. Instead, we run one
            // frame where all we do is draw, and then start the main loop with
            // the next frame.
            rafHandle = requestAnimationFrame(function (timestamp) {
                // Render the initial state before any updates occur.
                draw(1);
                // The application isn't considered "running" until the
                // application starts drawing.
                running = true;
                // Reset variables that are used for tracking time so that we
                // don't simulate time passed while the application was paused.
                lastFrameTimeMs = timestamp;
                lastFpsUpdate = timestamp;
                framesThisSecond = 0;
                // Start the main loop.
                rafHandle = requestAnimationFrame(animate);
            });
        }
        return this;
    },
    /**
     * Stops the main loop.
     *
     * Event handling and other background tasks should also be paused when the
     * main loop is paused.
     *
     * Note that pausing in multiplayer/multi-user applications will cause the
     * player's/user's client to become out of sync. In this case the
     * simulation should exit, or the player/user needs to be snapped to their
     * updated position when the main loop is started again.
     *
     * See also `MainLoop.start()` and `MainLoop.isRunning()`.
     */
    stop: function () {
        running = false;
        started = false;
        cancelAnimationFrame(rafHandle);
        return this;
    },
    /**
     * Returns whether the main loop is currently running.
     *
     * See also `MainLoop.start()` and `MainLoop.stop()`.
     *
     * @return {Boolean}
     *   Whether the main loop is currently running.
     */
    isRunning: function () {
        return running;
    },
};
function animate(timestamp) {
    // Run the loop again the next time the browser is ready to render.
    // We set rafHandle immediately so that the next frame can be canceled
    // during the current frame.
    rafHandle = requestAnimationFrame(animate);
    // Throttle the frame rate (if minFrameDelay is set to a non-zero value by
    // `MainLoop.setMaxAllowedFPS()`).
    if (timestamp < lastFrameTimeMs + minFrameDelay) {
        return;
    }
    // frameDelta is the cumulative amount of in-app time that hasn't been
    // simulated yet. Add the time since the last frame. We need to track total
    // not-yet-simulated time (as opposed to just the time elapsed since the
    // last frame) because not all actually elapsed time is guaranteed to be
    // simulated each frame. See the comments below for details.
    frameDelta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    // Run any updates that are not dependent on time in the simulation. See
    // `MainLoop.setBegin()` for additional details on how to use this.
    begin(timestamp, frameDelta);
    // Update the estimate of the frame rate, `fps`. Every second, the number
    // of frames that occurred in that second are included in an exponential
    // moving average of all frames per second, with an alpha of 0.25. This
    // means that more recent seconds affect the estimated frame rate more than
    // older seconds.
    if (timestamp > lastFpsUpdate + 1000) {
        // Compute the new exponential moving average with an alpha of 0.25.
        // Using constants inline is okay here.
        fps = 0.25 * framesThisSecond + 0.75 * fps;
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;
    /*
     * A naive way to move an object along its X-axis might be to write a main
     * loop containing the statement `obj.x += 10;` which would move the object
     * 10 units per frame. This approach suffers from the issue that it is
     * dependent on the frame rate. In other words, if your application is
     * running slowly (that is, fewer frames per second), your object will also
     * appear to move slowly, whereas if your application is running quickly
     * (that is, more frames per second), your object will appear to move
     * quickly. This is undesirable, especially in multiplayer/multi-user
     * applications.
     *
     * One solution is to multiply the speed by the amount of time that has
     * passed between rendering frames. For example, if you want your object to
     * move 600 units per second, you might write `obj.x += 600 * delta`, where
     * `delta` is the time passed since the last frame. (For convenience, let's
     * move this statement to an update() function that takes `delta` as a
     * parameter.) This way, your object will move a constant distance over
     * time. However, at low frame rates and high speeds, your object will move
     * large distances every frame, which can cause it to do strange things
     * such as move through walls. Additionally, we would like our program to
     * be deterministic. That is, every time we run the application with the
     * same input, we would like exactly the same output. If the time between
     * frames (the `delta`) varies, our output will diverge the longer the
     * program runs due to accumulated rounding errors, even at normal frame
     * rates.
     *
     * A better solution is to separate the amount of time simulated in each
     * update() from the amount of time between frames. Our update() function
     * doesn't need to change; we just need to change the delta we pass to it
     * so that each update() simulates a fixed amount of time (that is, `delta`
     * should have the same value each time update() is called). The update()
     * function can be run multiple times per frame if needed to simulate the
     * total amount of time passed since the last frame. (If the time that has
     * passed since the last frame is less than the fixed simulation time, we
     * just won't run an update() until the the next frame. If there is
     * unsimulated time left over that is less than our timestep, we'll just
     * leave it to be simulated during the next frame.) This approach avoids
     * inconsistent rounding errors and ensures that there are no giant leaps
     * through walls between frames.
     *
     * That is what is done below. It introduces a new problem, but it is a
     * manageable one: if the amount of time spent simulating is consistently
     * longer than the amount of time between frames, the application could
     * freeze and crash in a spiral of death. This won't happen as long as the
     * fixed simulation time is set to a value that is high enough that
     * update() calls usually take less time than the amount of time they're
     * simulating. If it does start to happen anyway, see `MainLoop.setEnd()`
     * for a discussion of ways to stop it.
     *
     * Additionally, see `MainLoop.setUpdate()` for a discussion of performance
     * considerations.
     *
     * Further reading for those interested:
     *
     * - http://gameprogrammingpatterns.com/game-loop.html
     * - http://gafferongames.com/game-physics/fix-your-timestep/
     * - https://gamealchemist.wordpress.com/2013/03/16/thoughts-on-the-javascript-game-loop/
     * - https://developer.mozilla.org/en-US/docs/Games/Anatomy
     */
    numUpdateSteps = 0;
    while (frameDelta >= simulationTimestep) {
        update(simulationTimestep);
        frameDelta -= simulationTimestep;
        /*
         * Sanity check: bail if we run the loop too many times.
         *
         * One way this could happen is if update() takes longer to run than
         * the time it simulates, thereby causing a spiral of death. For ways
         * to avoid this, see `MainLoop.setEnd()`. Another way this could
         * happen is if the browser throttles serving frames, which typically
         * occurs when the tab is in the background or the device battery is
         * low. An event outside of the main loop such as audio processing or
         * synchronous resource reads could also cause the application to hang
         * temporarily and accumulate not-yet-simulated time as a result.
         *
         * 240 is chosen because, for any sane value of simulationTimestep, 240
         * updates will simulate at least one second, and it will simulate four
         * seconds with the default value of simulationTimestep. (Safari
         * notifies users that the script is taking too long to run if it takes
         * more than five seconds.)
         *
         * If there are more updates to run in a frame than this, the
         * application will appear to slow down to the user until it catches
         * back up. In networked applications this will usually cause the user
         * to get out of sync with their peers, but if the updates are taking
         * this long already, they're probably already out of sync.
         */
        if (++numUpdateSteps >= 240) {
            panic = true;
            break;
        }
    }
    /*
     * Render the screen. We do this regardless of whether update() has run
     * during this frame because it is possible to interpolate between updates
     * to make the frame rate appear faster than updates are actually
     * happening. See `MainLoop.setDraw()` for an explanation of how to do
     * that.
     *
     * We draw after updating because we want the screen to reflect a state of
     * the application that is as up-to-date as possible. (`MainLoop.start()`
     * draws the very first frame in the application's initial state, before
     * any updates have occurred.) Some sources speculate that rendering
     * earlier in the requestAnimationFrame callback can get the screen painted
     * faster; this is mostly not true, and even when it is, it's usually just
     * a trade-off between rendering the current frame sooner and rendering the
     * next frame later.
     *
     * See `MainLoop.setDraw()` for details about draw() itself.
     */
    draw(frameDelta / simulationTimestep);
    // Run any updates that are not dependent on time in the simulation. See
    // `MainLoop.setEnd()` for additional details on how to use this.
    end(fps, panic);
    panic = false;
}
exports.default = MainLoop;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Map = (function () {
    function Map() {
        this.powerupPoints = {};
        this.tileArtHeight = 8;
        this.tileArtWidth = 8;
        this.tileHeight = 16;
        this.tileWidth = 16;
        this.degradation = ".,; Bb";
        this.impassableTiles = "BS";
        this.width = 65;
        this.height = 49;
        var terrain = "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "Sffffffffff,c||||cBBB.......SfffffffS.......BBBc||||c,ffffffffffS" +
            "Sffffffffff,c||||cBB.......,SfffffffS,.......BBc||||c,ffffffffffS" +
            "Sffffffffff,c||||cB.......,;fffffffff;,.......Bc||||c,ffffffffffS" +
            "Sffffffffff,c||||c......S.,;fffffffff;,.S......c||||c,ffffffffffS" +
            "SffffBBBBBB.c||||.......S.,;fffffffff;,.S......c||||c.BBBBBBffffS" +
            "SffffBBBBBB.c|||........S..,SfffffffS,..S......c||||c.BBBBBBffffS" +
            "SffffffffBB.c|||....B...S..,SSSSSSSSS,..S...B..c||||c.BBffffffffS" +
            "SffffffffBB.c||||..BB...BBBBBBBBBBBBBBBBB...BB.c||||c.BBffffffffS" +
            "SffffffffBB.c||||c.BB.......BBBBBBBBB.......BB.c||||c.BBffffffffS" +
            "SBBBBffffBB.c||||c,,,,......,,,,,..............c||||c.BBffffBBBBS" +
            "SBBBBffffBB.c||||c...............,,,,,.........c||||c.BBffffBBBBS" +
            "S....,,,,...c||||c.....B.................B.....c||||c...,,ff,...S" +
            "Sccccccccccc.||||c....BSB......,,;,.....BSB....c||||ccccccccccccS" +
            "S------------.+||c.BBBBBBBBBBBBBbbBBBBBBBBBBBB.c||++------------S" +
            "S------------+++|c.BBBBBBBBBBBBbbBBBBBBBBBBBBB..|+++------------S" +
            "S------------+++|c.BBfffffffffffffffffffffffBB....++------------S" +
            "S------------++||c.,faaffffffffffbbffbbfffbfBB...|++------------S" +
            "Scccccccccccc||||c,;fafaffaffafafbfbfbfbfbfbf,,.||||cccc..ccccccS" +
            "SfffBBBBBBBBc||||c,;fafafafafafafbbffbbffbfbf;,c||||cBBBBBBBBfffS" +
            "SfffBBBBBBBBc||||c.;fafafaaffafafbfffbfbfbfbf;,c||||cBBBBBBBBfffS" +
            "SfffffffffBBc||||c.,faafffaaffaffbfffbfbffbff,.c||||cBBfffffffffS" +
            "SfffffffffBBc||||c.BBfffffffffffffffffffffffBB.c||||cBBfffffffffS" +
            "SfffffffffBBc||||c.BBB;;;;BBBBBBBBBBBBB;;;;BBB.c||||cBBfffffffffS" +
            "SBBBBBBfffBBc||||c.BBB,,,,BBBBBBBBBBBBB,,,,BBB.c||||cBBfffBBBBBBS" +
            "SBBBBBBfffBBc||||c.............................c||||cBBfffBBBBBBS" +
            "S;;;;BBfffBBc||||cccccccccccccc....ccccccccccccc||||cBBfffBB;;;;S" +
            "S,,,,BBfffBBc||++-------------------------------++||cBBfffBB,,,,S" +
            "S....BBfffBBc|+++-------------------------------+++|cBBfffBB....S" +
            "S...........c|+++-------------------------------+++|c...........S" +
            "S............||++-----------------------.-------++||c...........S" +
            "S...,,,,.....||||cccccccccccccccccccccc...cccccc||||c....,,,,...S" +
            "S.,;SSSSBBBB.||||cBBBBBBBBBBBB.ccc.BBBBBBBBBBBBc||||cBBBBSSSS;,.S" +
            "S....,,,;;;Bc||||cBBBBBBBBBBBB.ccc.BBBBBBBBBBBBc||||cB;;;,,,....S" +
            "S......,,;;Bc||||cBB........BB.ccc.BB........BBc||||cB;;,,......S" +
            "S.......,,;Bc||||cBB........BB.ccc.BB........BBc||||cB;,,.......S" +
            "SSSfffSS.,,Sc||||cBB...........ccc...........BBc||||cS,,.SSfffSSS" +
            "SffffffS..,Sc||||c.....,B,.....ccc.....,B,.....c||||cS,..SffffffS" +
            "Sfffffff..,Sc||||c.....BSB.....ccc.....BSB.....c||||cS,..fffffffS" +
            "Sfffffff...Sc||||c.....,B,.....ccc.....,B,.....c||||cS...fffffffS" +
            "Sfffffff....c||||cBB.........BBBBBBB.........BBc||||c....fffffffS" +
            "SffffffS....c||||cBB........BBBBBBBBB........BBc||||.....SffffffS" +
            "SffffffS....c||||cBB.......BBBBBBBBBBB.......BBc|||......SffffffS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfffffSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" +
            "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";
        var buildings = "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "               h                                  h              " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "            x                                                    " +
            "             x                                                   " +
            "              x                                                  " +
            "   h                                             x            h  " +
            "                                                x                " +
            "                                               x                 " +
            "                                D                                " +
            "                                                                 " +
            "                                                                 " +
            "            xx                                     xx            " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                               xxxx                              " +
            "                xx                             xx                " +
            "                                                                 " +
            "                                                                 " +
            "                        x               x                        " +
            "                        x               xx                       " +
            "            xx                                     xx            " +
            "                                                                 " +
            "                                H                                " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "               h                                  h              " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 " +
            "                                                                 ";
        if (terrain.length !== this.width * this.height) {
            throw new Error("Cannot load map from string!");
        }
        this.terrainArray = Array.from(terrain);
        this.buildingArray = (buildings)
            ? Array.from(buildings)
            : Array.from(Array(this.terrainArray.length + 1).join(" ")); // looks stupid, but wtf
        this.tileDictionary = {};
        this.tileDictionary["."] = { tileX: 0, tileY: 0, variants: 8, traction: 0.5 };
        this.tileDictionary[","] = { tileX: 0, tileY: 1, variants: 8, traction: 0.4 };
        this.tileDictionary[";"] = { tileX: 0, tileY: 2, variants: 8, traction: 0.3 };
        this.tileDictionary["-"] = { tileX: 0, tileY: 4, variants: 4, traction: 0.8 };
        this.tileDictionary["+"] = { tileX: 4, tileY: 4, variants: 4, traction: 0.8 };
        this.tileDictionary["|"] = { tileX: 0, tileY: 5, variants: 4, traction: 0.8 };
        this.tileDictionary["B"] = { tileX: 0, tileY: 9, variants: 2, traction: 0.1 };
        this.tileDictionary["S"] = { tileX: 2, tileY: 6, traction: 0.1 };
        this.tileDictionary["b"] = { tileX: 2, tileY: 9, variants: 2, traction: 0.9, speed: 0.5 };
        this.tileDictionary["a"] = { tileX: 0, tileY: 7, variants: 8, traction: 0.95 };
        this.tileDictionary["c"] = { tileX: 0, tileY: 8, variants: 4, traction: 0.95 };
        this.tileDictionary["f"] = { tileX: 4, tileY: 8, variants: 4, traction: 0.95 };
        // all buildings not listed in dictionary are considered powerup points and are removed from map
        this.tileDictionary["x"] = { tileX: 0, tileY: 3, variants: 4 };
        for (var i = 0; i < this.buildingArray.length; i++) {
            var char = this.buildingArray[i];
            if (char === " ") {
                continue;
            }
            if (char in this.tileDictionary) {
                continue;
            }
            var array = void 0;
            if (char in this.powerupPoints) {
                array = this.powerupPoints[char];
            }
            else {
                array = [];
                this.powerupPoints[char] = array;
            }
            array.push(new PowerupPoint(i % this.width, Math.floor(i / this.width)));
            this.buildingArray[i] = " ";
        }
    }
    Map.prototype.drawTile = function (ctx, x, y, tileChar) {
        var tileCfg = this.tileDictionary[tileChar];
        if (!tileCfg) {
            return;
        }
        var randomOffset = 0;
        if (tileCfg.variants) {
            randomOffset = (x * 17 + y * 13) % tileCfg.variants;
        }
        // can also rotate ground tiles?
        ctx.drawImage(this.tilesImage, (tileCfg.tileX + randomOffset) * this.tileArtWidth, tileCfg.tileY * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    };
    Map.prototype.drawMap = function (ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        for (var cx = 0; cx < this.width; cx++) {
            for (var cy = 0; cy < this.height; cy++) {
                var char = this.getTerrainChar(cx, cy);
                this.drawTile(ctx, cx, cy, char);
                if (char !== "B" && char !== "S" && cy > 0 && cx > 0 && cy < 43 && cx < 64) {
                    var dx = 0;
                    var dy = 0;
                    var dxs = 0;
                    var dys = 0;
                    var tleft = this.getTerrainChar(cx - 1, cy);
                    var tright = this.getTerrainChar(cx + 1, cy);
                    var ttop = this.getTerrainChar(cx, cy - 1);
                    var tbottom = this.getTerrainChar(cx, cy + 1);
                    if (tleft === "B" || tleft === "S") {
                        dx += 2;
                    }
                    if (tright === "B" || tright === "S") {
                        dx += 1;
                    }
                    if (ttop === "B" || ttop === "S") {
                        dy += 2;
                    }
                    if (tbottom === "B" || tbottom === "S") {
                        dy += 1;
                    }
                    if (char !== "." && char !== "," && char !== ";") {
                        if (tleft === "." || tleft === "," || tleft === ";") {
                            dxs += 2;
                        }
                        if (tright === "." || tright === "," || tright === ";") {
                            dxs += 1;
                        }
                        if (ttop === "." || ttop === "," || ttop === ";") {
                            dys += 2;
                        }
                        if (tbottom === "." || tbottom === "," || tbottom === ";") {
                            dys += 1;
                        }
                    }
                    if (dxs || dys) {
                        ctx.drawImage(this.tilesImage, (8 + dxs) * this.tileArtWidth, (0 + dys) * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight, cx * this.tileWidth, cy * this.tileHeight, this.tileWidth, this.tileHeight);
                    }
                    if (dx || dy) {
                        ctx.drawImage(this.tilesImage, (12 + dx) * this.tileArtWidth, (0 + dy) * this.tileArtHeight, this.tileArtWidth, this.tileArtHeight, cx * this.tileWidth, cy * this.tileHeight, this.tileWidth, this.tileHeight);
                    }
                }
                var bchar = this.getBuildingChar(cx, cy);
                if (bchar !== " ") {
                    this.drawTile(ctx, cx, cy, bchar);
                }
            }
        }
        ctx.restore();
    };
    Map.prototype.degradeTileAt = function (xpx, ypx) {
        var xcell = Math.floor(xpx / this.tileWidth);
        var ycell = Math.floor(ypx / this.tileHeight);
        this.degradeTile(xcell, ycell);
    };
    Map.prototype.degradeTile = function (xcell, ycell) {
        if (xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height) {
            var char = this.getTerrainChar(xcell, ycell);
            var idx = this.degradation.indexOf(char);
            if (idx > -1 && idx + 1 < this.degradation.length && this.degradation.charAt(idx + 1) !== " ") {
                this.setTerrainChar(xcell, ycell, this.degradation.charAt(idx + 1));
            }
        }
    };
    Map.prototype.getTileAt = function (xpx, ypx) {
        var xcell = Math.floor(xpx / this.tileWidth);
        var ycell = Math.floor(ypx / this.tileHeight);
        return this.getTile(xcell, ycell);
    };
    Map.prototype.getTile = function (xcell, ycell) {
        var tchar = this.getTerrainChar(xcell, ycell);
        var bchar = this.getBuildingChar(xcell, ycell);
        if (xcell >= 0 && xcell < this.width && ycell >= 0 && ycell < this.height) {
            return {
                terrain: tchar,
                building: bchar,
                tractionFactor: this.tileDictionary[tchar].traction,
                speed: this.tileDictionary[tchar].speed,
                passable: this.impassableTiles.indexOf(tchar) < 0 && bchar === " ",
            };
        }
    };
    Map.prototype.getBuildingChar = function (x, y) {
        var index = y * this.width + x;
        return this.buildingArray[index];
    };
    Map.prototype.setTerrainChar = function (x, y, char) {
        var index = y * this.width + x;
        this.terrainArray[index] = char;
    };
    Map.prototype.getTerrainChar = function (x, y) {
        var index = y * this.width + x;
        return this.terrainArray[index];
    };
    return Map;
}());
function PowerupPoint(x, y) {
    this.x = x;
    this.y = y;
    this.powerup = null;
}
exports.default = Map;


/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(4);
var documentReadyInterval = setInterval(function () {
    if (document.readyState === "complete") {
        main_1.default.EntryPoint();
        clearInterval(documentReadyInterval);
        window.onresize = function () {
            if (main_1.default.Canvas) {
                // App.Canvas.width = window.innerWidth;
                // App.Canvas.height = window.innerHeight;
            }
        };
    }
}, 50);


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Res = {
    inviteLine1: "Присоединяйтесь, заходите на",
    inviteLine3: "в браузере своего сотового!",
    volumeOff: "ВЫКЛ",
    Score: "PTS",
    HiNameChooseYourTeam: "Привет, <b>{name}</b>!<br/>Выбирай свою команду:",
    HiNameYouAreInTeamChooseYourRole: "Привет, <b>{name}</b>!<br/>Ты в команде <b>{team}</b>.<br/>Выбери свою роль:",
    back: "Назад",
    HiNameYouAreInATeamAndShouldAct: "Привет, <b>{name}</b>!<br/>Ты в команде <b>{team}</b>,<br/>и должен <b>{position}</b>.",
    EnterYourName: "Введи свой позывной:",
    Enter: "Войти",
    KickAll: "Выбить всех",
    StartGame: "Открыть карты",
    Name: "Имя",
    Teams: [
        "золото",
        "пурпур",
        "нефрит"
    ],
    TeamStyles: [
        "gold",
        "#9c27b0",
        "#4CAF50"
    ],
    Roles: {
        ManageRole: 'руководить',
        ManageGood: 'Хвалить',
        ManageBad: 'Ругать',
        ShootRole: 'атаковать',
        Shoot: 'Огонь!',
        TurretRole: 'наводить',
        TurretLeft: 'Орудие влево',
        TurretRight: 'Орудие вправо',
        MoveRole: 'вести',
        ForwardRole: '-вести вперёд-',
        Forward: 'В атаку!',
        BackwardRole: '-вести назад-',
        Backward: 'Отступаем!',
        TurnRole: 'направлять',
        LeftRole: '-левее-',
        Left: 'Лево руля!',
        RightRole: '-правее-',
        Right: 'Право руля!'
    },
    ManagerGoodPhrases: [
        "Вперёд!",
        "Так держать!",
        "Молодцы!",
        "Всем по премии!",
        "Премия +50% каждому!",
        "Больше ништяков!",
        "Страна вами гордится!",
        "Гагарин бы вами гордился!",
        "Чувствуется русская инженерная школа!",
        "Быстрее! Выше! Сильнее!",
        "Вместе мы – сила!",
        "Дави их!",
    ],
    ManagerBadPhrases: [
        "Кто вас такому учил?",
        "Куда это годится?!",
        "Всех уволю!",
        "Чем вы там рулите?",
        "Все останетесь без премии!",
        "Вы позорите Родину!",
        "Ну, соберитесь уже!",
        "Вы – слабое звено!",
        "Гагарин смог, а вы – нет...",
        "Тут делов на три минуты!",
        "Перехвалил!",
        "Вы вообще читали воинский устав?",
        "Нам нечем ответить противнику!",
    ],
    generatedNamesAdjectives: ["агрессивный",
        "безрассудный",
        "бескомпромиссный",
        "отважный",
        "неуловимый",
        "неустрашимый",
        "благоразумный",
        "дерзкий",
        "воинственный",
        "непревзойденный",
        "свирепый",
        "злопамятный",
        "яростный",
        "темпераментный",
        "доблестный",
        "выдающийся",
        "неотразимый",
        "мечтательный",
        "образцовый",
        "добродушный"],
    generatedNamesNouns: ["стратег",
        "девелопер",
        "тестировщик",
        "менеджер",
        "кодер",
        "архитектор",
        "военачальник",
        "теоретик",
        "идеалист",
        "агитатор",
        "стажер",
        "хакер",
        "исследователь",
        "экспериментатор",
        "лидер"],
};
exports.default = Res;


/***/ })
/******/ ]);