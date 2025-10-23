import Decimal from 'decimal.js';
import React from 'react';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

export const TotalBudgetModal: React.FC<{onClose: () => void}> = function ({onClose}) {
    const inputId = React.useId();
    const {state, actions} = useBudgetDataContext();
    const [draftBudget, setDraftBudget] = React.useState(state.initialBudget.toString());

    const handleDraftBudgetChange = (nextValue: string) => {
        setDraftBudget(nextValue);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = function (event) {
        event.preventDefault();

        try {
            const updatedBudget = new Decimal(draftBudget);
            actions.setInitialBudget(updatedBudget);
        } catch {
            console.log('Ignore invalid input; keep the draft value for correction.');
        } finally {
            onClose();
        }
    };

    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title">Initial budget</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label" htmlFor={inputId}>
                            Total budget
                        </label>
                        <div className="input-group">
                            <span className="input-group-text" aria-hidden="true">
                                $
                            </span>
                            <input
                                id={inputId}
                                type="number"
                                className="form-control"
                                min="0"
                                step="0.01"
                                value={draftBudget}
                                onChange={(event) => handleDraftBudgetChange(event.target.value)}
                                aria-describedby="total-budget-help"
                                inputMode="decimal"
                            />
                        </div>
                        <div className="form-text">Current value: {formatCurrency(state.initialBudget)}</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};
