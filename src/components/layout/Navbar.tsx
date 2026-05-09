'use client'

/**
 * Navbar principal da landing page HFerraz Automação.
 *
 * Usa shadcn/ui `Button` para o CTA e `Sheet` para o menu mobile.
 * O estado de scroll é gerenciado pelo hook `useNavbarScroll`.
 *
 * @module components/layout/Navbar
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { logos } from '@/brand'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import { scrollToSection } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

/** Links de navegação principal */
const NAV_ITEMS: readonly NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'Serviços', href: '#services' },
    { label: 'Benefícios', href: '#benefits' },
    { label: 'Como Funciona', href: '#how-it-works' },
    { label: 'Contato', href: '#contact' },
] as const

/**
 * Componente de navegação principal.
 * Usa `useNavbarScroll` para controlar o estado visual ao rolar.
 */
export default function Navbar(): React.ReactElement {
    const { scrolled } = useNavbarScroll()

    const handleNavClick = (href: string): void => {
        scrollToSection(href)
    }

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-[#050c1a]/90 backdrop-blur-md border-b border-[#1a3050]/60 shadow-lg shadow-black/20'
                    : 'bg-transparent'
            )}
            role="navigation"
            aria-label="Navegação principal"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="#home"
                        onClick={() => handleNavClick('#home')}
                        aria-label={`${logos.primary.alt} — Início`}
                    >
                        <Image
                            src={logos.primary.src}
                            alt={logos.primary.alt}
                            width={logos.primary.width}
                            height={logos.primary.height}
                            priority
                            className="h-9 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Button
                                key={item.href}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleNavClick(item.href)}
                                className="text-[#c0d0e0] hover:text-[#e8f0f8] hover:bg-[#1a3050]/40 font-body cursor-pointer"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* CTA desktop + Sheet mobile */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="hidden md:inline-flex btn-glow px-5 py-2.5 text-sm"
                            aria-label="Solicitar orçamento"
                        >
                            Solicitar Orçamento
                        </button>

                        {/* Mobile: Sheet do shadcn/ui */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden text-[#c0d0e0] hover:text-[#e8f0f8] hover:bg-[#1a3050]/40 cursor-pointer"
                                    aria-label="Abrir menu"
                                >
                                    <Menu size={22} />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-72 bg-[#0a1628] border-l border-[#1a3050] p-0"
                            >
                                <SheetHeader className="p-4 border-b border-[#1a3050]">
                                    <SheetTitle className="flex items-center">
                                        <Image
                                            src={logos.compact.src}
                                            alt={logos.compact.alt}
                                            width={logos.compact.width}
                                            height={logos.compact.height}
                                            className="h-8 w-auto"
                                        />
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="p-4 flex flex-col gap-1" aria-label="Menu mobile">
                                    {NAV_ITEMS.map((item) => (
                                        <Button
                                            key={item.href}
                                            variant="ghost"
                                            className="w-full justify-start text-[#c0d0e0] hover:text-[#e8f0f8] hover:bg-[#1a3050]/50 font-body cursor-pointer"
                                            onClick={() => handleNavClick(item.href)}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}

                                    <Separator className="my-3 bg-[#1a3050]" />

                                    <button
                                        onClick={() => handleNavClick('#contact')}
                                        className="w-full btn-glow px-5 py-3 text-sm"
                                        aria-label="Solicitar orçamento"
                                    >
                                        Solicitar Orçamento
                                    </button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}
