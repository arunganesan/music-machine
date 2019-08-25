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


class Take ():
    def tempo_align_if_needed(self):
        tempo_aligned_file = '{}/{}/{}/adjusted-tempo.txt'.format(basedir, 'tmp', self.basename)
        if os.path.exists(tempo_aligned_file):
            return ..
        
        generate it and return the file NameError
        actually... this just generates. no need to return i think
        FFMPEG_CMD = 'ffmpeg -y -i {videofile} -vn -ar 44100 {audiofile}'

    def attach_clean_audio_if_needed (self):
        " take audio file "

    def __init__ (self, basedir, basename):
        self.basename = basename
        self.basedir = basedir
        self.master_track = []

        # automatically parse folders to find corresponding files like lyrics and tempo and multi-video
        self.audio_file = if_exists('{}/{}/{}.wav'.format(basedir, 'audio', basename))
        self.tempo_file = if_exists('{}/{}/{}.json'.format(basedir, 'tempo', basename))
        assert self.tempo_file is not None, 'Tempo file not found'
        self.video_file = if_exists('{}/{}/{}.MOV'.format(basedir, 'video', basename))

        self.tempo_align_if_needed()
        self.attach_clean_audio_if_needed()
        # attach the audio file if it exists and if needed
        # create a separate file for tempo-aligned audio-attached file name
        # all this only needs to happen once


    
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
        # the following two should have already happened
        " first make sure the audio is aligned " 
        " and make sure the tempo file is aligned "

        # ffmpeg -i {} -ss {} -to {} should work
        # need to go from *_beat to time in file. 
        # this is done through the adjusted tempo file
        " then take this subset, trim, create file, return file name "


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
        self.take.generate(
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
    ffmpeg_command = "ffmpeg -y <list of input files> -filter_complex <set full size>"
    for idx, sequenced in enumerate(sequenced_filenames):
        x,y = sequenced['offset']
        if idx == 0:
            command += ' [base][video-{c}] overlay=shortest=1:x={x}:y={y} [tmp{n}];'.format(c=idx, n=idx+1, x=x, y=y)
        elif idx == len(sequenced_filenames) - 1:
            command += ' [tmp{c}][video-{c}] overlay=shortest=1:x={x}:y={y}'.format(c=idx, x=x, y=y)
        else:
            command += ' [tmp{c}][video-{c}] overlay=shortest=1:x={x}:y={y} [tmp{n}];'.format(c=idx, n=idx+1, x=x, y=y)

def sequence_files (filenames):
    """
    Go through each file and append them together
    """
    new_filename = ""
    return new_filename

def find_offset (gridspec, cellname):
    return 1, 2


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
