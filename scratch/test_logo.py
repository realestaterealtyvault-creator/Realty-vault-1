from PIL import Image

im = Image.open('assets/img/logo-transparent.png').convert('RGBA')
r, g, b, a = im.split()

# Convert pixels: if pixel is teal/cyan-ish (g > r and b > r), turn to white (255, 255, 255)
# If pixel is gold-ish (r > b), keep or enhance to vibrant rich gold
pixels = im.load()
for y in range(im.height):
    for x in range(im.width):
        pr, pg, pb, pa = pixels[x, y]
        if pa > 10:
            # Check if teal/greenish:
            if pg > pr + 10 and pb > pr + 10:
                # This is "REALTY" (teal) -> turn to pure white
                pixels[x, y] = (255, 255, 255, pa)
            elif pr > pb + 30:
                # This is "VAULT" (gold) -> preserve or enhance gold
                pixels[x, y] = (pr, pg, pb, pa)
            elif pr > 200 and pg > 200 and pb > 200:
                # near white or highlights
                pixels[x, y] = (255, 255, 255, pa)

im.save('assets/img/footer-logo-white.png')
print("Saved assets/img/footer-logo-white.png")
