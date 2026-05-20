import { CategoryType } from "@prisma/client";
import { publicProcedure, router } from "./tRPC";
import prisma from "@/lib/prisma";

export const categoriesRouter = router({
    seedDefaultCategories: publicProcedure.mutation(async () => {
        const defaultCategories = [
            // Income
            { name: "Salary", type: CategoryType.INCOME, description: "Monthly salary" },
            { name: "Bonus", type: CategoryType.INCOME, description: "Performance or yearly bonus" },
            { name: "Freelance", type: CategoryType.INCOME, description: "Freelance jobs" },
            { name: "Investment", type: CategoryType.INCOME, description: "Dividends, stocks, crypto" },
            { name: "Rental Income", type: CategoryType.INCOME, description: "Real estate rental" },
            { name: "Gift", type: CategoryType.INCOME, description: "Cash gifts, allowance" },
            { name: "Other Income", type: CategoryType.INCOME, description: null },

            // Expense
            { name: "Food & Drinks", type: CategoryType.EXPENSE, description: "Restaurants, coffee, etc." },
            { name: "Groceries", type: CategoryType.EXPENSE, description: null },
            { name: "Vehicle / Transport", type: CategoryType.EXPENSE, description: null },
            { name: "Housing", type: CategoryType.EXPENSE, description: "Rent, mortgage, utilities" },
            { name: "Bills", type: CategoryType.EXPENSE, description: "Electricity, internet, etc." },
            { name: "Study / Education", type: CategoryType.EXPENSE, description: null },
            { name: "Health", type: CategoryType.EXPENSE, description: null },
            { name: "Entertainment", type: CategoryType.EXPENSE, description: null },
            { name: "Shopping", type: CategoryType.EXPENSE, description: null },
            { name: "Travel", type: CategoryType.EXPENSE, description: null },
            { name: "Insurance", type: CategoryType.EXPENSE, description: null },
            { name: "Taxes", type: CategoryType.EXPENSE, description: null },
            { name: "Savings & Investments", type: CategoryType.EXPENSE, description: null },
            { name: "Other Expense", type: CategoryType.EXPENSE, description: null },
        ] as const;

        let created = 0;
        let existed = 0;

        for (const c of defaultCategories) {
            const found = await prisma.category.findFirst({
                where: {
                    userId: null, // global
                    name: c.name,
                    type: c.type,
                },
                select: { id: true },
            });

            if (found) {
                existed += 1;
                continue;
            }

            await prisma.category.create({
                data: {
                    userId: null,
                    name: c.name,
                    type: c.type,
                    description: c.description ?? null,
                },
            });

            created += 1;
        }

        return {
            ok: true,
            created,
            existed,
            total: defaultCategories.length,
        };
    }),
    getGlobalCategories: publicProcedure.query(async () => {
        const globalCategories = await prisma.category.findMany({
            where: {
                userId: null
            },
            omit: {
                userId: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return {
            globalCategories: globalCategories
        }
    })
});
