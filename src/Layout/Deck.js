import React from "react";
import { Route, Switch } from "react-router-dom";
import Study from "./Study";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";


function Deck({ editDeck, removeDeck, newCard, editCard, removeCard }) {

  return (
    <Switch>
      <Route path="/decks/:deckId/study">
        <Study />
      </Route>
      <Route path="/decks/:deckId/edit">
        <EditDeck editDeck={editDeck} />
      </Route>
      <Route path="/decks/:deckId/cards/new">
        <AddCard newCard={newCard} />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard editCard={editCard} />
      </Route>
      <Route path="/decks/:deckId">
        <DeckView removeDeck={removeDeck} removeCard={removeCard} />
      </Route>
    </Switch>
  );
}

export default Deck;