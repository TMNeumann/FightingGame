function keyEvents (event) {
    if (!player1.dead) {
        if (event.code === 'KeyD') {
            keys.d.pressed = true
            player1.lastKey = 'd'
        }
        if (event.code === 'KeyA') {
            keys.a.pressed = true
            player1.lastKey = 'a'
        }
        if (event.code === 'KeyW') {
            keys.w.pressed = true
            if (player1.velocity.y == 0 ){
                player1.velocity.y = -20
            }
        }
        if (event.code === 'Space') {
            player1.attack()
        }
    }
    if (!player2.dead) {
        if (event.code === 'ArrowLeft') {
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
        }
        if (event.code === 'ArrowRight') {
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
        }
        if (event.code === 'ArrowUp') {
            keys.ArrowUp.pressed = true
            if (player2.velocity.y == 0 ){
                player2.velocity.y = -20
            }
        }
        if (event.code === 'ArrowDown') {
            player2.attack()
        }
       
    }
}