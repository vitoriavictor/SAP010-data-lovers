import { data } from "./data.js";
import { filterItemsBySearchTerm, filterByDirector, calculatePercentage, filterByGender, filterCharactersByMovie, sortByTitleAZ, sortByTitleZA, sortByReleaseYearOld, sortByReleaseYearNew, sortByRottenTomatoesHigh, sortByRottenTomatoesLow } from './data.js';
import { movies } from './data.js'; 

// FILTROS
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMovies = filterItemsBySearchTerm(movies, searchTerm);
    showMovies(filteredMovies);
  });
  
  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    const searchMessage = document.getElementById('search-empty');
  
    moviesContainer.innerHTML = '';
    searchMessage.innerHTML = '';
  
    if (movies.length === 0) {
      searchMessage.textContent = 'Nenhum filme encontrado.';
      return;
    }
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
    <h4>Ano de Lançamento: ${movie.release_date}</h4>
    <h4>${movie.description}</h4>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}%</h4>
  `;

    card.appendChild(front);

    return card;
  }
});
//carregar lista diretores
async function loadDirectors() {
  try {
    const directors = await data.getDirectors();
    const directorFilter = document.getElementById("director-filter");
    while (directorFilter.firstChild) {
      directorFilter.removeChild(directorFilter.firstChild);
    }

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "Todos";
    directorFilter.appendChild(allOption);

    directors.forEach(function (director) {
      const option = document.createElement("option");
      option.value = director;
      option.textContent = director;
      directorFilter.appendChild(option);
    });
  } catch (error) {
    // console.log('Ocorreu um erro ao carregar os diretores:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const directorFilter = document.getElementById('director-filter');
  const statsContainer = document.getElementById('percentageResult');

  directorFilter.addEventListener('change', function () {
    const selectedDirector = directorFilter.value;
    const filteredMovies = filterByDirector(movies, selectedDirector);
    const statsResult = statsContainer.value
    const percentage = calculatePercentage(movies, statsResult);
    showMovies(filteredMovies, percentage);
  });
  
  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = '';
    statsContainer.textContent = '';
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
    <h4>Ano de Lançamento: ${movie.release_date}</h4>
    <h4>${movie.description}</h4>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}%</h4>
  `;

    card.appendChild(front);

    return card;
  }
  loadDirectors();
});

loadMovies();

async function loadMovies() {
  try {
    const movies = await data.getMovies();
    const movieFilter = document.getElementById("movieFilter");
    while (movieFilter.firstChild) {
      movieFilter.removeChild(movieFilter.firstChild);
    }

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "Todos";
    movieFilter.appendChild(allOption);

    movies.forEach(function (movie) {
      const option = document.createElement("option");
      option.value = movie.title;
      option.textContent = movie.title;
      movieFilter.appendChild(option);
    });
  } catch (error) {
    // console.log('Ocorreu um erro ao carregar os filmes:', error);
  }
}

