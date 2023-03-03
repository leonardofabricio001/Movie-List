function validateReleaseDate() {

  if (releaseDate.value.length > 0) {
    const lastCharIndex = releaseDate.value.length - 1;
    if (releaseDate.value[lastCharIndex].match(/[0-9]/g) === null) {
      releaseDate.value = releaseDate.value.replace(releaseDate.value[lastCharIndex], '');
    };

    if (releaseDate.value.length == 4) {
      const year = new Date().getFullYear();
      releaseDate.value = year - Number(releaseDate.value) < 0 ? year.toString() : releaseDate.value;
    }
  }
}

function validateMovieLength() {
  const validateKeys = [/[0-9]/g, /[h]/g, /[0-5]/g, /[0-9]/g, /[m]/g];
  const lastCharIndex = movieLength.value.length - 1;

  if (movieLength.value[lastCharIndex].match(validateKeys[lastCharIndex]) === null) {
    movieLength.value = movieLength.value.replace(movieLength.value[lastCharIndex], '');
    window.alert('A duração deve seguir o seguinte formato: 0h00m');
  }
}

const movieLength = document.querySelector('#movie-length');
movieLength.addEventListener('input', validateMovieLength);

const releaseDate = document.querySelector('#movie-release');
releaseDate.addEventListener('input', validateReleaseDate);
