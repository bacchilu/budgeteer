import {Decimal} from 'decimal.js';
import React from 'react';

import {useInitialBudget} from '../hooks/data';
import {formatCurrency} from '../lib/format-currency';

export const BudgetSummary: React.FC<{remaining: Decimal}> = function ({remaining}) {
    const {initial_budget} = useInitialBudget();

    const spent = initial_budget.sub(remaining);

    let remainingAccent = 'text-success';
    if (remaining.lessThan(initial_budget.mul(0.25))) remainingAccent = 'text-warning';
    if (remaining.lessThanOrEqualTo(0)) remainingAccent = 'text-danger';

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-uppercase small text-muted">Remaining balance</span>
                <span className={`fs-4 fw-semibold balance-accent ${remainingAccent}`} data-testid="remaining-balance">
                    {formatCurrency(remaining)}
                </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-uppercase small text-muted">Costs registered</span>
                <span className="fs-5 fw-medium text-secondary balance-accent">{formatCurrency(spent)}</span>
            </div>
        </div>
    );
};
