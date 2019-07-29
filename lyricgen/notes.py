"""
Theme. 17 - ~33

Faster theme 65 - ~80
Variation 1. 81 - 112
Variation 2. 113 - 144
Repeat variation 2. 145 - 176 roughly
"""

THEME = "Dha TR - KTTK - TRKT - Dha TR".split(' - ')
THEME += "KTTK - TRKT - Dha Dha - TRKT".split(' - ')
KALI = "Ta TR - KTTK - TRKT - Ta TR".split(' - ')
KALI += "KTTK - TRKT - Dha Dha - TRKT".split(' - ')

COLORS_THEME = "blue blue blue orange orange orange yellow yellow".split(' ')
COLORS_KALI = COLORS_THEME

VARIATION1 = "Dha TR - KTTK - TRKT - Dha TR".split(' - ')
VARIATION1 += "Dha TR - KTTK - TRKT - Dha TR".split(' - ')
VARIATION1 += THEME
VARIATION1 += "Ta TR - KTTK - TRKT - Ta TR".split(' - ')
VARIATION1 += "Ta TR - KTTK - TRKT - Ta TR".split(' - ')
VARIATION1 += THEME

COLORS_V1 = "blue blue blue blue orange orange orange orange".split(' ')
COLORS_V1 += "gray gray gray gray gray gray gray gray".split(' ')
COLORS_V1 += COLORS_V1

VARIATION2 = "Dha TR - KTTK - TRKT - Dha TR".split(' - ')
VARIATION2 += "KTTK - TRKT - Dha TR - KTTK".split(' - ')
VARIATION2 += "TRKT - Dha TR - KTTK - TRKT".split(' - ')
VARIATION2 += "KTTK - TRKT - Dha Dha - TRKT".split(' - ')
VARIATION2 += "Ta TR - KTTK - TRKT - Ta TR".split(' - ')
VARIATION2 += "KTTK - TRKT - Ta TR - KTTK".split(' - ')
VARIATION2 += "TRKT - Dha TR - KTTK - TRKT".split(' - ')
VARIATION2 += "KTTK - TRKT - Dha Dha - TRKT".split(' - ')

COLORS_V2 = "blue blue blue orange orange orange blue blue blue orange orange orange gray gray gray gray".split(' ')
COLORS_V2 += COLORS_V2
COLORS_V2 += COLORS_V2

Placement = [
    (17, THEME + KALI, COLORS_THEME + COLORS_KALI),
    (65, THEME + KALI, COLORS_THEME + COLORS_KALI),
    (81, VARIATION1, COLORS_V1),
    (113, VARIATION2, COLORS_V2),
    (145, VARIATION2, COLORS_V2)
]
