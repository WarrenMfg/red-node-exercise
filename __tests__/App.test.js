// import { render } from 'enzyme';
// import React from 'react';
import { JSDOM } from 'jsdom';
// import { readFile } from 'fs';
// import { resolve } from 'path';
// import bundle from '../client/public/bundle.js';
import App from '../client/src/App';
// import Table from '../client/src/components/Table';
import api from '../client/src/api';

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>JSDOM</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="../client/public/bundle.js"></script>
  </body>
</html>
`;

let document = (new JSDOM(`"${html}"`, { resources: 'usable', runScripts: 'dangerously', includeNodeLocations: true })).window.document;
console.log('>>> DOCUMENT >>>', document);



describe('App.js exists, it is an instance of a class, and its methods and state exist', () => {

  test('it should exist', () => {
    expect(new App()).toBeDefined();
  });

  test('it should be an instance of a class', () => {
    expect(new App()).toBeInstanceOf(App);
  });

  test('it should have 9 methods', () => {
    const instance = new App();
    expect(typeof instance.componentDidMount).toBe('function');
    expect(typeof instance.GET).toBe('function');
    expect(typeof instance.POST).toBe('function');
    expect(typeof instance.DELETE).toBe('function');
    expect(typeof instance.handleKeyClick).toBe('function');
    expect(typeof instance.handleAddRandomRecord).toBe('function');
    expect(typeof instance.handleAddBadRecord).toBe('function');
    expect(typeof instance.handleDeleteRecord).toBe('function');
    expect(typeof instance.render).toBe('function');
  });

  test('it should have state', () => {
    const currentState = {
      records: [],
      sortBy: api.DATA_PROPS[0],
      order: api.ORDERS[0],
      lastFetchTS: null,
      error: null
    };
    const instance = new App();

    expect(instance.state).toEqual(currentState);
  });
});


// ENZYME
// describe('App.js', () => {
//   it('App.js renders', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find(Table)).to.have.lengthOf(1);
//   });
// });


// JSDOM
describe('JSDOM should render HTML', () => {

  test('it should query the "container" className', () => {
    // const container = document.querySelector('.container');
    // console.log('>>> document >>>', JSON.stringify(document));
    // expect(container.length).toBeGreaterThan(0);
  });
});