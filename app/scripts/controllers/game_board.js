'use strict';

angular.module('tickeyApp')
  .controller('GameBoardCtrl', function($scope, $rootScope, $timeout, localStorageService) {  
  	
  	localStorageService.add("names",["Computer"]);
  	//var playerName = prompt("What is your name?");
  	var playerName = "Bruno";
  	//var name_list = []; 
  	$scope.name_list = localStorageService.get("names");
  	$scope.name_list.push(playerName);
  	localStorageService.add("names", $scope.name_list);
  	console.log($scope.name_list);
 
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

    //Gameplay logic
	$scope.currentPlayer = "x";

	$scope.cells = ["","","","","","","","","",""];

	$scope.changeSquareContent = function(location, className) {
		$scope.cells[location] = className;
		//console.log(location);
	}

	$scope.makeNextMove = function(location) {
			
			//Player x moves
			$scope.currentPlayer = "x";
			$scope.changeSquareContent(location, "x");
			//Player o AI moves
			if ($scope.checkWin()!=true) { 
					$scope.changeSquareContent($scope.opponentSelectRandomSquare(), "o");  
					$scope.currentPlayer = "o";
					$scope.checkWin();
					$scope.checkTie(); 
				}	
	}

	$scope.checkTie = function() {
		//check whether there has been a tie
	}

	$scope.currentSquareClickedAlready = function(location) {
		return $scope.cells[location] !== "";
	}

	$scope.click = function(location) {
		if (!$scope.currentSquareClickedAlready(location)) { $scope.makeNextMove(location); }
	}

	$scope.sameContent = function(location1,location2,location3) {
		var a = $scope.cells[location1];
		var b = $scope.cells[location2];
		var c = $scope.cells[location3];

		return (a==b && b==c && a!="");
	}

	$scope.updatesLeaderboard = function() {
		($scope.currentPlayer == "x") ? $scope.xwin++ : $scope.owin++;			
	}

	$scope.afterWin = function() {
		$scope.updatesLeaderboard();
		$scope.printWin();
		$scope.restartGame();			
	}	

	$scope.printWin = function() {
		alert($scope.currentPlayer + " won!");
	}

	$scope.checkWin = function() {
		for (var h=1; h<=3; h++) {
			if ($scope.sameContent(h,h+3,h+6)) {
				$scope.afterWin();
				return true;
			}
		};

		for (var h=1; h<=7; h+=3) {
			if ($scope.sameContent(h,h+1,h+2)) {
				$scope.afterWin();
				return true;
			}
		};

		if ($scope.sameContent(1,5,9)) {
				$scope.afterWin();
				return true;
		};

		if ($scope.sameContent(3,5,7)) {
				$scope.afterWin();
				return true;		
		};

	}

	$scope.clearBoard = function() {
		for (var x=1; x<=9; x++) {
			$scope.cells[x] = "";
		}
	}

	$scope.restartGame = function() {
		var restart = confirm("Restart Game?"); 
		if (restart) {$scope.clearBoard();};
	}

	$scope.opponentSelectRandomSquare = function() {
		
		do {
	  		var randomNumber = Math.floor((Math.random()*9)+1);
	  	} while ($scope.currentSquareClickedAlready(randomNumber)==true);
	
		return randomNumber; 
	}


  });

  