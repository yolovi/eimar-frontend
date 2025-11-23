# 🛠️ Utilidades del Proyecto EIMAR

Este archivo contiene todas las funciones de utilidad disponibles en el proyecto.

## 📋 Índice de Funciones

### 🎨 **Estilos & CSS**
- [`cn()`](#cn) - Combina clases CSS con Tailwind merge

### 💰 **Formateo**
- [`formatCurrency()`](#formatcurrency) - Formatea números como moneda EUR
- [`formatDate()`](#formatdate) - Formatea fechas en español

---

## 📖 Documentación Detallada

### `cn()`
**Propósito:** Combina clases CSS condicionalmente y resuelve conflictos de Tailwind.

```typescript
cn('px-2 py-1', 'bg-red-500', { 'text-white': isActive })
// → "px-2 py-1 bg-red-500 text-white"

cn('p-4', 'p-2') // twMerge elimina conflictos
// → "p-2" (solo la última clase de padding)
```

**Parámetros:** `...inputs: ClassValue[]`  
**Retorna:** `string`

---

### `formatCurrency()`
**Propósito:** Formatea números como moneda europea (EUR).

```typescript
formatCurrency(15.5)    // → "15,50 €"
formatCurrency(1234.56) // → "1.234,56 €"
formatCurrency(0.99)    // → "0,99 €"
```

**Parámetros:** `amount: number`  
**Retorna:** `string`  
**Locale:** `es-ES`

---

### `formatDate()`
**Propósito:** Formatea fechas en formato español legible.

```typescript
formatDate(new Date('2025-10-29'))  // → "29 de octubre de 2025"
formatDate(new Date('2025-12-25'))  // → "25 de diciembre de 2025"
```

**Parámetros:** `date: Date`  
**Retorna:** `string`  
**Locale:** `es-ES`

---

## 🚀 Cómo Usar

```typescript
// Importar todas las utilidades
import { cn, formatCurrency, formatDate } from '@/lib/utils';

// O importar solo las que necesites
import { formatCurrency } from '@/lib/utils';

// Ejemplos de uso en componentes
function MenuCard({ price, date, isActive }) {
  return (
    <div className={cn('p-4 border', { 'bg-accent': isActive })}>
      <p>Precio: {formatCurrency(price)}</p>
      <p>Fecha: {formatDate(date)}</p>
    </div>
  );
}

<Button className={cn('px-4 py-2', isActive && 'bg-accent')}>
  {formatCurrency(12.90)}
</Button>
```

---

## ✅ Utilidades Sugeridas Por Implementar 

- `slugify(text)` - URLs amigables de la propia web: "Menú Degustación"  → "/menu/menu-degustacion"


#### En caso de web dinámica (reservas, formularios, búsquedas...)

### 🕒 **Tiempo & Fechas**
- `formatTime(date)` - Para horarios: "14:30"
- `formatDateTime(date)` - Fecha y hora completa
- `isDateInPast(date)` - Validar fechas pasadas

### 📝 **Strings & Texto**
- `capitalizeFirst(text)` - Primera letra mayúscula
- `truncateText(text, length)` - Acortar texto con "..."

### ✉️ **Validaciones**
- `validateEmail(email)` - Validar emails
- `validatePhone(phone)` - Validar teléfonos españoles
- `validateReservation(data)` - Validar datos de reserva

### 🔄 **Performance & UX**
- `debounce(fn, delay)` - Optimizar búsquedas
- `throttle(fn, limit)` - Limitar ejecuciones
- `generateId()` - IDs únicos para componentes

### 🍽️ **Específicas del Restaurante**
- `formatMenuPrice(price, discount?)` - Precios con descuento
- `getAvailableSlots(date)` - Horarios disponibles
- `calculateReservationDuration()` - Duración de reservas

---

## 📁 Estructura del Archivo

```
src/lib/utils.ts
├── Imports y dependencias
├── Índice comentado (qué hay disponible)
├── Funciones de estilos (cn)
├── Funciones de formateo (currency, date)
└── Funciones específicas del negocio
```

---

**💡 Tip:** Antes de crear una nueva función, revisa este índice para evitar duplicados y mantener consistencia en el código.