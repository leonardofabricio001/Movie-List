function clearDataInputs() {
  const clearMovieData = document.querySelectorAll('.movie-data');
  const movieImage = document.querySelector('#movie-image');
  const resetImageUpload = document.querySelector('#image-upload');
  const removeMovieBtnEvent = document.querySelector('.add-movie-button');

  clearMovieData.forEach((currentValue) => {
    currentValue.value = '';
  });

  movieImage.src = 'img/no-image.jpg';
  resetImageUpload.value = '';
  selectedFile = '';
  resetImageUpload.style.display = 'block';
  removeMovieBtnEvent.removeEventListener('click', validateInputs);
}

function setMovieId() {
  let movieName = document.querySelectorAll('.movie-data')[0].value;
  movieName = movieName.replace(/[0-9\W|_ ]/g, '');
  let randNums = [];
  let output = '';
  for (var i = 0; i < 3; i++) {
    randNums.push(Math.floor(Math.random() * movieName.length));
    output += movieName[randNums[randNums.length - 1]];
  }
  randNums.forEach((currentValue) => {
    output += currentValue.toString();
  });
  return output.toLowerCase();
}

function setHTMLOutput(saveData) {
  let setOutput = document.querySelector('.movie-output');
  let linkTarget = '_blank';
  if (saveData.movies[saveData.movies.length - 1].linkToWatch == '/') {
    linkTarget = '_self';
  }

  setOutput.innerHTML += `
  <div class="html-output" id="${saveData.movies[saveData.movies.length - 1].movieId}-movie">
    <img src="${saveData.movies[saveData.movies.length - 1].imageData}" alt="" class="movie-image-size"> 
    <p>${saveData.movies[saveData.movies.length - 1].movieName}</p>
    <div class="movie-info-output">
      <span>${saveData.movies[saveData.movies.length - 1].movieRelease}</span>
      <span>${saveData.movies[saveData.movies.length - 1].movieLength}</span>
      <span>${saveData.movies[saveData.movies.length - 1].movieType}</span>
    </div>
    <div class="options-container">
      <a href="${saveData.movies[saveData.movies.length - 1].linkToWatch}" class="link-to-watch" target="${linkTarget}">Assistir</a>
      <img src="img/delete.png" id="${saveData.movies[saveData.movies.length - 1].movieId}" class="delete-movie"> 
    </div>
  </div>`;
}

function saveMovieData() {
  const movieData = document.querySelectorAll('.movie-data');
  let saveData = JSON.parse(localStorage.getItem('movieData'));

  saveData.movies.push({
    movieName: movieData[0].value,
    movieRelease: movieData[1].value.length < 4 ? '2023' : movieData[1].value,
    movieLength: movieData[2].value.length < 5 ? '0h00m' : movieData[2].value,
    movieType: movieData[3].value,
    imageData: selectedFile,
    linkToWatch: movieData[5].value.includes('https://') && movieData[5].value.length >= 15 ? movieData[5].value : '/',
    movieId: setMovieId(),
  });

  setHTMLOutput(saveData);
  clearDataInputs();
  saveData = JSON.stringify(saveData);
  localStorage.setItem('movieData', saveData);
}

function validateInputs() {
  const movieData = document.querySelectorAll('.movie-data');
  if (selectedFile.length == 0) {
    window.alert('Insira uma imagem.');
  } else {
    let invalidInput = false;
    for (let i = 0; i < movieData.length; i++) {
      if (movieData[i].value.length == 0) {
        invalidInput = true;
        break;
      }
    }

    if (invalidInput) {
      window.alert('Aviso! Preencha todos os campos corretamente.');
    } else {
      saveMovieData();
    }
  }
}

function checkImageSize(image) {
  if ((image.width > 640 || image.height > 840) || (image.width < 320 || image.height < 420)) {
    window.alert('O tamanho mínimo da imagem deve ser de 320x420 e o máximo de 640x840.');
    return false;
  } else {
    return true;
  }
}

function readImageInput(event) {
  selectedFile = event.target.files[0];
  const movieImage = document.querySelector('#movie-image');
  const reader = new FileReader();

  reader.readAsDataURL(selectedFile);
  reader.onload = () => {
    selectedFile = reader.result;
    movieImage.src = selectedFile;
    if (checkImageSize(movieImage)) {
      event.target.style.display = 'none';
      movieImage.style.width = '320px';
      movieImage.style.height = '420px';
    } else {
      clearDataInputs();
    }
  }
}

function changeModalSettings(exitOption) {
  const fadeBackground = document.querySelector('.fade-background');
  const getModal = document.querySelector(exitOption == 1 ? '.movie-info' : '.info-settings');

  getModal.style.animationName = 'modal-out';
  fadeBackground.style.animationName = 'background-normal';

  setTimeout(() => {
    fadeBackground.style.display = 'none';
    getModal.style.display = 'none';
    getModal.style.animationName = 'modal-enter';
    fadeBackground.style.animationName = 'background-transition';
    clearDataInputs();
  }, 900);
}

function Modal(option) {
  const fadeBackground = document.querySelector('.fade-background');

  if (fadeBackground.style.display != 'grid') {
    fadeBackground.style.display = 'grid';
    if (option == 1) {
      const movieInfo = document.querySelector('.movie-info');
      movieInfo.style.display = 'grid';

      const addMovieBtn = document.querySelector('.add-movie-button');
      addMovieBtn.addEventListener('click', validateInputs);
    }
    else {
      const showSettings = document.querySelector('.info-settings');
      showSettings.style.display = 'block';
    }
  }
}

let selectedFile = '';
const addMovieInfo = document.querySelector('#add-movie');
addMovieInfo.addEventListener('click', function () { Modal(1) });

const settings = document.querySelector('#settings-button');
settings.addEventListener('click', function () { Modal(0) });

const movieExitBtn = document.querySelector('.exit-movie');
movieExitBtn.addEventListener('click', function () { changeModalSettings(1) });

const settingsExitBtn = document.querySelector('.exit-settings');
settingsExitBtn.addEventListener('click', function () { changeModalSettings(0) });

const imageUpload = document.querySelector('#image-upload');
imageUpload.addEventListener('change', readImageInput);
