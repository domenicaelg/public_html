let angle = 300;
let motion = false

function onframe() {
    console.log("Hello World")    
    if(motion==false)
    {
        angle += 0.5
    }
    else
    {
        angle -= 0.5
    }
    if(angle == 400)
        motion = true
    if(angle == 300)
        motion = false

    let angle2 = angle + 180;
    document.body.style="background-color: hsl(" + angle +  "deg, 100%, 50%); --rotation: " + angle2 + "deg"
    
    requestAnimationFrame(onframe)
}

onframe()
