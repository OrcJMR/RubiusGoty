
// Behaviors store their parameters inside target object.
// Constructors construct init() with initial values, everything else is static.

function NetworkCooldownInputKeyboardStub(team, property) {
    this.team = team;
    this.property = property;
}
NetworkCooldownInputKeyboardStub.prototype = {
    isDown: function(char) {

        var team = this.team();
        if (!team)
            return 0;
        var flag1 = 0;
        var that = this;
        team.members.forEach(function (member) {
            var state = member.state;
            if (!state)
                return;

            if (state[that.property] == 1) {
                flag1 = 1;
            }

        });

        return flag1;
    }
};

function NetworkBiDiInput(team, propertyForward, propertyBackward) {
    this.team = team;
    this.propertyForward = propertyForward;
    this.propertyBackward = propertyBackward;
}

NetworkBiDiInput.prototype = {
    read: function() {
        var flag1 = 0;
        var flag2 = 0;

        var team = this.team();
        if (!team)
            return 0;

        var that = this;
        team.members.forEach(function (member) {
            var state = member.state;
            if (!state)
                return;

            if (state[that.propertyForward] == 1) {
                flag1 = 1;
            }
            if (state[that.propertyBackward] == 1) {
                flag2 = 1;
            }
        });

        if(flag1 == flag2)
            return 0;
        if(flag1)
            return 1;
        if(flag2)
            return -1;
    }
}

var Sockets = (function() {

    _socket.onopen = function()
    {
        _socket.sendJson({
            isAdmin: true,
        });
    }


    _socket.onmessage = function(msg){
        var data = JSON.parse(msg.data);
        console.log('got msg ' + msg.data);

        if (data.type == 'ViewModel') {
            Sockets.ViewModel = data;
            if (Sockets.UpdateCallback) {
                Sockets.UpdateCallback();
            }
        }

    }

    return {
        ViewModel: {
            teams: [
                {}, {}, {}, {}, {}
            ]
        },
        UpdateCallback: null
    };
})();
