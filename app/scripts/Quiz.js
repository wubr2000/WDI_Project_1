


function maximum(numberlist) {
	var i = 0;
	var Largest = numberlist[0];

	for (var i = 0; i <= numberlist.length-1; i++) {
		if (numberlist[i] > Largest) { Largest = numberlist[i]; };
	}

	return Largest;
}

/*
function sorting(numberlist) {

	var new_numberlist = [];

	new_numberlist.splice(0,0,maximum(numberlist));
	numberlist.splice();

	for (var i = 0; i <= numberlist.length - 1; i++) {
		if (new_numberlist[i] > next_largest) { next_largest = numberlist[i]; };	
	}
	
	array.splice(0,0,next_largest);
}
*/

function sortNumber(numberArray) {
  var tempCell;
  var tempArray = numberArray;
  for (var j = 0; j<tempArray.length-1; j++) {
    for (var i = j+1; i<tempArray.length; i++) {
      if (tempArray[j] > tempArray[i]) {
        tempCell = tempArray[i];
        tempArray[i] = tempArray[j]; 
        tempArray[j] = tempCell;
      }
    }
  }
  return tempArray;
}


function FizzBuzz(last_num) {
	
	var Fizzmultiple = 3;
	var Buzzmultiple = 5;

	for (var i = 1; i <= last_num; i++) {

		if (i % (Buzzmultiple*Fizzmultiple) == 0) { console.log("FizzBuzz"); } else { 

			if (i % Fizzmultiple == 0) { console.log("Fizz"); } else { 
				
				if (i % Buzzmultiple == 0) { console.log("Buzz"); } else { console.log(i); };
			};
		}

	}

}



