BLUE = ['blue']
GREEN = ['green']
GRAY = ['gray']
RED = ['red']
ORANGE = ['orange']
THEME_COLORS = GRAY * 16

"""
Notes
"""

class Piece ():
    def __init__ (self, title, notes, colors):
        self.title = title
        self.notes = notes
        self.colors = colors

class TablaNotes ():
    def __init__ (self, theme, kali):
        self.theme = theme
        self.kali = kali

    def V1 (self):
        notes = self.theme[0:4] * 2 + self.theme
        notes += self.kali[0:4] * 2 + self.theme
        return Piece(
            title='V1 (1-4, 1-4, 1-8)', 
            notes=notes, 
            colors=(BLUE * 4 + GREEN * 4 + self.theme_COLORS) * 2)
    
    def V2 (self):
        notes = self.theme[0:2] * 2 + self.theme[0:4] + self.theme
        notes += self.kali[0:2] * 2 + self.kali[0:4] + self.theme
        return Piece(
            title='V2 (12, 12, 1-4, 1-8)', 
            notes=notes, 
            colors=(BLUE * 2 + GREEN * 2 + ORANGE * 4 + self.theme_COLORS) * 2)
    
        
    def V3 (self):
        notes = self.theme[0:3] * 4 + self.theme[5:8]
        notes += self.kali[0:3] * 3 + self.theme[5:8]
        return Piece(
            title='V3 (123, 123, 123, 123, 5-8)', 
            notes=notes, 
            colors=(BLUE * 3 + GREEN * 3 + ORANGE * 3 + RED * 3 + GRAY * 4) * 2)
    
    def V4 (self):
        notes = self.theme[0:2] + self.theme[2:4] * 3 + self.theme
        notes += self.kali[0:2] + self.kali[2:4] * 3 + self.theme
        return Piece(
            title='V4 (12, 34, 34, 34, 1-8)', 
            notes=notes, 
            colors=(BLUE + GREEN * 3 + self.theme_COLORS) * 2)
    
    
    def V5 (self):
        notes = [self.theme[2]] * 3 + [self.theme[3]] + self.theme[0:4] + self.theme
        notes += [self.kali[2]] * 3 + [self.kali[3]] + self.kali[0:4] + self.theme
        return Piece(
            title='V5 (3334, 1-4, 1-8)', 
            notes=notes, 
            colors=(BLUE * 4 + GREEN * 4 + self.theme_COLORS) * 2)
    
    def V6 (self):
        notes = ([self.theme[2]] * 3 + [self.theme[3]]) * 2 + self.theme
        notes += ([self.kali[2]] * 3 + [self.kali[3]]) * 2 + self.theme
        return Piece(
            title='V6 (3334, 3334, 1-8)', 
            notes=notes, 
            colors=(BLUE * 8 + self.theme_COLORS) * 2)
    
    def TIHAI (self):
        notes = 3 * (self.theme + (self.theme[0:3] + [self.theme[2]] * 3) * 2 + ["Dha", "-"])
        return Piece(
            title='Tihai (1-8, 123, 333, 123, 333, Dha -) * 3', 
            notes=notes, 
            colors=GREEN * 22 + BLUE * 22 + ORANGE * 22)



"""
Snippets
    * Snippets are video files.
"""

def generate_lyrics_snippets (snippet):
    return Snippet(
        snippet.take.get_lyrics_file(), 
        snippet.from_beat, 
        snippet.length)

import os

def if_exists(filename):
    if os.path.exists(filename):
        return filename
    return None

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


import json
import scipy.signal as sps
import subprocess
import numpy as np

UPCHIRP = 'sounds/up-long.wav'

