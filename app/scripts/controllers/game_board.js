'use strict';

angular.module('tickeyApp')
  .controller('GameBoardCtrl', function($scope) {  
  	
    $scope.name = "Tickety";

    $scope.click = function(){
      alert("I've been clicked!");
    };
    
  });

  