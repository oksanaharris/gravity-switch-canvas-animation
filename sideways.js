let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth/4*3
canvas.height = window.innerHeight/4*3

let ctx = canvas.getContext('2d')

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity = 2
var energyLoss = 0.85

function Ball (x, y, dx, dy, radius, color, stroke){
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
    this.stroke = stroke

    this.draw = function(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.strokeStyle = this.stroke
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.closePath()
    }

    this.update = function(){
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * energyLoss
        } else {
            this.dy += gravity
        }

        if (this.x + this.radius + this.dx > canvas.width){
          this.dx = -this.dx * energyLoss
        } else {
          this.dx += gravity
        }

        this.y += this.dy
        this.x += this.dx
        // this.dx = this.dx * 0.99



        this.draw()
    }

}

// let ballArray = []

// for (var i = 0; i < ballArray.length; i++){
//     let ball = new Ball(x, y, 30, 'red')
// }

var ball
var ballArray = []

function init(){
    for (var i = 0; i < 100; i++){
        var radius = randomIntFromRange(10, 90)
        var x = randomIntFromRange(radius, canvas.width - radius)
        var y = randomIntFromRange(radius, canvas.height/2)
        var dx = randomIntFromRange(-4,4)
        var color = colors[randomIntFromRange(0, colors.length-1)]
        var stroke = 'grey'
        ballArray.push(new Ball(x, y, dx, 2, radius, color, stroke))
    }

    console.log(ballArray);

}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (var i = 0; i < ballArray.length; i++){
        ballArray[i].update()
    }

}


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


init()
animate()