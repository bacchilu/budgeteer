import {Modal} from 'bootstrap';
import React from 'react';
import {createPortal} from 'react-dom';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

import {TotalBudgetModal} from './total-budget-modal';

const MyModal = function () {
    return createPortal(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here. CIAO</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" className="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('bootstrap-modal')!
    );
};

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const modalTargetId = 'total-budget-modal';

    const {state} = useBudgetDataContext();

    const myModal = React.useRef<Modal | null>(null);
    React.useEffect(() => {
        myModal.current = new Modal(document.getElementById('bootstrap-modal')!, {backdrop: true});
    }, []);

    const openModal = function () {
        myModal.current!.show();
    };

    return (
        <>
            <MyModal />
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand mb-0 h1" onClick={openModal}>
                        {title}
                    </span>
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
