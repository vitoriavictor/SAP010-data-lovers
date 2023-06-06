import { data, filterItemsBySearchTerm, filterByDirector, calculatePercentage, filterCharactersByMovie, filterByGender, sortByTitleAZ, sortByTitleZA, sortByReleaseYearOld, sortByReleaseYearNew, sortByRottenTomatoesHigh, sortByRottenTomatoesLow } from '../src/data.js';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('getMovies deve retornar uma lista de filmes', async () => {
    expect.assertions(2);

    const mockResponse = {
      films: [
        {
          "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
          "title": "Castle in the Sky",
          "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
          "director": "Hayao Miyazaki",
          "producer": "Isao Takahata",
          "poster": "https://static.wikia.nocookie.net/studio-ghibli/images/c/c1/Castle_in_the_Sky.jpg",
          "release_date": "1986",
          "rt_score": "95",
          "people": [
            {
              "id": "fe93adf2-2f3a-4ec4-9f68-5422f1b87c01",
              "name": "Pazu",
              "img": "https://static.wikia.nocookie.net/studio-ghibli/images/8/8b/Pazu.jpg",
              "gender": "Male",
              "age": "13",
              "eye_color": "Black",
              "hair_color": "Brown",
              "specie": "Human"
            }
          ]
        },
        {
          "id": "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
          "title": "My Neighbor Totoro",
          "description": "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
          "director": "Hayao Miyazaki",
          "producer": "Hayao Miyazaki",
          "poster": "https://static.wikia.nocookie.net/studio-ghibli/images/d/db/My_Neighbor_Totoro.jpg",
          "release_date": "1988",
          "rt_score": "93",
          "people": [
            {
              "id": "986faac6-67e3-4fb8-a9ee-bad077c2e7fe",
              "name": "Satsuki Kusakabe",
              "img": "https://static.wikia.nocookie.net/studio-ghibli/images/f/f2/Satsuki_Kusakabe.jpg",
              "gender": "Female",
              "age": "11",
              "eye_color": "Dark Brown/Black",
              "hair_color": "Dark Brown",
              "specie": "Human"
            }
          ]
        }
      ]
    };

    fetchMock.mockResponse(JSON.stringify(mockResponse));

    const result = await data.getMovies();
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBeGreaterThan(0);
  });

  it('getMovies deve retornar um array vazio em caso de erro', async () => {
    expect.assertions(1);

    fetchMock.mockReject(new Error('Erro na requisição'));

    const result = await data.getMovies();
    expect(result).toEqual([]);
  });

  it('getDirectors deve retornar uma lista de diretores únicos', async () => {
    expect.assertions(1);

    const mockResponse = {
      films: [
        {
          id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
          title: 'Castle in the Sky',
          director: 'Hayao Miyazaki'
        },
        {
          id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
          title: 'My Neighbor Totoro',
          director: 'Hayao Miyazaki'
        },
        {
          id: '8123e5c6-58e1-409d-8673-9e866d3f3018',
          title: 'Spirited Away',
          director: 'Hayao Miyazaki'
        },
        {
          id: '38b5e828-008f-41a5-8b46-25ae8f3ae1c2',
          title: 'Grave of the Fireflies',
          director: 'Isao Takahata'
        }
      ],
    };

    fetchMock.mockResponse(JSON.stringify(mockResponse));

    const result = await data.getDirectors();
    expect(result).toEqual(expect.any(Array));
  });

  it('getDirectors deve retornar um array vazio em caso de erro', async () => {
    expect.assertions(1);

    fetchMock.mockReject(new Error('Erro na requisição'));

    const result = await data.getDirectors();
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
    { title: 'Movie B', director: 'Director A' },
    { title: 'Movie C', director: 'Director A' },
  ];

  const totalMoviesCount = 10;

  it('returns "" when selectedDirector is "all"', () => {
    const selectedDirector = 'all';
    const result = calculatePercentage(filteredMovies, totalMoviesCount, selectedDirector);
    expect(result).toBe('');
  });

  it('returns the correct percentage when selectedDirector matches movies', () => {
    const selectedDirector = 'Director B';
    const result = calculatePercentage(filteredMovies, totalMoviesCount, selectedDirector);
    expect(result).toBe("Os filmes desse diretor representam 30% do total dos filmes.");
  });
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
//   it('deve chamar a função de callback com a lista de filmes quando a requisição for bem-sucedida', () => {
//     // Mock da função fetch usando Jest
//     window.fetch = jest.fn().mockResolvedValue({
//       json: jest.fn().mockResolvedValue({
//         films: [
//           { title: 'Filme 1' },
//           { title: 'Filme 2' },
//           { title: 'Filme 3' },
//         ],
//       }),
//     });

//     // Mock da função de callback
//     const callback = jest.fn();

//     // Chama a função fetchMovies
//     fetchMovies(callback);

//     // Verifica se a função fetch foi chamada corretamente
//     expect(window.fetch).toHaveBeenCalledWith('./data/ghibli/ghibli.json');

//     // Espera que a função de callback seja chamada com os filmes
//     expect(callback).toHaveBeenCalledWith(null, [
//       { title: 'Filme 1' },
//       { title: 'Filme 2' },
//       { title: 'Filme 3' },
//     ]);
//   });

//   it('deve chamar a função de callback com o erro quando ocorrer um erro na requisição', () => {
//     // Mock da função fetch usando Jest
//     window.fetch = jest.fn().mockRejectedValue(new Error('Erro na requisição'));

//     // Mock da função de callback
//     const callback = jest.fn();

//     // Chama a função fetchMovies
//     fetchMovies(callback);

//     // Verifica se a função fetch foi chamada corretamente
//     expect(window.fetch).toHaveBeenCalledWith('./data/ghibli/ghibli.json');

//     // Espera que a função de callback seja chamada com o erro
//     expect(callback).toHaveBeenCalledWith(new Error('Erro na requisição'));
//   });

//   it('deve chamar a função de callback com o erro quando o fetch não é suportado', () => {
//     // Remove a função fetch para simular a falta de suporte
//     window.fetch = undefined;

//     // Mock da função de callback
//     const callback = jest.fn();

//     // Chama a função fetchMovies
//     fetchMovies(callback);

//     // Espera que a função de callback seja chamada com o erro
//     expect(callback).toHaveBeenCalledWith(new Error('Fetch is not supported.'));
//   });
// });





