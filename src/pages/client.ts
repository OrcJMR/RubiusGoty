import { _socket, _positions } from "../socketsconfig";
import Res from "../locale_russian";

var ClientViewModel = {
    type: 'join'
};

function GoTo(url) {
    setTimeout(() => {
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
var Sockets = (() => {
	_socket.onopen = () => {
		_socket.sendJson(ClientViewModel);
	}

	_socket.onmessage = msg => {
		var data = JSON.parse(msg.data);


		//console.log(data);

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
		Init(name, team, position) {

			ClientViewModel.name = name;
			ClientViewModel.team = team;
			ClientViewModel.position = position;
			//console.log(ClientViewModel);
			_socket.sendJson(ClientViewModel);
		},
		sendJson(data) {
			//console.log(data);
			_socket.sendJson(data);
		},
		Close() {
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

window.req = { Res, _socket, _positions, Sockets, CheckClientNavigationShouldExit, GoTo, GoToChooseTeam };
