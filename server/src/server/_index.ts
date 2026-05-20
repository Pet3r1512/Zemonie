import { analyticsRouter } from './analytics';
import { balancesRouter } from './balance';
import { categoriesRouter } from './categories';
import { transactionsRouter } from './transactions';
import { router } from './tRPC';

export const appRouter = router({
    transactions: transactionsRouter,
    balances: balancesRouter,
    categories: categoriesRouter,
    analytics: analyticsRouter
});

export type AppRouter = typeof appRouter
