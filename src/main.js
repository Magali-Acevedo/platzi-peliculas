//Usando axios
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: "2e881487d806686e974db193b2379e05",
  },
});

//funciones repetidas
//render peliculas
function renderMovies(movies, container) {
  container.innerText = "";
  movies.forEach((movie) => {
    //CREAMOS LAS TARJETAS CON LOS POSTERS EN TENDENCIA
    if (movie.poster_path !== null){
      const imgMovie = document.createElement("img");
      imgMovie.classList.add("img-pelicula");
      imgMovie.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w300/" + movie.poster_path
      );
      imgMovie.setAttribute(
        "alt",
        "Imagen de la pelicula " + movie.original_title
      );
  
      const imgFigure = document.createElement("figure");
      imgFigure.classList.add("pelicula-card--containerImg");
      imgFigure.addEventListener("click" , ()=>{
        location.hash="#movie=" + movie.id;
      });
      imgFigure.appendChild(imgMovie);
  
      container.appendChild(imgFigure);      
    }


  });
}
//slide render slideContainerImg
function renderMoviesSlide(movies, container) {
  movies.forEach((movie) => {
    //USAMOS LAS IMG DE TENDENCIA PARA EL SLIDE

    //contenedor de la img slide
    const itemSlide = document.createElement("div");
    itemSlide.classList.add("item-slide");

    //img del slade va dentro de item slide
    const imgSlide = document.createElement("img");
    imgSlide.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w780/" + movie.poster_path
    );

    //Contenedor de dos div descripcion y btn
    const divContainerDescription = document.createElement("div");
    divContainerDescription.classList.add("item-slide--description");

    //div contenedor de el titulo y la descripción va a dentro de divcontainer
    const divContainerTop = document.createElement("div");

    //Titulo de la pelicula va a dentro de container top
    const movieTitle = document.createElement("h2");
    movieTitle.innerText = movie.original_title;
    //Descripcion de la pelicula va a dentro de container top
    const movieDescription = document.createElement("p");
    movieDescription.innerText = movie.overview;

    //Div contenedor del btn ver
    const divContainerBtn = document.createElement("div");
    //btn ver
    const btnSlide = document.createElement("a");
    btnSlide.classList.add("btn-ver");
    btnSlide.innerText = "VER";
    btnSlide.addEventListener("click", () => {
      location.hash ="#movie=" + movie.id;
    });

    divContainerBtn.appendChild(btnSlide);

    divContainerTop.appendChild(movieTitle);
    divContainerTop.appendChild(movieDescription);

    divContainerDescription.appendChild(divContainerTop);
    divContainerDescription.appendChild(divContainerBtn);

    itemSlide.appendChild(imgSlide);
    itemSlide.appendChild(divContainerDescription);

    container.appendChild(itemSlide);
  });
}

//Render por categoria
function renderGenres(genres, container){
  container.innerText = "";
  genres.forEach((genre) => {
    //lista items
    const liGenre = document.createElement("li");
    const aGenre = document.createElement("a");
    aGenre.setAttribute("id", genre.id);
    aGenre.innerText = genre.name;

    liGenre.addEventListener("click", () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });

    liGenre.appendChild(aGenre);
    container.appendChild(liGenre);
  });
}
/* Menu desplegable */
/*const menuControlador = document.querySelector(".menu-controlador");
const menuDesplegable = document.querySelector(".nav-menu");

menuControlador.addEventListener("click", menuToggle);

function menuToggle() {
  const isOpenMenuDesplegable = menuDesplegable.classList.contains("inactivo");

  if (!isOpenMenuDesplegable) {
    menuDesplegable.classList.add("inactivo");
  } else {
    menuDesplegable.classList.remove("inactivo");
  }
}
*/
/*Llamado de peliculas tendencia del dia*/

async function getTrendingMoviesPreview() {
  /*
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
     const data = await res.json();
    );*/
  //const res=
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  console.log(movies)

  /* SLIDER paginacion imgenes pequeñas */
  const slideOne = document.querySelector(".img-slide--one");
  const slideTwo = document.querySelector(".img-slide--two");
  const slideThree = document.querySelector(".img-slide--three");

  slideOne.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w300/" + movies[0].poster_path
  );
  slideTwo.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w300/" + movies[1].poster_path
  );
  slideThree.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w300/" + movies[0].poster_path
  );

  //seccion tendencias slide
  renderMoviesSlide(movies, slideContainerImg);
  //CREAMOS LAS TARJETAS CON LOS POSTERS EN TENDENCIA
  renderMovies(movies, articleMoviesTrending);
}
/*Lista de generos dispinibles */
async function getGenrePreview() {
  const { data } = await api("genre/movie/list");
  const genres = data.genres;
 
  renderGenres(genres,ulGenresContainer);
}
/*Lista de peliculas discovery*/
async function getListMovie() {
  const { data } = await api("discover/movie");
  const moviesList = data.results;

  renderMovies(moviesList, moviesRecomendadosList);
}
/*Peliculas por categoria */
async function getMovieByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const viewGenres = data.results;
  renderMovies(viewGenres, articleMoviesList)}

 /*Peliculas resultados buscador*/
 async function getSearchMovie(keyword) {
  const { data } = await api("search/movie", {
    params: {
      query: keyword,
    },
  });
  const viewGenres = data.results;
  renderMovies(viewGenres, articleMoviesList)}

//Detalle de las peliculas
async function getMovieDetails(id) {
  const { data: movie } = await api("movie/" + id);
  
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

  const titleMovie= document.querySelector(".movie-title");
  titleMovie.innerText = movie.title;

  details.style.background = `
  linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%
  ),
  url(${movieImgUrl})
`;
  /*imgDetails.src= 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(details)
  imgDetails.setAttribute("alt", movie.title);*/
  const yearMovie= document.querySelector(".year");
  yearMovie.innerText = movie.release_date.substring(0,4);

  const lenguageMovie= document.querySelector(".lenguage");
  lenguageMovie.innerText = movie.original_language;


  const movieDetails = document.querySelector(".movie-details");
  movieDetails.innerText = movie.overview;

  const range = document.querySelector(".range");
  range.innerText=movie.vote_average;
  renderGenres(movie.genres,ulGenresContainerDetails);

  getmoviesRelated(id);


}
//peliculas relacionadas
async function getmoviesRelated(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  
  const relatesMovies = data.results;

  renderMovies(relatesMovies,  articleMoviesListRelated);

}