import Decimal from 'decimal.js';

const INITIAL_BUDGET = new Decimal(210);

export const useInitialBudget = function () {
    return INITIAL_BUDGET;
};
