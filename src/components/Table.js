import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const { state, filterByName, setName } = useContext(Context);

  let keys;
  if (state.length !== 0) {
    keys = Object.keys(state[0]);
  }

  useEffect(() => {
    setName(filterByName);
  }, [filterByName]);

  const filter1 = (item) => {
    if (filterByName !== '') {
      return item.name.includes(filterByName);
    }
    return item;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            { keys !== undefined
              ? keys.map((item) => <th key={ item }>{item}</th>) : null }
          </tr>
        </thead>
        <tbody>
          {
            keys !== undefined ? state.filter(filter1).map((item) => (
              <tr key={ item.name }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
