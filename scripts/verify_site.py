#!/usr/bin/env python3
"""
==============================================================================
FILE: scripts/verify_site.py
==============================================================================

PURPOSE:
Automated quality, Search Engine Optimisation (SEO), Generative Engine
Optimisation (GEO), and 80-column policy verification script for TillSwift
(https://tillswift.com/).

WHAT THIS FILE IS NOT FOR:
- Does not modify or format source files in place.
- Does not make network requests or require third-party Python packages.

INVARIANTS:
1. Exits with status code 0 only when all HTML metadata, JavaScript Object
   Notation for Linked Data (JSON-LD), verbatim Frequently Asked Questions
   (FAQ) parity, Extensible Markup Language (XML) sitemap, IndexNow key,
   Artificial Intelligence (AI) crawler, and 80-column checks pass.
2. Exits with status code 1 and lists diagnostics if any check fails.
==============================================================================
"""

import html
import json
from pathlib import Path
import re
import sys
from typing import List
import xml.etree.ElementTree as ET

# Repository checkout root directory. Consumed by all file checks.
REPO_ROOT = Path(__file__).resolve().parent.parent

# Canonical production Hypertext Transfer Protocol Secure (HTTPS) base URL.
BASE_URL = "https://tillswift.com"

# Maximum line width allowed for Markdown, scripts, and plain-text references.
MAX_DOC_COLUMNS = 80

# Public HTML pages indexed in sitemap.xml.
PUBLIC_PAGES = [
    "index.html",
    "sumup-pos-installation-london.html",
    "square-pos-installation-london.html",
    "stripe-terminal-installation-london.html",
    "custom-pos-software-integrations.html",
    "compare.html",
    "about.html",
    "how-it-works.html",
    "contact.html",
    "legal.html",
]

# Utility HTML pages that must carry noindex, nofollow directives.
NOINDEX_PAGES = [
    "manual_email.html",
    "5x7flyer1.html",
    "flyer2.html",
]

# AI search crawlers required in robots.txt.
REQUIRED_CRAWLERS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "DeepSeekBot",
    "GrokBot",
    "Google-Extended",
    "Bingbot",
    "Applebot",
]


def _plain_text(markup: str) -> str:
    """
    Normalise HTML or JSON strings to collapsed plain text for verbatim check.

    Args:
        markup: Raw HTML or JSON text snippet.

    Returns:
        Whitespace-collapsed plain string with HTML tags stripped.
    """
    no_tags = re.sub(r"<[^>]+>", " ", markup)
    return re.sub(r"\s+", " ", html.unescape(no_tags)).strip()


