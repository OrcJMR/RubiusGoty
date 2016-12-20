
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

function NetworkBiDiInput(team, propertyForward, propertyBackward) {
    this.team = kybd;
    this.propertyForward = charForward;
    this.propertyBackward = charBackward;
}

NetworkBiDiInput.prototype = {
    read: function() {
        var flag1 = team[propertyForward];
        var flag2 = team[propertyBackward];
        if(flag1 == flag2)
            return 0;
        if(flag1)
            return 1;
        if(flag2)
            return -1;
    }
}
var Sockets = (function() {
    var _socket = new WebSocket(webSocketUrl);

    var result = {
        ViewModel: {},
        UpdateCallback: null
    };

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
        var data = JSON.parse(msg.data);

        if (data.type == 'ViewModel') {
            result.ViewModel = data;
            if (result.UpdateCallback) {
                result.UpdateCallback();
            }
        }

        //alert(data.type);
    }

    return result;
})();