class Take ():
    def tempo_align_if_needed(self):
        self.tempo_aligned_file = '{}/adjusted-tempo.txt'.format(self.tmpdir)
        self.subtitles_file = '{}/subtitles.srt'.format(self.tmpdir)
        if not os.path.exists(self.tempo_aligned_file):
            # adjusted tempo 
            tempo_details = json.load(open(self.tempo_file, 'r'))

            # remove the audio file
            audio_tmp_file = '{}/audio-extracted.wav'.format(self.tmpdir)
            FFMPEG_CMD = 'ffmpeg -y -i {videofile} -vn -ar 44100 {audiofile}'
            subprocess.call(FFMPEG_CMD.format(
                videofile=self.video_file,
                audiofile=audio_tmp_file,
            ))

            UPFS, up = read_and_normalize_audio(UPCHIRP)
            FS, audio = read_and_normalize_audio(audio_tmp_file)
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

            ofile = open(self.tempo_aligned_file, 'w') 
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
            
            
            with open(self.subtitles_file, 'w') as f:
                for l in srt_lines:
                    f.write(l)


            




    def attach_clean_audio_if_needed (self):
        " take audio file "
        import replaceaudio
        self.video_file = replaceaudio.replace_audio(
            self.audio_file, 
            self.video_file, 
            tmpdir=self.tmpdir)
        

        


    def __init__ (self, basedir, basename):
        self.basename = basename
        self.basedir = basedir
        self.master_track = []
        self.tmpdir = '{}/{}/{}'.format(self.basedir, 'tmp', self.basename)
        
        # attach the audio file if it exists and if needed
        self.audio_file = if_exists('{}/{}/{}.wav'.format(basedir, 'audio', basename))
        self.video_file = if_exists('{}/{}/{}.mov'.format(basedir, 'video', basename))
        self.attach_clean_audio_if_needed()
        
        # create a separate file for tempo-aligned audio-attached file name
        self.tempo_file = if_exists('{}/{}/{}.json'.format(basedir, 'tempo', basename))
        assert (self.tempo_file is not None), 'Tempo file not found'
        self.tempo_align_if_needed()


    
    def add_lyrics (self, from_beats, notes, to_beat=None):
        " adds the notes to the master track of notes aligned by beat"
        if type(from_beats) is list:
            for from_beat in from_beats:
                to_beat = from_beat + len(notes)
                self.master_track.append((from_beat, to_beat))
        else:
            if to_beat is None:
                to_beat = from_beats + len(notes)
            self.master_track.append((from_beat, to_beat))
    
    def generate_lyrics (self, from_beat, to_beat, gridspec, cellname):
        " reference the master track of notes, pull out for these beats"
        " generate a video. put all this in one page. "
    
    def generate (self, from_beat, to_beat, gridspec, cellname):
        # ffmpeg -i {} -ss {} -to {} should work
        # need to go from *_beat to time in file.
        per_beat_time = open(self.tempo_aligned_file, 'r').readlines()
        per_beat_time = np.array(list(map(float, per_beat_time)))
        per_bar_times = {}
        for idx, s in enumerate(per_beat_time):
            if idx == len(per_beat_time) - 1:
                break
            next_s = per_beat_time[idx + 1]
            per_bar_times[idx] = [s, next_s]
        
        from_time = per_bar_times[from_beat]
        to_time = per_bar_times[to_beat]
        _spec = gridspec.spec[cellname]
        width = gridspec.width * _spec['colspan'] / _spec['cols']
        height = gridspec.height * _spec['rowspan'] / _spec['rows']
        self.generated_filename = '{}/snippet-{}-{}-{}-{}'.format(self.tmpdir, from_time, to_time, width, height)
        if not os.path.exists(self.generated_filename):
            cmd = 'ffmpeg -i input -vf '
            cmd += '-ss {} -to {} '.format(from_time, to_time)
            cmd += '"scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2"'.format(
                width=width,
                height=height
            )
            cmd += ' {}'.format(self.generated_filename)
            subprocess.call(cmd)
        
        return self.generated_filename



    def get_lyrics_file (self):
        # returns a take with this lyrics file
        "2"

    

