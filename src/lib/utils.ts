/**
 * Utilitários puros da aplicação HFerraz Automação.
 * Funções sem side effects, sem dependências de estado ou DOM.
 *
 * @module lib/utils
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina class names do Tailwind CSS resolvendo conflitos inteligentemente.
 *
 * Usa `clsx` para condicional e `tailwind-merge` para deduplicação.
 * Prefira esta função a concatenação manual de strings de classe.
 *
 * @param inputs - Class names, objetos condicionais ou arrays
 * @returns String de classes CSS mesclada e sem conflitos
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-primary', 'px-6')
 * // → 'py-2 bg-primary px-6'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Faz scroll suave até um elemento identificado por seletor CSS.
 * Falha silenciosa intencional — evita quebra antes da hidratação.
 *
 * @param selector - Seletor CSS válido (ex: '#contact', '.hero')
 *
 * @example
 * ```ts
 * scrollToSection('#contact')
 * ```
 */
export function scrollToSection(selector: string): void {
  const hash = selector.includes('#') ? `#${selector.split('#')[1]}` : selector
  const element = document.querySelector(hash)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    return
  }

  // Seção não está na página atual (ex.: /termos) — vai para a home com a âncora
  if (typeof window !== 'undefined') {
    window.location.assign(`/${hash}`)
  }
}

/**
 * Formata um número como percentual legível.
 *
 * @param value - Número entre 0 e 100
 * @returns String formatada (ex: `'95%'`)
 *
 * @example
 * ```ts
 * formatPercent(95) // → '95%'
 * ```
 */
export function formatPercent(value: number): string {
  return `${value}%`
}
