# HFerraz Automação — Landing Page

Landing page institucional da **HFerraz Automação**, empresa especializada em automação de processos com N8N, APIs para WhatsApp e sistemas web com Next.js e Python.

---

## Stack

| Tecnologia                                     | Versão | Função                            |
| ---------------------------------------------- | ------ | --------------------------------- |
| [Next.js](https://nextjs.org)                  | 16.2.6 | Framework React com App Router    |
| [React](https://react.dev)                     | 19     | UI Library                        |
| [TypeScript](https://typescriptlang.org)       | 5.x    | Linguagem (strict mode)           |
| [Tailwind CSS](https://tailwindcss.com)        | 3.x    | Estilização utilitária            |
| [shadcn/ui](https://ui.shadcn.com)             | 4.x    | Componentes acessíveis (Radix UI) |
| [Framer Motion](https://www.framer.com/motion) | 11.x   | Animações                         |
| [React Hook Form](https://react-hook-form.com) | 7.x    | Gerenciamento de formulários      |
| [Zod](https://zod.dev)                         | 3.x    | Validação de schema               |
| [Lucide React](https://lucide.dev)             | —      | Ícones SVG                        |

---

## Pré-requisitos

- **Node.js** ≥ 20
- **npm** ≥ 10

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/henriqueferraz/hferraz-landing.git
cd hferraz-landing

# Instale as dependências
npm install
```

---

## Comandos

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Servidor de produção (após build)
npm start

# Lint
npm run lint

# Release (interativo — gera CHANGELOG e tag SemVer)
npm run release

# Release dry-run (preview sem publicar)
npm run release:dry
```

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fontes, metadata, suppressHydrationWarning
│   ├── page.tsx            # Composição das seções (sem lógica)
│   └── globals.css         # Tokens CSS + classes utilitárias
│
├── brand/                  # ← Fonte única de verdade da identidade visual
│   ├── tokens.ts           # Cores, tipografia, espaçamento, animação
│   ├── logos.ts            # Assets de logo, links e metadados da marca
│   └── index.ts            # Re-export público
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navegação sticky com Sheet mobile (shadcn)
│   │   └── Footer.tsx      # Rodapé com links e redes sociais
│   ├── sections/
│   │   ├── Hero.tsx        # Seção principal com diagrama animado
│   │   ├── Services.tsx    # Cards de serviço (shadcn Card + Badge)
│   │   ├── Benefits.tsx    # Benefícios + métricas count-up
│   │   ├── HowItWorks.tsx  # Timeline de 4 etapas
│   │   ├── Technologies.tsx# Grid de tecnologias com SVG icons
│   │   ├── Testimonials.tsx# Depoimentos de clientes
│   │   ├── Contact.tsx     # Formulário validado (shadcn Input/Checkbox)
│   │   └── Privacy.tsx     # Política de privacidade resumida (LGPD)
│   └── ui/                 # Componentes shadcn/ui (não editar manualmente)
│
├── hooks/
│   ├── useNavbarScroll.ts  # Detecta scroll > 20px para estilo da navbar
│   ├── useCountUp.ts       # Animação numérica com Framer Motion
│   └── useInViewOnce.ts    # IntersectionObserver — dispara uma vez
│
├── lib/
│   ├── utils.ts            # cn(), scrollToSection(), formatPercent()
│   └── errors.ts           # Classes de erro customizadas (AppError, ValidationError...)
│
└── types/
    └── index.ts            # Interfaces e tipos compartilhados
```

---

## Módulo de Marca (`src/brand/`)

Todos os valores visuais da marca ficam isolados em `src/brand/`. Para atualizar a identidade visual, edite apenas este módulo — os componentes consomem os tokens via import e não precisam ser alterados.

```ts
import { colors, logos, brandMeta, spacing } from '@/brand'
```

**Tokens disponíveis:** `colors`, `typography`, `spacing`, `radii`, `animation`, `logos`, `brandLinks`, `brandMeta`

---

## Convenções de Código

Este projeto segue as regras definidas em `.kiro/steering/project-rules.md`:

- **Arquitetura:** Monolito Modular — fronteiras internas bem definidas
- **Clean Code:** Nomes descritivos, funções com responsabilidade única
- **SOLID:** SRP e DIP aplicados em componentes e hooks
- **Type Safety:** `any` proibido, TypeScript strict, retornos explícitos
- **Error Handling:** Classes customizadas em `src/lib/errors.ts`
- **Documentação:** JSDoc em todo código exportado publicamente

---

## Git

### Branches

```
main        ← produção, protegida
develop     ← integração
feat/*      ← novas funcionalidades
fix/*       ← correções
refactor/*  ← refatorações
docs/*      ← documentação
release/*   ← preparação de release
```

### Commits — Conventional Commits

```bash
feat(hero): add floating animation to automation diagram
fix(navbar): resolve hydration mismatch on body element
refactor(brand): extract spacing tokens to dedicated object
docs(readme): add project structure section
build(deps): bump framer-motion to 11.15.0
```

Tipos: `feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

---

## Versionamento

O projeto usa **SemVer** (`MAJOR.MINOR.PATCH`) gerenciado pelo [release-it](https://github.com/release-it/release-it) com geração automática de `CHANGELOG.md`.

```bash
# Patch — correção de bug
npm run release -- --patch

# Minor — nova funcionalidade
npm run release -- --minor

# Major — breaking change
npm run release -- --major
```

O comando atualiza `package.json`, gera o `CHANGELOG.md`, cria o commit `chore(release): vX.Y.Z` e a tag git correspondente.

---

## Acessibilidade

- Contraste WCAG AA no dark theme
- `aria-label` em todos os elementos interativos sem texto visível
- `prefers-reduced-motion` respeitado em todas as animações
- Navegação por teclado com foco visível
- Formulário com `aria-invalid`, `aria-describedby` e `role="alert"` nos erros
- `suppressHydrationWarning` no `<body>` para extensões de browser

---

## Licença

Projeto privado — © 2024 HFerraz Automação. Todos os direitos reservados.
