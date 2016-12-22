var webSocketUrl = "wss://snotty-stallion.gomix.me";

var _positions = [
    {
        title: 'Руководить',
        id: 'manager',
        actions: [
            {action:'managerGood', text: 'Хвалить', icon: 'button-good.png'},
            {action:'managerBad', text: 'Ругать', icon: 'button-bad.png'}
        ]
    },
    {
        title: 'Коммитить',

        id: 'fire',
        actions: [
            {action:'fire', text: 'Коммит!', icon: 'button-fire.png'}
        ]
    },
    {
        title: 'Проводить код-ревью',

        id: 'turret',
        actions: [
            {action:'turnLeft', text: 'Принять', icon: 'button-turret-left.png'},
            {action:'turnRight', text: 'Отклонить', icon: 'button-turret-right.png'}
        ]
    },
    {
        title: 'Писать новые фичи',
        id: 'move1',
        actions: [
            {action:'moveForward', text: 'Написать фичу', icon: 'button-forward.png'}
        ]
    },
    {
        title: 'Переписывать всё заново',
        id: 'move2',
        actions: [
            {action:'moveBackward', text: 'Переписать заново', icon: 'button-backward.png'}
        ]
    },

    {
        title: 'Делать как С.Ю.',
        id: 'turn1',
        actions: [
            {action:'turnLeft', text: 'Сделать как С.Ю.', icon: 'button-left.png'}
        ]
    },
    {
        title: 'Делать как С.Е.',
        id: 'turn2',
        actions: [
            {action:'turnRight', text: 'Сделать как С.Е.', icon: 'button-right.png'}
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