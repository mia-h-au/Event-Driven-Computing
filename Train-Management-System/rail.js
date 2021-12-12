var N = 1; // used in train name TrainN
var trains = []; // array of train objects
// boolean to check whether a track section is empty or occupied
var sectionOccupied = new Array(13).fill(false); // ref: https://stackoverflow.com/questions/9848662/javascript-how-to-define-an-array-of-booleans-with-60-elements-in-it

function Train(TrainN, dir, blkSec) {
    this.name = TrainN;
    this.direction = dir;
    this.blockSection = blkSec;
}

function newTrainEast1() {
	// if section 1 is empty
	if (sectionOccupied[0] == false) {
		var nTrain = new Train("Train"+N, "East", 1);
		sectionOccupied[0] = true;
		N += 1;
		trains.push(nTrain);
		updateYard(trains);
		// console.log(nTrain.name, nTrain.direction, nTrain.blockSection); // test
	}
}

function newTrainEast4() {
	// if section 4 is empty
	if (sectionOccupied[3] == false) {
		var nTrain = new Train("Train"+N, "East", 4);
		sectionOccupied[3] = true;
		N += 1;
		trains.push(nTrain);
		updateYard(trains);
	}
}

function newTrainWest8() {
	// if section 8 is empty
	if (sectionOccupied[7] == false) {
		var nTrain = new Train("Train"+N, "West", 8);
		sectionOccupied[7] = true;
		N += 1;
		trains.push(nTrain);
		updateYard(trains);
	}
}

var index; // index of train in trains array

