function changeBackground(e) {
  const prevBackground = document.querySelector('.selected-background');
  prevBackground.classList.remove('selected-background');
  e.target.classList.add('selected-background');
  document.body.style.backgroundImage = `url(img/background/full-size/${e.target.id}.jpg)`;
}

const getBackgrounds = document.querySelectorAll('.background');
getBackgrounds.forEach((currentValue) => {
  currentValue.addEventListener('click', changeBackground);
})
