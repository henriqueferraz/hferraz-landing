/**
 * Design tokens da marca HFerraz Automação.
 *
 * Fonte única de verdade para todos os valores visuais da marca.
 * Altere aqui para propagar mudanças em toda a aplicação —
 * nenhum componente deve ter cores, fontes ou espaçamentos hardcoded.
 *
 * @module brand/tokens
 */

/**
 * Paleta de cores extraída do logo e banner da HFerraz Automação.
 * Todos os valores são `as const` para garantir literal types no TypeScript.
 */
export const colors = {
    /** Fundo principal da aplicação — azul muito escuro (quase preto) */
    background: '#050c1a',
    /** Superfície de cards primários */
    surface: '#0a1628',
    /** Superfície de cards secundários */
    surfaceAlt: '#0f1f35',
    /** Bordas sutis entre elementos */
    border: '#1a3050',
    /** Azul principal — cor de destaque do logo */
    primary: '#1e6fdc',
    /** Azul claro — estados de hover e foco */
    primaryLight: '#3d8ef0',
    /** Glow azul — sombras e efeitos de brilho */
    primaryGlow: 'rgba(30, 111, 220, 0.2)',
    /** Azul vibrante — accent para elementos de destaque máximo */
    accent: '#2a7fff',
    /** Texto secundário e placeholders */
    muted: '#8aa0b8',
    /** Texto principal */
    foreground: '#e8f0f8',
    /** Texto levemente apagado — subtítulos e descrições */
    foregroundMuted: '#c0d0e0',
    /** Cinza metálico — elementos do logo */
    silver: '#8b9cb5',
    /** Cinza claro — variação do silver para hover */
    silverLight: '#b0bfd4',
} as const

/**
 * Tokens de tipografia — famílias de fontes por função.
 *
 * - `fontDisplay`: Syne — headlines, títulos de seção
 * - `fontBody`: DM Sans — corpo de texto, parágrafos
 * - `fontMono`: JetBrains Mono — labels técnicos, badges, código
 */
export const typography = {
    fontDisplay: 'Syne',
    fontBody: 'DM Sans',
    fontMono: 'JetBrains Mono',
} as const

/**
 * Tokens de espaçamento baseados em grid de 8px.
 * Use estes valores para padding, margin e gap consistentes.
 */
export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    /** Gap padrão entre seções da landing page */
    sectionGap: '96px',
    /** Largura máxima do container principal */
    maxWidth: '1280px',
} as const

/**
 * Tokens de border-radius.
 * O padrão da marca é "Soft" — bordas suaves que equilibram
 * a rigidez técnica com a modernidade do design.
 */
export const radii = {
    sm: '2px',
    DEFAULT: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
} as const

/**
 * Tokens de animação — durações e easings padrão.
 * Respeite sempre `prefers-reduced-motion` ao usar estes valores.
 */
export const animation = {
    /** Transições rápidas — hover, foco */
    fast: '150ms',
    /** Transições padrão — a maioria dos elementos */
    base: '200ms',
    /** Transições lentas — entradas de seção, modais */
    slow: '300ms',
    /** Animações de entrada com Framer Motion */
    enter: '600ms',
    easing: 'ease-out',
} as const

// ─── Tipos derivados ──────────────────────────────────────────────────────────

/** União de todas as chaves de cor disponíveis */
export type ColorToken = keyof typeof colors

/** União de todas as chaves de espaçamento disponíveis */
export type SpacingToken = keyof typeof spacing

/** União de todas as chaves de tipografia disponíveis */
export type TypographyToken = keyof typeof typography

/** Valor literal de qualquer cor da paleta */
export type ColorValue = (typeof colors)[ColorToken]
