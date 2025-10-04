import Decimal from 'decimal.js';
import useSWR from 'swr';

const INITIAL_BUDGET = new Decimal(210);

export interface BudgetData {
    initial_budget: Decimal;
    transactions: Decimal[];
    changeInitialBudget: (v: Decimal) => void;
    addTransaction: (v: Decimal) => void;
}

export const useBudgetData = function (): BudgetData | undefined {
    const fetcher = async function () {
        return {initial_budget: INITIAL_BUDGET, transactions: []};
    };
    const {data, mutate} = useSWR<{initial_budget: Decimal; transactions: Decimal[]}>('INITIAL_BUDGET', fetcher, {
        dedupingInterval: 60000 * 60 * 24,
    });

    const changeInitialBudget = function (v: Decimal) {
        mutate({...data!, initial_budget: v}, false);
    };

    const addTransaction = function (v: Decimal) {
        mutate({...data!, transactions: [...data!.transactions, v]}, false);
    };

    return data === undefined ? undefined : {...data, changeInitialBudget, addTransaction};
};
