import re
import requests
import fitz  # PyMuPDF
from concurrent.futures import ThreadPoolExecutor, as_completed

# Build a regex for
WORDS = ["Find", "all"]
PHRASE_RE = re.compile(r"\b" + r"\s+".join(WORDS) + r"\b", re.IGNORECASE)
phrase_display = " ".join(WORDS)

def generate_solution_urls():
    urls = []
    # November: 2008–2024, categories gen/thm/team/guts
    for year in range(2008, 2025):
        for cat in ("gen", "thm", "team", "guts"):
            urls.append(
                f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/nov/{cat}/solutions.pdf"
            )
    # February: 1998–2025, categories team/alg/comb/geo/guts
    for year in range(1998, 2026):
        for cat in ("team", "alg", "comb", "geo", "guts"):
            urls.append(
                f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/feb/{cat}/solutions.pdf"
            )
    # Invitational HMIC: 2013–2025
    for year in range(2013, 2026):
        urls.append(
            f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/hmic/solutions.pdf"
        )
    return urls


URLS = generate_solution_urls()


def extract_text(pdf_bytes: bytes) -> str:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    raw = " ".join(page.get_text() for page in doc)
    # collapse whitespace so regex isn’t thrown off by line-breaks
    return re.sub(r"\s+", " ", raw)


def process_url(url: str):
    try:
        if requests.head(url, timeout=5).status_code != 200:
            return None
        data = requests.get(url, timeout=15).content
        text = extract_text(data)
        m = PHRASE_RE.search(text)
        if m:
            snippet = text[max(0, m.start() - 50) : m.end() + 50]
            return url, snippet
    except Exception:
        return None


def main():
    matches = []
    with ThreadPoolExecutor(max_workers=16) as ex:
        futures = {ex.submit(process_url, u): u for u in URLS}
        for fut in as_completed(futures):
            res = fut.result()
            if res:
                matches.append(res)

    if matches:
        print(f"\nFound “{phrase_display}” in:\n")
        for url, snippet in matches:
            print(url)
            print("   ▶", snippet, "\n")
    else:
        print("No solutions PDFs contained the full phrase.")


if __name__ == "__main__":
    main()
