import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(-400)   // Variável do estado da rolagem na horizontal

    const handleLeftArrow = () => { // Função que vai lidar com a seta da esquerda
        let x = scrollX + Math.round(window.innerWidth / 2);  // Fazendo com que cada clique na seta faça rodar o número de pixels correspondente à metade do tamanho da tela
        if(x > 0){  // Fazendo um limite no 0 para que quando chegar em 0px não rode mais
            x = 0;
        }
        setScrollX(x)
    }

    const handleRightArrow = () => { // Função que vai lidar com a seta da direita
        let x = scrollX - Math.round(window.innerWidth / 2);  // Fazendo com que cada clique na seta faça rodar o número de pixels correspondente à metade do tamanho da tela
        let listW = items.results.length * 150;    // Para pegar a largura total da lista
        if((window.innerWidth - listW) > x){  // Se a diferença entre o tamanho da tela e o tamanho da lista for maior do que o total de espaço que se quer ir à margem direita
            x = (window.innerWidth - listW) - 60;  // Então volta-se para o limite à direita, diminuíndo os 30px do padding da seta à direita e 30px do padding da seta à esquerda (30+30=60)
        }
        setScrollX(x)
    }

    return (
            <div className="movieRow">
                <h2>{title}</h2>
                <div className="movieRow--left" onClick={handleLeftArrow}>    {/* Correspondente à rolagem para a esquerda, em que vai chamar a função que lida com a seta da esquerda */}
                    <NavigateBeforeIcon style={{fontSize: 50}} />{/* Pegando ícones do site "https://material-ui.com/pt/components/material-icons/", após fazer a instalação dos ícones na aplicação utilizando os comandos "npm install @material-ui/core" e "npm install @material-ui/icons" */}
                </div>
                <div className="movieRow--right" onClick={handleRightArrow}>    {/* Correspondente à rolagem para a direita, em que vai chamar a função que lida com a seta da direita */}
                    <NavigateNextIcon style={{fontSize: 50}} />
                </div>

                <div className="movieRow--listarea">
                    <div className="movieRow--list" style={{    // Controlando a rolagem na horizontal
                        marginLeft: scrollX,
                        width: items.results.length * 150    // Faz com que a largura seja a quantidade de itens na lista, multiplicado por 150 que corresponde ao tamanho em pixels definido nos itens na lista (".movieRow--item { width: 150px; } em MovieRow.css)"
                    }}>
                        {items.results.length > 0 && items.results.map((item, key)=>(  // Se tiver algum filme para ser mostrado, ele vai mapeá-lo na lista                            
                            <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />  {/* Buscando o URL da capa do filme na API no site "https://www.themoviedb.org/" */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
}