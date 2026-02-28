import os
import glob
import re

replacements = {
    r'data-\[state=active\]:border-blue-500': 'data-[state=active]:border-primary',
    r'bg-blue-600 hover:bg-blue-700': 'bg-primary hover:bg-primary/90',
    r'"bg-blue-500"': '"bg-primary"',
    r"'bg-blue-500'": "'bg-primary'",
    r'bg-blue-500/10 border-blue-500/20 text-blue-500': 'bg-primary/10 border-primary/20 text-primary',
}

files = glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for old, new in replacements.items():
        content = re.sub(old, new, content)

    if content != original_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')

print('Done.')
