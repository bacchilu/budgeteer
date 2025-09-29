import {Decimal} from 'decimal.js';
import React from 'react';

import {BudgetSummary, Card, Form, Header, Page} from './ui';

const INITIAL_BUDGET = new Decimal(210);

export const App = function () {
    const [remaining, setRemaining] = React.useState<Decimal>(INITIAL_BUDGET);

    const handleSubmit = function (amount: Decimal) {
        setRemaining(remaining.sub(amount));
    };

    return (
        <Page>
            <Header title="Budget tracker" description="Register costs against your fixed budget." />
            <Card>
                <BudgetSummary initialBudget={INITIAL_BUDGET} remaining={remaining} />
                <Form onSubmit={handleSubmit} />
            </Card>
        </Page>
    );
};
