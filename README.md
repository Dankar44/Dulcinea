# Dulcinea — Sitio web

Sitio web del restaurante Dulcinea (Torrejón de Ardoz, Madrid).

## Estructura del proyecto

```
Dulcinea/
├── index.html              # Página principal
├── README.md
├── .gitignore
├── assets/
│   └── images/
│       ├── branding/       # Logos
│       ├── backgrounds/    # Fondos de secciones
│       ├── gallery/        # Fotos del local (sección "Nosotros")
│       ├── menu/           # Imágenes de productos del menú
│       └── promotions/     # Imágenes del carrusel de ofertas
├── docs/                   # PDFs internos (medidas, sobremesa)
└── archive/
    └── originales/         # Imágenes originales sin optimizar
```

## Desarrollo

El sitio es estático: basta con abrir `index.html` en un navegador.
Para desarrollo local con servidor:

```bash
python -m http.server 8000
```

Luego abre <http://localhost:8000>.

## Tecnologías

- HTML5
- Tailwind CSS (vía CDN)
- Google Fonts (Inter, Playfair Display)
- JavaScript vanilla (carruseles y menú móvil)
