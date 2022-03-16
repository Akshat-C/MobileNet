prev_res = "";

function preload()
{}

function setup()
{
    canvas = createCanvas(350, 300);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();

    classifier = ml5.imageClassifier('mobileNet', modelLoaded)
}

function draw()
{
    image(video, 0, 0, 350, 300);
    classifier.classify(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    } else 
    {
        if ((results[0].confidence > 0.5 ) && (prev_res != results[0].label))
        {
            console.log(results);
            prev_res = results[0].label;
            document.getElementById("obj_name").innerHTML = results[0].label;
            document.getElementById("accu").innerHTML = (results[0].confidence*100).toFixed(2)+"%";
    
            synth = window.speechSynthesis;
            speak_data = "Object detected is: " + results[0].label;
            console.log(speak_data);
            utter_this = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utter_this);
        }
        
    }
}

function modelLoaded()
{
    console.log("Model is Loaded");
}



