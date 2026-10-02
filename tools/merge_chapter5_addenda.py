#!/usr/bin/env python3
"""將人工編寫的第五章增補，依章節順序合併至唯一正文主檔。可重複執行。"""
from pathlib import Path
base = Path(__file__).resolve().parents[1] / "data" / "content"
target = base / "chapter5_full_text.md"
text = target.read_text(encoding="utf-8")
initial = len(text)
for chapter in range(1, 12):
    addon = (base / "chapter5_addenda" / f"5-{chapter}.md").read_text(encoding="utf-8").strip()
    first_header = next((line for line in addon.splitlines() if line.startswith("### ")), None)
    assert first_header, f"5-{chapter}: empty or missing section header"
    if first_header in text:
        print(f"skip previously merged 5-{chapter}")
        continue
    if chapter < 11:
        needle = f"## 5-{chapter + 1}｜"
    else:
        needle = "### ch5.ending.001｜"
    assert text.count(needle) == 1, f"5-{chapter}: insertion marker not unique {needle}"
    text = text.replace(needle, addon + "\n\n" + needle, 1)
n = len(text)
assert 75000 <= n <= 95000, f"正文 Unicode 字元 {n}，未達規格"
assert text.endswith("——《凡人不修仙》第一部完。\n"), "final ending lost"
assert all(f"## 5-{i}｜" in text for i in range(1,12))
target.write_text(text, encoding="utf-8")
print(f"fifth chapter merged: original={initial}, unicode_chars={n}, utf8_bytes={len(text.encode('utf-8'))}, added={n-initial}, complete_sections=11")
