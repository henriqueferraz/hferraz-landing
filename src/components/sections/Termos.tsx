'use client'

/**
 * Seção de Termos de Uso da HFerraz Automação.
 *
 * Exibe os termos e condições gerais de uso dos serviços,
 * organizada em seções temáticas com âncoras de navegação interna.
 *
 * @module components/sections/Termos
 */

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Shield, AlertTriangle, Scale, RefreshCw, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface TermoSection {
    readonly id: string
    readonly icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>
    readonly color: string
    readonly title: string
    readonly content: readonly TermoParagraph[]
}

type TermoParagraph =
    | { readonly type: 'text'; readonly text: string }
    | { readonly type: 'list'; readonly items: readonly string[] }

const TERMO_SECTIONS: readonly TermoSection[] = [
    {
        id: 'aceitacao',
        icon: FileText,
        color: '#1e6fdc',
        title: '1. Aceitação dos Termos',
        content: [
            {
                type: 'text',
                text: 'Ao acessar ou utilizar os serviços da HFerraz Automação ("HFerraz", "nós" ou "nossos"), você ("Usuário" ou "Cliente") concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer disposição aqui presente, recomendamos que não utilize nossos serviços.',
            },
            {
                type: 'text',
                text: 'Estes Termos constituem um acordo legalmente vinculante entre você e a HFerraz Automação, regendo o uso de todos os nossos serviços, plataformas, ferramentas e conteúdos disponibilizados.',
            },
        ],
    },
    {
        id: 'servicos',
        icon: Shield,
        color: '#3d8ef0',
        title: '2. Descrição dos Serviços',
        content: [
            {
                type: 'text',
                text: 'A HFerraz Automação oferece soluções tecnológicas voltadas à automação de processos, integração de sistemas e aplicação de inteligência artificial para empresas. Nossos serviços incluem, mas não se limitam a:',
            },
            {
                type: 'list',
                items: [
                    'Automação de fluxos de trabalho com N8N e ferramentas similares',
                    'Integração via WhatsApp Business API e outras plataformas de mensageria',
                    'Desenvolvimento de sistemas web sob medida com Next.js e tecnologias modernas',
                    'Implementação de agentes de Inteligência Artificial e modelos de linguagem (LLMs)',
                    'Consultoria e suporte técnico em automação e transformação digital',
                ],
            },
            {
                type: 'text',
                text: 'Os serviços são prestados conforme o escopo definido em proposta comercial aceita entre as partes, podendo variar de acordo com o plano contratado.',
            },
        ],
    },
    {
        id: 'responsabilidades',
        icon: Scale,
        color: '#2a7fff',
        title: '3. Responsabilidades do Usuário',
        content: [
            {
                type: 'text',
                text: 'Ao utilizar nossos serviços, o Usuário compromete-se a:',
            },
            {
                type: 'list',
                items: [
                    'Fornecer informações verdadeiras, precisas e atualizadas durante o cadastro e contratação',
                    'Manter a confidencialidade de credenciais de acesso e não compartilhá-las com terceiros',
                    'Utilizar os serviços apenas para fins lícitos e em conformidade com a legislação brasileira vigente',
                    'Não realizar engenharia reversa, cópia ou reprodução não autorizada de qualquer componente dos serviços',
                    'Notificar imediatamente a HFerraz em caso de uso não autorizado de sua conta ou qualquer incidente de segurança',
                    'Respeitar os direitos de propriedade intelectual da HFerraz e de terceiros',
                ],
            },
            {
                type: 'text',
                text: 'O Usuário é integralmente responsável pelo conteúdo e dados inseridos nas automações configuradas, garantindo que não violam direitos de terceiros nem disposições legais.',
            },
        ],
    },
    {
        id: 'propriedade',
        icon: FileText,
        color: '#1e6fdc',
        title: '4. Propriedade Intelectual',
        content: [
            {
                type: 'text',
                text: 'Todo o conteúdo produzido pela HFerraz Automação — incluindo, mas não se limitando a, código-fonte, interfaces, documentação, metodologias, logotipos e materiais de marketing — é de propriedade exclusiva da HFerraz ou de seus licenciadores, protegido pelas leis de direitos autorais e propriedade intelectual.',
            },
            {
                type: 'text',
                text: 'A contratação dos serviços não implica transferência de propriedade intelectual, salvo quando expressamente previsto em contrato específico. O Cliente recebe uma licença de uso limitada, não exclusiva e intransferível sobre os entregáveis acordados.',
            },
            {
                type: 'list',
                items: [
                    'Artefatos e sistemas desenvolvidos exclusivamente para o Cliente são de sua propriedade após quitação integral',
                    'Frameworks, bibliotecas e componentes reutilizáveis permanecem de propriedade da HFerraz',
                    'O uso indevido da marca HFerraz é expressamente proibido sem autorização prévia por escrito',
                ],
            },
        ],
    },
    {
        id: 'limitacao',
        icon: AlertTriangle,
        color: '#3d8ef0',
        title: '5. Limitação de Responsabilidade',
        content: [
            {
                type: 'text',
                text: 'A HFerraz Automação envidará seus melhores esforços para garantir a disponibilidade, segurança e qualidade dos serviços. Entretanto, na máxima extensão permitida pela legislação aplicável, não nos responsabilizamos por:',
            },
            {
                type: 'list',
                items: [
                    'Interrupções decorrentes de falhas em serviços de terceiros (APIs externas, provedores de nuvem, operadoras)',
                    'Perdas ou danos causados por uso indevido dos serviços pelo próprio Usuário',
                    'Danos indiretos, incidentais ou lucros cessantes não previstos em contrato',
                    'Indisponibilidade temporária decorrente de manutenção programada, com aviso prévio',
                    'Ataques cibernéticos de terceiros que escapem às medidas de segurança razoáveis adotadas',
                ],
            },
            {
                type: 'text',
                text: 'Em nenhuma hipótese a responsabilidade total da HFerraz perante o Cliente excederá o valor pago pelos serviços nos últimos 3 (três) meses anteriores ao evento que gerou o dano.',
            },
        ],
    },
    {
        id: 'privacidade',
        icon: Shield,
        color: '#2a7fff',
        title: '6. Privacidade e Proteção de Dados',
        content: [
            {
                type: 'text',
                text: 'O tratamento de dados pessoais realizado pela HFerraz Automação está em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018). As práticas de coleta, uso, armazenamento e proteção de dados estão detalhadas em nossa',
            },
            {
                type: 'text',
                text: 'Ao aceitar estes Termos, o Usuário declara ter lido e concordado também com nossa Política de Privacidade, que integra este documento por referência.',
            },
            {
                type: 'list',
                items: [
                    'Dados coletados são utilizados exclusivamente para a prestação dos serviços contratados',
                    'Não comercializamos dados pessoais de clientes a terceiros',
                    'O titular pode exercer seus direitos previstos na LGPD a qualquer momento via nosso canal de contato',
                    'Implementamos medidas técnicas e organizacionais para proteger seus dados',
                ],
            },
        ],
    },
    {
        id: 'alteracoes',
        icon: RefreshCw,
        color: '#1e6fdc',
        title: '7. Alterações nos Termos',
        content: [
            {
                type: 'text',
                text: 'A HFerraz Automação reserva-se o direito de atualizar estes Termos de Uso a qualquer momento, mediante comunicação prévia ao Usuário com antecedência mínima de 15 (quinze) dias, salvo em casos de exigência legal que demandem alteração imediata.',
            },
            {
                type: 'text',
                text: 'A notificação será realizada pelos canais de contato cadastrados pelo Cliente. O uso continuado dos serviços após a vigência das alterações constituirá aceitação tácita dos novos termos.',
            },
        ],
    },
    {
        id: 'contato',
        icon: Mail,
        color: '#3d8ef0',
        title: '8. Contato e Foro',
        content: [
            {
                type: 'text',
                text: 'Para dúvidas, solicitações ou notificações referentes a estes Termos, entre em contato conosco pelos canais disponíveis em nosso site. Nos comprometemos a responder em até 5 (cinco) dias úteis.',
            },
            {
                type: 'text',
                text: 'Estes Termos são regidos pela legislação brasileira. Fica eleito o Foro da Comarca de Joinville/SC para dirimir quaisquer controvérsias oriundas deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.',
            },
            {
                type: 'list',
                items: [
                    'Data de vigência: Janeiro de 2025',
                    'Última atualização: Agosto de 2026',
                    'Versão: 1.1',
                ],
            },
        ],
    },
] as const

