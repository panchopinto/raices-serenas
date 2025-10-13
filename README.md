
# Pasiflora — v2 (PWA + Hotspots + i18n JSON)

- PWA offline (incluye el GLB en caché)
- Hotspots y “Recorrido” en el visor 3D
- i18n con JSON (`assets/i18n/es.json` / `en.json`)
- Modo Exposición (pantalla completa y UI grande)
- Métricas locales (clicks en 3D/AR) en `stats.html`

## Estructura
```
assets/
  css/style.css
  js/main.js
  js/i18n.js
  i18n/es.json
  i18n/en.json
  img/poster.jpg
  img/icon-192.png
  img/icon-512.png
  models/passiflora_caerulea.glb
index.html
viewer3d.html
viewerar.html
stats.html
manifest.webmanifest
sw.js
```

## Publicación
1) Subir a GitHub (`main`).
2) Activar Pages.
3) Abrir `index.html`. Botón 📥 aparece para instalar como app.

> Para AR iOS avanzado, agrega un `.usdz` y define `ios-src` en `<model-viewer>`.
