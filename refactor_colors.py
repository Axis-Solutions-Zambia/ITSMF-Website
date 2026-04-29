import os
import re

src_dir = '/Users/bwezani/Documents/axissol/Projects/ITSMF/itsmf-website/src'

replacements = {
    r'border-white/(\d+)': r'border-brand-text/\1',
    r'bg-white/(\d+)': r'bg-brand-text/\1',
    r'hover:bg-slate-900/60': r'hover:bg-brand-text/10',
    r'hover:bg-slate-900/40': r'hover:bg-brand-text/5',
    r'hover:bg-white\b': r'hover:bg-brand-text',
    r'hover:text-brand-dark': r'hover:text-brand-bg',
    r'text-white\b': r'text-brand-text',
    r'border-white\b': r'border-brand-text',
    r'bg-white\b': r'bg-brand-text',
}

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.css'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = re.sub(old, new, new_content)
                
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
