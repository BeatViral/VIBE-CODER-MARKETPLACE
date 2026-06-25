from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

ROOT_FILES = [
    "index.html",
    "404.html",
    "favicon.ico",
    "favicon.svg",
    "site.webmanifest",
    "browserconfig.xml",
]

ROOT_DIRS = ["assets"]


def copy_file(name):
    source = DIST / name
    destination = ROOT / name
    if source.exists():
        shutil.copy2(source, destination)


def copy_dir(name):
    source = DIST / name
    destination = ROOT / name
    if not source.exists():
        return
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination)


def main():
    if not DIST.exists():
        raise SystemExit("dist does not exist. Run the Vite build first.")

    for name in ROOT_FILES:
        copy_file(name)

    for name in ROOT_DIRS:
        copy_dir(name)

    print("Synced compiled GitHub Pages files from dist to repository root.")


if __name__ == "__main__":
    main()
