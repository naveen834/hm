import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../animations';
import Game from '../components/Game';

const Upcoming = ({ loading, upcoming }) => {
  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {upcoming && upcoming.length ? <h2>Upcoming Games</h2> : ''}
      <Games>
        {loading ? (
          <>
            <h4>Patience is What makes a Gamer awesome</h4>
            <Loading>loading...</Loading>
          </>
        ) : upcoming && upcoming.length ? (
          upcoming.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))
        ) : (
          ''
        )}
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
const Loading = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  letter-spacing: 2px;
`;

export default Upcoming;
