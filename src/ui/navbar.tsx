import React from 'react';

import {formatCurrency} from '../lib/format-currency';
import {INITIAL_BUDGET} from '../lib/total-budget';

export const Navbar: React.FC<{title: string}> = function ({title}) {
    const formattedBudget = formatCurrency(INITIAL_BUDGET);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center">
                <span className="navbar-brand mb-0 h1">{title}</span>
                <div className="text-end">
                    <span className="d-block text-uppercase small text-white-50">Total budget</span>
                    <span className="fw-semibold text-white">{formattedBudget}</span>
                </div>
            </div>
        </nav>
    );
};
