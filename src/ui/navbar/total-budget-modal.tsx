import Decimal from 'decimal.js';
import React from 'react';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

const useModalAutofocus = function (modalTargetId: string) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useEffect(() => {
        const handleShown = function () {
            inputRef.current!.select();
        };

        const modalElement = document.getElementById(modalTargetId);
        modalElement!.addEventListener('shown.bs.modal', handleShown);
        return () => {
            modalElement!.removeEventListener('shown.bs.modal', handleShown);
        };
    }, [modalTargetId]);

    return inputRef;
};

export const TotalBudgetModal: React.FC<{modalTargetId: string}> = function ({modalTargetId}) {
    const {state, actions} = useBudgetDataContext();
    const [draftBudget, setDraftBudget] = React.useState(state.initialBudget.toString());
    const inputRef = useModalAutofocus(modalTargetId);

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
        }
    };

    return (
        <div
            className="modal fade"
            id={modalTargetId}
            tabIndex={-1}
            aria-labelledby="total-budget-modal-title"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="total-budget-modal-title">
                            Initial budget
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="total-budget-input">
                                    Total budget
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text" aria-hidden="true">
                                        $
                                    </span>
                                    <input
                                        ref={inputRef}
                                        id="total-budget-input"
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
                                <div id="total-budget-help" className="form-text">
                                    Current value: {formatCurrency(state.initialBudget)}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
