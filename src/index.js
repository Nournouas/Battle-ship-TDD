import "./styles.css";

export class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit(){
        if (this.hits < length){
            this.hits++;
        }else{
            this.isSunk();
        }
    }

    isSunk(){
        this.sunk = true;
    }
}

export class Gameboard {
    constructor(){
        this.coordinates = Array.from(Array(10), () =>
            Array.from(Array(10), () => ({
                valid: true,
                hit: false,
                ship: null
            }))
        );
    }

    placeShip(ship, coordsList){
        for (let [x , y] of coordsList){
            this.coordinates[x][y].valid = false;
            this.coordinates[x][y].ship = ship;
            this.invalidateAroundCoord([x, y]);
        }
    }

    invalidateAroundCoord([x, y]){
        //[2,2] for example
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
        return x >= 0 && y >= 0 && x < 10 && y < 10
    }
}

