import axios from 'axios';


export function getGames(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/games',{});
        return dispatch({type:'GET_GAMES', payload:json.data})
    }
}

export function getGenres(){
    return async function (dispatch){
        let info = await axios.get('http://localhost:3001/genres',{});
        return dispatch({type:'GET_GENRES', payload:info.data})
    }
}

export function createGame(){    
}

export function filterByGenres(payload){
    return {type:'FILTER_BY_GENRES', payload}
}

export function filterBySource (payload){
    return {type:'FILTER_BY_SOURCE', payload}
}

export function getGameByID(payload){
    const id = payload;
    return async function (dispatch){
        let game = await axios.get(`http://localhost:3001/games/${id}`,{});
        return dispatch({type:'GET_GAME_BY_ID', payload:game.data})
    }
}