var symbolIndex;
var buttons=[];
var symbols = ['X','O']
var players = [];

for (var i = 0 , j=1; i < 9; i++ , j++) {
   buttons[i] = document.getElementById('pos-'+j);
}

document.querySelector('.btn-start').addEventListener('click',start);
document.querySelector('.btn-new').addEventListener('click',start);

function start(){
      var player1 = document.querySelector("input[name='player-1']").value;
      var player2 = document.querySelector("input[name='player-2']").value ;
      players.push(player1);
      players.push(player2);
      document.querySelector('#player-1').textContent = "Player1 Name : " +player1;
      document.querySelector('#player-2').textContent = "Player2 Name : " +player2;
      document.querySelector('#initial-page').classList.toggle("hidden");
      document.querySelector('#original-game').classList.toggle("hidden")
      init();
}

function init() {
  document.querySelector('.winner').textContent = '';
  buttons.map(function(element){
    element.textContent = '';
    element.addEventListener('click',generateSymbol);
  });
}

function generateSymbol(e) {
   symbolIndex===0 ? symbolIndex=1 : symbolIndex=0;
   e.srcElement.textContent = symbols[symbolIndex];
   e.srcElement.removeEventListener('click',generateSymbol);
   checkWinning(symbolIndex);
}

function checkWinning(symbolIndex) {
  var symbol = symbols[symbolIndex];
  for (var i=0 ,j=1 ; i < buttons.length; i++ ,j++) {
    //conditions for winner
    var posibilitiesOfWin = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]]
    if (checkWinningConditions(buttons , symbol ,posibilitiesOfWin))
      {
        document.querySelector('.winner').textContent = "Player: "+ players[symbolIndex]+"("+symbol+") is WINNER !";
        removeEventListener();
        return ;
    }else if (!posibility()) {
      document.querySelector('.winner').textContent = " X - O DRAW !";
      removeEventListener();
    }else return ;
  }
}

function checkWinningConditions(buttons,symbol,posibilitiesOfWin) {
  for (var i = 0; i < posibilitiesOfWin.length; i++) {
    if(checkCondition(buttons , symbol ,posibilitiesOfWin[i])) return true;
  }
  return false;
}

function checkCondition(array , symbol , positions) {
  for (var i = 0; i < positions.length; i++)
    if (!(array[positions[i]].textContent === symbol))
      return false;
  return true;
}

function removeEventListener() {
  buttons.map(function(listeners) {
    listeners.removeEventListener('click',generateSymbol);
  });
}

function posibility() {
  for (var i = 0; i < buttons.length; i++)
    if(buttons[i].textContent == '' ) return true;
  return false;
}
