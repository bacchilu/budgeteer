import {Modal} from 'bootstrap';
import React from 'react';
import {createPortal} from 'react-dom';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';

import {TotalBudgetModal} from './total-budget-modal';

const MyModal: React.FC<{open: boolean}> = function ({open}) {
    const ref = React.useRef<Modal | null>(null);
    React.useEffect(() => {
        const el = document.getElementById('bootstrap-modal')!;
        ref.current = new Modal(el, {backdrop: true});
    }, []);
    React.useEffect(() => {
        open ? ref.current!.show() : ref.current!.hide();
    }, [open]);

    return createPortal(
        <div className="modal" id="bootstrap-modal">
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
            </div>
        </div>,
        document.body
    );
};

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const modalTargetId = 'total-budget-modal';

    const {state} = useBudgetDataContext();

    const [open, setOpen] = React.useState<boolean>(false);
    const openModal = function () {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    return (
        <>
            <MyModal open={open} />
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
