const audio = new Audio();
audio.loop = true;
audio.crossOrigin = "anonymous";
audio.addEventListener('canplay', handleCanplay);
audio.src = "https://raw.githack.com/knee-son/fictional-succotash/main/Brent%20Fayaz%20-%20Dead%20Man%20Walking.mp3";
audio.load();

const vboxcanvas = document.querySelector('#visualizer');
const vbox = vboxcanvas.getContext('2d');

const mcanvas = document.querySelector('#menu');
const mbox = mcanvas.getContext('2d');
mbox.font = "20px Georgia";
mbox.fillText("Hello World!", 10, 50);

function run(){
    audio.play();
    document.getElementById("menu").style.display = 'none';
}

function render() {
    // make a Web Audio Context
    const context = new AudioContext();
    const analyser = context.createAnalyser();

    // Make a buffer to receive the audio data
    const numPoints = analyser.frequencyBinCount;
    const audioDataArray = new Uint8Array(numPoints);
    
    const width = mbox.canvas.width;
    const height = mbox.canvas.height;

    mbox.clearRect(0, 0, width, height);

    // get the current audio data
    analyser.getByteFrequencyData(audioDataArray);

    const size = 1;

    // draw a point every size pixels
    for (let x = 0; x < width; x += size) {
        // compute the audio data for this point
        const ndx = x * numPoints / width | 0;
        // get the audio data and make it go from 0 to 1
        const audioValue = audioDataArray[ndx] / 255;
        // draw a rect size by size big
        const y = audioValue * height;
        vbox.fillRect(x, y, size, size);
    }
    
    requestAnimationFrame(render);
    function handleCanplay() {
        // connect the audio element to the analyser node and the analyser node
        // to the main Web Audio context
        const source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
    }
}
requestAnimationFrame(render);
