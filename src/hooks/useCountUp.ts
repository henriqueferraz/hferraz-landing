'use client'

/**
 * Hook que anima um número de 0 até um valor alvo usando Framer Motion.
 *
 * Respeita `prefers-reduced-motion` — quando ativo, o valor é definido
 * imediatamente sem animação.
 *
 * @param target - Valor numérico final da animação
 * @param active - Controla se a animação deve iniciar (ex: quando entra na viewport)
 * @param duration - Duração da animação em segundos (padrão: 1.8)
 * @returns Valor atual arredondado para exibição
 *
 * @example
 * ```tsx
 * function MetricCard({ value }: { value: number }) {
 *   const [isVisible, setIsVisible] = useState(false)
 *   const count = useCountUp(value, isVisible)
 *   return <span>{count}%</span>
 * }
 * ```
 */

import { useState, useEffect } from 'react'
import { useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'

export function useCountUp(target: number, active: boolean, duration = 1.8): number {
    const shouldReduceMotion = useReducedMotion()
    const motionValue = useMotionValue(0)
    const rounded = useTransform(motionValue, (v) => Math.round(v))
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        return rounded.on('change', setDisplay)
    }, [rounded])

    useEffect(() => {
        if (!active) return

        if (shouldReduceMotion) {
            motionValue.set(target)
            return
        }

        const controls = animate(motionValue, target, {
            duration,
            ease: 'easeOut',
        })

        return () => controls.stop()
    }, [active, target, duration, motionValue, shouldReduceMotion])

    return display
}
