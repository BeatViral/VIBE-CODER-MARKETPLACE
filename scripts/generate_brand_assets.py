from pathlib import Path
import math

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSETS = PUBLIC / "assets"


def ensure_dirs():
    ASSETS.mkdir(parents=True, exist_ok=True)


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def hex_to_rgb(value):
    value = value.strip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def lerp(a, b, t):
    return int(a + (b - a) * t)


def draw_vertical_gradient(draw, w, h, top, bottom):
    top = hex_to_rgb(top)
    bottom = hex_to_rgb(bottom)
    for y in range(h):
        t = y / max(1, h - 1)
        color = tuple(lerp(top[i], bottom[i], t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=color)


def add_glow(base, center, radius, color, alpha=150):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(*hex_to_rgb(color), alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(radius / 2))
    base.alpha_composite(layer)


def star_points(cx, cy, outer, inner, points=4):
    pts = []
    total = points * 2
    for i in range(total):
        angle = -math.pi / 2 + i * math.pi / points
        radius = outer if i % 2 == 0 else inner
        pts.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    return pts


def draw_v_mark(canvas, box, draw_background=True, maskable=False):
    x0, y0, x1, y1 = box
    w = x1 - x0
    h = y1 - y0
    size = min(w, h)
    r = size * (0.22 if not maskable else 0.18)

    if draw_background:
        bg = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(bg)
        d.rounded_rectangle(box, radius=r, fill=(5, 5, 10, 245))
        d.rounded_rectangle(box, radius=r, outline=(255, 216, 74, 120), width=max(2, int(size * 0.025)))
        d.rounded_rectangle(
            (x0 + size * 0.045, y0 + size * 0.045, x1 - size * 0.045, y1 - size * 0.045),
            radius=max(2, r * 0.78),
            outline=(0, 229, 255, 42),
            width=max(1, int(size * 0.012)),
        )
        canvas.alpha_composite(bg)

    def pt(px, py):
        return (x0 + w * px, y0 + h * py)

    points = [pt(0.285, 0.27), pt(0.50, 0.755), pt(0.735, 0.27)]
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for fill, width, blur in [
        ((255, 176, 32, 145), size * 0.22, size * 0.055),
        ((255, 216, 74, 170), size * 0.15, size * 0.035),
        ((0, 229, 255, 88), size * 0.25, size * 0.08),
        ((168, 85, 247, 90), size * 0.30, size * 0.09),
    ]:
        gd.line(points, fill=fill, width=max(1, int(width)), joint="curve")
        canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(blur)))
        glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)

    d = ImageDraw.Draw(canvas)
    d.line(points, fill=(109, 59, 0, 255), width=max(3, int(size * 0.185)), joint="curve")
    d.line(points, fill=(255, 176, 32, 255), width=max(2, int(size * 0.148)), joint="curve")
    d.line(points, fill=(255, 229, 92, 255), width=max(2, int(size * 0.108)), joint="curve")
    d.line(points, fill=(255, 251, 191, 255), width=max(1, int(size * 0.045)), joint="curve")

    spark_cx, spark_cy = pt(0.755, 0.225)
    spark = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(spark)
    sd.polygon(star_points(spark_cx, spark_cy, size * 0.105, size * 0.032, 4), fill=(255, 255, 210, 245))
    sd.ellipse(
        (spark_cx - size * 0.026, spark_cy - size * 0.026, spark_cx + size * 0.026, spark_cy + size * 0.026),
        fill=(255, 176, 32, 245),
    )
    canvas.alpha_composite(spark.filter(ImageFilter.GaussianBlur(size * 0.025)))
    canvas.alpha_composite(spark)

    d = ImageDraw.Draw(canvas)
    d.ellipse(
        (x0 + w * 0.215, y0 + h * 0.70, x0 + w * 0.275, y0 + h * 0.76),
        fill=(0, 229, 255, 190),
    )


