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


angular.module('tickeyApp')
  .directive("enter", function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            element.bind('mouseenter', function() {
                element.addClass("x");
            });
        }
    };
  })


angular.module('tickeyApp')
  .directive("leave", function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            element.bind('mouseleave', function() {
                element.removeClass("x");
                alert("Did you see the color change? Cool eh?");
            });
        }
    };
  })

  