export type LineType = {
    lyrics: string,
    notes: string,
}

export type SongType = {
    raga: string,
    lines: LineType[],
    lyrics?: string,
    notes?: string,
};


export type ShrutiMap = { [key: string]: number };
export type TempoMap = { [key: string]: number };
export type SemitoneAndDuration = {
    semitone: number,
    duration: number,
};
