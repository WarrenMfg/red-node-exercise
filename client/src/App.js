import React from "react";
import Table from "./components/Table";
import { handleErrors, wait } from "./utils";
import api from "./api";
import faker from "faker";
import ErrorPrompt from "./components/Error";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      records: [],
      sortBy: api.DATA_PROPS[0],
      order: api.ORDERS[0],
      lastFetchTS: null,
      error: null
    };

    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.handleAddRandomRecord = this.handleAddRandomRecord.bind(this);
    this.handleAddBadRecord = this.handleAddBadRecord.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  }

  componentDidMount() {
    const { sortBy, order } = this.state;
    this.GET(sortBy, order);
  }

  // API
  GET(sortBy, order) {
    fetch(`/api/data/many/${sortBy}/${order}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now() }))
      .catch(error => this.setState({ error }));
  }

  POST(record, sortBy, order) {
    fetch(`/api/data/one/${sortBy}/${order}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now() }))
      .catch(error => this.setState({ error }));
  }

  DELETE(record, sortBy, order) {
    fetch(`/api/data/one/${sortBy}/${order}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now() }))
      .catch(error => this.setState({ error }));
  }

  handleKeyClick(k) {
    const { sortBy, order } = this.state;
    let i = 0;

    if (k === sortBy) {
      i = order === 'asc' ? 1 : 0;
      this.setState({ order: api.ORDERS[i] });
    } else {
      this.setState({ sortBy: k, order: api.ORDERS[0] });
    }

    this.GET(k, api.ORDERS[i]);
  }

  handleAddRandomRecord() {
    const { sortBy, order } = this.state;
    const record = {
      points: faker.random.number(999999),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number(100)
    };

    this.POST(record, sortBy, order);
  }

  handleAddBadRecord() {
    const record = {
      points: "A lot of points",
      name: undefined,
      age: faker.random.number(100) + 1000
    };
      api.POST(record)
        .then(handleErrors)
        .then(() => console.log("[APP]", "record created", record))
        .then(() => setRecords(prevRecords => [...prevRecords, record]))
        .then(refresh)
        .catch(setError);
  }

  handleDeleteRecord(record) {
    const { sortBy, order } = this.state;

    this.DELETE(record, sortBy, order);
  }

  render() {
    const { records, sortBy, order, lastFetchTS, error } = this.state;
    return (
      <div className="container">
        <header className="text-center my-4">
          <h1>Leaderboard</h1>
          <button onClick={this.handleAddRandomRecord}>
            Add Random Record
            </button>
          <button onClick={this.handleAddBadRecord}>Add Bad Record</button>
          <ErrorPrompt error={error} />
        </header>
        <div className="mb-3">
          {!records && !error ? "Loading ..." : `Last Fetch: ${new Date(lastFetchTS)}`}
        </div>
        <Table
          onKeyClick={this.handleKeyClick} 
          onDeleteClick={this.handleDeleteRecord}
          dataKeys={api.DATA_PROPS} 
          sortBy={sortBy} 
          order={order} 
          records={records} 
        />
      </div>
    );
  }
}
/*
const App = () => {
  const [sortBy, setSortBy] = React.useState(api.DATA_PROPS[0]);
  const [order, setOrder] = React.useState(api.ORDERS[0]);
  const [error, setError] = React.useState();
  // const [dummy, setDummy] = React.useState(0);
  const [lastFetchTS, setLastFetchTS] = React.useState();
  // const refresh = React.useCallback(() => setDummy(Date.now()), [setDummy]);
  const [records, setRecords] = React.useState();

  // const handleKeyClick = React.useCallback(
  //   value => {
  //     if (sortBy === value) {
  //       setOrder(o =>
  //         o === api.ORDERS[0] ? api.ORDERS[1] : api.ORDERS[0]
  //       );
  //     } else {
  //       setSortBy(value);
  //       setOrder(api.ORDERS[0]);
  //     }
  //   },
  //   [sortBy, setSortBy, setOrder]
  // );

  // const handleAddRandomRecord = React.useCallback(() => {
  //   const record = {
  //     // rank: ascertained from data.js that rank is not based on points
  //     points: faker.random.number(999999),
  //     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //     age: faker.random.number(100)
  //   };
  //   api.POST(record)
  //     .then(handleErrors)
  //     .then(() => console.log("[APP]", "record created", record))
  //     .then(refresh)
  //     .catch(setError);
  // }, [refresh]);

  const handleAddBadRecord = React.useCallback(() => {
    const record = {
      points: "A lot of points",
      name: undefined,
      age: faker.random.number(100) + 1000
    };
    api.POST(record)
      .then(handleErrors)
      .then(() => console.log("[APP]", "record created", record))
      .then(() => setRecords(prevRecords => [...prevRecords, record]))
      .then(refresh)
      .catch(setError);
  }, [refresh]);

  // const handleDeleteRecord = React.useCallback(
  //   record => {
  //     api.DELETE(record)
  //       .then(handleErrors)
  //       .then(() => console.log("[APP]", "record deleted", record))
  //       .then(refresh)
  //       .catch(setError);
  //   },
  //   [refresh]
  // );

  // React.useEffect(() => {
  //   setRecords();
  //   setError();

  //   api.GET(sortBy, order)
  //     .then(handleErrors)
  //     .then(r => r.json())
  //     .then(wait(1000))
  //     .then(setRecords)
  //     .then(() => setLastFetchTS(Date.now()))
  //     .catch(setError);
  // }, [sortBy, order]); // [sortBy, order, dummy]


};
*/

export default App;
