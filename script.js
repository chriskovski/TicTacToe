

const gameBoard = (() => {
  //Get each of the field divs into an array calles "fields"
  const fields = Array.from(document.getElementsByClassName('field'));
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

  //Start the game via the start button
  const startGame = () => {
    document.getElementById("overlay").style.display = "none";
    playerTurn();
    console.log("Game has been started!");
    console.log("Welcome " + playerX.name + " as Player X!")
    console.log("Welcome " + playerO.name + " as Player O!")
  }
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
      if(winner === true && playerO.turn){
        console.log("Player X wins!");
        playerX.turn = false;
        playerO.turn = false;
      }else if(winner === true && playerX.turn){
        console.log("Player O wins!");
        playerX.turn = false;
        playerO.turn = false;
      }else if(winner === false && rounds === 9){
        console.log("It's a draw")
        playerX.turn = false;
        playerO.turn = false;
      }
    }
  }
  
  const playerTurn = () => {
    
    /*Two functions for player turns get defined:
    - First, a corresponding Symbol gets created and is getting appended to the clicked tile
    - Then the gameboardX (or O) is getting filled with the number of the tile in the index field of the array (it's for a better and easier comparison)
    - Lastly, the player turn switches */

    //Function for the turn of Player X
    function playerTurnX(tile, cell){
      const markerMaker = document.createElement('i');
      markerMaker.classList.add("fa-solid", "fa-x", "fa-10x");
      tile.appendChild(markerMaker);
      
      let index = fields.indexOf(cell);
      gameboardX[index] = index;
      
      playerX.turn = false;
      playerO.turn = true;
    }

    //Function for the turn of Player O
    function PlayerTurnO(tile, cell){
      const markerMaker = document.createElement('i');
      markerMaker.classList.add("fa-solid", "fa-o", "fa-10x");
      tile.appendChild(markerMaker);
      
      let index = fields.indexOf(cell);
      gameboardO[index] = index;

      playerX.turn = true;
      playerO.turn = false;
  }

    //add click event to every field on the gameboard
    fields.forEach(field => {
      field.addEventListener('click', e => {
        let cell = e.target;
        
        //Each time a field on the gameboard is clicked, it creates a blank symbol
        //Depending on the player turn, the blank symbol gets filled with either a 'X' or an 'O', and it gets appended to the clicked field
        
        if(playerX.turn){
          playerTurnX(field, cell);
          checkWin(gameboardX);
          rounds++;
        }else if(playerO.turn){
          PlayerTurnO(field, cell);
          checkWin(gameboardO);
          rounds++;
        }else{
          console.log("Game is Over!");
        }
      }, {once: true});
    })
  }
  
  const resetGame = () => {
    rounds = 1;
    fields.forEach(field => field.innerHTML = '');
    playerX.turn = true;
    playerO.turn = false;
    gameboardX = ['','','','','','','','',''];
    gameboardO = ['','','','','','','','',''];
    document.getElementById("overlay").style.display = "block";
  }
  return {startGame, resetGame}
})();

const gameControlling = (() =>{
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');

  
 
  //Enter your name (Player 1 gets 'X' & Player 2 gets 'O')

  //The players should alternate every round (starting with the 'X' Player)

  //Announce the winner when the winning combination is met

  //It's a draw when the field is full (after 9 rounds)

  //The reset button resets the whole cycle
})();