/**
 * Template HTML do e-mail de notificação de novo contato.
 *
 * Gera um e-mail responsivo com os dados do formulário de contato,
 * seguindo a identidade visual da HFerraz Automação.
 *
 * @module lib/email-template
 */

import type { ContactFormData } from '@/types'

/**
 * Gera o HTML do e-mail de notificação de novo contato.
 *
 * @param data - Dados validados do formulário de contato
 * @returns String HTML pronta para envio via Resend
 *
 * @example
 * ```ts
 * const html = buildContactEmailHtml(formData)
 * await resend.emails.send({ html, ... })
 * ```
 */
export function buildContactEmailHtml(data: ContactFormData): string {
    const { name, email, whatsapp, company, message } = data

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Novo contato — HFerraz Automação</title>
</head>
<body style="margin:0;padding:0;background-color:#050c1a;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050c1a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a1628,#0f1f35);border:1px solid #1a3050;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <div style="display:inline-block;background:linear-gradient(135deg,#1e6fdc,#2a7fff);border-radius:8px;padding:2px;">
                <div style="background:#0a1628;border-radius:6px;padding:8px 20px;">
                  <span style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#e8f0f8;letter-spacing:1px;">
                    HFerraz <span style="color:#1e6fdc;">Automação</span>
                  </span>
                </div>
              </div>
              <p style="margin:16px 0 0;font-size:13px;color:#8aa0b8;font-family:'JetBrains Mono',monospace,Arial;">
                novo-contato@landing-page
              </p>
            </td>
          </tr>

          <!-- Title bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e6fdc,#2a7fff);padding:14px 40px;">
              <h1 style="margin:0;font-size:16px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
                📬 Novo contato recebido
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0a1628;border:1px solid #1a3050;border-top:none;padding:32px 40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#c0d0e0;line-height:1.6;">
                Um novo lead preencheu o formulário de contato da landing page.
                Confira os dados abaixo:
              </p>

              <!-- Data fields -->
              ${buildField('Nome', name)}
              ${buildField('E-mail', `<a href="mailto:${email}" style="color:#3d8ef0;text-decoration:none;">${email}</a>`)}
              ${buildField('WhatsApp', `<a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color:#25d366;text-decoration:none;">${whatsapp}</a>`)}
              ${buildField('Empresa', company)}

              <!-- Message -->
              <div style="margin-top:24px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#8aa0b8;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">
                  Mensagem
                </p>
                <div style="background:#0f1f35;border:1px solid #1a3050;border-left:3px solid #1e6fdc;border-radius:0 8px 8px 0;padding:16px 20px;">
                  <p style="margin:0;font-size:14px;color:#e8f0f8;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a
                  href="https://wa.me/${whatsapp.replace(/\D/g, '')}"
                  style="display:inline-block;background:linear-gradient(135deg,#1e6fdc,#2a7fff);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:8px;"
                >
                  Responder via WhatsApp
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#070d1a;border:1px solid #1a3050;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#8aa0b8;font-family:monospace;">
                HFerraz Automação · Landing Page · ${new Date().getFullYear()}
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#1a3050;">
                Este e-mail foi gerado automaticamente. Não responda diretamente.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Gera o texto plano do e-mail (fallback para clientes sem suporte a HTML).
 *
 * @param data - Dados validados do formulário de contato
 * @returns String de texto simples
 */
export function buildContactEmailText(data: ContactFormData): string {
    const { name, email, whatsapp, company, message } = data

    return [
        'NOVO CONTATO — HFerraz Automação',
        '='.repeat(40),
        '',
        `Nome:     ${name}`,
        `E-mail:   ${email}`,
        `WhatsApp: ${whatsapp}`,
        `Empresa:  ${company}`,
        '',
        'Mensagem:',
        '-'.repeat(40),
        message,
        '-'.repeat(40),
        '',
        `Recebido em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`,
    ].join('\n')
}

// ─── Helpers internos ─────────────────────────────────────────────────────────

/**
 * Gera uma linha de campo no template HTML.
 * Uso interno — não exportado.
 */
function buildField(label: string, value: string): string {
    return `
    <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #1a3050;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#8aa0b8;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">
        ${label}
      </p>
      <p style="margin:0;font-size:15px;color:#e8f0f8;">${value}</p>
    </div>
  `
}

/**
 * Escapa caracteres HTML para evitar XSS no template de e-mail.
 * Uso interno — não exportado.
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}
