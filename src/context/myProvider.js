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

  const [order, setOrder] = useState(
    {
      column: 'population',
      sort: '',
    },
  );

  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const sortName = (a, b) => {
    const minus = -1;
    if (a.name > b.name) {
      return 1;
    }
    return minus;
  };

  useEffect(() => {
    const fetchRequest = async () => {
      const results = await request();
      setState(() => results.sort(sortName));
    };
    fetchRequest();
  }, []);

  const comparatorAsc = (a, b) => {
    const minus = -1;
    if (Number(a[order.column]) > Number(b[order.column])) {
      return 1;
    }
    if (a[order.column] === 'unknown'
    || Number(a[order.column]) < Number(b[order.column])) {
      return minus;
    }
    return 0;
  };

  const comparatorDesc = (a, b) => {
    const minus = -1;
    if (b[order.column] === 'unknown'
    || Number(a[order.column]) > Number(b[order.column])) {
      return minus;
    }
    if (a[order.column] === 'unknown'
    || Number(a[order.column]) < Number(b[order.column])) {
      return 1;
    }
    return 0;
  };

  let stateSort = state;

  if (order.sort === 'ASC') {
    stateSort = state.sort(comparatorAsc);
  }

  if (order.sort === 'DESC') {
    stateSort = state.sort(comparatorDesc);
  }

  return (
    <Context.Provider
      value={
        { state: stateSort,
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
          setOrder }
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
