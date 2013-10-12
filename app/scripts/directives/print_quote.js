'use restrict';

angular.module('tickeyApp')
  .directive("printQuote", function() {
  	return {
  		restrict: 'A', //E or EA depending on element or attribute
  		link: function(scope, element, attrs) {
  			element.bind('click', function(){
  				alert("This Directive Is Working!!");
  			});
  		}
  	}
  })

