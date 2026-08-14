import './style.css';

const COLORS = {
  red: { label: '빨강', hex: '#d6544b' },
  orange: { label: '주황', hex: '#e58d42' },
  yellow: { label: '노랑', hex: '#e4c34e' },
  green: { label: '초록', hex: '#55a17d' },
  blue: { label: '파랑', hex: '#4d88bc' },
  purple: { label: '보라', hex: '#8b6cba' },
  black: { label: '검정', hex: '#425365' },
  white: { label: '흰색', hex: '#e9e8df' },
};
const COLOR_KEYS = Object.keys(COLORS);

const cities = {
  Vancouver: ['밴쿠버', 70, 86], Calgary: ['캘거리', 185, 105], Seattle: ['시애틀', 63, 170],
  Portland: ['포틀랜드', 53, 250], SanFrancisco: ['샌프란시스코', 88, 405], LosAngeles: ['로스앤젤레스', 145, 468],
  LasVegas: ['라스베이거스', 245, 432], Phoenix: ['피닉스', 294, 500], ElPaso: ['엘패소', 388, 490],
  SantaFe: ['산타페', 425, 405], Denver: ['덴버', 410, 320], Helena: ['헬레나', 315, 166], Winnipeg: ['위니펙', 470, 88],
  Duluth: ['덜루스', 592, 176], Sault: ['솔트 세인트 마리', 722, 135], Montreal: ['몬트리올', 835, 106], Boston: ['보스턴', 905, 166],
  NewYork: ['뉴욕', 850, 235], Pittsburgh: ['피츠버그', 750, 265], Toronto: ['토론토', 715, 193], Chicago: ['시카고', 615, 264],
  Omaha: ['오마하', 522, 286], KansasCity: ['캔자스시티', 536, 352], SaintLouis: ['세인트루이스', 623, 358], Nashville: ['내슈빌', 678, 407],
  LittleRock: ['리틀록', 618, 447], OklahomaCity: ['오클라호마시티', 510, 430], Dallas: ['댈러스', 537, 500], Houston: ['휴스턴', 616, 530],
  NewOrleans: ['뉴올리언스', 704, 520], Atlanta: ['애틀랜타', 762, 445], Miami: ['마이애미', 833, 548], Charleston: ['찰스턴', 855, 405],
  Raleigh: ['롤리', 833, 338], Washington: ['워싱턴', 803, 302],
};

