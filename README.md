# Animaciones del Event Loop de JavaScript

Animaciones tipo *motion graphics* para una presentación sobre el Event Loop.
Cada animación es un HTML independiente pensado para grabarse con captura de
pantalla y convertirse a GIF o MP4.

Stack: HTML + CSS + JavaScript vanilla y [GSAP 3.15.0](https://gsap.com/) desde CDN.
Sin frameworks, sin bundlers, sin servidor.

## Animaciones de la presentación (`presentacion-event-loop/`)

Una por slide, numeradas en el orden en que aparecen. Son **cuadradas (1080×1080)**
y usan los colores de la slide invertidos: fondo `#1E1E1E` y elementos `#FFEA00`.

| Archivo | Slide | Qué muestra |
| --- | --- | --- |
| `01-single-thread.html` | "JS es single-threaded: solo puede ejecutar una instrucción a la vez" | Una sola vía: las instrucciones entran al hilo de una en una; la siguiente intenta entrar y rebota. |
| `02-sincrono.html` | "JS es síncrono: el código se ejecuta línea por línea, en orden" | Cinco líneas de código abstractas; un cursor baja y cada línea se rellena de izquierda a derecha, una tras otra. Las hechas quedan atenuadas. |

## Otras animaciones (raíz)

Escenas 1920×1080 con el código a la izquierda y los paneles del runtime a la derecha.

| Archivo | Qué muestra |
| --- | --- |
| `call-stack.html` | Funciones anidadas (`main → saludar → formatear`) entrando y saliendo del Call Stack, con `console.log` en la consola. |
| `settimeout-web-apis.html` | Un `setTimeout` viaja del stack a Web APIs (temporizador visual), a la Callback Queue y el event loop lo regresa al stack cuando está vacío. |
| `microtasks-vs-macrotasks.html` | `setTimeout` y `Promise.resolve().then()` en el mismo código: la microtask se ejecuta primero. |
| `orden-console-log.html` | El ejercicio clásico de adivinar el orden de salida mezclando `console.log`, `setTimeout(…, 0)` y Promises. |

## Cómo abrir

1. Abre `index.html` (o directamente cualquier `.html`) con doble clic. Funciona con `file://`, no hace falta servidor.
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

- **Tamaño de ventana:** el escenario se escala para caber en la ventana manteniendo su proporción. Para obtener píxeles exactos, usa un monitor 1920×1080 en pantalla completa (`F11` en el navegador); así la escala es exactamente 1.
- **Animaciones cuadradas:** en pantalla completa quedan centradas con bandas oscuras a los lados; graba o recorta la región central de 1080×1080.
- **Zoom del navegador al 100 %** (`Ctrl + 0`) antes de grabar.
- **Cada timeline empieza y termina con 1 segundo de quietud** para que sea fácil recortar el clip.
- **Repetir tomas:** pulsa `R` para volver al inicio sin recargar la página.
- **Exportar a GIF:** 12–15 fps es suficiente para estas animaciones y mantiene el archivo pequeño. Para MP4, 30 fps.
- Guarda las grabaciones en la carpeta `exports/` (está en el `.gitignore`).

## Estructura

```
animaciones-temporales/
├── shared/
│   ├── styles.css      ← escenario, paleta de colores, tipografía, componentes
│   └── controls.js     ← constantes de tiempo/easing, controles de teclado, helpers
├── presentacion-event-loop/
│   ├── 01-single-thread.html   ← una animación por slide, en orden
│   └── 02-sincrono.html
├── call-stack.html
├── settimeout-web-apis.html
├── microtasks-vs-macrotasks.html
├── orden-console-log.html
├── index.html          ← links a cada animación
├── README.md
└── .gitignore
```

## Cómo modificar

- **Colores:** variables `--color-*` al inicio de `shared/styles.css`. Las de la presentación usan `--fondo` / `--acento` de la clase `.stage--slide`, en el mismo archivo.
- **Velocidad:** constantes `DUR` y `EASE` al inicio de `shared/controls.js`.
- **Textos y pasos:** cada HTML tiene sus elementos en el cuerpo y la secuencia de pasos en el `<script>` del final, con un `tl.addLabel(...)` por paso.
