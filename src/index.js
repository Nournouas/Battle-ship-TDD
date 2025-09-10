import "./styles.css";
import "./cssReset.css"
import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";
import { ComputerPlayer, Player } from "./Player";
import { createHeader, createArena, createControls } from "./DOM";


//(function (){  
    initUI();
    let players = initGame();
    let turn = players.player1;
    addBlockEventListener(players.player1)
    addBlockEventListener(players.player2)

    while (players.player1.ships > 0 && players.player2.ships > 0){
        
    }

    function addBlockEventListener(player) {
        const board = document.getElementById(player.name);
        if (!board) return;

        board.addEventListener("click", (event) => {
            const block = event.target.closest(".block"); 
            if (block && board.contains(block)) {
                attackBlock(block, board, player);
            }
        });
    }

    function attackBlock(blockUI, boardUI, player) {
        const playerBoard = player.gameBoard;
        
        // Parse coordinates from block ID
        const [x, y] = blockUI
            .getAttribute("id")
            .split(",")
            .map(item => parseInt(item, 10));

        // Perform attack
        playerBoard.receiveAttack([x, y]);

        if (playerBoard.coordinates[x][y].ship.sunk === true){
            console.log(playerBoard.coordinates[x][y].ship.coordinate);
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


    function initUI(){
        const header = createHeader();
        const arena = createArena();
        arena.classList.add("hidden")
        const controls = createControls();

        document.body.appendChild(header);
        document.body.appendChild(arena);
        document.body.appendChild(controls);

        const playBtn = document.querySelector(".play-button");
        playBtn.addEventListener("click",() => buttonEventListener());
    }

    function buttonEventListener(){
        const arena = document.querySelector(".arena-div");
        arena.classList.remove("hidden");
    }

    export function initGame(){
        let player = new Player("player");
        let computer = new ComputerPlayer("computer");
        setBoardNames(player, computer);

        randomlyPositionShips(player);
        randomlyPositionShips(computer);
        updateArenaUI(player, "#player");
        updateArenaUI(computer, "#computer");

        return {player1: player, player2: computer}

    }

    function setBoardNames(player1, player2){
        let arenas = document.querySelectorAll(".battleground-div");
        arenas[0].setAttribute("id", player1.name);
        arenas[1].setAttribute("id", player2.name);
    }

    //update the UI with the board data
    function updateArenaUI(player, boardID){
        let arenaUI = document.querySelector(boardID);
        let blocks = arenaUI.childNodes;
        let playerBoard = player.gameBoard.coordinates;

        blocks.forEach((block) =>{
            let id = block.getAttribute("id");

            id = id.split(",").map((item) => {
                return parseInt(item, 10);
            })

            let x = id[0];
            let y = id[1];

            if(playerBoard[x][y].hit != false && playerBoard[x][y].ship != null){
                block.classList.add("ship");
                block.classList.add("hit");
            }else if (playerBoard[x][y].hit != false){
                block.textContent = "X";
            }else if (playerBoard[x][y].ship != null){
                block.classList.add("ship");
            }
        })

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
    function randomlyPositionShips(player){
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

    //this function takes a simgle random coordinate, and returns a full ship coordinate. 
    // It can also return false if there are no valid coords.
    export function getFullShipCoords(arena, ship, originalCoord){
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

                if (block.valid && block.ship === null && inBounds(newX, newY)){
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

//})();
