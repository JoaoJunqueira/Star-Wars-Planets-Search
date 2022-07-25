import React, { useContext } from 'react';
import Context from '../context/Context';

function Form() {
  const {
    state,
    setState,
    filterByName, setName, filterByNumericValues, setValues } = useContext(Context);
  const { column, comparison, value } = filterByNumericValues;
  // console.log(state);

  const handleColumn = (e) => {
    const obj = filterByNumericValues;
    obj[0].column = e.target.value;
    setValues(obj);
  };

  const handleComparison = (e) => {
    const obj = filterByNumericValues;
    obj[0].comparison = e.target.value;
    setValues(obj);
  };

  const handleValue = (e) => {
    const obj = filterByNumericValues;
    obj[0].value = Number(e.target.value);
    setValues(obj);
  };

  const filter2 = (item) => {
    const col = filterByNumericValues[0].column;
    const com = filterByNumericValues[0].comparison;
    const val = filterByNumericValues[0].value;
    console.log('item', col);
    // console.log(array[0]);
    // if (array[0].comparison === 'maior que'
    // && item[column] !== 'unknown'
    // && item[column] > Number(value)) {
    //   return item;
    // }
    if (com === 'maior que' && item[col] !== 'unknown') {
      return item[col] > Number(val);
    }
    if (com === 'menor que' && item[col] !== 'unknown') {
      return item[col] < Number(val);
    }
    if (com === 'igual a' && item[col] !== 'unknown') {
      // console.log(item[col], val);
      return Number(item[col]) === Number(val);
    }
  };

  const handleClick = () => {
    console.log(state);
    const filtrado = state.filter(filter2);
    setState(filtrado);
  };

  return (
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
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleComparison }
        >
          <option>igual a</option>
          <option>maior que</option>
          <option>menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          id="value-filter"
          data-testid="value-filter"
          type="number"
          value={ value }
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
    </form>
  );
}

export default Form;

// Referência
// https://pt-br.reactjs.org/docs/hooks-reference.html#useref // useRef
// https://daveceddia.com/useeffect-hook-examples/ // useRef
