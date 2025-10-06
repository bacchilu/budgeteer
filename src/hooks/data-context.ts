import {createContext} from 'react';

import {type BudgetData} from './data';

export const BudgetDataContext = createContext<BudgetData | undefined>(undefined);
