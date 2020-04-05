const sortByFirstNameAsc = (data) => {
  // return data sorted by first name, ascending
  return data.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
}; 


const sortByFirstNameDesc = (data) => {
  // return data sorted by first name, descending
  return data.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameB < nameA) {
      return -1;
    } else if (nameB > nameA) {
      return 1;
    } else {
      return 0;
    }
  });
};


const sortByLastNameAsc = (data) => {
  // return data sorted by last name, ascending
  return data.sort((a, b) => {
    // split and reverse names/middle initial
    let nameA = a.name.toLowerCase().split(' ').reverse();
    let nameB = b.name.toLowerCase().split(' ').reverse();

    // but move middle initial to end (assumes only one middle initial, if any)
    if (nameA.length === 3) {
      nameA.push(nameA.splice(1, 1)[0]);
    }
    if (nameB.length === 3) {
      nameB.push(nameB.splice(1, 1)[0]);
    }

    // join on space
    nameA = nameA.join(' ');
    nameB = nameB.join(' ');

    // sort
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
};


const sortByLastNameDesc = (data) => {
  // return data sorted by last name, descending
  return data.sort((a, b) => {
    // split and reverse names/middle initial
    let nameA = a.name.toLowerCase().split(' ').reverse();
    let nameB = b.name.toLowerCase().split(' ').reverse();

    // but move middle initial to end (assumes only one middle initial, if any)
    if (nameA.length === 3) {
      nameA.push(nameA.splice(1, 1)[0]);
    }
    if (nameB.length === 3) {
      nameB.push(nameB.splice(1, 1)[0]);
    }

    // join on space
    nameA = nameA.join(' ');
    nameB = nameB.join(' ');

    // sort
    if (nameB < nameA) {
      return -1;
    } else if (nameB > nameA) {
      return 1;
    } else {
      return 0;
    }
  });
};


const isValidRecord = (record) => {
  // is points valid?
  if (!(typeof record.points === 'number' && record.points >= 0 && record.points <= 999999)) {
    return false;
  }

  // is name a string?
  if (typeof record.name !== 'string') {
    return false;
  }

  // is age valid?
  if (!(typeof record.age === 'number' && record.age >= 0 && record.age <= 100)) {
    return false;
  }

  return true;
};


module.exports = {
  sortByFirstNameAsc,
  sortByFirstNameDesc,
  sortByLastNameAsc,
  sortByLastNameDesc,
  isValidRecord
};