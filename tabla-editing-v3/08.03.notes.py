from common import *

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

theme.found_at({
    T1: [54, 70, 86, 102],
    T2: [44, 60],
    T3: [56, 72],
    T4: [36, 52],
    T5: [88, 104, 152, 168, 216, 232],
    T7: [40, 56, 104]
})
v1.found_at({ T2: [76], T3: [88], T4: [68], T5: [120], T7: [72] })
v2.found_at({ T2: [108], T3: [120], T4: [100], T5: [184] })
v3.found_at({ T2: [172, 204], T3: [152], T4: [132], T5: [264, 296] })
v4.found_at({ T5: [344, 376] })
v5.found_at({ T5: [472, 520, 552] })
v6.found_at({ T5: [600, 632] })
tihai.found_at({ T7: [408, 488] })