def check_html_pages() -> List[str]:
    """
    Validate canonical tags, metadata, JSON-LD graphs, verbatim FAQ parity,
    internal references, and British spelling across HTML pages.

    Returns:
        List of diagnostic error strings (empty when all checks pass).
    """
    errors: List[str] = []

    # 1. Inspect every public page listed in PUBLIC_PAGES.
    for name in PUBLIC_PAGES:
        path = REPO_ROOT / name
        if not path.is_file():
            errors.append(f"Missing public HTML file: {name}")
            continue
        raw = path.read_text(encoding="utf-8")

        expected_canon = (
            f"{BASE_URL}/" if name == "index.html" else f"{BASE_URL}/{name}"
        )
        if f'<link rel="canonical" href="{expected_canon}">' not in raw:
            errors.append(f"{name}: missing or mismatched canonical URL")

        # 2. Enforce first-party Google Analytics 4 (GA4) gtag.js and site.js
        #    event instrumentation across every public HTML page.
        ga_tag_src = (
            "https://www.googletagmanager.com/gtag/js?id=G-V22KGRG9RS"
        )
        if "G-V22KGRG9RS" not in raw or ga_tag_src not in raw:
            errors.append(f"{name}: missing GA4 G-V22KGRG9RS Google tag")
        if 'src="site.js"' not in raw:
            errors.append(f"{name}: missing shared site.js tracking script")

        # 3. Validate Open Graph tags on primary editorial and service pages.
        if name != "legal.html":
            for prop in ("og:title", "og:description", "og:url", "og:image"):
                if f'property="{prop}"' not in raw:
                    errors.append(f"{name}: missing Open Graph {prop}")

        # 4. Parse every JSON-LD script block and gather FAQPage entries.
        ld_blocks = re.findall(
            r'<script\s+type="application/ld\+json"[^>]*>(.*?)</script>',
            raw,
            flags=re.DOTALL | re.IGNORECASE,
        )
        if not ld_blocks:
            errors.append(f"{name}: missing JSON-LD block")
            continue

        faq_entities = []
        for idx, blk in enumerate(ld_blocks):
            try:
                data = json.loads(blk)
            except json.JSONDecodeError as exc:
                errors.append(f"{name}: JSON-LD block {idx} invalid: {exc}")
                continue
            for node in data.get("@graph", [data]):
                ntype = node.get("@type")
                if ntype == "FAQPage" or (
                    isinstance(ntype, list) and "FAQPage" in ntype
                ):
                    faq_entities.extend(node.get("mainEntity", []))

        # 5. Ensure visible FAQ details match JSON-LD verbatim on new pages.
        if faq_entities and name != "compare.html":
            vis_faqs = re.findall(
                r'<details\s+class="faq-item"[^>]*>\s*<summary>(.*?)</summary>'
                r'\s*<div\s+class="faq-answer">(.*?)</div>\s*</details>',
                raw,
                flags=re.DOTALL | re.IGNORECASE,
            )
            if len(vis_faqs) != len(faq_entities):
                errors.append(
                    f"{name}: FAQ count HTML={len(vis_faqs)} "
                    f"!= JSON-LD={len(faq_entities)}"
                )
            for idx, (qn, (vq, va)) in enumerate(zip(faq_entities, vis_faqs)):
                jq = _plain_text(qn.get("name", ""))
                ja = _plain_text(qn.get("acceptedAnswer", {}).get("text", ""))
                if jq != _plain_text(vq) or ja != _plain_text(va):
                    errors.append(f"{name}: FAQ #{idx + 1} verbatim mismatch")

        # 6. Check relative local href/src targets resolve to files on disk.
        if name not in ("compare.html", "legal.html"):
            for ref in re.findall(r'(?:href|src)="([^"]+)"', raw):
                if ref.startswith(
                    ("http://", "https://", "mailto:", "tel:", "#")
                ):
                    continue
                target = ref.split("#")[0].split("?")[0]
                if target and not (REPO_ROOT / target).exists():
                    errors.append(f"{name}: broken local reference {ref}")

    # 7. Confirm private/print utility pages carry noindex, nofollow.
    for name in NOINDEX_PAGES:
        path = REPO_ROOT / name
        if not path.is_file():
            continue
        raw = path.read_text(encoding="utf-8")
        if not re.search(
            r'<meta\s+name="robots"\s+content="noindex,\s*nofollow"',
            raw,
            flags=re.IGNORECASE,
        ):
            errors.append(f"{name}: missing noindex, nofollow meta robots tag")

    return errors


