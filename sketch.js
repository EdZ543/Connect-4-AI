let board = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
];

let w;
let h;

let x1, y1
let x2, y2;

let cnv;
let yellow = "y";
let red = "r";
let currentPlayer = yellow;
let button;
let resultText;
let thinkingText;
let selText;
let sel;

function setup() {
    cnv = createCanvas(700, 600);
    cnv.mousePressed(canvasPressed);

    w = width / 7;
    h = height / 6;

    button = createButton("reset");
    button.size(100, 30);
    button.position(8, height + 20);
    button.mousePressed(resetSketch);

    resultText = createP("");
    resultText.style("font-size", "32pt");

    thinkingText = createP("");
    thinkingText.style("font-size", "32pt");
    thinkingText.position(width / 2 - 150, height - 35);

    // selText = createP("AI difficulty (higher will give smarter AI, but longer time to think about moves)");
    // selText.style("font-size", "12pt");
    // selText.position(50, height + 85);

    // sel = createSelect();
    // sel.option(1);
    // sel.option(2);
    // sel.option(3);
    // sel.option(4);
    // sel.option(5);
    // sel.option(6);
    // sel.option(7);
    // sel.option(8);
    // sel.option(69);
    // sel.selected(5);
    // sel.changed(changeDifficulty);
    // sel.position(8, height + 100);
}

// function changeDifficulty(){
//     depth = sel.value();
// }

function resetSketch(){
    board = [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ];
    resultText.html("");
    currentPlayer = yellow
    //sel.removeAttribute("disabled");
    loop();
}

function draw(){
    background(0, 100, 200);
    noFill();
    strokeWeight(8);
    stroke(0);
    rect(0, 0, width, height);

    showBoard();
    showWinner();
}

function lastSpace(row){
    let count = -1;
    for(i = 0; i < 6; i++){
        if(board[row][i] == ""){
            count++;
        }
    }
    return count;
}

function showBoard(){
    for(j = 0; j < 6; j++){
        for(i = 0; i < 7; i++){
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            strokeWeight(4);
            if(spot == yellow){
                fill(255, 255, 0);
            }else if(spot == red){
                fill(255, 0, 0);
            }else{
                fill(255, 255, 255);
            }
            stroke(0);
            ellipse(x, y, 70);
        }
    }
}

function canvasPressed(){
    if(currentPlayer == yellow){
        let i = floor(mouseX / w);
        let j = lastSpace(i);
        if(j >= 0 && board[i][j] == ""){
            //sel.attribute("disabled", "true");
            board[i][j] = yellow;
            currentPlayer = red;
            thinkingText.html("The AI is thinking...");
            setTimeout(bestMove, 500);
        }
    }
}

function equals4(a, b, c, d) {
    return a == b && b == c && c == d && a != "";
}

function checkWinner(){
    let winner = null;

    //horizontal
    for (i = 0; i < 4 ; i++ ){
         for (j = 0; j < 6; j++){
            if(equals4(board[i][j], board[i+1][j], board[i+2][j], board[i+3][j])){
                x1 = w * i;
                y1 = h * j + h / 2;
                x2 = w * (i + 3) + w;
                y2 = h * j + h / 2;
                winner = board[i][j];
            }           
        }
    }

    //vertical
    for(j = 0; j < 3 ; j++){
        for(i = 0; i < 7; i++){
            if(equals4(board[i][j], board[i][j+1], board[i][j+2], board[i][j+3])){
                x1 = w * i + w / 2;
                y1 = h * j;
                x2 = w * i + w / 2;
                y2 = h * (j + 3) + h;
                winner = board[i][j];
            }           
        }
    }

    //ascending diagonal
    for (i = 3; i < 7; i++){
        for(j = 0; j < 3; j++){
            if(equals4(board[i][j], board[i-1][j+1], board[i-2][j+2], board[i-3][j+3])){
                x1 = w * (i - 3);
                y1 = h * (j + 3) + h;
                x2 = w * i + w;
                y2 = h * j;
                winner = board[i][j];
            }
        }
    }

    //descending diagonal
    for (i = 3; i < 7; i++){
        for(j = 0; j < 6; j++){
            if(equals4(board[i][j], board[i-1][j-1], board[i-2][j-2], board[i-3][j-3])){
                x1 = w * i + w;
                y1 = h * j + h;
                x2 = w * (i - 3);
                y2 = h * (j - 3);
                winner = board[i][j];
            }
        }
    }

    let openSpots = 0;
    for (let i = 0; i < 7; i++){
        for (let j = 0; j < 6; j++){
            if(board[i][j] == ""){
                openSpots++;
            }
        }
    }

    if(winner == null && openSpots == 0){
        x1 = -1000;
        y1 = -1000;
        x2 = -1000;
        y2 = -1000;
        return "tie";
    }else{
        return winner;
    }
}

function showConnection(){
    strokeWeight(10);
    line(x1, y1, x2, y2);
}

function showWinner(){
    let result = checkWinner();

    if(result == "tie"){
        currentPlayer = "none";
        resultText.position(width / 2 - 20, height - 35);
        resultText.html("Tie");
        showConnection();
        noLoop();
    }else if(result == "r"){
        currentPlayer = "none";
        resultText.position(width / 2 - 100, height - 35);
        resultText.html(`The AI wins`);
        showConnection();
        noLoop();
    }else if(result == "y"){
        currentPlayer = "none";
        resultText.position(width / 2 - 70, height - 35);
        resultText.html(`You win`);
        showConnection();
        noLoop();
    }

    if(result != null){
        thinkingText.html("");
    }
}

