// Código compartido por las páginas de dibujos.
// Cada página define su propia función dibujo() en sketches/*.js
// y este archivo crea el lienzo de p5.js y llama a dibujo().
let mostrarCuadricula = false;

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  noLoop(); // los dibujos son estáticos: se dibujan una vez

  document.getElementById('chk-grid').addEventListener('change', (e) => {
    mostrarCuadricula = e.target.checked;
    redraw();
  });
  document.getElementById('btn-png').addEventListener('click', () => {
    saveCanvas('dibujo', 'png');
  });
}

function draw() {
  push();
  background(255); // Khan Academy usa fondo blanco; p5.js usa gris por defecto
  dibujo();
  pop();
  if (mostrarCuadricula) cuadricula();
}

// Rejilla cada 50 px con sus coordenadas, útil para entender x e y
function cuadricula() {
  push();
  stroke(120, 120, 120, 110);
  strokeWeight(1);
  for (let i = 0; i <= 400; i += 50) {
    line(i, 0, i, 400);
    line(0, i, 400, i);
  }
  noStroke();
  fill(60);
  textSize(10);
  for (let i = 50; i < 400; i += 50) {
    text(i, i + 2, 11);
    text(i, 2, i - 2);
  }
  pop();
}

// Muestra la posición del ratón sobre el lienzo
function mouseMoved() {
  const out = document.getElementById('coords');
  if (!out) return;
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    out.textContent = 'x: ' + Math.round(mouseX) + ', y: ' + Math.round(mouseY);
  }
}
