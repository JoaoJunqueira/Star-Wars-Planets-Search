import React, { useContext } from 'react';
import Context from '../context/Context';
import { dataFilter } from '../helpers/helper';

function Form() {
  const {
    state,
    setState,
    filterByName,
    setName,
    filterByNumericValues,
    setValues,
    obj,
    setObj,
    stateBackup,
    options,
    setOptions } = useContext(Context);

  const { column, comparison, value } = obj[0];

  const obj2 = obj[0];
  const col = obj[0].column;
  const com = obj[0].comparison;
  const val = obj[0].value;

  const handleColumn = (e) => {
    obj2.column = e.target.value;
    setObj([obj2]);
  };

  const handleComparison = (e) => {
    obj2.comparison = e.target.value;
    setObj([obj2]);
  };

  const handleValue = (e) => {
    obj2.value = e.target.value;
    setObj([obj2]);
  };

  const filter2 = (item) => {
    if (com === 'maior que' && item[col] !== 'unknown') {
      return item[col] > Number(val);
    }
    if (com === 'menor que' && item[col] !== 'unknown') {
      return item[col] < Number(val);
    }
    if (com === 'igual a' && item[col] !== 'unknown') {
      return Number(item[col]) === Number(val);
    }
  };

  const filter3 = (item) => item !== obj[0].column;

  const handleClick = () => {
    const filtrado = state.filter(filter2);
    setState(filtrado);

    const newFilter = filterByNumericValues.concat(obj[0]);
    setValues(newFilter);

    // filterFunction();

    const optionFiltered = options.filter(filter3);
    setOptions(optionFiltered);

    setObj([{ ...obj[0], column: optionFiltered[0] }]);
  };

  const removeAll = () => {
    setState(stateBackup);
    setOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    setValues([]);
  };

  const removeOne = (filterToRemove) => {
    const filterUpdate = filterByNumericValues.filter(
      (filterRemoved) => filterRemoved.column !== filterToRemove.column,
    );
    setValues(filterUpdate);
    setOptions([...options, filterToRemove.column]);
    const data = dataFilter(stateBackup, filterUpdate);
    setState(data);
  };

  return (
    <div>
      <form>
        <label htmlFor="name-filter">
          <input
            id="name-filter"
            data-testid="name-filter"
            type="text"
            value={ filterByName }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="column-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            value={ column }
            onChange={ handleColumn }
          >
            {
              options.map((option) => <option key={ option }>{option}</option>)
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ handleComparison }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            id="value-filter"
            data-testid="value-filter"
            type="number"
            value={ value }
            defaultValue={ 0 }
            onChange={ handleValue }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Ativar Filtro
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover todas filtragens
        </button>
      </form>
      {
        filterByNumericValues.map((filters, index) => (
          <span key={ index } data-testid="filter">
            <h6>
              <span>{filters.column}</span>
              <span>{filters.comparison}</span>
              <span>{filters.value}</span>
            </h6>
            <button type="button" onClick={ () => removeOne(filters) }>
              X
            </button>
          </span>
        ))
      }
    </div>
  );
}

export default Form;

// Referência
// https://pt-br.reactjs.org/docs/hooks-reference.html#useref // useRef
// https://daveceddia.com/useeffect-hook-examples/ // useRef
