'use strict';

angular.module('tickeyApp')
  .controller('GameBoardCtrl', function($scope, $rootScope, $timeout) {  
  	
    $scope.name = "Tickety";

    /*
    $scope.click = function(){
      alert("I've been clicked!");
    };
    */

    $rootScope.is_how_to_page = false;

    $scope.currentseconds = 0;
    $scope.minutes = "00";
    $scope.seconds = "00";
    $scope.countup;
    
    $scope.startTimer = function() {
    	
    	$scope.currentseconds++;
    	$scope.minutes = $scope.formatZeroPadding(Math.floor($scope.currentseconds / 60));
      	$scope.seconds = $scope.formatZeroPadding($scope.currentseconds % 60);
    	
    	$scope.countup = $timeout($scope.startTimer,1000);

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




	$scope.currentPlayer = "x";

	$scope.changeSquareContent = function(location, className) {
		console.log(document.getElementById('cell' + location));
		document.getElementById('cell' + location).classList.add(className);
		document.getElementById('cell'+ location).innerHTML = className;
	}

	$scope.makeNextMove = function(location) {
			
			//Player x moves
			$scope.currentPlayer = "x";
			$scope.changeSquareContent(location, "x");


			//o AI moves
			var t=setTimeout( function() {

				if ($scope.checkWin()!=true) { 
					//console.log($scope.currentPlayer);
					$scope.changeSquareContent($scope.opponentSelectRandomSquare, "o");
					$scope.currentPlayer = "o";
					$scope.checkWin(); 
				}	

			},1000);		
	}

	$scope.currentSquareClickedAlready = function(location) {
		return document.getElementById('cell' + location).innerHTML !== "";
	}


	$scope.click = function(location) {
		if (!$scope.currentSquareClickedAlready(location)) { $scope.makeNextMove(location); }
	}


	$scope.sameContent = function(location1,location2,location3) {
		var a = document.getElementById('cell' + (location1)).innerHTML
		var b = document.getElementById('cell' + (location2)).innerHTML
		var c = document.getElementById('cell' + (location3)).innerHTML
		return (a==b && b==c && a!="");
	}


	$scope.checkWin = function() {
		for (var h=1; h<=3; h++) {
			if ($scope.sameContent(h,h+3,h+6)) {
				bootbox.alert($scope.currentPlayer + " won!", $scope.clearBoard);
				return true;
			}
		}

		for (var h=1; h<=7; h+=3) {
			if ($scope.sameContent(h,h+1,h+2)) {
				bootbox.alert($scope.currentPlayer + " won!", $scope.clearBoard);
				return true;
			}
		}

		if ($scope.sameContent(1,5,9)) {
				bootbox.alert($scope.currentPlayer + " won!", $scope.clearBoard);
				return true;
			}

		if ($scope.sameContent(3,5,7)) {
				bootbox.alert($scope.currentPlayer + " won!", $scope.clearBoard);
				return true;
			}
	}


	$scope.clearBoard = function() {
		for (var x=1; x<=9; x++) {
			className = document.getElementById('cell' + x).innerHTML;
			document.getElementById('cell' + x).innerHTML = "";
			if (className != "") { document.getElementById('cell' + x).classList.remove(className); }
		}
	}


	$scope.restartGame = function() {
		currentPlayer="x";
	}


	$scope.opponentSelectRandomSquare = function() {
		do {
	  		var randomNumber = Math.floor((Math.random()*9)+1);
	  	} while ($scope.currentSquareClickedAlready(randomNumber)==true);

		return randomNumber;
	}




  });

  