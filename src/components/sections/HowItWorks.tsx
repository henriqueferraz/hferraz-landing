'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, Target, Settings, Rocket } from 'lucide-react'

const steps = [
    {
        number: '01',
        icon: ClipboardList,
        title: 'Diagnóstico',
        description: 'Analisamos seus processos atuais, identificamos gargalos e mapeamos oportunidades de automação.',
        color: '#1e6fdc',
    },
    {
        number: '02',
        icon: Target,
        title: 'Planejamento',
        description: 'Desenhamos a solução ideal com arquitetura definida, cronograma claro e métricas de sucesso.',
        color: '#2a7fff',
    },
    {
        number: '03',
        icon: Settings,
        title: 'Desenvolvimento',
        description: 'Implementamos com tecnologia de ponta, testes rigorosos e entregas incrementais validadas.',
        color: '#3d8ef0',
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Entrega',
        description: 'Deploy em produção com monitoramento ativo, documentação completa e suporte contínuo.',
        color: '#1e6fdc',
    },
]

export default function HowItWorks() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            id="how-it-works"
            className="relative py-24 lg:py-32"
            aria-labelledby="how-it-works-title"
        >
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(30,111,220,0.04) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs font-medium text-[#3d8ef0] tracking-widest uppercase mb-3 block">
                        Processo
                    </span>
                    <h2 id="how-it-works-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        Como funciona?
                    </h2>
                    <p className="text-[#8aa0b8] text-lg max-w-xl mx-auto">
                        Um processo estruturado para garantir resultados previsíveis e de alta qualidade.
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line (desktop) */}
                    <div
                        className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(30,111,220,0.3) 20%, rgba(42,127,255,0.5) 50%, rgba(30,111,220,0.3) 80%, transparent)',
                        }}
                        aria-hidden="true"
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.6,
                                    ease: 'easeOut',
                                    delay: shouldReduceMotion ? 0 : i * 0.15,
                                }}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Step number + icon */}
                                <div className="relative mb-5">
                                    {/* Outer ring */}
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center relative"
                                        style={{
                                            background: `${step.color}10`,
                                            border: `1px solid ${step.color}30`,
                                            boxShadow: `0 0 24px ${step.color}15`,
                                        }}
                                    >
                                        <step.icon size={28} style={{ color: step.color }} aria-hidden="true" />
                                    </div>

                                    {/* Number badge */}
                                    <div
                                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                                        style={{
                                            background: step.color,
                                            color: '#fff',
                                            boxShadow: `0 0 10px ${step.color}50`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </div>
                                </div>

                                <h3 className="font-display text-lg font-semibold text-[#e8f0f8] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-[#8aa0b8] text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
