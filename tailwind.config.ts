import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#050c1a',
                surface: '#0a1628',
                'surface-alt': '#0f1f35',
                border: '#1a3050',
                primary: {
                    DEFAULT: '#1e6fdc',
                    light: '#3d8ef0',
                },
                accent: '#2a7fff',
                muted: '#8aa0b8',
                foreground: {
                    DEFAULT: '#e8f0f8',
                    muted: '#c0d0e0',
                },
                silver: {
                    DEFAULT: '#8b9cb5',
                    light: '#b0bfd4',
                },
            },
            fontFamily: {
                display: ['var(--font-syne)', 'sans-serif'],
                body: ['var(--font-dm-sans)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
                sans: ['var(--font-dm-sans)', 'sans-serif'],
            },
            maxWidth: {
                site: '1440px',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}

export default config
