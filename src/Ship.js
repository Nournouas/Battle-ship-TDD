export class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinate = []
    }

    hit(){

       if (this.hits < this.length) this.hits++

       if (this.hits === this.length) this.isSunk()
    }

    isSunk(){
        
        this.sunk = true;
    }
}