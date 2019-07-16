#! /usr/bin/env python3.7

from tqdm import tqdm
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import matplotlib.animation as animation
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

ofilename = 'kaida.mp4'

KAIDA = [
        "Dha Tet", "Dha Ge", "Na Dha", "TRKT", 
        "Dha Tet", "Dha Ge", "Tu Na", "Ke Na"]

COLORS = ['blue']*2 + ['orange']*2 \
        + ['blue']*2 + ['yellow']*2

PLACE_AT_BEATS = [16, 52, 60]

PER_LINE = 4

def draw_bar (ax, bar, x=0, y=0):
    #print('Drawing at x={}, y={}'.format(x, y))
    text = ax.text(x, y, bar)

    plt.draw()
    inv = ax.transData.inverted()
    bbox = text.get_window_extent()
    inv_bbox = inv.transform(bbox)
    x_, y_ = zip(*inv_bbox)
    w = (x_[1] - x_[0])
    h = (y_[1] - y_[0]) 
    
    return x_[0], y_[0], w, h, text

def highlight_bar (idx, ax, per_bar_bbox,  per_bar_times, curr_time, color):
    # get the bar start and end time
    t0, t1 = per_bar_times[idx]
    
    curr_time -= t0
    t1 -= t0
    t0 = 0
    perc = min(max(curr_time / t1, 0), 1)
    
    if perc == 0: 
        return None
    
    x, y, w, h = per_bar_bbox[idx]
    rect = patches.Rectangle((x, y), w * perc, h, color=color)
    ax.add_patch(rect)
    return rect

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--tempotrack', default='recordings/tempo.txt')
    args = parser.parse_args()
    
    per_beat_time = open(args.tempotrack, 'r').readlines()
    per_beat_time = np.array(list(map(float, per_beat_time)))
    per_bar_times = {}
    for idx, s in enumerate(per_beat_time):
        if idx == len(per_beat_time) - 1:
            break
        next_s = per_beat_time[idx + 1]
        per_bar_times[idx] = [s, next_s]
    
    """
    * Take all the duplicates of the lyrics and place the text
        * For each bar, index the start and end time of that bar
    """
    
    fig = plt.figure()
    ax = plt.gca()
    plt.axis('off')
    plt.xlim([0, 5])
    plt.ylim([-2, 1])
    
    
    MSPF = 100
    DUR = 50
    
    text_collection = []
    offset = [0, 0]
    per_bar_bbox = {}
    color_per_bar = {}
    
    idx_offset = 0
    for times_offset in range(len(PLACE_AT_BEATS)):
        _offset = len(KAIDA) * times_offset
        for idx, bar in enumerate(KAIDA):
            _idx = idx + _offset
            if _idx % PER_LINE == 0:
                offset[0] = 0
                offset[1] -= LINEHEIGHT
            else:
                offset[0] += w + BARSPACE
                offset[1] += 0
            x0, y0, w, h, text = draw_bar(ax, bar, x=offset[0], y=offset[1])
            text_collection.append(text)

            bar_offset = PLACE_AT_BEATS[times_offset]
            per_bar_bbox[bar_offset + idx] = [x0, y0, w, h]
            color_per_bar[bar_offset + idx] = COLORS[idx]
    
    

    def draw_frame (fidx):
        collections = []

        curr_time = fidx * MSPF / 1000
        curr_beat = np.argmin(np.abs(per_beat_time - curr_time))
        beat_text = ax.text(0, 0, '{}'.format(curr_beat))
        collections.append(beat_text)

        for idx, color in color_per_bar.items():
            rect = highlight_bar(idx, ax, per_bar_bbox, per_bar_times, curr_time, color)
            if rect is None:
                continue
            collections.append(rect)
        
        collections += text_collection
        return collections
    
    num_frames = DUR * 1000 // MSPF
    frames = []
    for f in tqdm(list(range(num_frames)), 'Frame'):
        coll = draw_frame(f)
        frames.append(coll)
    
    ani = animation.ArtistAnimation(fig, frames, interval=MSPF, blit=True)
    ani.save(ofilename)

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


if __name__ == '__main__':
    main()
