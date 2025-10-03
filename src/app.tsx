import {Decimal} from 'decimal.js';
import React from 'react';

import {useBudgetData, type BudgetData} from './hooks/data';
import {BudgetDataProvider, useBudgetDataContext} from './hooks/data-context';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';
import {LoadingPage} from './ui/loading-page';

const Main: React.FC = function () {
    const budgetData: BudgetData = useBudgetDataContext();
    const [remaining, setRemaining] = React.useState<Decimal>(budgetData.initial_budget);

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

export const App = function () {
    const budgetData: BudgetData | undefined = useBudgetData();

    if (budgetData === undefined) return <LoadingPage body="Loading budget data..." />;
    return (
        <BudgetDataProvider value={budgetData}>
            <Main />
        </BudgetDataProvider>
    );
};
