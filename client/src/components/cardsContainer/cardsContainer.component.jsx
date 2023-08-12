import "./cardsContainer.styles.css";

// const CardsContainer = ({games})=>{
    
    //     return(
//         {
//             games?.map(game => {
//                 return(
//                     <div key={game.id}>
//                         <Card key={game.id} name={game.name} image={game.image} genres={game.genres.name}/>
//                     </div>
//                 )
//             })
//         }
//     )
// }

// export default CardsContainer;
// // export const paginado = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// // }


import Card from "../card/card.component";
import Paginado from "../paginado/paginado.component";
import { connect, useSelector } from "react-redux";
import { useState } from "react";

const CardsContainer = ({ games, allGames, order }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;

  const sortedByName = games.slice().sort((a, b) => {
    if (order === 'AtoZ') {
      return a.name.localeCompare(b.name);
    } else if (order === 'ZtoA') {
      return b.name.localeCompare(a.name);
    }
  });
  
  const sortedByRating = games.slice().sort((a, b) => {
    if (order === 'ratingAsc') {
      return a.rating - b.rating;
    } else if (order === 'ratingDesc') {
      return b.rating - a.rating;
    }
  });

  const renderGames = ()=>{
    console.log(order);
    if (order === 'AtoZ' || order === 'ZtoA') {
      return sortedByName.slice(firstGameIndex, lastGameIndex);
    } else if (order === 'ratingAsc' || order === 'ratingDesc') {
      return sortedByRating.slice(firstGameIndex, lastGameIndex);
    }
    return sortedByName.slice(firstGameIndex, lastGameIndex);
    
  } 
  // const renderGamesByRating = sortedByRating.slice(firstGameIndex, lastGameIndex);
  

  return (
    <div className="cards-container">
      <Paginado gamesPerPage={gamesPerPage} games={games.length} setCurrentPage={setCurrentPage}/>
      {
        renderGames().map((game) => (
          <div key={game.id}>
            <Card key={game.id} name={game.name} image={game.image} genres={game.genres.name} id={game.id}/>
          </div>
        ))}
    </div>
  );
};

export default connect(null, null)(CardsContainer);
