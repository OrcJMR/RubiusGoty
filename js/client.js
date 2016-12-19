var Sockets = (function() {
    var _socket = new WebSocket(webSocketUrl);
    var team = 1;

    var viewModel = {};

    function Send(obj) {
        _socket.send(JSON.stringify(obj));
    }

    _socket.onopen = function()
    {
        if (viewModel.name) {
            Send(viewModel);
        }
    }

    _socket.onmessage = function(msg){
        var data = JSON.parse(msg.data);

        if (data.type == "viewModel") {
            viewModel = data;
        }
    };

    return {
        Init: function(name, team, position) {
            viewModel =
            {
                type: 'join',
                team: team,
                position: position,
                name: name
            };
            Send(viewModel);
        },
        Close: function() {
            Send({
                type: 'close'
            });
        },
        Send: function(data) {
            Send(data);
        }
    }
})();
