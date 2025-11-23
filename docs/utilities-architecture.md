# Arquitectura de Utilidades - EIMAR Frontend

Este documento explica cómo están organizadas las funciones de utilidad en el proyecto para evitar duplicaciones y mantener una arquitectura limpia.

## 📁 Estructura de Utilidades

### `/src/lib/utils.ts` - Utilidades Genéricas
**Propósito**: Funciones reutilizables que pueden usarse en cualquier parte de la aplicación.

**Categorías**:
- 🎨 **Estilos**: `cn()` para combinación de clases CSS
- 💰 **Formateo**: `formatCurrency()`, `formatDate()`, `formatTime()`, `formatTimeRange()`
- 🔗 **Enlaces**: `createPhoneLink()`, `createWhatsAppLink()`, `createEmailLink()`
- 📅 **Fechas**: `getCurrentDay()`, `isValidTime()`

### `/src/constants/contact.ts` - Utilidades de Dominio
**Propósito**: Datos específicos del restaurante y funciones que operan sobre esos datos.

**Contiene**:
- 📊 **Datos**: CONTACT_INFO con toda la información del restaurante
- 🏢 **Dominio**: `getFormattedSchedule()`, `getTodaySchedule()` (específicas del negocio)
- 🎯 **Tipos**: ContactPhone, ScheduleDay, etc.

## 🔄 Principio de Separación

### ✅ **En `/lib/utils.ts`** (Genérico):
```typescript
// ✅ Genérica - puede formatear cualquier rango de tiempo
export function formatTimeRange(open: string, close: string, isClosed: boolean) {
  return isClosed ? "Cerrado" : `${open} - ${close}`;
}
```

### ✅ **En `/constants/contact.ts`** (Específico del dominio):
```typescript
// ✅ Específica del restaurante - usa la genérica pero con datos del negocio
export const getFormattedSchedule = (day: ScheduleDay) => {
  const schedule = CONTACT_INFO.schedule[day];
  return formatTimeRange(schedule.open, schedule.close, schedule.isClosed);
};
```

## 📋 Matriz de Decisión

| Función | Genérica | Específica | Ubicación | Razón |
|---------|----------|------------|-----------|--------|
| `formatCurrency()` | ✅ | ❌ | `utils.ts` | Puede formatear cualquier precio |
| `createPhoneLink()` | ✅ | ❌ | `utils.ts` | Puede crear link de cualquier teléfono |
| `getTodaySchedule()` | ❌ | ✅ | `contact.ts` | Específica del horario del restaurante |
| `formatTimeRange()` | ✅ | ❌ | `utils.ts` | Puede formatear cualquier rango |
| `CONTACT_INFO` | ❌ | ✅ | `contact.ts` | Datos específicos de EIMAR |

## 🎯 Beneficios de esta Arquitectura

### 1. **Sin Duplicaciones**
- Una función, una ubicación
- Reutilización máxima
- Mantenimiento centralizado

### 2. **Type Safety**
```typescript
// Los tipos se generan automáticamente
type ScheduleDay = keyof typeof CONTACT_INFO.schedule; // 'monday' | 'tuesday' | ...
```

### 3. **Importaciones Limpias**
```typescript
// Utilidades genéricas
import { formatCurrency, cn } from '@/lib/utils';

// Datos de dominio  
import { CONTACT_INFO, getTodaySchedule } from '@/constants/contact';
```

### 4. **Fácil Testing**
```typescript
// Test funciones genéricas independientemente
expect(formatTimeRange("12:00", "16:00", false)).toBe("12:00 - 16:00");

// Test funciones de dominio con datos reales
expect(getFormattedSchedule('monday')).toBe("12:00 - 16:00");
```

## 🔧 Cómo Añadir Nuevas Utilidades

### ¿Es genérica o específica del dominio?

**Pregúntate**:
- ¿Puede usarse fuera del contexto del restaurante? → `utils.ts`
- ¿Depende de datos específicos de EIMAR? → `contact.ts`
- ¿Maneja lógica de negocio? → `contact.ts`

### Ejemplos:

```typescript
// ✅ Genérica → utils.ts
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Específica → contact.ts  
function isRestaurantOpen(): boolean {
  const today = getTodaySchedule();
  return !today.schedule.isClosed;
}
```

## 🚀 Resultado Final

Esta arquitectura nos da:
- **Código DRY**: No hay duplicaciones
- **Mantenibilidad**: Cambios en un solo lugar
- **Escalabilidad**: Fácil añadir nuevas utilidades
- **Type Safety**: TypeScript nos ayuda en toda la app
- **Testing**: Funciones independientes y testeable

---

*Última actualización: Noviembre 2025*