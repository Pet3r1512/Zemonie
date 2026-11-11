# Zemonie Design System

Apple-inspired, calm, intentional. Used by AI code review to keep new changes consistent.

## Principles

- Spacing & alignment first; generous whitespace; consistent rhythm.
- Strong visual hierarchy via typography scale and spacing, not decoration.
- Avoid AI-flavored design: no heavy shadows, gradients, clutter; subtle polish only.
- Reusable, composable components; prefer existing `@/components/ui/*`.
- Tailwind utilities organized and consistent; shadcn/ui as foundation.

## Colors

- Brand accent: `primary` = `#ff7900` (orange). Keep as brand identity.
- Light bg: `#f5f5f7` (`body`); dashboard surfaces use white. Dark bg: `#0f1115` (`dark-bg`).
- Cards: white / `dark-card` (`#181c23`), elevated `dark-elevated` (`#222833`).
- Text: gray-900/white headings; gray-500/400 muted; red-500 errors.
- Borders: `border-black/5` (light), `border-white/10` (dark).

## Radius

- Cards/containers: `rounded-2xl`. Buttons/pills: `rounded-full`. Inputs/small: `rounded-xl`/`rounded-lg`.

## Shadows

- Cards: `shadow-sm` with `hover:shadow-md` and `transition-shadow duration-200`.
- Avoid `shadow-lg`/`shadow-2xl`/`shadow-xl` in new or edited components (except the hero screenshot). Existing usages are tracked for cleanup.

## Spacing

- Section gaps: `gap-4`/`gap-6`, `space-y-4`/`space-y-6`.
- Card padding: `p-6` (or `py-6 px-6`).
- Page padding: `p-6 md:p-8`.

## Typography

- Headings: `font-semibold tracking-tight`, scale `text-2xl md:text-3xl lg:text-4xl`.
- Body/muted: `text-sm`/`text-base`, `text-gray-500 dark:text-gray-400`.
- Use `font-semibold` for headings; `font-bold`/`font-extrabold` only for emphasis (e.g., compact summary-card titles).

## Layouts

- Overview cards: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4 gap-4`.
- Charts: `grid grid-cols-1 lg:grid-cols-2 gap-6`.
- Max width: `max-w-7xl`.

## Components

- Use shadcn `Card`, `Skeleton`, `Tooltip`. Custom containers: `rounded-2xl` + subtle shadow + border.
- Loading: Skeleton with `bg-gray-200 dark:bg-dark-card`.
- Empty states: italic muted text.

## Dark mode

- Always provide `dark:` variants. Backgrounds use `dark-bg`/`dark-card`.

## Theme system (light + dark)

Every page follows the light/dark theme: `useTheme` writes `localStorage.theme` and toggles the
`.dark` class on `<html>` (`@custom-variant dark` in `index.css`; `:root` = `#f5f5f7`, `.dark` =
`#0f1115`). Prefer CSS `dark:` variants and `hidden dark:block` gating over JS theme branching —
each `useTheme()` call holds independent state and won't sync across components.

- **Content pages** opt into theme-aware chrome via the `content` prop on `Page` (font +
  `dark:bg-black` + shared `Starfield` gated with `hidden dark:block`). Legal/auth pages keep the
  default light wrapper.
- **Homepage** has no `Page` wrapper: its sections carry `dark:bg-black` themselves, and the hero
  is transparent in light (html `#f5f7f7` shows) with `dark:bg-black`. Starfield, rim canvas,
  video, and glow images are gated with `hidden dark:block`.
- Token mapping: headings `text-gray-900 dark:text-white`; ledes `text-gray-600 dark:text-[#b5b3b2]`;
  secondary `text-gray-500 dark:text-[#8b8988]`; cards `bg-white border-gray-200` →
  `dark:bg-[#08080a]/85 dark:border-white/[0.07]`; section bands `bg-gray-50 dark:bg-transparent`.
- **Product mocks stay dark in both modes** (hero dashboard, showcase screenshot, interactive
  donut mock, dashboard cards).
- Header/footer follow the theme: light = white/10 bar + `#111827` footer (original design),
  dark = `#08080a` bar with `#ff7900` ring + pure-black footer.
- **Dashboard** follows the same language: chrome/sidebar `dark:bg-black`, hero cards
  (`rounded-[14px]`, dark `#08080a]/85` + `white/[0.07]`), `font-display` headings, gradient
  primary buttons, orange active nav chips; semantic income/expense/chart colors are kept.

## Content-page & hero visual language

Home, About Us, Features, FAQ, and Release Notes share the hero's style in dark mode (and an
equivalent light translation):

- Headings: `font-display font-bold tracking-[-0.03em]` (Space Grotesk); orange (`text-primary`)
  only for accents.
- Cards: `rounded-[14px]`; dark = `bg-[#08080a]/85 border-white/[0.07]`, light = `bg-white
border-gray-200 shadow-sm`; optional orange top-edge line on hover/emphasis.
- Nav/page chips: active = `border-[#ff7900]/30 bg-[#ff7900]/12 text-primary dark:text-[#ff9a3d]`.
- Badges (light base + dark variant): `bg-green-100 text-green-700` / `bg-blue-100 text-blue-700`
  → `dark:bg-emerald-400/15 dark:text-emerald-300` etc.
- Primary buttons: gradient `#ff9d33 → #ff7900 → #ff6200` with `text-[#1a0c00]` (both modes);
  secondary = light `border-gray-200 bg-white text-gray-900` → `dark:border-white/10
dark:bg-white/[0.05] dark:text-white`.

## Conventions

- Use `@/` path alias. No comments unless intent non-obvious.
- Verify: `pnpm --dir client exec tsc -b`, `pnpm lint`, `pnpm format`.
