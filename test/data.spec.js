import { data, filterItemsBySearchTerm, filterByDirector, calculatePercentage, filterCharactersByMovie, filterByGender, sortByTitleAZ, sortByTitleZA, sortByReleaseYearOld, sortByReleaseYearNew, sortByRottenTomatoesHigh, sortByRottenTomatoesLow } from '../src/data.js';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// beforeEach(() => {
//   fetchMock.resetMocks();
// });

describe('data', () => {
  it('getMovies deve retornar uma lista de filmes', async () => {
    expect.assertions(1);
    const url = 'http://example.com/data/ghibli.json';
    const result = await data.getMovies(url);
    expect(result).toEqual(expect.any(Array));
  });

  it('getMovies deve retornar um array vazio em caso de erro', async () => {
    expect.assertions(1);
    const url = 'http://example.com/data/invalid.json'; // URL inválida
    const result = await data.getMovies(url);
    expect(result).toEqual([]);
  });

  it('getDirectors deve retornar uma lista de diretores únicos', async () => {
    expect.assertions(1);
    const url = 'http://example.com/data/ghibli.json';
    const result = await data.getDirectors(url);
    expect(result).toEqual(expect.any(Array));
  });

  /*   it('getDirectors deve retornar uma lista de diretores únicos', async () => {
      expect.assertions(1);
      const url = 'http://example.com/data/ghibli.json';
      const result = await data.getDirectors(url);
      expect(result).toEqual(expect.any(Array));
    }); */

  it('getDirectors deve retornar um array vazio em caso de erro', async () => {
    expect.assertions(1);
    const url = 'http://example.com/data/invalid.json'; // URL inválida
    const result = await data.getDirectors(url);
    expect(result).toEqual([]);
  });
});


describe('filterItemsBySearchTerm', () => {
  const movies = [
    { title: 'Movie A' },
    { title: 'Movie B' },
    { title: 'Movie C' },
  ];

  it('is a function', () => {
    expect(typeof filterItemsBySearchTerm).toBe('function');
  });

  it('returns filtered items based on title search term', () => {
    const searchTerm = 'movie';
    const filteredItems = filterItemsBySearchTerm(movies, searchTerm);
    expect(filteredItems).toEqual([
      { title: 'Movie A' },
      { title: 'Movie B' },
      { title: 'Movie C' },
    ]);
  });

  it('returns empty array when no matches found', () => {
    const searchTerm = 'nonexistent';
    const filteredItems = filterItemsBySearchTerm(movies, searchTerm);
    expect(filteredItems).toEqual([]);
  });
});


describe('filterByDirector', () => {
  const movies = [
    { title: 'Movie A', director: 'Director A' },
    { title: 'Movie B', director: 'Director B' },
    { title: 'Movie C', director: 'Director A' },
  ];

  it('is a function', () => {
    expect(typeof filterByDirector).toBe('function');
  });

  it('returns all movies when director is "all"', () => {
    const director = 'all';
    const filteredMovies = filterByDirector(movies, director);
    expect(filteredMovies).toEqual([
      { title: 'Movie A', director: 'Director A' },
      { title: 'Movie B', director: 'Director B' },
      { title: 'Movie C', director: 'Director A' },
    ]);
  });

  it('returns filtered movies by director', () => {
    const director = 'Director A';
    const filteredMovies = filterByDirector(movies, director);
    expect(filteredMovies).toEqual([
      { title: 'Movie A', director: 'Director A' },
      { title: 'Movie C', director: 'Director A' },
    ]);
  });

  it('returns empty array when no matches found', () => {
    const director = 'Nonexistent Director';
    const filteredMovies = filterByDirector(movies, director);
    expect(filteredMovies).toEqual([]);
  });
});

describe('calculatePercentage', () => {
  const filteredMovies = [
    { title: 'Movie A', director: 'Director A' },
    { title: 'Movie B', director: 'Director B' },
    { title: 'Movie C', director: 'Director A' },
  ];

  const movies = 10;

  it('returns "" when filterByDirector is "all"', () => {
    const filterByDirector = 'all';
    const result = calculatePercentage(filteredMovies, movies, filterByDirector);
    expect(result).toBe('');
  });

  it('returns the correct percentage when filterByDirector matches movies', () => {
    const filterByDirector = 'Director A';
    const result = calculatePercentage(filteredMovies, movies, filterByDirector);
    expect(result).toBe('66%');
  });

  /*   it('returns "0%" when filterByDirector does not match any movies', () => {
      const filterByDirector = 'Nonexistent Director';
      const result = calculatePercentage(filteredMovies, movies, filterByDirector);
      expect(result).toBe('0%');
    }); */
});


