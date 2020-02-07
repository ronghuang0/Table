export const filterData = (data, filters) => {
  if (filters.length === 0) {
    return data;
  }
  return data.filter((element) => filters.includes(element.tag));
};

export const reverseDirection = (direction) => {
  if (direction === 'up') {
    return 'down';
  }
  return 'up'; // empty string defaults to up
};

export const sortData = (data, tag, direction) => {
  if (tag === '') {
    return;
  }
  data.sort((a, b) => {
    if (a[tag] < b[tag]) {
      return direction === 'up' ? -1 : 1;
    }
    if (a[tag] > b[tag]) {
      return direction === 'up' ? 1 : -1;
    }
    return 0;
  });
};
