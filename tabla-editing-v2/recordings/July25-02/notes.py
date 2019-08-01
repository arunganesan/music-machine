"""
16 - Theme + Kali. End around 32
56 - Theme + Kali
72 - 1-4, 1-4, 1-8
104 - 1-4, 34, 34, 1-8
136 - DRDR KTTK x 3, 1-8
168 - 1-4, 1-4, 1-8
"""

THEME = "DhaTR KTTK TKTR KTTK".split(' ')
THEME += "DRDR KTTK TuNa KTTK".split(' ')
KALI = "TaTR KTTK TKTR KTTK".split(' ')
KALI += "TRTR KTTK DhinNa KTTK".split(' ')

VARIATION1 = "DhaTR KTTK TKTR KTTK".split(' ')
VARIATION1 += "DhaTR KTTK TKTR KTTK".split(' ')
VARIATION1 += THEME
VARIATION1 += "TaTR KTTK TKTR KTTK".split(' ')
VARIATION1 += "TaTR KTTK TKTR KTTK".split(' ')
VARIATION1 += THEME

VARIATION2 = "DhaTR KTTK TKTR KTTK".split(' ')
VARIATION2 += "TKTR KTTK TKTR KTTK".split(' ')
VARIATION2 += THEME
VARIATION2 += "TaTR KTTK TKTR KTTK".split(' ')
VARIATION2 += "TKTR KTTK TKTR KTTK".split(' ')
VARIATION2 += THEME

VARIATION3 = "DRDR KTTK DRDR KTTK".split(' ')
VARIATION3 += "DRDR KTTK DhaTR KTTK".split(' ')
VARIATION3 += THEME
VARIATION3 += "TRTR KTTK TRTR KTTK".split(' ')
VARIATION3 += "TRTR KTTK TaTR KTTK".split(' ')
VARIATION3 += THEME

def colorit (bars):
    return [ 'gray' for b in bars ]
    

Placement = [
        { 
            'beat': 16, 
            'notes': THEME + KALI, 
            'colors': ['gray'] * len(THEME + KALI),
            'title': 'Theme' 
        },
        { 
            'beat': 56, 
            'notes': THEME + KALI, 
            'colors': ['gray'] * len(THEME + KALI),
            'title': 'Theme' 
        },
        { 
            'beat': 72, 
            'notes': VARIATION1,
            'colors': ['blue'] * 4 + ['green'] * 4 + ['gray'] * 8 + ['blue'] * 4 + ['green'] * 4 + ['gray'] * 8,
            'title': 'Variation 1' 
        },
        { 
            'beat': 104, 
            'notes': VARIATION2, 
            'colors': ['blue']*2 + ['green']*6 + ['gray']*8 + ['blue']*2 + ['green']*6 + ['gray']*8,
            'title': 'Variation 2' 
        },
        { 
            'beat': 136, 
            'notes': VARIATION3, 
            'colors': ['green']*6 + ['blue']*2 + ['gray']*8 + ['green']*6 + ['blue']*2 + ['gray']*8,
            'title': 'Variation 3' 
        },
        { 
            'beat': 168, 
            'notes': VARIATION1, 
            'colors': ['blue'] * 4 + ['green'] * 4 + ['gray'] * 8 + ['blue'] * 4 + ['green'] * 4 + ['gray'] * 8,
            'title': 'Variation 1' 
        }]

