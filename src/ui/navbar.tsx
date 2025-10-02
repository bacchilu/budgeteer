import React from 'react';

import {formatCurrency} from '../lib/format-currency';
import {INITIAL_BUDGET} from '../lib/total-budget';

const TotalBudgetModal: React.FC<{modalTargetId: string}> = function ({modalTargetId}) {
    const [draftBudget, setDraftBudget] = React.useState(INITIAL_BUDGET.toString());

    const handleDraftBudgetChange = (nextValue: string) => {
        setDraftBudget(nextValue);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = function (e) {
        e.preventDefault();

        console.log(draftBudget);
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
                            Total budget
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
                                    Current total: {formatCurrency(INITIAL_BUDGET)}
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

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const modalTargetId = 'total-budget-modal';
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand mb-0 h1">{title}</span>
                    <a
                        href={`#${modalTargetId}`}
                        className="d-block text-end text-decoration-none text-white"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalTargetId}`}
                        role="button"
                        aria-controls={modalTargetId}
                        aria-expanded="false"
                    >
                        <span className="d-block text-uppercase small text-white-50">Total budget</span>
                        <span className="fw-semibold text-white">{formatCurrency(INITIAL_BUDGET)}</span>
                    </a>
                </div>
            </nav>
            <TotalBudgetModal modalTargetId={modalTargetId} />
        </>
    );
};
