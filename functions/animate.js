function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    backGround.update()
    shop.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0
    // player1 movement

    if ( keys.a.pressed && player1.lastKey === 'a') {
        if (player1.position.x > 0 ){            
            player1.velocity.x = -5
        }
        player1.facing = 'left'
        player1.switchSprite('runL')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        if (player1.position.x + player1.width < canvas.width){            
            player1.velocity.x = 5
        }
        player1.facing = 'right'
        player1.switchSprite('runR')
    } else {
        if (player1.facing === 'right') {
            player1.switchSprite('idleR')
        } else if (player1.facing === 'left') {
            player1.switchSprite('idleL')
        } 
    }
    // jumping
    if (player1.velocity.y < 0) {
        if (player1.facing === 'right') {
            player1.switchSprite('jumpR')
        } else if (player1.facing === 'left') {
            player1.switchSprite('jumpL')
        } 
    } else if (player1.velocity.y > 0) {
        if (player1.facing === 'right') {
            player1.switchSprite('fallR')
        } else if (player1.facing === 'left') {
            player1.switchSprite('fallL')
        } 
    }
    
    // player2 movement
    if ( keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        if (player2.position.x > 0 ){            
            player2.velocity.x = -5
        }
        player2.facing = 'left'
        player2.switchSprite('runL')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        if (player2.position.x + player2.width < canvas.width){            
            player2.velocity.x = 5
        }
        player2.facing = 'right'
        player2.switchSprite('runR')
    } else {
        if (player2.facing === 'right') {
            player2.switchSprite('idleR')
        } else if (player2.facing === 'left') {
            player2.switchSprite('idleL')
        } 
    }
      // jumping
      if (player2.velocity.y < 0) {
        if (player2.facing === 'right') {
            player2.switchSprite('jumpR')
        } else if (player2.facing === 'left') {
            player2.switchSprite('jumpL')
        } 
    } else if (player2.velocity.y > 0) {
        if (player2.facing === 'right') {
            player2.switchSprite('fallR')
        } else if (player2.facing === 'left') {
            player2.switchSprite('fallL')
        } 
    }
    // combat

    if (detectObjectCollision({ object1: player1, object2: player2 }) &&
    player1.isAttacking && player1.framesCurrent === 2) {
        player2.takeHit()
        player1.isAttacking = false
    }
    if (detectObjectCollision({ object1: player2, object2: player1 }) &&
    player2.isAttacking && player2.framesCurrent === 2) {
        player1.takeHit()
        player2.isAttacking = false
    }

    // if player1 misses
    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false
    }
    // if player2 misses
    if (player2.isAttacking && player2.framesCurrent === 4) {
        player2.isAttacking = false
    }

    // game over via HP
    if (player1.health <= 0 || player2.health <= 0 ) {
        determineWinner({player1, player2, timer})
    }

    function updateHealthbar () {
        const player1HealthBar = document.querySelector('.player1HealthBar div')    
        const player2healthBar = document.querySelector('.player2healthBar div')
            
        player1HealthBar.style.width = player1.health + '%'
        player2healthBar.style.width = player2.health + '%'
    }
    updateHealthbar ()

}
