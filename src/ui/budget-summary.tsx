import {Decimal} from 'decimal.js';
import React from 'react';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
});

const formatCurrency = function (value: Decimal) {
    return CURRENCY_FORMATTER.format(value.toNumber());
};

export const BudgetSummary: React.FC<{initialBudget: Decimal; remaining: Decimal}> = function ({
    initialBudget,
    remaining,
}) {
    const spent = initialBudget.sub(remaining);

    let remainingAccent = 'text-success';
    if (remaining.lessThan(initialBudget.mul(0.25))) remainingAccent = 'text-warning';
    if (remaining.lessThanOrEqualTo(0)) remainingAccent = 'text-danger';

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase small text-muted">Total budget</span>
                <span className="fs-4 fw-semibold balance-accent">{formatCurrency(initialBudget)}</span>
            </div>
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
