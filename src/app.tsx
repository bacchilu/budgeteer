import {Decimal} from 'decimal.js';
import React from 'react';

import {Card, Form, Header, Page} from './ui';

const INITIAL_BUDGET = new Decimal(210);

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
});

const formatCurrency = function (value: Decimal) {
    return CURRENCY_FORMATTER.format(value.toNumber());
};

export const App = function () {
    const [remaining, setRemaining] = React.useState<Decimal>(INITIAL_BUDGET);

    const handleSubmit = function (amount: Decimal) {
        setRemaining(remaining.sub(amount));
    };

    const spent = INITIAL_BUDGET.sub(remaining);

    let remainingAccent = 'text-success';
    if (remaining.lessThan(INITIAL_BUDGET.mul(0.25))) remainingAccent = 'text-warning';
    if (remaining.lessThanOrEqualTo(0)) remainingAccent = 'text-danger';

    return (
        <Page>
            <Header title="Budget tracker" description="Register costs against your fixed budget." />
            <Card>
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-uppercase small text-muted">Total budget</span>
                        <span className="fs-4 fw-semibold balance-accent">{formatCurrency(INITIAL_BUDGET)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-uppercase small text-muted">Remaining balance</span>
                        <span
                            className={`fs-4 fw-semibold balance-accent ${remainingAccent}`}
                            data-testid="remaining-balance"
                        >
                            {formatCurrency(remaining)}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-uppercase small text-muted">Costs registered</span>
                        <span className="fs-5 fw-medium text-secondary balance-accent">{formatCurrency(spent)}</span>
                    </div>
                </div>
                <Form onSubmit={handleSubmit} />
            </Card>
        </Page>
    );
};
