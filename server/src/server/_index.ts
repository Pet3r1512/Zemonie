import { analyticsRouter } from './analytics';
import { balancesRouter } from './balance';
import { categoriesRouter } from './categories';
import { transactionsRouter } from './transactions';
import { router } from './tRPC';
import { userRouter } from './user';

export const appRouter = router({
    transactions: transactionsRouter,
    balances: balancesRouter,
    categories: categoriesRouter,
    analytics: analyticsRouter,
    user: userRouter
});

export type AppRouter = typeof appRouter
