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
- Light bg: `#f5f5f7`; Dark bg: `#0f1115` (`dark-bg`).
- Cards: white / `dark-card` (`#181c23`), elevated `dark-elevated` (`#222833`).
- Text: gray-900/white headings; gray-500/400 muted; red-500 errors.
- Borders: `border-black/5` (light), `border-white/10` (dark).

## Radius

- Cards/containers: `rounded-2xl`. Buttons/pills: `rounded-full`. Inputs/small: `rounded-xl`/`rounded-lg`.

## Shadows

- Cards: `shadow-sm` with `hover:shadow-md` and `transition-shadow duration-200`.
- Avoid `shadow-lg`/`shadow-2xl`/`shadow-xl` except hero screenshot.

## Spacing

- Section gaps: `gap-4`/`gap-6`, `space-y-4`/`space-y-6`.
- Card padding: `p-6` (or `py-6 px-6`).
- Page padding: `p-6 md:p-8`.

## Typography

- Headings: `font-semibold tracking-tight`, scale `text-2xl md:text-3xl lg:text-4xl`.
- Body/muted: `text-sm`/`text-base`, `text-gray-500 dark:text-gray-400`.
- Avoid `font-bold`/`font-extrabold` except emphasis.

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

## Conventions

- Use `@/` path alias. No comments unless intent non-obvious.
- Verify: `pnpm --filter client exec tsc --noEmit`, `pnpm lint`, `pnpm format`.
