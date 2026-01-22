/**
 * CONTACT ACTIONS HOOK - EIMAR
 * =============================
 *
 * Hook personalizado para manejar acciones de contacto de forma reactiva.
 * Gestiona detección de dispositivo, estado de montaje y acciones optimizadas.
 *
 * CARACTERÍSTICAS:
 * - Detección reactiva de dispositivo móvil/desktop
 * - Prevención de hydration mismatch
 * - Acciones optimizadas según plataforma
 * - Estado de carga y error integrados
 * - TypeScript para seguridad de tipos
 * - Reutilizable en cualquier componente
 *
 * USO:
 * const { isMobile, handlePhoneAction, handleWhatsApp, isLoading } = useContactActions();
 * <button onClick={handlePhoneAction}>
 *   {isMobile ? "Llamar" : "WhatsApp"}
 * </button>
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  openPhoneAction,
  openWhatsApp,
  openWhatsAppReservation,
  openDirectCall,
  openWhatsAppQuickContact,
  getDeviceInfo,
  getContactActionLabel,
  getContactActionTitle,
  type ReservationData,
  type DeviceInfo,
} from "@/lib/contact-actions";

export interface UseContactActionsReturn {
  // Estado del dispositivo
  isMounted: boolean;
  isMobile: boolean;
  isTablet: boolean;
  deviceInfo: DeviceInfo;

  // Acciones de contacto
  handlePhoneAction: (customMessage?: string, forcePhone?: boolean) => void;
  handleWhatsApp: (message?: string, openInNewTab?: boolean) => void;
  handleReservation: (reservationData?: ReservationData, customMessage?: string) => void;
  handleDirectCall: () => void;
  handleQuickContact: () => void;

  // Utilidades de etiquetas
  getActionLabel: (actionType?: "phone" | "whatsapp" | "reservation") => string;
  getActionTitle: (actionType?: "phone" | "whatsapp" | "reservation") => string;

  // Estados auxiliares
  isLoading: boolean;
  error: string | null;
}

/**
 ** useContactActions:
 * Hook para manejar todas las acciones de contacto de forma centralizada
 * 
 * @param options - Opciones de configuración del hook
 * @returns Funciones y estado para manejar contacto
 */
export function useContactActions(options?: {
  onError?: (error: string) => void;
  enableErrorHandling?: boolean;
}): UseContactActionsReturn {
  // Estado del dispositivo y montaje
  const [isMounted, setIsMounted] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({ isMobile: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto para detectar dispositivo y evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setDeviceInfo(getDeviceInfo());

    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handler con manejo de errores opcional
  const withErrorHandling = useCallback(
    (action: () => void, actionName: string) => {
      if (!options?.enableErrorHandling) {
        action();
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        action();
      } catch (err) {
        const errorMessage = `Error en ${actionName}: ${err instanceof Error ? err.message : "Error desconocido"}`;
        setError(errorMessage);
        
        if (options?.onError) {
          options.onError(errorMessage);
        } else {
          console.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [options?.enableErrorHandling, options?.onError]
  );

  // Acción principal de teléfono (adaptativa)
  const handlePhoneAction = useCallback(
    (customMessage?: string, forcePhone?: boolean) => {
      if (!isMounted) return;

      withErrorHandling(
        () => openPhoneAction(customMessage, forcePhone),
        "acción de teléfono"
      );
    },
    [isMounted, withErrorHandling]
  );

  // Acción de WhatsApp
  const handleWhatsApp = useCallback(
    (message?: string, openInNewTab?: boolean) => {
      withErrorHandling(
        () => openWhatsApp(message, openInNewTab),
        "WhatsApp"
      );
    },
    [withErrorHandling]
  );

  // Acción de reserva
  const handleReservation = useCallback(
    (reservationData?: ReservationData, customMessage?: string) => {
      withErrorHandling(
        () => openWhatsAppReservation(reservationData, customMessage),
        "reserva"
      );
    },
    [withErrorHandling]
  );

  // Llamada directa
  const handleDirectCall = useCallback(
    () => {
      if (!isMounted) return;
      
      withErrorHandling(
        () => openDirectCall(),
        "llamada directa"
      );
    },
    [isMounted, withErrorHandling]
  );

  // Contacto rápido
  const handleQuickContact = useCallback(
    () => {
      withErrorHandling(
        () => openWhatsAppQuickContact(),
        "contacto rápido"
      );
    },
    [withErrorHandling]
  );

  // Obtener etiqueta de acción
  const getActionLabel = useCallback(
    (actionType: "phone" | "whatsapp" | "reservation" = "phone") => {
      return isMounted ? getContactActionLabel(actionType, deviceInfo) : "Contactar";
    },
    [isMounted, deviceInfo]
  );

  // Obtener título de acción
  const getActionTitle = useCallback(
    (actionType: "phone" | "whatsapp" | "reservation" = "phone") => {
      return isMounted ? getContactActionTitle(actionType, deviceInfo) : "Contactar";
    },
    [isMounted, deviceInfo]
  );

  return {
    // Estado del dispositivo
    isMounted,
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet || false,
    deviceInfo,

    // Acciones de contacto
    handlePhoneAction,
    handleWhatsApp,
    handleReservation,
    handleDirectCall,
    handleQuickContact,

    // Utilidades de etiquetas
    getActionLabel,
    getActionTitle,

    // Estados auxiliares
    isLoading,
    error,
  };
}

/**
 ** useSimpleContactActions:
 * Versión simplificada del hook para casos básicos
 * 
 * @returns Funciones básicas de contacto sin manejo avanzado de errores
 */
export function useSimpleContactActions() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const { isMobile: mobile } = getDeviceInfo();
    setIsMobile(mobile);

    const handleResize = () => {
      const { isMobile: mobile } = getDeviceInfo();
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhoneAction = useCallback(() => {
    if (!isMounted) return;
    openPhoneAction();
  }, [isMounted]);

  const handleReservation = useCallback(() => {
    openWhatsAppReservation();
  }, []);

  return {
    isMounted,
    isMobile,
    handlePhoneAction,
    handleReservation,
  };
}