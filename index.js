let data

import('../src/moviesPlay.js')
	.then(res => {
		console.log('data imported into data constant');
		data = res;
		run();
	});

function run() {
	const filteredMovies = data.movies.filter(movie => {
    return movie.runtimeMinutes > 150;
  })
  const totalRuntime = filteredMovies.reduce((acc, movie) => {
    console.log(movie.runtimeMinutes);
    return acc + movie.runtimeMinutes;
  }, 0)
  console.log('Total Runtime: ' + totalRuntime + ', avg runtime: ' + Math.ceil(totalRuntime / filteredMovies.length));

  //Reformat the filtered output
  const output = filteredMovies.map(movie => {
    return {
      title: movie.title, 
      releaseDate: movie.releaseDate, 
      runtimeMinutes: movie.runtimeMinutes,
      id: movie.tmdbId
    } 
  })
  console.log(output);
}

function getMovieInformation() {
  const apiKey = 'ee7d203471e97a298538cbe020b53f27';
  const movieUrl = 'https://api.themoviedb.org/3/movie/';
  const movieId = '98'
  const imageUrl = 'https://image.tmdb.org/t/p/original';

  const fetchUrl = `${movieUrl}${movieId}?api_key=${apiKey}`;
  console.log('Calling fetch');
  const startTime = Date.now();
  let endTime;
  fetch(fetchUrl)
    .then(response => {
      endTime = Date.now();
      console.log('>>>> Got Response. Time taken: ' + (endTime - startTime) + ' milliseconds');
      return response.json()
    })
    .then(movie => {
      //console.log(movie);
      console.log(movie.backdrop_path, movie.poster_path);
      const htmlContent = `<img src='${imageUrl}${movie.poster_path}' />`
      document.getElementById('content').innerHTML = htmlContent;
    })
    .catch(console.error)
  endTime = Date.now();
  console.log('Finished calling fetch. Time taken: ' + (endTime - startTime) + ' milliseconds');
}