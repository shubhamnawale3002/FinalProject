let data;
let movies;
let selectedCastName;
let allMoviesData;
let allMoviesIds;
let searchMovieOrCast;
let filterByLanguage;
let filteredByGenres = [];
let filterByGenres;
let filteredMoviesByDecade;
let moviesForDecade;
const personUrl = 'https://api.themoviedb.org/3/person/';
const apiKey = 'cc37399832696ae72d6412c05725058a';
const movieUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/original';

import('../moviesPlay.js')
  .then(res => {
    data = res;
    allMoviesData = data.movies.concat(data.hindiMovies);
    allMoviesIds = allMoviesData.map(movie => movie.tmdbId);  
    landingPageAllMovies();
    getGenres();
  })
  .catch(error => {
    console.error('Error importing data:', error);
  });

function clearGenreCheckboxes() {
    document.querySelectorAll('input[name="genres"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input[name="language"]').forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            const selectedCategory = event.target.value;
            clearGenreCheckboxes();
            getMoviesByLanguage(selectedCategory);
        });
    });
});

function showPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("filterPopup").style.display = "block";
    document.body.classList.add("popup-open"); // Add class to disable scrolling
}

function hidePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("filterPopup").style.display = "none";
    document.body.classList.remove("popup-open"); // Remove class to enable scrolling
}

function landingPageAllMovies() {
    const fetchMovies = allMoviesIds.map(movieId => {
        return (
            fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
            .then(response => response.json())
        );
    });
    
    Promise.all(fetchMovies)
    .then(fetchMovieResponses => {
        const moviesInfo = fetchMovieResponses.map(resp => {
            return {
                id: resp.id,
                overview: resp.overview,
                posterPath: resp.poster_path,
                releaseDate: resp.release_date,
                runTime: resp.runtime, 
                tagLine: resp.tagline,
                title: resp.title
              };
        });
        document.getElementById('resultContainer').innerHTML = getMovieHtml(moviesInfo);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input[name="language"]').forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            const selectedCategory = event.target.value;
            getMoviesByLanguage(selectedCategory);
        });
    });
});


function search() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    searchMovieOrCast = allMoviesData.filter(movie => {
        return (
            movie.title.toLowerCase().includes(searchValue) ||
            movie.cast.some(actor => actor.name.toLowerCase().includes(searchValue))
        );
    });
    getMovieInformation(searchMovieOrCast);
}

function getMoviesByLanguage(selectedLanguage) {
    if (selectedLanguage === 'all') {
        filterByLanguage = allMoviesData;
    } else if (selectedLanguage === 'hindi') {
        filterByLanguage = data.hindiMovies;
    } else if (selectedLanguage === 'english') {
        filterByLanguage = data.movies;
    } else {
        console.error('Unexpected language:', filterByLanguage);
        return;
    }   
    getMovieInformation(filterByLanguage);
    if (filterByLanguage.length > 0) {
        addDecadeSelects(filterByLanguage);
    } else {
        addDecadeSelects(allMoviesData);
    }
    
    document.querySelectorAll('input[name="genres"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            getMoviesByGenres(filterByLanguage);
        });
    });
}

function getGenres() {
    let genresSet = new Set();
    for (let index = 0; index < allMoviesData.length; index++) {
        const k = allMoviesData[index].genres;
        for (let j = 0; j < k.length; j++) {
            genresSet.add(JSON.stringify(k[j]));
        }
    }
    const checkboxContainer = document.getElementById('checkboxContainer');
    if (checkboxContainer) {
        function createGenreCheckbox(genre) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = genre.id;
            checkbox.id = `genre-${genre.id}`;
            checkbox.name = 'genres';
            checkbox.style.marginBottom = '10px';

            const label = document.createElement('label');
            label.htmlFor = `genre-${genre.id}`;
            label.appendChild(document.createTextNode(genre.name));

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            checkboxContainer.appendChild(document.createElement('br'));
        }

        genresSet.forEach(genreString => {
            const genre = JSON.parse(genreString);
            createGenreCheckbox(genre);
        });
    } else {
        console.error("Checkbox container not found");
    }
}

