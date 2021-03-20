import React, { useEffect, useState, useReducer } from 'react';
//Router
import { Route } from 'react-router-dom';
import { loadGames } from './actions/gamesAction';
import gamesReducer, { initState } from './reducers/gamesReducer';
//Components and pages
//Styles
// import { useDispatch } from 'react-redux';
import GlobalStyles from './components/GlobalStyles';
import Nav from './components/Nav';
// const Home = React.lazy(() => import('./pages/Home'));
import Home from './pages/Home';

function App() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(gamesReducer, initState);
  // const dispatch = useDispatch();
  useEffect(() => {
    loadGames(setLoading, dispatch);
  }, [dispatch]);
  // const { data, error } = useSWR(loadGames(setLoading));
  return (
    <div className="App">
      <GlobalStyles />
      <Route exact path={['/game/:id', '/']}>
        <Nav />
        <Home loading={loading} state={state} />
      </Route>
    </div>
  );
}

export default App;
