let myLocalStorage = window.localStorage;

let apiKey = '00bcb4c14b2667eba2a78c1f12db06c0';
let hash = 'd31064b0c287880432d76c1878bc34b7';

//  check localStorage and iterate over each Hero Id
function loadFavs(){
    let list = document.getElementById('heroList');
    let favourites = JSON.parse(myLocalStorage.getItem("fav"));
    list.innerHTML = '';
    if(favourites.length>0){
        for (let i = 0 ; i<favourites.length; i++) {
            addHeroId(favourites[i]);
          }
    }else{ // if no hero Id is present
        list.innerHTML =   `
            <div style="margin:auto; color:white">
                <h2> No hero available in your list. Please add some hero</h2>
            </div>
        `;
    }

}

//  fetch content of each Hero Id
async function addHeroId(heroId){
    console.log(heroId);
    let url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=${apiKey}&hash=${hash}&ts=1`;
    console.log(url);
    await  fetch(url)
            .then((response) => response.json())
            .then((data) => addHeroCard(data));
  }

//    loads Hero cards
function addHeroCard(json){
    let data =  json.data;
    let hero = data.results[0];
    let heroId = hero.id;
    let list = document.getElementById('heroList');

    let heroCard = document.createElement('div');
    heroCard.setAttribute("class","hero-box");
    heroCard.setAttribute("id",heroId);
    
    let heroImg = document.createElement('img');
    let anchorTag = document.createElement('a');
    anchorTag.setAttribute('href','index.html');
   
    let path = hero.thumbnail.path +'.'+ hero.thumbnail.extension;
    heroImg.setAttribute("src",path);
    heroImg.setAttribute("width","100%");
    heroImg.setAttribute("height","100%");
    heroImg.addEventListener("click",()=>{myLocalStorage.setItem("heroId",heroId)});
    anchorTag.appendChild(heroImg);
    heroCard.appendChild(anchorTag);
    // console.log(path);

    let title = document.createElement('h4');
    title.innerText=hero.name;
    heroCard.appendChild(title);

    let favButton = document.createElement('button');
    favButton.setAttribute('class','btn btn-primary end');
    favButton.onclick = (event) => removeFav(event,heroId);
    favButton.innerHTML='Remove From Fav &nbsp; <span class="glyphicon glyphicon-heart"></span>';
   
    heroCard.appendChild(favButton);

    // console.log(hero.name);
    list.appendChild(heroCard);
}

// remove the hero Id from local Storage and reset the Hero cards
function removeFav(event,id){
    let favourites = JSON.parse(myLocalStorage.getItem("fav"));
    let idx = favourites.indexOf(id);
    favourites.splice(idx,1);
    alert('hero is removed from your favourites')
    // console.log(favourites);
    myLocalStorage.setItem('fav',JSON.stringify(favourites));
    let heroCard = document.getElementById(id);
    let heroList = heroCard.parentNode;
    heroList.removeChild(heroCard);
    if(heroList.childNodes.length==0){ // If no heroId is present 
        heroList.innerHTML =   `
            <div style="margin:auto; color:white">
                <h2> No hero available in your list. Please add some hero</h2>
            </div>
        `;
    }
    event.stopPropagation();

}

loadFavs();