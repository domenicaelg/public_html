let angle = 0;


function onframe() {
    console.log("Hello World")
    
    angle+=1
    let angle2 = angle + 180;
    document.body.style="background-color: hsl(" + angle +  "deg, 100%, 50%); --rotation: " + angle2 + "deg"
    
    requestAnimationFrame(onframe)
}

onframe()