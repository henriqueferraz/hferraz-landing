/**
 * Metadados dos assets de logo e imagens da marca HFerraz Automação.
 *
 * Atualize aqui ao trocar arquivos de imagem — os componentes
 * que importam deste módulo serão atualizados automaticamente.
 *
 * @module brand/logos
 */

/**
 * Estrutura de metadados para um asset de imagem compatível com `next/image`.
 */
export interface ImageAsset {
    /** Caminho público do arquivo (relativo a `/public`) */
    readonly src: string
    /** Texto alternativo acessível */
    readonly alt: string
    /** Largura intrínseca em pixels */
    readonly width: number
    /** Altura intrínseca em pixels */
    readonly height: number
}

/**
 * Assets de logo da marca em suas variações de uso.
 *
 * @example
 * ```tsx
 * import { logos } from '@/brand'
 * import Image from 'next/image'
 *
 * <Image {...logos.primary} priority className="h-9 w-auto" />
 * ```
 */
export const logos = {
    /**
     * Logo principal — usado na Navbar e Footer.
     * Dimensões otimizadas para altura de 36px (h-9).
     */
    primary: {
        src: '/logo.png',
        alt: 'HFerraz Automação',
        width: 130,
        height: 44,
    },
    /**
     * Logo compacto — usado em espaços reduzidos (ex: drawer mobile).
     * Dimensões otimizadas para altura de 32px (h-8).
     */
    compact: {
        src: '/logo.png',
        alt: 'HFerraz Automação',
        width: 110,
        height: 36,
    },
    /**
     * Banner principal — imagem de capa para OG e hero sections.
     */
    banner: {
        src: '/banner.jpg',
        alt: 'HFerraz Automação — Soluções de Automação Industrial',
        width: 1920,
        height: 600,
    },
} as const satisfies Record<string, ImageAsset>

/**
 * Informações de contato e links externos da marca.
 * Centralize aqui para evitar URLs duplicadas no código.
 */
export const brandLinks = {
    whatsapp: 'https://wa.me/5511999999999',
    instagram: 'https://instagram.com/hferrazautomacao',
    /** Localização para exibição — não é um link clicável */
    location: 'Joinville/SC — Brasil',
} as const

/**
 * Metadados textuais da marca para uso em SEO e UI.
 */
export const brandMeta = {
    name: 'HFerraz Automação',
    tagline: 'Elevando padrões operacionais através de inteligência artificial e engenharia de software.',
    shortDescription: 'Tecnologia que trabalha por você.',
    copyright: '© 2024 HFerraz Automação. All rights reserved.',
} as const
