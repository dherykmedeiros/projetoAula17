const url = "https://api.themoviedb.org/3/movie/now_playing?language=pt-Br&page=1";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmNlYzgyODNmYjFkM2JkNjgyMzFiZTAxMzAxMjIyNCIsIm5iZiI6MTcyNzk2MTkxMS40ODIwMzcsInN1YiI6IjY2MmQ0MWZkNWE3ODg0MDEyNGMxNjc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uUHvxwtDhC8TEFnVY9UBniYIGVRSZcUF6XTmyUI9NiU",
    },
};


// Função para buscar filmes da API
async function fetchMovies() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Verificação do conteúdo retornado pela API
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

// Função para exibir o filme de destaque e o carrossel
function displayMovies(movies) {
    if (movies.length > 0) {
        const firstMovie = movies[0];
        
        // Verifique se existem dados disponíveis antes de tentar acessá-los
        if (firstMovie.backdrop_path) {
            document.getElementById('highlighted-movie-image').src = `https://image.tmdb.org/t/p/w1280${firstMovie.backdrop_path}`;
        } else {
            console.warn('Imagem de fundo indisponível para o filme em destaque.');
        }

        if (firstMovie.title) {
            document.getElementById('highlighted-movie-title').innerText = firstMovie.title;
        } else {
            console.warn('Título indisponível para o filme em destaque.');
        }

        if (firstMovie.overview) {
            document.getElementById('highlighted-movie-description').innerText = firstMovie.overview;
        } else {
            console.warn('Descrição indisponível para o filme em destaque.');
        }

        document.getElementById('info-btn').onclick = function () {
            window.location.href = `informacoes-filme.html?id=${firstMovie.id}`;
        };

        // Limpeza do carrossel antes de adicionar os filmes
        const carouselCards = document.getElementById('carousel-cards');
        carouselCards.innerHTML = '';
        
        // Renderiza o restante dos filmes no carrossel
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
                console.warn(`Pôster indisponível para o filme: ${movie.title}`);
            }

            // Adiciona evento de clique para redirecionar à página de detalhes
            card.addEventListener('click', () => {
                window.location.href = `informacoes-filme.html?id=${movie.id}`;
            });

            card.appendChild(img);
            carouselCards.appendChild(card);
        }
    }
}

// Chama a função ao carregar a página
fetchMovies();
