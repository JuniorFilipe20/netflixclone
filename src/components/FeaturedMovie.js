import React from 'react';
import './FeaturedMovie.css';

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);  // Variável que vai manipular a date, de modo a pegar apenas o ano (sem o dia e o mês)
    let genres = [];
    for(let i in item.genres) { // Sendo que os géneros estão dentro de um objeto na API, então há que pagá-los, colocar o nome dele dentro de um array e, seguidamente, juntá-los para exibir as informações
        genres.push( item.genres[i].name )
    }

    return (
            <section className="featured" style={{  // Configurando  estilo da imagem do Filme em Destaque
                backgroundSize: 'cover',    // Para que a imagem cubra todo o tamanho da tela
                backgroundPosition: 'center',    // Para ficar sempre no centro
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`    // Correspondente ao URL da imagem de fundo correspondente ao filme escolhido
            }}>
                <div className="featured--vertical">    {/* Divisão correspondente à parte vertical da imagem do filme em destaque */}
                    <div className="featured--horizontal">    {/* Divisão correspondente à parte horizontal da imagem do filme em destaque */}
                        <div className="featured--name">{item.original_name}</div>    {/* Divisão correspondente à informação do nome do filme em destaque */}
                        <div className="featured--info">    {/* Outras informações além do nome */}
                            <div className="featured--points">{item.vote_average} pontos</div>  {/* Correspondente à classificação do filme, sendo que o "vote_average" é referente a informação da classificação do filme dada na API da tmdb */}
                            <div className="featured--year"> {firstDate.getFullYear()}</div>  {/* Correspondente ao ano de lançamento */}
                            <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ""}</div>  {/* Correspondente ao número de temporada, e se o número de temporadas for diferente de 1, aparece o "s" no fim da palavra, ficando assim "temporadas", senão, não aparece o "s", ficando assim "temporada" */}
                        </div>
                        <div className="featured--description">{item.overview}</div>    {/* Correspondente à descrição, sendo que o "overview" é referente a informação da descrição do filme dada na API da tmdb */}
                        <div className="featured--buttons">    {/* Correspondente aos botões */}
                            <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
                            <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                        </div>
                        <div className="featured--genres"><strong>Géneros:</strong> {genres.join(', ')}</div>    {/* Correspondente aos géneros, em que estes são juntados */}
                        
                        
                    </div>
                </div>
            </section>
    );
}