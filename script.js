const fields = Array.from(document.getElementsByClassName('field'));
const playerX = document.getElementsByClassName('fa-x');
const playerO = document.getElementsByClassName('fa-o');

let circleTurn = false;
let winningCheckerX = [];
let winningCheckerO = [];

const gameBoard = (() => {
  let round = 0;
  
  fields.forEach(field => {
    field.addEventListener('click', handleClick, {once: true})
  })

  /* I overlapped both the X and O in the CSS and turned off the visibility, 
  If you click on the cell, the marker gets visible (depending on which turn) */
  function handleClick(e){
    let cell = e.target;
    let cellX = e.target.querySelector('.fa-x');
    let cellO = e.target.querySelector('.fa-o');

    /* Fill the winningChecker Arrays with the marked spots and compare it later*/
    if (!circleTurn && round < 9){
      winningCheckerX.push(fields.indexOf(cell));
      winningCheckerX.sort();
      
      cellX.style.visibility = "visible";
      cell.style.cursor = "not-allowed";
      
      gameController.winningChecker();
      circleTurn = true;

    }else{

      winningCheckerO.push(fields.indexOf(cell));
      winningCheckerO.sort();

      cellO.style.visibility = "visible";
      cell.style.cursor = "not-allowed";

      gameController.winningChecker();
      circleTurn = false;
    }
  }
})();

const gameController = (() => {

  /* All of the winning combinations in following pattern:[0,1,2] 
                                                          [3,4,5]
                                                          [6,7,8]*/
  const WINNING_COMBINATIONS = [[0,1,2], 
                                [3,4,5], 
                                [6,7,8],
                                [0,4,8],
                                [2,4,6],
                                [0,3,6],
                                [2,5,8],
                                [1,4,7]];

  function winningChecker(winningCheckerO, winningCheckerX, WINNING_COMBINATIONS) {
    for (let comb in WINNING_COMBINATIONS){
      if(comb == winningCheckerO){
        console.log("O wins!")
      }else if(comb == winningCheckerX){
        console.log("X wins!")
      }else{
        console.log("It's a draw!")
      }
    }
  }

  return {winningChecker}
})();

