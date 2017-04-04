# Next-gen team-building software

This game was developed for employee performance competition, and is designed for 1024 x 768 projector screen.

Currently the game is in Russian, I have no idea why I write this in English. There are also some inside jokes, contact me if you'd like to translate it / make it less specific.

The game is hosted on Github Pages / GoMix, but is really supposed to be run on a local node.js server (you don't want someone from another part of the world to wrestle your tank's controls away from you, do you?).

Suggested workflow:

- *Pre-requisite:* Have a Wi-Fi network (Internet access not required, but certain phones behave strangely in such networks).
- *Pre-requisite:* Have noje.js server in this network. Host the game's messaging server there.
- *Pre-requisite:* Have a web server running the game in this network. It is not necessary to have it on the same machine as messaging server, but you'll need to edit address inside the game. Players and game operator will connect here. Game operator can also be on the same machine.  
  It helps to use custom DNS with a short URL, but again, some phones *will* choke on that. Safest is to just let people connect via IP.
- *Pre-requisite:* Edit `lobby.html` to show connection instructions from previous steps.
- Display `lobby.html` on the projector. Tell the audience they will participate in a team-building contest, where each team will have to complete a "project" by performing simple tasks together. Invite people to connect to game server (`index.html` is player's control panel) and choose teams and positions. Observe people joining on projector screen.
- After enough people join (it is OK if not all teams are full, even one person can manage a team), switch to `game.html`. Hitting `Space` on `lobby.html` performs a redirect.
- After initial period of confusion an off-screen operator can click "Start game" button in the bottom of `lobby.html`. This enables button icons on players' control pages, letting everyone know what they are actually doing. (Probably this shouldn't be done from the get go, as the confusion is fun.)
- The first objective for teams is to leave their garages. Announcers should shout and generally behave like sports announcers.
- After teams learn the ropes, announce a death match between the three tanks. Killed tanks respawn, so in case of super effective teams game may be played until certain score.
- After some time an operator on the computer that is projecting the game takes control of the Boss Bug tank that is hidden below the screen (WSAD to move, JIL to shoot). Boss Bug has 9 HP like other tanks, but has a much faster auto-firing turret, so the operator should probably keep back not to wipe out everyone easily. Everyone's goal, naturally, becomes to team up and defeat the Boss Bug.
- Happy end.

How to run the messaging server:

`npm install`  
`node server.js`

Port and interface for a server can be configured with environment variables `IFACE` and `PORT`.  
By default, the server is run on port `80` with an unspecified address (`0.0.0.0`). This should mean listening on all interfaces, but it was observed that when a requested port is occupied on one of the interfaces, Node silently opens only on `127.0.0.1`. Configure an explicit interface to be sure.