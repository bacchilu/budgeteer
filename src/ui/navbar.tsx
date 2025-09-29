import React from 'react';

import {formatCurrency} from '../lib/format-currency';
import {INITIAL_BUDGET} from '../lib/total-budget';

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const formattedBudget = formatCurrency(INITIAL_BUDGET);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand mb-0 h1">{title}</span>
                    <a
                        href="#total-budget-modal"
                        className="d-block text-end text-decoration-none text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#total-budget-modal"
                        role="button"
                        aria-controls="total-budget-modal"
                        aria-expanded="false"
                    >
                        <span className="d-block text-uppercase small text-white-50">Total budget</span>
                        <span className="fw-semibold text-white">{formattedBudget}</span>
                    </a>
                </div>
            </nav>
            <div
                className="modal fade"
                id="total-budget-modal"
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
                        <div className="modal-body">
                            <p className="mb-0 fs-4 fw-semibold">{formattedBudget}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
