
// function changeSquareContent(location, className) {
// 	document.getElementById('cell' + location).classList.add(className);
// 	document.getElementById('cell'+ location).innerHTML = className;
// }

// var currentPlayer = "x";

// function makeNextMove(location) {
		
// 		//Player x moves
// 		currentPlayer = "x";
// 		changeSquareContent (location, "x");


// 		//o AI moves
// 		var t=setTimeout( function() {

// 			if (checkWin()!=true) { 
// 				//console.log(currentPlayer);
// 				changeSquareContent(opponentSelectRandomSquare(), "o");
// 				currentPlayer = "o";
// 				checkWin(); 
// 			}	

// 		},1000);		
// }


// function currentSquareClickedAlready(location) {
// 	return document.getElementById('cell' + location).innerHTML !== "";
// }


// function handleClick(location) {
// 	if (!currentSquareClickedAlready(location)) { makeNextMove(location); }
// }


// function sameContent (location1,location2,location3) {
// 	var a = document.getElementById('cell' + (location1)).innerHTML
// 	var b = document.getElementById('cell' + (location2)).innerHTML
// 	var c = document.getElementById('cell' + (location3)).innerHTML
// 	return (a==b && b==c && a!="");
// }


// function checkWin() {
// 	for (var h=1; h<=3; h++) {
// 		if (sameContent(h,h+3,h+6)) {
// 			bootbox.alert(currentPlayer + " won!", clearBoard());
// 			return true;
// 		}
// 	}

// 	for (var h=1; h<=7; h+=3) {
// 		if (sameContent(h,h+1,h+2)) {
// 			bootbox.alert(currentPlayer + " won!", clearBoard());
// 			return true;
// 		}
// 	}

// 	if (sameContent(1,5,9)) {
// 			bootbox.alert(currentPlayer + " won!", clearBoard());
// 			return true;
// 		}

// 	if (sameContent(3,5,7)) {
// 			bootbox.alert(currentPlayer + " won!", clearBoard());
// 			return true;
// 		}
// }


// function clearBoard() {
// 	for (var x=1; x<=9; x++) {
// 		className = document.getElementById('cell' + x).innerHTML;
// 		document.getElementById('cell' + x).innerHTML = "";
// 		if (className != "") { document.getElementById('cell' + x).classList.remove(className); }
// 	}
// }


// function restartGame() {
// 	currentPlayer="x";
// }


// function opponentSelectRandomSquare() {
// 	do {
//   		var randomNumber = Math.floor((Math.random()*9)+1);
//   	} while (currentSquareClickedAlready(randomNumber)==true);

// 	return randomNumber;
// }

angular.module('LocalStorageModule').value('prefix', 'BrunoDatabase');
angular.module("tickeyApp", ['LocalStorageModule', 'firebase'])
  .config(function($routeProvider) {
	$routeProvider
		.when('/game_board', {
			templateUrl: 'views/game_board.html',
			controller: 'GameBoardCtrl'
		})
		
		.when('/how_to', {
			templateUrl: 'views/how_to.html',
			controller: 'HowToCtrl'
		})
		
		.when('/', {
			templateUrl: 'views/empty.html',
			controller: 'MainCtrl'
		})
		
		.when('/match_player', {
		  templateUrl: 'views/match_player.html',
		  controller: 'MatchPlayerCtrl'
		})

		.when('/game_board/:gameId/:mySymbol', {
		  templateUrl: 'views/game_board.html',
		  controller: 'GameBoardCtrl'
		})

		.otherwise({
			redirectTo:'/'
		})
  });



