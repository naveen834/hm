import {
  newGamesURL,
  popularGamesURL,
  searchGameURL,
  upcomingGamesURL,
} from '../api';
//Action Creator

export const loadGames = async (setLoading, dispatch) => {
  //FETCH AXIOS
  setLoading(true);
  const popularData = fetch(popularGamesURL());
  const newGamesData = fetch(newGamesURL());
  const upcomingData = fetch(upcomingGamesURL());
  await Promise.all([popularData, newGamesData, upcomingData])
    .then((responses) => {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(async (results) => {
      setLoading(false);
      dispatch({
        type: 'FETCH_GAMES',
        payload: {
          popular: await results[0].results,
          upcoming: await results[2].results,
          newGames: await results[1].results,
        },
      });
    });
  // );
};

export const fetchSearch = async (game_name, isLoading, dispatch) => {
  isLoading(true);
  await fetch(searchGameURL(game_name))
    .then((responses) => responses.json())
    .then((data) => {
      dispatch({
        type: 'FETCH_SEARCHED',
        payload: {
          searched: data.results,
        },
      });
      isLoading(false);
    });
  // );
};
