import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import request from '../requestAPI';
import Context from './Context';

const INITIAL_STATE = [];

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [filterByName, setName] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      const results = await request();
      setState(() => results);
    };
    fetchRequest();
  }, []);

  return (
    <Context.Provider value={ { state, filterByName, setName } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
