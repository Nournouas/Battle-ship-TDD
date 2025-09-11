import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";
import { attackBlock, getRandomCoords } from "./gameSupport";

export class Player {
    constructor(name){
        this.name = name;
        this.gameBoard = new Gameboard();
        this.ships = this.makeShips();
    }

    makeShips(){
        let ships = [];
        for (let i = 1; i <= 3; i++){
            ships.push(new Ship(i));
            ships.push(new Ship(i));
        }

        return ships;
    }

    //This function waits for a user to click, the block is returned as the resolved promise
    //the block is later used to launch the behaviour desired
    async waitForMove(opponent){
        return new Promise((resolve) => {
            const board = document.getElementById(opponent.name);
            //board.classList.add("focus");
            const listener = (event) => {
                const block = event.target.closest(".block");
                const [x, y] = block
                    .getAttribute("id")
                    .split(",")
                    .map(item => parseInt(item, 10));

                if (block && board.contains(block) && opponent.gameBoard.coordinates[x][y].hit != true) {
                    board.removeEventListener("click", listener);
                    //board.classList.remove("focus");
                    resolve(block);
                }
            }

            board.addEventListener("click", listener)
    })
    }
}

export class ComputerPlayer extends Player{
    

    attackRandomly(opponent, coord = [5, 6]){
        let opBoard = opponent.gameBoard.coordinates;

        if (opBoard[coord[0]][coord[1]].hit === false){
            let blockId = `${coord[0]},${coord[1]}`;
            let block = document.querySelector(`#${CSS.escape(opponent.name)} > #${CSS.escape(blockId)}`);
            attackBlock(block, opponent);
            return;
        }

        coord = getRandomCoords();

        return this.attackRandomly(opponent, coord);
    }
}