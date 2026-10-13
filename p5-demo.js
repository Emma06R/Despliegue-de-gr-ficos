// Demostración de p5.js en MODO INSTANCIA: todo cuelga del objeto "p".
// Así no se crean funciones globales y se pueden tener varios sketches en una página.
new p5(function (p) {
  p.setup = function () {
    p.createCanvas(400, 240);
    p.noStroke();
  };
  p.draw = function () {
    p.background(240, 245, 255);
    // círculo que sigue al ratón; su color depende de la posición
    p.fill(p.map(p.mouseX, 0, p.width, 30, 255), 120, p.map(p.mouseY, 0, p.height, 255, 60), 200);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
    // círculo que pulsa con frameCount (animación)
    p.fill(30, 204, 91);
    p.ellipse(60, 60, 40 + 20 * p.sin(p.frameCount * 0.05), 40 + 20 * p.sin(p.frameCount * 0.05));
    p.fill(60);
    p.textSize(12);
    p.text('frameCount: ' + p.frameCount, 10, p.height - 10);
  };
  p.mousePressed = function () {
    p.fill(255, 0, 0);
    p.ellipse(p.mouseX, p.mouseY, 10, 10);
  };
}, 'demo-p5');
