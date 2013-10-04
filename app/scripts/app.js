
function changeSquareContent(location, className) {
	document.getElementById('cell' + location).classList.add(className);
	document.getElementById('cell'+ location).innerHTML = className;

	isTopHorizontalThreeOccupiedByMe();
}

var currentPlayer = "x";

function makeNextMove(location) {
	if (currentPlayer == "x") {
		currentPlayer = "o";
		changeSquareContent (location, "x");
	} else {
		currentPlayer = "x";
		changeSquareContent(location, "o");
	}

}

function currentSquareClickedAlready(location) {
	return document.getElementById('cell' + location).innerHTML !== "";
}

function handleClick(location) {
	if (!currentSquareClickedAlready(location)) { makeNextMove(location); }
}

function isTopHorizontalThreeOccupiedByMe() {
	//check if top three squares are occupied by x
	var winning = [];

	for (var x=0; x<=2; x++) {
		winning[x] = document.getElementById('cell' + (x+1)).innerHTML;
	}
	
	if (winning[0]==winning[1]&&winning[1]==winning[2]) { alert("You won!"); }
}