/**
 * Card de uma seção dos termos de uso.
 */
function TermoCard({
    section,
    index,
}: {
    readonly section: TermoSection
    readonly index: number
}): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            id={section.id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : index * 0.05,
            }}
        >
            <Card className="bg-[#0a1628] border-[#1a3050]/60 hover:border-[#1e6fdc]/30 transition-all duration-200">
                <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-5">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                                background: `${section.color}15`,
                                border: `1px solid ${section.color}30`,
                            }}
                        >
                            <section.icon size={18} aria-hidden="true" />
                        </div>
                        <h2 className="font-display font-semibold text-[#e8f0f8] text-xl leading-snug">
                            {section.title}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 pl-14">
                        {section.content.map((block, i) => {
                            if (block.type === 'text') {
                                return (
                                    <p
                                        key={i}
                                        className="text-[#8aa0b8] text-sm leading-relaxed"
                                    >
                                        {block.text}
                                        {/* Link inline para a seção de privacidade */}
                                        {section.id === 'privacidade' && i === 0 && (
                                            <>
                                                {' '}
                                                <Link
                                                    href="/#privacy"
                                                    className="text-[#3d8ef0] hover:text-[#1e6fdc] underline underline-offset-2 transition-colors"
                                                >
                                                    Política de Privacidade
                                                </Link>
                                                .
                                            </>
                                        )}
                                    </p>
                                )
                            }

                            return (
                                <ul key={i} className="flex flex-col gap-2" role="list">
                                    {block.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-[#8aa0b8] text-sm"
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                                style={{ background: section.color }}
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

/**
 * Seção completa de Termos de Uso com navegação interna e cards temáticos.
 */
export default function Termos(): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            className="relative min-h-screen py-24 lg:py-32 bg-[#050c1a]"
            aria-labelledby="termos-title"
        >
            {/* Gradiente de fundo sutil */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(30,111,220,0.05) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                {/* Cabeçalho */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs font-medium text-[#3d8ef0] tracking-widest uppercase mb-3 block">
                        Legal
                    </span>
                    <h1
                        id="termos-title"
                        className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4"
                    >
                        Termos de{' '}
                        <span className="text-gradient">Uso</span>
                    </h1>
                    <p className="text-[#8aa0b8] text-lg max-w-2xl mx-auto">
                        Leia com atenção as condições que regem o uso dos serviços da HFerraz Automação.
                        Em caso de dúvidas,{' '}
                        <Link
                            href="/#contact"
                            className="text-[#3d8ef0] hover:text-[#1e6fdc] underline underline-offset-2 transition-colors"
                        >
                            entre em contato
                        </Link>
                        .
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                {/* Navegação interna */}
                <motion.nav
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                    aria-label="Sumário dos Termos de Uso"
                    className="mb-12"
                >
                    <Card className="bg-[#0a1628] border-[#1a3050]/60">
                        <CardContent className="p-6">
                            <p className="font-mono text-xs font-semibold text-[#3d8ef0] tracking-widest uppercase mb-4">
                                Sumário
                            </p>
                            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-none">
                                {TERMO_SECTIONS.map((section) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className="text-sm text-[#8aa0b8] hover:text-[#e8f0f8] transition-colors duration-200 cursor-pointer"
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>
                </motion.nav>

                <Separator className="mb-12 bg-[#1a3050]/40" />

                {/* Seções dos termos */}
                <div className="flex flex-col gap-6">
                    {TERMO_SECTIONS.map((section, i) => (
                        <TermoCard key={section.id} section={section} index={i} />
                    ))}
                </div>

                {/* Rodapé da página */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8aa0b8]"
                >
                    <span>© 2025 HFerraz Automação. Todos os direitos reservados.</span>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/#privacy"
                            className="hover:text-[#3d8ef0] transition-colors"
                        >
                            Política de Privacidade
                        </Link>
                        <Link
                            href="/"
                            className="hover:text-[#3d8ef0] transition-colors"
                        >
                            ← Voltar ao início
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
