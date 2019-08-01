"""
24. Theme + Kali
~48. Theme + Kali
72. Theme + Kali
100. Theme + Kali
116. Theme + Kali
132. 1-4x3 variation
170. 12121-4 variation
"""

THEME = "DhaTT GRNG GRNG TRKT".split(' ')
THEME += "DhaTT GRNG TuNa KRNK".split(' ')
KALI = "TaTT KRNK KRNK TRKT".split(' ')
KALI += "TaTT KRNK DhinNa GRNG".split(' ')

V1 = THEME[0:4] + THEME[0:4] + THEME
V1 += KALI[0:4] + KALI[0:4] + KALI

V2 = THEME[0:2] + THEME[0:2] + THEME[0:4] + THEME
V2 += KALI[0:2] + KALI[0:2] + KALI[0:4] + THEME


BLUE = ['blue']
GREEN = ['green']
GRAY = ['gray']
RED = ['red']

Placement = [
        {
            'beat': 24, 
            'notes': THEME + KALI, 
            'colors': GRAY * len(THEME + KALI),
            'title': 'Theme @ 140 BPM' 
        },
        { 
            'beat': 48, 
            'notes': THEME + KALI, 
            'colors': GRAY * len(THEME + KALI),
            'title': 'Theme @ 160 BPM' 
        },
        { 
            'beat': 72, 
            'notes': THEME + KALI, 
            'colors': GRAY * len(THEME + KALI),
            'title': 'Theme @ 180 BPM' 
        },{ 
            'beat': 100, 
            'notes': THEME + KALI, 
            'colors': GRAY * len(THEME + KALI),
            'title': 'Theme @ 200 BPM' 
        },{ 
            'beat': 116, 
            'notes': THEME + KALI, 
            'colors': GRAY * len(THEME + KALI),
            'title': 'Theme @ 200 BPM' 
        },{ 
            'beat': 132, 
            'notes': V1,
            'colors': (BLUE*4 + GREEN*4 + GRAY*8)*2,
            'title': 'Variation 1 @ 200 BPM' 
        },{ 
            'beat': 170, 
            'notes': V2, 
            'colors': (RED*2 + GREEN*2 + BLUE*4 + GRAY*8)*2,
            'title': 'Variaton 2 @ 200 BPM' 
        }]

