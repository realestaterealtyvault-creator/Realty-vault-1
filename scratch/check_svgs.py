import re

for name in ['facebook.svg', 'insta.svg', 'linkedin.svg', 'YouTube.svg']:
    with open('assets/img/icon/social/' + name, 'r', encoding='utf-8') as f:
        svg = f.read()
    fills = re.findall(r'fill="([^"]+)"', svg)
    print(name, 'fills:', fills[:5], 'len:', len(svg))
    if 'viewBox' not in svg:
        print('  WARNING: NO viewBox in', name)
