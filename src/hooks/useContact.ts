/**
 * SIMPLE CONTACT ACTIONS HOOK - EIMAR
 * ====================================
 *
 * Hook simplificado y centralizado para todas las acciones de contacto.
 * Reemplaza la complejidad de múltiples hooks y archivos.
 *
 * CARACTERÍSTICAS:
 * - API simple y consistente
 * - Detección automática de dispositivo
 * - Integración con contact-actions.ts
 * - TypeScript completo
 * - Performance optimizada
 *
 * USO:
 * const { callPhone, sendWhatsApp, makeReservation, sendEmail, openLocation } = useContact();
 * <button onClick={callPhone}>Llamar</button>
 */

"use client";

import { useCallback, useState, useEffect } from "react";
import { CONTACT_INFO } from "@/constants/contact";
import {
  openDirectCall,
  openWhatsApp,
  openWhatsAppQuickContact,
  openWhatsAppReservation,
  getDeviceInfo
} from "@/lib/contact-actions";
import { useIsMobile } from "./useDeviceDetection";

export interface SimpleContactActions {
  // Acciones principales
  callPhone: () => void;
  sendWhatsApp: (customMessage?: string) => void;
  makeReservation: () => void;
  sendEmail: (subject?: string) => void;
  openLocation: () => void;
  
  // Redes sociales
  openFacebook: () => void;
  openInstagram: () => void;
  openTripAdvisor: () => void;
  
  // Utilidades
  getPhoneNumber: () => string;
  getWhatsAppNumber: () => string;
  getEmail: () => string;
  getLocationUrl: () => string;
  
  // Estado
  isMobile: boolean;
  isMounted: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook unificado para acciones de contacto
 * Incluye manejo básico de errores y es fácil de usar
 * Con detección automática de dispositivo para comportamiento adaptativo
 */
export function useContact(): SimpleContactActions {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWithErrorHandling = useCallback(
    async (action: () => void, actionName: string) => {
      try {
        setIsLoading(true);
        setError(null);
        action();
      } catch (err) {
        const errorMessage = `Error en ${actionName}: ${err instanceof Error ? err.message : 'Error desconocido'}`;
        setError(errorMessage);
        console.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Llamar por teléfono (adaptativo según dispositivo)
  const callPhone = useCallback(() => {
    if (!isMounted) return;
    const deviceInfo = getDeviceInfo();
    handleWithErrorHandling(() => {
      if (deviceInfo.isMobile) {
        openDirectCall();
      } else {
        // En desktop, abrir WhatsApp con mensaje informativo
        openWhatsApp(CONTACT_INFO.whatsapp.messages.info || 'Hola, me gustaría obtener información');
      }
    }, 'llamada');
  }, [isMounted, handleWithErrorHandling]);

  // Enviar WhatsApp
  const sendWhatsApp = useCallback((customMessage?: string) => {
    handleWithErrorHandling(() => {
      if (customMessage) {
        openWhatsApp(customMessage);
      } else {
        openWhatsAppQuickContact();
      }
    }, 'WhatsApp');
  }, [handleWithErrorHandling]);

  // Hacer reserva
  const makeReservation = useCallback(() => {
    handleWithErrorHandling(() => openWhatsAppReservation(), 'reserva');
  }, [handleWithErrorHandling]);

  // Enviar email
  const sendEmail = useCallback((subject?: string) => {
    handleWithErrorHandling(() => {
      const emailUrl = subject 
        ? `mailto:${CONTACT_INFO.email.main}?subject=${encodeURIComponent(subject)}`
        : `mailto:${CONTACT_INFO.email.main}`;
      window.location.href = emailUrl;
    }, 'email');
  }, [handleWithErrorHandling]);

  // Abrir ubicación
  const openLocation = useCallback(() => {
    handleWithErrorHandling(() => {
      window.open(CONTACT_INFO.coordinates.googleMapsLink, '_blank');
    }, 'ubicación');
  }, [handleWithErrorHandling]);

  // Redes sociales
  const openFacebook = useCallback(() => {
    handleWithErrorHandling(() => {
      window.open(CONTACT_INFO.social.facebook.url, '_blank', 'noopener,noreferrer');
    }, 'Facebook');
  }, [handleWithErrorHandling]);

  const openInstagram = useCallback(() => {
    handleWithErrorHandling(() => {
      window.open(CONTACT_INFO.social.instagram.url, '_blank', 'noopener,noreferrer');
    }, 'Instagram');
  }, [handleWithErrorHandling]);

  const openTripAdvisor = useCallback(() => {
    handleWithErrorHandling(() => {
      window.open(CONTACT_INFO.social.tripadvisor.url, '_blank', 'noopener,noreferrer');
    }, 'TripAdvisor');
  }, [handleWithErrorHandling]);

  // Utilidades para obtener datos
  const getPhoneNumber = useCallback(() => CONTACT_INFO.phone.primary.display, []);
  const getWhatsAppNumber = useCallback(() => CONTACT_INFO.whatsapp.display, []);
  const getEmail = useCallback(() => CONTACT_INFO.email.main, []);
  const getLocationUrl = useCallback(() => CONTACT_INFO.coordinates.googleMapsLink, []);

  return {
    // Acciones principales
    callPhone,
    sendWhatsApp,
    makeReservation,
    sendEmail,
    openLocation,
    
    // Redes sociales
    openFacebook,
    openInstagram,
    openTripAdvisor,
    
    // Utilidades
    getPhoneNumber,
    getWhatsAppNumber,
    getEmail,
    getLocationUrl,
    
    // Estado
    isMobile,
    isMounted,
    isLoading,
    error
  };
}

export default useContact;