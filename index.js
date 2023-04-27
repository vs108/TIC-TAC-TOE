const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winPos = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//initializing the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents="all";

        // removing background

        box.classList = `box box${index+1}`;

    });

    newGameBtn.classList.remove("active");
    gameInfo.classList.remove("win-text");
    gameInfo.classList.remove("win-text2");
    gameInfo.innerText = `CURRENT PLAYER - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if( currentPlayer === "X"){
        currentPlayer = "0";
    }

    else{
        currentPlayer="X";
    }

    gameInfo.innerText = `CURRENT PLAYER - ${currentPlayer}`;
}



function checkWinner() {
     let ans="";

     winPos.forEach((position) => {
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){

            if(gameGrid[position[0]]==="X")
                ans="X";
            else
                ans="0";

                //disable pointer events

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
     });

    //showing winnner

     if(ans !== "" ){
        gameInfo.innerText = `Yayy!  ${ans} Won the Game`;
        gameInfo.classList.add("win-text");
        newGameBtn.classList.add("active");
        return;
     }

     //if no winner found draw situation

     let cnt=0;
     gameGrid.forEach((box) => {
        if(box!== "" )
            cnt++;
     });

    if(cnt === 9){
        gameInfo.innerText="Game Draw !";
        gameInfo.classList.add("win-text2");
        newGameBtn.classList.add("active");
    }

}


function handleClick(index) { 

    if(gameGrid[index] === "" ){ 
        boxes[index].innerText =  currentPlayer;
        gameGrid[index] =  currentPlayer;
        boxes[index].style.pointerEvents= "none";

        swapTurn();

        checkWinner();
    }
};

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    }) 
});


newGameBtn.addEventListener("click",initGame);