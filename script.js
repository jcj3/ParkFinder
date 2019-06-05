'use strict'

const apiKey = 'hV5VHGC3ESoK0WfBVVUAWnPhGkoOo4Zo5nCKCbuL';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i <maxResults; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">Vist Park Website</a>
      </li>`
    )};
    $('#results').removeClass('hidden');
  };

function getParks(searchTerm, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: searchTerm,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL +'?'+ queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson, maxResults))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}


function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-input').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
});

$(watchForm);
