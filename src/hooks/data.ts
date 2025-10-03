import Decimal from 'decimal.js';
import useSWR from 'swr';

const INITIAL_BUDGET = new Decimal(210);

export interface BudgetData {
    initial_budget: Decimal;
}

export const useBudgetData = function (): BudgetData | undefined {
    const fetcher = async function () {
        return {initial_budget: INITIAL_BUDGET};
    };
    const {data} = useSWR<BudgetData>('INITIAL_BUDGET', fetcher, {dedupingInterval: 60000});
    return data;
};
