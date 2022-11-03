let leng;
//lenguage
/*
lenguageES.addEventListener("click", ()=> {

 leng = "es";
 getfavouritesMovies();
 getTrendingMoviesPreview();
 getGenrePreview();
 getListMovie();
 console.log(leng)
 
});
lenguageEN.addEventListener("click", ()=> {
 leng = "en";
 getfavouritesMovies();
 getTrendingMoviesPreview();
 getGenrePreview();
 getListMovie();

})
*/

//DATOS
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: leng,

  },
});

function favouritesMoviesList() {
  const item = JSON.parse(localStorage.getItem("liked_movies"));
  let movies;

  if(item) {
    movies = item;
  } else {
    movies = {};
  }
  return movies;
}


function favouriteMovie(movie) {
  

  const likedMovies = favouritesMoviesList();

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
   // console.log("ya existe se elimino");
  } else {
    likedMovies[movie.id] = movie;
    //console.log("se agrego");
  }

  localStorage.setItem("liked_movies", JSON.stringify(likedMovies));

} 

//lazy loader

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((movie) => {
    
    if (movie.isIntersecting) {
      const url = movie.target.getAttribute("img-src");
      movie.target.setAttribute("src", url);
    }
  });
});

//funciones repetidas
//render peliculas
function renderMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerText = "";
  }

  movies.forEach((movie) => {
    //CREAMOS LAS TARJETAS CON LOS POSTERS EN TENDENCIA

    const imgMovie = document.createElement("img");
    imgMovie.classList.add("img-pelicula");

    if (movie.poster_path !== null) {
      imgMovie.setAttribute(
        lazyLoad ? "img-src" : "src",
        "https://image.tmdb.org/t/p/w300/" + movie.poster_path
      );
    } else {
      imgMovie.setAttribute(
        lazyLoad ? "img-src" : "src",
        "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
      );
    }

    if (lazyLoad) {
      lazyLoader.observe(imgMovie);
    }

    imgMovie.setAttribute(
      "alt",
      "Imagen de la pelicula " + movie.original_title
    );

    const imgFigure = document.createElement("figure");
    imgFigure.classList.add("pelicula-card--containerImg");
    const btnMovie = document.createElement("button");
    btnMovie.classList.add("btn-movie");

    favouritesMoviesList()[movie.id] && btnMovie.classList.add("btn-movie--liked");
    btnMovie.addEventListener("click", ()=> {
      btnMovie.classList.toggle("btn-movie--liked");
      favouriteMovie(movie);
      getfavouritesMovies();

    })
    imgMovie.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });
    imgFigure.appendChild(imgMovie);
    imgFigure.appendChild(btnMovie);
    container.appendChild(imgFigure);
  });
}
//slide render slideContainerImg
function renderMoviesSlide(movies, container, lazyLoad = false) {
  movies.forEach((movie) => {
    //USAMOS LAS IMG DE TENDENCIA PARA EL SLIDE

    //contenedor de la img slide
    const itemSlide = document.createElement("div");
    itemSlide.classList.add("item-slide");

    //img del slade va dentro de item slide
    const imgSlide = document.createElement("img");
    imgSlide.setAttribute(
      lazyLoad ? "img-src" : "src",
      "https://image.tmdb.org/t/p/w780/" + movie.poster_path
    );

    if (lazyLoad) {
      lazyLoader.observe(imgSlide);
    }

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
      location.hash = "#movie=" + movie.id;
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
function renderGenres(genres, container) {
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
const menuControlador = document.querySelector(".menu-controlador");
const menuDesplegable = document.querySelector(".nav-menu");

//menuControlador.addEventListener("click", menuToggle);

function menuToggle() {
  const isOpenMenuDesplegable = menuDesplegable.classList.contains("inactivo");

  if (!isOpenMenuDesplegable) {
    menuDesplegable.classList.add("inactivo");
  } else {
    menuDesplegable.classList.remove("inactivo");
  }
}

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
  renderMoviesSlide(movies, slideContainerImg, true);
  //CREAMOS LAS TARJETAS CON LOS POSTERS EN TENDENCIA
  renderMovies(movies, articleMoviesTrending, true);
}
/*Lista de generos dispinibles */
async function getGenrePreview() {
  const { data } = await api("genre/movie/list");
  const genres = data.genres;

  renderGenres(genres, ulGenresContainer);
}
/*Lista de peliculas discovery*/
async function getListMovie() {
  const { data } = await api("discover/movie");
  const moviesList = data.results;

  renderMovies(moviesList, moviesRecomendadosList, true);
}
/*Peliculas por categoria */
async function getMovieByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
      
    },
  });
  const viewGenres = data.results;
  //console.log(data)
  
  renderMovies(viewGenres, articleMoviesList, {
    lazyLoad: true,
    clean: true,
  });
}

/*Peliculas resultados buscador*/
async function getSearchMovie(keyword) {
  const { data } = await api("search/movie", {
    params: {
      query: keyword,
     
    },
  });
  const viewGenres = data.results;
  maxPage=data.total_pages;
  renderMovies(viewGenres, articleMoviesList, true);
}

//Detalle de las peliculas
async function getMovieDetails(id) {
  const { data: movie } = await api("movie/" + id);
  let movieImgUrl = "";

  movie.poster_path !== null
    ? (movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path)
    : (movieImgUrl =
        "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg");

  const titleMovie = document.querySelector(".movie-title");
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
  const yearMovie = document.querySelector(".year");
  yearMovie.innerText = movie.release_date.substring(0, 4);

  const lenguageMovie = document.querySelector(".lenguage");
  lenguageMovie.innerText = movie.original_language;

  const movieDetails = document.querySelector(".movie-details");
  movieDetails.innerText = movie.overview;

  const range = document.querySelector(".range");
  range.innerText = movie.vote_average;
  renderGenres(movie.genres, ulGenresContainerDetails);

  getmoviesRelated(id);
}
//peliculas relacionadas
async function getmoviesRelated(id) {
  const { data } = await api(`movie/${id}/recommendations`);

  const relatesMovies = data.results;

  renderMovies(relatesMovies, articleMoviesListRelated, true);
}
//favoritos

function getfavouritesMovies() {
  const favouritesMovies = favouritesMoviesList();
  const arrayMovies= Object.values(favouritesMovies);
 // console.log("prueba")
  //console.log(arrayMovies);

  if(arrayMovies.length===0 ){
    notFav.classList.remove("inactivo");
    notFav.innerText="No hay peliculas en Favoritos"
  } else {
    notFav.classList.add("inactivo");
  }

  renderMovies(arrayMovies,articleFavouritesSeccion,{ lazyLoad:true, clean:true} )
}
//scroll infinito

async function getPaginatedMovies(keyword) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const pageIsNotMax = page < maxPage;
  const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 10;

  if (isScrollBottom && pageIsNotMax) {
    page++;
    const { data } = await api("search/movie", {
      params: {
        query: keyword,
        page,
        
      },
    });
    const movies = data.results;
    //ver que elijo
    
    renderMovies(movies, articleMoviesList, {
      lazyLoad: true,
      clean: false,
    });
  }
}

