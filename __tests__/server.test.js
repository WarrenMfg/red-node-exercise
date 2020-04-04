import axios from 'axios';
import faker from 'faker';


describe('server receives and responds to requests', () => {

  test('it should receive and respond to a GET request', async () => {
    const records = await axios.get('http://localhost:50000/api/data/many/rank/asc')
      .then(res => res.data)
      .catch(err => console.log(err));

    // assumes database is seeded
    expect(records.length).toBeGreaterThan(0);

    // check each property on each record, and each value's type
    const map = new Map( Object.entries(records[0]) );
    records.forEach(record => {

      map.forEach((val, key) => {
        expect(record).toHaveProperty(key);
        if (key === 'rank' || key === 'score' || key === 'age') {
          expect(typeof val).toBe('number');
        } else if (key === 'name') {
          expect(typeof val).toBe('string');
        }
      });

    });
  });


  test('it should receive and respond to a valid POST request', async () => {
    // GET records first to compare
    const beforePOST = await axios.get('http://localhost:50000/api/data/many/rank/asc')
      .then(res => res.data)
      .catch(err => console.log(err));

    // make POST request
    const validRecord = {
      points: faker.random.number(999999),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number(100),
    };
    const afterPOST = await axios.post('http://localhost:50000/api/data/one/rank/asc', validRecord)
      .then(res => res.data)
      .catch(err => console.log(err));

    // ensure it was POSTED
    expect(beforePOST.length + 1).toBe(afterPOST.length);

    // ensure keys/values are same
    const newRecord = afterPOST.filter(record => {
      if (record.points === validRecord.points && record.name === validRecord.name && record.age === validRecord.age) {
        return record;
      }
    })[0];

    const map = new Map( Object.entries(validRecord) );
    map.forEach((val, key) => {
      expect(newRecord[key]).toBe(val);
    });

    // delete newRecord
    const afterDELETE = await axios.delete('http://localhost:50000/api/data/one/rank/asc', { data: newRecord })
      .then(res => res.data)
      .catch(err => console.log(err));
    
    expect(afterDELETE.length).toBe(beforePOST.length);
  });


  // test()
});

