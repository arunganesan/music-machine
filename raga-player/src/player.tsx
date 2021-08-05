import type { SemitoneAndDuration } from './Types';
import { NOTE_RAGA_MAP, } from './database';
import _ from 'lodash';
import Tone from 'tone'


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const playSemitonesAndDurations = async (
    semitonesAndDuration: SemitoneAndDuration[],
    setActiveNoteIndex: (arg: number) => void,
) => {
    const synth = new Tone.AMSynth().toMaster();
    for (let i = 0; i < semitonesAndDuration.length; i++) {
        setActiveNoteIndex(i);
        if (semitonesAndDuration[i].semitone !== Infinity) {
            // @ts-ignore
            const frequency = Tone.Frequency('C4').transpose(semitonesAndDuration[i].semitone);
            synth.triggerAttackRelease(frequency, semitonesAndDuration[i].duration);
        }
        await sleep(semitonesAndDuration[i].duration);
        synth.triggerRelease();
        await sleep(50);
    }
    synth.triggerRelease();
}


export function getSemitoneAndDurationForBar(
    bar: string,
    shruti: number,
    lengthOfOneBar: number,
    mapping: { [key: string]: string }
): {
    'notes': string[],
    'sand': SemitoneAndDuration[]
} {
    let notes: string[] = [];

    // Break up into individual notes
    const noteGroups = bar.trim().split(' ');
    for (const noteGroup of noteGroups) {
        const tokens = noteGroup.split('');
        for (let i = 0; i < tokens.length; i++) {
            let note = tokens[i];
            if (i < tokens.length - 1 && !isNaN(parseInt(tokens[i+1]))) {
                note += tokens[i + 1];
                console.log('added');
                i += 1;
            }
            if (i < tokens.length - 1 && tokens[i + 1] === '.') {
                note += '.';
                i += 1;
            }
            notes.push(`${note}/${noteGroup.length}`)
        }
    }

    // Get the semitones and durations
    let semitoneAndDurations: SemitoneAndDuration[] = getSemitoneAndDuration(notes, shruti, 1000, mapping);

    // Adjust overall duration to fit in one bar
    const totalDuration = _.sumBy(semitoneAndDurations, semitoneAndDuration => semitoneAndDuration.duration);
    for (let i = 0; i < semitoneAndDurations.length; i++) {
        semitoneAndDurations[i].duration *= lengthOfOneBar / totalDuration;
    }

    return {
        'notes': notes,
        'sand': semitoneAndDurations
    };
}

export function getSemitoneAndDuration(
    notes: string[],
    shruti: number,
    speed: number,
    mapping: { [key: string]: string }
): SemitoneAndDuration[] {
    let semitoneAndDurations: SemitoneAndDuration[] = [];

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let duration = speed;
        if (note.includes('/')) {
            duration /= parseInt(note.slice(-1));
            note = note.slice(0, note.indexOf('/'));
        } else if (note.includes('*')) {
            duration *= parseInt(note.slice(-1));
            note = note.slice(0, note.indexOf('*'));
        }

        let octave = 0;
        if (note.includes('.')) {
            note = note.replace('.', '');
            octave = -1;
        } else if (note.toLowerCase() !== note) {
            note = note.toLowerCase();
            octave = 1;
        }

        const mappednote = _.has(mapping, note) ? mapping[note] : note;
        const semitone = (mappednote === '_') ? Infinity : NOTE_RAGA_MAP.indexOf(mappednote) + octave * 12 + shruti;
        semitoneAndDurations.push({
            'semitone': semitone,
            'duration': duration
        });
    }

    return semitoneAndDurations;
}
