import Decimal from 'decimal.js';
import useSWR from 'swr';

import {CurrentBudgetStore} from '../data';
import type {BudgetState, Transaction} from '../data/types';

interface BudgetActions {
    setInitialBudget: (value: Decimal) => void;
    addTransaction: (value: Decimal) => void;
    getTransactionsTotal: () => Decimal;
}

export interface BudgetData {
    state: BudgetState;
    actions: BudgetActions;
}

export const useBudgetData = function (): BudgetData | undefined {
    const fetcher = async function (): Promise<BudgetState> {
        return CurrentBudgetStore.getCurrentBudget();
    };
    const {data, mutate} = useSWR<BudgetState>('CURRENT_BUDGET', fetcher, {dedupingInterval: 60000});

    if (data === undefined) return undefined;

    const setInitialBudget = function (value: Decimal) {
        mutate(CurrentBudgetStore.setInitialBudget(value), {
            revalidate: false,
            rollbackOnError: true,
            optimisticData: {...data, initialBudget: value},
        });
    };

    const addTransaction = function (value: Decimal) {
        mutate(CurrentBudgetStore.addTransaction(value), {
            revalidate: false,
            rollbackOnError: true,
            optimisticData: {...data, transactions: [...data.transactions, {date: new Date(), value}]},
        });
    };

    const getTransactionsTotal = function (): Decimal {
        return data.transactions.reduce(
            (acc: Decimal, current: Transaction) => acc.add(current.value),
            new Decimal('0')
        );
    };

    return {state: data, actions: {setInitialBudget, addTransaction, getTransactionsTotal}};
};
