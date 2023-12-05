const state = {
    view: { /*Valores visuais */
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: { /*Guardam valores*/
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: { /*Executam ações */
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000), //Vai iniciar quando abrir o jogo, sem precisar chamar ela
    },
};

function countDown() {
    state.values.currentTime--; /*Sempre que eu chamar ele vai decrementar*/
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play(); //play -- função
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let ramdomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[ramdomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

/*function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity) Intervalo para o personagem mudar de bloco a bloco
} */

function addListenerHitBox() { /*Listener é quando associa algum evento e ele fica esperando alguma ação para ser executada*/
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {  /*Parte da pontuação*/
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function initialize() { //Inicia tudo
    //moveEnemy();
    addListenerHitBox();
}

initialize();
