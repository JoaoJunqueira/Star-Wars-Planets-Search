import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import request from '../requestAPI';
import Context from './Context';

const INITIAL_STATE = [];

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [filterByName, setName] = useState('');
  //
  const [filterByNumericValues, setValues] = useState([{
    column: 'population',
    comparison: 'igual a',
    value: 0,
  }]);

  useEffect(() => {
    const fetchRequest = async () => {
      const results = await request();
      setState(() => results);
    };
    fetchRequest();
  }, []);

  return (
    <Context.Provider
      value={
        { state,
          setState,
          filterByName,
          setName,
          filterByNumericValues,
          setValues }
        // setValues }
        // columnFilter,
        // setColumn,
        // comparison,
        // setComparison,
        // value,
        // setValue,
      }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
