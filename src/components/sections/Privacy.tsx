'use client'

/**
 * Seção de política de privacidade resumida da landing page HFerraz Automação.
 *
 * Apresenta de forma clara como os dados dos usuários são coletados,
 * usados e protegidos, organizada em cards temáticos.
 *
 * @module components/sections/Privacy
 */

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Shield, Database, Lock, UserCheck, Mail, ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface PrivacyItem {
    readonly icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>
    readonly color: string
    readonly title: string
    readonly description: string
    readonly details: readonly string[]
}

const PRIVACY_ITEMS: readonly PrivacyItem[] = [
    {
        icon: Database,
        color: '#1e6fdc',
        title: 'Área inicial de privacidade',
        description: 'Coletamos apenas os dados necessários para prestar nossos serviços com qualidade.',
        details: [
            'Nós, da HFerraz, possuímos um compromisso com a Privacidade e Proteção de Dados! Por conta disso, estamos comprometidos em agir de forma ética e legal, seguindo as melhores diretrizes de Segurança da Informação e respeito à Lei Geral de Proteção de Dados Pessoais (LGPD).',
            ' Nossa prioridade é garantir que todos os clientes, parceiros e terceiros que se relacionarem com a No Code Startup estejam seguros.',
            ' Para isso, possuímos diversas Políticas de Compliance e Privacidade de Dados, assim como investimos na capacitação de nossos colaboradores, buscando criar uma estrutura organizacional de alta qualidade e eficiência.',
            'Queremos oferecer a você o melhor serviço possível, ao mesmo tempo em que protegemos seus dados pessoais de maneira responsável. Entendemos que a Privacidade é um assunto fundamental, e levamos isso a sério.',
            'Queremos que você se sinta seguro e confiante ao interagir conosco, sabendo que seus dados estão protegidos e que estamos comprometidos em manter uma relação de confiança mútua.Estamos aqui para cuidar dos seus dados pessoais da melhor maneira possível.'
        ],
    },
    {
        icon: UserCheck,
        color: '#3d8ef0',
        title: 'Como usamos',
        description: 'De quem são os dados pessoais que possuimos?',
        details: [
            'Possuímos informações pessoais de dois principais titulares de dados: Clientes (lembrando que, se tratando de Pessoa Jurídica, estamos nos referindo aos dados pessoais do representante legal) e dos nossos Colaboradores. ',
            'Enviar informações sobre nossos serviços mediante consentimento',
            'Melhorar a experiência de navegação no site',
            'Cumprir obrigações legais e regulatórias',
        ],
    },
    {
        icon: Lock,
        color: '#2a7fff',
        title: 'Como protegemos',
        description: 'Adotamos medidas técnicas e organizacionais para garantir a segurança das suas informações.',
        details: [
            'Transmissão de dados via HTTPS com criptografia TLS',
            'Acesso restrito apenas a colaboradores autorizados',
            'Sem compartilhamento com terceiros para fins comerciais',
            'Exclusão dos dados mediante solicitação do titular',
        ],
    },
    {
        icon: Mail,
        color: '#1e6fdc',
        title: 'Seus direitos (LGPD)',
        description: 'Por que a HFerraz utiliza dados pessoais?',
        details: [
            'Precisamos dos dados pessoais dos clientes e dos nossos parceiros para consolidar nossa relação, formalizar contratos e enviar artigos de publicidade e propaganda aos que desejarem, assim como para responder e manter contato com quem nos procura no website ou redes sociais.',
            'Por conta disso, trabalhamos dia e noite para oferecer a você o melhor produto e a melhor experiência de serviço, para garantir uma satisfação completa.',
            'Quando falamos em proteção à privacidade, isso envolve comprometimento com a segurança de seus dados e respeito à sua privacidade, mas também um compromisso nosso de você estar no controle de suas informações pessoais.'
        ],
    },
] as const

interface PrivacyCardProps {
    readonly item: PrivacyItem
    readonly index: number
}

/**
 * Card expansível de item da política de privacidade.
 *
 * @param props.item - Dados do item de privacidade
 * @param props.index - Índice para delay de entrada escalonado
 */
function PrivacyCard({ item, index }: PrivacyCardProps): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : index * 0.1,
            }}
        >
            <Card className="bg-[#0a1628] border-[#1a3050]/60 hover:border-[#1e6fdc]/30 transition-all duration-200">
                <CardContent className="p-6">
                    {/* Cabeçalho do card */}
                    <div className="flex items-start gap-4 mb-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                                background: `${item.color}15`,
                                border: `1px solid ${item.color}30`,
                            }}
                        >
                            <item.icon size={18} aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-display font-semibold text-[#e8f0f8] mb-1">
                                {item.title}
                            </h3>
                            <p className="text-[#8aa0b8] text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Botão de expandir */}
                    <button
                        type="button"
                        onClick={() => setExpanded((prev) => !prev)}
                        className="flex items-center gap-1.5 font-mono text-xs text-[#3d8ef0] hover:text-[#1e6fdc] transition-colors cursor-pointer mt-1"
                        aria-expanded={expanded}
                        aria-controls={`privacy-details-${index}`}
                    >
                        <ChevronDown
                            size={14}
                            aria-hidden="true"
                            style={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease',
                            }}
                        />
                        {expanded ? 'Ver menos' : 'Ver detalhes'}
                    </button>

                    {/* Detalhes expansíveis */}
                    {expanded && (
                        <motion.ul
                            id={`privacy-details-${index}`}
                            initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="mt-4 flex flex-col gap-2 pl-14"
                            role="list"
                        >
                            {item.details.map((detail) => (
                                <li
                                    key={detail}
                                    className="flex items-start gap-2 text-[#8aa0b8] text-sm"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                        style={{ background: item.color }}
                                        aria-hidden="true"
                                    />
                                    {detail}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

/**
 * Seção de política de privacidade com cards temáticos expansíveis.
 */
export default function Privacy(): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            id="privacy"
            className="relative py-24 lg:py-32 bg-[#050c1a]"
            aria-labelledby="privacy-title"
        >
            <div className="accent-line mb-0" aria-hidden="true" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,111,220,0.04) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                {/* Cabeçalho */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs font-medium text-[#3d8ef0] tracking-widest uppercase mb-3 block">
                        Privacidade
                    </span>
                    <h2
                        id="privacy-title"
                        className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4"
                    >
                        Seus dados em{' '}
                        <span className="text-gradient">boas mãos</span>
                    </h2>
                    <p className="text-[#8aa0b8] text-lg max-w-2xl mx-auto">
                        Levamos a privacidade a sério. Veja de forma transparente como coletamos,
                        usamos e protegemos suas informações em conformidade com a LGPD.
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                {/* Grid de cards */}
                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    {PRIVACY_ITEMS.map((item, i) => (
                        <PrivacyCard key={item.title} item={item} index={i} />
                    ))}
                </div>

                {/* Rodapé da seção */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                    className="mt-12 flex items-center justify-center gap-3 text-[#8aa0b8] text-sm"
                >
                    <Shield size={16} aria-hidden="true" className="text-[#1e6fdc] flex-shrink-0" />
                    <span>
                        Dúvidas sobre privacidade?{' '}
                        <a
                            href="#contact"
                            className="text-[#3d8ef0] hover:text-[#1e6fdc] underline underline-offset-2 transition-colors"
                        >
                            Entre em contato
                        </a>
                        {' '}— responderemos em até 24 horas.
                    </span>
                </motion.div>
            </div>

            {/* <div className="accent-line mt-16" aria-hidden="true" /> */}
        </section>
    )
}
