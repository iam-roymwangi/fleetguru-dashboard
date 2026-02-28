import os
import glob
import re

replacements = {
    r'bg-slate-950': 'bg-background',
    r'bg-slate-900(?!\/)': 'bg-card',
    r'bg-slate-900/50': 'bg-card/50',
    r'bg-slate-800(?!\/)': 'bg-muted',
    r'bg-slate-800/50': 'bg-muted/50',
    r'bg-slate-700': 'bg-accent',
    r'border-slate-800': 'border-border',
    r'border-slate-700': 'border-border',
    r'text-slate-300': 'text-muted-foreground',
    r'text-slate-400': 'text-muted-foreground',
    r'text-slate-500': 'text-muted-foreground',
    r'text-slate-600': 'text-muted-foreground',
    r'text-white': 'text-foreground',
}

files = glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for old, new in replacements.items():
        content = re.sub(r'\b' + old + r'\b', new, content)

    if content != original_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')

print('Done.')
