function keyEvents (event) {
    if (!player.dead) {
        switch (event.code) {
            // player
            
            case 'KeyD':
                keys.d.pressed = true
                player.lastKey = 'd'
                break;
            case 'KeyA': 
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'KeyW':
                if (player.position.y + player.height + player.velocity.y >= canvas.height - 100) {
                    player.velocity.y = -20
                    player.lastKey = 'w'
                }
                break  
            case 'Space':
                player.attack() 
                break
        }
    }
    if (!npc.dead) {
        switch (event.code) {
        // npc
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            npc.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true
            npc.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (npc.position.y + npc.height + npc.velocity.y >= canvas.height - 100 ) {
                npc.velocity.y = -20
                npc.lastKey = 'ArrowUp'
            }
            break
        case 'ArrowDown':
            npc.attack() 
            break
        }
    }
}