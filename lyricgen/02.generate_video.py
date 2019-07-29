#! /usr/bin/env python3.7

from tqdm import tqdm
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import matplotlib.patches as patches
import numpy as np

from notes import Placement

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

LINEHEIGHT = 0.12
X0 = 0 # 1
Y0 = 0
BARSPACE = 0.02
WIDTH = 0.75
ofilename = 'lyrics.mp4'

PER_LINE = 4


def draw_bar (ax, bar, x=0, y=0):
    x0 = x + X0
    y0 = y + Y0
    
    text = ax.text(
            0.5 * (x0 + x0 + WIDTH), 
            0.5 * (y0 + y0 + LINEHEIGHT), 
            bar, 
            verticalalignment='center',
            horizontalalignment='center',
            color='black', fontfamily='serif', fontsize=25)
    
    return x, y, WIDTH, LINEHEIGHT, text #x_[0], y_[0], w, h, text

def highlight_bar (beat, ax, per_bar_bbox,  per_bar_times, curr_time, color):
    # get the bar start and end time
    if beat not in per_bar_times:
        beat = max(per_bar_times.keys())
    t0, t1 = per_bar_times[beat]
    
    curr_time -= t0
    t1 -= t0
    perc = min(max(curr_time / t1, 0), 1)
    
    if perc == 0: 
        return None
    
    if beat not in per_bar_bbox: 
        print('Bear {} not found in {}'.format(beat, per_bar_bbox.keys()))
        return None
    
    x, y, w, h = per_bar_bbox[beat]
    rect = patches.Rectangle((x, y), w * perc, h - 0.01, color=color, alpha=0.25)
    ax.add_patch(rect)
    return rect

def get_page (curr_beat, pages):
    previous_page = pages[0]
    for pidx, page in enumerate(pages):
        if curr_beat >= page['from']:
            previous_page = pages[pidx]
            if curr_beat <= page['to']:
                return page
    
    return previous_page


def draw_page (ax, curr_beat, pages):
    idx_offset = 0
    
    page = get_page(curr_beat, pages)
    
    idx_offset = 0
    text_collection = []
    offset = [0, 0]
    
    for idx, bar in enumerate(page['notes']):
        _idx = idx + idx_offset
        if _idx % PER_LINE == 0:
            offset[0] = 0
            offset[1] -= LINEHEIGHT
        else:
            offset[0] += w + BARSPACE
            offset[1] += 0
        
        x0, y0, w, h, text = draw_bar(ax, bar, x=offset[0], y=offset[1])
        text_collection.append(text)
        
    return text_collection

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
    
    fig = plt.figure(figsize=(7, 10))
    ax = plt.gca()
    plt.axis('off')
    
    plt.tight_layout()
    
    MSPF = 50
    DUR = 90 # XXX this should be the length of the actual vudeo
    
    
    plt.xlim([0, 3])
    plt.ylim([-2, 1])
     
    _x0 = np.inf
    _x1 = -np.inf
    _y0 = np.inf
    _y1 = -np.inf
    
    pages = []

    for pageno, (bar_offset, notes, colors) in enumerate(Placement):
        
        offset = [0, 0]
        per_bar_bbox = {}
        color_per_bar = {}

        for idx, bar in enumerate(notes):
            if idx % PER_LINE == 0:
                offset[0] = 0
                offset[1] -= LINEHEIGHT
            else:
                offset[0] += WIDTH + BARSPACE
                offset[1] += 0
            
            per_bar_bbox[bar_offset + idx] = [*offset, WIDTH, LINEHEIGHT]
            
            _x0 = min(offset[0], _x0)
            _x1 = max(offset[0] + WIDTH, _x1)
            _y0 = min(offset[1], _y0)
            _y1 = max(offset[1] + LINEHEIGHT, _y1)
            
            color_per_bar[bar_offset + idx] = colors[idx]
        
        pages.append({
            'from': bar_offset,
            'to': len(notes) + bar_offset,
            'notes': notes, 
            'bbox': per_bar_bbox,
            'colors': color_per_bar })
    
    #plt.cla()
    #plt.axis('off')
    
    plt.xlim([_x0, _x1])
    plt.ylim([_y0 - LINEHEIGHT, _y1 + LINEHEIGHT])
    
    num_frames = DUR * 1000 // MSPF
    frames = []

    for fidx in tqdm(list(range(num_frames)), 'Frame'):
        collections = []
        
        curr_time = fidx * MSPF / 1000
        curr_beat = np.argmin(np.abs(per_beat_time - curr_time))
        page = get_page(curr_beat, pages)
        
        _, _, _, _, beat_text = draw_bar(ax, 'Beat {}'.format(curr_beat), WIDTH * 1.5, 0) 
        collections.append(beat_text)
        
        for _bar, color in page['colors'].items():
            rect = highlight_bar(
                _bar, ax, 
                page['bbox'], per_bar_times, 
                curr_time, color)
            if rect is None:
                continue
            collections.append(rect)
        
        collections += draw_page(ax, curr_beat, pages)
        
        frames.append(collections)
    
    ani = animation.ArtistAnimation(fig, frames, interval=MSPF)
    ani.save(ofilename)


if __name__ == '__main__':
    main()