class Snippet ():
    def __init__ (self, take, from_beat, length):
        self.take = take
        self.from_beat = from_beat
        self.to_beat = from_beat + length
        self.length = length


    def generate (self, gridspec, cellname):
        """
        call take.generate(from_beat, to_beat, gridspec, cellname)
        return file
        """
        return self.take.generate(
            self.from_beat, 
            self.to_beat, 
            gridspec, cellname)

"""
Locations
"""

class GridSpec ():
    def __init__ (self, width, height):
        self.width = width
        self.height = height
        self.spec = {}

    def add_cell (self, name, numrows, numcols, row, col, rowspan=1, colspan=1):
        self.spec[name] =  {
            "rows": numrows,
            "cols": numcols,
            "row": row,
            "col": col,
            "rowspan": rowspan,
            "colspan": colspan
        }

"""
Arrange
"""

def tile_files (sequenced_filenames):
    """
    arrange files in this grid
    """


    
    # for each video create map of the x/y offsets
    # already stored in sequenced['offset']

    cmd = 'ffmpeg'
    
    import hashlib
    basename = hashlib.md5(str(sequenced_filenames).encode('utf-8')).hexdigest()
    ofilename = 'tmp/{}.mov'.format(basename)
    if not os.path.exists(ofilename):
        input_str = ' '.join(['-i {}'.format(seq['filename']) for seq in sequenced_filenames])
        filter_input = ''.join(['[{}:v]'.format(idx) for idx in range(len(sequenced_filenames))])
        position_str = '|'.join(['{}_{}'.format(*seq['offset']) for seq in sequenced_filenames])

        filter_str = '{} xstack=inputs={}:layout={}[v]'.format(
            filter_input,
            len(sequenced_filenames),
            position_str)
        
        outfile = 'output.mp4'
        cmd = 'ffmpeg {input_str} -filter_complex "{filter_str}" -map "[v]" {ofilename}'.format(
            input_str=input_str,
            filter_str=filter_str,
            ofilename=ofilename)
        subprocess.call(cmd)
        
    return ofilename


def sequence_files (filenames):
    """
    Go through each file and append them together
    """
    import hashlib
    basename = hashlib.md5('---'.join(filenames).encode('utf-8')).hexdigest()
    ofilename = 'tmp/{}.mov'.format(basename) 

    if not os.path.exists(ofilename):
        listfilename = 'tmp/{}.txt'.format(basename)
        listfile = open(listfilename, 'w')
        for filename in filenames:
            listfile.write(filename + '\n')
        listfile.close()
            
        cmd = "ffmpeg -f concat -i {} -c copy {}".format(
            listfilename,
            ofilename
        )
    return ofilename


def find_offset (gridspec, cellname):
    _spec = gridspec.spec[cellname]
    width = gridspec.width * _spec['col'] / _spec['cols']
    height = gridspec.height * _spec['row'] / _spec['rows']
    return (width, height)


class Arrangement ():
    def __init__ (self):
        "1"
        self.sequences = []

    def add_sequence (self, gridspec, cellname, snippets_list):
        self.sequences.append({
            'gridspec': gridspec,
            'cellname': cellname,
            'snippets': snippets_list,
        })
    
    def generate (self):
        """
        arrangement->generate()
            * for each sequence,
                for each snippet call "snippet.generate(gridspec)"
                patch them together.
            * Using concat
        """
        # recursively generate for each arrangement
        sequenced_filenames = []

        for sequence in self.sequences:
            gridspec = sequence['gridspec']
            cellname = sequence['cellname']

            filenames = []
            for snippet in sequence['snippets_list']:
                filenames.append(snippet.generate(gridspec, cellname))
            
            # now, put it all together
            sequenced = sequence_files(filenames)
            sequenced_filenames.append({
                'offset': find_offset(gridspec, cellname),
                'filename': sequenced
            })
        
        # put them together in this grid
        tile_files(sequenced_filenames)
