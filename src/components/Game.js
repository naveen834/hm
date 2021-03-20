import { motion } from 'framer-motion';
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
//Styling and Animation
import styled from 'styled-components';
import { loadDetail } from '../actions/detailAction';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
// import { useDispatch } from 'react-redux';
// import { loadDetail } from '../actions/detailAction';
import { popup } from '../animations';
import { useLocation } from 'react-router-dom';
import GameDetail from '../components/GameDetail';

//Redux
import { smallImage } from '../util';
import detailReducer, { initialState } from '../reducers/detailReducer';

const Game = ({ name, released, image, id }) => {
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];

  const stringPathId = id.toString();
  const [instate, dispatch] = useReducer(detailReducer, initialState);

  const loadDetailHandler = (e) => {
    document.body.style.overflow = 'hidden';
    loadDetail(e, dispatch);
  };
  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {!pathId && <></>}
          {pathId && !instate.game.id && <Loading>loading...</Loading>}
          {instate.game.id && pathId === instate.game.id.toString() ? (
            <GameDetail pathId={pathId} instate={instate} />
          ) : (
            ''
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
      <StyledGame
        variants={popup}
        initial="hidden"
        animate="show"
        layoutId={stringPathId}
        onClick={() => loadDetailHandler(id)}
      >
        <Link to={`/game/${id}`}>
          <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
          <p>{released}</p>
          <motion.img
            layoutId={`image ${stringPathId}`}
            src={smallImage(image, 640)}
            alt={name}
          />
        </Link>
      </StyledGame>
    </>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;
const Loading = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  z-index: 2;
  opacity: 0.07;
  position: fixed;
  top: 0;
  left: 0;
  background-color: grey;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  letter-spacing: 2px;
`;

export default Game;
