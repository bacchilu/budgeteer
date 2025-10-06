import React from 'react';

import {type BudgetData} from './use-data';
import {BudgetDataContext} from './data-context';

export const BudgetDataProvider: React.FC<{value: BudgetData; children: React.ReactNode}> = function ({
    value,
    children,
}) {
    return <BudgetDataContext.Provider value={value}>{children}</BudgetDataContext.Provider>;
};
