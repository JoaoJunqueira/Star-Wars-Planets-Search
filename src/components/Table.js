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
