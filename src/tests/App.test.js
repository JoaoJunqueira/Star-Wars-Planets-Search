import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

const array = [
  {name: 'Tatooine', rotation_period: '23', orbital_period: '304', diameter: '10465', climate: 'arid'},
  {name: 'Alderaan', rotation_period: '24', orbital_period: '364', diameter: '12500', climate: 'temperate'},
  {name: 'Yavin IV', rotation_period: '24', orbital_period: '4818', diameter: '10200', climate: 'temperate, tropical'},
  {name: 'Hoth', rotation_period: '23', orbital_period: '549', diameter: '7200', climate: 'frozen'},
  {name: 'Dagobah', rotation_period: '23', orbital_period: '341', diameter: '8900', climate: 'murky'},
  {name: 'Bespin', rotation_period: '12', orbital_period: '5110', diameter: '118000', climate: 'temperate'},
  {name: 'Endor', rotation_period: '18', orbital_period: '402', diameter: '4900', climate: 'temperate'},
  {name: 'Naboo', rotation_period: '26', orbital_period: '312', diameter: '12120', climate: 'temperate'},
  {name: 'Coruscant', rotation_period: '24', orbital_period: '368', diameter: '12240', climate: 'temperate'},
  {name: 'Kamino', rotation_period: '27', orbital_period: '463', diameter: '19720', climate: 'temperate'}
];

describe('Testes do projeto StarWars', () => {
  // retirar o setTimeout
  test('Testa se a requisição a API foi chamada', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(array),
    }));
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    jest.clearAllMocks()
  });
  // test('Testa se todos os items da tabela estão renderizados na página', () => {
  //   render(<App />);
  //   const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  //   const table = fetch(url).then((response) => response.json()).then((data) => console.log(data));
  //   setTimeout(() => {
  //     for(let i = 0; i < table.length; i += 1){
  //       const values = Object.values(table[i]);
  //       for(let j = 0; j < values.length; j += 1){
  //         expect(values[j]).toBeInTheDocument();
  //       }
  //     }
  //   }, 210)    
  // });
  // test('Testa a quantidade de colunas da tabela', () => {
  //   render(<App />);
  //   setTimeout(() => {
  //     const rows = screen.getAllByRole('row');
  //     expect(rows).toHaveLength(13);
  //   }, 210)
  // });
  // test('Testa se tem uma linha para cada planeta', () => {
  //   render(<App />);
  //   const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  //   const table = fetch(url).then((response) => response.json()).then((data) => console.log(data));
    // setTimeout(() => {
    //   const rows = screen.getAllByRole('row');
    //   for(let i = 1; i < rows.length; i += 1){
    //     expect(rows[i]).toHaveTextContent(table[i-1].name)
    //   }
    // }, 210)
  // });
  test('Testa se o filtro por nome é renderizado', () => {
    render(<App />);
    const nameFilter = screen.getByTestId(/name-filter/i);
    expect(nameFilter).toBeInTheDocument();
  });
  // mock
  // test('', () => {
  //   render(<App />);
  //   const nameFilter = screen.getByTestId(/name-filter/i);
  //   setTimeout(() => {
  //     userEvent.type(nameFilter, 'o')
  //     const rows = screen.getAllByRole('row');
  //   }, 210)
  //   expect(rows).toHaveLength(0);
  // });
  // test('', () => {
  //   render(<App />);
  //   const nameFilter = screen.getByTestId(/name-filter/i);
  //   setTimeout(() => {
  //     userEvent.type(nameFilter, 'oo')
  //     const rows = screen.getAllByRole('row');
  //     expect(rows).toHaveLength(3);
  //   }, 210)
  // });
  // test('', () => {
  //   render(<App />);
  //   const nameFilter = screen.getByTestId(/name-filter/i);
  //   setTimeout(() => {
  //     userEvent.type(nameFilter, 'o')
  //     const rows = screen.getAllByRole('row');
  //     expect(rows).toHaveLength(0);
  //   }, 210)
  // });
});
