import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TermosContent from '@/components/sections/Termos'

export const metadata: Metadata = {
    title: 'Termos de Uso | HFerraz Automação',
    description:
        'Leia os Termos de Uso da HFerraz Automação. Condições gerais de uso dos nossos serviços de automação e inteligência artificial.',
}

/**
 * Página de Termos de Uso da HFerraz Automação.
 *
 * Preserva o Navbar e Footer globais da landing page.
 */
export default function TermosPage(): React.ReactElement {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <TermosContent />
            </main>
            <Footer />
        </>
    )
}
