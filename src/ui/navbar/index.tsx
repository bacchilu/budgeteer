// import {Modal} from 'bootstrap';
import React from 'react';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

import {TotalBudgetModal} from './total-budget-modal';

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const modalTargetId = 'total-budget-modal';

    const {state} = useBudgetDataContext();
    // React.useEffect(() => {
    //     const myModal = new Modal(document.getElementById(modalTargetId)!, {});
    //     myModal.show()
    // }, []);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand mb-0 h1">{title}</span>
                    <button
                        type="button"
                        className="btn btn-link p-0 d-block text-end text-decoration-none text-white"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalTargetId}`}
                        aria-controls={modalTargetId}
                        aria-expanded="false"
                    >
                        <span className="d-block text-uppercase small text-white-50">Initial budget</span>
                        <span className="fw-semibold text-white">{formatCurrency(state.initialBudget)}</span>
                    </button>
                </div>
            </nav>
            <TotalBudgetModal modalTargetId={modalTargetId} />
        </>
    );
};
