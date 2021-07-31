import type { SongType, SemitoneAndDuration } from './Types';
import { NOTE_RAGA_MAP, RAGAS, SONGS } from './database';
import _ from 'lodash';


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
            if (i < tokens.length - 1 && tokens[i + 1] == '.') {
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



export function getSemitonesAndDurationOfSong(song: SongType, shruti: number, speed: number): SemitoneAndDuration[] {
    const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
    let mapping: { [key: string]: string } = {};
    ragaNotes.forEach(note => {
        note = note.replace('^', '').replace('.', '');
        if (/\d/.test(note)) {
            const basenote = note.replace(/\d/, '');
            mapping[basenote] = note;
        }
    });
    const notes = _.join(song.lines.map(line => line.notes), ' ').split(' ')
    return getSemitoneAndDuration(notes, shruti, speed, mapping);
}
