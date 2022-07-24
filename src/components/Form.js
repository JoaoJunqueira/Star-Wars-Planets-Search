import React, { useContext } from 'react';
// import React from 'react';
import Context from '../context/Context';

function Form() {
  const { filterByName, setName } = useContext(Context);

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
    </form>
  );
}

export default Form;

// Referência
// https://pt-br.reactjs.org/docs/hooks-reference.html#useref // useRef
// https://daveceddia.com/useeffect-hook-examples/ // useRef
