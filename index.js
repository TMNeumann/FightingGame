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
    imageSrc: './assets/img/bg.png'
})

const shop = new Sprite ({
    width: 200,
    position: {
        x: 650,
        y: 160
    },
    imageSrc: './assets/img/shop_anim.png',
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
    imageSrc: './assets/img/fighter/IdleR.png',
    framesMax: 10,
    scale: 3.2,
    offset: {
        x: 190,
        y: 125 
    },
    facing: 'right',
    sprites: {
        idleL: {
            imageSrc: './assets/img/fighter/IdleL.png',
            framesMax: 10
        },
        idleR: {
            imageSrc: './assets/img/fighter/IdleR.png',
            framesMax: 10
        },
        runL: {
            imageSrc: './assets/img/fighter/RunL.png',
            framesMax: 6
        },
        runR: {
            imageSrc: './assets/img/fighter/RunR.png',
            framesMax: 6
        },
        jumpL: {
            imageSrc: './assets/img/fighter/JumpL.png',
            framesMax: 2
        },
        jumpR: {
            imageSrc: './assets/img/fighter/JumpR.png',
            framesMax: 2
        },
        fallL: {
            imageSrc: './assets/img/fighter/FallL.png',
            framesMax: 2
        },
        fallR: {
            imageSrc: './assets/img/fighter/FallR.png',
            framesMax: 2
        },
        attackL: {
            imageSrc: './assets/img/fighter/AttackL.png',
            framesMax: 4
        },
        attackR: {
            imageSrc: './assets/img/fighter/AttackR.png',
            framesMax: 4
        },
        takeHitL: {
            imageSrc: './assets/img/fighter/TakeHitL.png',
            framesMax: 3
        },
        takeHitR: {
            imageSrc: './assets/img/fighter/TakeHitR.png',
            framesMax: 3
        },
        deathL: {
            imageSrc: './assets/img/fighter/DeathL.png',
            framesMax: 9
        },
        deathR: {
            imageSrc: './assets/img/fighter/DeathR.png',
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
    imageSrc: './assets/img/fighter/IdleL.png',
    scale: 3.2,
    framesMax: 10,
    facing: 'left',
    sprites: {
        idleL: {
            imageSrc: './assets/img/fighter/IdleL.png',
            framesMax: 10
        },
        idleR: {
            imageSrc: './assets/img/fighter/IdleR.png',
            framesMax: 10
        },
        runL: {
            imageSrc: './assets/img/fighter/RunL.png',
            framesMax: 6
        },
        runR: {
            imageSrc: './assets/img/fighter/RunR.png',
            framesMax: 6
        },
        jumpL: {
            imageSrc: './assets/img/fighter/JumpL.png',
            framesMax: 2
        },
        jumpR: {
            imageSrc: './assets/img/fighter/JumpR.png',
            framesMax: 2
        },
        fallL: {
            imageSrc: './assets/img/fighter/FallL.png',
            framesMax: 2
        },
        fallR: {
            imageSrc: './assets/img/fighter/FallR.png',
            framesMax: 2
        },
        attackL: {
            imageSrc: './assets/img/fighter/AttackL.png',
            framesMax: 4
        },
        attackR: {
            imageSrc: './assets/img/fighter/AttackR.png',
            framesMax: 4
        },
        takeHitL: {
            imageSrc: './assets/img/fighter/TakeHitL.png',
            framesMax: 3
        },
        takeHitR: {
            imageSrc: './assets/img/fighter/TakeHitR.png',
            framesMax: 3
        },
        deathL: {
            imageSrc: './assets/img/fighter/DeathL.png',
            framesMax: 9
        },
        deathR: {
            imageSrc: './assets/img/fighter/DeathR.png',
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

let aiState = 'standby'
let gameDificulty = 1

function startGame () {
    console.log(player2.dead)   
    document.querySelector('.startPanel').classList.add('hidden')
    document.querySelector('.timer').innerText = 60
    document.querySelector('.score').innerText = ''
    player1.health = 100
    player1.image = player1.sprites.idleL.image
    player1.dead = false
    player1.position.x = 100
    player2.health = 100
    player2.image = player2.sprites.idleL.image
    player2.dead = false
    player2.position.x = 800
    countDown()
    aiState = 'go'
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

function ai () {
    if (aiState === 'go' && !player1.dead && !player2.dead) {
        let dif = player2.position.x - player1.position.x
        let randomJump = Math.floor(Math.random() * 100)
        let randomHit = Math.floor(Math.random() * 100) 
        if (randomJump > 98) {
            keys.ArrowUp.pressed = true
            if (player2.velocity.y == 0 ){
                player2.velocity.y = -20
            }
        }
        setTimeout(() => {
            if (dif > 30) {
                keys.ArrowLeft.pressed = true
                player2.lastKey = 'ArrowLeft'
            } else if (dif < 30) {
                keys.ArrowRight.pressed = true
                player2.lastKey = 'ArrowRight'
            } 
            if (dif < 30 && randomHit > 99 - gameDificulty) {
                player2.attack()
            }
        }, 400);
    } else {
        keys.ArrowLeft.pressed = false
        player2.lastKey = 'ArrowLeft'
    }
}
// controlers
const upBtn = document.querySelector('.upBtn')
const rightBtn = document.querySelector('.rightBtn')
const leftBtn = document.querySelector('.leftBtn')
const attackBtn = document.querySelector('.attackBtn')

upBtn.addEventListener('mousedown', moveUp, false)
rightBtn.addEventListener('mousedown', moveRight, false)
leftBtn.addEventListener('mousedown', moveLeft, false)
attackBtn.addEventListener('mousedown',buttonAttack, false)


rightBtn.addEventListener('mouseup', () => {
    keys.d.pressed = false
})
leftBtn.addEventListener('mouseup', () => {
    keys.a.pressed = false
})
// mobile
rightBtn.addEventListener('touchstart', (event) => {
    console.log(event)
    keys.d.pressed = true
    player1.lastKey = 'd'
})
leftBtn.addEventListener('touchstart', (event) => {
    
    keys.a.pressed = true
    player1.lastKey = 'a'
})
attackBtn.addEventListener('touchstart', (event) => {
    console.log(event)
    player1.attack()
})
upBtn.addEventListener('touchstart', (event) => {
    console.log(event)
    if (player1.velocity.y == 0 ){
        player1.velocity.y = -20
    }
})

function moveLeft() {
    keys.a.pressed = true
    player1.lastKey = 'a'
}
function moveRight() {
    keys.d.pressed = true
    player1.lastKey = 'd'
}
function moveUp() {
    if (player1.velocity.y == 0 ){
        player1.velocity.y = -20
    }
}
function buttonAttack () {
    player1.attack()
}

rightBtn.addEventListener('mouseup', () => {
    keys.d.pressed = false
    player1.lastKey = ''
})
leftBtn.addEventListener('mouseup', () => {
    keys.a.pressed = false
    player1.lastKey = ''
})