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
    width, height = 2, 1

    num_frames = DURATION // MSPF
    for f in range(num_frames):
        collections = []
        perc = f / num_frames
        collections.append(plt.text(10, 10, "Dha Ge Na Tu Na"))
        rect = patches.Rectangle((10, 10), width * perc, height)
        ax.add_patch(rect)
        collections.append(rect)

        plt.xlim(7, 17)
        plt.ylim(7, 17)
        frames.append(collections)


    ani = animation.ArtistAnimation(fig, frames, interval=MSPF, blit=True)
    ani.save(savename)



if __name__ == '__main__':
    main()
