var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.arc(0, 0, 30, 0, Math.PI * 2, false)
// ctx.fillStyle = this.color
// ctx.fill()
ctx.strokeStyle = 'black'
// ctx.lineWidth = 2
ctx.stroke()
// ctx.shadowBlur = 20
// ctx.shadowColor = 'white'
// ctx.globalAlpha = 0.9
ctx.closePath()