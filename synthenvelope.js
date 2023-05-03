var AudioContext = window.AudioContext ||
  window.webkitAudioContext;

const context = new AudioContext();
const button = document.querySelector('button');
const volumeGain = context.createGain();
volumeGain.connect(context.destination);
volumeGain.gain.value = 0.1

let attackTime = 0.3
let sustainLevel = 0.8
let releaseTime = 0.3

const volumeControl = document.querySelector('#volume-control');
const attackControl = document.querySelector('#attack-control');
const releaseControl = document.querySelector('#release-control');

volumeControl.addEventListener('input', function(){
	volumeGain.gain.value = this.value;
});

attackControl.addEventListener('input', function(){
	attackTime = parseFloat(this.value)
})

releaseControl.addEventListener('input', function(){
	releaseTime = parseFloat(this.value)
})

button.addEventListener('click', function(){
	const osc = context.createOscillator();
  const noteGain = context.createGain();
  noteGain.gain.setValueAtTime(0, 0);
  noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + attackTime);
  noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + 1 - releaseTime);
  noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 1);
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, 0);
  osc.start(0);
  osc.stop(context.currentTime + 1);
	osc.connect(noteGain);
  noteGain.connect(volumeGain)
});
