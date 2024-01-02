let data;
let allMoviesData;
const personUrl = 'https://api.themoviedb.org/3/person/';
const apiKey = 'cc37399832696ae72d6412c05725058a';
const movieUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/original';

import('../moviesPlay.js')
  .then(res => {
    console.log('Data imported into data constant', res);
    data = res;
    console.log(data);
    allMoviesData = data.movies.concat(data.hindiMovies);
    console.log(allMoviesData);
    posterSelected();
    document.addEventListener('DOMContentLoaded', function () {
        console.log('Before calling posterSelected');
       
    });
  })
  .catch(error => {
    console.error('Error importing data:', error);
  });

  async function posterSelected() {
    console.log('Function called');
    console.log('into posterselected');
    const queryParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const movieId = queryParams.get('id');
  
    if (!movieId) {
      console.error("Movie ID not found in the URL");
      return;
    }
  
    let movie;
    if (allMoviesData) {
      movie = allMoviesData.find(movie => movieId === movie.tmdbId) || allMoviesData.find(movie => movieId === movie.tmdbId);
    } else {
      console.error("Movies data not loaded");
      return;
    }
  
    if (!movie) {
      console.error("Movie not found");
      return;
    }
    const fetchArray = movie.cast.map(cm =>
      fetch(`${personUrl}${cm.id}?api_key=${apiKey}`)
        .then(response => response.json())
    );
    fetchArray.unshift(fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
      .then(response => response.json()));
    const fetchResponse = await Promise.all(fetchArray);

    // Extract data from responses
    const movieData = fetchResponse[0];
    const castData = fetchResponse.slice(1);

    const movieInfo = {
      title: movieData.title,
      overview: movieData.overview,
      posterPath: movieData.poster_path,
      cast: movie.cast.map((cm, i) => ({
        id: cm.id,
        character: cm.character,
        name: cm.name,
        birthDate: castData[i].birthday,
        profileImage: castData[i].profile_path,
      }))
    };
    // console.log(movieInfo);
    populateMovieHtml(movieInfo);
}


function populateMovieHtml(movieInfo) {
  document.getElementById('title').innerHTML = movieInfo.title;
  document.getElementById('overview').innerHTML = movieInfo.overview;
  document.getElementById('moviePoster').innerHTML = `<img class="moviePoster" src='${imageUrl}${movieInfo.posterPath}' />`
  document.getElementById('castInfo').innerHTML = getCastHtml(movieInfo.cast);
}

function getCastHtml(cast) {
    console.log('into getcast html')
  let castHtml = '<div class="ui cards">'
  cast.forEach(cm => {
    castHtml += `
<div class="card">
<div class="content">
<img class="right floated mini ui image" src="${imageUrl}${cm.profileImage}">
<div class="header">
            ${cm.name}
</div>
<div class="meta">
            ${cm.birthDate}
</div>
<div class="description">
            ${cm.character}
</div>
</div>
</div>
    `
  })
  castHtml += '</div>';
  return castHtml;
}
