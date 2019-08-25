#! /usr/bin/env python3

import numpy as np
import os

def read_and_normalize_audio (audiofile):
    from scipy.io import wavfile
    rate, signal = wavfile.read(audiofile)
    converted = np.array(signal, dtype=np.float64)
    normalized = converted / np.amax(converted)
    return rate, normalized 

def mkdirs(name):
    if not os.path.exists(name):
        os.makedirs(name)
    return name