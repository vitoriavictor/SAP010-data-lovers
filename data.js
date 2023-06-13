const data = {
  getMovies: async function () {
    try {
      const response = await fetch('./data/ghibli/ghibli.json');
      const data = await response.json();
      return data.films || [];
    } catch (error) {
      // console.error('Ocorreu um erro ao obter os dados dos filmes:', error);
      return [];
    }
  },

  getDirectors: async function () {
    try {
      const response = await fetch('./data/ghibli/ghibli.json');
      const data = await response.json();
      const directors = data.films.map((film) => film.director);
      const uniqueDirectors = directors.filter((director, index) => directors.indexOf(director) === index);
      return uniqueDirectors;
    } catch (error) {
      // console.error('Ocorreu um erro ao obter os diretores:', error);
      return [];
    }
  }
};

export function filterItemsBySearchTerm(movies, searchTerm) {
  return movies.filter(item => {
    const lowerCaseTitle = item.title.toLowerCase();
    return lowerCaseTitle.includes(searchTerm);
  });
}

export function filterByDirector(movies, director) {
  if (director === 'all') {
    return movies;
  } else {
    return movies.filter(movie => movie.director === director);
  }
}

export function calculatePercentage(filteredMovies, totalMoviesCount, selectedDirector) {
  if (selectedDirector === 'all') {
    return '';
  } else {
    const filteredMoviesCount = filteredMovies.length;
    const percentage = (filteredMoviesCount / totalMoviesCount) * 100;
    return 'Os filmes desse diretor representam ' + Math.round(percentage) + '% do total dos filmes.';
  }
}

export function filterCharactersByMovie(movies, title) {
  if (title === "all") {
    const allCharacters = movies.flatMap(movie => movie.people);
    return allCharacters;
  } else {
    const movie = movies.find(movie => movie.title === title);
    if (movie) {
      return movie.people;
    } else {
      return [];
    }
  }
}

export function filterByGender(movies, selectedGender) {
  const filteredPeople = [];
  if (selectedGender === "all") {
    return movies.flatMap(movie => movie.people);
  }
  for (const movie of movies) {
    const people = movie.people.filter(person => person.gender.toLowerCase() === selectedGender.toLowerCase());
    filteredPeople.push(...people);
  }
  return filteredPeople;
}

export function sortByTitleAZ(movies) {
  return movies.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByTitleZA(movies) {
  return movies.sort((a, b) => b.title.localeCompare(a.title));
}

export function sortByReleaseYearOld(movies) {
  return movies.sort((a, b) => a.release_date - b.release_date);
}

export function sortByReleaseYearNew(movies) {
  return movies.sort((a, b) => b.release_date - a.release_date);
}

export function sortByRottenTomatoesHigh(movies) {
  return movies.sort((a, b) => b.rt_score - a.rt_score);
}

export function sortByRottenTomatoesLow(movies) {
  return movies.sort((a, b) => a.rt_score - b.rt_score);
}

let movies = [];

function fetchMovies(callback) {
  if (typeof fetch !== 'undefined') {
    fetch('./data/ghibli/ghibli.json')
      .then(response => response.json())
      .then(data => {
        callback(null, data.films);
      })
      .catch(error => {
        callback(error);
      });
  } else {
    callback(new Error('Fetch is not supported.'));
  }
}
fetchMovies((error, data) => {
  if (error) {
    return [];
  } else {
    movies = data;
  }
});

export { data };
export { movies };