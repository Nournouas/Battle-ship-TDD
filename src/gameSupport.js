import { updateArenaUI, setBoardNames } from "./DOM";
import { Player, ComputerPlayer} from "./Player";

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

function visualizeBoard(board) {
    return board
        .map(row =>
        row
            .map(cell => {
            if (cell.ship) {
                return cell.valid ? "S" : "s";
            }
            return cell.valid ? "." : "x";
            })
            .join(" ")
        )
        .join("\n");
}

//this function 
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

function getFullShipCoords(arena, ship, originalCoord){
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]

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
        
    }
    // Update UI
    updateArenaUI(player, `#${player.name}`);
}

export function startGame(player1, player2){
        let player = new Player(player1);
        let computer = new ComputerPlayer(player2);
        setBoardNames(player, computer);

        randomlyPositionShips(player);
        randomlyPositionShips(computer);
        updateArenaUI(player, `#${player1}`);
        updateArenaUI(computer, `#${player2}`);

        return {player1: player, player2: computer}

}

