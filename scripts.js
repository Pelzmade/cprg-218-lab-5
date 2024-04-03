
console.log("Hello World")

/*NEWS API KEY 9ac840baf26b48718e75d0e7850c982a*/

/*OPTION 1 create an asynchronous function using the syntax async function myFunctionName(). This function should use fetch() to make a request to an API endpoint, and then return a piece of data from that endpoint’s response.*/

async function fetchNewsList(selectedCountry) {
  try {
    const apiKey = '9ac840baf26b48718e75d0e7850c982a';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=9ac840baf26b48718e75d0e7850c982a`); 
    const data = await response.json(); 
    if (data.articles) {
    return data.articles;
    }
  } //Error handling
  catch (error) {
    console.log(error);}}

/*Attach an event listener to the submit button for the Option 1 dropdown list*/

const updateNewsBtn = document.getElementById('update-news-btn');
updateNewsBtn?.addEventListener('click', async () => {
    const selectedCountry = document.getElementById('select-city').value;
    const newsList = await fetchNewsList(selectedCountry);
    renderNewsArticles(newsList);
});

 /* Option 1 PROMISE*/

 fetch ('https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=9ac840baf26b48718e75d0e7850c982a')
    .then(function(response) {
        console.log(response.json());})

fetch ('https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=9ac840baf26b48718e75d0e7850c982a')
        .then (res => {
          if (res.ok) {
            console.log('SUCCESS') }
          else {
            console.log('NOT SUCCESSFUL');
          }})

/* Option 1 RENDER RESULTS */   
 
async function renderNewsArticles(newsList) {
  const newsContainer = document.getElementById('news-container');
  if (newsList.length == 0) {
    const documentElement = document.createElement('dropdown');
    documentElementElement.textContent = 'No news';
    newsContainer.appendChild(documentElementElement);
} else {
    const container = document.createElement('dropdown'); 

    newsList.forEach(newsItem => {
        const newsItemElement = document.createElement('dropdown');
        newsItemElement.textContent = newsItem.title;
        
        container.appendChild(newsItemElement);
    });newsContainer.appendChild(container);}}

/* Option 2 RENDER RESULTS */ 
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let articles = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log(value);
  console.log(articles); 
});

fetch("https://newsapi.org/v2/top-headlines?country=yourCountryCodeOrName&apiKey=9ac840baf26b48718e75d0e7850c982a")
  .then(res => res.json())
  .then(data => {
    articles = data.articles; 

    articles.forEach(article => {
      const card = userCardTemplate.content.cloneNode(true).querySelector(".news-card");
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = article.title;
      body.textContent = article.description;
      userCardsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('No news:', error);
  });

/* Option 2 v2 RENDER RESULTS */ 

const searchForm =document.querySelector('.search');
const input =document.querySelector ('.input');
const newsList =document.querySelector ('.news-list')

searchForm.addEventListener ('submit', retrieve)

function retrieve (e) {
  e.preventDefault ()
  const api ='9ac840baf26b48718e75d0e7850c982a'
  let topic = input.value;
  let url = "https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}"
  
  fetch (url).then((res)=>{
  return res.json()
})
.then((data) =>
console.log=(data)
data.articles.forEach(article=>{
  let li =document.createElement('li');
  let a = document.createElement('a');
  a.setAttribute('href', article.url);
  a.setAttribute('target', '_blank');
  a.textContent=article.title;
  li.appendChild(a);
  newsList.appendChild(li);
})
})


/*
async function renderOption1Dropdown() {
const select = document.getElementById("dropdown");
const list = await fetch150PokemonList();
if (list) {list.forEach((item) => {
const option = document.createElement("option");
option.textContent = item.name;
option.value = item.url;
select.appendChild(option);});}
} */


/*Attach an event listener to the submit button*/

const submitButton = document.getElementById('update-news-btn');
submitButton.addEventListener('click', ButtonClickHandler);
function ButtonClickHandler() {
  console.log (event);
}

fetchNewsList().then((results) => console.log(results));


/*POKEMON ORIGINAL/**
 * Create one card from item data.
 
function createCardElement(item) {
  return `
      <li class="card">
          <img src=${item.image} alt="">
          <div class="card-content">
              <p class="subheader">
                  ${item.subtitle}
              </p>
              <h3 class="header">
                  ${item.title}
              </h3>
          </div>
      </li>
    `;
}

/**
 * Create multiple cards from array of item data.
 
function createCardElements(data) {
  return data.map(createCardElement).join("");
}

/**
 * Fetch list of pokemon names and urls.
 
async function fetch150PokemonList() {
  try {
    // Get a list of Pokemon numbered 0-150
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
    );
    const data = await response.json();
    return data.results;
    //Error handling
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetch details of a pokemon.
 
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
    //Error handling
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetch details of all 150 pokemon.
 
async function fetch150PokemonDetails() {
  const detailsList = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const data = await fetchPokemonDetails(url);
    if (data) {
      detailsList.push(data);
    }
  }

  return detailsList;
}

/**
 * Option 1
 
function renderOption1Results(data) {
  const card = createCardElement({
    title: data.name,
    subtitle: data.types.map((type) => type.type.name).join(", "),
    image: data.sprites.other["official-artwork"].front_default,
  });
  document.getElementById("option-1-results").innerHTML = card;
}

async function option1DropdownClickHandler(event) {
  const select = document.getElementById("dropdown");
  const url = select.options[select.selectedIndex].value;
  const data = await fetchPokemonDetails(url);
  if (data) {
    renderOption1Results(data);
  }
}

/**
 * Attach an event listener to the submit button for the Option 1 dropdown list.
 
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);

/**
 * Populate the dropdown list with pokemon names and their endpoint urls.
 
async function renderOption1Dropdown() {
  const select = document.getElementById("dropdown");
  const list = await fetch150PokemonList();
  if (list) {
    list.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.url;
      select.appendChild(option);
    });
  }
}

renderOption1Dropdown();

/**
 * Option 2
 
async function renderOption2() {
  const myFavouritePokemon = ["pikachu", "charizard", "ditto", "psyduck"];

  const fetchPokemonData = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return await fetchPokemonDetails(url);
  };

  // Map the pokemon names to pokemon data.
  const pokemonData = await Promise.all(
    myFavouritePokemon.map(fetchPokemonData)
  );

  // Map the pokemon data to card data.
  const cardData = pokemonData.map((itemData) => {
    return {
      title: itemData.name,
      image: itemData.sprites.other["official-artwork"].front_default,
      subtitle: itemData.types.map((type) => type.type.name).join(", "),
    };
  });

  const cards = createCardElements(cardData);
  document.getElementById("option-2-results").innerHTML = cards;
}

renderOption2();

/**
 * Option 2 Enhanced

async function renderOption2Enhanced() {
  const data = await fetch150PokemonDetails();
  const cards = createCardElements(
    data.map((item) => ({
      title: item.name,
      image: item.sprites.other["official-artwork"].front_default,
      subtitle: item.types.map((type) => type.type.name).join(", "),
    }))
  );
  document.getElementById("option-2-enhanced-results").innerHTML = cards;
}

renderOption2Enhanced();

/**
 * Option 2 Enhanced: Search bar function.
 
function searchbarEventHandler() {
  //Get the value of the input field with id="searchbar"
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  //Get all the cards
  const enhancedResults = document.getElementById("option-2-enhanced-results");
  const card = enhancedResults.getElementsByClassName("card");

  for (i = 0; i < card.length; i++) {
    //If the value of the input field is not equal to the name of the pokemon, hide the card
    if (!card[i].innerHTML.toLowerCase().includes(input)) {
      card[i].style.display = "none";
      //If the value of the input field is equal to the name of the pokemon, show the card
    } else {
      card[i].style.display = "block";
    }
  }
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);

myFunctionName().then((results) => console.log(results));

*/