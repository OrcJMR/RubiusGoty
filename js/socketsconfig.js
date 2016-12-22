var webSocketUrl = "wss://snotty-stallion.gomix.me";

var _positions = [
    {
        title: 'Руководить',
        id: 'manager',
        actions: [
            {action:'managerGood', text: 'Хвалить', icon: 'button-right.png'},
            {action:'managerBad', text: 'Ругать', icon: 'button-right.png'}
        ]
    },
    {
        title: 'Коммит',

        id: 'fire',
        actions: [
            {action:'fire', text: 'Коммит', icon: 'button-fire.png'}
        ]
    },
    {
        title: 'Код Ревью',

        id: 'turret',
        actions: [
            {action:'turnLeft', text: 'Принять', icon: 'button-turret.png'},
            {action:'turnRight', text: 'Отклонить', icon: 'button-turret.png'}
        ]
    },
    {
        title: 'Новые Фичи',
        id: 'move1',
        actions: [
            {action:'moveForward', text: 'Новые Фичи', icon: 'button-forward.png'}
        ]
    },
    {
        title: 'Переписать заново',
        id: 'move2',
        actions: [
            {action:'moveBackward', text: 'Переписать заново', icon: 'button-backward.png'}
        ]
    },

    {
        title: 'Делать как СЮ',
        id: 'turn1',
        actions: [
            {action:'turnLeft', text: 'Делать как СЮ', icon: 'button-left.png'}
        ]
    },
    {
        title: 'Делать как СЕ',
        id: 'turn2',
        actions: [
            {action:'turnRight', text: 'Делать как СЕ', icon: 'button-right.png'}
        ]
    }

];

//var webSocketUrl = "wss://localhost:9090";

var _socket = new ReconnectingWebSocket(webSocketUrl);

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