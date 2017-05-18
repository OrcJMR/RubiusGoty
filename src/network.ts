import { _socket } from "./socketsconfig";

class NetworkCooldownInputKeyboardStub {
	vacant;
	position;
	property;
	team;

	isDown(char) {

		var team = this.team();
		if (!team)
			return 0;
		var flag1 = 0;
		this.vacant = true;
		team.members.forEach(member => {
			var state = member.state;
			if (!state)
				return;

			if (member.position == this.position)
				this.vacant = false;
			if (state[this.property] == 1) 
				flag1 = 1;
		});

		return flag1;
	}

	constructor(team, property, position) {
		this.team = team;
		this.property = property;
		this.position = position;
		this.vacant = true;
	}
}

class NetworkBiDiInput {
	valueBackward;
	valueForward;
	vacantBackward;
	vacantForward;
	positionBackward;
	positionForward;
	propertyBackward;
	propertyForward;
	team;

	read() {
		this.valueForward = 0;
		this.valueBackward = 0;
		this.vacantForward = true;
		this.vacantBackward = true;

		var team = this.team();
		if (!team)
			return 0;
		team.members.forEach(member => {
			var state = member.state;
			if (!state)
				return;

			if (member.position == this.positionForward)
				this.vacantForward = false;
			if (state[this.propertyForward] == 1)
				this.valueForward = 1;
            
			if (member.position == this.positionBackward)
				this.vacantBackward = false;
			if (state[this.propertyBackward] == 1)
				this.valueBackward = 1;
		});

		if(this.valueForward == this.valueBackward)
			return 0;
		if(this.valueForward)
			return 1;
		if(this.valueBackward)
			return -1;
	}

	constructor(team, propertyForward, propertyBackward, positionForward, positionBackward) {
		this.team = team;
		this.propertyForward = propertyForward;
		this.propertyBackward = propertyBackward;
		this.positionForward = positionForward;
		this.positionBackward = positionBackward ? positionBackward : positionForward;
		this.vacantForward = true;
		this.vacantBackward = true;
	}
}

var Sockets = (() => {

	if(_socket) {
		_socket.onopen = () => {
			_socket.sendJson({
				isAdmin: true,
			});
		}

		/*setInterval(function () {
            Sockets.SendState();
        }, 5000);
    */
		_socket.onmessage = msg => {
			var data = JSON.parse(msg.data);
			console.log('got msg ' + msg.data);

			if (data.type == 'ViewModel') {
				Sockets.ViewModel = data;
				if (Sockets.UpdateCallback) {
					Sockets.UpdateCallback();
				}
			}

		}
	}

	return {
		ViewModel: {
			teams: [

			],
		},
		/*SendState: function() {
            Sockets.sendJson({type: 'gameState', state: Sockets.ViewModel.gameStarted});
        },*/
		UpdateCallback: null
	};
})();

export { Sockets, NetworkBiDiInput, NetworkCooldownInputKeyboardStub };
