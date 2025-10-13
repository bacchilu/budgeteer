import Decimal from 'decimal.js';

import {deserialize, serialize, type BudgetState, type BudgetStore} from './types';

const STORAGE_KEY = 'budgeteer:budget-state';
const INITIAL_BUDGET = new Decimal(210);

const LocalStorage = (function () {
    return {
        read: function (): BudgetState {
            return deserialize(JSON.parse(localStorage.getItem(STORAGE_KEY)!));
        },
        write: function (state: BudgetState): void {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize(state)));
        },
    };
})();
LocalStorage.write({initialBudget: new Decimal(INITIAL_BUDGET), transactions: []});

const getCurrentBudget = async function (): Promise<BudgetState> {
    return LocalStorage.read();
};

const setInitialBudget = async function (value: Decimal): Promise<BudgetState> {
    const state = LocalStorage.read();
    const nextState: BudgetState = {initialBudget: value, transactions: [...state.transactions]};

    LocalStorage.write(nextState);
    return nextState;
};

const addTransaction = async function (value: Decimal): Promise<BudgetState> {
    const state = LocalStorage.read();
    const nextState: BudgetState = {
        initialBudget: state.initialBudget,
        transactions: [...state.transactions, {date: new Date(), value}],
    };

    LocalStorage.write(nextState);
    return nextState;
};

export const LocalStorageBudgetStore: BudgetStore = {
    getCurrentBudget,
    setInitialBudget,
    addTransaction,
};
