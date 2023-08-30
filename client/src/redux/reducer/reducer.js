const initialState = {
    games : [],
    allGames : [],
    genres : [],
    gameDetails : [],
    platforms : [],
    createGameStatus: '',
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY_GENRES':
          const allGames = state.allGames;
        //   console.log(action.payload);
          const genresFiltered = action.payload === 'All Genres'
            ? allGames
            : allGames.filter(game => game.genres.some(genre => genre.name === action.payload));
          return {
            ...state,
            games: genresFiltered,
          }
        
        case 'FILTER_BY_SOURCE':
          const allTheGames = state.allGames
          const createdFilter = action.payload === 'db' ? allTheGames.filter(el => el.createdInDB)
          : allTheGames.filter(el => !el.createdInAPI)
          return {
            ...state,
            games: action.payload === 'all' ? allTheGames : createdFilter
          }

        case 'GET_GAME_BY_ID':
            return {
              ...state,
              gameDetails: action.payload
            }
        case 'GET_GAMES_BY_NAME':
            return {
              ...state,
              games: action.payload
            }
        case 'POST_GAME':
            return {
              ...state,
              createGameStatus: action.payload,
            }
        
        case 'GET_ALL_PLATFORMS':
            return {
              ...state,
              platforms: action.payload
            }
        
        default:
            return state;
    }
}

export default rootReducer;