const routes = [
  ['Vancouver','Calgary',4,'blue'], ['Vancouver','Seattle',1,'gray'], ['Seattle','Calgary',4,'gray'], ['Seattle','Portland',1,'purple'], ['Portland','SanFrancisco',5,'green'],
  ['SanFrancisco','LosAngeles',3,'yellow'], ['LosAngeles','LasVegas',2,'gray'], ['LosAngeles','Phoenix',3,'gray'], ['LosAngeles','ElPaso',6,'black'], ['LasVegas','SaltLake',0,'gray'],
  ['Phoenix','SantaFe',3,'yellow'], ['Phoenix','ElPaso',3,'gray'], ['ElPaso','SantaFe',2,'gray'], ['ElPaso','Denver',4,'red'], ['ElPaso','Dallas',4,'red'],
  ['SantaFe','Denver',2,'blue'], ['SantaFe','OklahomaCity',3,'blue'], ['Denver','Helena',4,'green'], ['Denver','Omaha',4,'purple'], ['Denver','KansasCity',4,'orange'],
  ['Helena','Calgary',4,'purple'], ['Helena','Winnipeg',4,'blue'], ['Helena','Duluth',6,'orange'], ['Helena','Omaha',5,'red'], ['Winnipeg','Duluth',4,'black'],
  ['Winnipeg','Sault',6,'gray'], ['Duluth','Sault',3,'gray'], ['Duluth','Toronto',6,'purple'], ['Duluth','Chicago',3,'red'], ['Duluth','Omaha',2,'gray'],
  ['Sault','Montreal',5,'black'], ['Sault','Toronto',2,'gray'], ['Montreal','Boston',2,'gray'], ['Montreal','NewYork',3,'blue'], ['Boston','NewYork',2,'yellow'],
  ['Toronto','Montreal',3,'gray'], ['Toronto','Pittsburgh',2,'gray'], ['Toronto','Chicago',4,'white'], ['Chicago','Pittsburgh',3,'orange'], ['Chicago','Omaha',4,'blue'],
  ['Chicago','SaintLouis',2,'green'], ['Omaha','KansasCity',1,'gray'], ['Omaha','KansasCity',1,'gray'], ['Omaha','SaintLouis',2,'white'], ['KansasCity','Denver',4,'black'],
  ['KansasCity','OklahomaCity',2,'gray'], ['KansasCity','SaintLouis',2,'blue'], ['SaintLouis','Pittsburgh',5,'green'], ['SaintLouis','Nashville',2,'gray'], ['SaintLouis','LittleRock',2,'gray'],
  ['OklahomaCity','SantaFe',3,'blue'], ['OklahomaCity','Dallas',2,'gray'], ['OklahomaCity','LittleRock',2,'gray'], ['Dallas','ElPaso',4,'green'], ['Dallas','Houston',1,'gray'],
  ['Houston','NewOrleans',2,'gray'], ['LittleRock','Dallas',2,'gray'], ['LittleRock','NewOrleans',3,'green'], ['LittleRock','Nashville',3,'white'], ['Nashville','Pittsburgh',2,'yellow'],
  ['Nashville','Atlanta',1,'orange'], ['Nashville','Raleigh',3,'black'], ['NewOrleans','Atlanta',4,'yellow'], ['NewOrleans','Miami',6,'red'], ['Atlanta','Miami',5,'blue'],
  ['Atlanta','Charleston',2,'purple'], ['Atlanta','Raleigh',2,'gray'], ['Charleston','Raleigh',2,'gray'], ['Raleigh','Washington',2,'gray'], ['Raleigh','Pittsburgh',2,'gray'],
  ['Washington','Pittsburgh',2,'green'], ['Washington','NewYork',2,'orange'], ['NewYork','Pittsburgh',2,'green'], ['SaltLake','Denver',3,'red'],
].map(([from,to,length,color], index) => ({ id: `${from}-${to}-${index}`, from, to, length, color: COLORS[color] ? color : 'gray', claimed: null }));
// A small western city used by two routes above; it remains off the board until the map is expanded.
routes.splice(9, 1);

const initialState = {
  turn: 1,
  currentPlayer: 0,
  players: [
    { name: '나 (Kevin)', color: '#e85d4a', trains: 42, score: 31, hand: { red: 2, orange: 3, yellow: 1, green: 2, blue: 4, purple: 1, black: 3, white: 2, wild: 1 }, tickets: ['Denver – Pittsburgh', 'Los Angeles – Chicago'] },
    { name: 'Mina', color: '#4e8dbe', trains: 38, score: 42, hand: { red: 1, orange: 2, yellow: 4, green: 1, blue: 2, purple: 3, black: 1, white: 2, wild: 0 }, tickets: ['Vancouver – Montreal'] },
    { name: 'Joon', color: '#e4b845', trains: 31, score: 27, hand: { red: 3, orange: 1, yellow: 2, green: 3, blue: 1, purple: 2, black: 1, white: 2, wild: 0 }, tickets: ['Duluth – Houston'] },
    { name: 'Sora', color: '#69a77b', trains: 45, score: 19, hand: { red: 1, orange: 2, yellow: 1, green: 4, blue: 2, purple: 1, black: 2, white: 1, wild: 0 }, tickets: ['Seattle – New York'] },
  ],
  faceUp: ['red', 'blue', 'wild', 'yellow', 'green'],
  deckCount: 93,
  routes: structuredClone(routes),
  selectedRoute: null,
  drawCount: 0,
  log: ['게임이 시작되었습니다. 노선을 선택하거나 카드를 뽑으세요.'],
};

