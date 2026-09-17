/* ============================================================
   shared/controls.js
   Código común para todas las animaciones:

     1. Constantes de duración y easing (DUR, EASE)
     2. Ajuste del escenario 1920x1080 a la ventana
     3. Controles de teclado: configurarControles(tl)
     4. Utilidades de escena (apilar, desapilar, encolar, imprimir...)

   Requiere que GSAP ya esté cargado (window.gsap).
   No usa módulos ni fetch: funciona abriendo el HTML con doble clic.
   ============================================================ */

/* ---------- 1. Constantes de animación ----------
   Todas las escenas usan estos valores para que el ritmo sea consistente.
   Ajusta aquí si quieres que todo vaya más rápido o más lento. */
const DUR = {
  rapida: 0.3,   // resaltar línea, pequeños cambios
  normal: 0.5,   // entrar/salir de un panel
  lenta: 0.9,    // movimientos largos entre paneles
  pausa: 0.7,    // respiro entre pasos para que el espectador lea
  margen: 1.0,   // silencio al inicio y al final (facilita recortar el video)
};

const EASE = {
  entrada: 'back.out(1.4)',   // algo aparece (frame, item, línea de consola)
  salida: 'power2.in',        // algo desaparece
  mover: 'power2.inOut',      // algo se desplaza (resaltado, item entre paneles)
  suave: 'power2.out',        // valor por defecto de las timelines
};

/* ---------- 2. Ajuste del escenario ----------
   El .stage tiene un tamaño fijo en píxeles (1920x1080, o 1080x1080 con
   .stage--cuadrado); aquí lo escalamos para que quepa en la ventana sin
   deformarse. Al grabar en pantalla completa con la misma resolución la
   escala será exactamente 1. */
function ajustarEscenario() {
  const stage = document.querySelector('.stage');
  if (!stage) return;
  const escala = Math.min(window.innerWidth / stage.offsetWidth,
                          window.innerHeight / stage.offsetHeight);
  stage.style.transform = `translate(-50%, -50%) scale(${escala})`;
}
window.addEventListener('resize', ajustarEscenario);
ajustarEscenario();

/* ---------- 3. Controles de teclado ----------
   configurarControles(tl) recibe la timeline principal de GSAP y agrega:

     Espacio  → play / pausa (si terminó, vuelve a empezar)
     R        → volver al inicio (queda en pausa, lista para grabar)
     →  /  ←  → saltar al siguiente / anterior label de la timeline
     H        → mostrar / ocultar la ayuda

   La timeline arranca en pausa: nada se mueve hasta pulsar Espacio. */
function configurarControles(tl) {
  const ayuda = document.querySelector('.ayuda');
  const pista = document.querySelector('.pista');

  tl.pause(0);

  // Devuelve los tiempos de todos los labels ordenados de menor a mayor
  const tiemposLabels = () => Object.values(tl.labels).sort((a, b) => a - b);

  // Salta al label siguiente (dir = +1) o anterior (dir = -1) y pausa ahí
  function saltarLabel(dir) {
    const actual = tl.time();
    const margen = 0.01; // tolerancia para no quedarse "pegado" en el label actual
    const tiempos = tiemposLabels();
    const destino = dir > 0
      ? tiempos.find((t) => t > actual + margen)
      : [...tiempos].reverse().find((t) => t < actual - margen);
    if (destino !== undefined) tl.pause(destino);
  }

  document.addEventListener('keydown', (evento) => {
    switch (evento.code) {
      case 'Space':
        evento.preventDefault();
        if (pista) pista.classList.add('oculto');
        if (tl.progress() >= 1) tl.restart();
        else tl.paused(!tl.paused());
        break;
      case 'KeyR':
        tl.pause(0);
        break;
      case 'ArrowRight':
        evento.preventDefault();
        saltarLabel(+1);
        break;
      case 'ArrowLeft':
        evento.preventDefault();
        saltarLabel(-1);
        break;
      case 'KeyH':
        if (ayuda) ayuda.classList.toggle('oculto');
        break;
    }
  });
}

/* ---------- 4. Utilidades de escena ----------
   Pequeños helpers que agregan tweens a una timeline. Todos reciben la
   timeline, el elemento y (opcional) la posición dentro de la timeline,
   igual que tl.to(). Devuelven la timeline para poder encadenar.

   Los elementos ya existen en el HTML (ocultos con visibility/opacity), así
   que la timeline se puede rebobinar y recorrer con las flechas sin
   problemas. */

// Mueve la barra de resaltado a la línea `numero` (1 = primera línea) del
// panel de código. Si `numero` es null, oculta la barra.
function resaltarLinea(tl, numero, posicion) {
  const barra = document.querySelector('.codigo__resaltado');
  if (numero === null) {
    return tl.to(barra, { autoAlpha: 0, duration: DUR.rapida }, posicion);
  }
  const linea = document.querySelectorAll('.codigo .linea')[numero - 1];
  return tl.to(barra, {
    y: linea.offsetTop,
    autoAlpha: 1,
    duration: DUR.rapida,
    ease: EASE.mover,
  }, posicion);
}

// Un frame entra al Call Stack (aparece desde abajo)
function apilar(tl, elemento, posicion) {
  return tl.fromTo(elemento,
    { autoAlpha: 0, y: 40, scale: 0.9 },
    { autoAlpha: 1, y: 0, scale: 1, duration: DUR.normal, ease: EASE.entrada },
    posicion);
}

// Un frame sale del Call Stack (se desvanece hacia arriba)
function desapilar(tl, elemento, posicion) {
  return tl.to(elemento,
    { autoAlpha: 0, y: -40, scale: 0.9, duration: DUR.normal, ease: EASE.salida },
    posicion);
}

// Un item entra a Web APIs o a una cola (aparece desde la derecha)
function encolar(tl, elemento, posicion) {
  return tl.fromTo(elemento,
    { autoAlpha: 0, x: 60 },
    { autoAlpha: 1, x: 0, duration: DUR.normal, ease: EASE.entrada },
    posicion);
}

// Un item sale de Web APIs o de una cola (se va hacia la izquierda)
function desencolar(tl, elemento, posicion) {
  return tl.to(elemento,
    { autoAlpha: 0, x: -60, duration: DUR.normal, ease: EASE.salida },
    posicion);
}

// Una línea aparece en la consola
function imprimir(tl, elemento, posicion) {
  return tl.fromTo(elemento,
    { autoAlpha: 0, x: -24 },
    { autoAlpha: 1, x: 0, duration: DUR.normal, ease: EASE.suave },
    posicion);
}

// Pausa vacía de `segundos` para dejar leer al espectador
function esperar(tl, segundos = DUR.pausa, posicion) {
  return tl.to({}, { duration: segundos }, posicion);
}
