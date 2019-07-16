#! /usr/bin/env python3.7

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

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--tempotrack')

    args = parser.parse_args()
        

if __name__ == '__main__':
    main()