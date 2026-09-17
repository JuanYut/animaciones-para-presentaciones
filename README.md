# Animaciones del Event Loop de JavaScript

Animaciones tipo *motion graphics* para explicar el Event Loop en una presentación.
Cada animación es un HTML independiente pensado para grabarse con captura de
pantalla y convertirse a GIF o MP4.

Stack: HTML + CSS + JavaScript vanilla y [GSAP 3.15.0](https://gsap.com/) desde CDN.
Sin frameworks, sin bundlers, sin servidor.

## Animaciones

| Archivo | Qué muestra |
| --- | --- |
| `01-call-stack.html` | Funciones anidadas (`main → saludar → formatear`) entrando y saliendo del Call Stack, con `console.log` en la consola. |
| `02-settimeout-web-apis.html` | Un `setTimeout` viaja del stack a Web APIs (temporizador visual), a la Callback Queue y el event loop lo regresa al stack cuando está vacío. |
| `03-microtasks-vs-macrotasks.html` | `setTimeout` y `Promise.resolve().then()` en el mismo código: la microtask se ejecuta primero. |
| `04-orden-console-log.html` | El ejercicio clásico de adivinar el orden de salida mezclando `console.log`, `setTimeout(…, 0)` y Promises. |

## Cómo abrir

1. Abre `index.html` (o directamente cualquier `0X-*.html`) con doble clic. Funciona con `file://`, no hace falta servidor.
2. Se necesita internet la primera vez para cargar GSAP desde el CDN (y las fuentes de Google, que son opcionales: si no cargan se usan las del sistema).
3. La animación **no arranca sola**: pulsa `Espacio` cuando ya estés grabando.

## Controles de teclado

| Tecla | Acción |
| --- | --- |
| `Espacio` | Play / pausa (si ya terminó, vuelve a empezar) |
| `R` | Volver al inicio (queda en pausa, lista para grabar otra vez) |
| `→` / `←` | Saltar al siguiente / anterior paso (labels de la timeline) |
| `H` | Mostrar / ocultar la ayuda en pantalla |

No hay ningún control visible en pantalla durante la grabación. La pista
"Espacio para empezar" de la esquina desaparece al pulsar `Espacio`.

## Tips para grabar

- **Tamaño de ventana:** el escenario mide 1920×1080 y se escala para caber en la ventana manteniendo 16:9. Para obtener píxeles exactos, usa un monitor 1920×1080 en pantalla completa (`F11` en el navegador); así la escala es exactamente 1.
- **Zoom del navegador al 100 %** (`Ctrl + 0`) antes de grabar.
- **Cada timeline empieza y termina con 1 segundo de quietud** para que sea fácil recortar el clip.
- **Repetir tomas:** pulsa `R` para volver al inicio sin recargar la página.
- **Exportar a GIF:** 12–15 fps es suficiente para estas animaciones y mantiene el archivo pequeño. Para MP4, 30 fps.
- Guarda las grabaciones en la carpeta `exports/` (está en el `.gitignore`).

## Estructura

```
animaciones-event-loop/
├── shared/
│   ├── styles.css      ← escenario, paleta de colores, tipografía, componentes
│   └── controls.js     ← constantes de tiempo/easing, controles de teclado, helpers
├── 01-call-stack.html
├── 02-settimeout-web-apis.html
├── 03-microtasks-vs-macrotasks.html
├── 04-orden-console-log.html
├── index.html          ← links a cada animación
├── README.md
└── .gitignore
```

## Cómo modificar

- **Colores:** variables `--color-*` al inicio de `shared/styles.css`.
- **Velocidad:** constantes `DUR` y `EASE` al inicio de `shared/controls.js`.
- **Textos y pasos:** cada HTML tiene el código de ejemplo en el `<pre class="codigo">`, los elementos del runtime (frames, items, líneas de consola) en el HTML, y la secuencia de pasos en el `<script>` del final, con un `tl.addLabel(...)` por paso.
