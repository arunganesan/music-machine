export type Line = {
    lyrics: string,
    notes: string,
}

export type Song = {
    raga: string,
    lines: Line[],
    lyrics?: string,
    notes?: string,
};


export type ShrutiMap = { [key: string]: number };
export type TempoMap = { [key: string]: number };
export type SemitoneAndDuration = {
    semitone: number,
    duration: number,
};
