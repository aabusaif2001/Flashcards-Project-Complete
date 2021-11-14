import React from "react";
import { useHistory, useParams } from "react-router-dom";


function CardView({ card, removeCard }) {
  const { deckId } = useParams();
  const history = useHistory();

  return (
    <div className="card-container border border-secondary p-2">
      <div className="d-flex justify-content-between flex-wrap">
        <p>{card.front}</p>
        <p>{card.back}</p>
      </div>
      <div className="text-right">
        <button
          className="btn btn-secondary oi oi-pencil p-2 mr-1"
          onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>
          Edit
        </button>
        <button
          className="btn btn-danger oi oi-trash p-2"
          onClick={() => removeCard(card.id)}>
        </button>
      </div>
    </div>
  );
}

export default CardView;