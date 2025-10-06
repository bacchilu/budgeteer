import {Decimal} from 'decimal.js';
import React from 'react';

import {BudgetDataProvider} from './hooks/data-provider';
import {useBudgetData, type BudgetData} from './hooks/use-data';
import {useBudgetDataContext} from './hooks/use-data-context';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';
import {LoadingPage} from './ui/loading-page';

const Main: React.FC = function () {
    const {actions} = useBudgetDataContext();

    const handleSubmit = function (amount: Decimal) {
        actions.addTransaction(amount);
    };

    return (
        <>
            <Navbar title="Budget tracker" />
            <Page>
                <Header description="Register costs against your fixed budget." />
                <Card>
                    <BudgetSummary spentAmount={actions.getTransactionsTotal()} />
                    <Form onSubmit={handleSubmit} />
                </Card>
            </Page>
        </>
    );
};

export const App = function () {
    const budgetData: BudgetData | undefined = useBudgetData();

    if (budgetData === undefined) return <LoadingPage body="Loading budget data..." />;
    console.log(budgetData);
    return (
        <BudgetDataProvider value={budgetData}>
            <Main />
        </BudgetDataProvider>
    );
};
