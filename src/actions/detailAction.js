import { gameDetailsURL, gameScreenshotURL } from '../api';

export const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: 'LOADING_DETAIL',
  });

  const detailData = fetch(gameDetailsURL(id));
  const screenShotData = fetch(gameScreenshotURL(id));
  await Promise.all([detailData, screenShotData])
    .then((res) => {
      return Promise.all(
        res.map(function (resp) {
          return resp.json();
        })
      );
    })
    .then((responses) => {
      dispatch({
        type: 'GET_DETAIL',
        payload: {
          game: responses[0],
          screen: responses[1],
        },
      });
    });
};
