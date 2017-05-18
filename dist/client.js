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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var socketsconfig_1 = __webpack_require__(1);
var locale_russian_1 = __webpack_require__(19);
var ClientViewModel = {
    type: 'join'
};
function GoTo(url) {
    setTimeout(function () {
        document.querySelector('app-router').go(url);
    }, 10);
}
function GoToChooseTeam() {
    GoTo('/chooseteam');
}
function CheckClientNavigationShouldExit(page) {
    if (page == 'login-page') {
        if (localStorage.getItem('username')) {
            GoToChooseTeam();
            return true;
        }
    }
    else {
        if (!localStorage.getItem('username')) {
            GoTo('/');
            return true;
        }
    }
    return false;
}
var Sockets = (function () {
    socketsconfig_1._socket.onopen = function () {
        socketsconfig_1._socket.sendJson(ClientViewModel);
    };
    socketsconfig_1._socket.onmessage = function (msg) {
        var data = JSON.parse(msg.data);
        //console.log(data);
        if (data.type == 'ViewModel') {
            Sockets.ViewModel = data;
            if (Sockets.UpdateCallback) {
                Sockets.UpdateCallback();
            }
        }
        else if (data.type == 'kick') {
            Sockets.Close();
            GoTo('/');
        }
    };
    return {
        Init: function (name, team, position) {
            ClientViewModel.name = name;
            ClientViewModel.team = team;
            ClientViewModel.position = position;
            //console.log(ClientViewModel);
            socketsconfig_1._socket.sendJson(ClientViewModel);
        },
        sendJson: function (data) {
            //console.log(data);
            socketsconfig_1._socket.sendJson(data);
        },
        Close: function () {
            socketsconfig_1._socket.sendJson({
                type: 'close',
            });
        },
        ViewModel: {
            gameState: {
                state: 0,
                teams: []
            },
            positionsTaken: {}
        },
        UpdateCallback: null,
    };
})();
window.req = { Res: locale_russian_1.default, _socket: socketsconfig_1._socket, _positions: socketsconfig_1._positions, Sockets: Sockets, CheckClientNavigationShouldExit: CheckClientNavigationShouldExit, GoTo: GoTo, GoToChooseTeam: GoToChooseTeam };


/***/ }),

/***/ 19:
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

/******/ });