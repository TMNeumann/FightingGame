const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .7

const backGround = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'https://tmneumann.github.io/assets/img/bg.png'
})

const shop = new Sprite ({
    width: 200,
    position: {
        x: 650,
        y: 160
    },
    imageSrc: 'https://tmneumann.github.io/assets/img/shop_anim.png',
    scale: 2.5,
    framesMax: 6
})

const player1 = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: '.https://tmneumann.github.io/assets/img/fighter/IdleR.png',
    framesMax: 10,
    scale: 3.2,
    offset: {
        x: 190,
        y: 125 
    },
    facing: 'right',
    sprites: {
        idleL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/IdleL.png',
            framesMax: 10
        },
        idleR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/IdleR.png',
            framesMax: 10
        },
        runL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/RunL.png',
            framesMax: 6
        },
        runR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/RunR.png',
            framesMax: 6
        },
        jumpL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/JumpL.png',
            framesMax: 2
        },
        jumpR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/JumpR.png',
            framesMax: 2
        },
        fallL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/FallL.png',
            framesMax: 2
        },
        fallR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/FallR.png',
            framesMax: 2
        },
        attackL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/AttackL.png',
            framesMax: 4
        },
        attackR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/AttackR.png',
            framesMax: 4
        },
        takeHitL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/takeHitL.png',
            framesMax: 3
        },
        takeHitR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/takeHitR.png',
            framesMax: 3
        },
        deathL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/deathL.png',
            framesMax: 9
        },
        deathR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/deathR.png',
            framesMax: 9
        }
    },
    attackBox: {
        offset: {
            x: 30,
            y: 10
        },
        width: 100,
        height: 100
    }
})

const player2 = new Fighter({
    position: {
        x: 800,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 190,
        y: 125 
    },
    imageSrc: 'https://tmneumann.github.io/assets/img/fighter/IdleL.png',
    scale: 3.2,
    framesMax: 10,
    facing: 'left',
    sprites: {
        idleL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/IdleL.png',
            framesMax: 10
        },
        idleR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/IdleR.png',
            framesMax: 10
        },
        runL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/RunL.png',
            framesMax: 6
        },
        runR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/RunR.png',
            framesMax: 6
        },
        jumpL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/JumpL.png',
            framesMax: 2
        },
        jumpR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/JumpR.png',
            framesMax: 2
        },
        fallL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/FallL.png',
            framesMax: 2
        },
        fallR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/FallR.png',
            framesMax: 2
        },
        attackL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/AttackL.png',
            framesMax: 4
        },
        attackR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/AttackR.png',
            framesMax: 4
        },
        takeHitL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/takeHitL.png',
            framesMax: 3
        },
        takeHitR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/takeHitR.png',
            framesMax: 3
        },
        deathL: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/deathL.png',
            framesMax: 9
        },
        deathR: {
            imageSrc: 'https://tmneumann.github.io/assets/img/fighter/deathR.png',
            framesMax: 9
        }
    },
    attackBox: {
        offset: {
            x: -70,
            y: 10
        },
        width: 100,
        height: 100
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    space: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

animate()

window.addEventListener('keydown', keyEvents, false)

window.addEventListener('keyup', (event)=> {
    // player1
    switch (event.key) {
        case 'a': 
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break;
        case 'w':
            keys.w.pressed = false
            break
    }
    // player2
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})


