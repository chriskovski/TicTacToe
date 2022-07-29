const fields = Array.from(document.getElementsByClassName('field'));
const markerX = document.createElement('i');
const markerO = document.createElement('i');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return {getName, getMarker};
}

const playerX = Player('Chris', 'X');
const playerO = Player('Scoob', 'O');

const gameControlling = (() =>{
  //Start the game via the start button

  const startGame = () => {
    let rounds = 9;
    let circleTurn = false;

    console.log("Game has been started!");

    function markX() {
      markerX;
      markerX.classList.add("fa-solid", "fa-x", "fa-10x");
    }
    
    function markO() {
      markerO;
      markerO.classList.add("fa-solid", "fa-o", "fa-10x");
    }
    fields.forEach(function(field) {
      field.addEventListener('click', handleClick, {once: true})
    })
    
    function handleClick(e){
      let cell = e.target;
      console.log(cell + " has been clicked!");
      if(!circleTurn){
        markX();
        cell.appendChild(markerX);
        circleTurn = true;
      }else{
        markO();
        cell.appendChild(markerO);
        circleTurn = false;
      }
      rounds--;
    }
  }
  return {startGame};
  //Enter your name (Player 1 gets 'X' & Player 2 gets 'O')

  //The players should alternate every round (starting with the 'X' Player)

  //Announce the winner when the winning combination is met

  //It's a draw when the field is full (after 9 rounds)

  //The reset button resets the whole cycle
})();

console.log(markerX, markerO);