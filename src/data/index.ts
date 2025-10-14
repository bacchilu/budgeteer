// import {InMemoryBudgetStore} from './in-memory-budget-store';
import {LocalStorageBudgetStore} from './local-storage-budget-store';
import type {BudgetStore} from './types';

export const CurrentBudgetStore: BudgetStore = LocalStorageBudgetStore;
