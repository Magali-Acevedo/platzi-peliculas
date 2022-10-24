let infiniteScroll;
let page = 1;
let maxPage;
/* INTENTE HACER EL CAMBIO DE IDIOMA DE DOS FORMAS PERO NO SE ME ACTUALIZA EL ARRAY---INVESTIGAR
console.log(navList.value);
navList.addEventListener("change" , ()=> {
    leng= navList.value;
 homePage();
    
  })
*/
btnSearch.addEventListener("click", () =>{
    location.hash =`#search=${inputSearch.value.trim()}`;
  
});
arrow.addEventListener("click", () =>{
    
    history.back();
    //location.hash = "#home";
});

window.addEventListener('DOMContentLoaded' , navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener("scroll", infiniteScroll,false);

function navigator() {
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

    if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if  (location.hash.startsWith('#movie=')) {
        detailsPage();
    } else if  (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop =0;
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
      }
}


function searchPage (){
    console.log('search!!');

    header.classList.remove("inactivo");
    slide.classList.add("inactivo");
    genres.classList.add("inactivo");
    moviesTrending.classList.add("inactivo");
    moviesRecomendados.classList.add("inactivo");

    line.classList.add("inactivo");
    arrow.classList.remove("inactivo");
    details.classList.add("inactivo");
    similares.classList.add("inactivo");
    resultCategory.classList.remove("inactivo");
    favouritesSeccion.classList.add("inactivo");

    resultTitle.innerText="Resultados de :"

    const [_, keyword] = location.hash.split('=');
    getSearchMovie(keyword);
    
    infiniteScroll = ()=> getPaginatedMovies(keyword) ;

}
function detailsPage (){
    console.log('movie!!');
    header.classList.add("inactivo");
    slide.classList.add("inactivo");
    genres.classList.add("inactivo");
    moviesTrending.classList.add("inactivo");
    moviesRecomendados.classList.add("inactivo");

    line.classList.remove("inactivo");
    arrow.classList.remove("inactivo");
    details.classList.remove("inactivo");
    similares.classList.remove("inactivo");
    resultCategory.classList.add("inactivo");
    favouritesSeccion.classList.add("inactivo");

    const [_, idMovie] = location.hash.split('=');
    getMovieDetails(idMovie);
}
function categoryPage(){
    console.log('category!!');
    header.classList.remove("inactivo");
    slide.classList.add("inactivo");
    genres.classList.add("inactivo");
    moviesTrending.classList.add("inactivo");
    moviesRecomendados.classList.add("inactivo");

    line.classList.add("inactivo");
    arrow.classList.remove("inactivo");
    details.classList.add("inactivo");
    similares.classList.add("inactivo");
    resultCategory.classList.remove("inactivo");
    favouritesSeccion.classList.add("inactivo");

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    resultTitle.innerText = categoryName;
    getMovieByCategory(categoryId);
}
function homePage (){
    header.classList.remove("inactivo");
    slide.classList.remove("inactivo");
    genres.classList.remove("inactivo");
    moviesTrending.classList.remove("inactivo");
    moviesRecomendados.classList.remove("inactivo");

    line.classList.add("inactivo");
    arrow.classList.add("inactivo");
    details.classList.add("inactivo");
    similares.classList.add("inactivo");
    favouritesSeccion.classList.remove("inactivo");
    resultCategory.classList.add("inactivo");

    getfavouritesMovies();
    getTrendingMoviesPreview();
    getGenrePreview();
    getListMovie();
}

