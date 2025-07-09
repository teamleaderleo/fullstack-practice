import re
import requests
import fitz  # PyMuPDF
from concurrent.futures import ThreadPoolExecutor, as_completed

# --- 1) Build the target phrase pattern ---
WORDS = ["has", "exactly", "three"]
PHRASE_RE = re.compile(r"\b" + r"\s+".join(WORDS) + r"\b", re.IGNORECASE)


# --- 2) Generate ALL problems-ONLY URLs ---
def generate_problem_urls():
    urls = []
    # November: 2008–2024, cats gen/thm/team/guts
    for year in range(2008, 2025):
        for cat in ("gen", "thm", "team", "guts"):
            urls.append(
                f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/nov/{cat}/problems.pdf"
            )
    # February: 1998–2025, cats team/alg/comb/geo/guts
    for year in range(1998, 2026):
        for cat in ("team", "alg", "comb", "geo", "guts"):
            urls.append(
                f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/feb/{cat}/problems.pdf"
            )
    # Invitational HMIC: 2013–2025
    for year in range(2013, 2026):
        urls.append(
            f"https://hmmt-archive.s3.amazonaws.com/tournaments/{year}/hmic/problems.pdf"
        )
    return urls


URLS = generate_problem_urls()


# --- 3) PDF download & text extraction ---
def extract_text(pdf_bytes: bytes) -> str:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    raw = " ".join(page.get_text() for page in doc)
    # collapse all whitespace
    return re.sub(r"\s+", " ", raw)


# --- 4) Process one URL: HEAD, GET, search ---
def process_url(url: str):
    try:
        if requests.head(url, timeout=5).status_code != 200:
            return None
        data = requests.get(url, timeout=15).content
        text = extract_text(data)
        m = PHRASE_RE.search(text)
        if m:
            snippet = text[max(0, m.start() - 40) : m.end() + 40]
            return url, snippet
    except Exception:
        return None


# --- 5) Parallel execution ---
def main():
    matches = []
    # Tune max_workers up to your CPU/network capacity
    with ThreadPoolExecutor(max_workers=16) as ex:
        futures = {ex.submit(process_url, u): u for u in URLS}
        for fut in as_completed(futures):
            res = fut.result()
            if res:
                matches.append(res)

    # --- 6) Report ---
    if matches:
        print("\nFound “Find all values of the real parameter” in:\n")
        for url, snippet in matches:
            print(url)
            print("   ▶", snippet, "\n")
    else:
        print("No PDFs contained the full phrase.")


if __name__ == "__main__":
    main()
