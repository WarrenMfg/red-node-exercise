import axios from 'axios';
import faker from 'faker';

const GET = () => {
  return axios.get('http://localhost:50000/api/data/many/rank/asc')
    .then(res => res.data)
    .catch(err => console.log(err));
};

const POST = (record) => {
  return axios.post('http://localhost:50000/api/data/one/rank/asc', record)
    .then(res => res.data)
    .catch(err => console.log(err));
};

const DELETE = (record) => {
  return axios.delete('http://localhost:50000/api/data/one/rank/asc', { data: record })
    .then(res => res.data)
    .catch(err => console.log(err));
};


describe('server receives and responds to requests', () => {

  test('it should receive and respond to a GET request', async () => {
    const records = await GET();

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
    const beforePOST = await GET();

    // make POST request
    const validRecord = {
      points: faker.random.number(999999),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number(100),
    };
    // POST returns all records
    const afterPOST = await POST(validRecord);

    // ensure additional record is present
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
  });


  test('it should update ranks after a valid POST request', async () => {
    // GET records first to compare
    const beforePOST = await GET();

    // ensure consecutive ranks
    beforePOST.forEach((record, i, arr) => {
      expect(record.rank).toBe(i + 1);
      // ensure points descend
      if (i < arr.length - 1) {
        expect(record.points).toBeGreaterThanOrEqual(arr[i + 1].points);
      }
    });

    // make POST request
    const validRecord = {
      points: faker.random.number(999999),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number(100),
    };
    const afterPOST = await POST(validRecord);

    // ensure consecutive ranks
    afterPOST.forEach((record, i, arr) => {
      expect(record.rank).toBe(i + 1);
      // ensure points descend
      if (i < arr.length - 1) {
        expect(record.points).toBeGreaterThanOrEqual(arr[i + 1].points);
      }
    });
  });


  test('it should receive and respond to an invalid POST request', async () => {
    // make invalid POST request
    const invalidRecord = {
      points: "A lot of points",
      name: undefined,
      age: faker.random.number(100) + 1000
    };
    // cannot use POST() function above because err needs to be returned
    const POSTattempt = await axios.post('http://localhost:50000/api/data/one/rank/asc', invalidRecord)
      .then(res => res.data)
      .catch(err => err);

    // ensure response status === 400
    expect(POSTattempt.response.status).toBe(400);
  });


  test('it should not update ranks after an invalid POST request', async () => {
    // GET records first to compare
    const beforePOST = await GET();

    // make invalid POST request
    const invalidRecord = {
      points: "A lot of points",
      name: undefined,
      age: faker.random.number(100) + 1000
    };
    // cannot use POST() function above because err needs to be returned instead of logged
    await axios.post('http://localhost:50000/api/data/one/rank/asc', invalidRecord)
      .then(res => res.data)
      .catch(err => err);

    // compare before and after for equality
    const afterPOST = await GET();
    expect(beforePOST).toEqual(afterPOST);
  });


  test('it should receive and respond to a DELETE request', async () => {
    // GET records first to compare
    const beforeDELETE = await GET();
    
    const deletedRecord = beforeDELETE[0];

    // DELETE returns updated array of all records
    const afterDELETE = await DELETE(deletedRecord);

    // compare to ensure deletedRecord was deleted
    expect(beforeDELETE.length - 1).toBe(afterDELETE.length);
    expect(afterDELETE).not.toContain(deletedRecord);
  });


  test('it should update ranks after a DELETE request', async () => {
    // GET records first to compare
    const beforeDELETE = await GET();
    
    // ensure consecutive ranks
    beforeDELETE.forEach((record, i, arr) => {
      expect(record.rank).toBe(i + 1);
      // ensure points descend
      if (i < arr.length - 1) {
        expect(record.points).toBeGreaterThanOrEqual(arr[i + 1].points);
      }
    });
    
    const deletedRecord = beforeDELETE[0];

    // DELETE returns updated array of all records
    const afterDELETE = await DELETE(deletedRecord);

    // ensure consecutive ranks
    afterDELETE.forEach((record, i, arr) => {
      expect(record.rank).toBe(i + 1);
      // ensure points descend
      if (i < arr.length - 1) {
        expect(record.points).toBeGreaterThanOrEqual(arr[i + 1].points);
      }
    });
  });

});

