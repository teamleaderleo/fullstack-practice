import re
import requests
import fitz  # PyMuPDF
from concurrent.futures import ThreadPoolExecutor, as_completed

# Broad phrase to verify reading: "find all"
pattern = re.compile(r"\bfind\s+all\b", re.IGNORECASE)

# Paste in your *problems* URLs list here:
URLS = [
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2009/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2011/nov/gen/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2013/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2014/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2019/nov/gen/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2019/nov/thm/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2019/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2022/nov/thm/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2022/nov/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/1999/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/1999/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2000/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2000/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2001/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2001/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2002/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2003/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2004/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2004/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2005/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2006/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2006/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2007/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2009/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2010/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2011/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2013/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2014/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2014/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2016/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2017/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2018/feb/guts/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/team/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2013/hmic/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2018/hmic/problems.pdf",
    "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/hmic/problems.pdf",
]


def extract_with_fitz(pdf_bytes):
    """Extracts text from PDF bytes and collapses whitespace."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    raw = " ".join(page.get_text() for page in doc)
    return re.sub(r"\s+", " ", raw)


def process_url(url):
    """Download, parse, and search one URL. Returns (url, snippet) or None."""
    try:
        head = requests.head(url, timeout=5)
        if head.status_code != 200:
            return None

        resp = requests.get(url, timeout=15)
        text = extract_with_fitz(resp.content)
        m = pattern.search(text)
        if m:
            snippet = text[max(0, m.start() - 40) : m.end() + 40]
            return url, snippet
    except Exception:
        return None


def main():
    matches = []
    # adjust max_workers as needed
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(process_url, url): url for url in URLS}
        for future in as_completed(futures):
            result = future.result()
            if result:
                matches.append(result)

    if matches:
        print("\nPDFs containing “find all”:\n")
        for url, snippet in matches:
            print(url)
            print("   ▶", snippet, "\n")
    else:
        print("No matches for “find all” found.")


if __name__ == "__main__":
    main()
