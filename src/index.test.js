import { Ship } from "./index";
import { Gameboard } from "./index";

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

    expect(gameBoard.coordinates[0][0]).toBe(0);
});