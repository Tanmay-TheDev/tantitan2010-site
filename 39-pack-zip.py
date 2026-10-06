#!/usr/bin/env python3
"""Build /home/user/tantitan2010-command-center.zip from this folder.

Re-run anytime, or leave watch-zip.py running to rebuild on file changes.
"""
from __future__ import annotations

import hashlib
import os
import sys
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path

SITE = Path(__file__).resolve().parent
OUT = Path("/home/user/tantitan2010-command-center.zip")
ROOT_NAME = "tantitan2010-site"
SKIP_NAMES = {".DS_Store", "Thumbs.db"}
SKIP_SUFFIXES = {".zip"}
SKIP_DIRS = {".git", "__pycache__", ".arena", "node_modules"}


def should_skip(path: Path) -> bool:
    if path.name in SKIP_NAMES:
        return True
    if path.suffix.lower() in SKIP_SUFFIXES:
        return True
    return any(part in SKIP_DIRS for part in path.parts)


def iter_files() -> list[Path]:
    files: list[Path] = []
    for path in SITE.rglob("*"):
        if should_skip(path.relative_to(SITE)):
            continue
        if path.is_file() or path.is_symlink():
            files.append(path)
    files.sort(key=lambda p: str(p.relative_to(SITE)).lower())
    return files


def add_file(zf: zipfile.ZipFile, path: Path) -> None:
    rel = path.relative_to(SITE).as_posix()
    arc = f"{ROOT_NAME}/{rel}"
    if path.is_symlink():
        target = path.resolve()
        if target.is_file() and SITE in target.parents or target.parent == SITE:
            zf.write(target, arcname=arc)
            return
    info = zipfile.ZipInfo.from_file(path, arcname=arc)
    info.compress_type = zipfile.ZIP_DEFLATED
    with path.open("rb") as src, zf.open(info, "w") as dst:
        while True:
            chunk = src.read(1024 * 1024)
            if not chunk:
                break
            dst.write(chunk)


def pack() -> Path:
    files = iter_files()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix="tantitan2010-", suffix=".zip", dir=str(OUT.parent))
    os.close(fd)
    tmp = Path(tmp_name)
    try:
        with zipfile.ZipFile(tmp, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
            for path in files:
                add_file(zf, path)
        tmp.replace(OUT)
    except Exception:
        if tmp.exists():
            tmp.unlink()
        raise

    digest = hashlib.sha256(OUT.read_bytes()).hexdigest()
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"Wrote {OUT}")
    print(f"  files : {len(files)}")
    print(f"  size  : {OUT.stat().st_size:,} bytes")
    print(f"  sha256: {digest}")
    print(f"  built : {stamp}")
    return OUT


if __name__ == "__main__":
    try:
        pack()
    except Exception as exc:
        print(f"pack failed: {exc}", file=sys.stderr)
        sys.exit(1)
