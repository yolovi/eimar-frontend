"use client";

import Logo from '@/components/Logo';
import { Button, ActionButton, HeroButton } from '@/components/ui';
import { Phone, Heart, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<string>('colors');

  const sections = [
    { id: 'colors', name: 'Colores' },
    { id: 'typography', name: 'Tipografía' },
    { id: 'buttons', name: 'Botones' },
    { id: 'actions', name: 'Action Buttons' },
    { id: 'components', name: 'Componentes' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-secondary text-text-inverse p-6">
        <div className="max-w-7xl mx-auto">
          <Logo size="md" className="mb-4" />
          <h1 className="ds-h1 text-text-inverse">Design System EIMAR</h1>
          <p className="ds-hero-base text-text-inverse! opacity-60 mt-2">
            Guía de estilos y componentes del restaurante
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 p-6 bg-bg-accent/5 min-h-screen">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-accent text-white'
                      : 'hover:bg-bg-accent/20 text-text-secondary'
                  }`}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'colors' && <ColorsSection />}
          {activeSection === 'typography' && <TypographySection />}
          {activeSection === 'buttons' && <ButtonsSection />}
          {activeSection === 'actions' && <ActionButtonsSection />}
          {activeSection === 'components' && <ComponentsSection />}
        </main>
      </div>
    </div>
  );
}

// Sección de Colores
function ColorsSection() {
  const colors = [
    { name: 'Primary (Negro)', class: 'bg-bg-secondary', css: 'var(--color-bg-secondary)' },
    { name: 'Base (Blanco)', class: 'bg-bg-primary', css: 'var(--color-bg-primary)' },
    { name: 'Accent (Verde)', class: 'bg-accent', css: 'var(--color-accent)' },
    { name: 'Destructive', class: 'bg-red', css: 'var(--color-destructive)' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="ds-h2 mb-6">Paleta de Colores</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color) => (
            <div key={color.name} className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-lg border ${color.class} mb-3`}></div>
              <h3 className="ds-h6">{color.name}</h3>
              <code className="text-xs bg-bg-accent/10 px-2 py-1 rounded">{color.css}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sección de Tipografía
function TypographySection() {
  return (
    <div className="space-y-8">
      <h2 className="ds-h2 mb-6">Tipografía</h2>
      
      {/* Fuentes */}
      <div className="space-y-4">
        <h3 className="ds-h3">Fuentes</h3>
        <div className="space-y-3">
          <div className="p-4 border border-border-primary rounded-lg">
            <p className="font-sans text-lg">Geist Sans - Fuente principal para UI</p>
            <code className="text-sm text-text-muted">font-family: 'Geist Sans'</code>
          </div>
          <div className="p-4 border border-border-primary rounded-lg">
            <p className="font-accent text-lg">Playfair Display - Títulos elegantes</p>
            <code className="text-sm text-text-muted">font-family: 'Playfair Display'</code>
          </div>
          <div className="p-4 border border-border-primary rounded-lg">
            <p className="font-mono text-lg">Geist Mono - Código y datos</p>
            <code className="text-sm text-text-muted">font-family: 'Geist Mono'</code>
          </div>
        </div>
      </div>

      {/* Escala tipográfica */}
      <div className="space-y-4">
        <h3 className="ds-h3">Escala Tipográfica</h3>
        <div className="space-y-6">
          <div><h1 className="ds-h1">H1 - Título principal</h1></div>
          <div><h2 className="ds-h2">H2 - Título de sección</h2></div>
          <div><h3 className="ds-h3">H3 - Subtítulo</h3></div>
          <div><h4 className="ds-h4">H4 - Encabezado menor</h4></div>
          <div><p className="ds-body-xl">Body XL - Texto destacado</p></div>
          <div><p className="ds-body-base">Body Base - Texto normal</p></div>
          <div><p className="ds-body-sm">Body SM - Texto pequeño</p></div>
        </div>
      </div>
    </div>
  );
}

// Sección de Botones básicos
function ButtonsSection() {
  return (
    <div className="space-y-8">
      <h2 className="ds-h2 mb-6">Sistema de Botones</h2>
      
      {/* Variantes */}
      <div className="space-y-4">
        <h3 className="ds-h3">Variantes</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Tamaños */}
      <div className="space-y-4">
        <h3 className="ds-h3">Tamaños</h3>
        <div className="flex items-end gap-4">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
          <Button size="xl" variant="primary">Extra Large</Button>
        </div>
      </div>

      {/* Estados */}
      <div className="space-y-4">
        <h3 className="ds-h3">Estados</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" isLoading>Loading</Button>
        </div>
      </div>

      {/* Con iconos */}
      <div className="space-y-4">
        <h3 className="ds-h3">Con Iconos</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" leftIcon={<Phone size={16} />}>Llamar</Button>
          <Button variant="secondary" rightIcon={<span>→</span>}>Siguiente</Button>
        </div>
      </div>
    </div>
  );
}

