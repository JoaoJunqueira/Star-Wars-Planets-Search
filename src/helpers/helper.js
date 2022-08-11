export const dataFilter = (stateBackup, filterUpdate) => {
  let data = [...stateBackup];
  filterUpdate.forEach((filterToData) => {
    data = data.filter((planet) => {
      if (filterToData.comparison === 'maior que'
      && planet[filterToData.column] !== 'unknown') {
        return Number(planet[filterToData.column]) > Number(filterToData.value);
      }
      if (filterToData.comparison === 'menor que'
      && planet[filterToData.column] !== 'unknown') {
        return Number(planet[filterToData.column]) < Number(filterToData.value);
      }
      if (filterToData.comparison === 'igual a'
      && planet[filterToData.column] !== 'unknown') {
        return Number(planet[filterToData.column]) === Number(filterToData.value);
      }
      return true;
    });
  });
  return data;
};

export const constante = 1;
