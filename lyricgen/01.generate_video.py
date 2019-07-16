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
UNDERLINE_DIP = 0.15


ofilename = 'kaida.mp4'

KAIDA = [
        "Dha Tet", "Dha Ge", "Na Dha", "TRKT", 
        "Dha Tet", "Dha Ge", "Tu Na", "Ke Na"]

COLORS = ['blue']*2 + ['orange']*2 \
        + ['blue']*2 + ['yellow']*2

PLACE_AT_BEATS = [17, 53, 61]

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

def highlight_bar (idx, ax, per_bar_bbox,  per_bar_times, curr_time):
    # get the bar start and end time
    t0, t1 = per_bar_times[idx]
    
    curr_time -= t0
    t1 -= t0
    t0 = 0
    perc = min(max(curr_time / t1, 0), 1)
    
    if perc == 0: 
        return None
    
    color = COLORS[idx]
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
    per_beat_time = list(map(float, per_beat_time))
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
    
    
    MSPF = 200
    DUR = 10
    def draw_frame (fidx):
        curr_time = fidx * MSPF / 1000
        
        offset = [0, 0]
        per_bar_bbox = {}
        collections = []
        
        for idx, bar in enumerate(KAIDA):
            if idx % PER_LINE == 0:
                offset[0] = 0
                offset[1] -= LINEHEIGHT
            else:
                offset[0] += w + BARSPACE
                offset[1] += 0
            #print(offset)
            x0, y0, w, h, text = draw_bar(ax, bar, x=offset[0], y=offset[1])
            collections.append(text)
            per_bar_bbox[idx] = [x0, y0, w, h]
        
        for idx in range(len(COLORS)):
            rect = highlight_bar(idx, ax, per_bar_bbox, per_bar_times, curr_time)
            if rect is None:
                continue
            collections.append(rect)
        
        return collections
    
    #for idx, color in enumerate(COLORS):
    #    x, y, w, h = per_bar_bbox[idx]
    #    print(x, y, w, h)
    #    rect = patches.Rectangle((x, y), w, h, color=color)
    #    ax.add_patch(rect)
    
    num_frames = DUR * 1000 // MSPF
    frames = []
    for f in tqdm(list(range(num_frames)), 'Frame'):
        coll = draw_frame(f)
        print(len(coll))
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
    

    #plt.savefig('kaida.png')

if __name__ == '__main__':
    main()
