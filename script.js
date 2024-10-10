const url = "https://api.themoviedb.org/3/movie/now_playing?language=pt-Br&page=1";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmNlYzgyODNmYjFkM2JkNjgyMzFiZTAxMzAxMjIyNCIsIm5iZiI6MTcyNzk2MTkxMS40ODIwMzcsInN1YiI6IjY2MmQ0MWZkNWE3ODg0MDEyNGMxNjc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uUHvxwtDhC8TEFnVY9UBniYIGVRSZcUF6XTmyUI9NiU",
    },
};

async function fetchMovies() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log('Dados da API:', data);

        if (data && data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            console.error('Nenhum filme encontrado na resposta da API.');
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

function displayMovies(movies) {
    if (movies.length > 0) {
        const firstMovie = movies[0];

        if (firstMovie.backdrop_path) {
            document.getElementById('highlighted-movie-image').src = `https://image.tmdb.org/t/p/w1280${firstMovie.backdrop_path}`;
        }

        if (firstMovie.title) {
            document.getElementById('highlighted-movie-title').innerText = firstMovie.title;
        }

        if (firstMovie.overview) {
            document.getElementById('highlighted-movie-description').innerText = firstMovie.overview;
        }

        document.getElementById('info-btn').onclick = function () {
            showMovieDetails(firstMovie);
        };

        const carouselCards = document.getElementById('carousel-cards');
        carouselCards.innerHTML = '';

        for (let i = 1; i < movies.length; i++) {
            const movie = movies[i];

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.classList.add('card-img');

            if (movie.poster_path) {
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
            } else {
                img.alt = 'Imagem indisponível';
            }

            card.addEventListener('click', () => {
                showMovieDetails(movie);
            });

            card.appendChild(img);
            carouselCards.appendChild(card);
        }
    }
}

function showMovieDetails(movie) {
    document.getElementById('movie-details').classList.remove('hidden');
    document.getElementById('carousel-container').classList.add('hidden');
    document.querySelector('.main-show-infos').classList.add('hidden');
    document.querySelector('.main-show-bg').classList.add('hidden');

    if (movie.backdrop_path) {
        document.getElementById('movie-details-image').src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    }
    document.getElementById('movie-details-title').innerText = movie.title;
    document.getElementById('movie-details-description').innerText = movie.overview || 'Descrição não disponível.';

    document.getElementById('back-btn').onclick = function () {
        hideMovieDetails();
    };
}

function hideMovieDetails() {
    document.getElementById('movie-details').classList.add('hidden');
    document.getElementById('carousel-container').classList.remove('hidden');
    document.querySelector('.main-show-infos').classList.remove('hidden');
    document.querySelector('.main-show-bg').classList.remove('hidden');
}

fetchMovies();