def create_icon(size, maskable=False):
    scale = 4
    high = size * scale
    img = Image.new("RGBA", (high, high), (0, 0, 0, 0))
    pad = int(high * (0.04 if maskable else 0.075))
    draw_v_mark(img, (pad, pad, high - pad, high - pad), draw_background=True, maskable=maskable)
    return img.resize((size, size), Image.Resampling.LANCZOS)


def write_svg():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Vibe Coder Marketplace">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#05050A"/>
      <stop offset=".55" stop-color="#11111A"/>
      <stop offset="1" stop-color="#171339"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF7B8"/>
      <stop offset=".42" stop-color="#FFD84A"/>
      <stop offset=".72" stop-color="#FFB020"/>
      <stop offset="1" stop-color="#FFF0A3"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 1 0 .55 0 0 .76 0 0 .2 0 0 0 0 0 .8 0"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="10" y="10" width="236" height="236" rx="50" fill="url(#bg)"/>
  <rect x="14" y="14" width="228" height="228" rx="46" fill="none" stroke="#FFD84A" stroke-opacity=".5" stroke-width="7"/>
  <path d="M71 68 L127 194 L187 68" fill="none" stroke="#00E5FF" stroke-opacity=".32" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M71 68 L127 194 L187 68" fill="none" stroke="#A855F7" stroke-opacity=".3" stroke-width="62" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M71 68 L127 194 L187 68" fill="none" stroke="#7A4200" stroke-width="39" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M71 68 L127 194 L187 68" fill="none" stroke="url(#gold)" stroke-width="27" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
  <path d="M191 34 L202 63 L231 74 L202 85 L191 114 L180 85 L151 74 L180 63 Z" fill="#FFF7B8"/>
  <circle cx="191" cy="74" r="7" fill="#FFB020"/>
  <circle cx="61" cy="187" r="9" fill="#00E5FF" opacity=".9"/>
</svg>
"""
    (PUBLIC / "favicon.svg").write_text(svg, encoding="utf-8")
    (ASSETS / "brand-mark.svg").write_text(svg, encoding="utf-8")


def draw_text(draw, xy, text, font_obj, fill, anchor=None):
    draw.text(xy, text, font=font_obj, fill=fill, anchor=anchor)


def text_width(draw, text, font_obj):
    box = draw.textbbox((0, 0), text, font=font_obj)
    return box[2] - box[0]


def fit_font(text, max_width, start_size, bold=True):
    size = start_size
    probe = Image.new("RGB", (10, 10))
    draw = ImageDraw.Draw(probe)
    while size > 16:
        f = font(size, bold=bold)
        if text_width(draw, text, f) <= max_width:
            return f
        size -= 2
    return font(size, bold=bold)


def draw_grid(draw, w, h):
    for step, alpha in [(80, 22), (160, 18)]:
        for x in range(0, w + 1, step):
            draw.line((x, 0, x, h), fill=(255, 255, 255, alpha), width=1)
        for y in range(0, h + 1, step):
            draw.line((0, y, w, y), fill=(255, 255, 255, alpha), width=1)


def draw_banner(width, height, filename):
    img = Image.new("RGBA", (width, height), (5, 5, 10, 255))
    draw = ImageDraw.Draw(img)
    draw_vertical_gradient(draw, width, height, "#05050A", "#171339")
    img = img.convert("RGBA")
    add_glow(img, (int(width * 0.22), int(height * 0.45)), int(min(width, height) * 0.55), "#FFD84A", 105)
    add_glow(img, (int(width * 0.78), int(height * 0.22)), int(min(width, height) * 0.48), "#00E5FF", 80)
    add_glow(img, (int(width * 0.88), int(height * 0.84)), int(min(width, height) * 0.50), "#A855F7", 95)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw_grid(draw, width, height)
    img.alpha_composite(overlay)
    draw = ImageDraw.Draw(img)

    margin = int(width * 0.065)
    icon_size = int(min(height * 0.60, width * 0.30))
    icon_y = int((height - icon_size) * 0.50)
    draw_v_mark(img, (margin, icon_y, margin + icon_size, icon_y + icon_size), draw_background=True)

    x = margin + icon_size + int(width * 0.055)
    max_text_width = width - x - margin
    eyebrow = "EXPERIENCE-FIRST AI BUILDERS"
    title = "Vibe Coder Marketplace"
    line = "Experience beats syntax."
    subline = "The old marketplace sold technical labor. This one sells lived context."

    eyebrow_font = fit_font(eyebrow, max_text_width, max(18, int(height * 0.043)), bold=True)
    title_font = fit_font(title, max_text_width, max(36, int(height * 0.125)), bold=True)
    line_font = fit_font(line, max_text_width, max(24, int(height * 0.065)), bold=True)
    sub_font = fit_font(subline, max_text_width, max(18, int(height * 0.037)), bold=False)

    y = int(height * 0.25)
    eyebrow_box = draw.textbbox((0, 0), eyebrow, font=eyebrow_font)
    eyebrow_h = eyebrow_box[3] - eyebrow_box[1]
    pill_top = y - int(height * 0.102)
    pill_bottom = pill_top + eyebrow_h + int(height * 0.044)
    draw.rounded_rectangle(
        (x, pill_top, x + text_width(draw, eyebrow, eyebrow_font) + 34, pill_bottom),
        radius=12,
        fill=(255, 216, 74, 32),
        outline=(255, 216, 74, 110),
        width=2,
    )
    draw_text(draw, (x + 17, pill_top + int(height * 0.017)), eyebrow, eyebrow_font, (255, 238, 139, 255))
    draw_text(draw, (x, y + int(height * 0.015)), title, title_font, (248, 250, 252, 255))
    draw_text(draw, (x, y + int(height * 0.18)), line, line_font, (255, 216, 74, 255))
    draw_text(draw, (x, y + int(height * 0.285)), subline, sub_font, (210, 214, 230, 235))

    accent_y = height - int(height * 0.12)
    draw.line((x, accent_y, width - margin, accent_y), fill=(255, 216, 74, 170), width=max(3, int(height * 0.009)))
    draw.line((x, accent_y + 12, x + int(max_text_width * 0.48), accent_y + 12), fill=(0, 229, 255, 150), width=max(2, int(height * 0.006)))

    chips = Image.new("RGBA", img.size, (0, 0, 0, 0))
    chip_draw = ImageDraw.Draw(chips)
    for i, label in enumerate(["Doctors", "Farmers", "Creators", "Traders"]):
        bx = x + i * int(max_text_width * 0.18)
        by = height - int(height * 0.24)
        if bx + 145 < width - margin:
            chip_draw.rounded_rectangle(
                (bx, by, bx + 138, by + 38),
                radius=11,
                fill=(5, 5, 10, 168),
                outline=(255, 216, 74, 108),
                width=1,
            )
            chip_draw.text(
                (bx + 14, by + 9),
                label,
                font=font(max(13, int(height * 0.026)), bold=True),
                fill=(248, 250, 252, 235),
            )
    img.alpha_composite(chips)

    flattened = Image.new("RGB", img.size, "#05050A")
    flattened.paste(img.convert("RGB"), mask=img.getchannel("A"))
    flattened.save(ASSETS / filename, optimize=True)


def main():
    ensure_dirs()
    write_svg()

    icon_sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "favicon-96x96.png": 96,
        "apple-touch-icon.png": 180,
        "mstile-150x150.png": 150,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
        "icon-maskable-192x192.png": 192,
        "icon-maskable-512x512.png": 512,
    }
    for name, size in icon_sizes.items():
        create_icon(size, maskable=name.startswith("icon-maskable")).save(ASSETS / name, optimize=True)

    ico_images = [create_icon(size) for size in (16, 32, 48, 64)]
    ico_images[0].save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    draw_banner(1200, 630, "og-image.png")
    draw_banner(1200, 675, "twitter-card.png")
    draw_banner(1280, 640, "github-social-preview.png")
    draw_banner(1584, 396, "linkedin-banner.png")
    draw_banner(1600, 900, "site-banner-wide.png")
    draw_banner(1920, 1080, "site-banner-1920x1080.png")

    print("Generated favicon and banner package in", ASSETS)


if __name__ == "__main__":
    main()
