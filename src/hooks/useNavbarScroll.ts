'use client'

/**
 * Hook que monitora o scroll da página para controlar o estado visual da Navbar.
 *
 * Usa `passive: true` no event listener para não bloquear o thread principal
 * e evitar jank durante o scroll.
 *
 * @returns Objeto com `scrolled` — `true` quando o scroll ultrapassa 20px
 *
 * @example
 * ```tsx
 * function Navbar() {
 *   const { scrolled } = useNavbarScroll()
 *   return (
 *     <nav className={scrolled ? 'bg-surface/90 backdrop-blur-md' : 'bg-transparent'}>
 *       ...
 *     </nav>
 *   )
 * }
 * ```
 */

import { useState, useEffect } from 'react'

export interface NavbarScrollState {
    /** `true` quando o scroll vertical da página ultrapassa 20px */
    scrolled: boolean
}

export function useNavbarScroll(): NavbarScrollState {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = (): void => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { scrolled }
}
