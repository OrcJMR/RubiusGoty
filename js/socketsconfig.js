
var urlToJoinGame = null; // put the url to connect to here
var webSocketUrl;

if (location.host.indexOf("github.io") > -1) {
    webSocketUrl = "wss://cactus-trapezoid.glitch.me/";
    urlToJoinGame = location.host + "/RubiusGoty";
} else {
    webSocketUrl = "ws://" + location.host;
    if(!urlToJoinGame)
        urlToJoinGame = location.host;
}

var _positions = [
    {
        title: Res.Roles.ManageRole,
        id: 'manager',
        actions: [
            {action:'managerGood', text: Res.Roles.ManageGood, icon: 'button-good.png'},
            {action:'managerBad', text: Res.Roles.ManageBad, icon: 'button-bad.png'}
        ]
    },
    {
        title: Res.Roles.ShootRole,

        id: 'fire',
        actions: [
            {action:'fire', text: Res.Roles.Shoot, icon: 'button-fire.png'}
        ]
    },
    {
        title: Res.Roles.TurretRole,

        id: 'turret',
        actions: [
            {action:'turretLeft', text: Res.Roles.TurretLeft, icon: 'button-turret-left.png'},
            {action:'turretRight', text: Res.Roles.TurretRight, icon: 'button-turret-right.png'}
        ]
    },
    {
        title: Res.Roles.ForwardRole,
        id: 'move1',
        actions: [
            {action:'moveForward', text: Res.Roles.Forward, icon: 'button-forward.png'}
        ]
    },
    {
        title: Res.Roles.BackwardRole,
        id: 'move2',
        actions: [
            {action:'moveBackward', text: Res.Roles.Backward, icon: 'button-backward.png'}
        ]
    },

    {
        title: Res.Roles.LeftRole,
        id: 'turn1',
        actions: [
            {action:'turnLeft', text: Res.Roles.Left, icon: 'button-left.png'}
        ]
    },
    {
        title: Res.Roles.RightRole,
        id: 'turn2',
        actions: [
            {action:'turnRight', text: Res.Roles.Right, icon: 'button-right.png'}
        ]
    }
];

var _socket;

if(webSocketUrl != "ws://") { // opened from disk?
    _socket = new ReconnectingWebSocket(webSocketUrl);

    _socket.sendJson = function (message, callback) {
        _socket.waitForConnection(function () {
            _socket.send(JSON.stringify(message));
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 300);
    };

    _socket.waitForConnection = function (callback, interval) {
        if (_socket.readyState === 1) {
            callback();
        } else {
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };
}