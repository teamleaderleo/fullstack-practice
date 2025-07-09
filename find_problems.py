import re
import requests
from io import BytesIO
from pdfminer.high_level import extract_text

# Phrase to search for
PHRASE = "find all"


def generate_urls():
    urls = []

    # --- November tournaments: 2008–2024, categories: gen, thm, team, guts
    for year in range(2008, 2025):
        for cat in ("gen", "thm", "team", "guts"):
            for kind in ("problems", "solutions"):
                urls.append(
                    f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/nov/{cat}/{kind}.pdf"
                )

    # --- February tournaments: 1998–2025, categories: team, alg, comb, geo, guts
    for year in range(1998, 2026):
        for cat in ("team", "alg", "comb", "geo", "guts"):
            for kind in ("problems", "solutions"):
                urls.append(
                    f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/feb/{cat}/{kind}.pdf"
                )

    # --- Invitational (HMIC): 2013–2025, single category “hmic”
    for year in range(2013, 2026):
        for kind in ("problems", "solutions"):
            urls.append(
                f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/hmic/{kind}.pdf"
            )

    return urls


def exists(url):
    """Quick HEAD to skip 404s without downloading."""
    r = requests.head(url)
    return r.status_code == 200


def search_pdfs():
    hits = []
    for url in generate_urls():
        if not exists(url):
            continue
        print(f"→ Checking {url}")
        r = requests.get(url)
        text = extract_text(BytesIO(r.content))
        if re.search(rf"\b{re.escape(PHRASE)}\b", text, re.IGNORECASE):
            hits.append(url)
    return hits


if __name__ == "__main__":
    found = search_pdfs()
    print("\nPapers containing “find all”:")
    for u in found:
        print(u)
