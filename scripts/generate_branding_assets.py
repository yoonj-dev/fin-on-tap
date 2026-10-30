#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Favicon SVG (Gold & Emerald Financial Pillar / Vault Motif)
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="#0f172a"/>
  
  <!-- Financial Temple / Vault Pillars -->
  <!-- Roof Triangle / Pediment -->
  <polygon points="256,90 100,180 412,180" fill="#f59e0b" filter="url(#glow)"/>
  <rect x="110" y="180" width="292" height="24" rx="4" fill="#fbbf24"/>
  
  <!-- 4 Pillars (Money Center, IB, Asset Mgmt, Payments) -->
  <rect x="130" y="214" width="44" height="170" rx="8" fill="#10b981"/>
  <rect x="198" y="214" width="44" height="170" rx="8" fill="#06b6d4"/>
  <rect x="270" y="214" width="44" height="170" rx="8" fill="#3b82f6"/>
  <rect x="338" y="214" width="44" height="170" rx="8" fill="#8b5cf6"/>
  
  <!-- Base Foundation Steps -->
  <rect x="100" y="394" width="312" height="20" rx="4" fill="#fbbf24"/>
  <rect x="80" y="420" width="352" height="24" rx="6" fill="#f59e0b"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w") as f:
    f.write(svg_content)

def draw_fin_icon(size):
    img = Image.new("RGBA", (size, size), (15, 23, 42, 255))
    draw = ImageDraw.Draw(img)
    scale = size / 512.0
    
    # Roof
    p1 = (int(256 * scale), int(90 * scale))
    p2 = (int(100 * scale), int(180 * scale))
    p3 = (int(412 * scale), int(180 * scale))
    draw.polygon([p1, p2, p3], fill=(245, 158, 11, 255))
    
    # Architrave
    draw.rounded_rectangle(
        [int(110 * scale), int(180 * scale), int(402 * scale), int(204 * scale)],
        radius=int(4 * scale),
        fill=(251, 191, 36, 255)
    )
    
    # 4 Pillars
    colors = [(16, 185, 129, 255), (6, 182, 212, 255), (59, 130, 246, 255), (139, 92, 246, 255)]
    xs = [130, 198, 270, 338]
    for x, col in zip(xs, colors):
        draw.rounded_rectangle(
            [int(x * scale), int(214 * scale), int((x + 44) * scale), int(384 * scale)],
            radius=int(8 * scale),
            fill=col
        )
        
    # Foundation
    draw.rounded_rectangle(
        [int(100 * scale), int(394 * scale), int(412 * scale), int(414 * scale)],
        radius=int(4 * scale),
        fill=(251, 191, 36, 255)
    )
    draw.rounded_rectangle(
        [int(80 * scale), int(420 * scale), int(432 * scale), int(444 * scale)],
        radius=int(6 * scale),
        fill=(245, 158, 11, 255)
    )
    
    return img

img_512 = draw_fin_icon(512)
img_512.save(os.path.join(PUBLIC_DIR, "icon-512.png"))

img_192 = draw_fin_icon(192)
img_192.save(os.path.join(PUBLIC_DIR, "icon-192.png"))

img_180 = draw_fin_icon(180)
img_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"))

img_32 = draw_fin_icon(32)
img_32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=[(32, 32)])

# Open Graph image (1200x630)
og_img = Image.new("RGBA", (1200, 630), (15, 23, 42, 255))
draw_og = ImageDraw.Draw(og_img)

for x in range(0, 1200, 60):
    draw_og.line([x, 0, x, 630], fill=(30, 41, 59, 100), width=1)
for y in range(0, 630, 60):
    draw_og.line([0, y, 1200, y], fill=(30, 41, 59, 100), width=1)

icon_center = draw_fin_icon(240)
og_img.paste(icon_center, (120, 195), icon_center)

og_img.save(os.path.join(PUBLIC_DIR, "og-image.png"))
print("Fin on Tap branding assets generated successfully!")
