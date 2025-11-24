# HERO IMAGES

Este directorio contiene las imágenes para la sección hero de la página principal.

## 📁 Estructura recomendada:
```
public/images/hero/
├── hero-bartender.jpg     # Imagen principal
├── hero-restaurant.jpg    # Alternativas opcionales
└── hero-food.jpg          # Más imágenes 
```

## 🖼️ Especificaciones de imagen:
- **Formato**: JPG o WebP preferido
- **Resolución**: Mínimo 1920x1080px (Full HD)
- **Ratio**: 16:9 o 21:9 (panorámica)
- **Peso**: Máximo 500KB (optimizado para web)
- **Enfoque**: Horizontal para responsive

## 🎨 Consejos de diseño:
- Imagen con suficiente contraste para texto blanco
- Evita texto ya presente en la imagen
- Composición que permita overlay de contenido
- Sujetos centrados o en el tercio derecho

## 🔄 Para cambiar la imagen:
1. Guarda tu imagen como `hero-bartender.jpg`
2. O cambia el prop `imageSrc` en `page.tsx`:
   ```tsx
   <Hero imageSrc="/images/hero/tu-imagen.jpg" />
   ```