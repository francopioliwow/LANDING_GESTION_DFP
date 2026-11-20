"""Create an internal photo contact sheet grouped by report section.

Usage: python scripts/inspect_photos.py --document PATH --output .analysis
The document is never included in the distributable site.
"""

import argparse
import json
import math
import re
from collections import defaultdict
from io import BytesIO
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from PIL import Image, ImageDraw, ImageFont, ImageOps


def text_content(element):
    return " ".join("".join(t.text or "" for t in element.iter(qn("w:t"))).split())


def group_for(unit):
    name = unit.upper()
    if name == "ESCUELA SUPERIOR":
        return "superior"
    if "ESCUELA DE OFICIALES" in name:
        return "oficiales"
    if "SUBOFICIALES" in name and "CENTRO ANEXO" not in name:
        return "suboficiales"
    if "SUBOFICIALES" in name:
        return "anexos"
    return "direccion"


def inspect_document(document, output):
    doc = Document(document)
    photos = []
    unit, previous, section, activity = "Portada", "", "", ""
    for element in doc.element.body.iterchildren():
        if element.tag == qn("w:p"):
            current = text_content(element)
            if current.upper() == "CONTROL DE GESTIÓN 2026":
                unit = previous
                section, activity = "", ""
            style = element.pPr.style if element.pPr is not None and element.pPr.style is not None else ""
            if style == "Heading1":
                section = current
            elif style == "Heading2":
                activity = current
            if current:
                previous = current
        for blip in element.iter(qn("a:blip")):
            rid = blip.get(qn("r:embed"))
            if rid not in doc.part.related_parts:
                continue
            part = doc.part.related_parts[rid]
            try:
                with Image.open(BytesIO(part.blob)) as image:
                    w, h = image.size
            except Exception:
                continue
            name = str(part.partname).rsplit("/", 1)[-1]
            photos.append({"name": name, "rid": rid, "unit": unit, "group": group_for(unit), "section": section, "activity": activity, "width": w, "height": h})
    output.mkdir(parents=True, exist_ok=True)
    (output / "photo_index.json").write_text(json.dumps(photos, ensure_ascii=False, indent=2), encoding="utf-8")
    groups = defaultdict(list)
    for p in photos:
        if p["width"] >= 630 and p["width"] / p["height"] >= 1.10:
            groups[p["group"]].append(p)
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 17)
    for group, candidates in groups.items():
        count = min(30, len(candidates))
        selected = [candidates[min(len(candidates) - 1, round(k * (len(candidates) - 1) / max(1, count - 1)))] for k in range(count)]
        card_w, card_h, cols = 230, 186, 5
        sheet = Image.new("RGB", (cols * card_w, math.ceil(count / cols) * card_h), "#0a1829")
        draw = ImageDraw.Draw(sheet)
        for k, item in enumerate(selected):
            blob = doc.part.related_parts[item["rid"]].blob
            with Image.open(BytesIO(blob)) as im:
                thumbnail = ImageOps.fit(im.convert("RGB"), (card_w - 12, card_h - 44), Image.Resampling.LANCZOS)
            x, y = (k % cols) * card_w, (k // cols) * card_h
            sheet.paste(thumbnail, (x + 6, y + 6))
            draw.text((x + 8, y + card_h - 32), item["name"], fill="white", font=font)
            draw.text((x + 8, y + card_h - 14), item["unit"].split("ANEXO ")[-1][:24], fill="#91cce9")
        sheet.save(output / f"contact_{group}.jpg", quality=84)
    return photos


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--document", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    args = ap.parse_args()
    result = inspect_document(args.document, args.output)
    print(f"Indexed {len(result)} embedded images; contact sheets in {args.output}")
