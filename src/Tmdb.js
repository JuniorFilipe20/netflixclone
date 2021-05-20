const API_KEY = '62b383e5a89d3c2ff9d2024848c44061';
const API_BASE = 'https://api.themoviedb.org/3';

/* 
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {    // Função em que enviamos o endpoint, ele vai requisitar o resultado e ele envia-nos o resultado
    const req = await fetch(`${API_BASE}${endpoint}`);  //Para fazer uma requisição à um serviço externo, em que se acessa um site, sendo que o "await" corresponde à espera de uma resposta
    const json = await req.json();  // Quando é recebida a resposta da linha anterior, ele vem para esta linha que, por sua vez também, espera uma resposta
    return json;
}

export default {
    getHomeList: async () => {  // Função assincrona dos géneros de filmes e séries que retorna a promessa quando o await, correspondente a espera da promessa, é chamado. Em outras palavra, esta função vai pegar a lista de todas as informações de cada género de que é necessitado
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)    // Para pesquisar os filmes, em que o network correspondente à netflix, sendo as buscas feitas em português brasileiro, mostrando a chave do API que é obrigatório (de acordo com o site da Tmdb)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Ti',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => { // Função para pegar informações de um filme específico
        let info ={};

        if (movieId) {
            switch(type) {
                case 'movie':   // Caso se tratar de um filme
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`); // Preenche-se as requisições correspondentes ao filme
                break;
                case 'tv':   // Caso se tratar de uma série
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`); // Preenche-se as requisições correspondentes à série
                break;
                default:
                    info = null;
                break;
            }
        }


        return info;
    }
}