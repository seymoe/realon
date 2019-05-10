let start: number = 0
let lastTime: number = 0
let count: number = 0

function step(timeStamp: number): void {
  if (!start) start = timeStamp
  if (!lastTime) lastTime = timeStamp

  let intervalMsec: number = timeStamp - lastTime
  lastTime = timeStamp
  count++

  console.log(`[${count}] timeStamp = ${timeStamp}`)
  console.log(`[${count}] intervalMsec = ${intervalMsec}`)

  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
