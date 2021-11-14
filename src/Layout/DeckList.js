import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";

function DeckList({ removeDeck }) {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  
  useEffect(() => {
    const abortController = new AbortController();
  const signal = abortController.signal;
    async function getDecks() {
      try {
        const response = await listDecks(signal);
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }
    getDecks();
    return () => { 
      abortController.abort();
    }
  }, []);

  //Formats each into JSX
  let formattedDecks = decks.map((deck, index) => (
    <div key={index} className="deck-container border border-2 border-secondary my-2 p-3">
      <div className="d-flex justify-content-between">
        <h4>{deck.name}</h4>
        <p>{deck.cards.length} cards</p>
      </div>
      <div>
        <p className="text-justify">{deck.description}</p>
        <button
          className="btn btn-secondary oi oi-eye py-2 mr-2"
          onClick={() => history.push(`/decks/${deck.id}`)}>
          View
        </button>
        <button
          className="btn btn-primary oi oi-book py-2"
          onClick={() => history.push(`/decks/${deck.id}/study`)}>
          Study
        </button>
        <button
          className="btn btn-danger oi oi-trash float-right"
          id={deck.id}
          onClick={() => removeDeck(deck.id)}>
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <button className="btn btn-secondary oi oi-plus py-2" onClick={() => history.push("/decks/new")}>  Create Deck</button>
      {formattedDecks}
    </>
  );
}

export default DeckList;