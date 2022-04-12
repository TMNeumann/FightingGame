function determineWinner({player1, player2, timer}) {
    clearTimeout(timer)
    const score = document.querySelector('.score')
    if (player1.health == player2.health) {
        score.innerText = 'Tie'
    }
    if (player1.health > player2.health) {
        score.innerText = 'player 1 wins'
        countDeaths('.player1Deaths')
        aiState = 'standby'
    }
    if (player1.health < player2.health) {
        score.innerText = 'player 2 wins'
        countDeaths('.player2Deaths')
        aiState = 'standby'
    }
    document.querySelector('.startPanel').classList.remove('hidden')
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
function countDeaths (playerDeaths) {
    if (aiState === 'go') {
        const deaths = document.querySelector(playerDeaths)
        deaths.innerText = parseInt(deaths.innerText) + 1
    }
}