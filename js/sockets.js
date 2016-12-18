
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

var Sockets = (function() {
    var _socket = new WebSocket(webSocketUrl);
    var team = 1;

    function Send(obj) {
        _socket.send(JSON.stringify(obj));
    }

    _socket.onopen = function()
    {
        Send({
            isAdmin: true,
        });
    }

    _socket.onmessage = function(msg){
        //var data = JSON.parse(msg.data);
        //alert(data.type);
    }
})();
