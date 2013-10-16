'use strict';

angular.module('tickeyApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
  	$scope.waitingRoom = {};
  	var waitingRoomRef = new Firebase('https://bruno.firebaseio.com/waiting_room');
  	
  	$scope.promise = angularFire(waitingRoomRef, $scope, 'waitingRoom');
  	// $scope.promise.then (function () {
  	// 	$scope.createWaitingRoom();
  	// })
  	//Check to see if a player is there already. If not, create a waiting room. If so, join the existing player.
  	$scope.promise.then (function(){
  		if ($scope.waitingRoom.xJoined == true) {
  			$scope.joinWaitingRoom();
  		} else {
  			$scope.createWaitingRoom();
  		}
  	})

  	$scope.createWaitingRoom = function() {
  		$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
  		$scope.noticeMessage = "You are x, waiting for opponent.";

  		waitingRoomRef.on('child_removed', function(snapshot) {
  			//TODO: Should double check if there is another pair
  			$location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x');
  		});
  	}

  	function generateGameBoardNumber() {
  		return Math.floor(Math.random() * 16777215).toString(16);
  	}

  	$scope.joinWaitingRoom = function() {
  		var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
  		$scope.waitingRoom = {};

  		$location.path('game_board/' + gameBoardNumber + '/o');
  	}


  });

