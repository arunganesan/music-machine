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
    

class Take ():
    def __init__ (self, filename):
        self.filename = filename
        self.master_track = []
        # automatically parse folders to find corresponding files like lyrics and tempo and multi-video
    
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
        " first make sure the audio is aligned "
        " and make sure the tempo file is aligned "
        " then take this subset, trim, create file, return file name "
        " lol the actual work happens here "

    def get_camera (self):
        "1"
    
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
