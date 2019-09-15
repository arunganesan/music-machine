"""
28. Dha TRKTTK TKTRKT DRDR TRKT TNA TRKT
44. Theme + Kali
60. GRNG Theme
76. GRNG 
92. DTKRT DRDR + KALI
108. Repeat
124. Dha TRKTTKT TRKT
140. Repeat
"""

T1 = "DhaTR KTTK TKTR KTTK".split(' ')
T1 += "DRDR KTTK TuNa KTTK".split(' ')
T1 += "TaTR KTTK TKTR KTTK".split(' ')
T1 += "DRDR KTTK DhinNa KTTK".split(' ')

T2 = "DhaTT GRNG GRNG TRKT".split(' ')
T2 += "DhaTT GRNG TuNa KRNK".split(' ')
T2 += "TaTT KRNK KRNK TRKT".split(' ')
T2 += "TaTT KRNK DhinNa GRNG".split(' ')

T3 = "DhaTR KTTK DRDR KTTK".split(' ')
T3 += "DhaTR KTTK TuNa KTTK".split(' ')
T3 += "TaTR KTTK TRTR KTTK".split(' ')
T3 += "DhaTR KTTK DhinNa KTTK".split(' ')

T4 = "DhaTR KTTK TRKT DhaTR".split(' ')
T4 += "KTTK TRKT DhaDha TRKT".split(' ')
T4 += "TaTR KTTK TRKT TaTR".split(' ')
T4 += "KTTK TRKT DhaDha TRKT".split(' ')


BLUE = ['blue']
GREEN = ['green']
GRAY = ['gray']
RED = ['red']

"""
28. Dha TRKTTK TKTRKT DRDR TRKT TNA TRKT
44. Theme + Kali
60. GRNG Theme
76. GRNG 
92. DTKRT DRDR + KALI
108. Repeat
124. Dha TRKTTKT TRKT
140. Repeat
"""

COLORS = BLUE*(len(T1)//2) + GREEN*(len(T1)//2)

Placement = [
        {
            'beat': 28, 
            'notes': T1, 
            'colors': COLORS,
            'title': 'Theme 1' 
        },{
            'beat': 44, 
            'notes': T1, 
            'colors': COLORS,
            'title': 'Theme 1' 
        },{
            'beat': 60, 
            'notes': T2, 
            'colors': COLORS,
            'title': 'Theme 2' 
        },{
            'beat': 76, 
            'notes': T2, 
            'colors': COLORS,
            'title': 'Theme 2' 
        },{
            'beat': 92, 
            'notes': T3, 
            'colors': COLORS,
            'title': 'Theme 3' 
        },{
            'beat': 108, 
            'notes': T3, 
            'colors': COLORS,
            'title': 'Theme 3' 
        },{
            'beat': 124, 
            'notes': T4, 
            'colors': COLORS,
            'title': 'Theme 4' 
        },{
            'beat': 140, 
            'notes': T4, 
            'colors': COLORS,
            'title': 'Theme 4' 
        }]