function getMoviesByGenres(filterByLanguage) {
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genres"]:checked'))
        .map(checkbox => parseInt(checkbox.value));

    const logicalOperator = document.querySelector('input[name="logicalOperator"]:checked') ?
        document.querySelector('input[name="logicalOperator"]:checked').value :
        'AND';

    filterByGenres = filterByLanguage.filter(movie => {
        if (logicalOperator === 'AND') {
            return selectedGenres.every(genreId =>
                movie.genres.some(movieGenre => movieGenre.id === genreId)
            );
        } else {
            return selectedGenres.some(genreId =>
                movie.genres.some(movieGenre => movieGenre.id === genreId)
            );
        }
    });
    if (filterByGenres.length > 0) {
        addDecadeSelects(filterByGenres);
    }
}

function getDecadeFromDate(date) {
    const year = new Date(date).getFullYear();
    return `${Math.floor(year / 10) * 10}-${Math.floor(year / 10) * 10 + 9}`;
}

async function addDecadeSelects(moviesForDecade) {
    const select = document.getElementById('decades');
    select.innerHTML = '';

    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.text = "Select decade";
    select.add(defaultOpt);

    const decades = [...new Set(moviesForDecade.map(movie => getDecadeFromDate(movie.releaseDate)))];
    decades.sort().reverse();

    decades.forEach(decade => {
        const opt = document.createElement("option");
        opt.value = decade;
        opt.text = `${decade}`;
        select.add(opt);
    });

    select.addEventListener('change', function () {
        selectedDecade = this.value;
        filteredMoviesByDecade = filterMoviesByDecade(moviesForDecade, selectedDecade);
        getMovieInformation(filteredMoviesByDecade);
    });

    selectedDecade = decades[0];
    filteredMoviesByDecade = filterMoviesByDecade(moviesForDecade, selectedDecade);
    getMovieInformation(filteredMoviesByDecade);
}

function filterMoviesByDecade(getDecadeMovies, decade) {
    return getDecadeMovies.filter(movie => getDecadeFromDate(movie.releaseDate) === decade);
}

function getMovieInformation(movies) {
    const fetchArray = movies.map(movie => {
        return (
            fetch(`${movieUrl}${movie.tmdbId}?api_key=${apiKey}`)
                .then(response => response.json())
        );
    });
    Promise.all(fetchArray)
        .then(fetchResponses => {
            const moviesInfo = fetchResponses.map(resp => {
                return {
                    id: resp.id,
                    overview: resp.overview,
                    posterPath: resp.poster_path,
                    releaseDate: resp.release_date,
                    runTime: resp.runtime,
                    tagLine: resp.tagline,
                    title: resp.title
                };
            });
            if (moviesInfo.length === 0) {
                document.getElementById('resultContainer').innerHTML = "<h1>No Movies Found </h1>";
            } else {
                document.getElementById('resultContainer').innerHTML = getMovieHtml(moviesInfo);
            }
        });
} 

function getMovieHtml(moviesInfo) {
    let movieHtml = '<div class="ui cards">';

    const movieCards = moviesInfo.reduce((html, movie) => {
        return html + `
            <div class="card" onclick="redirectToMoviePage(${movie.id})">
                <div class="image">
                    <img src='${imageUrl}${movie.posterPath}' style="max-width: 100%;" />
                </div>
                <div class="content">
                    <div class="header">${movie.title}</div>
                    <div class="meta">
                        <a>${movie.releaseDate}</a>
                    </div>
                    <div class="description">
                        ${movie.tagLine}
                    </div>
                    <div class="overview">
                        ${movie.overview}
                        <br/> 
                    </div>
                </div>
            </div>
        `;
    }, '');

    movieHtml += `${movieCards}</div>`;
    return movieHtml;
}

function redirectToMoviePage(movieId) {
    window.location.href = `castInfo.html?id=${movieId}`;
}
