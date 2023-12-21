const myMovies = ['Ariel', 'Forrest Gump', 'Apocalypse', 'Lord of the Rings'];
let filteredMovies = myMovies;

function doSomething(event) {
  const inputValue = document.getElementById('myInput').value;
  console.log(inputValue);

  filteredMovies = myMovies.filter(movie => {
    return movie.includes(inputValue);
  })
  showFilteredMovies();
}

function showFilteredMovies() {
  document.getElementById('movies').innerHTML = filteredMovies.join(', ');
}

showFilteredMovies();