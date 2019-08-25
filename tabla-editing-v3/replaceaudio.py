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

def replace_audio (audio_file, video_file, anchoraudio='sounds/up-long.wav', tmpdir='tmp', force=False):
    assert os.path.exists(audio_file)
    assert os.path.exists(video_file)
    assert os.path.exists(anchoraudio)

    mkdirs(tmpdir)
    video_basename = os.path.basename(video_file)
    video_basename, ext = os.path.splitext(video_basename)
    audio_basename = os.path.basename(audio_file)
    audio_basename, _ = os.path.splitext(audio_basename)
    
    # extract audio from video_file    
    extracted_audio_file = '{}/extracted-{}.wav'.format(tmpdir,  video_basename)
    command = 'ffmpeg -y -i {} -vn -ar 44100 {}.wav'.format(
        video_file, extracted_audio_file)
    os.system(command)

    # find chirps in audio file and video file
    chirpFS, chirp = read_and_normalize_audio(anchoraudio)
    _FS1, clean_audio_data = read_and_normalize_audio(audio_file)
    _FS2, extracted_audio_data = read_and_normalize(extracted_audio_file)
    assert _FS1 == FS and _FS2 == FS

    audio_file_details = _get_chirp_time(chirp, clean_audio_data)
    video_file_details = _get_chirp_time(chirp, extracted_audio_data)
    
    # max length = chirp location + minimum length of video or audio
    max_length = min(
        audio_file_details['post chirp length'],
        video_file_details['post chirp length'])
    
    # trim to that, attach onto video
    command = 'ffmpeg -i {} -ss {} -t {} {}/trimmed-{}.wav'.format(
        audio_file,
        audio_file_details['start time'],
        max_length,
        tmpdir, audio_basename)
    os.system(command)


    command = 'ffmpeg -i {} -ss {} -t {} -an -r 25 {}/timmed-{}.mov'.format(
        video_file,
        video_file_Details['start time'],
        max_length,
        tmpdir, video_basename)
    os.system(command)
    
    # attach onto video
    glued_filename = '{}/glued-{}.mov'.format(tmpdir, video_basename)
    command = 'ffmpeg -i {}/timmed-{}.mov -i {}/timmed-{}.wav -shortest -c:v -copy -c:a mp3 -b:a 256k {}'.format(
        tmpdir, video_basename,
        tmpdir, audio_basename,
        glued_filename
    )
    os.system(command)

    return glued_filename

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser('--anchorsound', default='sounds/up-long.wav')
    parser = argparse.ArgumentParser('--audiofile')
    parser = argparse.ArgumentParser('videofiles', nargs='+')
    args = parser.parse_args()

    for filename in args.videofiles:
        print(replace_audio(args.audiofile, filename, anchoraudio=args.anchoraudio))

