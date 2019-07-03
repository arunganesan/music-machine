#! /usr/bin/env python3

import argparse


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--media', default='recordings/teentaal-07.02.2019.mp4')
    parser.add_argument('--tempo', default='recordings/teentaal-07.02.2019.txt')
    parser.add_argument('--snippet', nargs=2, type=int, default=[13, 16])
    args = parser.parse_args()
    
    # 1. Find the chirp = t0. 
    # 2. Set the tempo track to start from t0 + 2.5. In the future, we'll do this more systematically
    

if __name__ == '__main__':
    main()
