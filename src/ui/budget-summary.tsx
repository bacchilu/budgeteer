import {Decimal} from 'decimal.js';
import React from 'react';

import {type BudgetData} from '../hooks/data';
import {useBudgetDataContext} from '../hooks/data-context';
import {formatCurrency} from '../lib/format-currency';

export const BudgetSummary: React.FC<{spentAmount: Decimal}> = function ({spentAmount}) {
    const budgetData: BudgetData = useBudgetDataContext();

    const remainingAmount = budgetData.initial_budget.sub(spentAmount);

    let remainingAccent = 'text-success';
    if (remainingAmount.lessThan(budgetData.initial_budget.mul(0.25))) remainingAccent = 'text-warning';
    if (remainingAmount.lessThanOrEqualTo(0)) remainingAccent = 'text-danger';

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-uppercase small text-muted">Remaining balance</span>
                <span className={`fs-4 fw-semibold balance-accent ${remainingAccent}`} data-testid="remaining-balance">
                    {formatCurrency(remainingAmount)}
                </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-uppercase small text-muted">Costs registered</span>
                <span className="fs-5 fw-medium text-secondary balance-accent">{formatCurrency(spentAmount)}</span>
            </div>
        </div>
    );
};
