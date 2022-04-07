function detectObjectCollision({ object1, object2}) {
    return (
        object1.attackBox.position.x + object1.attackBox.width >= object2.position.x 
        && object1.attackBox.position.x - 50 <= object2.position.x + object2.width 
        && object1.attackBox.position.y + object1.attackBox.height >= object2.position.y 
        && object1.attackBox.position.y <= object2.position.y + object2.height)
}
 