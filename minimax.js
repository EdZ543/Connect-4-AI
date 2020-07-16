let depth = 5;
let alpha = -Infinity;
let beta = Infinity;

function bestMove(){
    let bestScore = -Infinity;
    let move;
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 6; j++){
            if(board[i][j] == "" && j == lastSpace(i)){
                board[i][j] = red;
                let score = minimax(board, depth, alpha, beta, false);
                board[i][j] = "";
                if(score > bestScore){
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }
    board[move.i][move.j] = red;
    currentPlayer = yellow;
    thinkingText.html("");
}

let scores = {
    r: 1,
    y: -1,
    tie: 0
};

function minimax(board, depth, alpha, beta, isMaximizing){
    let result = checkWinner();
    if(result !== null){
        return scores[result];
    }

    if(depth < 0){
        return 0;
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        maxloop:
            for(let i = 0; i < 7; i++){
                for(let j = 0; j < 6; j++){
                    if(board[i][j] == "" && j == lastSpace(i)){
                        board[i][j] = red;
                        let score = minimax(board, depth - 1, alpha, beta, false);
                        board[i][j] = "";
                        bestScore = max(score, bestScore);
                        alpha = max(alpha, score);
                        if(beta <= alpha){
                            break maxloop;
                        }
                    }
                }
            }
        return bestScore;
    }else{
        let bestScore = Infinity;
        minloop:
            for(let i = 0; i < 7; i++){
                for(let j = 0; j < 6; j++){
                    if(board[i][j] == "" && j == lastSpace(i)){
                        board[i][j] = yellow;
                        let score = minimax(board, depth - 1, alpha, beta, true);
                        board[i][j] = "";
                        bestScore = min(score, bestScore);
                        beta = min(beta, score);
                        if(beta <= alpha){
                            break minloop;
                        }
                    }
                }
            }
        return bestScore;
    }
}