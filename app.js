var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')
var gravityOn = true

const minDXgravityOff = -2
const maxDXgravityOff = 2
const minDYgravityOff = 1
const maxDYgravityOff = 3

const minDXgravityOn = -150
const maxDXgravityOn = 150
const minDYgravityOn = 50
const maxDYgravityOn = 100

const minRadius = 10
const maxRadius = 40

const numCircles = 10

const gravityBtn = document.getElementById('buttonContainer')
gravityBtn.addEventListener('click', toggleGravity)

const btnTitle = document.getElementById('btnTitle')

const power = document.getElementById('power')

const colors = ['#4deeea', '#74ee15', '#ffe700', '#f000ff', '#001eff', '#ff0303', '#8400ff', '#00fff6', '#0028ff', '#00ff28', '#ffa300', '#cf0060', '#ff00ff', '#13a8fe', '#4e87a4', '#b0d5ce', '#fff1e4', '#fa86ab', '#ee2889','#7b297d', '#e87888', '#eae8e5', '#b1185a','#c351a2', '#efa9df', '#f3cff1']

var gravity = 3
var energyLoss = 0.85


function toggleGravity(){
    if (gravityOn){
        gravityOn = false
        power.className = 'powerOff'
        btnTitle.className = 'btnTitleOff'
        gravityBtn.classList.add('buttonConatinerOff')
        for (var i = 0; i < ballArray.length; i++){
            ballArray[i].turnGravityOff()
        }
    } else {
        gravityOn = true
        power.className = 'powerOn'
        btnTitle.className = 'btnTitleOn'
        gravityBtn.classList.remove('buttonConatinerOff')
        for (var j = 0; j < ballArray.length; j++){
            ballArray[j].turnGravityOn()
        }
    }
}


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
        // ctx.strokeStyle = this.stroke
        // ctx.lineWidth = 2
        // ctx.stroke()
        // ctx.shadowBlur = 20
        // ctx.shadowColor = 'white'
        // ctx.globalAlpha = 0.9
        ctx.closePath()
    }

    this.update = function(){
        if (gravityOn){
            if (this.y + this.radius + this.dy > canvas.height) {
                this.dy = -this.dy * energyLoss
                this.dx = this.dx * .95
            } else {
                this.dy += gravity
            }

            if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
                this.dx = -this.dx
            }

            this.y += this.dy
            this.x += this.dx

        } else {
            this.x += this.dx
            this.y -= this.dy

            if (this.y - this.radius - 2 <= 0){
                this.dy = 0
                this.dx = 0
            }

            if (this.x - this.dx - this.radius <= 0 || this.x + radius + this.dx >= canvas.width){
                this.dx = 0
            }
        }

        this.draw()
    }

    this.turnGravityOff = function(){
        this.dx = randomFloatFromRange(minDXgravityOff, maxDXgravityOff)
        this.dy = randomFloatFromRange(minDYgravityOff, maxDYgravityOff)
    }

    this.turnGravityOn = function(){
        this.dx = randomFloatFromRange(minDXgravityOn, maxDXgravityOn)
        this.dy = randomFloatFromRange(minDYgravityOn, maxDYgravityOn)
    }
}


var ball
var ballArray

function init(){
    gravityBtn.style.left = (window.innerWidth/2 - gravityBtn.offsetWidth/2) + 'px'
    btnTitle.className = 'btnTitleOn'
    power.className = 'powerOn'
    gravityOn = true
    ballArray = []
    for (var i = 0; i < numCircles; i++){
        var radius = randomIntFromRange(minRadius, maxRadius)
        var x = randomIntFromRange(radius, canvas.width - radius)
        var y = randomIntFromRange(radius, canvas.height/2)
        var dx = randomIntFromRange(minDXgravityOn, maxDXgravityOn)
        var color = colors[randomIntFromRange(0, colors.length-1)]
        var stroke = 'grey'
        ball = new Ball(x, y, dx, 2, radius, color, stroke)
        ballArray.push(ball)
    }
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

function randomFloatFromRange(min, max) {
    return Math.random() * (max - min + 1) + min
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})


init()
animate()