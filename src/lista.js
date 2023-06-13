// FILMOGRAFIA NOVA

function createMovieCard(films) {
  const container = document.getElementById('movie-container');
  const card = document.createElement("div");
  card.classList.add("card");
  
  const front = document.createElement("div");
  front.classList.add("front");
  
  const image = document.createElement("img");
  image.src = films.poster;
  
  const title = document.createElement("h3");
  title.textContent = films.title;  
  
  const releaseDate = document.createElement("p");
  releaseDate.textContent = "Ano de lançamento: " + films.release_date;

  const viewMore = document.createElement("a");
  viewMore.textContent = "Veja mais ➤";
  
  front.appendChild(image);
  front.appendChild(title);
  front.appendChild(releaseDate);
  front.appendChild(viewMore);
  
  const back = document.createElement("div");
  back.classList.add("back");

  const director = document.createElement("h4");
  director.textContent = "Diretor: " +  films.director;

  const producer = document.createElement("h4");
  producer.textContent = "Produtor: " +  films.producer;
  
  const description = document.createElement("p");
  description.textContent =  "Sinopse: " + films.description;

  const score = document.createElement("p");
  score.textContent = "Nota no Rotten Tomatoes: " +  films.rt_score + "%";
  
  back.appendChild(description);
  back.appendChild(director);
  back.appendChild(producer);
  back.appendChild(score);
  
  card.appendChild(front);
  card.appendChild(back);
  container.appendChild(card);
  
  // Adicionar função de flip ao card
  card.addEventListener("click", function() {
    card.classList.toggle("flipped");
    // console.log(1);
  });
  
  return card;
}

// Carregar dados de um arquivo JSON
fetch('./data/ghibli/ghibli.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.films.length; i++) {
      const filme = data.films[i];
      // console.log(filme);
      createMovieCard(filme);
    }
  })
  // .catch(error => {
  //   // console.error('Ocorreu um erro ao carregar os dados:', error);
  // });
