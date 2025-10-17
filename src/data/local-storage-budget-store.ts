import Decimal from 'decimal.js';

import {createLocalStorage} from '../lib/create-local-storage';
import {type BudgetState, type BudgetStore} from './types';

const LocalStorage = (function () {
    const STORAGE_KEY = 'budgeteer:budget-state';
    const INITIAL_BUDGET = new Decimal(210);

    type PersistedTransaction = {
        date: string;
        value: string;
    };

    type PersistedBudgetState = {
        initialBudget: string;
        transactions: PersistedTransaction[];
    };

    const deserialize = function (persisted: PersistedBudgetState): BudgetState {
        const initialBudget = new Decimal(persisted.initialBudget);
        const transactions = persisted.transactions.map((transaction) => ({
            date: new Date(transaction.date),
            value: new Decimal(transaction.value),
        }));
        return {initialBudget, transactions};
    };

    const serialize = function (state: BudgetState): PersistedBudgetState {
        return {
            initialBudget: state.initialBudget.toString(),
            transactions: state.transactions.map((transaction) => ({
                date: transaction.date.toISOString(),
                value: transaction.value.toString(),
            })),
        };
    };

    return createLocalStorage<BudgetState, PersistedBudgetState>(STORAGE_KEY, serialize, deserialize, {
        initialBudget: new Decimal(INITIAL_BUDGET),
        transactions: [],
    });
})();

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
