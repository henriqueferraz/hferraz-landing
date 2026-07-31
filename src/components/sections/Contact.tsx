'use client'

/**
 * Seção de contato da landing page HFerraz Automação.
 *
 * Usa shadcn/ui: `Input`, `Textarea`, `Label`, `Checkbox`, `Card`, `Button`.
 * Validação com React Hook Form + Zod. Estado de sucesso após envio.
 *
 * @module components/sections/Contact
 */

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, MessageSquare, MapPin, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { brandLinks } from '@/brand'
import type { ContactFormData } from '@/types'

/** SVG oficial do Instagram — Lucide não inclui este ícone */
function InstagramIcon({ size = 18, style }: { size?: number; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }): React.ReactElement {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width={size}
            height={size}
            style={style}
            aria-hidden="true"
        >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    )
}

/**
 * Define o schema Zod para validação do formulário de contato.
 * Todos os campos são obrigatórios.
 */

const contactSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    whatsapp: z.string().min(10, 'WhatsApp inválido').max(20),
    company: z.string().min(2, 'Nome da empresa obrigatório'),
    message: z.string().min(20, 'Descreva seu processo com pelo menos 20 caracteres'),
    consent: z.boolean().refine((v) => v === true, 'Você precisa aceitar para continuar'),
})

interface ContactInfo {
    readonly icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }>
    readonly label: string
    readonly value: string
    readonly href: string | null
    readonly color: string
}

const CONTACT_INFO: readonly ContactInfo[] = [
    {
        icon: MessageSquare,
        label: 'WhatsApp',
        value: 'Fale conosco agora',
        href: brandLinks.whatsapp,
        color: '#25d366',
    },
    {
        icon: InstagramIcon,
        label: 'Instagram',
        value: '@hferrazautomacao',
        href: brandLinks.instagram,
        color: '#e1306c',
    },
    {
        icon: MapPin,
        label: 'Localização',
        value: brandLinks.location,
        href: null,
        color: '#3d8ef0',
    },
] as const

/**
 * Seção de contato com formulário validado e cards de informação.
 */
