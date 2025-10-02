import {Decimal} from 'decimal.js';
import React from 'react';

import {useInitialBudget} from './hooks/data';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';

export const App = function () {
    const {initial_budget} = useInitialBudget();
    const [remaining, setRemaining] = React.useState<Decimal>(initial_budget);

    const handleSubmit = function (amount: Decimal) {
        setRemaining(remaining.sub(amount));
    };

    return (
        <>
            <Navbar title="Budget tracker" />
            <Page>
                <Header description="Register costs against your fixed budget." />
                <Card>
                    <BudgetSummary remaining={remaining} />
                    <Form onSubmit={handleSubmit} />
                </Card>
            </Page>
        </>
    );
};