describe('filterCharactersByMovie', () => {
  const movies = [
    {
      title: 'Movie A',
      people: ['Character A1', 'Character A2']
    },
    {
      title: 'Movie B',
      people: ['Character B1', 'Character B2']
    },
    {
      title: 'Movie C',
      people: ['Character C1', 'Character C2']
    }
  ];

  it('is a function', () => {
    expect(typeof filterCharactersByMovie).toBe('function');
  });

  it('returns all characters when title is "all"', () => {
    const title = 'all';
    const filteredCharacters = filterCharactersByMovie(movies, title);
    expect(filteredCharacters).toEqual(['Character A1', 'Character A2', 'Character B1', 'Character B2', 'Character C1', 'Character C2']);
  });

  it('returns characters of specified movie', () => {
    const title = 'Movie B';
    const filteredCharacters = filterCharactersByMovie(movies, title);
    expect(filteredCharacters).toEqual(['Character B1', 'Character B2']);
  });

  it('returns empty array when no matches found', () => {
    const title = 'Nonexistent Movie';
    const filteredCharacters = filterCharactersByMovie(movies, title);
    expect(filteredCharacters).toEqual([]);
  });
});

describe('filterByGender', () => {
  const movies = [
    {
      title: 'Movie A',
      people: [
        { name: 'Person A1', gender: 'Male' },
        { name: 'Person A2', gender: 'Female' },
        { name: 'Person A3', gender: 'Male' }
      ]
    },
    {
      title: 'Movie B',
      people: [
        { name: 'Person B1', gender: 'Female' },
        { name: 'Person B2', gender: 'Male' },
        { name: 'Person B3', gender: 'Male' }
      ]
    },
    {
      title: 'Movie C',
      people: [
        { name: 'Person C1', gender: 'Female' },
        { name: 'Person C2', gender: 'Female' },
        { name: 'Person C3', gender: 'Non-binary' }
      ]
    }
  ];

  it('is a function', () => {
    expect(typeof filterByGender).toBe('function');
  });

  it('returns all people when selected gender is "all"', () => {
    const selectedGender = 'all';
    const filteredPeople = filterByGender(movies, selectedGender);
    expect(filteredPeople).toEqual([
      { name: 'Person A1', gender: 'Male' },
      { name: 'Person A2', gender: 'Female' },
      { name: 'Person A3', gender: 'Male' },
      { name: 'Person B1', gender: 'Female' },
      { name: 'Person B2', gender: 'Male' },
      { name: 'Person B3', gender: 'Male' },
      { name: 'Person C1', gender: 'Female' },
      { name: 'Person C2', gender: 'Female' },
      { name: 'Person C3', gender: 'Non-binary' }
    ]);
  });

  it('returns people of specified gender', () => {
    const selectedGender = 'female';
    const filteredPeople = filterByGender(movies, selectedGender);
    expect(filteredPeople).toEqual([
      { name: 'Person A2', gender: 'Female' },
      { name: 'Person B1', gender: 'Female' },
      { name: 'Person C1', gender: 'Female' },
      { name: 'Person C2', gender: 'Female' }
    ]);
  });

  it('returns empty array when no matches found', () => {
    const selectedGender = 'nonexistent';
    const filteredPeople = filterByGender(movies, selectedGender);
    expect(filteredPeople).toEqual([]);
  });
});

describe('sortByTitleAZ', () => {
  const movies = [
    { title: 'Z Movie' },
    { title: 'A Movie' },
    { title: 'C Movie' },
    { title: 'B Movie' },
    { title: 'X Movie' }
  ];

  it('is a function', () => {
    expect(typeof sortByTitleAZ).toBe('function');
  });

  it('sorts movies by title in ascending order', () => {
    const sortedMovies = sortByTitleAZ(movies);
    expect(sortedMovies).toEqual([
      { title: 'A Movie' },
      { title: 'B Movie' },
      { title: 'C Movie' },
      { title: 'X Movie' },
      { title: 'Z Movie' }
    ]);
  });
});

describe('sortByTitleZA', () => {
  const movies = [
    { title: 'Z Movie' },
    { title: 'A Movie' },
    { title: 'C Movie' },
    { title: 'B Movie' },
    { title: 'X Movie' }
  ];

  it('is a function', () => {
    expect(typeof sortByTitleZA).toBe('function');
  });

  it('sorts movies by title in descending order', () => {
    const sortedMovies = sortByTitleZA(movies);
    expect(sortedMovies).toEqual([
      { title: 'Z Movie' },
      { title: 'X Movie' },
      { title: 'C Movie' },
      { title: 'B Movie' },
      { title: 'A Movie' }
    ]);
  });
});

