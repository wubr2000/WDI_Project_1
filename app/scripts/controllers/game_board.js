'use strict';

angular.module('tickeyApp')
  .controller('GameBoardCtrl', function($scope, $rootScope, $timeout, localStorageService, angularFire, $routeParams) {  
  	
  	var ref = new Firebase('https://bruno.firebaseio.com/');
  	var p = angularFire(ref, $scope, "leaderData");

  	// p.then(function(){
  	// 	console.log($scope.leaderData.name);
  	// })

  	// $scope.leaderData = {
  	// 	name: {
  	// 		SeededValue: 1
  	// 	}
  	// };

  	//Firebase stuff

  	$scope.getName = function() {
  		$scope.winnerName = prompt("Enter Player's Name");
  	};

  	$scope.addToFirebase = function() {
  		if ($scope.winnerName) {
  			if ($scope.leaderData.name.hasOwnProperty($scope.winnerName)) {
  				$scope.leaderData.name[$scope.winnerName]++;
  			} else {
  			$scope.leaderData.name[$scope.winnerName] = 1;
  			}
  		}
  	}

  	$scope.gameBoardId = $routeParams.gameId;
  	$scope.mySymbol = $routeParams.mySymbol;

  	$scope.gameBoard = [];
  	console.log($routeParams.gameId);
  	var gameBoardRef = new Firebase("https://bruno.firebaseio.com/room/" + $routeParams.gameId);

    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");

    $scope.promise.then (function () {
      if ($scope.gameBoard.length == 0 && $routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.makeMyMove();
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        $scope.waitForOpponentToMove();
      }
    });
    
    $scope.waitForOpponentToMove = function() {
      gameBoardRef.once('child_added', function(snapshot) {
        // gameBoardRef.off('child_added');
        
        if ($scope.isLosing()) {
          // print losing
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          // print draw
          // redirect to match player if play again
        } else {
          $scope.makeMyMove();
        }
      });
    };
    
    
    $scope.makeMyMove = function() {
      $scope.listenForMyClick();
      
      if ($scope.isWinning()) {
        // print winning
        // redirect to match player if play again
      } else if ($scope.isDraw()) {
        // print draw
        // redirect to match player if play again
      } else {
        $scope.waitForOpponentToMove();
      }
    };


    $scope.listenForMyClick = function() {
      // handle click event on cell 
    }
    
    $scope.isLosing = function() {
      return false; 
    }
    
    $scope.isWinning = function() {
      return false; 
    }
    
    $scope.isDraw = function() {
      return false; 
    }    



    //Local Storage Stuff
  	localStorageService.add("names",["Computer"]);
  	//var playerName = prompt("What is your name?");
  	var playerName = "Bruno";
  	//var name_list = []; 
  	$scope.name_list = localStorageService.get("names");
  	$scope.name_list.push(playerName);
  	localStorageService.add("names", $scope.name_list);
  	//console.log($scope.name_list);
 
    $scope.name = "Tickety";

    $rootScope.is_how_to_page = false;

    $scope.currentseconds = 0;
    $scope.minutes = "00";
    $scope.seconds = "00";
    $scope.countup;

    $scope.xwin = 0;
    $scope.owin = 0;
    

    //Timer function
    $scope.startTimer = function() {
    	
    	$scope.currentseconds++;
    	$scope.minutes = $scope.formatZeroPadding(Math.floor($scope.currentseconds / 60));
      	$scope.seconds = $scope.formatZeroPadding($scope.currentseconds % 60);
    	
    	$scope.countup = $timeout($scope.startTimer, 1000);
    };

    $scope.stopTimer = function() {
    	$timeout.cancel($scope.countup);
    }

    $scope.formatZeroPadding = function(integer) {
      if (integer < 10) {
      	return "0" + integer;
      } else {
      	return integer;
      }
    }



 //    //Gameplay logic
	// $scope.currentPlayer = "x";
	// $scope.cells = ["","","","","","","","","",""];

	// $scope.changeSquareContent = function(location, className) {
	// 	$scope.cells[location] = className;
	// 	//console.log(location);
	// }

	// $scope.makeNextMove = function(location) {
	// 		//Player x moves
	// 		$scope.currentPlayer = "x";
	// 		$scope.changeSquareContent(location, "x");
	// 		//Player o AI moves
	// 		//console.log("I came in here");
	// 		if ($scope.checkWin()!=true) { 
	// 				//console.log("here also");
	// 				$scope.changeSquareContent($scope.opponentSelectRandomSquare(), "o");  
	// 				$scope.currentPlayer = "o";
	// 				$scope.checkWin();
	// 				$scope.checkTie(); 
	// 			}	
	// }

	// $scope.checkTie = function() {
	// 	//check whether there has been a tie
	// }

	// $scope.currentSquareClickedAlready = function(location) {
	// 	return $scope.cells[location] !== "";
	// }

	// $scope.click = function(location) {

	// 	if (!$scope.currentSquareClickedAlready(location)) { 
	// 		$scope.makeNextMove(location); 
	// 	}
	// }

	// $scope.sameContent = function(location1,location2,location3) {
	// 	var a = $scope.cells[location1];
	// 	var b = $scope.cells[location2];
	// 	var c = $scope.cells[location3];

	// 	return (a==b && b==c && a!="");
	// }

	// $scope.updatesLeaderboard = function() {
	// 	($scope.currentPlayer == "x") ? $scope.xwin++ : $scope.owin++;			
	// }

	// $scope.afterWin = function() {
	// 	$scope.updatesLeaderboard();
	// 	$scope.printWin();
	// 	$scope.restartGame();			
	// }	

	// $scope.printWin = function() {
	// 	alert($scope.currentPlayer + " won!");
	// }

	// $scope.checkWin = function() {
	// 	for (var h=1; h<=3; h++) {
	// 		if ($scope.sameContent(h,h+3,h+6)) {
	// 			$scope.afterWin();
	// 			return true;
	// 		}
	// 	};

	// 	for (var h=1; h<=7; h+=3) {
	// 		if ($scope.sameContent(h,h+1,h+2)) {
	// 			$scope.afterWin();
	// 			return true;
	// 		}
	// 	};

	// 	if ($scope.sameContent(1,5,9)) {
	// 			$scope.afterWin();
	// 			return true;
	// 	};

	// 	if ($scope.sameContent(3,5,7)) {
	// 			$scope.afterWin();
	// 			return true;		
	// 	};

	// }

	// $scope.clearBoard = function() {
	// 	for (var x=1; x<=9; x++) {
	// 		$scope.cells[x] = "";
	// 	}
	// }

	// $scope.restartGame = function() {
	// 	var restart = confirm("Restart Game?"); 
	// 	if (restart) {$scope.clearBoard();};
	// }

	// $scope.opponentSelectRandomSquare = function() {
		
	// 	do {
	//   		var randomNumber = Math.floor((Math.random()*9)+1);
	//   	} while ($scope.currentSquareClickedAlready(randomNumber)==true);
	
	// 	return randomNumber; 
	// }


  });

  