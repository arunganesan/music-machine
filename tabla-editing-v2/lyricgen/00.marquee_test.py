#! /usr/bin/env python3.7

import copy
import hashlib
import matplotlib
matplotlib.use('agg')
import matplotlib.animation as animation
import matplotlib.patches as patches
import matplotlib.pyplot as plt
import multiprocessing
import networkx as nx
import numpy as np
import shapely.geometry as sg
import shapely.ops as so

MSPF = 50 # milliseconds per frame
DURATION = 2000 # in ms

def main():
    frames = []
    savename = 'testvideo.mp4'

    fig = plt.figure()
    ax = plt.gca()

    x, y = 10, 10
    w, h = None, None

    num_frames = DURATION // MSPF
    for f in range(num_frames):
        collections = []
        perc = f / num_frames

        text = ax.text(x, y, "Dha Ge Na Tu Na")

        if w is None:
            plt.draw()
            inv = ax.transData.inverted()
            bbox = text.get_window_extent()
            inv_bbox = inv.transform(bbox)
            x_, y_ = zip(*inv_bbox)
            w = 10*(x_[1] - x_[0])
            h = (y_[1] - y_[0]) * 10
            print(w, h, x_, y_)
            # exit(1)
        
        collections.append(text)
        rect = patches.Rectangle((x, y), w * perc, h)
        ax.add_patch(rect)
        collections.append(rect)

        plt.xlim(7, 17)
        plt.ylim(7, 17)
        frames.append(collections)


    ani = animation.ArtistAnimation(fig, frames, interval=MSPF, blit=True)
    ani.save(savename)



if __name__ == '__main__':
    main()
