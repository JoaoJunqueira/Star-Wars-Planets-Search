export default async function request() {
  const url = 'https://swapi.dev/api/planets/';
  const response = await fetch(url);
  const responseJson = await response.json();
  const data = responseJson.results;
  data.forEach((item) => delete item.residents);
  data.forEach((item) => delete item.edited);
  data.forEach((item) => delete item.films);
  data.forEach((item) => delete item.created);
  data.forEach((item) => delete item.url);
  return data;
}
