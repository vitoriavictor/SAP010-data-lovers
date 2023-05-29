import { filterByDirector, sortByTitleAZ } from '../src/data.js';


describe('filterByDirector', () => {
  it('retorno dos nomes dos diretores "all"', () => {
    expect(filterByDirector(movies, 'all')).toEqual(movies);
  });

  it('retorno filmes do diretor 1', () => {
    const filmsFiltred = filterByDirector(movies, 'diretor 1' );
    expect(filmsFiltred).toEqual([movies[0]]);
  });

  it('retorno vazio se nenhum filme', () => {
    const filmsFiltred = filterByDirector(movies, 'sem diretor' );
    expect(filmsFiltred).toEqual([]);
  });
});


/* describe('sortByTitleAZ', () => {
  it('colocar filmes ordem crescente', () => {
    const ordedFilmsAZ = sortByTitleAZ(movies);
    const titleMovies = ordedFilmsAZ.map(films => films.title);
    const titleSpect = ordedFilmsAZ.map(films => films.title) .sortByTitleAZ(movies)

    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
}); */
