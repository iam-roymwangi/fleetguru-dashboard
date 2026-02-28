import os
import glob
import re

replacements = {
    r'text-slate-100': 'text-foreground',
    r'border-slate-600': 'border-border',
    r'border-slate-500/20': 'border-border',
    r'bg-slate-500/10': 'bg-muted',
    r'bg-slate-600': 'bg-secondary',
}

files = glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)

    if content != original_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')

print('Done.')
