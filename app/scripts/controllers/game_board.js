'use strict';

angular.module('tickeyApp')
  .controller('GameBoardCtrl', function ($scope, $routeParams, angularFire) {
    $scope.gameBoardId = $routeParams.gameId;
    $scope.mySymbol = $routeParams.mySymbol;    
    $scope.myTurn = false;
    $scope.won = false;

    var gameBoardRef = new Firebase("https://bruno.firebaseio.com/room/" + $routeParams.gameId);
    $scope.gameBoard = [];
    // $scope.cells = [];
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");

    $scope.promise.then (function () {
      $scope.gameBoard = ["","","","","","","","","",""];
      //$scope.cells = [" "," "," "," "," "," "," "," "," "];
      if ($routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = true;
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = false;
      }
    });
    
    gameBoardRef.on('value', function(snapshot) {
      console.log("wait received");
      if (!$scope.myTurn) {
        
        if (snapshot.val() != null) {
          
          if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
            console.log("diff gameboard");
            
            $scope.gameBoard = snapshot.val();
            
            if ($scope.isLosing()) {
              console.log("is really in isLosing");
              $scope.info = $scope.mySymbol + " lost!";
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              // print draw
              // redirect to match player if play again
            } else {
              $scope.myTurn = true;
            }
          
          } else {
            console.log("same gameboard"); 
          }
        
        } else {
          console.log("snapshot is empty");
        }
      
      } else {
        console.log("it is my turn but I won ");
      }
    });

    $scope.handleClick = function(index) {
      if (!$scope.currentSquareClickedAlready(index)) {

          if ($scope.myTurn) {
            
            $scope.gameBoard[index] = $scope.mySymbol;
            
            if ($scope.isWinning()) {
              $scope.info = $scope.mySymbol + " won!";
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              // print draw
              // redirect to match player if play again
            } else {
              console.log("I'm here");
              $scope.myTurn = false;
            }
          }

      } else {
        $scope.myTurn = true;
      }
    
    }

    $scope.currentSquareClickedAlready = function(location) {
      return $scope.gameBoard[location] !== "";
    }
    
    $scope.isLosing = function() {
      if (!arrays_equal($scope.gameBoard, [])) {return $scope.isWinning();}
      }
    
    $scope.isDraw = function() {
      if (!arrays_equal($scope.gameBoard, [])) {
        //if all squares are taken (i.e. no "" in array)

        //if (!$scope.gameBoard.hasOwnProperty("") && !scope.isWinning()) {return true;}
        
        return false;

      } 
    }    
    
    function arrays_equal(a,b) { return !(a<b || b<a); }


  $scope.sameContent = function(location1,location2,location3) {
   var a = $scope.gameBoard[location1];
   var b = $scope.gameBoard[location2];
   var c = $scope.gameBoard[location3];

   return (a==b && b==c && a!="");
  }

  $scope.isWinning = function() {
   for (var h=1; h<=3; h++) {
     if ($scope.sameContent(h,h+3,h+6)) {
       return true;
     }
   };

   for (var h=1; h<=7; h+=3) {
     if ($scope.sameContent(h,h+1,h+2)) {
       return true;
     }
   };

    if ($scope.sameContent(1,5,9)) {
         return true;
    };

    if ($scope.sameContent(3,5,7)) {
         return true;    
    };

  }

  
  });


  // // .controller('GameBoardCtrl', function($scope, $rootScope, $timeout, localStorageService, angularFire, $routeParams) {  
  	
  // 	var ref = new Firebase('https://bruno.firebaseio.com/');
  // 	var p = angularFire(ref, $scope, "leaderData");

  // 	p.then(function(){
  // 		console.log($scope.leaderData.name);
  // 	})

  // 	$scope.leaderData = {
  // 		name: {
  // 			SeededValue: 1
  // 		}
  // 	};

  // 	//Firebase stuff

  // 	$scope.getName = function() {
  // 		$scope.winnerName = prompt("Enter Player's Name");
  // 	};

  // 	$scope.addToFirebase = function() {
  // 		if ($scope.winnerName) {
  // 			if ($scope.leaderData.name.hasOwnProperty($scope.winnerName)) {
  // 				$scope.leaderData.name[$scope.winnerName]++;
  // 			} else {
  // 			$scope.leaderData.name[$scope.winnerName] = 1;
  // 			}
  // 		}
  // 	}

  // 	$scope.gameBoardId = $routeParams.gameId;
  // 	$scope.mySymbol = $routeParams.mySymbol;
  //   $scope.myTurn = false;

  // 	var gameBoardRef = new Firebase("https://bruno.firebaseio.com/room/" + $routeParams.gameId);

  //   $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard", []);

  //   $scope.promise.then (function () {
  //     $scope.gameBoard = [];
  //     if ($routeParams.mySymbol == 'x') {
  //       console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
  //       $scope.myTurn = true;
  //     } else {
  //       console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
  //       $scope.myTurn = false;
  //     }
  //   });
    
  //    gameBoardRef.on('value', function(snapshot) {
  //     console.log("wait received");
  //     if (!$scope.myTurn) {
  //       if (snapshot.val() != null) {
  //         if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
  //           console.log("diff gameboard");
  //           if ($scope.isLosing()) {
  //             // print losing
  //             // redirect to match player if play again
  //           } else if ($scope.isDraw()) {
  //             // print draw
  //             // redirect to match player if play again
  //           } else {
  //             $scope.myTurn = true;
  //           }
  //         } else {
  //           console.log("same gameboard"); 
  //         }
  //       } else {
  //         console.log("snapshot is empty");
  //       }
  //     } else {
  //       console.log("it is my turn but I receive ");
  //     }
  //   });

  //   $scope.click = function(index) {
  //     if ($scope.myTurn) {
  //       //console.log("here");
  //       $scope.gameBoard[index] = $scope.mySymbol;
      
  //       if ($scope.isWinning()) {
  //         // print winning
  //         // redirect to match player if play again
  //       } else if ($scope.isDraw()) {
  //         // print draw
  //         // redirect to match player if play again
  //       } else {
  //         $scope.myTurn = false;
  //       }
  //     }
  //   }
    
  //   $scope.isLosing = function() {
  //     return false; 
  //   }
    
  //   $scope.isWinning = function() {
  //     return false; 
  //   }
    
  //   $scope.isDraw = function() {
  //     return false; 
  //   }    
    
  //   function arrays_equal(a,b) { return !(a<b || b<a); };


  //   // $scope.opponentMoved = function() {   
  //   //   gameBoardRef.on('child_changed', function(snapshot) {

    //     $scope.cells = snapshot.val();
      
    //     // if ($scope.isLosing()) {
    //     //   // print losing
    //     //   // redirect to match player if play again
        
    //     // } else if ($scope.isDraw()) {
    //     //   // print draw
    //     //   // redirect to match player if play again
        
    //     // } else {
    //     //   //$scope.makeMyMove();
        
    //     // }
    //   });
    // };
    
    
    // $scope.makeMyMove = function() {
    //   $scope.listenForMyClick();
      
    //   // if ($scope.isWinning()) {
    //   //   // print winning
    //   //   // redirect to match player if play again
    //   // } else if ($scope.isDraw()) {
    //   //   // print draw
    //   //   // redirect to match player if play again
    //   // } else {
    //   //   //$scope.waitForOpponentToMove();
    //   // }
    // };

    // $scope.listenForMyClick = function() {
    //   // handle click event on cell 
    // }
    
    // $scope.isLosing = function() {
    //   return false; 
    // }
    
    // $scope.isWinning = function() {
    //   return false; 
    // }
    
    // $scope.isDraw = function() {
    //   return false; 
    // }    



   //  //Local Storage Stuff
  	// localStorageService.add("names",["Computer"]);
  	// //var playerName = prompt("What is your name?");
  	// var playerName = "Bruno";
  	// //var name_list = []; 
  	// $scope.name_list = localStorageService.get("names");
  	// $scope.name_list.push(playerName);
  	// localStorageService.add("names", $scope.name_list);
  	// //console.log($scope.name_list);
 
   //  $scope.name = "Tickety";

   //  $rootScope.is_how_to_page = false;

   //  $scope.currentseconds = 0;
   //  $scope.minutes = "00";
   //  $scope.seconds = "00";
   //  $scope.countup;

   //  $scope.xwin = 0;
   //  $scope.owin = 0;
    

   //  //Timer function
   //  $scope.startTimer = function() {
    	
   //  	$scope.currentseconds++;
   //  	$scope.minutes = $scope.formatZeroPadding(Math.floor($scope.currentseconds / 60));
   //    	$scope.seconds = $scope.formatZeroPadding($scope.currentseconds % 60);
    	
   //  	$scope.countup = $timeout($scope.startTimer, 1000);
   //  };

   //  $scope.stopTimer = function() {
   //  	$timeout.cancel($scope.countup);
   //  }

   //  $scope.formatZeroPadding = function(integer) {
   //    if (integer < 10) {
   //    	return "0" + integer;
   //    } else {
   //    	return integer;
   //    }
   //  }



 // //    //Gameplay logic
	// $scope.currentPlayer = "x";
	// $scope.cells = ["","","","","","","","","",""];

	// $scope.changeSquareContent = function(location, className) {
	// 	$scope.cells[location] = className;
	// 	//console.log(location);
	// }

	// $scope.makeNextMove = function(location) {
	// 		//Player x moves
	// 		$scope.currentPlayer = $routeParams.mySymbol;
 //      console.log("i m in makeNextMove");
 //      console.log(location);
 //      console.log($scope.currentPlayer);
	// 	  $scope.changeSquareContent(location, $scope.currentPlayer);
 //      $scope.gameBoard.board[location] = $scope.currentPlayer;
 //      $scope.opponentMoved();
      
	// 		//Player o AI moves
	// 		//console.log("I came in here");
	// 		// if ($scope.checkWin()!=true) { 
	// 		// 		//console.log("here also");
	// 		// 		$scope.changeSquareContent($scope.opponentSelectRandomSquare(), "o");  
	// 		// 		$scope.currentPlayer = "o";
	// 		// 		$scope.checkWin();
	// 		// 		$scope.checkTie(); 
	// 		// 	}	
	// }

	// // $scope.checkTie = function() {
	// // 	//check whether there has been a tie
	// // }

	// $scope.currentSquareClickedAlready = function(location) {
	// 	return $scope.cells[location] !== "";
	// }

	// $scope.click = function(location) {
 //    if($scope.currentPlayer == $routeParams.mySymbol) {
 //  		if (!$scope.currentSquareClickedAlready(location)) { 
 //  			$scope.makeNextMove(location); 
 //  		}
 //    }
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


  // });

  // 