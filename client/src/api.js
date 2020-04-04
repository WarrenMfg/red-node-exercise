import DEMO_RECORDS from "./data";

/**
 * @module API
 * @todo Configure GET function as needed to interact with the server
 * @todo Configure POST function as needed to interact with the server
 * @todo Configure DELETE function as needed to interact with the server
 * @todo Modify DATA_PROPS as needed to interact with the server
 * @todo Modify ORDERS as needed to interact with the server
 */

/**
 *  list of data object properties
 */
const DATA_PROPS = ["rank", "points", "name", "age"];

/**
 * list of possible order directions
 */
const ORDERS = ["asc", "desc"];

/**
 * GET function. It should get the data sorted by the provided key and order
 * @param {string} sortBy
 * @param {string} order
 */
function GET(sortBy, order) {
  // const blob = new Blob([JSON.stringify(DEMO_RECORDS)], {
  //     type: "application/json"
  // });
  // return Promise.resolve(new Response(blob, { status: 200 }));
  return fetch(`/api/data/many/${sortBy}/${order}`);
}

/**
 * POST function. It should send a new record
 * @param {object} record
 */
function POST(record, sortBy, order) {
  // const blob = new Blob([JSON.stringify(record)], {
  //   type: "application/json"
  // });
  // return Promise.resolve(new Response(blob, { status: 200 }));
  return fetch(`/api/data/one/${sortBy}/${order}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
  });
}

/**
 * DELETE function. It should send a delete request
 * @param {object} record
 */
function DELETE(record) {
  const blob = new Blob([JSON.stringify(record)], {
    type: "application/json"
  });
  return Promise.resolve(new Response(blob, { status: 200 }));
}

const api = {
  GET,
  POST,
  DELETE,
  DATA_PROPS,
  ORDERS
};

export default api;
