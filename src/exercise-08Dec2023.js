let data

import('./moviesPlay.js')
	.then(res => {
		console.log('data imported into data constant');
		data = res;
		run();
	});

function run() {
	const movies = data.movies;
	console.log('Number of movies: ' + movies.length);
	for (let i = 0; i < movies.length; i++) {
		console.log(movies[i].originalLanguage);
	}
}