describe('sortByReleaseYearOld', () => {
  const movies = [
    { title: 'Movie 1', release_date: 2005 },
    { title: 'Movie 2', release_date: 1998 },
    { title: 'Movie 3', release_date: 2010 },
    { title: 'Movie 4', release_date: 1995 },
    { title: 'Movie 5', release_date: 2022 }
  ];

  it('is a function', () => {
    expect(typeof sortByReleaseYearOld).toBe('function');
  });

  it('sorts movies by release year in ascending order', () => {
    const sortedMovies = sortByReleaseYearOld(movies);
    expect(sortedMovies).toEqual([
      { title: 'Movie 4', release_date: 1995 },
      { title: 'Movie 2', release_date: 1998 },
      { title: 'Movie 1', release_date: 2005 },
      { title: 'Movie 3', release_date: 2010 },
      { title: 'Movie 5', release_date: 2022 }
    ]);
  });
});

describe('sortByReleaseYearNew', () => {
  const movies = [
    { title: 'Movie 1', release_date: 2005 },
    { title: 'Movie 2', release_date: 1998 },
    { title: 'Movie 3', release_date: 2010 },
    { title: 'Movie 4', release_date: 1995 },
    { title: 'Movie 5', release_date: 2022 }
  ];

  it('is a function', () => {
    expect(typeof sortByReleaseYearNew).toBe('function');
  });

  it('sorts movies by release year in descending order', () => {
    const sortedMovies = sortByReleaseYearNew(movies);
    expect(sortedMovies).toEqual([
      { title: 'Movie 5', release_date: 2022 },
      { title: 'Movie 3', release_date: 2010 },
      { title: 'Movie 1', release_date: 2005 },
      { title: 'Movie 2', release_date: 1998 },
      { title: 'Movie 4', release_date: 1995 }
    ]);
  });
});

describe('sortByRottenTomatoesHigh', () => {
  const movies = [
    { title: 'Movie 1', rt_score: 90 },
    { title: 'Movie 2', rt_score: 75 },
    { title: 'Movie 3', rt_score: 82 },
    { title: 'Movie 4', rt_score: 95 },
    { title: 'Movie 5', rt_score: 87 }
  ];

  it('is a function', () => {
    expect(typeof sortByRottenTomatoesHigh).toBe('function');
  });

  it('sorts movies by Rotten Tomatoes score in descending order', () => {
    const sortedMovies = sortByRottenTomatoesHigh(movies);
    expect(sortedMovies).toEqual([
      { title: 'Movie 4', rt_score: 95 },
      { title: 'Movie 1', rt_score: 90 },
      { title: 'Movie 5', rt_score: 87 },
      { title: 'Movie 3', rt_score: 82 },
      { title: 'Movie 2', rt_score: 75 }
    ]);
  });
});

describe('sortByRottenTomatoesLow', () => {
  const movies = [
    { title: 'Movie 1', rt_score: 90 },
    { title: 'Movie 2', rt_score: 75 },
    { title: 'Movie 3', rt_score: 82 },
    { title: 'Movie 4', rt_score: 95 },
    { title: 'Movie 5', rt_score: 87 }
  ];

  it('is a function', () => {
    expect(typeof sortByRottenTomatoesLow).toBe('function');
  });

  it('sorts movies by Rotten Tomatoes score in ascending order', () => {
    const sortedMovies = sortByRottenTomatoesLow(movies);
    expect(sortedMovies).toEqual([
      { title: 'Movie 2', rt_score: 75 },
      { title: 'Movie 3', rt_score: 82 },
      { title: 'Movie 5', rt_score: 87 },
      { title: 'Movie 1', rt_score: 90 },
      { title: 'Movie 4', rt_score: 95 }
    ]);
  });
});

// describe('fetchMovies', () => {
//   it('fetches movies data successfully', (done) => {
//     fetchMovies((error, movies) => {
//       expect(error).toBeNull();
//       expect(Array.isArray(movies)).toBe(true);
//       expect(movies.length).toBeGreaterThan(0);
//       // Aqui você pode adicionar mais asserts para verificar os detalhes dos filmes

//       done();
//     });
//   });

//   it('handles fetch error', (done) => {
//     fetchMovies((error, movies) => {
//       expect(error).toBeDefined();
//       expect(Array.isArray(movies)).toBe(false);
//       expect(movies.length).toBe(0);

//       done();
//     });
//   });

//   it('handles unsupported fetch', (done) => {
//     fetchMovies((error, movies) => {
//       expect(error).toBeDefined();
//       expect(Array.isArray(movies)).toBe(false);
//       expect(movies.length).toBe(0);

//       done();
//     });
//   });
// });

