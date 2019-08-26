#! /usr/bin/env python3

from common import *

import numpy as np
import os
import scipy.signal as sps

FS = 44100

def _get_chirp_time (chirpdata, audiodata):
    if len(audiodata.shape) > 1:
        audiodata = audiodata[:,0]
    upxcorr = sps.fftconvolve(audiodata, chirpdata[::-1], mode='full')
    chirp_time = np.argmax(upxcorr)  / FS
    length = len(audiodata) / FS
    return {
        'start time': chirp_time, 
        'length': length,
        'post chirp length': length - chirp_time
    }

def need_to_generate (filename, force):
    return not os.path.exists(filename) or force

def replace_audio (
    audio_file, video_file, 
    anchoraudio='sounds/up-long.wav', tmpdir='tmp', 
    force=False):

    assert os.path.exists(audio_file)
    assert os.path.exists(video_file)
    assert os.path.exists(anchoraudio)

    mkdirs(tmpdir)
    video_basename = os.path.basename(video_file)
    video_basename, ext = os.path.splitext(video_basename)
    audio_basename = os.path.basename(audio_file)
    audio_basename, _ = os.path.splitext(audio_basename)
    extracted_audio_file = '{}/extracted-{}.wav'.format(tmpdir,  video_basename)
    glued_filename = '{}/glued-{}.mov'.format(tmpdir, video_basename)
    trimmed_audiofile = '{}/trimmed-{}.wav'.format(tmpdir, audio_basename)
    trimmed_videofile = '{}/timmed-{}.mov'.format(tmpdir, video_basename)
    
    # extract audio from video_file
    if need_to_generate(extracted_audio_file, force):
        command = 'ffmpeg -y -i {} -vn -ar 44100 {}'.format(
            video_file, extracted_audio_file)
        os.system(command)

    # find chirps in audio file and video file
    chirpFS, chirp = read_and_normalize_audio(anchoraudio)
    _FS1, clean_audio_data = read_and_normalize_audio(audio_file)
    _FS2, extracted_audio_data = read_and_normalize_audio(extracted_audio_file)
    assert _FS1 == FS and _FS2 == FS

    audio_file_details = _get_chirp_time(chirp, clean_audio_data)
    video_file_details = _get_chirp_time(chirp, extracted_audio_data)
    
    # max length = chirp location + minimum length of video or audio
    max_length = min(
        audio_file_details['post chirp length'],
        video_file_details['post chirp length'])
    
    # trim to that, attach onto video
    if need_to_generate(trimmed_audiofile, force):
        command = 'ffmpeg -i {} -ss {} -t {} {}'.format(
            audio_file,
            audio_file_details['start time'],
            max_length,
            trimmed_audiofile)
        os.system(command)


    if need_to_generate(trimmed_videofile, force):
        command = 'ffmpeg -i {} -ss {} -t {} -an -r 25 {}'.format(
            video_file,
            video_file_details['start time'],
            max_length,
            trimmed_videofile)
        os.system(command)
        
    # attach onto video
    if need_to_generate(glued_filename, force):
        command = 'ffmpeg -i {} -i {} -shortest -c:v copy -c:a mp3 -b:a 256k {}'.format(
            trimmed_videofile,
            trimmed_audiofile,
            glued_filename
        )
        os.system(command)

    return glued_filename

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--anchoraudio', default='sounds/up-long.wav')
    parser.add_argument('--audiofile')
    parser.add_argument('videofiles', nargs='+')
    args = parser.parse_args()

    for filename in args.videofiles:
        print(replace_audio(args.audiofile, filename, anchoraudio=args.anchoraudio))

