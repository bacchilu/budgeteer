import Decimal from 'decimal.js';

const INITIAL_BUDGET = new Decimal(210);

export const useInitialBudget = function () {
    // const fetcher = async function () {
    //     return INITIAL_BUDGET;
    // };
    // const {data} = useSWR('INITIAL_BUDGET', fetcher, {dedupingInterval: 60000});
    // console.log(data);

    return {initial_budget: INITIAL_BUDGET};
};
