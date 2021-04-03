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
  Promise.any([
    fetch(upcomingGamesURL()),
    fetch(newGamesURL()),
    fetch(popularGamesURL()),
  ])
    .then((resp) => resp.json())
    .then((res) => {
      setLoading(false);
      dispatch({
        type: 'FETCH_UPCOME',
        payload: {
          upcoming: res.results,
        },
      });
    })
    .then(() =>
      Promise.all([
        fetch(newGamesURL()),
        fetch(popularGamesURL()),
        fetch(upcomingGamesURL()),
      ])
    )
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
          popular: results[1].results,
          newGames: results[0].results,
          upcoming: results[2].results,
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
