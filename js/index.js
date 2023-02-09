
let apiKey = '00bcb4c14b2667eba2a78c1f12db06c0';
let hash = 'd31064b0c287880432d76c1878bc34b7';

let myLocalStorage = window.localStorage;

async function getSearchData(){
    let input = document.getElementById('searchBox');
    let heroName = input.value;
    // console.log(heroName);
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
    anchorTag.setAttribute('href','hero.html');
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

    // console.log(hero.name);
    list.appendChild(heroCard);
  }
}

function addHeroId(heroId){
  console.log(heroId);
  myLocalStorage.setItem('heroId',heroId);
}