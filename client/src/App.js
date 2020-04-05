import React from "react";
import Table from "./components/Table";
import { handleErrors } from "./utils";
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
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .catch(error => this.setState({ error }));
  }

  POST(record, sortBy, order) {
    api.POST(record, sortBy, order)
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .catch( () => this.setState({ error: { message: 'Bad record' } }) );
  }

  DELETE(record, sortBy, order) {
    api.DELETE(record, sortBy, order)
      .then(handleErrors)
      .then(res => res.json())
      .then(records => this.setState({ records, lastFetchTS: Date.now(), error: null }))
      .catch(error => this.setState({ error }));
  }

  // CLICK HANDLERS
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

export default App;
