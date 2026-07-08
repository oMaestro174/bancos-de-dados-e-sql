# Design System — Portal Acadêmico

Guia de referência visual da aplicação. Todos os valores são expostos como
**CSS Custom Properties** em `app/src/styles/design-system.css` e adaptam-se
automaticamente ao **tema claro/escuro**.

## 🎨 Paleta de cores

| Token           | Uso                          | Claro     | Escuro    |
|-----------------|------------------------------|-----------|-----------|
| `--color-primary`   | Ações principais, marca  | `#4f46e5` | `#818cf8` |
| `--color-secondary` | Destaques secundários    | `#0ea5e9` | `#38bdf8` |
| `--color-success`   | Aprovado / positivo      | `#16a34a` | `#4ade80` |
| `--color-warning`   | Recuperação / atenção    | `#d97706` | `#fbbf24` |
| `--color-error`     | Reprovado / erro         | `#dc2626` | `#f87171` |
| `--bg-body`         | Fundo da página          | `#f5f6fa` | `#0f172a` |
| `--bg-surface`      | Cartões, superfícies     | `#ffffff` | `#1e293b` |

## 🔤 Tipografia

- **Fonte principal:** Inter (fallback: system-ui)
- **Escala:** `--fs-xs` 12px · `--fs-sm` 14px · `--fs-base` 16px · `--fs-lg` 18px · `--fs-xl` 24px · `--fs-2xl` 32px
- **Pesos:** 400 (texto), 500 (labels), 600 (subtítulos), 700 (títulos)

## 📏 Espaçamento

Escala de 4px: `--sp-1` (4px) → `--sp-8` (48px). Usada em paddings, margens e gaps.

## 🧩 Componentes reutilizáveis

| Componente     | Descrição                                            |
|----------------|------------------------------------------------------|
| `Button`       | Variantes `primary`, `secondary`, `ghost`; tamanhos  |
| `SearchBar`    | Campo de busca com ícone e botão de limpar           |
| `Select`       | Dropdown estilizado                                  |
| `Card`         | Superfície com borda e sombra                        |
| `Badge`        | Etiqueta de status (success/warning/error)           |
| `Avatar`       | Iniciais com cor derivada do nome                    |
| `StatCard`     | Cartão de métrica do dashboard                       |
| `StudentsTable`| Tabela responsiva (vira cards no mobile)             |
| `StudentModal` | Modal de detalhes + notas com barras de progresso    |
| `Navbar`       | Navegação, tema e usuário logado                     |
| `Loading`      | `Spinner` e `TableSkeleton`                           |
| `EmptyState`   | Estado vazio / erro                                  |
| `Toast`        | Notificações temporárias                             |
| `ThemeToggle`  | Alterna claro/escuro                                 |

## ♿ Acessibilidade & UX

- Foco visível (`box-shadow`) em campos e navegação por teclado.
- Modal fecha com **ESC** e clique fora; `aria-modal` e `role="dialog"`.
- `aria-live` nos toasts; `aria-label` em botões só com ícone.
- Respeita `prefers-reduced-motion` (desliga animações).
- Contraste adequado nos dois temas.

## 📱 Responsividade

Breakpoints principais: **≤ 480px** (smartphone), **≤ 760px** (tablet),
**≤ 900px** (grids do dashboard). A tabela de alunos se transforma em cartões
empilhados no mobile, e o painel lateral do login é ocultado em telas estreitas.
