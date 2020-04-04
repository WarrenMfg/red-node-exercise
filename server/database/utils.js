const sortByFirstNameAsc = (data) => {
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
  return data.sort((a, b) => {
    let nameA = a.name.toLowerCase().split(' ').reverse();
    let nameB = b.name.toLowerCase().split(' ').reverse();

    // move middle initial to end
    if (nameA.length === 3) {
      nameA.push(nameA.splice(1, 1)[0]);
    }
    if (nameB.length === 3) {
      nameB.push(nameB.splice(1, 1)[0]);
    }
    nameA = nameA.join(' ');
    nameB = nameB.join(' ');

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
  return data.sort((a, b) => {
    let nameA = a.name.toLowerCase().split(' ').reverse();
    let nameB = b.name.toLowerCase().split(' ').reverse();

    // move middle initial to end
    if (nameA.length === 3) {
      nameA.push(nameA.splice(1, 1)[0]);
    }
    if (nameB.length === 3) {
      nameB.push(nameB.splice(1, 1)[0]);
    }
    nameA = nameA.join(' ');
    nameB = nameB.join(' ');

    if (nameB < nameA) {
      return -1;
    } else if (nameB > nameA) {
      return 1;
    } else {
      return 0;
    }
  });
};

module.exports = {
  sortByFirstNameAsc,
  sortByFirstNameDesc,
  sortByLastNameAsc,
  sortByLastNameDesc
};