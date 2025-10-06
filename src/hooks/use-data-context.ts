import {useContext} from 'react';

import {type BudgetData} from './use-data';
import {BudgetDataContext} from './data-context';

export const useBudgetDataContext = function (): BudgetData {
    const value = useContext(BudgetDataContext);
    if (value === undefined) throw new Error('useBudgetDataContext must be used inside BudgetDataProvider');
    return value;
};
