type IncomeItem = {
    amount: number;
    category: {
        name: string;
    };
};

export default function CalculateHighestIncome(incomeList: IncomeItem[]) {
    const incomeDictionary: Record<string, number> = incomeList.reduce(
        (acc, income) => {
            const categoryName = income.category.name;

            acc[categoryName] = (acc[categoryName] || 0) + income.amount;

            return acc;
        },
        {} as Record<string, number>
    );

    let highestCategory = "";
    let highestAmount = 0;

    for (const [category, amount] of Object.entries(incomeDictionary)) {
        if (amount > highestAmount) {
            highestAmount = amount;
            highestCategory = category;
        }
    }

    return {
        category: highestCategory,
        amount: highestAmount,
    };
}