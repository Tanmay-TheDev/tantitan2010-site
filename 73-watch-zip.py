#!/usr/bin/env python3
"""Rebuild tantitan2010-command-center.zip whenever site files change."""
from __future__ import annotations

import importlib.util
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("pack_zip", HERE / "pack-zip.py")
pack_zip = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(pack_zip)

SITE = pack_zip.SITE
SKIP_DIRS = pack_zip.SKIP_DIRS
SKIP_NAMES = pack_zip.SKIP_NAMES
SKIP_SUFFIXES = pack_zip.SKIP_SUFFIXES
pack = pack_zip.pack

POLL_SECONDS = 1.5
DEBOUNCE_SECONDS = 0.8


def snapshot() -> dict[str, tuple[int, int]]:
    state: dict[str, tuple[int, int]] = {}
    for path in SITE.rglob("*"):
        rel = path.relative_to(SITE)
        if path.name in SKIP_NAMES or path.suffix.lower() in SKIP_SUFFIXES:
            continue
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if path.is_file() or path.is_symlink():
            try:
                st = path.stat()
                state[str(rel)] = (st.st_mtime_ns, st.st_size)
            except FileNotFoundError:
                continue
    return state


def main() -> None:
    print(f"Watching {SITE} — zip updates on every save.", flush=True)
    last = snapshot()
    pack()
    while True:
        time.sleep(POLL_SECONDS)
        now = snapshot()
        if now == last:
            continue
        time.sleep(DEBOUNCE_SECONDS)
        now = snapshot()
        if now == last:
            continue
        changed = sorted(set(now) ^ set(last) | {k for k in now if now.get(k) != last.get(k)})
        print("change:", ", ".join(changed[:8]) + ("…" if len(changed) > 8 else ""), flush=True)
        try:
            pack()
            last = now
        except Exception as exc:
            print(f"rebuild failed: {exc}", file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
