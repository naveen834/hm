import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import React, { useReducer, useState } from 'react';
//Animation
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

//Redux and Routes
import { fetchSearch } from '../actions/gamesAction';
import { fadeIn } from '../animations';
import Game from '../components/Game';
import logo from '../img/logo.svg';
// import { useDispatch } from 'react-redux';
import gamesReducer from '../reducers/gamesReducer';
import detailReducer, { initialState } from '../reducers/detailReducer';
import { loadDetail } from '../actions/detailAction';
import GameDetail from '../components/GameDetail';

const Nav = () => {
  const [state, dispatch] = useReducer(gamesReducer, {});
  const [textInput, setTextInput] = useState('');
  const [loading, isLoading] = useState(false);
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];
  const [instate, dispatch2] = useReducer(detailReducer, initialState);

  const loadDetailHandler = (e) => {
    document.body.style.overflow = 'hidden';
    loadDetail(e, dispatch2);
  };
  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    fetchSearch(textInput, isLoading, dispatch);
    setTextInput('');
  };
  const clearSearched = () => {
    dispatch({ type: 'CLEAR_SEARCHED' });
  };
  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {!pathId && instate.game.id && ''}

          {instate.game.id && pathId === instate.game.id.toString() ? (
            <GameDetail pathId={pathId} instate={instate} />
          ) : (
            ''
          )}
        </AnimatePresence>
        <Logo onClick={clearSearched}>
          <img src={logo} alt="logo" />
          <H1>Game Addict</H1>
        </Logo>
        <form className="search">
          <input
            value={textInput}
            onChange={(e) => setTimeout(inputHandler(e), 1000)}
            type="text"
          />
          <button onClick={(e) => submitSearch(e)} type="submit">
            Search
          </button>
          {loading ? (
            <Loading>loading...</Loading>
          ) : state.searched && state.searched.length ? (
            <div className="searched" style={{ marginTop: '4em' }}>
              <h2 style={{ textAlign: 'left' }}>Searched Games</h2>
              <Games style={{ marginTop: '4em' }}>
                {state.searched.map((game) => (
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
            </div>
          ) : (
            ''
          )}
        </form>
      </AnimateSharedLayout>
    </StyledNav>
  );
};

const H1 = styled(motion.div)`
  background: linear-gradient(to right, #ff2626, #ff0101);
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
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

export default Nav;
