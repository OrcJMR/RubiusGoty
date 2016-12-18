var server = require('http').createServer(),
    WebSocketServer = require('ws').Server,
    server = require('http').createServer(),
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    app = express();

// Client stuff
//gomix
/*
app.use(express.static('public'));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
*/
app.use(express.static('.'));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/index.html');
});



var admin = [];
var team1 = [];
var team2 = [];

var serverModel = {
    team1: {
        members: team1
    },
    team2: {
        members: team2
    },
};

function SendServerModel() {
    admin.forEach(function(elem) {
        elem.send(JSON.stringify(serverModel));
    })
}

// Server stuff
wss.on('connection', function connection(ws) {
    console.log('someone connected');

    var client = {
        ws: ws,
    }
    ws.send(JSON.stringify({
        type: 'init',
        role: '1',
    }));

    function RemoveFromArray(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1)
            array.splice(index, 1);
    }

    ws.on('close', function close() {
        RemoveFromArray(admin, client);
        RemoveFromArray(team1, client);
        RemoveFromArray(team2, client);

        SendServerModel();
        console.log('disconnected');
    });

    ws.on('message', function incoming(message) {
        var data = JSON.parse(message);

        if (data.isAdmin) {
            admin.push(ws)
        }
        console.log('message ' + message);

        if (data.type == 'SetName') {
            client.name = data.name;
            SendServerModel();
        }
    });
});

// Listen
server.on('request', app);
server.listen(9090, function () {
    console.log('Your app is listening on port ' + server.address().port);
});