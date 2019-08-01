#! /usr/bin/env python
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.image as mpimg
from arunutils import readwrite as rw
import os
from PIL import Image

import matplotlib.patches as patches
from matplotlib.path import Path

# Settings
DVIS_FOLDER = '.dvis'
DVIS_FORMAT = 'pdf'


LINEHEIGHT = 0.4
BARSPACE =0.5
NOTESPACE = 0.1
X0 = 0
UNDERLINE_DIP = 0.15

DRAW_BOX = False

name = None
per_measure = None

def setup_dvis ():
    import os
    if not os.path.exists(DVIS_FOLDER):
        os.mkdir(DVIS_FOLDER)



def draw_bar (ax, notes, x=0, y=0):
    # Draws bar, returns the individual text elements, returns the total width of bar
    inv = ax.transData.inverted()
    all_texts = []
    x_cursor = x
    total_width = 0.0

    lowest_y = y
    for nidx, note in enumerate(notes):
        text = ax.text(x_cursor, y, note)
        plt.draw()

        all_texts.append(text)
        bbox = text.get_window_extent()
        inv_bbox = inv.transform(bbox)
        x_, y_ = zip(*inv_bbox)
        width_ = x_[1] - x_[0]

        x_cursor += width_
        if nidx < len(notes)-1: x_cursor += NOTESPACE

        if y_[1] < lowest_y: lowest_y = y_[1]

        #x_, y_ = zip(*inv_bbox)
        #x = [x_[0], x_[0], x_[1], x_[1], x_[0]]
        #y = [y_[1], y_[0], y_[0], y_[1], y_[1]]
        #plt.plot(x,y)

    return x_cursor, all_texts, (x, y, x_cursor, lowest_y)


def draw_underline (ax, bar_bbox):
    x = np.linspace(0,1,100)
    verts = [
        (bar_bbox[0], bar_bbox[3]),
        (bar_bbox[0], bar_bbox[3] - UNDERLINE_DIP),
        (bar_bbox[2], bar_bbox[3] - UNDERLINE_DIP),
        (bar_bbox[2], bar_bbox[3])
    ]

    codes = [   Path.MOVETO,
                Path.CURVE4,
                Path.CURVE4,
                Path.CURVE4
            ]
    path = Path(verts, codes)

    patch = patches.PathPatch(path, facecolor='none', lw=2)
    ax.add_patch(patch)
    #x,y = zip(*verts)
    #plt.plot(x,y)


def parse_tihai (data, tihai):
    # Index theme bars by number
    # Index theme notes by letter
    # For now, if there are more than 10 bars, just ignore them
    # If there are more than 26 notes, just ignore them
    theme = data['theme']
    indexed_bars = {}
    for bidx, bar in enumerate(theme):
        if bidx >= 9: break
        indexed_bars[bidx + 1] = bar

    all_notes = theme[0][:]
    for bar in theme[1:]:
        for n in bar: all_notes.append(n)
    indexed_notes = {}
    for nidx, n in enumerate(all_notes):
        if nidx >= 25: break
        letter = chr(nidx+65)
        indexed_notes[letter] = n

    # Go through one character at a time
    # If it begins with [, then separate that out and keep track of start
    # If its a number, load up all notes from that bar
    # If its a letter, count off the notes until you reach that letter
    # If its a space, thats the end of this bar
    bars = []
    parts = tihai.split()
    for part in parts:
        bar = []
        for ch in part:
            if ch.isdigit():
                num = int(ch)
                assert num in indexed_bars, 'Could not find {}'.format(num)
                _bar = indexed_bars[num]
                for n in _bar: bar.append(n)
            else:
                assert ch in indexed_notes, 'Could not find note {}'.format(ch)
                _note = indexed_notes[ch]
                bar.append(_note)

        bars.append(bar)
    return bars

def dvis_draw_tihais (data):
    for tidx, tihai in enumerate(data['tihais']):
        dvis_draw_tihai(data, tihai, '{}'.format(tidx+1))

def dvis_draw_tihai (data, tihai, suffix):
    setup_dvis()

    name = data['name']
    per_measure = data['per_measure']
    bars = parse_tihai(data, tihai)
    bars = bars * 3

    fig = plt.figure(figsize=(8.5,11), dpi=50)
    _draw_all_bars(bars, fig)
    fig.savefig('{}/{}-tihai-{}.{}'.format(DVIS_FOLDER, name, suffix, DVIS_FORMAT), dpi=100)



def _draw_all_bars (bars, fig):
    plt.xlim([0, 15])
    plt.ylim([-5, 1])

    plt.axis('off')
    ax = plt.gca()
    plt.draw()
    measure_cnt = 0
    x_cursor = 0

    all_texts = []
    all_bar_bboxes = []
    for bidx, bar in enumerate(bars):
        if bidx % per_measure == 0:
            x_cursor = X0
            measure_cnt -= 1

        measure_y0 = (measure_cnt * LINEHEIGHT)
        bar = [note.title() for note in bar]
        x_cursor, bar_texts, bbox = draw_bar(ax, bar, x=x_cursor, y=measure_y0)
        x_cursor += BARSPACE

        [all_texts.append(t) for t in bar_texts]
        all_bar_bboxes.append(bbox)

    plt.draw()

    for bar_bbox in all_bar_bboxes:
        draw_underline(ax, bar_bbox)

    for tidx, T in enumerate(all_texts):
        if not DRAW_BOX: continue
        #continue
        bbox = T.get_window_extent()
        inv = plt.gca().transData.inverted()
        inv_bbox = inv.transform(bbox)

        x_, y_ = zip(*inv_bbox)
        x = [x_[0], x_[0], x_[1], x_[1], x_[0]]
        y = [y_[1], y_[0], y_[0], y_[1], y_[1]]
        plt.plot(x,y)

        #if tidx == 7:
        #    T.set_position((8, 0))




def dvis_draw_theme (data):
    setup_dvis()

    theme = data['theme']
    fig = plt.figure(figsize=(8.5,11), dpi=50)
    _draw_all_bars(theme, fig)
    fig.savefig('{}/{}.{}'.format(DVIS_FOLDER, name, DVIS_FORMAT), dpi=100)


def validate_json_file (data):
    assert 'per_measure' in data, 'Missing per measure'
    assert 'theme' in data, 'At least we need a theme'
    assert 'name' in data, 'Need a name'

if __name__ == '__main__':
    import json
    data = json.load(open('kaida.json', 'r'))

    name = data['name']
    per_measure = data['per_measure']


    validate_json_file(data)
    dvis_draw_theme(data)
    dvis_draw_tihais(data)
