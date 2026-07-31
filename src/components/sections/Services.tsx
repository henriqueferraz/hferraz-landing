'use client'

/**
 * Seção de serviços da landing page HFerraz Automação.
 *
 * Usa shadcn/ui `Card` e `Badge` para estruturar os cards de serviço.
 * Animações de entrada com Framer Motion respeitam `prefers-reduced-motion`.
 *
 * @module components/sections/Services
 */

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Workflow, MessageSquare, Monitor, BrainCircuit, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/utils'
import type { Service } from '@/types'

const SERVICES: readonly Service[] = [
    {
        icon: Workflow,
        title: 'Automação com N8N',
        description:
            'Orquestração de fluxos complexos. Conectamos sistemas legados e modernos sem atrito. Redução drástica de trabalho manual repetitivo.',
        tags: ['N8N', 'Workflow', 'Integração'],
        color: '#1e6fdc',
    },
    {
        icon: MessageSquare,
        title: 'APIs para WhatsApp',
        description:
            'Integrações conversacionais avançadas. Automação de atendimento, notificações transacionais e fluxos de vendas operando 24/7.',
        tags: ['WhatsApp API', 'Chatbot', '24/7'],
        color: '#25d366',
    },
    {
        icon: Monitor,
        title: 'Sistemas Web',
        description:
            'Desenvolvimento de painéis administrativos, dashboards de BI e aplicações customizadas com stack Next.js + Python.',
        tags: ['Next.js', 'Python', 'Dashboard'],
        color: '#3d8ef0',
    },
    {
        icon: BrainCircuit,
        title: 'Inteligência Artificial',
        description:
            'Agentes de IA que atendem clientes, qualificam leads e executam tarefas sozinhos. Menos custo operacional, mais escala — sua empresa trabalha 24 horas sem aumentar o time.',
        tags: ['Agentes de IA', 'Atendimento', 'Produtividade'],
        color: '#22d3ee',
    },
] as const

/**
 * Seção de serviços com cards animados usando shadcn/ui Card e Badge.
 */
export default function Services(): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
        },
    }

    const cardVariants: Variants = shouldReduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        }

    return (
        <section id="services" className="relative py-24 lg:py-32" aria-labelledby="services-title">
            {/* Glow de fundo */}
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(30,111,220,0.06) 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs font-medium text-[#3d8ef0] tracking-widest uppercase mb-3 block">
                        O que fazemos
                    </span>
                    <h2 id="services-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        Soluções de Engenharia
                    </h2>
                    <p className="text-[#8aa0b8] text-lg max-w-xl mx-auto">
                        Arquiteturas projetadas para estabilidade e escala.
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                {/* Grid de cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {SERVICES.map((service) => (
                        <motion.div key={service.title} variants={cardVariants}>
                            <Card
                                className="h-full bg-[#0a1628] border-[#1a3050]/60 hover:border-[#1e6fdc]/40 transition-all duration-300 hover:-translate-y-1 group cursor-default"
                                style={{
                                    ['--service-color' as string]: service.color,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 30px ${service.color}20, 0 8px 32px rgba(0,0,0,0.3)`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = ''
                                }}
                            >
                                <CardHeader className="pb-3">
                                    {/* Ícone */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: `${service.color}15`,
                                            border: `1px solid ${service.color}30`,
                                            boxShadow: `0 0 16px ${service.color}20`,
                                        }}
                                    >
                                        <service.icon size={22} style={{ color: service.color }} aria-hidden="true" />
                                    </div>

                                    <h3 className="font-display text-xl font-semibold text-[#e8f0f8]">
                                        {service.title}
                                    </h3>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-4">
                                    <p className="text-[#8aa0b8] text-sm leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Tags usando shadcn Badge */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="font-mono text-xs border-[#1a3050] text-[#8aa0b8] bg-transparent hover:bg-[#1a3050]/40"
                                                style={{
                                                    borderColor: `${service.color}25`,
                                                    color: service.color,
                                                    background: `${service.color}10`,
                                                }}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-fit p-0 h-auto font-medium hover:bg-transparent cursor-pointer group/btn"
                                        style={{ color: service.color }}
                                        onClick={() => scrollToSection('#contact')}
                                        aria-label={`Saiba mais sobre ${service.title}`}
                                    >
                                        Saiba mais
                                        <ArrowRight
                                            size={14}
                                            className="ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
