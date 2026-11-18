import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const base = '/ai-work-notes/';
const output = '_site/ai-work-notes';
const md = new MarkdownIt();
const esc = md.utils.escapeHtml;
const catalog = [];
const shared = new Map();
const groups = {daily:'일상 사무', files:'분석·파일 제작', notes:'사용기', guide:'시작 안내'};
for (const group of Object.keys(groups)) {
  for (const file of fs.readdirSync('content/' + group).filter(name => name.endsWith('.md')).sort()) {
    const slug = file.slice(0,-3);
    const route = (['daily','files'].includes(group) ? 'tasks' : group) + '/' + slug + '/';
    if (catalog.some(page => page.route === route)) throw Error('중복 주소 ' + route);
    const raw = fs.readFileSync('content/'+group+'/'+file, 'utf8').replaceAll('\r\n','\n');
    const [, title, body] = raw.match(/^# ([^\n]+)\n([\s\S]*)$/);
    const page = {group,slug,route,title,body};
    catalog.push(page);
    for (const token of md.parse(body,{})) {
      if (token.type === 'fence' && token.info.startsWith('prompt ')) {
        const id = token.info.split(' ')[1];
        if (shared.has(id)) throw Error('중복 프롬프트 ' + id);
        shared.set(id, token.content);
      }
    }
  }
}
function prompt(value) {
  return '<div class="prompt"><div class="bar"><b>프롬프트</b><span role="status"></span><button class="copy" type="button">복사</button></div><pre>'+esc(value.replace(/\n$/,''))+'</pre></div>';
}
const fence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens,i,...rest) => tokens[i].info.split(' ')[0] === 'prompt' ? prompt(tokens[i].content) : fence(tokens,i,...rest);
function render(body) {
  return md.render(body).replace(/<p>\{\{prompt ([\w-]+)\}\}<\/p>/g, (_, id) => {
    if (!shared.has(id)) throw Error('알 수 없는 프롬프트 ' + id);
    return prompt(shared.get(id));
  }).replace(/<h2>([^<]+) \{#([\w-]+)\}<\/h2>/g,'<h2 id="$2">$1</h2>').replaceAll('<table>','<div class="table-wrap"><table>').replaceAll('</table>','</table></div>');
}
function link(route,label,cls='') {
  return '<a class="'+cls+'" href="'+base+route+'">'+label+'</a>';
}
function write(route,title,body) {
  const folder = path.join(output,route);
  fs.mkdirSync(folder,{recursive:true});
  fs.writeFileSync(path.join(folder,'index.html'), `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}${route?' · AI 업무 노트':''}</title><link rel="stylesheet" href="${base}style.css"><script src="${base}copy.js" defer></script></head><body>
<a class="skip" href="#main">본문 바로가기</a><header><div class="wrap mast">${link('','<i aria-hidden="true"></i> AI 업무 노트','brand')}<nav aria-label="주 메뉴">${link('tasks/','바로 써보기')}${link('notes/','사용기')}${link('guide/setup/','설치 안내')}</nav></div></header>
<main class="wrap" id="main">${body}</main><footer><div class="wrap">AI 업무 노트</div></footer></body></html>`);
}
function cards(pages) {
  return '<ul class="cards">'+pages.map(p=>'<li>'+link(p.route,esc(p.title)+' <span aria-hidden="true">↗</span>')+'</li>').join('')+'</ul>';
}
const find = slug => catalog.find(p=>p.slug===slug);
const intro = '<p>업무에 맞는 프롬프트를 골라 복사하고,<br>대괄호 안을 내 자료로 채워 보세요.</p>';
write('', 'AI 업무 노트', `<section class="hero"><div><h1>AI 업무 노트<span>.</span></h1>${intro}<div class="actions">${link('tasks/','바로 써보기　→','primary')}${link('notes/','사용기 읽기　↗','secondary')}</div></div><aside class="sheet"><small>사용기에서</small><h2>한 고객, 두 번의 주문</h2><div class="ledger"><p>주문당 평균 <strong>30,000<em>원</em></strong></p><p>고객당 매출 <strong>60,000<em>원</em></strong></p></div>${link('notes/average/','두 금액이 다른 이유 읽기　→')}</aside></section>
<section><div class="section-head"><h2>바로 써보기</h2>${link('tasks/','전체 업무 보기 →')}</div>${cards(['meeting','review','sales'].map(find))}</section>
<div class="start">${link('guide/setup/','처음 사용하시나요?　<strong>사용 환경과 설치 안내 →</strong>')}</div>`);
write('tasks/','바로 써보기','<h1>바로 써보기</h1>'+intro+['daily','files'].map(g=>'<section><h2>'+groups[g]+'</h2>'+cards(catalog.filter(p=>p.group===g))+'</section>').join('')+'<aside class="start">견적 비교 후 결재를 올릴 때는 '+link('tasks/quotes/','두 견적의 비용 비교하기')+'에서 확인한 조건과 금액을 '+link('tasks/approval/','사내 양식으로 기안서 쓰기')+'에 넣으세요.</aside>');
write('notes/','사용기','<h1>사용기</h1>'+cards(catalog.filter(p=>p.group==='notes')));
for (const page of catalog) {
  const parent = page.group==='notes'?'notes/':page.group==='guide'?'':'tasks/';
  const label = parent==='tasks/'?'바로 써보기':parent==='notes/'?'사용기':'첫 화면';
  write(page.route,page.title,'<article><div class="crumb">'+link(parent,'← '+label)+'</div><h1>'+esc(page.title)+'</h1>'+render(page.body)+'</article>');
}
for (const file of fs.readdirSync('assets')) fs.copyFileSync('assets/'+file,path.join(output,file));
