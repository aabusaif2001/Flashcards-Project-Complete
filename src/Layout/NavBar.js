import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";


function NavBar({ page }) {
  const { deckId, cardId } = useParams();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [deckName, setDeckName] = useState("");
  const { url } = useRouteMatch();

  
  useEffect(() => {
    if (deckId) getDeck(deckId, signal);
    return () => {
      abortController.abort();
    }
  }, [deckId, signal]);

  
  const getDeck = async () => {
    const response = await readDeck(deckId);
    setDeckName(response.name);
  }

  
  const fillBreadcrumb = () => {

   
    const pathArray = url.substring(1).split("/");
    
    const outputArray = [];

    
    for (let endPoint of pathArray) {

      
      switch (endPoint) {
        case "decks":  
          if (page !== "Create Deck") {
            outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>);
          }
          break;
        case "new":  
          if (pathArray[1] === "new") {
            outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to="/decks/new">Create Deck</Link></li>);
          } else {
            outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to={`/decks/${deckId}/cards/new`}>Add Card</Link></li>);
          }
          break;
        case "study":  
          outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to={`/decks/${deckId}/study`}>Study</Link></li>);
          break;
        case "edit":  
          if (pathArray[2] === "edit") {
            outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to={`/decks/${deckId}/edit`}>Edit Deck</Link></li>);
          } else {
            outputArray.push(<li key={outputArray.length} class="breadcrumb-item"><Link to={`/decks/${deckId}/cards/${cardId}/edit`}>Edit Card {cardId}</Link></li>);
          }
          break;
        default:
          break;
      }
    }

    
    return (
      <>
        {outputArray.slice(0, -1)}
        <li key={outputArray.length + 1} class="breadcrumb-item">{page}</li>
      </>
    );
  }

  //Add a "Home" link first, and return the completed breadcrumb nav
  return (
    <nav>
      <ul class="breadcrumb">
        <li key={0} class="breadcrumb-item">
          <a href="/" class="oi oi-home"> Home</a>
        </li>
        {fillBreadcrumb()}
      </ul>
    </nav>
  );
}

export default NavBar;