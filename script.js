const gameBoard = (() => {
  //Get each of the field divs into an array calles "fields"
  const fields = Array.from(document.getElementsByClassName('field'));
  
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const winnerOverlay = document.getElementById('winnerOverlay');
  
  let p = document.createElement("p");
  
  document.getElementById("overlay").style.display = "block";

  //A object constructor making the players
  const Player = (name, marker, ai, turn) => {
    return {name, marker, ai, turn};
  }
  
  //The players are getting constructed
  const playerX = Player('Player 1', 'X', false, true);
  const playerO = Player('Player 2', 'O', false, false);
  
  //A simulated gameboard to fill for Player X and Player O seperately, it's later used to check who wins with the winCombinations Array
  let gameboardX = ['','','','','','','','',''];
  let gameboardO = ['','','','','','','','',''];
  
  //All possible combinations to win the game
  const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
  ]

    /*Two functions for player turns get defined:
    - First, a corresponding Symbol gets created and is getting appended to the clicked tile
    - Then the gameboardX (or O) is getting filled with the number of the tile in the index field of the array (it's for a better and easier comparison)
    - Lastly, the player turn switches */

    //Function for the turn of Player X
      function playerTurnX(tile, cell){
        const markerMaker = document.createElement('i');
        markerMaker.className = "";
        markerMaker.classList.add("fa-solid", "fa-x", "fa-10x");
        tile.appendChild(markerMaker);
        let index = fields.indexOf(cell);
        gameboardX[index] = index;
        checkWin(gameboardX);
        playerX.turn = false;
        playerO.turn = true;
      }

      //Function for the turn of Player O
      function playerTurnO(tile, cell){
        const markerMaker = document.createElement('i');
        markerMaker.className = "";
        markerMaker.classList.add("fa-solid", "fa-o", "fa-10x");
        tile.appendChild(markerMaker);
        let index = fields.indexOf(cell);
        gameboardO[index] = index;
        checkWin(gameboardO);
        playerX.turn = true;
        playerO.turn = false;
      }    
  
  
  const startOfGame = () => {

    //add click event to every field on the gameboard
    fields.forEach(field => {
      field.addEventListener('click', e => {
        let cell = e.target;

        //Each time a field on the gameboard is clicked, it creates a blank symbol
        //Depending on the player turn, the blank symbol gets filled with either a 'X' or an 'O', and it gets appended to the clicked field
        playerX.turn ? playerTurnX(field, cell) : playerTurnO(field, cell);
        rounds === 9 ? rounds++ : rounds++;

      },{once: true})
    });
  }

  //startGame hides the overlay and starts the logic for the gameboard. It also removes the EventListener from itself, so it can be clicked only once (until game resets)
  const startGame = () => { 
    document.getElementById("overlay").style.display = "none";
    
    startOfGame();
    startBtn.removeEventListener('click', startGame);
    startBtn.style.color = "grey";
    startBtn.style["border-color"] = "grey";
    while (winnerOverlay.firstChild) {
      winnerOverlay.removeChild(winnerOverlay.firstChild);
    }
    console.log(gameboardO, gameboardX, fields.childNodes);
  }

  //resetGame resets all the variables, brings up the "Press Start" overlay back again and adds the EventListener back to the start button.
  const resetGame = () => {
    location.reload();
  }

  //resets the Game via the reset Button
  resetBtn.addEventListener('click', resetGame)

  //Start the game via the start button
  startBtn.addEventListener('click', startGame)
  
  //Game starts with the first round
  let rounds = 1;
  
  //This function takes in gameboardX or gameboardO (arrays) as argument and checks for the Winner
  const checkWin = (checkArr) => {
    
    //Iterate through every win combination and check, if in one of the checkArr arrays the winning combination is included
    for (let combos in winCombinations){
      let winner = winCombinations[combos].every(winCombos => {
        return checkArr.includes(winCombos);
      })

      //If there is a checkArr including the winning combination, then stop the game and output the winner, otherwise the game ends in a draw
      if(winner === true && playerX.turn){
        p.innerText = "PLAYER X WINS!";
        winnerOverlay.appendChild(p);
        winnerOverlay.style.display = "block";
        resetBtn.style["z-index"] = 4;
        playerX.turn = false;
        playerO.turn = false;
        console.log(gameboardO, gameboardX, fields)
      }else if(winner === true && playerO.turn){
        p.innerText = "PLAYER O WINS!";
        winnerOverlay.appendChild(p);
        winnerOverlay.style.display = "block";
        resetBtn.style["z-index"] = 4;
        playerX.turn = false;
        playerO.turn = false;
        console.log(gameboardO, gameboardX, fields)
      }else if(winner === false && rounds === 10){
        p.innerText = "IT'S A DRAW!";
        winnerOverlay.appendChild(p);
        winnerOverlay.style.display = "block";
        resetBtn.style["z-index"] = 4;
        playerX.turn = false;
        playerO.turn = false;
        console.log(gameboardO, gameboardX, fields)
      }
    }
  }
})();