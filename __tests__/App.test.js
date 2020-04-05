import App from '../client/src/App';
import api from '../client/src/api';


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
      error: null,
      httpLock: false
    };
    const instance = new App();

    expect(instance.state).toEqual(currentState);
  });
});