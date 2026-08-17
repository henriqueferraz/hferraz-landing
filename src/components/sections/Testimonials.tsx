'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Carlos Mendes',
        role: 'Diretor de Operações',
        company: 'SandaPlus',
        content:
            'A HFerraz transformou completamente nosso processo de atendimento. Reduzimos o tempo de resposta em 80% com a automação do WhatsApp. Resultado impressionante.',
        rating: 5,
        initials: 'CM',
        color: '#1e6fdc',
    },
    {
        name: 'Ana Paula Souza',
        role: 'CEO',
        company: 'LovaT Consultoria',
        content:
            'O sistema de automação com N8N que desenvolveram para nós integrou 12 ferramentas diferentes. Economizamos mais de 40 horas semanais de trabalho manual.',
        rating: 5,
        initials: 'AS',
        color: '#2a7fff',
    },
    {
        name: 'Roberto Lima',
        role: 'CTO',
        company: 'PyiPwol StartUp',
        content:
            'Dashboard desenvolvido em Next.js com Python no backend. Performance excepcional e código limpo. A equipe da HFerraz entrega com qualidade e no prazo.',
        rating: 5,
        initials: 'RL',
        color: '#3d8ef0',
    },
]

export default function Testimonials() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            id="testimonials"
            className="relative py-24 lg:py-32"
            aria-labelledby="testimonials-title"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,111,220,0.04) 0%, transparent 70%)',
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
                        Clientes
                    </span>
                    <h2 id="testimonials-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        O que dizem sobre nós
                    </h2>
                    <p className="text-[#8aa0b8] text-lg max-w-xl mx-auto">
                        Resultados reais de empresas que transformaram seus processos.
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((t, i) => (
                        <motion.article
                            key={t.name}
                            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                                delay: shouldReduceMotion ? 0 : i * 0.15,
                            }}
                            className="glass-card p-6 lg:p-8 flex flex-col gap-4"
                        >
                            {/* Stars */}
                            <div className="flex gap-1" aria-label={`${t.rating} estrelas`}>
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star
                                        key={j}
                                        size={14}
                                        className="fill-[#f59e0b] text-[#f59e0b]"
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-[#c0d0e0] text-sm leading-relaxed flex-1">
                                &ldquo;{t.content}&rdquo;
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-2 border-t border-[#1a3050]/60">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                                    aria-hidden="true"
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-display font-semibold text-[#e8f0f8] text-sm">{t.name}</p>
                                    <p className="font-mono text-xs text-[#8aa0b8]">
                                        {t.role} · {t.company}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
