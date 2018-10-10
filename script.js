const CORRECT = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 X";
var mapLock = false;

$(document).ready(function(){
    
    // **
    // MOVE functions
    // **
	function moveDown() {
		var canDown = $(".empty").parent().index() > 0; // Check if can move DOWN (empty cell's line is not at the top)
		if(canDown) {
			var index = $(".empty").index();            // Determine index of SPACE
			var donor = $(".empty").parent().prev().children().eq(index);   // Determine DOWN-element
			var donorDigit = donor.html();              // Get DOWN-element's number'
			$(".empty").html(donorDigit);               // ===
			$(".empty").removeClass("empty");           // +++
			donor.addClass("empty");                    // +++
			donor.html("");                             // === simple swap
		}
	}
	function moveUp() {
		var canUp = $(".empty").parent().index() < $(".field").children().length-1; // Check if can move UP (empty cell's line is not at the bottom)
		if(canUp) {
			var index = $(".empty").index();            // Determine index of SPACE
			var donor = $(".empty").parent().next().children().eq(index);   // Determine UP-element
			var donorDigit = donor.html();              // Get UP-element's number'
			$(".empty").html(donorDigit);               // ===
			$(".empty").removeClass("empty");           // +++
			donor.addClass("empty");                    // +++
			donor.html("");                             // === simple swap
		}
	}
	function moveLeft() {
		var canLeft = $(".empty").index() < $(".empty").parent().children().length-1;          // Check if can move LEFT (empty cell is at the left side)
		if(canLeft) {
			var index = $(".empty").index();
			var donor = $(".empty").next();             // Determine next element
			var donorDigit = donor.html();              // Get LEFT-element's number'
			$(".empty").html(donorDigit);               // ===
			$(".empty").removeClass("empty");           // +++
			donor.addClass("empty");                    // +++
			donor.html("");                             // === simple swap
		}
	}
	function moveRight() {
		var canRight = $(".empty").index() > 0;  // Check if can move RIGHT (empty cell is at the right side)
		if(canRight) {
			var index = $(".empty").index();
			var donor = $(".empty").prev();             // Determine next element
			var donorDigit = donor.html();              // Get RIGHT-element's number'
			$(".empty").html(donorDigit);               // ===
			$(".empty").removeClass("empty");           // +++
			donor.addClass("empty");                    // +++
			donor.html("");                             // === simple swap
		}
	}
	
    // **
    // CHECK functions
    // **
	function checkField() {        //check if solved
		var sol = "";
		$(".cell").each(function(){
			var cur = $.trim($(this).text());
            sol += cur == '' ? 'X ' : cur+' ';
		});
        sol = $.trim(sol);
        return sol == CORRECT;
	}
    function winnerDinner() {       // alerts if solved
        $(".status-sign").text("You win!");
        $(".status-sign").addClass("winner-dinner");
        mapLock = true;
        $(".check-button").prop("disabled", true);
    }
    function notYet() {             // alerts if not solved
        $(".status-sign").removeClass("winner-dinner");
    }
    
    function checkWin() {
        var answer = checkField();          // TRUE if solved
        if(answer) {
            winnerDinner();
        } else {
            notYet();
        }
    }
    
    
    // **
    // SHUFFLE function
    // **
    function shuffle() {
        var shuffleQueue = [];
        const MIN = 350;         // number of shuffles, minimum
        const MAX = 1000;        // number of shuffles, maximum
        var steps = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        for(var i=0; i<steps; i++) {
            var direction = Math.floor(Math.random() * 4);
            switch(direction) {
                case 0:
                    shuffleQueue.push("l");
                    moveLeft();
                    break;
                    
                case 1:
                    shuffleQueue.push("u");
                    moveUp();
                    break;
                
                case 2:
                    shuffleQueue.push("r");
                    moveRight();
                    break;
                
                case 3:
                    shuffleQueue.push("d");
                    moveDown();
                    break;
                
                default:
                    break;
            }
        }
        mapLock = false;
        $(".check-button").prop("disabled", false);
        console.log("Shuffled "+steps+" times");
    }
    
    
 
	
	
	$("body").keydown(function(e){
        if(!mapLock) {
            switch(e.which) {
    			case 37:     //left arrow
    				moveLeft();
                    checkWin();
    				break;
    			case 38:     // up arrow
    				moveUp();
                    checkWin();
    				break;
    			case 39:     // right arrow
    				moveRight();
    				break;
    			case 40:     // down arrow
    				moveDown();
    				break;
    		}
        }
	});
    
    $(".check-button").click(function(){
        checkWin();
    });
    
    $(".shuffle-button").click(function(){
        shuffle();
    });
    
    shuffle();
});