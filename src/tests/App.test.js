import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

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
  test('Testa se existe uma tabela', async () => {
    // jest.setTimeout(7000);
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    console.log(results);
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000}) 
    const planet = await screen.findByText('Alderaan');
    expect(planet).toBeInTheDocument();
    jest.clearAllMocks();
  }, 7000);
  test('Testa o filtro de nome', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000}) 
    const nameFilter = screen.getByRole('textbox');
    const planet1 = await screen.findByText('Alderaan');
    userEvent.type(nameFilter, 'oo');
    expect(planet1).not.toBeInTheDocument();
    jest.clearAllMocks();
  }, 7000)
  test('Testando o primeiro if do filtro 2, no Form.js', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000})
    const valueFilter = screen.getByTestId(/value-filter/i);
    const planet = await screen.findByText('Yavin IV');
    userEvent.type(valueFilter, '1100');
    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);
    expect(planet).not.toBeInTheDocument();
    jest.clearAllMocks();
  }, 7000)
  test('Testando o segundo if do filtro 2, no Form.js', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000})
    const planet = await screen.findByText('Alderaan');

    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.type(valueFilter, '10');

    userEvent.click(buttonFilter);
    expect(planet).not.toBeInTheDocument();
    jest.clearAllMocks();
  }, 7000)
  test('Testando o segundo if do filtro 2, no Form.js', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000})
    const planet = await screen.findByText('Kamino');

    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.type(valueFilter, '100');

    userEvent.click(buttonFilter);
    expect(planet).toBeInTheDocument();
    jest.clearAllMocks();
  }, 7000)
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
    expect(columnFilter).toHaveValue('population');
    userEvent.click(buttonFilter);
    expect(columnFilter).not.toHaveValue('population');
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
  test('Testa os radio button', () => {
    render(<App />);
    const radio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(radio);
  })
  test('Testa o select para ordenar a lista', () => {
    render(<App />);
    const select = screen.getByTestId('column-sort');
    userEvent.selectOptions(select, 'surface_water');
  })
  test('Testando a ordenação ascendente', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000})

    const planets = await screen.findAllByTestId('planet-name');

    planets.forEach((planet) => expect(planet).toBeInTheDocument());

    const select = screen.getByTestId('column-sort');
    const radio1 = screen.getByTestId('column-sort-input-asc');
    const button = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(select, 'surface_water');
    userEvent.click(radio1);
    userEvent.click(button);

    jest.clearAllMocks();
  }, 7000)
  test('Testando a ordenação descendente', async () => {
    const array2 = await mockFetch();
    const response = await array2.json();
    const results = response.results;
    await waitFor(() => {
      render(<App />);
    }, {timeout: 5000})

    const planets = await screen.findAllByTestId('planet-name');

    planets.forEach((planet) => expect(planet).toBeInTheDocument());

    const select = screen.getByTestId('column-sort');
    const radio1 = screen.getByTestId('column-sort-input-desc');
    const button = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(select, 'surface_water');
    userEvent.click(radio1);
    userEvent.click(button);

    jest.clearAllMocks();
  }, 7000)
});

// https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
// https://stackoverflow.com/questions/64718253/react-testing-library-how-to-find-text-in-the-document-which-is-updated-by-seti
// https://stackoverflow.com/questions/60289503/testing-select-element-in-react-with-jest
// https://github.com/tryber/sd-021-a-project-starwars-planets-search/blob/bruno-riwerson-silva-sd-021-a-project-starwars-planets-search/src/tests/App.test.js