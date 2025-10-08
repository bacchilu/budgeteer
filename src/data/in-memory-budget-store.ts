import Decimal from 'decimal.js';

import type {BudgetState, BudgetStore} from './types';

const INITIAL_BUDGET = new Decimal(210);
const IN_MEMORY_BUDGET: BudgetState = {initialBudget: INITIAL_BUDGET, transactions: []};

const getSnapshot = function (): BudgetState {
    return {initialBudget: IN_MEMORY_BUDGET.initialBudget, transactions: [...IN_MEMORY_BUDGET.transactions]};
};

const getCurrentBudget = async function (): Promise<BudgetState> {
    return getSnapshot();
};

const setInitialBudget = async function (value: Decimal): Promise<BudgetState> {
    IN_MEMORY_BUDGET.initialBudget = value;
    return getSnapshot();
};

const addTransaction = async function (value: Decimal): Promise<BudgetState> {
    IN_MEMORY_BUDGET.transactions.push({date: new Date(), value});
    return getSnapshot();
};

export const InMemoryBudgetStore: BudgetStore = {
    getCurrentBudget,
    setInitialBudget,
    addTransaction,
};
