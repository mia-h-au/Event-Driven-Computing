Tag game (https://en.wikipedia.org/wiki/Tag_(game)) on localhost developed using JavaScript, NodeJS and RxJS; and was tested on a Windows laptop with NodeJS installed.

To launch the game, cd to this folder.

In Command Prompt: npm start

Open this folder, click client.html to connect a client. Every time client.html is clicked, a new client will be connected.
A new browser tab will be opened.
Type a colour you like for your dot then click "Click", otherwise the dot will be hotpink (default colour).
Move your mouse to move the dot.
Close the browser tab to disconnect client.

Rules of this game:
_ The 1st client connected is "it".
_ The client(s) connected after "it" will be normal player(s).
_ Normal player(s) caught by "it" will become "it", and "it" will still remain "it".
_ The game will end when all players have become "it".
_ There are power-up zones randomly generated during the game. 
- If an "it" is in that zone, "it" will become invisible for 20ms.
- If a normal player is in that zone, within 20ms, that player won't be "it" even if being caught by "it".
