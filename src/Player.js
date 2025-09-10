import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

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
}

export class ComputerPlayer extends Player{
    
}