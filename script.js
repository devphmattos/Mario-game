const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const gameOver = document.querySelector('.gameover-container')
const btnRestart = document.querySelector('.restart')
let contadorContainer = document.querySelector('.contador-container')
const scoreFinal = document.querySelector('.score-final')
const bestScore = document.querySelector('.best-score')

let contador = 1

function contadorPontos() {
    const teste = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        contadorContainer.innerHTML = contador++
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80){
            clearInterval(teste)
            contadorContainer.innerHTML -= 1

            scoreFinal.innerHTML = `Score: ${contadorContainer.textContent}`

            contadorContainer.style.display = 'none'

            let melhorScore = localStorage.getItem('bestScore')

            if(+contadorContainer.textContent >= +melhorScore){
                localStorage.setItem('bestScore', `${+contadorContainer.textContent}`)
            }

            melhorScore = localStorage.getItem('bestScore')
            bestScore.innerHTML = `Best Score: ${melhorScore}`

        } 
    }, 1500)
}


contadorPontos()

document.addEventListener('keydown', jump)

function jump() {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

const verificador = setInterval(() => {
    
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    // console.log(marioPosition);

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80){
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        mario.src = 'assets/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearInterval(verificador)

        gameOver.style.display = 'block'
    }

},10)

btnRestart.addEventListener('click', restart)

function restart() {
    location.reload()
}