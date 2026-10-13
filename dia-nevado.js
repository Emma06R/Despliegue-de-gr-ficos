// Día nevado soleado (derivado de Khan Academy) — lienzo 400 x 400
function dibujo() {
  // The ground
  fill(133, 255, 233);
  background(0, 255, 255);
  rect(0, 300, 400, 100);

  // The sun
  fill(251, 255, 0);
  ellipse(80, 64, 100, 100);

  // The snowman
  fill(245, 240, 240);
  ellipse(200, 300, 150, 150);
  ellipse(200, 200, 100, 100);
  ellipse(200, 120, 75, 75);
}
