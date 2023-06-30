const params = new URLSearchParams(location.search);
const movieID = params.get("id");
const movieCardNode = document.querySelector(".card__wrapper");

const renderMovieDesc = (card) => {
  movieCardNode.innerHTML = `
    <div class="js-card card__description">
        <div class="card__image">
            <img src=${card.Poster} alt="poster">
        </div>
        <div class="card__list">
            <p class="movie__title">${card.Title}</p>
            <p class="movie__description">Year:<span>${card.Year}</span></p>
            <p class="movie__description">Rated:<span>${card.Rated}</span></p>
            <p class="movie__description">Released:<span>${card.Released}</span></p>
            <p class="movie__description">Runtime:<span>${card.Runtime}</span></p>
            <p class="movie__description">Genre:<span>${card.Genre}</span></p>
            <p class="movie__description">Director:<span>${card.Director}</span></p>
            <p class="movie__description">Writer:<span>${card.Writer}</span></p>
            <p class="movie__description">Actors:<span>${card.Actors}</span></p>
        </div>
    </div>
    <p class="movie__plot">${card.Plot}</p>
  `;
};

fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=1592a150`)
   .then((response) => { 
    if (response.ok) { 
      return response.json(); 
    } 
    console.log(error); 
    renderError("Error occurred!"); 
  }) 
  .then((response) => { 
    renderMovieDesc(response); 
  })
