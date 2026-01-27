# Sistema Centralizado de Contacto - EIMAR

## Resumen de Optimización

Se ha centralizado y optimizado completamente el sistema de acciones de contacto para eliminar fragmentación y mejorar la consistencia del código.

## Componentes Centralizados

### 🎯 ActionButton (Reemplaza múltiples botones)

**Ubicación:** `@/components/ui/buttons/ActionButton/ActionButton.tsx`

Componente universal que centraliza todas las acciones de contacto:

```tsx
import { ActionButton } from '@/components/ui';

// Botón estándar
<ActionButton action="phone" variant="button" size="md" />

// Enlace texto 
<ActionButton action="whatsapp" variant="link" style="minimal" />

// Solo icono
<ActionButton action="location" variant="icon" size="sm" />

// WhatsApp con estilo primario
<ActionButton action="whatsapp" variant="button" style="primary" fullWidth />
```

**Variantes disponibles:**
- `button` - Botón completo con fondo y borde
- `link` - Enlace con texto y hover
- `icon` - Solo icono circular
- `text` - Texto plano con icono

**Estilos disponibles:**
- `primary` - Estilo principal (accent color)
- `secondary` - Estilo secundario 
- `ghost` - Transparente con hover
- `outline` - Solo borde
- `minimal` - Estilo minimalista

### 🎯 useContact (Hook simplificado)

**Ubicación:** `@/hooks/useContact.ts`

Hook simplificado que reemplaza la complejidad anterior:

```tsx
import { useContact } from '@/hooks';

const { callPhone, sendWhatsApp, makeReservation, openLocation } = useContact();

<button onClick={callPhone}>Llamar</button>
<button onClick={() => sendWhatsApp("Hola, quiero hacer una consulta")}>WhatsApp</button>
<button onClick={makeReservation}>Reservar</button>
<button onClick={openLocation}>Ver ubicación</button>
```

