// This was developed based on example code provided by Ian in Week 12

let app = require('express')();

let cors = require('cors');
app.use(cors());

let http = require('http').Server(app);
let io = require('socket.io')(http);

 http.listen(3000,()=>console.log('Server listening on port 3000'));

let { combineLatest, fromEvent } = require('rxjs');
let { map, startWith, auditTime } = require('rxjs/operators');

let connected_observables = [];
let main_observable = null;
let client_is_it = [];
let total_players = 0;

fromEvent(io,'connection')
  .subscribe(function(client) {
    
    // Restart the main observable if required
    if(connected_observables.length > 0){
      stopMain();
    }

    // Observe events from this client
    let client_obs = fromEvent(client, 'mouse').pipe(
      map((x)=>JSON.parse(x)),
      startWith([Math.floor(Math.random() * 50) + 1,Math.floor(Math.random() * 50) + 1,''])
    );
    // Add client observable to array
    connected_observables.push(client_obs);
    client_is_it.push(false);
    client_is_it[0] = true; // 1st client is "it"

    let index = connected_observables.indexOf(client_obs);

    fromEvent(client, 'disconnect').subscribe(() => { 
      // Remove disconnected observable from array
      // let index = connected_observables.indexOf(client_obs);
      if (index > -1) {
        connected_observables.splice(index, 1);
        client_is_it.splice(index, 1);
      }
      
      // Restart the main observable
      stopMain();
      if(connected_observables.length > 0){
        startMain();
      }
      console.log('removed a connection - index = ' + index);
    });

    // Start main observable
    startMain();
    console.log('added connection - index = ' + index);

  });

  
function startMain() {
  // Combine latest outputs from all clients; send updates at most every 20ms
  main_observable = combineLatest(connected_observables).pipe(
    auditTime(20)
  ).subscribe((x) => { 
    // console.log(JSON.stringify(x)); // for testing

    for (var i = 0; i < x.length; i++) {
      // console.log('loop 1: client_is_it[' + i + '] = ' + client_is_it[i]); // for testing
      if (client_is_it[i] == true) {
        // console.log('x[i][2] = ' + x[i][2]); // for testing
        ni = Math.floor(Math.random() * 50) + 1;
        mi = Math.floor(Math.random() * 50) + 1;              
        // console.log(ni + ' ' + mi);  
        if (Math.abs(x[i][0] -ni) < 30 && Math.abs(x[i][1] < 30)) {
          x[i][2] = 'ghostwhite';               
        }  
        // console.log('updated x[i][2] = ' + x[i][2]); // for testing
      }
      else {             
        // console.log('test 1');        
        for (var z = 0; z < x.length; z++) {
          // console.log('test 2: z = ' + z + ', client_is_it[z] = ' + client_is_it[z]); // for testing
          if (z != i && client_is_it[z] == true) {
            if (Math.abs(x[i][0] - x[z][0]) < 1 &&  Math.abs(x[i][1] - x[z][1]) < 1) {              
              // Randomly generate a power-up zone for normal players
              // console.log('test power-up. x[i][0] = ' + x[i][0]  + ' x[i][1] = ' + x[i][1]); // for testing
              n = Math.floor(Math.random() * 50) + 1;
              m = Math.floor(Math.random() * 50) + 1;              
              // console.log(n + ' ' + m); // for testing    
              // a normal player won't become "it" if caught while being less than 30 to [n,m] 
              if (Math.abs(x[i][0] - n) > 30 || Math.abs(x[i][1] - m) > 30) {
                // console.log('client_is_it[' + i + '] = ' + client_is_it[i]); // for testing
                console.log('Player ' + i + ' caught.');
                client_is_it[i] = true;                   
              }  

            }
          }
        }
      }        
    }

    var game_end = true;
    for (var i = 0; i < x.length; i++) {      
      // console.log('loop 2: client_is_it[' + i + '] = ' + client_is_it[i]); // for testing
      if (!client_is_it[i]) {
        game_end = false;
      }
    }

    if (game_end) {
      console.log('All players have become "it". Game ends.');
    }

    io.emit('mouse',JSON.stringify(x));
  });
}

function stopMain() {
  main_observable.unsubscribe();
}