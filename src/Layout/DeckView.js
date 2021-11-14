import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardView from "./CardView";
import NavBar from "./NavBar";

function DeckView({ removeDeck, removeCard }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        if (error !== "AbortController") {
          throw error;
        }
      }
    };

    getDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  if (Object.keys(deck).length > 0) {
    const viewCards = deck.cards.map((card) => (
      <CardView key={card.id} card={card} removeCard={removeCard} />
    ));

    return (
      <>
        <NavBar page={deck.name} />
        <div className="mb-2">
          <h4>{deck.name}</h4>
          <p>{deck.description}</p>
          <button
            className="btn btn-secondary oi oi-pencil mr-1 py-2"
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary oi oi-book mr-1 py-2"
            onClick={() => history.push(`/decks/${deckId}/study`)}
          >
            Study
          </button>
          <button
            className="btn btn-primary oi oi-plus py-2"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
          <button
            className="btn btn-danger oi oi-trash float-right"
            onClick={() => removeDeck(deckId)}
          ></button>
        </div>
        <div className="my-3">
          <h4 className="font-weight-bold">Cards</h4>
          {viewCards}
        </div>
      </>
    );
  } else {
    return null;
  } //Return null if no keys in object
}

export default DeckView;