// Sección de Action Buttons (nuevo sistema)
function ActionButtonsSection() {
  return (
    <div className="space-y-8">
      <h2 className="ds-h2 mb-6">Action Buttons (Sistema Unificado)</h2>
      <p className="ds-body-base text-text-muted mb-8">
        Sistema centralizado para acciones de contacto con detección automática de dispositivo.
      </p>

      {/* Acciones disponibles */}
      <div className="space-y-6">
        <h3 className="ds-h3">Tipos de Acción</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionButton action="phone" variant="button" style="primary" size="md" customText="Teléfono" />
          <ActionButton action="whatsapp" variant="button" style="primary" size="md" customText="WhatsApp" />
          <ActionButton action="reservation" variant="button" style="primary" size="md" customText="Reservar" />
          <ActionButton action="email" variant="button" style="secondary" size="md" customText="Email" />
          <ActionButton action="location" variant="button" style="outline" size="md" customText="Ubicación" />
        </div>
      </div>

      {/* Variantes */}
      <div className="space-y-6">
        <h3 className="ds-h3">Variantes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="ds-h5 mb-3">Button</h4>
            <div className="flex gap-4">
              <ActionButton action="phone" variant="button" style="primary" size="sm" />
              <ActionButton action="whatsapp" variant="button" style="secondary" size="sm" />
              <ActionButton action="reservation" variant="button" style="outline" size="sm" />
            </div>
          </div>
          
          <div>
            <h4 className="ds-h5 mb-3">Link</h4>
            <div className="flex gap-4">
              <ActionButton action="phone" variant="link" style="primary" size="sm" />
              <ActionButton action="email" variant="link" style="minimal" size="sm" />
            </div>
          </div>

          <div>
            <h4 className="ds-h5 mb-3">Icon Only</h4>
            <div className="flex gap-4">
              <ActionButton action="phone" variant="icon" style="primary" size="sm" />
              <ActionButton action="whatsapp" variant="icon" style="secondary" size="sm" />
              <ActionButton action="location" variant="icon" style="outline" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sección de Componentes
function ComponentsSection() {
  return (
    <div className="space-y-8">
      <h2 className="ds-h2 mb-6">Componentes del Sistema</h2>
      
      <div className="space-y-8">
        {/* Logo */}
        <div>
          <h3 className="ds-h3 mb-4">Logo</h3>
          <div className="flex items-center gap-8 p-6 border border-border-primary rounded-lg">
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
          </div>
        </div>

        {/* HeroButton */}
        <div>
          <h3 className="ds-h3 mb-4">Hero Button</h3>
          <div className="flex gap-4">
            <HeroButton variant="primary" size="md">Reservar Mesa</HeroButton>
            <HeroButton variant="secondary" size="md">Ver Carta</HeroButton>
          </div>
        </div>

        {/* Más componentes se pueden añadir aquí */}
      </div>
    </div>
  );
}
