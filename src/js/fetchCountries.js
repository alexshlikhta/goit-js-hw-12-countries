export default function fetchCountries(searchQuery) {
	const BASE_URL = 'https://restcountries.com/v2/';

	let end_point = 'name/',
		clientQuery = searchQuery,
		url = BASE_URL + end_point + `${clientQuery}/`;

	return fetch(url)
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
}
