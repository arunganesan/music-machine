from common import *

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


theme = "DheNe GeNe TakKa DheNe".split(' ')
theme += "GeNe DheNe GeNe TakKa".split(' ')
kali = "TeNe KeNe TakKa TeNe".split(' ')
kali += "KeNe DheNe GeNe TakKa".split(' ')

notes = TablaNotes(theme, kali)

"""
Place
"""
# theme.found_at({
#     T1: [54, 70, 86, 102],
#     T2: [44, 60],
#     T3: [56, 72], # best one
#     T4: [36, 52],
#     T5: [88, 104, 152, 168, 216, 232],
#     T7: [40, 56, 104]
# })
# v1.found_at({ T2: [76], T3: [88], T4: [68], T5: [120], T7: [72] })
# v2.found_at({ T2: [108], T3: [120], T4: [100], T5: [184] })
# v3.found_at({ T2: [172, 204], T3: [152], 
#     T4: [132],  # best one
#     T5: [264, 296] })

# v4.found_at({ T5: [344, 376] })
# v5.found_at({ T5: [472, 
#         520, 
#         552 # pretty good
#     ] })
# v6.found_at({ T5: [
#     600,  # maybe best one
#     632 # not that good
#     ] })
# tihai.found_at({ T7: [
#     408,  # fine
#     488, # fine
# ] })

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
        # automatically parse folders to find corresponding files like lyrics and tempo and multi-video
    
    def add_lyrics (self, from_beat, notes, to_beat=None):
        " adds the notes to the master track of notes aligned by beat"
        if to_beat is None:
            to_beat = from_beat + len(notes)
    
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

    
    
T3 = Take('take03')
T3.add_lyrics(56, notes.theme + notes.kali)
T3.add_lyrics(120, notes.V1())
T3.add_lyrics(152, notes.V3()) 

# theme.found_at({
#     T1: [54, 70, 86, 102],
#     T2: [44, 60],
#     T3: [56, 72], # best one
#     T4: [36, 52],
#     T5: [88, 104, 152, 168, 216, 232],
#     T7: [40, 56, 104]
# })
# v1.found_at({ T2: [76], T3: [88], T4: [68], T5: [120], T7: [72] })
# v2.found_at({ T2: [108], T3: [120], T4: [100], T5: [184] })
# v3.found_at({ T2: [172, 204], T3: [152], 
#     T4: [132],  # best one
#     T5: [264, 296] })

# v4.found_at({ T5: [344, 376] })
# v5.found_at({ T5: [472, 
#         520, 
#         552 # pretty good
#     ] })
# v6.found_at({ T5: [
#     600,  # maybe best one
#     632 # not that good
#     ] })
# tihai.found_at({ T7: [
#     408,  # fine
#     488, # fine
# ] })


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

theme = Snippet(T3, 56, 16)
v1 = Snippet(T5, 120, 32)
v2 = Snippet(T5, 184, 32)
v3 = Snippet(T4, 132, 32)
v4 = Snippet(T5, 376, 32)
v5 = Snippet(T5, 552, 32)
v6 = Snippet(T5, 600, 32)
tihai = Snippet(T7, 448, len(notes.TIHAI()))


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

grid = GridSpec(1000, 1000)
grid.add_cell('video-cell', 100, 1, 1, 1, 56, 1)
grid.add_cell('lyrics-cell', 100, 1, 57, 1, 44, 1)

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
arrangement = Arrangement()
arrangement.add_sequence(grid, 'video-cell', [theme, v1, v2, v3, v4, v5, v6, tihai])

# TODO we need to somehow extract the lyrics sequence from this
arrangement.add_sequence(grid, 'lyrics-cell', map(
    generate_lyrics_snippets, [theme, v1, v2, v3, v4, v5, v6, tihai]))