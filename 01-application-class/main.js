"use strict";
var start = 0;
var lastTime = 0;
var count = 0;
function step(timeStamp) {
    if (!start)
        start = timeStamp;
    if (!lastTime)
        lastTime = timeStamp;
    var intervalMsec = timeStamp - lastTime;
    lastTime = timeStamp;
    count++;
    console.log("[" + count + "] timeStamp = " + timeStamp);
    console.log("[" + count + "] intervalMsec = " + intervalMsec);
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
