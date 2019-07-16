#! /usr/bin/env python3

import argparse
import numpy as np
import scipy.signal as sps
import subprocess

UPCHIRP = 'sounds/up-long.wav'
AUDIO = 'recordings/audio.wav'
OFILE = 'recordings/tempo.txt'
FFMPEG_CMD = 'ffmpeg -y -i {videofile} -vn -ar 44100 {audiofile}'

def read_and_normalize_audio (audiofile):
  from scipy.io import wavfile
  rate, signal = wavfile.read(audiofile)
  converted = np.array(signal, dtype=np.float64)
  normalized = converted / np.amax(converted)
  return rate, normalized 

def format_secs (secs):
    mins = int(secs // 60)
    secs -= mins * 60
    int_secs = int(secs // 1)
    fractional = secs - int_secs
    ms = int(fractional * 1000)
    return '00:{:02d}:{:02d},{}'.format(mins, int_secs, ms)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--media', default='recordings/teentaal-07.02.2019.mp4')
    parser.add_argument('--tempo', default='recordings/teentaal-07.02.2019.txt')
    parser.add_argument('--snippet', nargs=2, type=int, default=[13, 16])
    args = parser.parse_args()
    
    # 1. Find the chirp = t0.
    cmd = FFMPEG_CMD.format(videofile=args.media, audiofile=AUDIO)
    subprocess.call(cmd, shell=True)
    
    UPFS, up = read_and_normalize_audio(UPCHIRP)
    FS, audio = read_and_normalize_audio(AUDIO)
    upxcorr = sps.fftconvolve(audio, up[::-1], mode='full')
    start_time = np.argmax(upxcorr) / float(FS)
    
    # 2. Set the tempo track to start from t0 + 2.5. In the future, we'll do this more systematically
    old_tempo_track = []
    with open(args.tempo, 'r') as f:
        for line in f.readlines():
            ms = int(line.strip().split(' ')[1])
            old_tempo_track.append(ms)
    
    new_tempo_track = []
    first_beat = start_time + 0.5 # the xcorr finds the END of the chirp, I think
    print(start_time, first_beat)
    for ms in old_tempo_track:
        elapsed_ms = ms - old_tempo_track[0]
        new_tempo_track.append(first_beat + elapsed_ms / 1000.0)
    
        

    # create subtitles that match this time
    # for debug purposes
    srt_lines = []

    ofile = open(OFILE, 'w') 
    for idx in range(1, len(new_tempo_track)):
        ofile.write('{}\n'.format(new_tempo_track[idx-1]))
        srt_lines.append('''{idx}
{fromt} --> {tot}
Beat {idx}

'''.format(
                fromt=format_secs(new_tempo_track[idx-1]),
                tot=format_secs(new_tempo_track[idx]),
                idx=idx))
    ofile.close()

    ofile = 'recordings/subtitles.srt'
    with open(ofile, 'w') as f:
        for l in srt_lines:
            f.write(l)

    
if __name__ == '__main__':
    main()