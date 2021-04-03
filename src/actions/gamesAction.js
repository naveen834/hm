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
      const string = res.next.split('&ordering=-')[1];
      let type = '';
      if (string.includes('added')) {
        type = 'Upcoming';
      } else if (string.includes('released')) {
        type = 'Popular';
      } else {
        type = 'NewGames';
      }
      if (type === 'NewGames') {
        dispatch({
          type: `FETCH_${type}`,
          payload: {
            newGames: res.results,
          },
        });
      } else if (type === 'Upcoming') {
        dispatch({
          type: `FETCH_${type}`,
          payload: {
            Upcoming: res.results,
          },
        });
      } else {
        dispatch({
          type: `FETCH_${type}`,
          payload: {
            popular: res.results,
          },
        });
      }
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
