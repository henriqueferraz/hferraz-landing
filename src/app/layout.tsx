import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({
    subsets: ['latin'],
    variable: '--font-syne',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
})

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    weight: ['400', '500', '700'],
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    weight: ['400', '500', '600'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'HFerraz Automação | Especialistas em Automação de Processos',
    description:
        'Especialistas em automação com N8N, APIs para WhatsApp e sistemas web com Next.js e Python. Soluções sob medida para otimizar seu negócio.',
    keywords: [
        'automação',
        'N8N',
        'WhatsApp API',
        'Next.js',
        'Python',
        'RPA',
        'integração de sistemas',
        'automação de processos',
    ],
    openGraph: {
        title: 'HFerraz Automação',
        description: 'Tecnologia que trabalha por você.',
        type: 'website',
        locale: 'pt_BR',
        siteName: 'HFerraz Automação',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HFerraz Automação',
        description: 'Especialistas em automação de processos com N8N, WhatsApp API e Next.js.',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="pt-BR"
            className={cn(syne.variable, dmSans.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
        >
            <body suppressHydrationWarning>{children}</body>
        </html>
    )
}
