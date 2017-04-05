var server = require('http').createServer(),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    app = express();

// Client stuff

var iface = process ? process.env.IFACE : null;
var port = process ? process.env.PORT : 80;
if (!port)
   port = 80;
console.log("Configured address: " + iface + ":" + port);

app.use(express.static('.'));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/index.html');
});



var admin = [];
var teams = []; //array of Team
function Team(id) {
    this.members = []; //array of client (structure see below var client = {)
    this.positionsTaken = {};
    this.id = id;
};
teams.push(new Team(1));
teams.push(new Team(2));
teams.push(new Team(3));

var actions = ['fire', 'turretLeft', 'turretRight', 'strafeRight', 'strafeLeft', 'rightTrackForward', 'rightTrackBackward'
    , 'moveForward', 'moveBackward', 'leftTrackForward', 'leftTrackBackward'];
var serverModel = {
    teams: teams
};

var _gameState = {
    state: 0,
    teams: teams.map(function (team) { return {title: team.title, color: team.color, id: team.id};})
};

function SendServerModel() {
    var seen = [];
    var model = {
        type: 'ViewModel',
        teams: [],
    };
    teams.forEach(function (team) {
        model.teams.push({
            members: team.members.map(function (i){return i.model;}),
            title: team.title,
            id: team.id,
            color: team.color,
        });
    });

    console.log("to Server " + admin.length + ": " + JSON.stringify(model));
    admin.forEach(function(elem) {
        try{
            elem.send(JSON.stringify(model));
        }catch (Exception) {
        }
    })
}

function SendClientViewModelToAllClients() {
    teams.forEach(function (team) {
        team.members.forEach(function (member) {
            member.SendClientModel();
        })
    })
}

function RemoveFromArray(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1)
        array.splice(index, 1);
}

function UpdateTeamPositions(teamId) {
    if (!teamId)
        return;
    var team = serverModel.teams[teamId-1];
    var positionsTaken = {};
    console.log("Members count: " + team.members.length)
    team.members.forEach(function (member) {
        positionsTaken[member.model.position] = true;
    });

    team.positionsTaken = positionsTaken;
    team.members.forEach(function (member) {
        member.model.positionsTaken = positionsTaken;
        member.SendClientModel();
    });
}

// Server stuff
wss.on('connection', function connection(ws) {
    console.log('someone connected');

    var intervalId = setInterval(function() {

        if (model.ping.getTime() + 10000 < (new Date()).getTime()){
            console.log('lost client (no ping)');
            actions.forEach(function (action) {
                model.state[action] = 0;
                model.position = "";
            });
            //ws.close();
            SendServerModel();
        }
    }, 10000);

    var isAdmin = false;
    var model = {
        type: 'ViewModel',
        ping: new Date(),
        gameState: _gameState,
        positionsTaken: {},
        state: {},
    };
    var client = {
        ws: ws,
        model: model,
        SendClientModel: function() {
            try{
                var message = JSON.stringify(model);
                console.log('Send to client: ' + message);
                ws.send(message);
            }catch (Exception) {
            }
        },
        UpdateTeam: function (team) {
            serverModel.teams.forEach(function (team) {
                RemoveFromArray(team.members, client);
            });

            model.team = team;
            if (team == undefined)
                return;
            console.log("UpdateTeam: " + team);

            var team = serverModel.teams[model.team - 1];
            team.members.push(client);
            UpdateTeamPositions(model.team);
        }
    }
    client.SendClientModel();

    ws.on('close', function close() {
        /*if (ws.gameState) {
            _gameState.state = 0;
            SendClientViewModelToAllClients();
        }*/
        RemoveFromArray(admin, ws);
        serverModel.teams.forEach(function (team) {
            RemoveFromArray(team.members, client);
        });

        UpdateTeamPositions(model.team);

        SendServerModel();
        clearInterval(intervalId);
    });

    ws.on('message', function incoming(message) {
        var data = JSON.parse(message);

        if (data.isAdmin) {
            isAdmin = true;
            admin.push(ws);
            SendServerModel();
        }

        if (data.type == 'join') {
            model.name = data.name;
            model.position = data.position;

            client.UpdateTeam(data.team);

            SendServerModel();
        } else if (data.type == 'ping') {
            model.ping = new Date();
            UpdateTeamPositions(model.team);
            client.SendClientModel();
        } else if (data.type == 'close') {
            model.position = "";
            UpdateTeamPositions(model.team);
        } else if (data.type == 'clientState') {
            model.state = data;
            SendServerModel();
        } else if (data.type == 'getPositions') {
            if (data.team) {
                client.UpdateTeam(data.team);
                client.SendClientModel();
            }
        }

        if (isAdmin) {
            if (data.type == 'kickAll') {
                serverModel.teams.forEach(function (team) {
                    team.members.forEach(function (member) {member.ws.send(JSON.stringify({type: 'kick'}));});
                    team.members.length = 0;
                });

                SendServerModel();
            } else if (data.type == 'gameState') {
                ws.gameState = data.state;
                _gameState.state = ws.gameState;
                SendClientViewModelToAllClients();
            }
        }
    });
});

// Listen
server.on('request', app);
if(!iface)
    server.listen(port, function () {
        console.log('Your app is listening on port ' + server.address().port + ", default address.");
    });
else
    server.listen(port, iface, function () {
        console.log('Your app is listening on ' + server.address().address + ":" + server.address().port);
    });