

function determineWinner({player1, player2, timer}) {
    clearTimeout(timer)
    const score = document.querySelector('.score')
    if (player1.health == player2.health) {
        score.innerText = 'Tie'
    }
    if (player1.health > player2.health) {
        score.innerText = 'player 1 wins'
    }
    if (player1.health < player2.health) {
        score.innerText = 'player 2 wins'
    }
}
let timer
function countDown () {
    const fightTime = document.querySelector('.timer')
    timer = setTimeout(countDown, 6 * 200 )

    if (fightTime.innerText > 0) {
        fightTime.innerText  = parseInt(fightTime.innerText ) - 1
        
    }
    if ( fightTime.innerText == 0 ){
        clearTimeout(timer)
        
        determineWinner({player1, player2})
    }
    
}
countDown()