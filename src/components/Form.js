import React, { useContext } from 'react';
import Context from '../context/Context';

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
    options,
    setOptions,
    order,
    setOrder } = useContext(Context);

  const { column, comparison, value } = obj[0];

  const planets = state.map((planet) => planet);
  const attributes = options.map((option) => option);
  console.log(planets);
  console.log(attributes);
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

  const filter3 = (item) => item !== col;

  const handleClick = () => {
    const filtrado = state.filter(filter2);
    setState(filtrado);
    const newFilter = filterByNumericValues.concat(obj[0]);
    setValues(newFilter);
    if (col === 'population') {
      const optionFiltered = options.filter(filter3);
      setOptions(optionFiltered);
    }
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
      <label htmlFor="column-sort">
        <select
          id="column-sort"
          data-testid="column-sort"
          value={ order.column }
        >
          {
            options.map((option) => <option key={ option }>{option}</option>)
          }
        </select>
      </label>
    </form>
  );
}

export default Form;

// Referência
// https://pt-br.reactjs.org/docs/hooks-reference.html#useref // useRef
// https://daveceddia.com/useeffect-hook-examples/ // useRef
