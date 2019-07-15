#! /usr/bin/env python3.7

"""
- Load the tempo track
- And marquee defintions:
    * The lyrics that have to fit here
    * The starting and ending bar
    * The color highlights
"""

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--tempotrack')
    args = parser.parse_args()
        

if __name__ == '__main__':
    main()