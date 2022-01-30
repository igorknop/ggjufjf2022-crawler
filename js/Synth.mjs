export default class Synth {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.oscList = [];
        this.mainGainNode = null;
    }


    setup() {
        this.noteFreq = createNoteTable();


        this.mainGainNode = this.audioContext.createGain();
        this.mainGainNode.connect(this.audioContext.destination);
        this.mainGainNode.gain.value = 1.0;

        // Create the keys; skip any that are sharp or flat; for
        // our purposes we don't need them. Each octave is inserted
        // into a <div> of class "octave".


        this.sineTerms = new Float32Array([0, 0, 1, 0, 1]);
        this.cosineTerms = new Float32Array(this.sineTerms.length);
        this.customWaveform = this.audioContext.createPeriodicWave(this.cosineTerms, this.sineTerms);

    }

    playTone(freq, duration) {
        let osc = this.audioContext.createOscillator();
        osc.connect(this.mainGainNode);

        let type = "custom";

        if (type == "custom") {
            osc.setPeriodicWave(this.customWaveform);
        } else {
            osc.type = type;
        }

        osc.frequency.value = freq;
        osc.start();
        
        this.oscList.push(osc);
        if(duration > 0) {
            setTimeout(((osc)=>() => {
                osc.stop();
            })(osc), duration);
        }
        return osc;

    }

    stop(n) {

        this.oscList[n].stop();
        delete this.oscList[n];
        delete this.dataset[n];
    }

    changeVolume(volume) {
        this.mainGainNode.gain.value = volume;
    }

}


function createNoteTable() {
    let noteFreq = [];
    for (let i = 0; i < 9; i++) {
        noteFreq[i] = [];
    }

    noteFreq[0]["A"] = 27.500000000000000;
    noteFreq[0]["A#"] = 29.135235094880619;
    noteFreq[0]["B"] = 30.867706328507756;

    noteFreq[1]["C"] = 32.703195662574829;
    noteFreq[1]["C#"] = 34.647828872109012;
    noteFreq[1]["D"] = 36.708095989675945;
    noteFreq[1]["D#"] = 38.890872965260113;
    noteFreq[1]["E"] = 41.203444614108741;
    noteFreq[1]["F"] = 43.653528929125485;
    noteFreq[1]["F#"] = 46.249302838954299;
    noteFreq[1]["G"] = 48.999429497718661;
    noteFreq[1]["G#"] = 51.913087197493142;
    noteFreq[1]["A"] = 55.000000000000000;
    noteFreq[1]["A#"] = 58.270470189761239;
    noteFreq[1]["B"] = 61.735412657015513;
    noteFreq[7]["C"] = 2093.004522404789077;
    noteFreq[7]["C#"] = 2217.461047814976769;
    noteFreq[7]["D"] = 2349.318143339260482;
    noteFreq[7]["D#"] = 2489.015869776647285;
    noteFreq[7]["E"] = 2637.020455302959437;
    noteFreq[7]["F"] = 2793.825851464031075;
    noteFreq[7]["F#"] = 2959.955381693075191;
    noteFreq[7]["G"] = 3135.963487853994352;
    noteFreq[7]["G#"] = 3322.437580639561108;
    noteFreq[7]["A"] = 3520.000000000000000;
    noteFreq[7]["A#"] = 3729.310092144719331;
    noteFreq[7]["B"] = 3951.066410048992894;

    noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
}