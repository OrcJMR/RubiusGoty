import Res from "../locale_russian";
import { Sockets } from "../network";
import { _positions, _socket, urlToJoinGame } from "../socketsconfig";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("joinTitle").innerHTML = Res.inviteLine1 +
        " <span style=\"color: red\">" + urlToJoinGame + "</span> " + Res.inviteLine3;
});
$(window).keypress(e => {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        window.location.href = "game.html";
    }
    _socket.sendJson({
        type: "gameState",
        state: 0,
    });
});

window.req = { Res, _socket, _positions, urlToJoinGame, Sockets };
