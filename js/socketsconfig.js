var webSocketUrl = "wss://snotty-stallion.gomix.me";
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