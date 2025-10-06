import {createContext} from 'react';

import {type BudgetData} from './use-data';

export const BudgetDataContext = createContext<BudgetData | undefined>(undefined);
