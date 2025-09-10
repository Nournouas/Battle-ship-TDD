import "./styles.css";
import "./cssReset.css"
import { ComputerPlayer, Player } from "./Player";
import { addBlockEventListener, initUI, updateArenaUI, setBoardNames} from "./DOM";
import { randomlyPositionShips } from "./gameSupport";


//(function (){  
    initUI();
    let players = startGame("player", "computer");
    let turn = players.player1;
    addBlockEventListener(players.player1, attackBlock)
    addBlockEventListener(players.player2, attackBlock)

    while (players.player1.ships > 0 && players.player2.ships > 0){
        
    }

    function attackBlock(blockUI, player) {
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



//})();
