
let apiKey = '00bcb4c14b2667eba2a78c1f12db06c0';
let hash = 'd31064b0c287880432d76c1878bc34b7';

let myLocalStorage = window.localStorage;

async function getSearchData(){
    let input = document.getElementById('searchBox');
    let heroName = input.value;
    console.log(heroName);
    let list = document.getElementById('heroList');
    if(heroName.length<2){
      list.innerHTML = '';
    }else{
      list.innerHTML = '';
      url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&apikey=${apiKey}&hash=${hash}&ts=1`;
      console.log(url);
      await  fetch(url)
            .then((response) => response.json())
            .then((data) => showData(data));
    }
}

function showData(json){
  let data =  json.data;
  // console.log(data);
  let list = document.getElementById('heroList');
  // console.log(data.results);
  for( let hero of data.results){
    console.log(hero);
    let heroCard = document.createElement('div');
    heroCard.setAttribute("class","hero-box");
    heroCard.setAttribute("id",hero.id)
    // heroCard.setAttribute("style","width: 18rem;");

    let heroImg = document.createElement('img');
    let anchorTag = document.createElement('a');
    // anchorTag.setAttribute('href','hero.html');
    let path = hero.thumbnail.path +'.'+ hero.thumbnail.extension;
    heroImg.setAttribute("src",path);
    heroImg.setAttribute("width","100%");
    heroImg.setAttribute("height","100%");
    heroImg.addEventListener("click",()=>{addHeroId(hero.id)});
    anchorTag.appendChild(heroImg);
    heroCard.appendChild(anchorTag);
    // console.log(path);

    let title = document.createElement('h4');
    title.innerText=hero.name;
    heroCard.appendChild(title);

    let favButton = document.createElement('button');
    favButton.setAttribute('class','btn btn-primary end');
    favButton.innerHTML='Add To Favourites <span class="glyphicon glyphicon-heart"></span>';
    favButton.addEventListener("click",()=>{addToFav(hero.id,hero.name,path)});
    heroCard.appendChild(favButton);

    // console.log(hero.name);
    list.appendChild(heroCard);
  }
}

async function addHeroId(heroId){
  console.log(heroId);
  let url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=${apiKey}&hash=${hash}&ts=1`;
  console.log(url);
  await  fetch(url)
          .then((response) => response.json())
          .then((data) => showHeroInfo(data));
}

async function showHeroInfo(json){
  let hero = json.data.results[0];
  // console.log(hero);
  let path = hero.thumbnail.path +'.'+ hero.thumbnail.extension;
  let comics = hero.comics.available;
  let series = hero.series.available;
  let events = hero.events.available;
  let stories = hero.stories.available;

  let description = '';
  if(hero.description){
    description = hero.description;
  }else{
    description = hero.name;
  }
  
  let list = document.getElementById('heroList');
  list.innerHTML = '';
  list.innerHTML += `
            <div class="hero-info-box">
              
              <div class="img-about">
                  <img src ="${path}" width="40%" height="65%" display="inline">
                  <div style="width:50%;">
                    <h1>${hero.name}</h1>
                    <label>About:</label>
                    <p>${description}</p>
                    <label>Comics:</label> ${comics} |
                    <label>Series:</label> ${series} |
                    <label>Events:</label> ${events} |
                    <label>Stories:</label> ${stories}
                  </div>
              </div>
              
              <div id="comics"> 
              
              </div>
            </div>
  `;
  let comicUrl = `https://gateway.marvel.com:443/v1/public/characters/${hero.id}/comics?apikey=${apiKey}&hash=${hash}&ts=1`;
  await  fetch(comicUrl)
  .then((response) => response.json())
  .then((data) => loadComics(data.data.results));
}

async function loadComics(comics){
  console.log(comics);
  let comicsDiv = document.getElementById("comics");
  for(let i = 0; i<6; i++){
    let comic = comics[i];
    if(comic){
      console.log(comic);
      let comicCard = document.createElement('div');
      comicCard.setAttribute("class","hero-box");
      let path = comic.thumbnail.path +'.'+ comic.thumbnail.extension;
      comicCard.innerHTML = `
        <h4>${comic.title}</h4>
        <img src=${path} width="100%" height="100%">
      `;
      comicsDiv.appendChild(comicCard);
    }
  }
}

function addToFav(id){
  let favourites = JSON.parse(myLocalStorage.getItem("fav"));
  
  if(favourites){
    favourites.push(id);
  }else{
    favourites = [];
    favourites.push(id);
  }
  console.log(favourites);
  myLocalStorage.setItem("fav",JSON.stringify(favourites));
  alert('Hero successfully added to your Favourites');
}

function loadPage(){
  let heroId = myLocalStorage.getItem("heroId");
  if(heroId){
    myLocalStorage.removeItem("heroId");
    addHeroId(heroId);
  }
}
loadPage();

async function showCharacter(){
  let urlQueryParameters = new URLSearchParams(window.location.search),
  queryParameterName = urlQueryParameters.get("name");
  console.log(queryParameterName);
  url = `https://gateway.marvel.com:443/v1/public/characters?name=${queryParameterName}&apikey=${apiKey}&hash=${hash}&ts=1`;
      
      await  fetch(url)
            .then((response) => response.json())
            .then((data) => showData(data));
}