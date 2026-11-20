"""Prepare a small, curated set of photographs from the original Word.

The original report stays outside this distributable website. Extracted photos
are resized only for efficient delivery; official crests are copied unchanged.
"""

import argparse
from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

from PIL import Image, ImageOps


SELECTED = {
    "formacion": 337,
    "superior_aula": 27,
    "superior_autoridades": 29,
    "superior_edificio": 30,
    "oficiales_ceremonia": 117,
    "oficiales_formacion": 234,
    "oficiales_obras": 89,
    "oficiales_villamaria": 188,
    "suboficiales_aula": 247,
    "suboficiales_operativa": 270,
    "suboficiales_formacion": 320,
    "suboficiales_bandera": 338,
    "suboficiales_practicas": 341,
    "suboficiales_grupo": 349,
    "anexo_alta_gracia": 376,
    "anexo_dean_funes": 505,
    "anexo_rio_tercero": 828,
    "anexo_salsacate": 899,
    "anexo_villa_allende": 1048,
    "anexo_villa_dolores": 1199,
}

CRESTS = {
    "policia": "ESCUDO.png",
    "recursos-humanos": "dfp escudo sin fondo(1).png",
    "direccion-formacion": "Direccion Formacion Profesional(3).png",
    "escuela-superior": "Dpto escuela superior Brig. Gral. Juan Bautista Bustos.png",
    "escuela-oficiales": "dpto escuela de oficiales Ltdor. Gral. Don José de San Martín(1).png",
    "escuela-suboficiales": "dpto escuela de suboficiales de policia General Manuel Belgrano(1).png",
}


def export(docx, attachments, destination):
    photos = destination / "photos"
    crests = destination / "crests"
    photos.mkdir(parents=True, exist_ok=True)
    crests.mkdir(parents=True, exist_ok=True)

    with ZipFile(docx) as z:
        for alias, number in SELECTED.items():
            source = f"word/media/image{number}.jpg"
            with Image.open(BytesIO(z.read(source))) as im:
                image = ImageOps.exif_transpose(im).convert("RGB")
                image.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
                image.save(photos / f"{alias}.webp", "WEBP", quality=84, method=5)

    for alias, filename in CRESTS.items():
        (crests / f"{alias}.png").write_bytes((attachments / filename).read_bytes())
    print(f"Exported {len(SELECTED)} photographs and {len(CRESTS)} original crests")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--document", type=Path, required=True)
    p.add_argument("--attachments", type=Path, required=True)
    p.add_argument("--destination", type=Path, default=Path("public/assets"))
    args = p.parse_args()
    export(args.document, args.attachments, args.destination)
