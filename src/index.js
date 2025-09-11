import "./styles.css";
import "./cssReset.css"
import { initUI} from "./DOM";
import { attackBlock, startGame, waitForPlayerMove, gameLoop} from "./gameSupport";



(async function (){  
    initUI();
    let players = startGame("player", "computer");
    gameLoop(players);
})();
