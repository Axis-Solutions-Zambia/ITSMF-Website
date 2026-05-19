from PIL import Image
from collections import Counter

img = Image.open('src/assests/itsmf-logo-zm.png').convert('RGBA')
pixels = list(img.getdata())

# Filter out transparent pixels
non_transparent = [p for p in pixels if p[3] > 10]

# Find most common colors
counter = Counter(non_transparent)
most_common = counter.most_common(15)

for color, count in most_common:
    r, g, b, a = color
    hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
    print(f"{hex_color} - Count: {count}")
