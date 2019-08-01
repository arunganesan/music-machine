#! /usr/bin/env python3
#import music21
# print(dir(music21.musicxml))

from music21 import *

print(dir(musicxml.xmlToM21))
MI = musicxml.xmlToM21.MusicXMLImporter()
song = MI.scoreFromFile('bhajan.xml')
# bwv295 = corpus.parse('bach/bwv295')
song.show()

for n in song.recurse().notes:
    print(n.measureNumber, n.offset, n.step, n.beat, n.duration, n.lyric)
