/**
 * Footer da landing page HFerraz Automação.
 *
 * Exibe logo, tagline, links de navegação, redes sociais e copyright.
 * Todos os valores de marca são importados de `src/brand/`.
 *
 * @module components/layout/Footer
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, MessageSquare } from 'lucide-react'
import { logos, brandLinks, brandMeta, colors } from '@/brand'
import type { NavItem } from '@/types'

interface FooterLinkGroup {
    readonly category: string
    readonly links: readonly NavItem[]
}

interface SocialLink {
    readonly icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false'; className?: string; style?: React.CSSProperties }>
    readonly label: string
    readonly href: string
}

const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
    {
        category: 'Plataforma',
        links: [
            { label: 'Solutions', href: '#services' },
            { label: 'API Docs', href: '#' },
        ],
    },
    {
        category: 'Empresa',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Termos de Uso', href: '#' },
        ],
    },
] as const

const SOCIAL_LINKS: readonly SocialLink[] = [
    { icon: Linkedin, label: 'LinkedIn', href: brandLinks.linkedin },
    { icon: MessageSquare, label: 'WhatsApp', href: brandLinks.whatsapp },
] as const

/**
 * Componente de rodapé com links, redes sociais e copyright.
 */
export default function Footer(): React.ReactElement {
    return (
        <footer className="relative bg-[#050c1a] border-t border-[#1a3050]/60" role="contentinfo">
            {/* Accent line superior */}
            <div
                className="h-px w-full"
                style={{
                    background: `linear-gradient(90deg, transparent 0%, ${colors.primary} 30%, ${colors.accent} 50%, ${colors.primary} 70%, transparent 100%)`,
                    opacity: 0.4,
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <Image
                            src={logos.primary.src}
                            alt={logos.primary.alt}
                            width={logos.primary.width}
                            height={logos.primary.height}
                            className="h-9 w-auto object-contain"
                        />
                        <p className="text-[#8aa0b8] text-sm leading-relaxed max-w-xs">
                            {brandMeta.tagline}
                        </p>
                    </div>

                    {/* Link groups */}
                    {FOOTER_LINK_GROUPS.map(({ category, links }) => (
                        <div key={category} className="flex flex-col gap-3">
                            <h3 className="font-mono text-xs font-semibold text-[#3d8ef0] tracking-widest uppercase">
                                {category}
                            </h3>
                            <ul className="flex flex-col gap-2" role="list">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[#8aa0b8] hover:text-[#e8f0f8] transition-colors duration-200 cursor-pointer"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-mono text-xs font-semibold text-[#3d8ef0] tracking-widest uppercase">
                            Conectar
                        </h3>
                        <ul className="flex flex-col gap-2" role="list">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-[#8aa0b8] hover:text-[#e8f0f8] transition-colors duration-200 cursor-pointer"
                                        aria-label={`Visitar ${social.label}`}
                                    >
                                        <social.icon size={14} aria-hidden="true" />
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-[#1a3050]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="font-mono text-xs text-[#8aa0b8]">
                        {brandMeta.copyright}
                    </p>
                    <p className="font-mono text-xs text-[#1a3050]">
                        Built with Next.js · TypeScript · Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    )
}
