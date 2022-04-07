function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    backGround.update()
    shop.update()
    player.update()
    npc.update()

    player.velocity.x = player.inertia
    npc.velocity.x = npc.inertia

    
    // player movement
    if ( keys.a.pressed 
        && player.lastKey === 'a' 
        && player.position.x > 0  
        && player.inertia === 0 
    || keys.a.pressed 
    && player.lastKey === 'w' 
    && player.position.x > 0  
    && player.inertia === 0  ) {
        player.switchSprite('run')
        player.velocity.x = -5
    } else if (keys.d.pressed 
        && player.lastKey === 'd' 
        && player.position.x + player.width < canvas.width 
        && player.inertia === 0 
    || keys.d.pressed 
    && player.position.x + player.width < canvas.width 
    && player.lastKey === 'w' 
    && player.inertia === 0 ) {        
        player.switchSprite('run')
        player.velocity.x = 5
    }
    else {
        player.switchSprite('idle')
    }
    // jumping / falling
    if (player.velocity.y < 0) { 
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
    // npc movement
    if (keys.ArrowLeft.pressed 
        && npc.lastKey === 'ArrowLeft' 
        && npc.position.x  > 0 
        && npc.inertia === 0 
    || keys.ArrowLeft.pressed 
    && npc.lastKey === 'ArrowUp' 
    && npc.position.x  > 0 
    && npc.inertia === 0 ) {
        npc.velocity.x = -5
        npc.switchSprite('run')
    } else if (keys.ArrowRight.pressed 
        && npc.lastKey === 'ArrowRight' 
        && npc.position.x + npc.width < canvas.width
        && npc.inertia === 0 
    || keys.ArrowRight.pressed 
    && npc.lastKey === 'ArrowUp' 
    && npc.position.x + npc.width < canvas.width 
    && npc.inertia === 0 ) {
        npc.velocity.x = 5
        npc.switchSprite('run')
    }
    else {
        npc.switchSprite('idle')
    }
    // jumping / falling
    if (npc.velocity.y < 0) {
        npc.switchSprite('jump')
    } else if (npc.velocity.y > 0) {
        npc.switchSprite('fall')
    }
    // litle physics
    // player
    if (player.velocity.y != 0 && player.velocity.x > 0 ) {
        if (player.position.x + player.width < canvas.width) {
            player.inertia = 5
        } else {
            player.inertia = 0
        }

    } 
    if (player.velocity.y != 0 && player.velocity.x < 0 ) {
        if ( player.position.x > 0 ) {
            player.inertia = -5
        } else {
            player.inertia = 0
        }
    } 
    if (player.velocity.y === 0) {
        player.inertia = 0
    }
    // npc
    if (npc.velocity.y != 0 && npc.velocity.x > 0 ) {
        if (npc.position.x + npc.width < canvas.width) {
            npc.inertia = 5
        } else {
            npc.inertia = 0
        }

    } 
    if (npc.velocity.y != 0 && npc.velocity.x < 0 ) {
        if ( npc.position.x > 0 ) {
            npc.inertia = -5
        } else {
            npc.inertia = 0
        }
    } 
    if (npc.velocity.y === 0) {
        npc.inertia = 0
    }

// combat
    const playerHealth = document.querySelector('.playerHealth div')
    const npcHealth = document.querySelector('.npcHealth div')
    if ( detectObjectCollision({ object1: player, object2: npc }) && player.isAttacking ) {
        console.log('player atack')
        npc.health -= 10
        player.switchSprite('attack')
        npc.switchSprite('takeHit')
        npcHealth.style.width = npc.health + '%'
        player.isAttacking = false
    }
    if ( detectObjectCollision({ object1: npc, object2: player }) && npc.isAttacking) {
        npc.isAttacking = false
        console.log('npc attack')
        npc.switchSprite('attack')
        player.switchSprite('takeHit')
        player.health -= 10
        playerHealth.style.width = player.health + '%'
    }

    // miss
    if (player.isAttacking && player.framesCurrent > 3) {
        console.log(player.framesCurrent)
        player.isAttacking = false
    }
    if (npc.isAttacking && npc.framesCurrent > 3) {
        player.isAttacking = false
    }

    // game over via HP
    if ( player.health <= 0 || npc.health <= 0 ) {
        determineWinner({player, npc, timer})
    }

}
