import React, { useState, useEffect } from "react";
import NotEnough from "./NotEnough";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "./NavBar";


function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [flip, setFlip] = useState(false);
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    prepareDeck();
    return () => {
      abortController.abort();
    }
  }, [deckId])

  
  const prepareDeck = async () => {
    try {
      const response = await readDeck(deckId, signal);
      setDeck(response);
      setCard(response.cards[0]);
    } catch (error) {
      if (error !== "AbortController") {
        throw error;
      }
    }
  }

  
  const handleNextCard = () => {
    
    if (count + 1 === deck.cards.length) {
      
      if (window.confirm("Restart cards?\nClick 'cancel' to return to the home page.")) {
        setCount(0);
        setCard(deck.cards[0]);
        
      } else {
        history.push("/");
      }
      
    } else {
      
      setCount((count) => {
        setCard(deck.cards[count + 1]);
        return count + 1;
      });
    }
    
    setFlip(false);
  }

  
  if (!Object.keys(deck).includes("cards")) return null;

  return (
    <div>
      <NavBar page={"Study"} />
      <h2 class="font-weight-bold py-3">Study: {deck.name}</h2>
      {/*Render cards if deck has more than 2 cards within*/}
      {deck.cards.length > 2 ? (
        <div className="card-container" class="border border-2 border-dark my-2 p-3">
          <h4>Card {count + 1} of {deck.cards.length}</h4>
          {/*Render the front or back of the card based on the flip state.*/}
          {!flip ?
            (
              <>
                <p>{card.front}</p>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => setFlip((flip) => !flip)}>
                  Flip
                </button>
              </>
            ) : (
              <>
                <p>{card.back}</p>
                <button
                  type="button"
                  class="btn btn-secondary py-2"
                  onClick={() => setFlip((flip) => !flip)}>
                  Flip
                </button>
                <button
                  type="button"
                  class="btn btn-primary py-2"
                  onClick={handleNextCard}>
                  Next
                </button>
              </>
            )
          }
        </div>
      ) : (<NotEnough cardCount={deck.cards.length} />)}
    </div>
  );
}

export default Study;