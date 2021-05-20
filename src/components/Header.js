import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>  {/* Para decidir se usa o background black ou não */}
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png" alt="Netflix" />    {/* Carregando uma imagem do Netflix na internet */}
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="http://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Utilizador" />    {/* Carregando uma imagem de utilizador da internet */}
                </a>
            </div>
        </header>
    );
}