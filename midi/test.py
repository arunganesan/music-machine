#! /usr/bin/env python3
from music21 import *
n = note.Note("D#3")
n.duration.type = 'half'
n.show()
notes = converter.parse("tinynotation: 3/4 c4 d8 f g16 a g f#")
print(notes)
print(type(notes))
print(dir(notes))
notes.show()

for n in notes.notes:
    print(dir(n))



bwv295 = corpus.parse('bach/bwv295')
for thisNote in bwv295.recurse().notes:
    print(dir(thisNote))
    thisNote.addLyric(thisNote.pitch.german)
bwv295.show()
