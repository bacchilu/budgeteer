import {InMemoryBudgetStore} from './in-memory-budget-store';
import type {BudgetStore} from './types';

export const CurrentBudgetStore: BudgetStore = InMemoryBudgetStore;
