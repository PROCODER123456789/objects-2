img=""
status=""
objects= [];


function setup(){
    canvas=createCanvas(640,420);
    canvas.center;
    objectDetector = ml5.objectDetector("cocssd", modelLoaded)
    document.getElementById("status").innerHTML = "status : Detecting Objects"
}

function preload(){
    img= loadImage('dog_cat.jpg');
}

function draw(){
    image(img, 0,0, 640, 420);
    if (status !=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            fill("#FF0000")
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+""+percent+ "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    fill("#FF0000");
    text("dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30 ,60, 450, 350);

    fill("#FF0000");
    text("cat", 320, 120);
    noFill();
    stroke("FF0000");
    rect(300, 90, 270, 320);

}

function modelLoaded(){
    console.log("model loaded !");
    status=true;
    objectDetector.detect(img, gotresult);

}

function gotresult(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
}
