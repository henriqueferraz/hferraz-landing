/**
 * Tipos e interfaces compartilhados da aplicação HFerraz Automação.
 *
 * Verifique aqui antes de criar novos tipos em outros módulos.
 * Tipos específicos de um único componente podem ficar no próprio arquivo.
 *
 * @module types
 */

// ─── Navegação ────────────────────────────────────────────────────────────────

/**
 * Item de navegação usado na Navbar e menus mobile.
 */
export interface NavItem {
    /** Texto exibido no link */
    readonly label: string
    /** Destino do link — âncora interna (ex: '#contact') ou URL externa */
    readonly href: string
}

// ─── UI Genérica ──────────────────────────────────────────────────────────────

/**
 * Variantes semânticas para chips e badges de status.
 *
 * @example
 * ```tsx
 * <StatusChip variant="success" label="Ativo" />
 * ```
 */
export type ChipVariant = 'success' | 'warning' | 'error'

/**
 * Props base para componentes que aceitam className customizado.
 * Estenda esta interface em componentes que precisam de override de estilo.
 */
export interface WithClassName {
    className?: string
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

/**
 * Metadados de SEO para páginas e componentes Open Graph.
 */
export interface SeoMeta {
    /** Título da página — aparece na aba do browser e no Google */
    readonly title: string
    /** Descrição — usada em snippets de busca e Open Graph */
    readonly description: string
    /** URL da imagem Open Graph (opcional) */
    readonly ogImage?: string
}

// ─── Formulários ─────────────────────────────────────────────────────────────

/**
 * Dados do formulário de contato validados pelo Zod.
 * Espelha o schema definido em `Contact.tsx`.
 */
export interface ContactFormData {
    readonly name: string
    readonly email: string
    readonly whatsapp: string
    readonly company: string
    readonly message: string
    readonly consent: boolean
}

// ─── Serviços ─────────────────────────────────────────────────────────────────

/**
 * Dados de um serviço exibido na seção Services.
 */
export interface Service {
    /** Componente de ícone Lucide React */
    readonly icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }>
    /** Nome do serviço */
    readonly title: string
    /** Descrição detalhada */
    readonly description: string
    /** Tags de tecnologia associadas */
    readonly tags: readonly string[]
    /** Cor de destaque em hex (ex: '#1e6fdc') */
    readonly color: string
}

/**
 * Dados de uma etapa do fluxo "Como Funciona".
 */
export interface ProcessStep {
    /** Número formatado da etapa (ex: '01') */
    readonly number: string
    /** Componente de ícone Lucide React */
    readonly icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }>
    /** Título da etapa */
    readonly title: string
    /** Descrição da etapa */
    readonly description: string
    /** Cor de destaque em hex */
    readonly color: string
}

/**
 * Dados de um depoimento de cliente.
 */
export interface Testimonial {
    /** Nome completo do cliente */
    readonly name: string
    /** Cargo do cliente */
    readonly role: string
    /** Nome da empresa */
    readonly company: string
    /** Texto do depoimento */
    readonly content: string
    /** Avaliação de 1 a 5 */
    readonly rating: 1 | 2 | 3 | 4 | 5
    /** Iniciais para o avatar (ex: 'CM') */
    readonly initials: string
    /** Cor do avatar em hex */
    readonly color: string
}

/**
 * Dados de uma métrica animada na seção Benefits.
 */
export interface Metric {
    /** Valor numérico para o count-up */
    readonly value: number
    /** Sufixo exibido após o número (ex: '%', 'x', '/7') */
    readonly suffix: string
    /** Descrição da métrica */
    readonly label: string
}
