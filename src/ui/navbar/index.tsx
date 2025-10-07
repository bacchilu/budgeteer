import React from 'react';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

import {TotalBudgetModal} from './total-budget-modal';

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const {state} = useBudgetDataContext();

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
                        <span className="d-block text-uppercase small text-white-50">Initial budget</span>
                        <span className="fw-semibold text-white">{formatCurrency(state.initialBudget)}</span>
                    </a>
                </div>
            </nav>
            <TotalBudgetModal modalTargetId={modalTargetId} />
        </>
    );
};
