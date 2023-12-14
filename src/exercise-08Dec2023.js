let data

import('./moviesPlay.js')
	.then(res => {
		console.log('data imported into data constant');
		data = res;
		run();
	});

function run() {
	
}

//Part of Task 2
function getLanguagesMap(languages) {
	const languagesMap = new Map();
	languages.forEach(lang => {
		languagesMap.set(lang.iso_639_1, `${lang.english_name} (${lang.name})`)
	})
	console.log(languagesMap.get('hi'));
	return languagesMap;
}

//Part of Task 1
function getMovieCountByLanguage(movies) {
	const movieLangMap = new Map();
	for (let i = 0; i < movies.length; i++) {
		const key = movies[i].originalLanguage;
		if (!movieLangMap.get(key)) {
			movieLangMap.set(key, 0);
		}
		const newVal = movieLangMap.get(key) + 1;
		movieLangMap.set(key, newVal);
	}
	return movieLangMap;
}

//Task 3 & 4
function showMovieCountByLanguage() {
	console.log('Called by HTML', data.movies.length);
	const movies = data.movies;
	const languages = data.languages;

	console.log('Number of movies: ' + movies.length);
	
	const moviesByLangCount = getMovieCountByLanguage(movies);
	console.log(moviesByLangCount.size);
	const languagesMap = getLanguagesMap(languages);
	
	let htmlContent = 
	`<table class="ui celled table">
		<thead>
			<tr>
				<th>Language</th>
				<th>Count</th>
			</tr>
		</thead>
  <tbody>`;

	const moviesCountByLangArray = [];
	for (const [key, value] of moviesByLangCount) {
		//[{language: 'language info 1', count: 123}, {}]
		moviesCountByLangArray.push({
			language: languagesMap.get(key), count: value}
		);
	}

	//Task 4
	moviesCountByLangArray.sort((a, b) => {
		return (b.count - a.count);
	});
	moviesCountByLangArray.forEach(item => {
		htmlContent+= `<tr>
										<td>${item.language}</td>
										<td>${item.count}</td>
									</tr>`;
	})
	
		

	htmlContent += '</tbody></table>'
	document.getElementById('content').innerHTML = htmlContent;
}