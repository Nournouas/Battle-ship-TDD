export { Ship } from "./Ship";

export class Gameboard {
    
    constructor(){
        this.coordinates = Array.from(Array(10), () =>
            Array.from(Array(10), () => ({
                valid: true,
                hit: false,
                ship: null
            }))
        );
        this.sailingShips = 0;
    }

    placeShip(ship, coordsList){
        for (let [x , y] of coordsList){
            this.coordinates[x][y].valid = false;
            this.coordinates[x][y].ship = ship;
            this.invalidateAroundCoord([x, y]); 
        }
        this.sailingShips++;
        //Update UI
    }

    receiveAttack([x ,y]){
        let coordinate = this.coordinates[x][y];
        if (coordinate.ship !== null){
            coordinate.ship.hit();
            coordinate.hit = true; //Update UI
            if (coordinate.ship.sunk === true){
                this.sailingShips--;
                if (this.sailingShips === 0){
                    //Update UI stop game <------------------------------------
                }
                //Update UI
            }
        }else{
            coordinate.hit = true; //Update UI
        }

    }

    invalidateAroundCoord([x, y]){
        let directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ]

        for (let [dx, dy] of directions){
            const nx = dx + x;
            const ny = dy + y;
            if (this.inBounds(nx, ny)){
                this.coordinates[nx][ny].valid = false;
            } 
        }
    }

    inBounds(x, y){
        return x >= 0 && y >= 0 && x < 10 && y < 10;
    }
}