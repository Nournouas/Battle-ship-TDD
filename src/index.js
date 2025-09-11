import "./styles.css";
import "./cssReset.css"
import { ComputerPlayer, Player } from "./Player";
import { addBlockEventListener, initUI} from "./DOM";
import { randomlyPositionShips, attackBlock, startGame} from "./gameSupport";



//(function (){  
    initUI();
    let players = startGame("player", "computer");

    addBlockEventListener(players.player1, attackBlock)
    addBlockEventListener(players.player2, attackBlock)

    while (players.player1.ships > 0 && players.player2.ships > 0){
        
    }





//})();
