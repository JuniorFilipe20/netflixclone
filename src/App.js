/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]); // Utilizando o useState para salvar a lista de filmes a ser exibida
  const [featuredData, setfeaturedData] = useState(null); // Para salvar a lista de filmes em destaque
  const [blackHeader, setBlackHeader] = useState(false);  // Variável que vai definir se aparece ou não o background preto

  useEffect(() => { // Quando a tela for carregada, esta função vai ser executada
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pagando o filme em destaque
      let originals = list.filter(i => i.slug === 'originals'); // Para pegar um filme nos Originais do Netflix, ou seja, em que no Tmdb.js tem o slug "originals"
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));  // Para fazer com que o item que foi pegado na linha anterior seja aleatório, em que vai gerar um número aleatório e este número é multiplicado pela quantidade de itens existente na lista, sendo que o "-1" é devido ao array que começa em 0 e a quantidade de itens começa em 1, então a sua quantidade é subtraída por 1
      let chosen = originals[0].items.results[randomChosen]  // Para pegar o filme específico na lista
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');  // Para pegar as informações adicionais do filme escolhido
      setfeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  useEffect(() => {// Adicionando um evento de monitoramento da página
    const scrollListener = () => {  //Vai monitorar o scroll da tela, sendo que quando tiver acima de um determinado valor, vai ser definido o blackHeader como true
      if(window.scrollY > 10) {  // "Y" correspondente ao scroll vertical (X é horizontal)
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);  //Quando tiver algum evento de scroll na tela

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

        <Header black={blackHeader} />

      {featuredData && // Quando tiver algum dado nos filmes em destaque
        <FeaturedMovie item={featuredData} /> // Aí aparece o seu componente e é enviado os seus dados
      }

      <section className="lists"> {/* Correspondente à lista de filmes */}        
        {movieList.map((item, key) => (
          <MovieRow key ={key} title={item.title} items={item.items} />  // Todo o filho (child) da lista tem de ter uma proriedade (prop) key (chave), porque corresponde a um loop
        ))}
      </section>

      <footer>
        Elaborado por Júnior Filipe<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site <a href="https://www.themoviedb.org/">themoviedb.org</a>
        
      </footer>

      {movieList.length <= 0 &&   // O loading aparece só quando a Lista de filmes não estiver carregada ainda
        <div className="loading">   {/* Correspondente a quando a página se encontre a carregar */}
          <img src="https://cdn.statically.io/img/techverge.io/wp-content/uploads/2018/01/Netflix_LoadTime.gif?quality=100&f=auto" alt="Carregando" />
        </div>
      }
    </div>
  );
}