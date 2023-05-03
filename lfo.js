var AudioContext = window.AudioContext ||
  window.webkitAudioContext;

const context = new AudioContext();
const masterVolume = context.createGain();
masterVolume.connect(context.destination);
masterVolume.gain.setValueAtTime(0.2, 0);

const playButton = document.querySelector('button');
const vibratoAmountControl = document.querySelector('#vibrato-amount-control');
const vibratoSpeedControl = document.querySelector('#vibrato-speed-control');

let vibratoAmount = 0.5
let vibratoSpeed = 10

vibratoAmountControl.addEventListener('input', function(){
	vibratoAmount = this.value
});

vibratoSpeedControl.addEventListener('input', function(){
	vibratoSpeed = this.value
});


playButton.addEventListener('click', function() {
	const osc = context.createOscillator();
  const noteGain = context.createGain();
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  
  noteGain.gain.setValueAtTime(0, 0);
  noteGain.gain.linearRampToValueAtTime(0.8, context.currentTime + 0.3);
  noteGain.gain.setValueAtTime(0.8, context.currentTime + 1 - 0.3);
  noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 1);
  
  lfo.frequency.setValueAtTime(vibratoSpeed, 0);
  lfo.connect(lfoGain);
  lfo.start(0);
  lfo.stop(context.currentTime + 1);
  
  lfoGain.gain.setValueAtTime(vibratoAmount, 0)
  lfoGain.connect(osc.frequency)
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, 0);
  osc.start(0);
  osc.stop(context.currentTime + 1);
	osc.connect(noteGain);
  noteGain.connect(masterVolume);
});
