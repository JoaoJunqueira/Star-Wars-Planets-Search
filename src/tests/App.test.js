import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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
  // beforeEach(() => {
  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(array),
  //   }));
  // })
  test('Testa se a requisição a API foi chamada', async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(array),
    }));
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(array).not.toHaveLength(0);
    expect(array).toHaveLength(10);
    // jest.clearAllMocks()
  });
  test.only('Testa se existe uma tabela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(array),
    }));
    await act (async () => {
      render(<App />);
    })
    expect(global.fetch).toHaveBeenCalled();
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    const planet = await screen.findByText('Tatooine');
    // expect(table).toHaveLength(1);
    expect(planet).toBeInTheDocument();
  });
  test('Testa o estado inicial dos filtros', () => {
    render(<App />);
    const columnFilter = screen.getByTestId(/column-filter/i);
    expect(columnFilter).toHaveValue('population');
    const valueFilter = screen.getByTestId(/value-filter/i);
    expect(valueFilter).toHaveValue(0);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    expect(comparisonFilter).toHaveValue('maior que');
    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);
  });
  test('Testa se o filtro por coluna é renderizado', () => {
    render(<App />);
    const columnFilter = screen.getByTestId(/column-filter/i);
    expect(columnFilter).toBeInTheDocument();
    expect(columnFilter).toHaveValue('population');
    userEvent.selectOptions(columnFilter, 'diameter');
    expect(columnFilter).toHaveValue('diameter');
    userEvent.selectOptions(columnFilter, 'orbital_period');
    expect(columnFilter).toHaveValue('orbital_period');
    userEvent.selectOptions(columnFilter, 'rotation_period');
    expect(columnFilter).toHaveValue('rotation_period');
    userEvent.selectOptions(columnFilter, 'surface_water');
    expect(columnFilter).toHaveValue('surface_water');
    userEvent.selectOptions(columnFilter, 'population');
    expect(columnFilter).toHaveValue('population');
  });
  test('Testa se o filtro por nome é renderizado', () => {
    render(<App />);
    const nameFilter = screen.getByTestId(/name-filter/i);
    expect(nameFilter).toBeInTheDocument();
    expect(nameFilter).toHaveValue('');
    userEvent.type(nameFilter, 'o');
    expect(nameFilter).toHaveValue('o');
    userEvent.type(nameFilter, 'o');
    expect(nameFilter).toHaveValue('oo');
  });
  test('Testa se o filtro por comparação é renderizado', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId(/button-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    expect(comparisonFilter).toBeInTheDocument();
    expect(comparisonFilter).toHaveValue('maior que');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    expect(comparisonFilter).toHaveValue('menor que');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    expect(comparisonFilter).toHaveValue('igual a');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    expect(comparisonFilter).toHaveValue('maior que');
    userEvent.click(buttonFilter);
  });
  test('Testa se o botão de filtro é renderizado', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId(/button-filter/i);
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
  });
  test('Testa se o filtro numérico é renderizado', () => {
    render(<App />);
    const valueFilter = screen.getByTestId(/value-filter/i);
    expect(valueFilter).toHaveValue(0);
    userEvent.type(valueFilter, '10');
    expect(valueFilter).toHaveValue(10);
  });
  test('Testa se a opção population desaparece após ser utilizada', () => {
    render(<App />);
    const columnFilter = screen.getByTestId(/column-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);
    const population = screen.getByText(/population/i);
    expect(columnFilter).toHaveValue('population');
    userEvent.click(buttonFilter);
    expect(columnFilter).not.toHaveValue('population');
    expect(population).not.toBeInTheDocument();
  });
  test('Testa o uso de 2 filtros', () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const columnFilter = screen.getByTestId(/column-filter/i);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.selectOptions(columnFilter, 'surface_water');
    expect(comparisonFilter).toHaveValue('menor que');
    expect(columnFilter).toHaveValue('surface_water');
    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);
    expect(comparisonFilter).toHaveValue('menor que');
    expect(columnFilter).toHaveValue('surface_water');
  });
  test('Testa o uso de 3 filtros', () => {
    render(<App />)
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const columnFilter = screen.getByTestId(/column-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.type(valueFilter, '10');
    expect(comparisonFilter).toHaveValue('menor que');
    expect(columnFilter).toHaveValue('surface_water');
    expect(valueFilter).toHaveValue(10);
    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);
    expect(comparisonFilter).toHaveValue('menor que');
    expect(columnFilter).toHaveValue('surface_water');
    expect(valueFilter).toHaveValue(10);
  });
  // test('', async () => {
  //   await act(async () => {
  //     render(<App />)
  //   });
  // })
});

// https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
// https://stackoverflow.com/questions/64718253/react-testing-library-how-to-find-text-in-the-document-which-is-updated-by-seti
// https://stackoverflow.com/questions/60289503/testing-select-element-in-react-with-jest
// https://github.com/tryber/sd-021-a-project-starwars-planets-search/blob/bruno-riwerson-silva-sd-021-a-project-starwars-planets-search/src/tests/App.test.js