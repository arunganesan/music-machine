THEME = "DhaTR KTGR DRDR DRKT".split(' ')
THEME += "TKTa TRKT TuNa KTTK".split(' ')
KALI = "TaTR KTKR TRTR TRKT".split(' ')
KALI += "TKTa TRKT DhinNa GRNG".split(' ')

V1 = THEME[0:4] + THEME[0:4] + THEME
V1 += KALI[0:4] + KALI[0:4] + KALI

V2 = THEME[0:2] + THEME[0:2] + THEME[0:4] + THEME
V2 += KALI[0:2] + KALI[0:2] + KALI[0:4] + THEME

V3 = THEME[0:3] + THEME[0:3] + THEME[0:2] + THEME
V3 += KALI[0:3] + KALI[0:3] + KALI[0:2] + THEME

BLUE = ['blue']
GREEN = ['green']
GRAY = ['gray']
RED = ['red']
ORANGE = ['orange']

"""
24: Saying theme
40: theme + kali
56: variation 1 (1-4, 1-4)
88: variation 2 (12121234)
120: variation 3. 123, 123, 12
"""

COLORS = GRAY * len(THEME)

Placement = [
        {
            'beat': 24, 
            'notes': THEME + KALI, 
            'colors': COLORS*2,
            'title': 'Theme' 
        },{
            'beat': 40, 
            'notes': THEME+KALI, 
            'colors': COLORS*2,
            'title': 'Theme' 
        },{
            'beat': 56, 
            'notes': V1, 
            'colors': (BLUE * 4 + GREEN * 4 + COLORS) * 2,
            'title': 'Variation 1: 1-4, 1-4, 1-8' 
        }, {
            'beat': 120, 
            'notes': V2, 
            'colors': (BLUE * 2 + GREEN * 2 + ORANGE * 4 + COLORS) * 2,
            'title': 'Variation 2: 12, 12, 1-4, 1-8' 
        },{
            'beat': 88, 
            'notes': V3, 
            'colors': (BLUE * 3 + GREEN * 3 + ORANGE * 2 + COLORS) * 2,
            'title': 'Variation 3: 1-3, 1-3, 12, 1-8' 
        }]

