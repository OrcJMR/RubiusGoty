var Sockets = (function() {
    var _socket = new WebSocket(webSocketUrl);
    var team = 1;

    var viewModel = {};

    function Send(obj) {
        _socket.send(JSON.stringify(obj));
    }

    _socket.onopen = function()
    {
        Send({
            type: 'join',
            team: team,
        });
    }

    _socket.onmessage = function(msg){
        var data = JSON.parse(msg.data);

        if (data.type == "viewModel") {
            viewModel = data;
        }
    };

    return {
        SetName: function(name) {
            Send({
                type: 'SetName',
                name: name,
            })
        }
    }
})();
