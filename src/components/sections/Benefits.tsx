'use client'

/**
 * Seção de benefícios da landing page HFerraz Automação.
 *
 * Exibe lista de diferenciais à esquerda e métricas animadas (count-up)
 * à direita. As métricas iniciam a animação ao entrar na viewport.
 *
 * @module components/sections/Benefits
 */

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import type { Metric } from '@/types'

interface Benefit {
    readonly title: string
    readonly description: string
}

const BENEFITS: readonly Benefit[] = [
    {
        title: 'Mais Produtividade',
        description: 'Automatize tarefas repetitivas e foque no que realmente importa para o seu negócio.',
    },
    {
        title: 'Economia de Tempo',
        description: 'Processos mais rápidos e eficientes que liberam sua equipe para atividades estratégicas.',
    },
    {
        title: 'Soluções Personalizadas',
        description: 'Desenvolvidas especificamente para o seu negócio, não soluções genéricas de prateleira.',
    },
    {
        title: 'IA que Gera Resultado',
        description: 'Assistentes inteligentes que atendem, vendem e resolvem demandas — liberando sua equipe para o que realmente gera lucro.',
    },
] as const

const METRICS: readonly Metric[] = [
    { value: 95, suffix: '%', label: 'Redução de tarefas manuais' },
    { value: 3, suffix: 'x', label: 'Mais velocidade nos processos' },
    { value: 24, suffix: '/7', label: 'Operação contínua' },
    { value: 100, suffix: '%', label: 'Soluções sob medida' },
] as const

// ─── Sub-componentes ──────────────────────────────────────────────────────────

interface MetricCardProps {
    readonly metric: Metric
    readonly active: boolean
    readonly index: number
}

/**
 * Card de métrica com animação count-up.
 *
 * @param props.metric - Dados da métrica
 * @param props.active - Controla se a animação deve iniciar
 * @param props.index - Índice para delay de entrada escalonado
 */
function MetricCard({ metric, active, index }: MetricCardProps): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()
    const count = useCountUp(metric.value, active)

    return (
        <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: shouldReduceMotion ? 0 : index * 0.1 }}
            className="metric-card"
        >
            <div className="font-display text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {count}{metric.suffix}
            </div>
            <p className="font-mono text-xs text-[#8aa0b8] leading-snug">
                {metric.label}
            </p>
        </motion.div>
    )
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * Seção de benefícios com lista de diferenciais e métricas animadas.
 */
export default function Benefits(): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()
    const [metricsRef, metricsVisible] = useInViewOnce<HTMLDivElement>(0.3)

    return (
        <section
            id="benefits"
            className="relative py-24 lg:py-32 bg-[#070d1a]"
            aria-labelledby="benefits-title"
        >
            <div className="accent-line mb-0" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Coluna esquerda — lista de benefícios */}
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <span className="font-mono text-xs font-medium text-[#3d8ef0] tracking-widest uppercase mb-3 block">
                            Diferenciais
                        </span>
                        <h2
                            id="benefits-title"
                            className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4"
                        >
                            Por que escolher a{' '}
                            <span className="text-gradient">HFerraz?</span>
                        </h2>
                        <p className="text-[#8aa0b8] text-lg mb-10">
                            Combinamos expertise técnica com foco total no resultado do seu negócio.
                        </p>

                        <ul className="flex flex-col gap-5" role="list">
                            {BENEFITS.map((benefit, i) => (
                                <motion.li
                                    key={benefit.title}
                                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeOut',
                                        delay: shouldReduceMotion ? 0 : i * 0.1,
                                    }}
                                    className="flex gap-4"
                                >
                                    <CheckCircle2
                                        size={22}
                                        className="text-[#1e6fdc] flex-shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <span className="font-display font-semibold text-[#e8f0f8] block mb-1">
                                            {benefit.title}
                                        </span>
                                        <span className="text-[#8aa0b8] text-sm leading-relaxed">
                                            {benefit.description}
                                        </span>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Coluna direita — métricas */}
                    <motion.div
                        ref={metricsRef}
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {METRICS.map((metric, i) => (
                            <MetricCard
                                key={metric.label}
                                metric={metric}
                                active={metricsVisible}
                                index={i}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="accent-line mt-16" aria-hidden="true" />
        </section>
    )
}
