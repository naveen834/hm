export const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
};

const gamesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_GAMES':
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };
    case 'FETCH_Upcoming':
      return {
        ...state,
        upcoming: action.payload.Upcoming,
      };
    case 'FETCH_NewGames':
      return {
        ...state,
        newGames: action.payload.newGames,
      };
    case 'FETCH_Popular':
      return {
        ...state,
        popular: action.payload.popular,
      };
    case 'FETCH_SEARCHED':
      return {
        ...state,
        searched: action.payload.searched,
      };
    case 'CLEAR_SEARCHED':
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
