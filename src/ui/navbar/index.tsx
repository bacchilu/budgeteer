import React from 'react';

import {useBudgetDataContext} from '../../hooks/use-data-context';
import {formatCurrency} from '../../lib/format-currency';
import {Modal} from '../modal';
import {TotalBudgetModal} from './total-budget-modal';

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const {state} = useBudgetDataContext();

    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = function () {
        setOpen(true);
    };
    const handleClose = function () {
        setOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <TotalBudgetModal onClose={handleClose} />
            </Modal>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand mb-0 h1">{title}</span>
                    <button
                        type="button"
                        className="btn btn-link p-0 d-block text-end text-decoration-none text-white"
                        onClick={handleOpen}
                    >
                        <span className="d-block text-uppercase small text-white-50">Initial budget</span>
                        <span className="fw-semibold text-white">{formatCurrency(state.initialBudget)}</span>
                    </button>
                </div>
            </nav>
        </>
    );
};
