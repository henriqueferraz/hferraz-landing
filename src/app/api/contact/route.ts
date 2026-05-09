/**
 * API Route — POST /api/contact
 *
 * Recebe os dados do formulário de contato, valida com Zod
 * e envia o e-mail de notificação via Resend.
 *
 * Variáveis de ambiente necessárias (ver .env.example):
 * - RESEND_API_KEY
 * - CONTACT_EMAIL
 * - CONTACT_FROM
 *
 * @module app/api/contact/route
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { buildContactEmailHtml, buildContactEmailText } from '@/lib/email-template'
import { ValidationError, ConfigurationError, NetworkError } from '@/lib/errors'
import type { ApiResult } from '@/lib/errors'

// ─── Validação ────────────────────────────────────────────────────────────────

const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(200),
    whatsapp: z.string().min(10).max(20),
    company: z.string().min(2).max(100),
    message: z.string().min(20).max(2000),
    consent: z.literal(true),
})

// ─── Handler ──────────────────────────────────────────────────────────────────

/**
 * Processa o envio do formulário de contato.
 *
 * @returns 200 com `{ success: true }` em caso de sucesso
 * @returns 400 com detalhes de validação em caso de dados inválidos
 * @returns 500 em caso de erro de configuração ou falha no envio
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResult<null>>> {
    // 1. Validar variáveis de ambiente
    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL
    const contactFrom = process.env.CONTACT_FROM

    if (!apiKey || apiKey.startsWith('re_xxx')) {
        console.error('[contact/route] RESEND_API_KEY não configurada')
        throw new ConfigurationError('RESEND_API_KEY não configurada')
    }

    if (!contactEmail) {
        console.error('[contact/route] CONTACT_EMAIL não configurada')
        throw new ConfigurationError('CONTACT_EMAIL não configurada')
    }

    // 2. Parsear e validar o body
    let body: unknown

    try {
        body = await request.json()
    } catch {
        return NextResponse.json(
            { success: false, error: 'Body inválido — esperado JSON', code: 400 },
            { status: 400 }
        )
    }

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
        const firstError = parsed.error.errors[0]
        throw new ValidationError(firstError?.message ?? 'Dados inválidos', firstError?.path[0]?.toString())
    }

    const data = parsed.data

    // 3. Enviar e-mail via Resend
    const resend = new Resend(apiKey)

    const from = contactFrom ?? 'HFerraz Automação <onboarding@resend.dev>'
    const subject = `[HFerraz] Novo contato de ${data.name} — ${data.company}`

    const { error } = await resend.emails.send({
        from,
        to: [contactEmail],
        replyTo: data.email,
        subject,
        html: buildContactEmailHtml(data),
        text: buildContactEmailText(data),
    })

    if (error) {
        console.error('[contact/route] Resend error:', error)
        throw new NetworkError(`Falha ao enviar e-mail: ${error.message}`, 502)
    }

    console.info(`[contact/route] E-mail enviado para ${contactEmail} — remetente: ${data.email}`)

    return NextResponse.json({ success: true, data: null }, { status: 200 })
}

// ─── Método não permitido ─────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse<ApiResult<null>>> {
    return NextResponse.json(
        { success: false, error: 'Método não permitido', code: 405 },
        { status: 405 }
    )
}
