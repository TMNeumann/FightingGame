class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0 , y: 0 } }) {
        this.width = 50
        this.height = 150
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
    }

    draw() {

        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            )
    }

    animateFrames () {
        this.framesElapsed++
        
        if ( this.framesElapsed % this.framesHold === 0 ) {
            if (this.framesCurrent < this.framesMax - 1 ) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()        
    }
}

class Fighter extends Sprite {
    constructor({
        position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x: 0 , y: 0 },
        sprites,
        attackBox = { offset: { }, width: undefined, height: undefined },
        facing
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 125
        this.lastKey 
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.facing = facing
        this.sprites = sprites
        this.dead = false 

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    update() {
        this.draw()
        if (!this.dead) this.animateFrames()
 
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x 
        // gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 121) {
            this.velocity.y = 0
            this.position.y = 330 
        }
        else {
            this.velocity.y += gravity
        }
        if (this.velocity.y < 0) {
            this.velocity.x = -20
        } else if (this.velocity.y < 0){ 
            this.velocity.x = 20
        }
    }
    attack() {
        if ( this.facing === 'left') {
            this.switchSprite('attackL')
            this.attackBox.offset.x = -70
        } else {
            this.switchSprite('attackR')
            this.attackBox.offset.x = 30
        }
        this.isAttacking = true
    }
    
    takeHit() {
        this.health -= 10
        if (this.health <= 0) {
            if (this.facing === 'left') {
                this.switchSprite('deathL')
            } else {                
                this.switchSprite('deathR')
            }
        } else {
            if ( this.facing === 'left') {
                this.switchSprite('takeHitL')
            } else {
                this.switchSprite('takeHitR')
            }
        }
    }

    switchSprite ( sprite ) {
        if (this.image === this.sprites.deathL.image) {
            if (this.framesCurrent === this.sprites.deathL.framesMax - 1)
              this.dead = true
            return
        }
        if (this.image === this.sprites.deathR.image) {
            if (this.framesCurrent === this.sprites.deathR.framesMax - 1)
              this.dead = true
            return
        }
        // overriding all other animations with the attack animation
        if (
            this.image === this.sprites.attackL.image &&
            this.framesCurrent < this.sprites.attackL.framesMax - 1
        ) {
            return
        }
        if (
            this.image === this.sprites.attackR.image &&
            this.framesCurrent < this.sprites.attackR.framesMax - 1
        ) {
            return
        }
        // override when fighter gets hit
        if (
            this.image === this.sprites.takeHitL.image &&
            this.framesCurrent < this.sprites.takeHitL.framesMax - 1
        ) {
            return
        }
        if (
            this.image === this.sprites.takeHitR.image &&
            this.framesCurrent < this.sprites.takeHitR.framesMax - 1
        ) {
            return
        }

        switch (sprite) {
            case 'idleL':
                if (this.image !== this.sprites.idleL.image) {
                    this.image = this.sprites.idleL.image
                    this.framesMax = this.sprites.idleL.framesMax    
                    this.framesCurrent = 0  
                }
                break;
            case 'idleR':
                if (this.image !== this.sprites.idleR.image) {
                    this.image = this.sprites.idleR.image
                    this.framesMax = this.sprites.idleR.framesMax    
                    this.framesCurrent = 0  
                }
                break;      
            case 'runL':
                if (this.image !== this.sprites.runL.image) {
                    this.image = this.sprites.runL.image
                    this.framesMax = this.sprites.runL.framesMax
                    this.framesCurrent = 0
                }               
                break;
            case 'runR':
                if (this.image !== this.sprites.runR.image) {
                    this.image = this.sprites.runR.image
                    this.framesMax = this.sprites.runR.framesMax
                    this.framesCurrent = 0
                }               
                break;
            case 'jumpL':
                if (this.image !== this.sprites.jumpL.image) {
                    this.image = this.sprites.jumpL.image
                    this.framesMax = this.sprites.jumpL.framesMax
                    this.framesCurrent = 0
                }    
                break;
            case 'jumpR':
                if (this.image !== this.sprites.jumpR.image) {
                    this.image = this.sprites.jumpR.image
                    this.framesMax = this.sprites.jumpR.framesMax
                    this.framesCurrent = 0
                }    
                break;
            case 'fallL':
                if (this.image !== this.sprites.fallL.image) {
                    this.image = this.sprites.fallL.image
                    this.framesMax = this.sprites.fallL.framesMax
                    this.framesCurrent = 0
                }   
                break;
            case 'fallR':
                if (this.image !== this.sprites.fallR.image) {
                    this.image = this.sprites.fallR.image
                    this.framesMax = this.sprites.fallR.framesMax
                    this.framesCurrent = 0
                }   
                break;
            case 'attackL':
                if (this.image !== this.sprites.attackL.image) {
                    this.image = this.sprites.attackL.image
                    this.framesMax = this.sprites.attackL.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attackR':
                if (this.image !== this.sprites.attackR.image) {
                    this.image = this.sprites.attackR.image
                    this.framesMax = this.sprites.attackR.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHitL':
                if (this.image !== this.sprites.takeHitL.image) {
                    this.image = this.sprites.takeHitL.image
                    this.framesMax = this.sprites.takeHitL.framesMax
                    this.framesCurrent = 0
                }
                break 
            case 'takeHitR':
                if (this.image !== this.sprites.takeHitR.image) {
                    this.image = this.sprites.takeHitR.image
                    this.framesMax = this.sprites.takeHitR.framesMax
                    this.framesCurrent = 0
                }
                break  
            case 'deathL':
                if (this.image !== this.sprites.deathL.image) {
                    this.image = this.sprites.deathL.image
                    this.framesMax = this.sprites.deathL.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'deathR':
                if (this.image !== this.sprites.deathR.image) {
                    this.image = this.sprites.deathR.image
                    this.framesMax = this.sprites.deathR.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}