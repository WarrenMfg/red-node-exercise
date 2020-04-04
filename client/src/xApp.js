import React from "react";
import Table from "./components/Table";
import { handleErrors, wait } from "./utils";
import api from "./api";
import faker from "faker";
import ErrorPrompt from "./components/Error";

const App = () => {
    const [sortBy, setSortBy] = React.useState(api.DATA_PROPS[0]);
    const [order, setOrder] = React.useState(api.ORDERS[0]);
    const [error, setError] = React.useState();
    const [dummy, setDummy] = React.useState(0);
    const [lastFetchTS, setLastFetchTS] = React.useState();
    const refresh = React.useCallback(() => setDummy(Date.now()), [setDummy]);
    const [records, setRecords] = React.useState();

    const handleKeyClick = React.useCallback(
        value => {
            if (sortBy === value) {
                setOrder(o =>
                    o === api.ORDERS[0] ? api.ORDERS[1] : api.ORDERS[0]
                );
            } else {
                setSortBy(value);
                setOrder(api.ORDERS[0]);
            }
        },
        [sortBy, setSortBy, setOrder]
    );

    const handleAddRandomRecord = React.useCallback(() => {
        const record = {
            points: faker.random.number(999999),
            name: `${faker.name.firstName} ${faker.name.lastName}`,
            age: faker.random.number(100)
        };
        api.POST(record)
            .then(handleErrors)
            .then(() => console.log("[APP]", "record created", record))
            .then(refresh)
            .catch(setError);
    }, [refresh]);

    const handleAddBadRecord = React.useCallback(() => {
        const record = {
            points: "A lot of points",
            name: undefined,
            age: faker.random.number(100) + 1000
        };
        api.POST(record)
            .then(handleErrors)
            .then(() => console.log("[APP]", "record created", record))
            .then(refresh)
            .catch(setError);
    }, [refresh]);

    const handleDeleteRecord = React.useCallback(
        record => {
            api.DELETE(record)
                .then(handleErrors)
                .then(() => console.log("[APP]", "record deleted", record))
                .then(refresh)
                .catch(setError);
        },
        [refresh]
    );

    React.useEffect(() => {
        setRecords();
        setError();

        api.GET(sortBy, order)
            .then(handleErrors)
            .then(r => r.json())
            .then(wait(1000))
            .then(setRecords)
            .then(() => setLastFetchTS(Date.now()))
            .catch(setError);
    }, [sortBy, order, dummy]);

    return (
        <div className="container">
            <header className="text-center my-4">
                <h1>Leaderboard</h1>
                <button onClick={handleAddRandomRecord}>
                    Add Random Record
                </button>
                <button onClick={handleAddBadRecord}>Add Bad Record</button>
                <ErrorPrompt error={error} />
            </header>
            <div className="mb-3">
                {!records && !error ? "Loading ..." : `Last Fetch: ${new Date(lastFetchTS)}`}
            </div>
            <Table
                onKeyClick={handleKeyClick}
                onDeleteClick={handleDeleteRecord}
                dataKeys={api.DATA_PROPS}
                sortBy={sortBy}
                order={order}
                records={records}
            />
        </div>
    );
};

export default App;
