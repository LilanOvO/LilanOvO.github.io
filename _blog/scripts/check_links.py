from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import json, os

base_path=urlparse(os.environ.get("SITE_BASE_URL", "https://example.org/")).path.rstrip("/")

root=Path('dist').resolve()
class Page(HTMLParser):
    def __init__(self): super().__init__();self.links=[];self.ids=set();self.title=False
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.add(attrs['id'])
        if tag=='title':self.title=True
        for field in ('href','src'):
            if field in attrs:self.links.append(attrs[field])
pages={}
for p in root.rglob('*.html'):
    parsed=Page();parsed.feed(p.read_text());pages[p]=parsed
errors=[]
for p,parsed in pages.items():
    if not parsed.title:errors.append(f'No title: {p}')
    for link in parsed.links:
        url=urlparse(link)
        if url.scheme or url.netloc or not url.path and not url.fragment:continue
        local_path=unquote(url.path)
        if base_path and local_path.startswith(base_path + '/'):
            local_path=local_path[len(base_path):]
        target=(root / local_path.lstrip('/')) if local_path.startswith('/') else p.parent / local_path if local_path else p
        if target.is_dir():target=target/'index.html'
        target=target.resolve()
        if not target.exists():errors.append(f'{p.relative_to(root)} -> missing {link}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:errors.append(f'{p.relative_to(root)} -> missing anchor {link}')
index=json.loads((root/'index.json').read_text())
assert len(index)==len(list(Path('content/posts').glob('*/index.md'))), 'Search index count differs'
for p in index:
    assert p['title'] and p['content'] and p['url'] and p['tags'], 'Incomplete search document'
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages, internal resources and anchors, {len(index)} searchable articles')
