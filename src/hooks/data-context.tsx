import React from 'react';

import {type BudgetData} from './data';

const BudgetDataContext = React.createContext<BudgetData | undefined>(undefined);

export const BudgetDataProvider: React.FC<{value: BudgetData; children: React.ReactNode}> = function ({
    value,
    children,
}) {
    return <BudgetDataContext.Provider value={value}>{children}</BudgetDataContext.Provider>;
};

export const useBudgetDataContext = function (): BudgetData {
    const res = React.useContext(BudgetDataContext);
    if (res === undefined) throw new Error('useBudgetDataContext must be used inside BudgetDataProvider');
    return res;
};
