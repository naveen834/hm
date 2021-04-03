//Styling and Animation
import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../animations';
import Game from '../components/Game';

const Home = ({ popular, newGames }) => {
  //get the current location

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {popular && popular.length ? <h2>Popular Games</h2> : ''}
      <Games>
        {popular && popular.length
          ? popular.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
              />
            ))
          : ''}
      </Games>
      {newGames && newGames.length ? <h2>New Games</h2> : ''}
      <Games>
        {newGames && newGames.length
          ? newGames.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
              />
            ))
          : ''}
      </Games>
    </GameList>
  );
};

const GameList = styled.div`
  padding: 0rem 5rem;
  @media only screen and (max-width: 780px) {
    padding: 0 2.5rem;
  }
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled.div`
  display: grid;
  @media only screen and (min-width: 310px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 540px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;
