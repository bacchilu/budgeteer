import {Decimal} from 'decimal.js';
import React from 'react';

import {useBudgetData, type BudgetData} from './hooks/data';
import {BudgetDataProvider} from './hooks/data-context';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';
import {LoadingPage} from './ui/loading-page';

const Main: React.FC = function () {
    const [spentAmount, setSpentAmount] = React.useState<Decimal>(new Decimal('0'));

    const handleSubmit = function (amount: Decimal) {
        setSpentAmount(spentAmount.add(amount));
    };

    return (
        <>
            <Navbar title="Budget tracker" />
            <Page>
                <Header description="Register costs against your fixed budget." />
                <Card>
                    <BudgetSummary spentAmount={spentAmount} />
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
