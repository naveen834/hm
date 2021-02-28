import {
  newGamesURL,
  popularGamesURL,
  searchGameURL,
  upcomingGamesURL,
} from '../api';

//Action Creator

export const loadGames = (setLoading) => async (dispatch) => {
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
    .then((results) => {
      dispatch({
        type: 'FETCH_GAMES',
        payload: {
          popular: results[0].results,
          upcoming: results[2].results,
          newGames: results[1].results,
        },
      });
      setLoading(false);
    });
  // );
};

export const fetchSearch = (game_name, isLoading) => async (dispatch) => {
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
