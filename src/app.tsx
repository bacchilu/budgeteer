import {Decimal} from 'decimal.js';
import React from 'react';

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
    const [remaining, setRemaining] = React.useState(INITIAL_BUDGET);
    const [amount, setAmount] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const spent = INITIAL_BUDGET.sub(remaining);

    let remainingAccent = 'text-success';
    if (remaining.lessThan(INITIAL_BUDGET.mul(0.25))) remainingAccent = 'text-warning';
    if (remaining.lessThanOrEqualTo(0)) remainingAccent = 'text-danger';

    const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const parsedValue = new Decimal(amount);
            setRemaining(remaining.sub(parsedValue));
            setAmount('');
            setError(null);
        } catch {
            setError('Enter a positive amount to register.');
            return;
        }
    };

    const handleAmountChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (error) setError(null);
        setAmount(e.target.value);
    };

    return (
        <div className="container py-5">
            <div className="mx-auto">
                <div className="text-center mb-4">
                    <h1 className="display-6 fw-semibold mb-2">Budget tracker</h1>
                    <p className="text-muted mb-0">Register costs against your fixed budget.</p>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-uppercase small text-muted">Total budget</span>
                                <span className="fs-4 fw-semibold balance-accent">
                                    {formatCurrency(INITIAL_BUDGET)}
                                </span>
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
                                <span className="fs-5 fw-medium text-secondary balance-accent">
                                    {formatCurrency(spent)}
                                </span>
                            </div>
                        </div>

                        <form noValidate onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="cost-amount">
                                Cost amount
                            </label>
                            <div className="input-group">
                                <span className="input-group-text" id="cost-addon">
                                    €
                                </span>
                                <input
                                    autoFocus
                                    aria-describedby="cost-addon cost-help"
                                    className={`form-control${error ? ' is-invalid' : ''}`}
                                    id="cost-amount"
                                    inputMode="decimal"
                                    name="amount"
                                    onChange={handleAmountChange}
                                    placeholder="0.00"
                                    required
                                    step="0.01"
                                    type="number"
                                    value={amount}
                                />
                                <button className="btn btn-primary" type="submit">
                                    Register cost
                                </button>
                            </div>
                            {error && (
                                <div className="invalid-feedback d-block" role="alert">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
