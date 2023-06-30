const inputNode = document.querySelector(".js-search-input");
const btnNode = document.querySelector(".js-button");
const moviesListNode = document.querySelector(".js-movies-list");

let moviesArr = JSON.parse(localStorage.getItem("moviesArr")) || [];

const renderError = (error) => {
  const errorNode = document.createElement("p");
  errorNode.classList.add("input__alert");
  errorNode.innerText = error;
  moviesListNode.innerHTML = "";
  moviesListNode.appendChild(errorNode);
};

const clearInput = () => {
  inputNode.value = "";
};

const inputValidate = () => {
  inputNode.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getMovies();
    }
  });
};

const getMovies = () => {
  if (inputNode.value.trim() === "") {
    renderError("*Please enter the name of movie!");
    return;
  }

  fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=1592a150&s=${inputNode.value}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((response) => {
      if (response.Response === "True") {
        moviesArr = response.Search;
        localStorage.setItem("movies", JSON.stringify(moviesArr));
        console.log(moviesArr);
        renderMovies();
      } else {
        renderError(response.Error);
      }
    })
    .catch((error) => {
      console.log(error);
      renderError();
    });
};

const renderMovies = () => {
  let moviesHTML = "";
  moviesArr.forEach((item) => {
    let poster = item.Poster === "N/A" ? "img.svg" : item.Poster;
    moviesHTML += `
            <li class="movie__item" id=${item.imdbID}>
              <img class="movie__img" src=${poster} /> 
              <div>
              <p class="movie__title">${item.Title}</p>
              <p class="movie__year">${item.Year}</p>
              <p class="movie__type">${item.Type}</p>
              </div>
            </li>
      `;
  });
  moviesListNode.innerHTML = moviesHTML;
};

const exportMovie = (event) => {
  let target = event.target.closest(".movie__item");
  window.location.href = `movieCard.html?id=${target.id}`;
};

const init = () => {
  moviesArr = JSON.parse(localStorage.getItem("movies")) || [];
  renderMovies();
};
init();

const searchBtnHandler = () => {
  inputValidate();
  getMovies();
  clearInput();
};

btnNode.addEventListener("click", searchBtnHandler);
moviesListNode.addEventListener("click", exportMovie);
