function deleteMovie(movieId) {
  const confirmDelete = window.confirm('Você deseja remover este filme da lista?');

  if (confirmDelete) {
    observer.disconnect();
    const getMovies = JSON.parse(localStorage.getItem('movieData'));
    const movieOutput = document.querySelector('.movie-output');
    const deleteSelectedMovie = document.querySelector(`#${movieId}-movie`);
    let movieObjectIndex = null;

    if (getMovies.movies.length > 0 && getMovies.movies != undefined) {
      deleteSelectedMovie.style.animationName = 'delete-animation';

      setTimeout(function () {
        movieOutput.removeChild(deleteSelectedMovie);
        for (let i = 0; i < getMovies.movies.length; i++) {
          if (getMovies.movies[i].movieId == movieId) {
            movieObjectIndex = i;
            break;
          }
        }

        getMovies.movies.splice(movieObjectIndex, 1);
        localStorage.setItem('movieData', JSON.stringify(getMovies));
        observer.observe(movieOutput, observerOptions);
      }, 900);
    }
  }
}

function detectMutation(mutationList) {
  if (mutationList[0].type == 'childList') {
    const getMovies = JSON.parse(localStorage.getItem('movieData'));
    getMovies.movies.forEach((currentValue) => {
      const getID = document.querySelector(`#${currentValue.movieId}`);
      getID.addEventListener('click', function () { deleteMovie(currentValue.movieId); console.log(currentValue.movieId) });
    });
  }
}

function loadSavedMovies() {
  const getMovies = JSON.parse(localStorage.getItem('movieData'));
  if (getMovies.movies.length > 0 && getMovies.movies != undefined) {
    const setOutput = document.querySelector('.movie-output');

    getMovies.movies.forEach((currentValue) => {
      setOutput.innerHTML += `
        <div class="html-output" id="${currentValue.movieId}-movie">
          <img src="${currentValue.imageData}" alt="" class="movie-image-size"> 
          <p>${currentValue.movieName}</p>
            <div class="movie-info-output">
              <span>${currentValue.movieRelease}</span>
              <span>${currentValue.movieLength}</span>
              <span>${currentValue.movieType}</span>
            </div>
          <div class="options-container">
            <a href="${currentValue.linkToWatch}" class="link-to-watch" target="${currentValue.linkToWatch == '/' ? '_self' : '_blank'}">Assistir</a>
            <img src="img/delete.png" id="${currentValue.movieId}" class="delete-movie">
          </div>
        </div>`;
    })
  }
}

const observerOptions = {
  childList: true
}
const movieOutput = document.querySelector('.movie-output');
const observer = new MutationObserver(detectMutation);
observer.observe(movieOutput, observerOptions);

if (localStorage.getItem('movieData') === null) {
  const moviesObject = { movies: [] };
  localStorage.setItem('movieData', JSON.stringify(moviesObject));
} else {
  loadSavedMovies();
}
