// Demostraciones con <canvas> y el contexto 2D, sin ninguna librería.
(function () {
  // Auxiliar: elipse con centro (x, y) y DIÁMETROS w y h (como en p5.js)
  function elipse(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1) La rana, dibujada con la API nativa
  const c1 = document.getElementById('demo-rana');
  if (c1 && c1.getContext) {
    const ctx = c1.getContext('2d');
    const x = 200, y = 250;
    ctx.fillStyle = 'rgb(30, 204, 91)';
    elipse(ctx, x, y, 200, 100);
    elipse(ctx, x - 50, y - 50, 40, 40);
    elipse(ctx, x + 50, y - 50, 40, 40);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    elipse(ctx, x - 50, y - 50, 30, 30);
    elipse(ctx, x + 50, y - 50, 30, 30);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    elipse(ctx, x, y, 100, 50);
    ctx.fillRect(x - 55, y - 55, 10, 10);
    ctx.fillRect(x + 45, y - 55, 10, 10);
  }

  // 2) Trayectorias: triángulo, línea y arco
  const c2 = document.getElementById('demo-trayectoria');
  if (c2 && c2.getContext) {
    const ctx = c2.getContext('2d');
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, c2.width, c2.height);
    ctx.beginPath();
    ctx.moveTo(60, 190);
    ctx.lineTo(160, 40);
    ctx.lineTo(260, 190);
    ctx.closePath();
    ctx.fillStyle = '#2563eb';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1e3a8a';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(340, 110, 50, 0, Math.PI * 1.5);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  // 3) Animación con requestAnimationFrame
  const c3 = document.getElementById('demo-animacion');
  const btn = document.getElementById('btn-anim');
  if (c3 && c3.getContext) {
    const ctx = c3.getContext('2d');
    let x = 40, y = 60, vx = 3, vy = 2.2, activo = true, id = null;
    const r = 20;
    function frame() {
      ctx.clearRect(0, 0, c3.width, c3.height);
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      x += vx; y += vy;
      if (x < r || x > c3.width - r) vx = -vx;
      if (y < r || y > c3.height - r) vy = -vy;
      if (activo) id = requestAnimationFrame(frame);
    }
    frame();
    if (btn) btn.addEventListener('click', () => {
      activo = !activo;
      btn.textContent = activo ? 'Pausar' : 'Reanudar';
      if (activo) frame(); else cancelAnimationFrame(id);
    });
  }
})();
