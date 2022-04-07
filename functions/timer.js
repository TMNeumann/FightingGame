

function determineWinner({player, npc, timer}) {
    clearTimeout(timer)
    const score = document.querySelector('.score')
    if (player.health == npc.health) {
        score.innerText = 'Tie'
    }
    if (player.health > npc.health) {
        score.innerText = 'player 1 wins'
    }
    if (player.health < npc.health) {
        score.innerText = 'Player 2 wins'
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
        
        determineWinner({player, npc})
    }
    
}
countDown()