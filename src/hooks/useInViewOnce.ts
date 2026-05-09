'use client'

/**
 * Hook que detecta quando um elemento entra na viewport pela primeira vez.
 *
 * Usa `IntersectionObserver` e desconecta após a primeira detecção
 * para evitar re-triggers desnecessários.
 *
 * @param threshold - Percentual do elemento visível para disparar (padrão: 0.3)
 * @returns Tupla com `[ref, isVisible]` — aplique `ref` ao elemento alvo
 *
 * @example
 * ```tsx
 * function MetricsSection() {
 *   const [ref, isVisible] = useInViewOnce(0.3)
 *   return <div ref={ref}>{isVisible ? 'Visível!' : 'Aguardando...'}</div>
 * }
 * ```
 */

import { useRef, useState, useEffect, type RefObject } from 'react'

export function useInViewOnce<T extends Element>(
    threshold = 0.3
): [RefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [threshold])

    return [ref, isVisible]
}