export default function Contact(): React.ReactElement {
    const shouldReduceMotion = useReducedMotion()
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { consent: false },
    })

    const consentValue = watch('consent')

    const onSubmit = async (data: ContactFormData): Promise<void> => {
        setSubmitError(null)

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const result = await response.json().catch(() => null) as { error?: string } | null
            const message = result?.error ?? 'Erro ao enviar mensagem. Tente novamente.'
            setSubmitError(message)
            return
        }

        setSubmitted(true)
        reset()
    }

    return (
        <section
            id="contact"
            className="relative py-24 lg:py-32 bg-[#070d1a]"
            aria-labelledby="contact-title"
        >
            <div className="accent-line mb-0" aria-hidden="true" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,111,220,0.06) 0%, transparent 70%)' }}
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
                        Contato
                    </span>
                    <h2 id="contact-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        Vamos Conversar?
                    </h2>
                    <p className="text-[#8aa0b8] text-lg max-w-xl mx-auto">
                        Solicite um orçamento gratuito e descubra como podemos transformar seus processos.
                    </p>
                    <div className="accent-line mt-8 max-w-xs mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Formulário — 3 colunas */}
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="lg:col-span-3"
                    >
                        {submitted ? (
                            <Card className="bg-[#0a1628] border-[#1a3050]/60 min-h-[400px] flex items-center justify-center">
                                <CardContent className="flex flex-col items-center text-center gap-4 py-12">
                                    <CheckCircle2 size={48} className="text-[#1e6fdc]" aria-hidden="true" />
                                    <h3 className="font-display text-2xl font-semibold text-[#e8f0f8]">
                                        Mensagem enviada!
                                    </h3>
                                    <p className="text-[#8aa0b8]">
                                        Recebemos seu contato. Nossa equipe retornará em até 24 horas.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-2 border-[#1a3050] text-[#c0d0e0] hover:bg-[#1a3050]/40 cursor-pointer"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Enviar outra mensagem
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-[#0a1628] border-[#1a3050]/60">
                                <CardContent className="p-6 lg:p-8">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="flex flex-col gap-5"
                                        noValidate
                                        aria-label="Formulário de contato"
                                    >
                                        {/* Nome + Email */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="name" className="font-mono text-xs text-[#8aa0b8]">
                                                    Nome Completo *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="João Silva"
                                                    className="bg-[#050c1a] border-[#1a3050] text-[#e8f0f8] placeholder:text-[#8aa0b8] focus:border-[#1e6fdc] focus:ring-[#1e6fdc]/20"
                                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                                    aria-invalid={!!errors.name}
                                                    {...register('name')}
                                                />
                                                {errors.name && (
                                                    <span id="name-error" className="text-red-400 text-xs" role="alert">
                                                        {errors.name.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="email" className="font-mono text-xs text-[#8aa0b8]">
                                                    E-mail Empresarial *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="joao@empresa.com"
                                                    className="bg-[#050c1a] border-[#1a3050] text-[#e8f0f8] placeholder:text-[#8aa0b8] focus:border-[#1e6fdc] focus:ring-[#1e6fdc]/20"
                                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                                    aria-invalid={!!errors.email}
                                                    {...register('email')}
                                                />
                                                {errors.email && (
                                                    <span id="email-error" className="text-red-400 text-xs" role="alert">
                                                        {errors.email.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* WhatsApp + Empresa */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="whatsapp" className="font-mono text-xs text-[#8aa0b8]">
                                                    WhatsApp *
                                                </Label>
                                                <Input
                                                    id="whatsapp"
                                                    type="tel"
                                                    autoComplete="tel"
                                                    placeholder="+55 11 99999-9999"
                                                    className="bg-[#050c1a] border-[#1a3050] text-[#e8f0f8] placeholder:text-[#8aa0b8] focus:border-[#1e6fdc] focus:ring-[#1e6fdc]/20"
                                                    aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
                                                    aria-invalid={!!errors.whatsapp}
                                                    {...register('whatsapp')}
                                                />
                                                {errors.whatsapp && (
                                                    <span id="whatsapp-error" className="text-red-400 text-xs" role="alert">
                                                        {errors.whatsapp.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="company" className="font-mono text-xs text-[#8aa0b8]">
                                                    Empresa *
                                                </Label>
                                                <Input
                                                    id="company"
                                                    type="text"
                                                    autoComplete="organization"
                                                    placeholder="Minha Empresa Ltda"
                                                    className="bg-[#050c1a] border-[#1a3050] text-[#e8f0f8] placeholder:text-[#8aa0b8] focus:border-[#1e6fdc] focus:ring-[#1e6fdc]/20"
                                                    aria-describedby={errors.company ? 'company-error' : undefined}
                                                    aria-invalid={!!errors.company}
                                                    {...register('company')}
                                                />
                                                {errors.company && (
                                                    <span id="company-error" className="text-red-400 text-xs" role="alert">
                                                        {errors.company.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mensagem */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="message" className="font-mono text-xs text-[#8aa0b8]">
                                                Descreva seu processo atual *
                                            </Label>
                                            <Textarea
                                                id="message"
                                                rows={4}
                                                placeholder="Conte o que quer melhorar: atendimento, vendas, processos internos ou um agente de IA. Quanto mais detalhes, melhor o orçamento."
                                                className="bg-[#050c1a] border-[#1a3050] text-[#e8f0f8] placeholder:text-[#8aa0b8] focus:border-[#1e6fdc] focus:ring-[#1e6fdc]/20 resize-none"
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                                aria-invalid={!!errors.message}
                                                {...register('message')}
                                            />
                                            {errors.message && (
                                                <span id="message-error" className="text-red-400 text-xs" role="alert">
                                                    {errors.message.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Consentimento com shadcn Checkbox */}
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-start gap-3">
                                                <Checkbox
                                                    id="consent"
                                                    checked={consentValue}
                                                    onCheckedChange={(checked) =>
                                                        setValue('consent', checked === true, { shouldValidate: true })
                                                    }
                                                    className="mt-0.5 border-[#1a3050] data-[state=checked]:bg-[#1e6fdc] data-[state=checked]:border-[#1e6fdc] cursor-pointer"
                                                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                                                    aria-invalid={!!errors.consent}
                                                />
                                                <Label
                                                    htmlFor="consent"
                                                    className="text-xs text-[#8aa0b8] leading-relaxed cursor-pointer hover:text-[#c0d0e0] transition-colors"
                                                >
                                                    Aceito receber contato da HFerraz Automação por e-mail e WhatsApp.
                                                </Label>
                                            </div>
                                            {errors.consent && (
                                                <span id="consent-error" className="text-red-400 text-xs ml-7" role="alert">
                                                    {errors.consent.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Erro de envio */}
                                        {submitError && (
                                            <div
                                                role="alert"
                                                className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                                            >
                                                <span className="font-mono text-xs leading-relaxed">{submitError}</span>
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                                            aria-label="Enviar mensagem"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} aria-hidden="true" />
                                                    Enviar Mensagem
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>

                    {/* Info de contato — 2 colunas */}
                    <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        <Card className="bg-[#0a1628] border-[#1a3050]/60">
                            <CardContent className="p-6">
                                <h3 className="font-display text-lg font-semibold text-[#e8f0f8] mb-2">
                                    Resposta rápida garantida
                                </h3>
                                <p className="text-[#8aa0b8] text-sm leading-relaxed">
                                    Nossa equipe responde em até 24 horas úteis. Para urgências, entre em contato
                                    diretamente pelo WhatsApp.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-3">
                            {CONTACT_INFO.map((item) => {
                                const content = (
                                    <Card className="bg-[#0a1628] border-[#1a3050]/60 hover:border-[#1e6fdc]/30 transition-all duration-200 hover:-translate-y-0.5">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: `${item.color}15`,
                                                    border: `1px solid ${item.color}30`,
                                                }}
                                            >
                                                <item.icon size={18} style={{ color: item.color }} aria-hidden="true" />
                                            </div>
                                            <div>
                                                <p className="font-mono text-xs text-[#8aa0b8]">{item.label}</p>
                                                <p className="font-display font-medium text-[#e8f0f8] text-sm group-hover:text-[#3d8ef0] transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )

                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group cursor-pointer"
                                        aria-label={`${item.label}: ${item.value}`}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.label}>{content}</div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
