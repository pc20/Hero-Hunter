let apiKey = '00bcb4c14b2667eba2a78c1f12db06c0';
let hash = 'd31064b0c287880432d76c1878bc34b7';

let myLocalStorage = window.localStorage;
let heroId = myLocalStorage.getItem('heroId');

async function loadHeroData(){
    
    let url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=${apiKey}&hash=${hash}&ts=1`;
    console.log(url);
    await  fetch(url)
            .then((response) => response.json())
            .then((data) => console.log(data));
}