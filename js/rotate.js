let origin = {}
let bigRadius = 0
let smallRadius1 = 0
let smallRadius2 = 0

let big = document.querySelector('.big-circle');
let small1 = document.querySelector('.small-circle-1');
let small2 = document.querySelector('.small-circle-2');
let small1a = document.querySelector('.small-circle-1 .content');
let small2b = document.querySelector('.content-wrap .content');

function getOriginAndRadius() {
  let bigRect = big.getBoundingClientRect()
  let bigW = big.offsetWidth
  let smallW1 = small1.offsetWidth
  let smallW2 = small2.offsetWidth
  origin.x = bigRect.left + bigW / 2
  origin.y = bigRect.top + bigW / 2
  bigRadius = bigW / 2
  smallRadius1 = smallW1 / 2
  smallRadius2 = smallW2 / 2
}

window.onload = window.onresize = getOriginAndRadius

function rotate(event) {
  event = event || window.event
  let {x, y} = event
  if (typeof x === 'undefined') {
    if (event.changedTouches && event.changedTouches.length > 0) {
      x = event.changedTouches[0].clientX
      y = event.changedTouches[0].clientY
    }
  }
  let deg = Math.atan(Math.abs((y - origin.y) / (x - origin.x))) * 180 / Math.PI
  let bLeft = smallRadius2 * Math.cos(deg * Math.PI / 180)
  let bTop = smallRadius2 * Math.sin(deg * Math.PI / 180)
  // 一象限
  if (x - origin.x > 0 && y - origin.y < 0) {
    deg = 90 - deg
    bLeft += smallRadius2
    bTop = smallRadius2 - bTop
  }
  // 四象限
  if (x - origin.x > 0 && y - origin.y >= 0) {
    deg = 90 + deg
    bLeft += smallRadius2
    bTop = smallRadius2 + bTop
  }
  // 二象限
  if (x - origin.x < 0 && y - origin.y <= 0) {
    deg = 270 + deg
    bLeft = smallRadius2 - bLeft
    bTop = smallRadius2 - bTop
  }
  // 三象限
  if (x - origin.x <= 0 && y - origin.y > 0) {
    deg = 270 - deg
    bLeft = smallRadius2 - bLeft
    bTop = smallRadius2 + bTop
  }
  console.log(deg)
  
  big.style.transform = `translate3d(-50%, -50%, 0) rotate(${deg}deg)`
  small1.style.transform = `translate3d(-50%, -50%, 0) rotate(${deg}deg)`
  small2.style.transform = `translate3d(-50%, -50%, 0) rotate(${deg}deg)`
  small2b.style.top = `${bTop}px`
  small2b.style.left = `${bLeft}px`
}

document.onmousemove = document.ontouchmove = rotate