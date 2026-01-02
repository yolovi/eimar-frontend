# ESTRUCTURA DE ARCHIVOS DE IMÁGENES DEL MENÚ
# ===========================================

## 📁 Estructura completa de archivos:

```
public/images/menu/
├── entrantes/
│   ├── 01-patatas-bravas.jpg
│   ├── 02-aguacate-limeno.jpg
│   ├── 03-croquetas-vacanal.jpg
│   ├── 04-pan-tomate.jpg
│   ├── 05-gazpacho-andaluz.jpg
│   ├── 06-hummus-ancestral.jpg
│   ├── 07-burrata-tomates.jpg
│   └── 08-sandwich-coreano-pollo.jpg
├── ensaladas/
│   ├── 01-cesar-clasica.jpg
│   ├── 02-mediterranea.jpg
│   └── 03-quinoa-aguacate.jpg
├── bocadillos/
│   ├── 01-chivito.jpg
│   ├── 02-pepito-pueblo.jpg
│   ├── 03-brascada.jpg
│   ├── 04-valenciano.jpg
│   ├── 05-eimar-especial.jpg
│   └── 06-galego.jpg
├── burgers/
│   ├── 01-classic-beef.jpg
│   ├── 02-bbq-bacon.jpg
│   └── 03-veggie-quinoa.jpg
├── carnes/
│   ├── 01-solomillo-iberico.jpg
│   ├── 02-entrecot-ternera.jpg
│   └── 03-chuleton-vaca.jpg
├── postres/
│   ├── 01-tarta-queso.jpg
│   ├── 02-flan-casero.jpg
│   ├── 03-tiramisu-tradicional.jpg
│   └── 04-coulant-chocolate.jpg
└── bebidas/
    ├── 01-agua-mineral.jpg
    ├── 02-refrescos-variados.jpg
    ├── 03-cerveza-nacional.jpg
    ├── 04-vino-casa.jpg
    └── 05-zumos-naturales.jpg
```

## 🔧 Convención de nombres:

### Formato: `##-nombre-del-plato.jpg`
- `##` = Número de orden (01, 02, 03...)
- `-` = Separador de palabras
- `nombre-del-plato` = Nombre en minúsculas con guiones
- `.jpg` = Extensión de imagen

### Ejemplos de conversión:
- `01-patatas-bravas.jpg` → **"Patatas bravas"**
- `05-eimar-especial.jpg` → **"Eimar especial"**  
- `03-tiramisu-tradicional.jpg` → **"Tiramisú tradicional"**

## 📋 Reglas de nomenclatura:

1. **Números**: Siempre 2 dígitos (01, 02, 03...)
2. **Separador**: Guiones (-) entre palabras
3. **Minúsculas**: Todo en minúsculas en el archivo
4. **Tildes**: Se mantienen en los datos, no en archivos
5. **Espacios**: Se convierten en guiones en archivos
6. **Resultado**: Solo primera palabra en mayúscula en datos

## 🎯 Ventajas del sistema:

✅ **Orden visual**: Los archivos aparecen ordenados por número
✅ **Consistencia**: Relación directa archivo ↔ dato
✅ **Mantenimiento**: Fácil agregar/reorganizar platos
✅ **SEO friendly**: URLs amigables automáticas
✅ **Escalabilidad**: Fácil expandir por categorías

## 📝 Para añadir un nuevo plato:

1. Crear imagen: `##-nombre-nuevo-plato.jpg`
2. El sistema genera automáticamente: **"Nombre nuevo plato"**
3. Verificar descripción y precio en menu.ts