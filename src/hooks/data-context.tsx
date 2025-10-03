import Decimal from 'decimal.js';
import React from 'react';

import {type BudgetData} from './data';

const BudgetDataContext = React.createContext<BudgetData>({initial_budget: new Decimal('0')});

export const BudgetDataProvider: React.FC<{value: BudgetData; children: React.ReactNode}> = function ({
    value,
    children,
}) {
    return <BudgetDataContext.Provider value={value}>{children}</BudgetDataContext.Provider>;
};

export const useBudgetDataContext = function (): BudgetData {
    return React.useContext(BudgetDataContext);
};
