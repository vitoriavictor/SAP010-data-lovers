import { data } from "./data.js";
import { filterItemsBySearchTerm, filterByDirector, filterByGender, filterCharactersByMovie, sortByTitleAZ, sortByTitleZA, sortByReleaseYearOld, sortByReleaseYearNew, sortByRottenTomatoesHigh, sortByRottenTomatoesLow } from './data.js';
import { movies } from './data.js'; 

// FILTROS
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');
  /*  const calculateStatsButton = document.getElementById('calculateStatsButton');
  const resultContainer = document.getElementById('resultContainer'); */

  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredItems = filterItemsBySearchTerm(data, searchTerm);
    showMovies(filteredItems);
    console.log(filteredItems);
  });

  /* calculateStatsButton.addEventListener('click', function () {
    const genderStats = calculateGenderStats(movies);
    const resultDiv = document.createElement('div');
    resultDiv.textContent = `Estatísticas de Gênero:
      Total: ${genderStats.totalCharacters}
      Masculino: ${genderStats.maleCharacters}
      Feminino: ${genderStats.femaleCharacters}
      Percentagem personagens femininos: ${genderStats.femalePercentage}
      Percentagem personagens masculinos: ${genderStats.malePercentage}
    `;
    resultContainer.innerHTML = ''; // Limpa o conteúdo atual
    resultContainer.appendChild(resultDiv);
    console.log(genderStats);
  }); */
  

  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = ''; // Limpa o conteúdo atual

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Frente do card
    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
    <h4>Ano de Lançamento: ${movie.release_date}</h4>
    <h3>${movie.description}</h3>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}</h4>
  `;

    // Verso do card
/*     const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `
    <h3>${movie.description}</h3>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}</h4>
  `; */

    card.appendChild(front);
/*     card.appendChild(back); */

    return card;
  }
});

async function loadDirectors() {
  try {
    const directors = await data.getDirectors();
    const directorFilter = document.getElementById("director-filter");
    while (directorFilter.firstChild) {
      directorFilter.removeChild(directorFilter.firstChild);
    }

    // Adicionar opções
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
    console.log('Ocorreu um erro ao carregar os diretores:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const directorFilter = document.getElementById('director-filter');

  directorFilter.addEventListener('change', function () {
    const selectedDirector = directorFilter.value;
    const filteredMovies = filterByDirector(movies, selectedDirector);
    showMovies(filteredMovies);
    console.log(filteredMovies);
  });

  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = ''; // Limpa o conteúdo atual

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Frente do card
    const front = document.createElement('div');
    front.classList.add('card-front');
    front.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
    <h4>Ano de Lançamento: ${movie.release_date}</h4>
    <h3>${movie.description}</h3>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}</h4>
  `;

    // Verso do card
/*     const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `
    <h3>${movie.description}</h3>
    <h4>Diretor: ${movie.director}</h4>
    <h4>Nota no Rotten Tomatoes: ${movie.rt_score}</h4>
  `; */

    card.appendChild(front);
/*     card.appendChild(back); */

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

    // Adicionar opções
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
    console.log('Ocorreu um erro ao carregar os filmes:', error);
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
    console.log(filteredCharacter);
  });
  
  genderFilter.addEventListener('click', function () {
    const selectedGender = genderFilter.value;
    const filteredMovies = filterByGender(movies, selectedGender);
    showCharacter(filteredMovies);
    console.log(filteredMovies);
  });

  sortAZButton.addEventListener('click', function () {
    const sortedAZ = sortAZButton.value;
    const sortedMovies = sortByTitleAZ(movies, sortedAZ);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  sortZAButton.addEventListener('click', function () {
    const sortedZA = sortZAButton.value;
    const sortedMovies = sortByTitleZA(movies, sortedZA);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  sortReleaseYearButtonOld.addEventListener('click', function () {
    const sortedYear = sortReleaseYearButtonOld.value;
    const sortedMovies = sortByReleaseYearOld(movies, sortedYear);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  sortReleaseYearButtonNew.addEventListener('click', function () {
    const sortedYear = sortReleaseYearButtonNew.value;
    const sortedMovies = sortByReleaseYearNew(movies, sortedYear);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  sortRottenTomatoesButtonHigh.addEventListener('click', function () {
    const sortedRT = sortRottenTomatoesButtonHigh.value;
    const sortedMovies = sortByRottenTomatoesHigh(movies, sortedRT);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  sortRottenTomatoesButtonLow.addEventListener('click', function () {
    const sortedRT = sortRottenTomatoesButtonLow.value;
    const sortedMovies = sortByRottenTomatoesLow(movies, sortedRT);
    showMovies(sortedMovies);
    console.log(sortedMovies);
  });

  function showMovies(movies) {
    const moviesContainer = document.getElementById('cards-container');
    moviesContainer.innerHTML = ''; // Limpa o conteúdo atual

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
      <h3>${movie.description}</h3>
      <h4>Diretor: ${movie.director}</h4>
      <h4>Rotten Tomatoes: ${movie.rt_score}%</h4>
    `;

/*     const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `
      <h3>${movie.description}</h3>
      <h4>Diretor: ${movie.director}</h4>
      <h4>Rotten Tomatoes: ${movie.rt_score}%</h4>
    `; */

    card.appendChild(front);
/*     card.appendChild(back); */

    return card;
  }
 
  function showCharacter(characters) {
    const characterContainer = document.getElementById('cards-container');
    characterContainer.innerHTML = ''; // Limpa o conteúdo atual

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

/*     const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `
    <h4>Gênero: ${charac.gender}</h4>
    <h4>Cor dos olhos: ${charac.eye_color}</h4>
    <h4>Cor dos cabelos: ${charac.hair_color}</h4>
  `; */

    card.appendChild(front);
/*     card.appendChild(back); */

    return card;
  }
};
