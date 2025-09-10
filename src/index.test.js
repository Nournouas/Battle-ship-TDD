import { Gameboard, Ship } from "./Gameboard";
import { ComputerPlayer, Player } from "./Player";
import { initGame, getFullShipCoords } from "./index";

test("Ship exists", () => {
    expect(Ship).toBeDefined();
});


test("Ship has a length", () =>{
    const testShip = new Ship(2);
    expect(testShip.length).toBe(2);
});

test("Ship has a hit number", () =>{
    const testShip = new Ship(2);
    expect(testShip.hits).toBe(0);
});

test("Ship tracks when it was sunk", () =>{
    const testShip = new Ship(2);
    expect(testShip.sunk).toBeFalsy();
    testShip.hit();
    testShip.hit();
    expect(testShip.sunk).toBeTruthy();
});

test("Gameboard exists", () => {
    expect(Gameboard).toBeDefined();
});

test("Gameboard has a coordinate system", () => {
    const gameBoard = new Gameboard();

    expect(gameBoard.coordinates[0][0].valid).toBeTruthy();
});

test("Gameboard keeps track of the hit and ship of each block", () => {
    const gameBoard = new Gameboard();

    expect(gameBoard.coordinates[0][0].hit).toBeFalsy();
    expect(gameBoard.coordinates[0][0].ship).toBeNull();
})

test("Gameboard can place a ship", () =>{
    const testShip = new Ship(2);

    const gameBoard = new Gameboard();
    gameBoard.placeShip(testShip, [[0,0], [0,1]]);

    expect(gameBoard.coordinates[0][0].ship).toBe(testShip);
    expect(gameBoard.coordinates[0][1].ship).toBe(testShip);
    expect(gameBoard.coordinates[0][2].ship).toBeNull();
})

test("Gameboard can receive attacks", () =>{
    const testShip = new Ship(1);

    const gameBoard = new Gameboard();
    gameBoard.placeShip(testShip, [[0,0]]);

    expect(gameBoard.coordinates[0][0].ship).toBe(testShip);
    expect(gameBoard.coordinates[0][0].ship.hits).toBe(0);
    expect(gameBoard.coordinates[0][0].ship.sunk).toBeFalsy();
    expect(gameBoard.coordinates[0][0].hit).toBeFalsy();
    gameBoard.receiveAttack([0,0]);
    expect(gameBoard.coordinates[0][0].ship).toBe(testShip);
    expect(gameBoard.coordinates[0][0].ship.hits).toBe(1);
    expect(gameBoard.coordinates[0][0].ship.sunk).toBeTruthy();
    expect(gameBoard.coordinates[0][0].hit).toBeTruthy();
})


test("Gameboard can report when all ships are sunk", () =>{
    const testShip = new Ship(2);

    const gameBoard = new Gameboard();
    expect(gameBoard.sailingShips).toBe(0);
    gameBoard.placeShip(testShip, [[0,0], [0, 1]]);
    expect(gameBoard.sailingShips).toBe(1);
    expect(gameBoard.coordinates[0][0].ship.sunk).toBeFalsy();
    gameBoard.receiveAttack([0,0]);
    expect(gameBoard.coordinates[0][0].ship.sunk).toBeFalsy();
    gameBoard.receiveAttack([0,0]);
    expect(gameBoard.coordinates[0][0].ship.sunk).toBeTruthy();
    expect(gameBoard.sailingShips).toBe(0);
})

//-----

test("player exists", () => {
    expect(Player).toBeDefined();
})

test("computer player exists", () => {
    expect(ComputerPlayer).toBeDefined();
})

test("player has a gameboard", () =>{
    const player = new Player();
    expect(player.gameBoard).toBeDefined();
})

test("Computer player has a gameboard", () =>{
    const player = new ComputerPlayer();
    
    expect(player.gameBoard).toBeDefined();
})

//------


test("game can calculate potential full coordinates for a ship", () => {
    let player = new Player();
    let arena = player.gameBoard.coordinates;
    arena[3][4].ship = "ship";
    arena[4][3].valid = false;
    arena[3][2].valid = false;
    arena[2][3].valid = false;
    let ship = player.ships[2];
    let originalCoords = [3,3];
    let shipcoord = getFullShipCoords(arena, ship, originalCoords);

    expect(shipcoord).toBeFalsy();
})
