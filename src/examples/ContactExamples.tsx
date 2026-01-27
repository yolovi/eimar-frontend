/**
 * EJEMPLOS DE USO DE CONSTANTES DE CONTACTO
 * =========================================
 * 
 * Este archivo muestra cómo usar las constantes de contacto
 * centralizadas en diferentes componentes y situaciones.
 */

import { CONTACT_INFO, getTodaySchedule } from '@/constants/contact';
import { openPhoneAction, openWhatsApp } from '@/lib/contact-actions';
import { Icons } from '@/lib/icons';

// EJEMPLO 1: Componente de información de contacto
export const ContactInfoCard = () => {
  const todaySchedule = getTodaySchedule();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
      
      {/* Teléfonos */}
      <div className="mb-3">
        <p className="font-medium">Teléfonos:</p>
        <a 
          href={CONTACT_INFO.phone.primary.link}
          className="text-blue-600 hover:underline"
        >
          {CONTACT_INFO.phone.primary.display}
        </a>
        <span className="mx-2">|</span>
        <a 
          href={CONTACT_INFO.phone.secondary.link}
          className="text-blue-600 hover:underline"  
        >
          {CONTACT_INFO.phone.secondary.display}
        </a>
      </div>

      {/* WhatsApp */}
      <div className="mb-3">
        <p className="font-medium">WhatsApp:</p>
        <a 
          href={CONTACT_INFO.whatsapp.linkWithMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          {CONTACT_INFO.whatsapp.display}
        </a>
      </div>

      {/* Email */}
      <div className="mb-3">
        <p className="font-medium">Email:</p>
        <a 
          href={`mailto:${CONTACT_INFO.email.main}`}
          className="text-blue-600 hover:underline"
        >
          {CONTACT_INFO.email.main}
        </a>
      </div>

      {/* Dirección */}
      <div className="mb-3">
        <p className="font-medium">Dirección:</p>
        <a 
          href={CONTACT_INFO.coordinates.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {CONTACT_INFO.address.full}
        </a>
      </div>

      {/* Horario de hoy */}
      <div className="mb-3">
        <p className="font-medium">Horario hoy ({todaySchedule.day}):</p>
        <span className="text-gray-600">{todaySchedule.formatted}</span>
      </div>
    </div>
  );
};

// EJEMPLO 2: Botón de llamada rápida
export const QuickCallButton = () => (
  <button
    onClick={() => window.open(CONTACT_INFO.phone.primary.link, '_self')}
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
    title={`Llamar: ${CONTACT_INFO.phone.primary.display}`}
  >
    <Icons.phone className="inline w-4 h-4 mr-1" /> Llamar ahora
  </button>
);

// EJEMPLO 3: Botón de WhatsApp con mensaje personalizado
export const WhatsAppButton = ({ message = "" }) => {
  const whatsappUrl = message 
    ? `${CONTACT_INFO.whatsapp.link}?text=${encodeURIComponent(message)}`
    : CONTACT_INFO.whatsapp.linkWithMessage;
    
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
    >
      <Icons.whatsapp size={16} /> WhatsApp
    </a>
  );
};

// EJEMPLO 4: Footer con toda la información
export const ContactFooter = () => (
  <footer className="bg-gray-100 p-6">
    <div className="grid md:grid-cols-3 gap-6">
      {/* Contacto */}
      <div>
        <h4 className="font-semibold mb-2">Contacto</h4>
        <p><Icons.phone className="inline w-4 h-4 mr-1" /> {CONTACT_INFO.phone.primary.display}</p>
        <p><Icons.whatsapp className="inline w-4 h-4 mr-1" /> {CONTACT_INFO.whatsapp.display}</p>
        <p><Icons.email className="inline w-4 h-4 mr-1" /> {CONTACT_INFO.email.main}</p>
      </div>
      
      {/* Ubicación */}
      <div>
        <h4 className="font-semibold mb-2">Ubicación</h4>
        <p>{CONTACT_INFO.address.street}</p>
        <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</p>
        <p>{CONTACT_INFO.address.province}, {CONTACT_INFO.address.country}</p>
      </div>
      
      {/* Redes sociales */}
      <div>
        <h4 className="font-semibold mb-2">Síguenos</h4>
        <div className="space-y-1">
          <a href={CONTACT_INFO.social.instagram.url} target="_blank" className="block text-blue-600 hover:underline">
            <Icons.instagram className="inline w-4 h-4 mr-1" /> {CONTACT_INFO.social.instagram.username}
          </a>
          <a href={CONTACT_INFO.social.facebook.url} target="_blank" className="block text-blue-600 hover:underline">
            <Icons.facebook className="inline w-4 h-4 mr-1" /> {CONTACT_INFO.social.facebook.name}
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * CASOS DE USO COMUNES
 * ====================
 */

// Reservas por teléfono
export const makeReservationCall = () => {
  window.open(CONTACT_INFO.phone.primary.link, '_self');
};

// WhatsApp para consultas
export const openWhatsAppForQuery = (query: string) => {
  const url = `${CONTACT_INFO.whatsapp.link}?text=${encodeURIComponent(query)}`;
  window.open(url, '_blank');
};

// Abrir Google Maps
export const openGoogleMaps = () => {
  window.open(CONTACT_INFO.coordinates.googleMapsLink, '_blank');
};

// Email para eventos
export const sendEventEmail = (subject: string) => {
  const emailUrl = `mailto:${CONTACT_INFO.email.eventos}?subject=${encodeURIComponent(subject)}`;
  window.open(emailUrl, '_self');
};