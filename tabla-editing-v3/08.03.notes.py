from classes import *

# notes
theme = "DheNe GeNe TakKa DheNe".split(' ')
theme += "GeNe DheNe GeNe TakKa".split(' ')
kali = "TeNe KeNe TakKa TeNe".split(' ')
kali += "KeNe DheNe GeNe TakKa".split(' ')
notes = TablaNotes(theme, kali)

BASEDIR = 'recordings/08.03.2019'
T1 = Take(BASEDIR, 'take01')
T2 = Take(BASEDIR, 'take02')
T3 = Take(BASEDIR, 'take03')
T4 = Take(BASEDIR, 'take04')
T5 = Take(BASEDIR, 'take05')
T6 = Take(BASEDIR, 'take06')
T7 = Take(BASEDIR, 'take07')

# theme, kali
theme_kali = notes.theme + notes.kali
T1.add_lyrics([54, 70, 86, 102], theme_kali) 
T2.add_lyrics([44, 60], theme_kali)
T3.add_lyrics([56, 72], theme_kali) # 72 is best one
T4.add_lyrics([36, 52], theme_kali)
T5.add_lyrics([88, 104, 152, 168, 216, 232], theme_kali)
T7.add_lyrics([40, 56, 104], theme_kali)

# v1
T2.add_lyrics(76, notes.V1())
T3.add_lyrics(88, notes.V1())
T4.add_lyrics(68, notes.V1())
T5.add_lyrics(120, notes.V1())
T7.add_lyrics(72, notes.V1())

# v2
T2.add_lyrics(108, notes.V2())
T3.add_lyrics(120, notes.V2())
T4.add_lyrics(100, notes.V2())
T5.add_lyrics(184, notes.V2())

# v3
T2.add_lyrics([172, 204], notes.V3())
T3.add_lyrics(152, notes.V3())
T4.add_lyrics(132, notes.V3()) # best one
T5.add_lyrics([264, 296], notes.V3())

# v4
T5.add_lyrics([344, 376], notes.V4())

# v5 
T5.add_lyrics([
        472, 520, 
        552 # pretty good
    ], notes.V5())

# v6
T5.add_lyrics([
    600, # maybe best one
    632, # not that good
], notes.V6())

# tihai
T7.add_lyrics([
    408, # fine
    488, # fine
], notes.TIHAI())



# specify snippets of interest
theme = Snippet(T3, 56, 16)
v1 = Snippet(T5, 120, 32)
v2 = Snippet(T5, 184, 32)
v3 = Snippet(T4, 132, 32)
v4 = Snippet(T5, 376, 32)
v5 = Snippet(T5, 552, 32)
v6 = Snippet(T5, 600, 32)
tihai = Snippet(T7, 448, len(notes.TIHAI()))


# locations
grid = GridSpec(500, 500)
grid.add_cell('video-cell', 100, 1, 1, 1, 56, 1)
grid.add_cell('lyrics-cell', 100, 1, 57, 1, 44, 1)

# arrange
arrangement = Arrangement()
arrangement.add_sequence(grid, 'video-cell', [theme, v1, v2, v3, v4, v5, v6, tihai])
arrangement.add_sequence(grid, 'lyrics-cell', map(
    generate_lyrics_snippets, 
    [theme, v1, v2, v3, v4, v5, v6, tihai]))


