
class Piece ():
    def __init__ (self, title, notes, colors):
        self.title = title
        self.notes = notes
        self.colors = colors
    
    def found_at (self, locations):
        self.locations = locations

    
T1 = 'take01'
T2 = 'take02'
T3 = 'take03'
T4 = 'take04'
T5 = 'take05'
T7 = 'take07'

BLUE = ['blue']
GREEN = ['green']
GRAY = ['gray']
RED = ['red']
ORANGE = ['orange']
THEME_COLORS = GRAY * 16


def Theme (THEME, KALI):
    return Piece(
        title='Theme',
        notes=THEME + KALI,
        colors=THEME_COLORS)

def V1 (THEME, KALI):
    notes = THEME[0:4] * 2 + THEME
    notes += KALI[0:4] * 2 + THEME
    return Piece(
        title='V1 (1-4, 1-4, 1-8)', 
        notes=notes, 
        colors=(BLUE * 4 + GREEN * 4 + THEME_COLORS) * 2)

def V2 (THEME, KALI):
    notes = THEME[0:2] * 2 + THEME[0:4] + THEME
    notes += KALI[0:2] * 2 + KALI[0:4] + THEME
    return Piece(
        title='V2 (12, 12, 1-4, 1-8)', 
        notes=notes, 
        colors=(BLUE * 2 + GREEN * 2 + ORANGE * 4 + THEME_COLORS) * 2)

    
def V3 (THEME, KALI):
    notes = THEME[0:3] * 4 + THEME[5:8]
    notes += KALI[0:3] * 3 + THEME[5:8]
    return Piece(
        title='V3 (123, 123, 123, 123, 5-8)', 
        notes=notes, 
        colors=(BLUE * 3 + GREEN * 3 + ORANGE * 3 + RED * 3 + GRAY * 4) * 2)

def V4 (THEME, KALI):
    notes = THEME[0:2] + THEME[2:4] * 3 + THEME
    notes += KALI[0:2] + KALI[2:4] * 3 + THEME
    return Piece(
        title='V4 (12, 34, 34, 34, 1-8)', 
        notes=notes, 
        colors=(BLUE + GREEN * 3 + THEME_COLORS) * 2)


def V5 (THEME, KALI):
    notes = [THEME[2]] * 3 + [THEME[3]] + THEME[0:4] + THEME
    notes += [KALI[2]] * 3 + [KALI[3]] + KALI[0:4] + THEME
    return Piece(
        title='V5 (3334, 1-4, 1-8)', 
        notes=notes, 
        colors=(BLUE * 4 + GREEN * 4 + THEME_COLORS) * 2)

def V6 (THEME, KALI):
    notes = ([THEME[2]] * 3 + [THEME[3]]) * 2 + THEME
    notes += ([KALI[2]] * 3 + [KALI[3]]) * 2 + THEME
    return Piece(
        title='V6 (3334, 3334, 1-8)', 
        notes=notes, 
        colors=(BLUE * 8 + THEME_COLORS) * 2)

def TIHAI (THEME, KALI):
    notes = 3 * (THEME + (THEME[0:3] + [THEME[2]] * 3) * 2 + ["Dha", "-"])
    return Piece(
        title='Tihai (1-8, 123, 333, 123, 333, Dha -) * 3', 
        notes=notes, 
        colors=GREEN * 22 + BLUE * 22 + ORANGE * 22)