const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


//selection des élemnts 
const main=document.getElementById("main");
const form= document.getElementById("form");
const serach=document.getElementById("search");

//intially get movies 

async function getMovies(url){
    const resp = await fetch(url);
    const respData= await resp.json();
    console.log(respData.results); //[{},{}]

    showMoviesData(respData.results)

    //callback : elle va afficher les films 
    //showMovies(respData.results);
   //MyShowMovies(respData.results)

}
getMovies(APIURL);

/***
 * input : array of ojects [{}]
 *   <div class="movie">
        <img src="..." alt="Fast X">
        <div class="movie-info">
        <h3>...</h3>
        <span class="orange">...</span>           
        </div>
        <div class="overview">
            <h3>Overview : </h3>
        ...
        </div>
    </div>

 */
    
    
    
   

function showMoviesData(movies){
    main.innerHTML='';
            movies.forEach((movie)=>{
                const movieEl=document.createElement("div"); //<div></div>
                movieEl.classList.add("movie"); //<div class="movie"> </div>
                const {poster_path,title,vote_average,overview}=movie;
                movieEl.innerHTML=`
                <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}">
                  <div class="movie-info">
                  <h3>${movie.title}</h3>
                  <span class="orange">${movie.vote_average}</span>           
                  </div>
                  <div class="overview">
                      <h3>Overview : </h3>
                      ${movie.overview}
                  </div>
                
                `
                main.appendChild(movieEl);
                
            })     
        
    
    }
form.addEventListener("submit",(e)=>{
   e.preventDefault();
   //mot de recherche 
  const searchTerm=serach.value;
  if(searchTerm){
    getMovies(SEARCHAPI+searchTerm);
    serach.value="";
  }
})





/** 
 * Consommation d'API 
 * 1- what does mean API ? serveur(api)
 * client : 
 * URL : (free , payé)
 * 2-consommation +affichage stylisé 
 */


/***
 * Logic 
 * 1-consommation d'API(njib les ddonnes eli besh naffichihom) : getMovies(url)
 * 2-showMovies(movies) : elle va injecter les donnes consommes dans le HTML
 * Luxe : design class average , search 
 */

//GOAL / tjib l'info 
//fetch movies API data 
/*
 async function getMovies(url){
    const resp =  await fetch(url);
    const respData=  await resp.json(); //conversion du format besh na9rawh 
   //pour juste extraitre les infos concernéés 
    console.log("respData",respData.results); //[{},{}, .......]

}


//getMovies(APIURL);
/*
function showMovies(movies){
    

    

}
*/







/*
function MyShowMovies(movies){

  console.log("hello we are in MyShowMovies ");
  console.log("movies",movies);
  
  movies.forEach((movie) => {
     //destrcutruing : extract des donnees       
    const {poster_path,title,vote_average,overview}=movie;


    const movieEl=document.createElement("div"); //<div></div>
    movieEl.classList.add("movie");   // <div class="movie"></div>

    movieEl.innerHTML=`
            <img src="${IMGPATH+poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>           
            </div>
            <div class="overview">
            <h3>Overview : </h3>
            ${overview}
            </div>
    `;


    main.appendChild(movieEl);


});

}

*/










