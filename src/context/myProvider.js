import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import request from '../requestAPI';
import Context from './Context';

const INITIAL_STATE = [];

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [filterByName, setName] = useState('');
  const [filterByNumericValues, setValues] = useState([]);
  const [obj, setObj] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }]);
  // const [order, setOrder] = useState({
  //   order: {
  //     column: 'population',
  //     sort: 'ASC',
  //   },
  // });

  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

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
          setValues,
          obj,
          setObj,
          options,
          setOptions }
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
