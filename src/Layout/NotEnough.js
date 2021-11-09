import React from "react";
import { useHistory, useParams } from "react-router-dom";


function NotEnough({ cardCount }) {
  const history = useHistory();
  const { deckId } = useParams();

  return (
    <div>
      <h3 class="font-weight-bold pb-3">Not enough cards.</h3>
      <p class="pb-1">You need at least 3 cards to study. There are {cardCount} cards in this deck</p>
      <button 
        class="btn btn-primary oi oi-plus" 
        onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
        Add Cards
      </button>
    </div>
  );
}

export default NotEnough;