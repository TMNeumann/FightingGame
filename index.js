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

const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0 
    },
    imageSrc: './assets/img/fighter/Idle.png',
    framesMax: 10,
    scale: 3.2,
    offset: {
        x: 190,
        y: 125 
    },
    sprites: {
        idle: {
            imageSrc: './assets/img/fighter/idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './assets/img/fighter/run.png',
            framesMax: 6
        },
        jump: {
            imageSrc: './assets/img/fighter/jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/img/fighter/fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './assets/img/fighter/attack3.png',
            framesMax: 5
        },
        takeHit: {
            imageSrc: './assets/img/fighter/takeHit.png',
            framesMax: 5
        },
        death: {
            imageSrc: './assets/img/fighter/death.png',
            framesMax: 5
        }
    },
    attackBox: {
        offset: {
            x: 400,
            y: 110
        },
        width: 160,
        height: 50
    }
})

const npc = new Fighter({
    position: {
        x: 800,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 150,
        y: 125 
    },
    imageSrc: './assets/img/fighter/Idle.png',
    scale: 3.2,
    framesMax: 10,
    sprites: {
        idle: {
            imageSrc: './assets/img/fighter/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './assets/img/fighter/Run.png',
            framesMax: 6
        },
        jump: {
            imageSrc: './assets/img/fighter/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/img/fighter/Fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './assets/img/fighter/Attack3.png',
            framesMax: 5
        },
        takeHit: {
            imageSrc: './assets/img/fighter/takeHit.png',
            framesMax: 5
        },
        death: {
            imageSrc: './assets/img/fighter/death.png',
            framesMax: 5
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
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
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}



animate()

window.addEventListener('keydown', keyEvents, false)

window.addEventListener('keyup', (event)=> {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a': 
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
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