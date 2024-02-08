// http://www.omdbapi.com/?i=[imdbID]&apikey=16f54219

// Define new variable
let searchArray = [];
let favArray = [];
let selectedMovie = "";

// add eventlistener when our content is mount or loaded
document.addEventListener("DOMContentLoaded", function () {
    const inputValue = document.getElementById("search-input");
    const inputResult = document.getElementById("search-result");
    const favList = document.getElementById("fav-container");

    // add asynchrounous function ot fetch imbd to show search result
    async function fetchIMDB(searchText) {
        try {
            const response = await fetch(`https://omdbapi.com/?s=${searchText}&apikey=16f54219`);
            if (!response.ok) {
                throw new Error("Error Fetching Data");
            }
            const data = await response.json();
            const store = data.Search.slice(0, 10);
            searchArray = [...store];
            loadList();
            loadFav();
        } catch (error) {
            console.log('Error Loading Data', error);
        }
    }

    // add eventlistener for our search field
    inputValue.addEventListener("input", function () {
        const searchText = inputValue.value.trim();
    if (searchText !== "") {
        fetchIMDB(searchText);
    } else {
        searchArray = [];
        inputResult.innerHTML = "";
    }
    })

    // creating a function to load search list whenever search bar are changes
    function loadList() {
        inputResult.innerHTML = "";
        const fragment = document.createDocumentFragment();    // elementto contain rendered array  

        // looping over resullt and show dynamic elements for our search
        searchArray.forEach((movie) => {
            const listElement = document.createElement("div"); // element for list  
            listElement.classList.add("list-element", "m-2", "d-flex");

            const moviePoster = document.createElement("div"); // element for poster image  
            moviePoster.classList.add("d-flex", "movie-poster", "align-items-center");
            const posterImg = document.createElement("img");
            if (movie.Poster === "N/A") {
                posterImg.src = "https://cdn-icons-png.flaticon.com/256/13725/13725483.png";
            } else {
                posterImg.src = movie.Poster;
            }
            posterImg.alt = "trending-movie";

            const movieList = document.createElement("div"); // element for list items  
            movieList.classList.add("element-content", "movie-list", "w-75");
            const movieTitle = document.createElement("div");
            movieTitle.classList.add("content-detail", "movie-title", "fs-6", "text-light", "px-2");
            movieTitle.textContent = movie.Title;
            const releaseDate = document.createElement("div");
            releaseDate.classList.add("release-Date", "text-truncate", "text-light", "text-nowrap", "px-2", "release-year");
            releaseDate.textContent = movie.Year;
            const cast = document.createElement("span");
            cast.classList.add("d-block", "cast", "text-truncate", "text-light", "text-nowrap", "px-2");
            cast.textContent = movie.Type;
            movieList.addEventListener('click', function () {
                togglePage(movie.imdbID);
                selectedMovie = movie.Title;
            });

            const bookmarkIcon = document.createElement("div"); // element for bookmark  
            bookmarkIcon.classList.add("search-bookmark", "d-flex", "align-items-end", "justify-content-center", "position-absolute");
            const bookmark = document.createElement("i");
            bookmark.classList.add("fa", "fa-bookmark", "fs-1");
            const add = document.createElement("span");
            add.classList.add("add", "position-absolute", "fs-2", "mb-1", "text-light");
            add.textContent = "+";

            const favouriteIcon = document.createElement('img'); // element for favourite  
            favouriteIcon.classList.add("search-favourite", "fav-icon", "d-flex", "align-items-center", "justify-content-center", "position-absolute");
            if (favArray.findIndex((fav) => fav.imdbID === movie.imdbID) !== -1) {
                favouriteIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png');
            } else {
                favouriteIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/128/10320/10320141.png');
            }
            favouriteIcon.setAttribute('alt', 'favourite');
            favouriteIcon.addEventListener('click', function () {
                toggleFav(movie);
            });

            // appending every array as requirement
            moviePoster.appendChild(posterImg);

            bookmarkIcon.appendChild(bookmark);
            bookmarkIcon.appendChild(add);

            movieList.appendChild(movieTitle);
            movieList.appendChild(releaseDate);
            movieList.appendChild(cast);


            listElement.appendChild(bookmarkIcon);
            listElement.appendChild(favouriteIcon);
            listElement.appendChild(moviePoster);
            listElement.appendChild(movieList);

            fragment.appendChild(listElement);

        })
        inputResult.appendChild(fragment)
    }

    // creating a function to load faourite list whenever favourite is updated
    function loadFav() {
        favList.innerHTML = ""
        const fragment = document.createDocumentFragment();    // elementto contain rendered array  

        // looping over resullt and show dynamic elements for our search
        favArray.forEach((movie) => {
            const favouriteContainer = document.createElement('div');    // element for favouriteContainer 
            favouriteContainer.classList.add('favourite-container', 'col-md-2', 'p-0', 'mx-2');

            const cardContainer = document.createElement('div');    // element for cardContainer 
            cardContainer.classList.add('card-container', 'd-flex', 'justify-content-between', 'position-relative');

            const bookmarkDiv = document.createElement('div');    // element for bookmarkDiv 
            bookmarkDiv.classList.add('bookmark', 'd-flex', 'align-items-center', 'justify-content-center', 'position-absolute');

            const bookmarkIcon = document.createElement('i');    // element for bookmarkIcon 
            bookmarkIcon.classList.add('fa', 'fa-bookmark', 'fs-1');

            const addSpan = document.createElement('span');    // element for addSpan 
            addSpan.classList.add('add', "mb-3", 'position-absolute', 'fs-2', 'text-light');
            addSpan.textContent = '+';

            const favouriteCard = document.createElement('div');    // element for favouriteCard 
            favouriteCard.classList.add('favourite-card', 'w-100', 'd-flex', 'justify-content-around', 'align-items-center', 'overflow-hidden');

            const imgElement = document.createElement('img');    // element for imgElement 
            imgElement.classList.add("img-element")
            if (movie.Poster === "N/A") {
                imgElement.src = "https://cdn-icons-png.flaticon.com/256/13725/13725483.png"
            } else {
                imgElement.src = movie.Poster
            }
            imgElement.setAttribute('height', '100%');
            imgElement.setAttribute('alt', 'trending-movie');
            imgElement.addEventListener('click', function () {
                togglePage(movie.imdbID)
                selectedMovie = movie.Title
            });

            const favouriteFooter = document.createElement('div');    // element for favouriteFooter 
            favouriteFooter.classList.add('favourite-footer', 'px-2');

            const topDescription = document.createElement('div');    // element for topDescription 
            topDescription.classList.add('top-description', 'text-light', 'fs-6', 'm-2', 'd-flex', 'align-items-center');

            const starIcon = document.createElement('i');    // element for starIcon 
            starIcon.classList.add('fa', 'fa-star');

            const ratingText = document.createTextNode('8.1');

            const favouriteIcon = document.createElement('img');    // element for lifavouriteIconst 
            favouriteIcon.classList.add("ms-auto", "fav-icon")
            favouriteIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png');
            favouriteIcon.setAttribute('alt', 'favourite');
            favouriteIcon.setAttribute('width', '22px');
            favouriteIcon.addEventListener('click', function () {
                toggleFav(movie)
            });

            const favouriteCardTitle = document.createElement('div');    // element for favouriteCardTitle 
            favouriteCardTitle.classList.add('favourite-card-title', "text-nowrap", "text-truncate", 'text-light', 'fs-5', 'pb-2');
            favouriteCardTitle.textContent = movie.Title;

            const button = document.createElement('button');    // element for button 
            button.classList.add('card-btn', 'text-blue', 'w-100', 'mx-auto', 'm-2', 'd-flex', 'align-items-center', 'justify-content-center');
            button.innerHTML = '<span class="fs-3 mb-1">+</span> Watchlist';

            const topLink = document.createElement('div');    // element for topLink 
            topLink.classList.add('top-link', 'fw-normal', 'text-light', 'fs-6', 'd-flex', 'justify-content-center', 'align-items-center');

            // appending every array as requirement

            favouriteContainer.appendChild(cardContainer);
            cardContainer.appendChild(bookmarkDiv);

            bookmarkDiv.appendChild(bookmarkIcon);
            bookmarkDiv.appendChild(addSpan);

            cardContainer.appendChild(favouriteCard);
            favouriteCard.appendChild(imgElement);
            favouriteFooter.appendChild(topDescription);

            topDescription.appendChild(starIcon);
            topDescription.appendChild(ratingText);
            topDescription.appendChild(favouriteIcon);

            favouriteContainer.appendChild(favouriteFooter);

            favouriteFooter.appendChild(favouriteCardTitle);
            favouriteFooter.appendChild(button);
            favouriteFooter.appendChild(topLink);

            fragment.appendChild(favouriteContainer);
        })
        favList.appendChild(fragment);
    }

    // create function to toggle to movie page after movie is selected
    function togglePage(id) {
        selectedMovie = id;
        window.location.href = `./movie-page.html?id=${id}`;
        favList.innerHTML = "";
    }

    // create function to toggle fav to add and remove favourite
    function toggleFav(movie) {
        const isPresent = favArray.findIndex((fav) => fav.imdbID === movie.imdbID);
        if (isPresent !== -1) {
            favArray = favArray.filter((fav) => fav.imdbID !== movie.imdbID);
            localStorage.setItem("movies", JSON.stringify(favArray));
            fetchLocalStorage();
        } else {
            const existArray = [...favArray, movie];
            localStorage.setItem("movies", JSON.stringify(existArray));
            fetchLocalStorage();
        }
    }

    // create function to load existing fav movie from locastorage
    function fetchLocalStorage() {
        const data = localStorage.getItem("movies");
        const list = JSON.parse(data)
        if (list) {
            favArray = [...list]
        }
        loadFav()
        loadList()
    }

    // calling to fetch localstorage whenever page is loaded
    fetchLocalStorage();
})