// move East train from section 1
function frSec1(section) {
	// go to section 2 if it's empty
	if (sectionOccupied[1] == false) {
		trains[index].blockSection = 2;
		// transition t1 in Petri-net diagram
		sectionOccupied[1] = true;
		sectionOccupied[section - 1] = false;						
	}
	// else go to section 6 if it's empty
	else if (sectionOccupied[5] == false) {
		trains[index].blockSection = 6;
		// transition t3 in Petri-net diagram	
		sectionOccupied[5] = true;	
		sectionOccupied[section - 1] = false;
	}
	// else go to section 11 if it's empty
	else if (sectionOccupied[10] == false) {
		trains[index].blockSection = 11;
		// transition t5 in Petri-net diagram
		sectionOccupied[10] = true;		
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move East train from section 2 or 6 or 11
function frSec2or6or11(section) {
	// go to section 3 if it's empty
	if (sectionOccupied[2] == false) {
		trains[index].blockSection = 3;
		// transition t2 or t4 or t6 in Petri-net diagram
		sectionOccupied[2] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move East train from section 4
function frSec4(section) {
	// go to section 5 if it's empty
	if (sectionOccupied[4] == false) {
		trains[index].blockSection = 5;
		// transition t7 in Petri-net diagram
		sectionOccupied[4] = true;
		sectionOccupied[section - 1] = false;
	}
	// else go to section 10 if it's empty
	else if (sectionOccupied[9] == false) {
		trains[index].blockSection = 10;
		// transition t10 in Petri-net diagram
		sectionOccupied[9] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move East train from section 5
function frSec5(section) {
	// go to section 6 if it's empty
	if (sectionOccupied[5] == false) {
		trains[index].blockSection = 6;
		// transition t8 in Petri-net diagram
		sectionOccupied[5] = true;
		sectionOccupied[section - 1] = false;
	}
	// else go to section 11 if it's empty
	else if (sectionOccupied[10] == false) {
		trains[index].blockSection = 11;
		// transition t9 in Petri-net diagram
		sectionOccupied[10] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move East train from section 10
function frSec10(section) {
	// go to section 11 if it's empty
	if (sectionOccupied[10] == false) {
		trains[index].blockSection = 11;
		// transition t9 in Petri-net diagram
		sectionOccupied[10] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 8
function frWSec8(section) {
	// go to section 12 if it's empty
	if (sectionOccupied[11] == false) {
		trains[index].blockSection = 12;
		// transition t12 in Petri-net diagram
		sectionOccupied[11] = true;
		sectionOccupied[section - 1] = false;
	}
	// else go to section 7 if it's empty
	else if (sectionOccupied[6] == false) {
		trains[index].blockSection = 7;
		// transition t20 in Petri-net diagram
		sectionOccupied[6] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 12
function frWSec12(section) {
	// go to section 13 if it's empty
	if (sectionOccupied[12] == false) {
		trains[index].blockSection = 13;
		// transition t13 in Petri-net diagram
		sectionOccupied[12] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 7
function frWSec7(section) {
	// go to section 6 if it's empty
	if (sectionOccupied[5] == false) {
		trains[index].blockSection = 6;
		// transition t22 in Petri-net diagram
		sectionOccupied[5] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 13
function frWSec13(section) {
	// go to section 10 if it's empty
	if (sectionOccupied[9] == false) {
		trains[index].blockSection = 10;
		// transition t14 in Petri-net diagram
		sectionOccupied[9] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 6
function frWSec6(section) {
	// go to section 5 if it's empty
	if (sectionOccupied[4] == false) {
		trains[index].blockSection = 5;
		// transition t23 in Petri-net diagram
		sectionOccupied[4] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 10
function frWSec10(section) {
	// go to section 9 if it's empty
	if (sectionOccupied[8] == false) {
		trains[index].blockSection = 9;
		// transition t15 in Petri-net diagram
		sectionOccupied[8] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

// move West train from section 5
function frWSec5(section) {
	// go to section 9 if it's empty
	if (sectionOccupied[8] == false) {
		trains[index].blockSection = 9;
		// transition t18 in Petri-net diagram
		sectionOccupied[8] = true;
		sectionOccupied[section - 1] = false;
	}
	// else not allowed to move
}

function trainMove(train) {
	index = trains.findIndex(item => item.name == train.name); 

	// handle East travelling trains
	if (trains[index].direction == "East") {		
		// from 1 can go to 2 or 6 or 11
		if (trains[index].blockSection == 1) {
			frSec1(trains[index].blockSection);
		}
		// from 2 or 6 or 11 can only go to 3
		else if (trains[index].blockSection == 2 || trains[index].blockSection == 6 || trains[index].blockSection == 11) {
			frSec2or6or11(trains[index].blockSection);
		} 
		// from 3 then exit
		else if (trains[index].blockSection == 3) {
			// delete trains from trains array
			trains.splice(index, 1);
			sectionOccupied[2] = false;
		} 	
		// from 4 can go to 5 or 10
		else if (trains[index].blockSection == 4) {
			frSec4(trains[index].blockSection);
		}	
		// from 5 can go to 6 or 11
		else if (trains[index].blockSection == 5) {
			frSec5(trains[index].blockSection);
		}	
		// from 10 can go to 11
		else if (trains[index].blockSection == 10) {
			frSec10(trains[index].blockSection);
		}	
	}

	// handle West travelling trains
	else if (trains[index].direction == "West") {
		// from 8 can go to 12 or 7
		if (trains[index].blockSection == 8) {
			frWSec8(trains[index].blockSection);
		}	
		// from 12 can go to 13
		else if (trains[index].blockSection == 12) {
			frWSec12(trains[index].blockSection);
		}		
		// from 7 can go to 6
		else if (trains[index].blockSection == 7) {
			frWSec7(trains[index].blockSection);
		}
		// from 13 can go to 10
		else if (trains[index].blockSection == 13) {
			frWSec13(trains[index].blockSection);
		}	
		// from 6 can go to 5
		else if (trains[index].blockSection == 6) {
			frWSec6(trains[index].blockSection);
		}	
		// from 10 can go to 9
		else if (trains[index].blockSection == 10) {
			frWSec10(trains[index].blockSection);
		}
		// from 5 can go to 9
		else if (trains[index].blockSection == 5) {
			frWSec5(trains[index].blockSection);
		}		
		// from 9 then exit
		else if (trains[index].blockSection == 9) {
			// delete trains from trains array
			trains.splice(index, 1);
			sectionOccupied[8] = false;
		} 
	}
	
	updateYard(trains);
}