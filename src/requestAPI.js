export default async function request() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const responseJson = await response.json();
  const data = responseJson.results;
  data.forEach((item) => delete item.residents);
  return data;
}
