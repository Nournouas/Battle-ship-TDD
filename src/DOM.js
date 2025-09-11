//function to create html elements
function createElement(type, classes = [], content = "", attributes = {}){
    const element = document.createElement(type);

    element.classList.add(...classes);

    element.textContent = content ?? "";

    for (const [key, value] of Object.entries(attributes)){
        element.setAttribute(key,value);
    }

    return element
}

export function createHeader(){
    const header = createElement("header", [], "", {});

    const title = createElement("h1", ["header-title"], "BATTLE-SHIPS", {});

    header.appendChild(title);

    return header;
}

export function createArena(){
    const div = createElement("div", ["arena-div"], "", {});

    const bg1 = createElement("div", ["battleground-div"], "", {});
    const bg2 = createElement("div", ["battleground-div"], "", {});

    for (let i = 0 ; i < 100; i++){
        const block1 = createElement("div", ["block"], "", {id: `${Math.round(i/10 - 0.49)},${i%10}`}); //I want this 
        const block2 = createElement("div", ["block"], "", {id: `${Math.round(i/10 - 0.49)},${i%10}`});
        bg1.appendChild(block1);
        bg2.appendChild(block2);
    }

    div.appendChild(bg1);
    div.appendChild(bg2);

    return div;
}

export function disableArena(arena){
    arena.childNodes.forEach((block) => {
        block.classList.add("player");
    });
}

export function createControls(){
    const div = createElement("div", ["controls-div"], "", {});

    const playBtn = createElement("button", ["play-button"], "Play", {});
    const resetBtn = createElement("button", ["reset-button"], "Reset", {});
    
    div.appendChild(playBtn);
    div.appendChild(resetBtn);

    return div;
}

export function addBlockEventListener(player, func) {
    const enemyBoard = document.getElementById(player.name);
    if (!enemyBoard) return;

    enemyBoard.addEventListener("click", (event) => {
        const block = event.target.closest(".block"); 
        if (block && enemyBoard.contains(block)) {
            func(block, player);
        }
    });
    waitForClick(enemyBoard);
}

function getPromiseFromEvent(item, event) {
  return new Promise((resolve) => {
    const listener = () => {
      item.removeEventListener(event, listener);
      resolve();
    }
    item.addEventListener(event, listener);
  })
}

async function waitForClick(node) {
  await getPromiseFromEvent(node, "click")
}

export function removeBlockEventListener(player, func){
    const enemyBoard = document.getElementById(player.name);
    if (!enemyBoard) return;

    enemyBoard.removeEventListener("click", (event) => {
        const block = event.target.closest(".block"); 
        if (block && enemyBoard.contains(block)) {
            func(block, player);
        }
    });

}

export function showArenas(){
    const arena = document.querySelector(".arena-div");
    arena.classList.remove("hidden");
}

export function initUI(){
    const header = createHeader();
    const arena = createArena();
    arena.classList.add("hidden")
    const controls = createControls();

    document.body.appendChild(header);
    document.body.appendChild(arena);
    document.body.appendChild(controls);

    const playBtn = document.querySelector(".play-button");
    playBtn.addEventListener("click",() => showArenas());
}

export function updateArenaUI(player){
    let arenaUI = document.querySelector(`#${player.name}`);
    let blocks = arenaUI.childNodes;
    let playerBoard = player.gameBoard.coordinates;

    blocks.forEach((block) =>{
        let id = block.getAttribute("id");

        id = id.split(",").map((item) => {
            return parseInt(item, 10);
        })

        let x = id[0];
        let y = id[1];

        if(playerBoard[x][y].hit != false && playerBoard[x][y].ship != false){
            block.classList.add("ship");
            block.classList.add("hit");
        }else if (playerBoard[x][y].hit != false){
            block.textContent = "X";
        }else if (playerBoard[x][y].ship != false){
            //block.classList.add("ship");
        }
    })

}


export function setBoardNames(player1, player2){
        let arenas = document.querySelectorAll(".battleground-div");
        arenas[0].setAttribute("id", player1.name);
        arenas[1].setAttribute("id", player2.name);
    }