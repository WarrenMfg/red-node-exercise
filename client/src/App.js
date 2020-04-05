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
      error: null,
      httpLock: false
    };

    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.handleAddRandomRecord = this.handleAddRandomRecord.bind(this);
    this.handleAddBadRecord = this.handleAddBadRecord.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {
    const { sortBy, order } = this.state;
    this.GET(sortBy, order);
  }

  // API
  GET(sortBy, order) {
    api.GET(sortBy, order)
      .then(handleErrors)
      .then(res => res.json())
      .then(wait(1000))
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .catch(error => this.setState({ error }));
  }

  POST(record, sortBy, order) {
    if (this.state.httpLock) {
      return;
    }

    this.setState({ httpLock: true });

    api.POST(record, sortBy, order)
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .then(wait(1000))
      .then(() => this.setState({ httpLock: false }))
      .catch( () => this.setState({ error: { message: 'Bad record' }, httpLock: false }) );
  }

  DELETE(record, sortBy, order) {
    if (this.state.httpLock) {
      return;
    }

    this.setState({ httpLock: true });

    api.DELETE(record, sortBy, order)
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .then(wait(1000))
      .then(() => this.setState({ httpLock: false }))
      .catch(error => this.setState({ error, httpLock:false }));
  }

  // CLICK HANDLERS
  handleKeyClick(k) {
    const { sortBy, order } = this.state;
    let i = 0;

    // if click occurs on current sortBy column, then user wants to switch between 'asc' and 'desc'
    if (k === sortBy) {
      i = order === 'asc' ? 1 : 0;
    }

    // empty records array so that 'Loading...' text displays during setTimeout
    this.setState({ records: [], sortBy: k, order: api.ORDERS[i] });
    // GET all records (assuming multiple clients can add/delete records)
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
    const { sortBy, order } = this.state;
    const record = {
      points: "A lot of points",
      name: undefined,
      age: faker.random.number(100) + 1000
    };
    
    this.POST(record, sortBy, order);
  }

  handleDeleteRecord(record) {
    const { sortBy, order } = this.state;
    this.DELETE(record, sortBy, order);
  }

  // UI
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
          {!records.length && !error ? "Loading ..." : `Last Fetch: ${new Date(lastFetchTS)}`}
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

export default App;
