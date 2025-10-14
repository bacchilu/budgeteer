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
