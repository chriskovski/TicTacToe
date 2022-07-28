const fields = Array.from(document.getElementsByClassName('field'));
/* const playerX = document.getElementsByClassName('fa-x');
const playerO = document.getElementsByClassName('fa-o'); */

let circleTurn = false;

const gameBoard = (() => {

  fields.forEach(field => {
    field.addEventListener('click', handleClick, {once: true})
  })

  function handleClick(e){
    let cell = e.target;
    let cellX = e.target.querySelector('.fa-x');
    let cellO = e.target.querySelector('.fa-o');

    if (!circleTurn){
      cellX.style.visibility = "visible";
      cell.style.cursor = "not-allowed";
      circleTurn = true;
    }else{
      cellO.style.visibility = "visible";
      cell.style.cursor = "not-allowed";
      circleTurn = false;
    }
  }
})();