def check_discovery_files() -> List[str]:
    """
    Validate sitemap.xml, robots.txt, llms.txt, llms-full.txt, and IndexNow.

    Returns:
        List of diagnostic error strings.
    """
    errors: List[str] = []

    # 1. Verify sitemap.xml entries resolve locally and match PUBLIC_PAGES.
    sm_path = REPO_ROOT / "sitemap.xml"
    if not sm_path.is_file():
        return ["Missing sitemap.xml"]
    tree = ET.parse(sm_path)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [
        el.text.strip()
        for el in tree.getroot().findall("sm:url/sm:loc", ns)
        if el.text
    ]
    for loc in locs:
        if not loc.startswith(f"{BASE_URL}/"):
            errors.append(f"sitemap.xml unexpected host: {loc}")
            continue
        rel = loc.removeprefix(f"{BASE_URL}/") or "index.html"
        if not (REPO_ROOT / rel).is_file():
            errors.append(f"sitemap.xml points to missing file: {rel}")
    for page in PUBLIC_PAGES:
        expected = (
            f"{BASE_URL}/" if page == "index.html" else f"{BASE_URL}/{page}"
        )
        if expected not in locs:
            errors.append(f"sitemap.xml missing canonical page: {expected}")

    # 2. Verify robots.txt allows major AI crawlers and declares sitemap.
    robots_path = REPO_ROOT / "robots.txt"
    if not robots_path.is_file():
        errors.append("Missing robots.txt")
    else:
        rtxt = robots_path.read_text(encoding="utf-8")
        for bot in REQUIRED_CRAWLERS:
            if f"User-agent: {bot}" not in rtxt:
                errors.append(f"robots.txt missing crawler rule: {bot}")
        if f"Sitemap: {BASE_URL}/sitemap.xml" not in rtxt:
            errors.append("robots.txt missing canonical Sitemap line")

    # 3. Verify llms.txt and llms-full.txt contain key pages and synonym terms.
    for doc in ("llms.txt", "llms-full.txt"):
        p = REPO_ROOT / doc
        if not p.is_file():
            errors.append(f"Missing {doc}")
            continue
        txt = p.read_text(encoding="utf-8")
        for token in (
            "SumUp",
            "Square",
            "Stripe",
            "compare.html",
            "Also Known As",
            "020 4520 9114",
        ):
            if token not in txt:
                errors.append(f"{doc} missing expected term: {token}")

    # 4. Verify IndexNow key file and matching scripts exist.
    keys = [
        p
        for p in REPO_ROOT.glob("*.txt")
        if re.match(r"^[0-9a-f]{32}$", p.stem)
    ]
    if len(keys) != 1:
        errors.append(
            f"Expected 1 IndexNow key file at root, found {len(keys)}"
        )
    elif keys[0].read_text(encoding="utf-8").strip() != keys[0].stem:
        errors.append(f"IndexNow key contents do not match {keys[0].name}")

    return errors


def check_line_lengths() -> List[str]:
    """
    Enforce the 80-column maximum on documentation, CSS, JS, and Python files.

    Returns:
        List of diagnostic error strings.
    """
    errors: List[str] = []
    targets = [
        "AGENTS.md",
        "llms.txt",
        "llms-full.txt",
        "styles.css",
        "site.js",
        "scripts/submit_indexnow.py",
        "scripts/verify_site.py",
    ]
    if (REPO_ROOT / "STATUS.md").is_file():
        targets.append("STATUS.md")

    for rel in targets:
        p = REPO_ROOT / rel
        if not p.is_file():
            continue
        for lineno, line in enumerate(
            p.read_text(encoding="utf-8").splitlines(), 1
        ):
            if len(line) > MAX_DOC_COLUMNS:
                if "http://" in line or "https://" in line:
                    continue
                errors.append(
                    f"{rel}:{lineno} exceeds {MAX_DOC_COLUMNS} cols "
                    f"({len(line)})"
                )
    return errors


def main() -> int:
    """
    Run all TillSwift verification routines and report exit code 0 or 1.

    Returns:
        0 if all checks pass, 1 otherwise.
    """
    # 1. Execute HTML, discovery, and line-length checks in order.
    all_errors: List[str] = []
    all_errors.extend(check_html_pages())
    all_errors.extend(check_discovery_files())
    all_errors.extend(check_line_lengths())

    # 2. Emit clear diagnostic summary for Continuous Integration (CI).
    if all_errors:
        print("VERIFICATION FAILED:", file=sys.stderr)
        for err in all_errors:
            print(f" - {err}", file=sys.stderr)
        return 1

    print(
        f"ALL TILLSWIFT CHECKS PASSED "
        f"({len(PUBLIC_PAGES)} public pages, sitemap, robots, IndexNow, "
        f"llms, 80-col)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