// Função principal
window.onload = function () {
  const movieFilter = document.getElementById('movieFilter');
  const genderFilter = document.getElementById('genderFilter');
  const sortAZButton = document.getElementById('sortAZButton');
  const sortZAButton = document.getElementById('sortZAButton');
  const sortReleaseYearButtonOld = document.getElementById('sortReleaseYearButtonOld');
  const sortReleaseYearButtonNew = document.getElementById('sortReleaseYearButtonNew');
  const sortRottenTomatoesButtonHigh = document.getElementById('sortRottenTomatoesButtonHigh');
  const sortRottenTomatoesButtonLow = document.getElementById('sortRottenTomatoesButtonLow');

  movieFilter.addEventListener('change', function () {
    const selectedMovie = movieFilter.value;
    const filteredCharacter = filterCharactersByMovie(movies, selectedMovie);
    showCharacter(filteredCharacter);
  });
  
  genderFilter.addEventListener('change', function () {
    const selectedGender = genderFilter.value;
    const filteredMovies = filterByGender(movies, selectedGender);
    showCharacter(filteredMovies);
  });

  sortAZButton.addEventListener('click', function () {
    const sortedAZ = sortAZButton.value;
    const sortedMovies = sortByTitleAZ(movies, sortedAZ);
    showMovies(sortedMovies);
  });

  sortZAButton.addEventListener('click', function () {
    const sortedZA = sortZAButton.value;
    const sortedMovies = sortByTitleZA(movies, sortedZA);
    showMovies(sortedMovies);
  });

  sortReleaseYearButtonOld.addEventListener('click', function () {
    const sortedYear = sortReleaseYearButtonOld.value;
    const sortedMovies = sortByReleaseYearOld(movies, sortedYear);
    showMovies(sortedMovies);
  });

  sortReleaseYearButtonNew.addEventListener('click', function () {
    const sortedYear = sortReleaseYearButtonNew.value;
    const sortedMovies = sortByReleaseYearNew(movies, sortedYear);
    showMovies(sortedMovies);
  });

  sortRottenTomatoesButtonHigh.addEventListener('click', function () {
    const sortedRT = sortRottenTomatoesButtonHigh.value;
    const sortedMovies = sortByRottenTomatoesHigh(movies, sortedRT);
    showMovies(sortedMovies);
  });

  sortRottenTomatoesButtonLow.addEventListener('click', function () {
    const sortedRT = sortRottenTomatoesButtonLow.value;
    const sortedMovies = sortByRottenTomatoesLow(movies, sortedRT);
    showMovies(sortedMovies);
  });

  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <h4>Ano de Lançamento: ${movie.release_date}</h4>
      <h4>${movie.description}</h4>
      <h4>Diretor: ${movie.director}</h4>
      <h4>Nota no Rotten Tomatoes: ${movie.rt_score}%</h4>
    `;

    card.appendChild(front);

    return card;
  }

  function showCharacter(characters) {
    const characterContainer = document.getElementById('cards-container');
    characterContainer.innerHTML = '';

    characters.forEach(character => {
      const characterCard = createCharacterCard(character);
      characterContainer.appendChild(characterCard);
    });
  }

  function createCharacterCard(charac) {
    const card = document.createElement('div');
    card.classList.add('character-card');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
    <img src="${charac.img}" alt="${charac.name}" />
    <h3>${charac.name}</h3>
    <h4>Idade: ${charac.age}</h4>
    <h4>Espécie: ${charac.specie}</h4>
    <h4>Gênero: ${charac.gender}</h4>
    <h4>Cor dos olhos: ${charac.eye_color}</h4>
    <h4>Cor dos cabelos: ${charac.hair_color}</h4>
  `;

    card.appendChild(front);

    return card;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const clearButton = document.getElementById('cleanFilters');

  clearButton.addEventListener('click', function () {
    const searchInput = document.getElementById('search');
    searchInput.value = '';

    const searchEmpty = document.getElementById('search-empty');
    searchEmpty.textContent = '';

    const directorFilter = document.getElementById('director-filter');
    directorFilter.value = 'all';

    const percentageResult = document.getElementById('percentageResult');
    percentageResult.textContent = '';

    const movieFilter = document.getElementById('movieFilter');
    movieFilter.value = 'all';

    const genderFilter = document.getElementById('genderFilter');
    genderFilter.value = 'all';

    const sortAZButton = document.getElementById('sortAZButton');
    sortAZButton.checked = false;

    const sortZAButton = document.getElementById('sortZAButton');
    sortZAButton.checked = false;

    const sortReleaseYearButtonOld = document.getElementById('sortReleaseYearButtonOld');
    sortReleaseYearButtonOld.checked = false;

    const sortReleaseYearButtonNew = document.getElementById('sortReleaseYearButtonNew');
    sortReleaseYearButtonNew.checked = false;

    const sortRottenTomatoesButtonHigh = document.getElementById('sortRottenTomatoesButtonHigh');
    sortRottenTomatoesButtonHigh.checked = false;

    const sortRottenTomatoesButtonLow = document.getElementById('sortRottenTomatoesButtonLow');
    sortRottenTomatoesButtonLow.checked = false;

    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = '';
  });
});


