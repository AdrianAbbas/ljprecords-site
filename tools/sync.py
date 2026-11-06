#!/usr/bin/env python3
"""Stamp the shared header, footer and <head> tags into every page, and rebuild sitemap.xml.

Run from the repo root after editing anything in partials/:
    python3 tools/sync.py

Each page needs these markers (already present in every page):
    <body data-page="artists">            which nav link to highlight (home, artists, services,
                                           windward, about, contact, or none)
    <!-- BEGIN:head --><!-- END:head -->   inside <head>, after <title> and <meta name="description">
    <!-- BEGIN:header --><!-- END:header --> at the top of <body>
    <!-- BEGIN:footer --><!-- END:footer --> at the bottom of <body>
The script needs no extra packages, and GitHub Pages serves the files exactly as committed.
"""
import html, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://ljprecords.ca/"
PARTIALS = {n: (ROOT / "partials" / f"{n}.html").read_text().strip() for n in ("head", "header", "footer")}
SKIP_DIRS = {"partials", "tools", ".git", "node_modules"}
NAV_KEYS = ("home", "artists", "services", "windward", "about", "contact")


def pages():
    for p in sorted(ROOT.rglob("*.html")):
        if not SKIP_DIRS.intersection(p.relative_to(ROOT).parts):
            yield p


def render(part, page, rel, text):
    depth = len(rel.parts) - 1
    # 404.html is served at any URL depth, so it uses root-absolute links.
    root = "/" if rel.name == "404.html" else ("../" * depth or "./")
    url_path = "" if rel.as_posix() == "index.html" else rel.as_posix()
    title = html.unescape(re.search(r"<title>(.*?)</title>", text, re.S).group(1).strip())
    desc_m = re.search(r'<meta name="description" content="(.*?)"', text, re.S)
    desc = html.unescape(desc_m.group(1)) if desc_m else ""
    out = PARTIALS[part]
    out = out.replace("{{root}}", root).replace("{{url}}", SITE + url_path)
    out = out.replace("{{title}}", html.escape(title)).replace("{{description}}", html.escape(desc))
    for key in NAV_KEYS:
        out = out.replace("{{current:%s}}" % key, ' aria-current="page"' if key == page else "")
    return out


def main():
    urls = []
    for p in pages():
        rel = p.relative_to(ROOT)
        text = p.read_text()
        m = re.search(r'<body[^>]*data-page="([a-z-]*)"', text)
        page = m.group(1) if m else ""
        for part in ("head", "header", "footer"):
            pat = re.compile(r"(<!-- BEGIN:%s -->)(.*?)(<!-- END:%s -->)" % (part, part), re.S)
            if not pat.search(text):
                raise SystemExit(f"{rel}: missing BEGIN/END:{part} markers")
            block = render(part, page, rel, text)
            text = pat.sub(lambda mm: mm.group(1) + "\n  " + block + "\n  " + mm.group(3), text, count=1)
        p.write_text(text)
        if rel.name != "404.html":
            urls.append(SITE + ("" if rel.as_posix() == "index.html" else rel.as_posix()))
        print("synced", rel)
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{u}</loc></url>" for u in urls]
    sm.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n")
    print("wrote sitemap.xml with", len(urls), "URLs")


if __name__ == "__main__":
    main()