let state = loadState();
function loadState() { try { return JSON.parse(localStorage.getItem('railbound-state')) || structuredClone(initialState); } catch { return structuredClone(initialState); } }
function saveState() { localStorage.setItem('railbound-state', JSON.stringify(state)); }
function esc(value) { return String(value).replace(/[&<>"']/g, (x) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[x])); }
function points(length) { return [0,1,2,4,7,10,15][length] || 0; }
function current() { return state.players[state.currentPlayer]; }
function city(id) { const [label,x,y] = cities[id] || [id,0,0]; return { label,x,y }; }
function cardIcon(color, small = false) { return `<span class="mini-card ${small?'mini-card--small':''}" style="--card:${COLORS[color]?.hex || '#f7f4e9'}"><i></i></span>`; }

function routeSvg() {
  const routeMarkup = state.routes.map((route) => {
    const a = city(route.from), b = city(route.to);
    if (!a.x || !b.x) return '';
    const dx = b.x-a.x, dy = b.y-a.y, len = Math.sqrt(dx*dx+dy*dy), nx = -dy/len*5, ny = dx/len*5;
    const offset = route.id.includes('gray-') ? 0 : (route.id.endsWith('-0') ? 0 : 0);
    const x1=a.x+nx*offset, y1=a.y+ny*offset, x2=b.x+nx*offset, y2=b.y+ny*offset;
    const active = state.selectedRoute === route.id ? ' selected' : '';
    const claimed = route.claimed ? ` claimed claimed--${route.claimed}` : '';
    const stroke = route.claimed ? state.players.find(p=>p.name===route.claimed)?.color || '#999' : COLORS[route.color]?.hex || '#8a8c83';
    const dash = route.color === 'gray' ? ' stroke-dasharray="8 5"' : '';
    return `<g class="route${active}${claimed}" data-route="${route.id}" tabindex="0" role="button" aria-label="${esc(city(route.from).label)} - ${esc(city(route.to).label)} ${route.length}칸"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="route-shadow"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" ${dash}/><text x="${(a.x+b.x)/2}" y="${(a.y+b.y)/2-7}" class="route-length">${route.length}</text></g>`;
  }).join('');
  const cityMarkup = Object.entries(cities).map(([id,[label,x,y]]) => `<g class="city" transform="translate(${x},${y})"><circle r="8"/><circle r="3" class="city-dot"/><text x="11" y="4">${label}</text></g>`).join('');
  return `<svg viewBox="0 0 980 600" class="map-svg" aria-label="미국 노선 지도"><defs><filter id="paper"><feTurbulence baseFrequency=".04" numOctaves="2" result="noise"/><feColorMatrix values="1 0 0 0 .7  0 1 0 0 .65  0 0 1 0 .55  0 0 0 .09 0"/></filter></defs><rect width="980" height="600" fill="#dce8df"/><path class="land" d="M25 72 Q180 28 340 52 Q515 25 694 72 Q850 57 940 145 L950 330 Q920 350 940 455 Q896 510 854 573 L700 565 Q675 540 590 560 L465 540 Q380 554 284 524 Q168 550 118 470 L65 411 Q30 321 40 245 Q14 170 25 72Z"/><path class="water-lines" d="M90 65 Q180 185 110 320 M920 90 Q850 195 908 303 M106 520 Q250 475 355 518"/><g class="routes-layer">${routeMarkup}</g><g class="cities-layer">${cityMarkup}</g></svg>`;
}

function handMarkup() {
  const me = current();
  return COLOR_KEYS.map((key) => `<button class="hand-card" data-draw-color="${key}" aria-label="${COLORS[key].label} 카드 ${me.hand[key] || 0}장"><span class="card-art" style="--card:${COLORS[key].hex}"><b>${key === 'white' ? '✦' : '◆'}</b></span><strong>${me.hand[key] || 0}</strong><small>${COLORS[key].label}</small></button>`).join('') + `<button class="hand-card wild-card" data-draw-color="wild"><span class="card-art" style="--card:#f4b64f"><b>★</b></span><strong>${me.hand.wild || 0}</strong><small>기관차</small></button>`;
}
function faceUpMarkup() { return state.faceUp.map((color,index) => `<button class="face-card ${color==='wild'?'wild-card':''}" data-face-index="${index}" style="--card:${COLORS[color]?.hex || '#f4b64f'}"><span>${color==='wild'?'★':'◆'}</span><b>${color==='wild'?'기관차':COLORS[color].label}</b></button>`).join(''); }
function playersMarkup() { return state.players.map((p,i) => `<div class="player-row ${i===state.currentPlayer?'is-turn':''}"><span class="avatar" style="--avatar:${p.color}">${p.name.slice(0,1)}</span><div class="player-copy"><b>${esc(p.name)}</b><small>${p.score}점 · 열차 ${p.trains}</small></div>${i===state.currentPlayer?'<span class="turn-dot">●</span>':''}</div>`).join(''); }
function ticketsMarkup() { return current().tickets.map((ticket, i) => `<div class="ticket"><span class="ticket-icon">✈</span><span>${esc(ticket)}</span><b>${i===0?'9':'16'}<small>점</small></b></div>`).join(''); }
function render() {
  const me = current();
  document.querySelector('#app').innerHTML = `<div class="shell">
    <header class="topbar"><a class="brand" href="#"><span class="brand-mark">✦</span><span>RAILBOUND<em>ONLINE</em></span></a><div class="room-code"><span>방 코드</span><strong>R7K4P2</strong><button data-action="copy">복사</button></div><div class="top-actions"><span class="connection"><i></i> 연결됨</span><button class="icon-btn" data-action="sound" aria-label="소리">⌁</button><button class="profile"><span class="avatar avatar--tiny">K</span> Kevin <b>⌄</b></button></div></header>
    <main class="game-layout"><aside class="left-panel"><div class="eyebrow">NORTH AMERICA · 1910</div><h1>대륙 횡단<br><span>열차를 연결하세요.</span></h1><div class="turn-card"><div class="turn-label"><span class="live-dot"></span> 현재 차례</div><div class="turn-player"><span class="avatar" style="--avatar:${me.color}">${me.name.slice(0,1)}</span><div><b>${esc(me.name)}</b><small>행동을 선택하세요</small></div><strong>${me.score}<small>점</small></strong></div><div class="turn-progress"><span style="width:${Math.max(12,100-(42-me.trains)*2.1)}%"></span></div><small class="turn-help">노선을 점령하거나 열차 카드를 뽑을 수 있습니다.</small></div><section class="players"><div class="section-title"><b>플레이어</b><span>${state.players.length} / 5</span></div>${playersMarkup()}</section><section class="activity"><div class="section-title"><b>최근 활동</b><button data-action="clear-log">더보기</button></div><div class="log">${state.log.slice(-4).reverse().map((x,i)=>`<p class="log-item ${i===0?'latest':''}"><span>${i===0?'●':'○'}</span>${esc(x)}</p>`).join('')}</div></section></aside>
    <section class="board-area"><div class="board-head"><div><span class="eyebrow">GAME 01 · 당신의 턴</span><h2>미국 횡단 노선도</h2></div><div class="board-tools"><button data-action="zoom-out">−</button><span>100%</span><button data-action="zoom-in">＋</button><button class="help-btn" data-action="rules">? <span>게임 방법</span></button></div></div><div class="map-wrap"><div class="map-label map-label--west">WEST</div><div class="map-label map-label--east">EAST</div>${routeSvg()}<div class="map-tip ${state.selectedRoute?'show':''}">${state.selectedRoute ? '노선을 점령하려면 오른쪽 버튼을 누르세요.' : '노선을 클릭해 자세히 확인하세요.'}</div></div><div class="board-footer"><div class="legend"><span><i class="legend-line legend-line--mine"></i>내 노선</span><span><i class="legend-line legend-line--other"></i>상대 노선</span><span><i class="legend-line legend-line--open"></i>미점령</span></div><div class="remaining"><span>남은 열차</span><strong>${me.trains}</strong><small>/ 45</small></div></div></section>
    <aside class="right-panel"><section class="side-section route-selection"><div class="section-title"><b>선택한 노선</b><span>${state.selectedRoute ? '선택됨' : '노선 없음'}</span></div>${selectedRouteMarkup()}<button class="claim-btn" data-action="claim" ${state.selectedRoute?'':'disabled'}>노선 점령하기 <span>→</span></button></section><section class="side-section draw-section"><div class="section-title"><b>열차 카드</b><span>덱 ${state.deckCount}</span></div><div class="face-up">${faceUpMarkup()}</div><button class="draw-deck" data-action="draw-deck"><span class="deck-icon">▥</span><span><b>카드 더미에서 뽑기</b><small>카드를 최대 2장 뽑을 수 있어요</small></span><strong>＋</strong></button></section><section class="side-section hand-section"><div class="section-title"><b>내 카드</b><span>${Object.values(me.hand).reduce((a,b)=>a+b,0)}장</span></div><div class="hand-grid">${handMarkup()}</div></section><section class="side-section tickets-section"><div class="section-title"><b>목적지 티켓</b><button class="text-btn" data-action="tickets">전체 보기 ↗</button></div>${ticketsMarkup()}</section></aside></main>
    <div class="toast" id="toast" role="status"></div><div class="modal" id="modal"></div>
  </div>`;
  bindEvents();
}
function selectedRouteMarkup() {
  const r = state.routes.find(x=>x.id===state.selectedRoute);
  if (!r) return '<div class="empty-selection"><span>⌁</span><p>지도에서 노선을<br>선택해 주세요.</p></div>';
  const a=city(r.from), b=city(r.to), me=current();
  const same=me.hand[r.color]||0, wild=me.hand.wild||0, can=same+wild>=r.length;
  return `<div class="selected-route"><div class="route-name"><span class="route-chip" style="--chip:${COLORS[r.color].hex}"></span><div><b>${a.label} <i>↔</i> ${b.label}</b><small>열차 ${r.length}칸 · ${COLORS[r.color].label}</small></div></div><div class="cost-row"><span>필요한 카드</span><div>${Array.from({length:r.length},(_,i)=>cardIcon(i<same?r.color:'wild',true)).join('')}</div><strong class="${can?'good':''}">${same+wild} / ${r.length}</strong></div>${r.length===0?'<p class="notice">이 노선은 아직 준비 중입니다.</p>':''}</div>`;
}
function bindEvents() {
  document.querySelectorAll('[data-route]').forEach(el=>{ el.addEventListener('click',()=>{ const r=state.routes.find(x=>x.id===el.dataset.route); if(!r.claimed){ state.selectedRoute=state.selectedRoute===r.id?null:r.id; saveState(); render(); } }); el.addEventListener('keydown',e=>{if(e.key==='Enter')el.click()}); });
  document.querySelector('[data-action="claim"]')?.addEventListener('click', claimSelected);
  document.querySelector('[data-action="draw-deck"]')?.addEventListener('click', ()=>drawCard('deck'));
  document.querySelectorAll('[data-face-index]').forEach(el=>el.addEventListener('click',()=>drawCard(Number(el.dataset.faceIndex))));
  document.querySelectorAll('[data-action="sound"], [data-action="copy"], [data-action="clear-log"]').forEach(el=>el.addEventListener('click',()=>toast(el.dataset.action==='copy'?'방 코드가 복사되었습니다.':'준비된 기능입니다.')));
  document.querySelector('[data-action="rules"]')?.addEventListener('click',showRules);
  document.querySelector('[data-action="tickets"]')?.addEventListener('click',showTickets);
  document.querySelector('[data-action="zoom-in"]')?.addEventListener('click',()=>toast('지도 확대는 다음 업데이트에서 지원됩니다.'));
  document.querySelector('[data-action="zoom-out"]')?.addEventListener('click',()=>toast('지도 축소는 다음 업데이트에서 지원됩니다.'));
}
function claimSelected() {
  const r=state.routes.find(x=>x.id===state.selectedRoute), me=current();
  if(!r) return;
  if(r.length===0){ toast('이 노선은 준비 중입니다.'); return; }
  const colored=me.hand[r.color]||0, wild=me.hand.wild||0;
  if(colored+wild<r.length){ toast('카드가 부족합니다. 다른 노선을 선택하세요.'); return; }
  const useColored=Math.min(colored,r.length), useWild=r.length-useColored;
  me.hand[r.color]-=useColored; me.hand.wild-=useWild; me.trains-=r.length; me.score+=points(r.length); r.claimed=me.name;
  state.log.push(`${me.name}님이 ${city(r.from).label}–${city(r.to).label} 노선을 점령했습니다.`); state.selectedRoute=null; nextTurn();
}
function drawCard(source) {
  const me=current();
  if(state.drawCount>=2){ toast('이번 턴에는 카드를 2장까지 뽑을 수 있습니다.'); return; }
  let color;
  if(source==='deck'){ const pool=[...COLOR_KEYS,'wild','red','blue','orange','green','yellow']; color=pool[Math.floor(Math.random()*pool.length)]; state.deckCount--; }
  else { color=state.faceUp[source]; state.faceUp[source]=['red','orange','yellow','green','blue','purple','black','white','wild'][Math.floor(Math.random()*9)]; }
  me.hand[color]=(me.hand[color]||0)+1; state.drawCount++;
  state.log.push(`${me.name}님이 ${color==='wild'?'기관차':COLORS[color].label} 카드를 뽑았습니다.`); saveState(); render();
  if(state.drawCount===2) setTimeout(nextTurn,700);
}
function nextTurn(){ state.currentPlayer=(state.currentPlayer+1)%state.players.length; state.turn++; state.drawCount=0; saveState(); render(); }
function toast(message){ const el=document.querySelector('#toast'); if(!el)return; el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200); }
function showRules(){ document.querySelector('#modal').innerHTML='<div class="modal-card"><button class="modal-close">×</button><span class="eyebrow">HOW TO PLAY</span><h3>게임 방법</h3><p>내 차례에는 노선을 점령하거나 열차 카드를 최대 2장 뽑습니다. 노선 색상과 같은 카드를 모아 지도 위 노선을 연결하세요.</p><div class="rule-list"><div><b>01</b><span>노선 클릭<br><small>연결할 도시를 확인합니다.</small></span></div><div><b>02</b><span>카드 모으기<br><small>같은 색 카드가 필요합니다.</small></span></div><div><b>03</b><span>노선 점령<br><small>긴 노선일수록 높은 점수를 얻습니다.</small></span></div></div></div>'; document.querySelector('#modal').classList.add('open'); document.querySelector('.modal-close').addEventListener('click',closeModal); }
function showTickets(){ document.querySelector('#modal').innerHTML='<div class="modal-card"><button class="modal-close">×</button><span class="eyebrow">YOUR DESTINATIONS</span><h3>목적지 티켓</h3><p>게임이 끝났을 때 두 도시를 연결하면 티켓 점수를 얻고, 실패하면 점수를 잃습니다.</p>'+ticketsMarkup()+'</div>'; document.querySelector('#modal').classList.add('open'); document.querySelector('.modal-close').addEventListener('click',closeModal); }
function closeModal(){document.querySelector('#modal').classList.remove('open');}

render();
