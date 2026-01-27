# UI Components Organization

## Button Family

Esta aplicación tiene **5 tipos diferentes de botón**, cada uno optimizado para casos de uso específicos:

### 📋 **Resumen de Botones**

| Componente | Uso Principal | Características |
|------------|---------------|-----------------|
| `Button` | Botón genérico base | Variantes: primary, secondary, outline, ghost, destructive |
| `HeroButton` | Hero sections | Estilo destacado para landing pages |
| `ActionButton` | Acciones específicas | Con iconos predefinidos (menú, teléfono, WhatsApp) |
| `CloseButton` | Cerrar elementos | Para modales, overlays, sidebars |

### 🔄 **Opciones de Import**

```typescript
// Opción 1: Import individual (recomendado para componentes específicos)
import { Button, CloseButton } from "@/components/ui";

// Opción 2: Import de toda la familia (para desarrollo/testing)
import { Button, HeroButton, ActionButton, CloseButton, ContactButton } from "@/components/ui/buttons";

// Opción 3: Import con tipos compartidos
import { BaseButtonProps, ButtonWithIconsProps } from "@/components/ui/shared";
```

### 🎯 **Cuándo usar cada botón**

- **Button**: Acciones generales, formularios, navegación
- **HeroButton**: CTAs principales, landing pages  
- **ActionButton**: Menús móviles, contacto rápido
- **CloseButton**: Cerrar modales, overlays

### 📁 **Estructura de Archivos**

```
ui/
├── buttons/index.ts          # 📦 Agrupación conceptual de todos los botones
├── Button/                   # 🎯 Botón base
├── HeroButton/              # 🌟 Para hero sections  
├── ActionButton/            # ⚡ Con iconos predefinidos
├── CloseButton/             # ✖️ Para cerrar elementos
└── shared/                  # 🔧 Tipos base compartidos
```

### 🔗 **Compatibilidad**

Todos los imports existentes siguen funcionando. La agrupación en `/buttons` es adicional y opcional.