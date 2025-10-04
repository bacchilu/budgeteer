import {Decimal} from 'decimal.js';
import React from 'react';

import {useBudgetData, type BudgetData} from './hooks/data';
import {BudgetDataProvider} from './hooks/data-context';
import {BudgetSummary, Card, Form, Header, Navbar, Page} from './ui';
import {LoadingPage} from './ui/loading-page';

const Main: React.FC = function () {
    const [transactions, setTransactions] = React.useState<Decimal[]>([]);

    const handleSubmit = function (amount: Decimal) {
        setTransactions([...transactions, amount]);
    };

    const transactionsTotal: Decimal = transactions.reduce(
        (acc: Decimal, current: Decimal) => acc.add(current),
        new Decimal('0')
    );

    return (
        <>
            <Navbar title="Budget tracker" />
            <Page>
                <Header description="Register costs against your fixed budget." />
                <Card>
                    <BudgetSummary spentAmount={transactionsTotal} />
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
