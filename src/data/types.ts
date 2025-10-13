import Decimal from 'decimal.js';

export interface Transaction {
    date: Date;
    value: Decimal;
}

export interface BudgetState {
    initialBudget: Decimal;
    transactions: Transaction[];
}

export interface BudgetStore {
    getCurrentBudget: () => Promise<BudgetState>;
    setInitialBudget: (value: Decimal) => Promise<BudgetState>;
    addTransaction: (value: Decimal) => Promise<BudgetState>;
}

type PersistedTransaction = {
    date: string;
    value: string;
};

type PersistedBudgetState = {
    initialBudget: string;
    transactions: PersistedTransaction[];
};

export const deserialize = function (persisted: PersistedBudgetState): BudgetState {
    const initialBudget = new Decimal(persisted.initialBudget);
    const transactions = (persisted.transactions ?? []).map((transaction) => ({
        date: new Date(transaction.date),
        value: new Decimal(transaction.value),
    }));
    return {initialBudget, transactions};
};

export const serialize = function (state: BudgetState): PersistedBudgetState {
    return {
        initialBudget: state.initialBudget.toString(),
        transactions: state.transactions.map((transaction) => ({
            date: transaction.date.toISOString(),
            value: transaction.value.toString(),
        })),
    };
};
