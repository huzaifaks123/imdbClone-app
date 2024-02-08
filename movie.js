// http://www.omdbapi.com/?i=tt3896198&apikey=16f54219

// add eventlistener when our content is mount or loaded
document.addEventListener("DOMContentLoaded", function () {

    // Define variable to obtain id from search bar
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

    // creating ref var from id of the element
    const movieName = document.getElementById("movie-name");
    const releaseYear = document.getElementById("release-date");
    const pg = document.getElementById("PG");
    const duration = document.getElementById("duration");
    const imdbRating = document.getElementById("imdb-rating");
    const portImg = document.getElementById("portrait-img");
    const landscape = document.getElementById("landscape-img");
    const plot = document.getElementById("plot");
    const director = document.getElementById("director");
    const writer = document.getElementById("writer");
    const stars = document.getElementById("stars");

    // add asynchrounous function ot fetch imbd to show detail movie result
    async function fetchMovieDetail(myParam) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${myParam}&plot=full&apikey=16f54219`);

            if (!response.ok) {
                throw new Error("Error Fetching Data");
            }

            const data = await response.json();
            movieDetail = data;
            setMovieContent();
            inputResult.innerHTML = "";
        } catch (error) {
            console.log("Error Loading Data", error);
        }

    }
    async function updateMoviePage(myParam) {
        try {
            await fetchMovieDetail(myParam);
            inputValue.value = "";
            if (movieDetail) {
                window.location.href = "./movie-page.html";
            }
        } catch (error) {
            console.error('Error updating movie page:', error);
        }
    }

    function setMovieContent() {
        movieName.textContent = movieDetail.Title;
        releaseYear.textContent = movieDetail.Year;
        pg.textContent = movieDetail.Rated;
        duration.textContent = movieDetail.Runtime;
        imdbRating.textContent = movieDetail.imdbRating;
        portImg.src = movieDetail.Poster;
        landscape.src = movieDetail.Poster;

        if (movieDetail.Poster === "N/A") {
            portImg.src = "https://cdn-icons-png.flaticon.com/256/13725/13725483.png";
            landscape.src = "https://cdn-icons-png.flaticon.com/256/13725/13725483.png";
        } else {
            portImg.src = movieDetail.Poster;
            landscape.src = movieDetail.Poster;
        }

        plot.textContent = movieDetail.Plot;
        director.textContent = movieDetail.Director;
        writer.textContent = movieDetail.Writer;
        stars.textContent = movieDetail.Actors;

    }
    updateMoviePage(myParam);
})