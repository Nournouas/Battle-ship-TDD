import { updateArenaUI, setBoardNames } from "./DOM";
import { Player, ComputerPlayer} from "./Player";

//Initialises the two player objects
export function startGame(player1, player2){
        let player = new Player(player1);
        let computer = new ComputerPlayer(player2);
        setBoardNames(player, computer);

        randomlyPositionShips(player);
        randomlyPositionShips(computer);
        updateArenaUI(player);
        updateArenaUI(computer);

        return {player1: player, player2: computer}

}

//checks if the coordinate is within the bound (0 to 9)
function inBounds(x, y){
    return x >= 0 && y >= 0 && x <= 9 && y <= 9;
}

//generates a random coordinate between 0 - 9 for example [1, 2] or [5,3]
function getRandomCoords(){
    let randCoordsX = Math.floor(Math.random() * 10);
    let randCoordsY = Math.floor(Math.random() * 10);
    return [randCoordsX, randCoordsY];
}

//randomly position the ships of a given player
export function randomlyPositionShips(player){
    let numberOfShips = player.ships.length;
    let arena = player.gameBoard.coordinates;

    for (let i = 0 ; i < numberOfShips ; i++){
        let ship = player.ships[i];
        let coordAttempt = getRandomCoords();
        while(!getFullShipCoords(arena, ship, coordAttempt)){
            coordAttempt = getRandomCoords();
        }
        let shipCoordinates = getFullShipCoords(arena, ship, coordAttempt)
        ship.coordinate = shipCoordinates;
        player.gameBoard.placeShip(ship, shipCoordinates);
    }

}

//tries to lay the ships in 4 directions based on a coordinate
// if it cant fit the ship in any direction returns false
function getFullShipCoords(arena, ship, originalCoord){
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]
    shuffleArray(directions);

    for (let [x, y] of directions){
        let shipCoords = [];
        let coord = originalCoord;
        let block = arena[coord[0]][coord[1]];

        for (let i = 0 ; i < ship.length ; i++){
            block = arena[coord[0]][coord[1]];
            let newX = coord[0] + x;
            let newY = coord[1] + y;

            if (block.valid && block.ship === false && inBounds(newX, newY)){
                shipCoords.push(coord);
                coord = [newX , newY];
            }else {
                break;
            }
        }

        if (shipCoords.length === ship.length){
            return shipCoords;
        }
    }

    return false
}

//shuffles an array
function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

//This function waits for a user to click, the block is returned as the resolved promise
//the block is later used to launch the behaviour desired
export function waitForPlayerMove(player){
    return new Promise((resolve) => {
        const board = document.getElementById(player.name);

        const listener = (event) => {
            const block = event.target.closest(".block");
            if (block && board.contains(block)) {
                board.removeEventListener("click", listener);
                resolve(block);
            }
        }

        board.addEventListener("click", listener)
    })
}

//attacks a block on the players board
export function attackBlock(blockUI, player) {
    const playerBoard = player.gameBoard;
    
    // Parse coordinates from block ID
    const [x, y] = blockUI
        .getAttribute("id")
        .split(",")
        .map(item => parseInt(item, 10));

    // Perform attack
    playerBoard.receiveAttack([x, y]);
    
    if (playerBoard.coordinates[x][y].ship.sunk === true){
        let shipCoords = playerBoard.coordinates[x][y].ship.coordinate;

        for (let [sx, sy] of shipCoords){
            let blockId = `${sx},${sy}`;
            let block = document.querySelector(`#${CSS.escape(player.name)} > #${CSS.escape(blockId)}`);
            block.classList.add("destroyed");
        }
        destroyAroundSunk(playerBoard, playerBoard.coordinates[x][y].ship.coordinate, player)
        
    }
    // Update UI
    updateArenaUI(player);
}

//the main game loop
export async function gameLoop(players){
    let mainPlayer = players.player1;
    let opponent = players.player2;
    let turn = mainPlayer;

    while (mainPlayer.ships.length > 0 && opponent.ships.length > 0){

        if (turn === players.player1){
            let block = await waitForPlayerMove(opponent);
            attackBlock(block, opponent);
            turn = opponent;

        }else if (turn === players.player2){
            let block = await waitForPlayerMove(mainPlayer);
            attackBlock(block, mainPlayer);
            turn = mainPlayer;
        }


        if (mainPlayer.ships.length === 0){
            console.alert(opponent.name + " wins!")
        }else if (opponent.ships.length === 0){
            console.alert(mainPlayer.name + " wins!")
        }

    }
}




//destroys blocks around a sunken ship
function destroyAroundSunk(playerBoard, shipCoords, player){
    for (let [x, y] of shipCoords){
        playerBoard.destroyAroundCoord([x, y]);
    }
    updateArenaUI(player)
}



