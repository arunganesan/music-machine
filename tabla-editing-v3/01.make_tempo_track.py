#! /usr/bin/env python3.7

from glob import glob

import argparse
import json
import numpy as np
import os
import scipy.signal as sps
import subprocess

UPCHIRP = 'sounds/up-long.wav'

ODIR = 'tmp'
SUBS_OFILE = 'subtitles.srt'
AUDIO = 'audio.wav'
TEMPO_OFILE = 'adjusted-tempo.txt'
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
    parser.add_argument('basedir')
    args = parser.parse_args()
    
    video_files = glob('{}/video/*.MOV'.format(args.basedir))
    for video_file in video_files:
        basename = os.path.basename(video_file)
        basename, _ = os.path.splitext(basename)
        tempo_file = '{}/tempo/{}.json'.format(args.basedir, basename)
        if not os.path.exists(tempo_file):
            continue
        
        tempo_details = json.load(open(tempo_file, 'r'))
        
        odir = '{}/{}/{}'.format(args.basedir, ODIR, basename)
        if not os.path.exists(odir):
            os.makedirs(odir)
        
        # 1. Find the chirp = t0.
        audio_ofile = '{}/{}'.format(odir, AUDIO)
        cmd = FFMPEG_CMD.format(videofile=video_file, audiofile=audio_ofile)
        subprocess.call(cmd, shell=True)
        
        UPFS, up = read_and_normalize_audio(UPCHIRP)
        FS, audio = read_and_normalize_audio(audio_ofile)
        audio = audio[:, 0]
        upxcorr = sps.fftconvolve(audio, up[::-1], mode='full')
        start_time = np.argmax(upxcorr) / float(FS)
        
        # 2. Set the tempo track to start from t0 + 2.5. In the future, we'll do this more systematically
        old_tempo_track = np.ndarray(len(tempo_details))
        for details in tempo_details:
            beat= details['beat'] - 1
            ms = details['time']
            old_tempo_track[beat] = ms
        
        new_tempo_track = []
        first_beat = start_time + 0.5 # the xcorr finds the END of the chirp, I think
        print(start_time, first_beat)
        for ms in old_tempo_track:
            elapsed_ms = ms - old_tempo_track[0]
            new_tempo_track.append(first_beat + elapsed_ms / 1000.0)
        
            

        # create subtitles that match this time
        # for debug purposes
        srt_lines = []

        tempo_ofile = '{}/{}'.format(odir, TEMPO_OFILE)
        ofile = open(tempo_ofile, 'w') 
        for idx in range(1, len(new_tempo_track)):
            ofile.write('{}\n'.format(new_tempo_track[idx-1]))
            srt_lines.append('''{idx}
    {fromt} --> {tot}
    Beat {idx}

    '''.format(
                    fromt=format_secs(new_tempo_track[idx-1]),
                    tot=format_secs(new_tempo_track[idx]),
                    idx=idx-1))
        ofile.close()

        ofile = '{}/subtitles.srt'.format(odir)
        with open(ofile, 'w') as f:
            for l in srt_lines:
                f.write(l)

    
if __name__ == '__main__':
    main()
