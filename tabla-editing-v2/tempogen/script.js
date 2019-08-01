var synth = new Tone.MembraneSynth().toMaster()
var player = new Tone.Player('./sounds/up-long.wav').toMaster();
var beat = 0;

//this function is called right before the scheduled time
function triggerSum(time){
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C3', '4n', time)
    beat += 1
    showBeat();
}

function triggerBeats(time){
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C2', '4n', time)
    beat += 1
    showBeat()
}

//schedule a few notes
Tone.Transport.schedule(triggerSum, 0)
Tone.Transport.schedule(triggerBeats, '0:1')
Tone.Transport.schedule(triggerBeats, '0:2')
Tone.Transport.schedule(triggerBeats, '0:3')

//set the transport to repeat
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true

function showBeat() {
    t = $.now()
    $('#beat').text('Beat: ' + beat);
    console.log(beat, t);
}

function showBPM() {
    $('#bpm').text('BPM: '+ Tone.Transport.bpm.value.toFixed(2));
}


$("#toggle").click((e) => {
    if ($('#toggle').attr('aria-pressed') == 'false') {
        $('#toggle').text('Stop');
        // synth.triggerAttackRelease('C4', '8n');
        player.start();
        setTimeout(() => {
            Tone.Transport.toggle();    
        }, 2500);
    } else {
        $('#toggle').text('Start');
        Tone.Transport.toggle();
    }
    
    showBPM();
});

$("#speed-up").click(() => { 
    Tone.Transport.bpm.value += 20;
    showBPM();
});

$("#slow-down").click(() => {    
    Tone.Transport.bpm.value -= 20;
    showBPM();
});




var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    // console.log('MIDI data', data); // MIDI data [144, 63, 73]
    if (data[0] == 176) {
        if (data[1] == 1) {
            Tone.Transport.bpm.value = data[2] / 2 + 100;
            showBPM();
        }
    }
}

