import React, { useEffect, useState } from 'react';
//Components and pages
//Styles
import GlobalStyles from './components/GlobalStyles';
//Router
import { Route } from 'react-router-dom';
import Nav from './components/Nav';
// const Home = React.lazy(() => import('./pages/Home'));
import Home from './pages/Home';
import { loadGames } from './actions/gamesAction';
import { useDispatch } from 'react-redux';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Route path={['/game/:id', '/']}>
        <Nav />
        <HomeDef />
      </Route>
    </div>
  );
}

function HomeDef() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames(setLoading));
  }, [dispatch]);
  // const { data, error } = useSWR(loadGames(setLoading));

  return <Home loading={loading} />;
}

export default App;
