// Rana loca (derivado de Khan Academy) — lienzo 400 x 400
function dibujo() {
  var x = 200;
  var y = 250;

  noStroke();
  fill(30, 204, 91); // a nice froggy green!

  ellipse(x, y, 200, 100); // face
  ellipse(x - 50, y - 50, 40, 40); // left eye socket
  ellipse(x + 50, y - 50, 40, 40); // right eye socket

  fill(255, 255, 255); // for the whites of the eyes!
  ellipse(x - 50, y - 50, 30, 30); // left eyeball
  ellipse(x + 50, y - 50, 30, 30); // right eyeball

  fill(0, 0, 0);
  ellipse(x, y, 100, 50);

  rect(x - 55, y - 55, 10, 10);
  rect(x + 45, y - 55, 10, 10);
}
