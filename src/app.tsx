import React from 'react';

const INITIAL_BUDGET = 210;

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
});

export const App = function () {
    const [remaining, setRemaining] = React.useState(INITIAL_BUDGET);
    const [amount, setAmount] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const spent = INITIAL_BUDGET - remaining;
    const remainingAccent =
        remaining === 0 ? 'text-danger' : remaining < INITIAL_BUDGET * 0.25 ? 'text-warning' : 'text-success';

    const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const parsedValue = Number.parseFloat(amount);
        if (!Number.isFinite(parsedValue)) {
            setError('Enter a positive amount to register.');
            return;
        }
        setRemaining(remaining - parsedValue);
        setAmount('');
        setError(null);
    };

    const handleAmountChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (error) setError(null);
        setAmount(e.target.value);
    };

    return (
        <div className="container py-5">
            <div className="budget-panel mx-auto">
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
                                    {CURRENCY_FORMATTER.format(INITIAL_BUDGET)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <span className="text-uppercase small text-muted">Remaining balance</span>
                                <span
                                    className={`fs-4 fw-semibold balance-accent ${remainingAccent}`}
                                    data-testid="remaining-balance"
                                >
                                    {CURRENCY_FORMATTER.format(remaining)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <span className="text-uppercase small text-muted">Costs registered</span>
                                <span className="fs-5 fw-medium text-secondary balance-accent">
                                    {CURRENCY_FORMATTER.format(spent)}
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
                                    aria-describedby="cost-addon cost-help"
                                    className={`form-control${error ? ' is-invalid' : ''}`}
                                    id="cost-amount"
                                    inputMode="decimal"
                                    min="0"
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
