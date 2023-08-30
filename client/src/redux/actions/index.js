import axios from 'axios';


export function getGames(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/games',{timeout:30000});
        return dispatch({type:'GET_GAMES', payload:json.data})
    }
}

export function getGenres(){
    return async function (dispatch){
        let info = await axios.get('http://localhost:3001/genres',{timeout:30000});
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
        try{
            let game = await axios.get(`http://localhost:3001/games/${id}`,{timeout:30000});
            return dispatch({type:'GET_GAME_BY_ID', payload:game.data})    
        }catch(error){
            console.log(error)
        }
    }
}

export function postGame(payload){
    return async function (dispatch){
        try{
            const response = await axios.post('http://localhost:3001/games/', payload);
            console.log(response);
            return dispatch({type:'POST_GAME', payload: response.status});
        } catch(error){
            console.log(error)
        }
    }
}

export function getGamesByName(name){
    return async function (dispatch){
        try{
            let games = await axios.get(`http://localhost:3001/games/?search=${name}`,{timeout:30000});
            return dispatch({type:'GET_GAMES_BY_NAME', payload:games.data})
        } catch(error){
            console.log(error)
        }
    }
}

export function getAllPlatforms(){
    return async function (dispatch){
        try{
            let platforms = await axios.get('http://localhost:3001/platforms',{timeout:30000});
            return dispatch({type:'GET_ALL_PLATFORMS', payload:platforms.data})
        } catch(error){
            console.log(error)
        }
    }
}