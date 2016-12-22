var ClientViewModel = {
    type: 'join'
};

function GoTo(url) {
    setTimeout(function() {
        document.querySelector('app-router').go(url);
    },10);
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
    } else {
        if (!localStorage.getItem('username')) {
            GoTo('/');
            return true;
        }
    }

    return false;

}
var Sockets = (function() {
    _socket.onopen = function()
    {
        _socket.sendJson(ClientViewModel);
    }

    _socket.onmessage = function(msg){
        var data = JSON.parse(msg.data);


        console.log(msg);

        if (data.type == 'ViewModel') {
            Sockets.ViewModel = data;
            if (Sockets.UpdateCallback) {
                Sockets.UpdateCallback();
            }
        } else if (data.type == 'kick') {
            Sockets.Close();
            GoTo('/');
        }
    };

    return {
        Init: function(name, team, position) {

            ClientViewModel.name = name;
            ClientViewModel.team = team;
            ClientViewModel.position = position;
            _socket.sendJson(ClientViewModel);
        },
        sendJson: function(data) {
            _socket.sendJson(data);
        },
        Close: function() {
            _socket.sendJson({
                type: 'close',
            })
        },
        ViewModel: {
            gameState: {
                state: 0,
                teams: []
            },
            positionsTaken: {}
        },
        UpdateCallback: null,
    }
})();
