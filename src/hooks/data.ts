import Decimal from 'decimal.js';
import useSWR from 'swr';

const INITIAL_BUDGET = new Decimal(210);

export type Transaction = Decimal;

export interface BudgetState {
    initialBudget: Decimal;
    transactions: Transaction[];
}

export interface BudgetActions {
    setInitialBudget: (value: Decimal) => void;
    addTransaction: (value: Transaction) => void;
}

export interface BudgetData {
    state: BudgetState;
    actions: BudgetActions;
}

export const useBudgetData = function (): BudgetData | undefined {
    const fetcher = async function (): Promise<BudgetState> {
        return {initialBudget: INITIAL_BUDGET, transactions: []};
    };
    const {data, mutate} = useSWR<BudgetState>('INITIAL_BUDGET', fetcher, {
        dedupingInterval: 60000 * 60 * 24,
    });

    if (data === undefined) return undefined;

    const setInitialBudget = function (value: Decimal) {
        mutate(
            (current) => {
                if (current === undefined) return current;
                return {...current, initialBudget: value};
            },
            {revalidate: false}
        );
    };

    const addTransaction = function (value: Transaction) {
        mutate(
            (current) => {
                if (current === undefined) return current;
                return {...current, transactions: [...current.transactions, value]};
            },
            {revalidate: false}
        );
    };

    return {state: data, actions: {setInitialBudget, addTransaction}};
};
