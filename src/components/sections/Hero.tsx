'use client'

import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, MessageSquare, Code2, BrainCircuit } from 'lucide-react'

const floatingChips = [
    { icon: Code2, label: '{ } API Sync', delay: 0 },
    { icon: Zap, label: 'N8N Trigger', delay: 0.3 },
    { icon: MessageSquare, label: 'WhatsApp Bot', delay: 0.6 },
    { icon: BrainCircuit, label: 'Agente de IA', delay: 0.9 },
]

const automationNodes = [
    { label: 'CRM Input', color: '#1e6fdc', x: '10%', y: '20%' },
    { label: 'N8N Flow', color: '#2a7fff', x: '45%', y: '10%' },
    { label: 'WhatsApp', color: '#25d366', x: '80%', y: '25%' },
    { label: 'Agente IA', color: '#22d3ee', x: '20%', y: '65%' },
    { label: 'API Layer', color: '#3d8ef0', x: '60%', y: '60%' },
    { label: 'Dashboard', color: '#1e6fdc', x: '85%', y: '70%' },
]

export default function Hero() {
    const shouldReduceMotion = useReducedMotion()

    const fadeUp = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
        }

    const handleScroll = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-16"
            aria-label="Seção principal"
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 bg-grid opacity-60"
                aria-hidden="true"
            />

            {/* Radial glow top-right */}
            <div
                className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(30,111,220,0.12) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            {/* Radial glow bottom-left */}
            <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(42,127,255,0.07) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — copy */}
                    <div className="flex flex-col gap-6">
                        {/* Badge */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="inline-flex"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e6fdc]/30 bg-[#1e6fdc]/08 font-mono text-xs font-medium text-[#3d8ef0]">
                                <Zap size={12} className="text-[#2a7fff]" aria-hidden="true" />
                                Technological Mastery
                            </span>
                        </motion.div>

                        {/* H1 */}
                        <motion.h1
                            {...fadeUp}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.1 }}
                            className="section-title text-4xl sm:text-5xl lg:text-6xl"
                        >
                            Especialistas em{' '}
                            <span className="text-gradient">Automação</span>{' '}
                            de Processos
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.2 }}
                            className="text-[#c0d0e0] text-lg leading-relaxed max-w-xl"
                        >
                            Reduza custos, acelere operações e escale o atendimento com{' '}
                            <span className="text-[#e8f0f8] font-medium">automação</span>,{' '}
                            <span className="text-[#e8f0f8] font-medium">WhatsApp</span> e{' '}
                            <span className="text-[#e8f0f8] font-medium">inteligência artificial</span>{' '}
                            sob medida para o seu negócio.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => handleScroll('#contact')}
                                className="btn-glow inline-flex items-center gap-2 px-6 py-3 text-base"
                                aria-label="Solicitar orçamento gratuito"
                            >
                                Solicitar Orçamento
                                <ArrowRight size={16} aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => handleScroll('#services')}
                                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-base"
                                aria-label="Explorar soluções"
                            >
                                Explorar Soluções
                                <ChevronDown size={16} aria-hidden="true" />
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.4 }}
                            className="flex flex-wrap gap-6 pt-2"
                        >
                            {[
                                { value: '95%', label: 'Redução manual' },
                                { value: '3x', label: 'Mais velocidade' },
                                { value: '24/7', label: 'Operação' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="font-display text-2xl font-bold text-gradient">{stat.value}</span>
                                    <span className="text-xs text-[#8aa0b8] font-mono">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — automation diagram card */}
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main card */}
                        <div className="glass-card p-6 relative overflow-hidden" style={{ minHeight: 380 }}>
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                </div>
                                <span className="font-mono text-xs text-[#8aa0b8]">automation-flow.n8n</span>
                            </div>

                            {/* Diagram area */}
                            <div className="relative" style={{ height: 280 }}>
                                {/* SVG connections */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#1e6fdc" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#2a7fff" stopOpacity="0.2" />
                                        </linearGradient>
                                    </defs>
                                    {/* Lines between nodes */}
                                    <line x1="15%" y1="25%" x2="45%" y2="15%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="45%" y1="15%" x2="80%" y2="30%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="15%" y1="25%" x2="20%" y2="68%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="45%" y1="15%" x2="60%" y2="63%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="60%" y1="63%" x2="85%" y2="73%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="20%" y1="68%" x2="60%" y2="63%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                </svg>

                                {/* Nodes */}
                                {automationNodes.map((node) => (
                                    <div
                                        key={node.label}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ left: node.x, top: node.y }}
                                    >
                                        <div
                                            className="px-3 py-1.5 rounded-lg font-mono text-xs font-medium border"
                                            style={{
                                                background: `${node.color}15`,
                                                borderColor: `${node.color}40`,
                                                color: node.color,
                                                boxShadow: `0 0 10px ${node.color}20`,
                                            }}
                                        >
                                            {node.label}
                                        </div>
                                    </div>
                                ))}

                                {/* Pulse dot */}
                                <motion.div
                                    animate={shouldReduceMotion ? {} : {
                                        scale: [1, 1.4, 1],
                                        opacity: [0.8, 0.3, 0.8],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute w-3 h-3 rounded-full bg-[#2a7fff]"
                                    style={{ left: '44%', top: '13%' }}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Status bar */}
                            <div className="flex items-center justify-between pt-3 border-t border-[#1a3050]/60">
                                <span className="font-mono text-xs text-[#8aa0b8]">Status:</span>
                                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                                    Running — 6 nodes active
                                </span>
                            </div>
                        </div>

                        {/* Floating chips */}
                        {floatingChips.map((chip, i) => (
                            <motion.div
                                key={chip.label}
                                animate={shouldReduceMotion ? {} : {
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: chip.delay,
                                }}
                                className={`absolute glass-card px-3 py-2 flex items-center gap-2 ${i === 0
                                        ? '-top-4 -left-6'
                                        : i === 1
                                            ? '-bottom-4 left-8'
                                            : i === 2
                                                ? '-top-2 -right-6'
                                                : 'bottom-8 -right-8'
                                    }`}
                                aria-hidden="true"
                            >
                                <chip.icon size={13} className="text-[#3d8ef0]" />
                                <span className="font-mono text-xs text-[#c0d0e0] whitespace-nowrap">{chip.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => handleScroll('#services')}
                aria-label="Rolar para serviços"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleScroll('#services')}
            >
                <span className="font-mono text-xs text-[#8aa0b8]">scroll</span>
                <ChevronDown size={16} className="text-[#8aa0b8]" aria-hidden="true" />
            </motion.div>
        </section>
    )
}
