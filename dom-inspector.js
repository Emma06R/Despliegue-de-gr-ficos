// Visualizador del árbol DOM: carga cada página del sitio en un iframe oculto
// (así el DOM ya está construido, incluido el <canvas> que crea p5.js)
// y dibuja la jerarquía de nodos html > head/body > ... como un árbol plegable.
const PAGINAS = [
  ['index.html','Inicio'],['rana.html','Rana'],['dientes-conejo.html','Dientes de conejo'],
  ['cena.html','¿Qué hay de cena?'],['dia-nevado.html','Día nevado soleado'],
  ['muneco-nieve.html','Muñeco de nieve'],['canvas.html','Teoría: canvas'],
  ['p5.html','Teoría: p5.js'],['dom-inspector.html','Inspector DOM']
];
const SEMANTICOS = new Set(['header','main','nav','footer','section','article','aside','figure','figcaption']);
const ESTRUCT = new Set(['html','head','body']);
const tabs = document.getElementById('tabs');
const out = document.getElementById('arbol');
const info = document.getElementById('info');
const cache = {};

function clase(n){
  const t = n.nodeName.toLowerCase();
  return ESTRUCT.has(t) ? 'struct' : SEMANTICOS.has(t) ? 'sem' : 'el';
}
function etiqueta(n){
  const t = n.nodeName.toLowerCase();
  let s = '<' + t;
  const mostrar = ['id','class','href','src','charset','name','rel','width','height'];
  for (const a of n.attributes) if (mostrar.includes(a.name)) {
    let v = a.value.length > 30 ? a.value.slice(0,30)+'…' : a.value;
    s += ` ${a.name}="${v}"`;
  }
  return s + '>';
}
function dibujar(n, ul){
  if (n.nodeType === 3) {
    const tx = n.textContent.trim(); if (!tx) return;
    const li = document.createElement('li');
    li.innerHTML = '<span class="node txt"></span>';
    li.firstChild.textContent = '"' + (tx.length>40 ? tx.slice(0,40)+'…' : tx) + '"';
    ul.appendChild(li); return;
  }
  if (n.nodeType === 8) {
    const li = document.createElement('li');
    li.innerHTML = '<span class="node cm"></span>';
    li.firstChild.textContent = '<!-- ' + n.textContent.trim().slice(0,30) + ' -->';
    ul.appendChild(li); return;
  }
  if (n.nodeType !== 1) return;
  const li = document.createElement('li');
  const hijos = [...n.childNodes].filter(c => (c.nodeType===1) || (c.nodeType===3 && c.textContent.trim()) || c.nodeType===8);
  const tg = document.createElement('span');
  tg.className = 'toggle'; tg.textContent = hijos.length ? '▾' : '·';
  const sp = document.createElement('span');
  sp.className = 'node ' + clase(n); sp.textContent = etiqueta(n);
  li.append(tg, sp);
  if (hijos.length) {
    const sub = document.createElement('ul');
    hijos.forEach(h => dibujar(h, sub));
    li.appendChild(sub);
    tg.onclick = () => { const o = sub.hidden = !sub.hidden; tg.textContent = o ? '▸' : '▾'; };
  }
  ul.appendChild(li);
}
function contar(doc){
  const els = doc.querySelectorAll('*').length;
  let prof = 0;
  (function r(n,d){ prof = Math.max(prof,d); for (const c of n.children) r(c,d+1); })(doc.documentElement,1);
  return {els, prof};
}
// Carga la página en un iframe oculto del mismo origen y devuelve su documento
function cargarDOM(archivo){
  return new Promise((resolve, reject) => {
    const f = document.createElement('iframe');
    f.setAttribute('aria-hidden','true'); f.tabIndex = -1;
    f.style.cssText = 'position:absolute;left:-9999px;top:0;width:1000px;height:800px;border:0';
    f.onerror = () => reject(new Error('error'));
    f.onload = () => setTimeout(() => {   // pequeña espera para que p5.js cree su canvas
      try {
        // copia del documento para poder quitar el iframe sin perder el árbol
        const copia = document.implementation.createHTMLDocument('');
        copia.replaceChild(copia.importNode(f.contentDocument.documentElement, true), copia.documentElement);
        f.remove(); resolve(copia);
      } catch (e) { f.remove(); reject(e); }
    }, 400);
    f.src = archivo + '?embed=1';
    document.body.appendChild(f);
  });
}
async function mostrar(archivo, nombre){
  [...tabs.children].forEach(b => b.setAttribute('aria-selected', b.dataset.f === archivo));
  out.innerHTML = '<p class="muted">Cargando…</p>';
  try {
    if (!cache[archivo]) cache[archivo] = await cargarDOM(archivo);
    const doc = cache[archivo];
    const ul = document.createElement('ul'); ul.className = 'tree';
    dibujar(doc.documentElement, ul);
    out.replaceChildren(ul);
    const c = contar(doc);
    info.textContent = `${nombre} (${archivo}): ${c.els} elementos, profundidad máxima ${c.prof}.`;
  } catch(e) {
    out.innerHTML = '<p>No se pudo cargar la página. Si abriste el archivo con doble clic (file://), '
      + 'el navegador lo bloquea: usa un servidor local (<code>python -m http.server</code>) o la versión publicada en GitHub Pages.</p>';
  }
}
PAGINAS.forEach(([f,n]) => {
  const b = document.createElement('button');
  b.textContent = n; b.dataset.f = f; b.setAttribute('role','tab');
  b.onclick = () => mostrar(f,n); tabs.appendChild(b);
});
function plegar(ocultar){
  out.querySelectorAll('ul ul').forEach(u => { u.hidden = ocultar; });
  out.querySelectorAll('.toggle').forEach(t => { if (t.textContent !== '·') t.textContent = ocultar ? '▸' : '▾'; });
}
document.getElementById('expandir').onclick = () => plegar(false);
document.getElementById('contraer').onclick = () => plegar(true);
// Dentro del iframe de otra inspección no se carga nada (evita recursión)
if (!new URLSearchParams(location.search).has('embed')) mostrar(PAGINAS[0][0], PAGINAS[0][1]);
