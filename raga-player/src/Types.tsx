export type SongType = {
    raga: string,
    lyrics: string,
    notes: string,
    tracks?: any
};


export type ShrutiMap = { [key: string]: number };
export type TempoMap = { [key: string]: number };
export type SemitoneAndDuration = {
    semitone: number,
    duration: number,
};
