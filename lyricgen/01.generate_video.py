#! /usr/bin/env python3.7

import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

"""
- Load the tempo track
- And marquee defintions:
    * The composition
    * The starting and ending bar
    * The color highlights
- Stylstic preferences
    * Number of bars per line 
    * Number of lines per page
- A "composition" has:
    * List of bars
    * Notes per bar
    * Color per bar/note
    * Or, more generally, tags per note or per bar -- could be "tihai" or "theme" or w/e
"""

LINEHEIGHT = 0.2
BARSPACE = 0.02
UNDERLINE_DIP = 0.15

KAIDA = [
        "Dha Tet", "Dha Ge", "Na Dha", "TRKT", 
        "Dha Tet", "Dha Ge", "Tu Na", "Ke Na"]

COLORS = ['blue']*2 + ['orange']*2 \
        + ['blue']*2 + ['yellow']*2

PLACE_AT_BEATS = [17, 53, 61]

PER_LINE = 4

def draw_bar (ax, bar, x=0, y=0):
    print('Drawing at x={}, y={}'.format(x, y))
    text = ax.text(x, y, bar)

    plt.draw()
    inv = ax.transData.inverted()
    bbox = text.get_window_extent()
    inv_bbox = inv.transform(bbox)
    x_, y_ = zip(*inv_bbox)
    w = (x_[1] - x_[0])
    h = (y_[1] - y_[0]) 
    return x_[0], y_[0], w, h

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--tempotrack', default='recordings/tempo.txt')
    args = parser.parse_args()
    
    per_beat_time = open(args.tempotrack, 'r').readlines()
    per_beat_time = map(float, per_beat_time)
    
    
    """
    * Take all the duplicates of the lyrics and place the text
        * For each bar, index the start and end time of that bar
    """
    
    fig = plt.figure()
    ax = plt.gca()
    plt.axis('off')
    plt.xlim([0, 5])
    plt.ylim([-2, 1])
    
    offset = [0, 0]

    per_bar_bbox = {}

    for idx, bar in enumerate(KAIDA):
        if idx % PER_LINE == 0:
            offset[0] = 0
            offset[1] -= LINEHEIGHT
        else:
            offset[0] += w + BARSPACE
            offset[1] += 0
        print(offset)
        x0, y0, w, h = draw_bar(ax, bar, x=offset[0], y=offset[1])
        per_bar_bbox[idx] = [x0, y0, w, h]
    
    for idx, color in enumerate(COLORS):
        x, y, w, h = per_bar_bbox[idx]
        print(x, y, w, h)
        rect = patches.Rectangle((x, y), w, h, color=color)
        ax.add_patch(rect)

    """
    * At that beat, start animating in a bar
        * At each frame, calculate the time
        * For each bar, calculate the start and end time of bar
        * If current time is past that bar, fully color it in
        * If current time is before the bar, leave it emtpy
        * If it is in between, draw just the percent of it

        * In general, calculate the percent finished with min(0, 1)
        * Then draw for each bar. That's it.
    """
    

    plt.savefig('kaida.png')

if __name__ == '__main__':
    main()
