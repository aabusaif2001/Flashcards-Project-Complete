import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardView from "./CardView";
import NavBar from "./NavBar";


function DeckView({ removeDeck, removeCard }) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    
    useEffect(() => {
        getDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId])

    
    const getDeck = async () => {
        try {
            const response = await readDeck(deckId, signal);
            setDeck(response);
        } catch (error) {
            if (error !== "AbortController") {
                throw error;
            }
        }
    }

    
    if (Object.keys(deck).length > 0) {

        
        const viewCards = deck.cards.map((card) => <CardView key={card.id} card={card} removeCard={removeCard} />);

        
        return (
            <>
                <NavBar page={deck.name} />
                <div class="mb-2">
                    <h4>{deck.name}</h4>
                    <p>{deck.description}</p>
                    <button
                        class="btn btn-secondary oi oi-pencil mr-1 py-2"
                        onClick={() => history.push(`/decks/${deckId}/edit`)}>
                        Edit
                    </button>
                    <button
                        class="btn btn-primary oi oi-book mr-1 py-2"
                        onClick={() => history.push(`/decks/${deckId}/study`)}>
                        Study
                    </button>
                    <button
                        class="btn btn-primary oi oi-plus py-2"
                        onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
                        Add Cards
                    </button>
                    <button
                        class="btn btn-danger oi oi-trash float-right"
                        onClick={() => removeDeck(deckId)}>
                    </button>
                </div>
                <div class="my-3">
                    <h4 class="font-weight-bold">Cards</h4>
                    {viewCards}
                </div>
            </>
        );
    } else { return null; } //Return null if no keys in object
}

export default DeckView;