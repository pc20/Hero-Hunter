# Hero-Hunter
This is a Hero Hunter App, which is built using HTML, CSS and Vanilla JS (no external Library used).
<h3>Website: https://pc20.github.io/Hero-Hunter/index.html </h3>

<h4>It has following features</h4>
1. Home Page
Fetch and display a list of SuperHeros (Characters) on the home page. Also create a search bar that will filter out the character based on search query. Suppose I type “hul” in the search box, it should show “Hulk”. 
[ API example https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>]
Each search result of the superhero should have a favorite button, clicking on which superhero should be added to “My favorite superheroes” (a list).
On clicking any particular search result (any superhero), open a new page with more information about that superhero (Superhero page).

![image](https://user-images.githubusercontent.com/23145241/218326326-dd277ca8-24e0-48e0-8d34-d2de1c8adb9b.png)

2. Superhero Page
Should show a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).
![image](https://user-images.githubusercontent.com/23145241/218325918-6beb4e7d-9d03-48d8-acb8-45a581d291c7.png)

3. My favourite superheroes Page
Display a list of all the favourite superheroes.
Make this list persistent (should have the same number of superheroes before and after closing the browser).
Remove from favourites button: Each superhero should have remove from favourites button, clicking on which should remove that superhero from the list.
![image](https://user-images.githubusercontent.com/23145241/218325977-bdc812cb-72d8-499c-8d73-c0c896e86ebb.png)
