import refs from './refs.js';
import fetchCountries from './fetchCountries.js';
import countriesMarkup from '../templates/countriesListMarkup.handlebars';
import countryMarkup from '../templates/countryMarkup.handlebars';
var debounce = require('lodash.debounce');
import { alert, notice, info, success, error } from '@pnotify/core';

export default function () {
	const { inputField, searchResultsBox } = refs;

	let userQuery, markup;

	function getCountriesMarkup(countries) {
		if (countries.length <= 10 && countries.length >= 2) {
			markup = countriesMarkup(countries);
		} else if (countries.length === 1) {
			markup = countryMarkup(countries);
		} else {
			showErrorNotification();
			return;
		}

		searchResultsBox.innerHTML = markup;
	}

	function cleanCountriesMarkup() {
		searchResultsBox.innerHTML = '';
	}

	function showErrorNotification() {
		error({
			text: 'Nothing was found by your query!',
			type: 'error',
			width: '60vw',
			closer: false,
			sticker: false,
			delay: 1500,
		});
	}

	function showInfoNotification() {
		notice({
			text: 'Too many matches found. Please enter more specific query!',
			type: 'notice',
			width: '60vw',
			closer: false,
			sticker: false,
			delay: 1500,
		});
	}

	function getCountries(userQuery) {
		fetchCountries(userQuery).then((countries) => {
			if (countries.length > 10) {
				showInfoNotification();
				cleanCountriesMarkup();
			} else {
				getCountriesMarkup(countries);
			}
		});
	}

	const getInputValue = (e) => {
		userQuery = e.target.value;
		return userQuery !== '' ? getCountries(userQuery) : cleanCountriesMarkup();
	};

	inputField.addEventListener('input', debounce(getInputValue, 500));
}
