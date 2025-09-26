import {Decimal} from 'decimal.js';
import React from 'react';

export const Form: React.FC<{onSubmit: (value: Decimal) => void}> = function ({onSubmit}) {
    const [amountStr, setAmountStr] = React.useState<string>('');
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    React.useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setErrorMsg(null);
        }, 3000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [errorMsg]);

    const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const amount = new Decimal(amountStr);
            setAmountStr('');
            setErrorMsg(null);
            onSubmit(amount);
        } catch {
            setErrorMsg('Enter a valid amount to register.');
        }
    };

    const handleAmountChange = function (event: React.ChangeEvent<HTMLInputElement>) {
        setErrorMsg(null);
        setAmountStr(event.target.value);
    };

    return (
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
                    className={`form-control${errorMsg ? ' is-invalid' : ''}`}
                    id="cost-amount"
                    inputMode="decimal"
                    name="amount"
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    required
                    step="0.01"
                    type="number"
                    value={amountStr}
                />
                <button className="btn btn-primary" type="submit">
                    Register cost
                </button>
            </div>
            {errorMsg && (
                <div className="invalid-feedback d-block" role="alert">
                    {errorMsg}
                </div>
            )}
        </form>
    );
};
