import {Decimal} from 'decimal.js';
import React from 'react';

import {INITIAL_BUDGET} from './lib/total-budget';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';

export const App = function () {
    const [remaining, setRemaining] = React.useState<Decimal>(INITIAL_BUDGET);

    const handleSubmit = function (amount: Decimal) {
        setRemaining(remaining.sub(amount));
    };

    return (
        <>
            <Navbar title="Budget tracker" />
            <Page>
                <Header description="Register costs against your fixed budget." />
                <Card>
                    <BudgetSummary initialBudget={INITIAL_BUDGET} remaining={remaining} />
                    <Form onSubmit={handleSubmit} />
                </Card>
            </Page>
        </>
    );
};
