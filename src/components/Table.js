import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const value = useContext(Context);
  let keys;
  if (value.length !== 0) {
    keys = Object.keys(value[0]);
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            { keys !== undefined
              ? keys.map((item) => <td key={ item }>{item}</td>) : null }
          </tr>
          {
            keys !== undefined ? value.map((item) => (
              <tr key={ item.name }>
                <th>{item.name}</th>
                <th>{item.rotation_period}</th>
                <th>{item.orbital_period}</th>
                <th>{item.diameter}</th>
                <th>{item.climate}</th>
                <th>{item.gravity}</th>
                <th>{item.terrain}</th>
                <th>{item.surface_water}</th>
                <th>{item.population}</th>
                <th>{item.films}</th>
                <th>{item.created}</th>
                <th>{item.edited}</th>
                <th>{item.url}</th>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
