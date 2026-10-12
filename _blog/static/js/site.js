(() => {
'use strict';
const themeButton = document.querySelector('.theme-toggle');
const syncTheme = () => themeButton?.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
syncTheme();
themeButton?.addEventListener('click', () => { const dark = document.documentElement.dataset.theme !== 'dark'; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; try { localStorage.setItem('lilanovo-theme', dark ? 'dark' : 'light'); } catch {} syncTheme(); });
const dialog = document.querySelector('.search-dialog');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
let index = null, pending;
const message = text => { const p = document.createElement('p'); p.className = 'muted'; p.textContent = text; results.replaceChildren(p); };
const search = async () => { const q = input.value.trim().toLocaleLowerCase(); if(!q){message('Type a keyword to search all articles.');return;} try { if(!index) { pending ||= fetch(document.body.dataset.searchIndex).then(r => { if(!r.ok) throw Error('index'); return r.json(); }).catch(err=>{pending=null;throw err;}); index = await pending; } if(q !== input.value.trim().toLocaleLowerCase()) return; const hits = index.filter(p => (p.title + ' ' + p.description + ' ' + p.tags.join(' ') + ' ' + p.content).toLocaleLowerCase().includes(q)); results.replaceChildren(); if(!hits.length){message('No matching articles. Try safety, self-improvement, or agents.');return;} hits.forEach(p => { const a = document.createElement('a'); a.className = 'search-result'; a.href = p.url; const h = document.createElement('h3'); h.textContent = p.title; const d = document.createElement('p'); d.textContent = p.description; a.append(h,d); results.append(a); }); } catch { message('Search is unavailable. Browse all articles in the Archive.'); } };
const open = () => { if(!dialog.open) dialog.showModal(); input.focus(); };
document.querySelector('.search-open')?.addEventListener('click', open);
document.querySelector('.search-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => {if(e.target === dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
input?.addEventListener('input',search);
document.addEventListener('keydown',e => {if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!e.metaKey&&!e.ctrlKey){e.preventDefault();open();}});
if(window.renderMathInElement){window.renderMathInElement(document.getElementById('main'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});}
})();
