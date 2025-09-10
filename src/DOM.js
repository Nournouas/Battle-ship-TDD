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

export function createControls(){
    const div = createElement("div", ["controls-div"], "", {});

    const playBtn = createElement("button", ["play-button"], "Play", {});
    const resetBtn = createElement("button", ["reset-button"], "Reset", {});
    
    div.appendChild(playBtn);
    div.appendChild(resetBtn);

    return div;
}