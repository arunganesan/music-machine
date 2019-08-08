from common import *

"""
Notes
"""
THEME = "DheNe GeNe TakKa DheNe".split(' ')
THEME += "GeNe DheNe GeNe TakKa".split(' ')
KALI = "TeNe KeNe TakKa TeNe".split(' ')
KALI += "KeNe DheNe GeNe TakKa".split(' ')

theme = Theme(THEME, KALI)
v1 = V1(THEME, KALI)
v2 = V2(THEME, KALI)
v3 = V3(THEME, KALI)
v4 = V4(THEME, KALI)
v5 = V5(THEME, KALI)
v6 = V6(THEME, KALI)
tihai = TIHAI(THEME, KALI)


"""
Place
"""
theme.found_at({
    T1: [54, 70, 86, 102],
    T2: [44, 60],
    T3: [56, 72], # best one
    T4: [36, 52],
    T5: [88, 104, 152, 168, 216, 232],
    T7: [40, 56, 104]
})
v1.found_at({ T2: [76], T3: [88], T4: [68], T5: [120], T7: [72] })
v2.found_at({ T2: [108], T3: [120], T4: [100], T5: [184] })
v3.found_at({ T2: [172, 204], T3: [152], 
    T4: [132],  # best one
    T5: [264, 296] })

v4.found_at({ T5: [344, 376] })
v5.found_at({ T5: [472, 
        520, 
        552 # pretty good
    ] })
v6.found_at({ T5: [
    600,  # maybe best one
    632 # not that good
    ] })
tihai.found_at({ T7: [
    408,  # fine
    488, # fine
] })

# Need helper function to go from each piece to "how do we generate the lyrics for each take?"
    # - actually... we could just take the final snippet arrangement and generate lyrics based on that
    # - that is accurately connected to the lyrics so that *might* be fine

"""
Snippets
    * Snippets are video files.
"""
Snippets = {
    'theme': { 'take': T3.get_camera(1), 'from': 56, 'to': 88},
    'theme': { 'take': T3, 'from': 56, 'to': 88},
    'v1': { 'take': T5, 'from': 120, 'to': 120+32},
    'v2': { 'take': T5, 'from': 184, 'to': 184+32},
    'v3': { 'take': T4, 'from': 132, 'to': 132+32},
    'v4': { 'take': T5, 'from': 376, 'to': 376+32},
    'v5': { 'take': T5, 'from': 552, 'to': 552+32},
    'v6': { 'take': T5, 'from': 600, 'to': 600+32},
    'tihai': { 'take': T7, 'from': 488, 'to': 488 + len(tihai.notes)},
}

"""
XXX How do we specify content? Is it based on the take? Or is it based on the video file?
Intuitively it should be based on the take. There are notes assigned to each take. Just as 
there are lyric files and audio clips and maybe even multiple videos assigned to each take.

WE NEED A TAKE CLASS.
* A "take" class can have multiple media attached to it
* It automatically trims and lines things up
* Then you can say something as simple as "take.generate_lyrics()" or "take.get_lyrics_video()" or "take.get_video_files()"
* In the snippets, you can say:
    'theme-video': { 'video': take3.get_camera(1), ....}
    'theme-lyrics': { 'video': take3.get_lyrics_file(1), ....}
""" 


"""
Locations
"""
Grid = {
    'video-cell': {
        "rows": 100, "cols": 1,
        "row": 1, "col": 1,
        "rowspan": 56, "colspan": 1
    },
    'lyrics-cell': {
        "rows": 100, "cols": 1,
        "row": 57, "col": 1,
        "rowspan": 44, "colspan": 1
    }
}

"""
Arrange
"""
Arrangement = [
    { 
        'cell': 'video-cell', 
        'sequence': [
            'theme', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'tihai'
        ]
    },

    {
        'cell': 'lyrics-'
    }
]