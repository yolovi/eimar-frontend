//TODO: revisar si todos los tipos son correctos y necesarios

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory // Ref a MenuCategory (entrantes, bocadillos, etc.) 
  image?: string  // ? = opcional (no requerido)
  allergens?: string[]
  isVegetarian?: boolean
  isVegan?: boolean
}

export interface MenuCategory {
  id: string
  name: string  // Nombre de la categoría (entrantes, bocadillos, etc.)
  description?: string
  order: number // Orden de aparición en el menú
}

//datos cliente y reserva
export interface Reservation {
  id?: string  // ID opcional (se genera al guardar)
  name: string
  email: string
  phone: string
  date: Date
  time: string
  guests: number //num. comensales
  specialRequests?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  image?: string
  category: 'football' | 'birthday' | 'celebration' | 'other'
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: {
    [key: string]: string
  }
}