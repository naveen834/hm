import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useReducer } from 'react';
import { useLocation } from 'react-router-dom';
//Styling and Animation
import styled from 'styled-components';
import { fadeIn } from '../animations';
import Game from '../components/Game';
import GameDetail from '../components/GameDetail';
import { loadDetail } from '../actions/detailAction';
import detailReducer, { initialState } from '../reducers/detailReducer';

const Home = ({ loading, state }) => {
  //get the current location
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];
  const [instate, dispatch] = useReducer(detailReducer, initialState);

  const loadDetailHandler = (e) => {
    document.body.style.overflow = 'hidden';
    loadDetail(e, dispatch);
  };
  const { popular, newGames, upcoming } = state;
  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {instate.game.id
            ? pathId === instate.game.id.toString() && (
                <GameDetail pathId={pathId} instate={instate} />
              )
            : ''}
        </AnimatePresence>
        <h2>Upcoming Games</h2>
        <Games>
          {loading ? (
            <Loading>loading...</Loading>
          ) : (
            upcoming.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                key={game.id}
                onClick={() => loadDetailHandler(game.id)}
              />
            ))
          )}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
              onClick={() => loadDetailHandler(game.id)}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
              onClick={() => loadDetailHandler(game.id)}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  display: grid;
  @media only screen and (min-width: 540px) {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media only screen and (max-width: 310px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;
const Loading = styled(motion.div)`
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
import { useReducer } from 'react/cjs/react.production.min';
`;

export default Home;
