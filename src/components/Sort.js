import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Sort() {
  const { setOrder } = useContext(Context);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const handleRadio = (e) => {
    setSort(e.target.value);
  };

  const handleSelect = (e) => {
    setColumn(e.target.value);
  };

  const handleSort = () => {
    setOrder({ column, sort });
  };

  return (
    <form>
      <label htmlFor="column-sort">
        <select
          id="column-sort"
          data-testid="column-sort"
          onChange={ handleSelect }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          name="order"
          value="ASC"
          onChange={ handleRadio }
        />
        ASC
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          name="order"
          value="DESC"
          onChange={ handleRadio }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        ORDENAR
      </button>
    </form>
  );
}

export default Sort;
