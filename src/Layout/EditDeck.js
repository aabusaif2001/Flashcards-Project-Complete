import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "./NavBar";

function EditDeck({ editDeck }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { deckId } = useParams();

  //Handlers for editing a deck
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = { id: deckId, name: name, description: description };
    await editDeck(updatedDeck);
    history.push(`/decks/${deckId}`);
  };
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getCard = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setName(response.name);
        setDescription(response.description);
      } catch (error) {
        if (error !== "AbortController") {
          throw error;
        }
      }
    };
    getCard();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  return (
    <>
      <NavBar page={"Edit Deck"} />
      <h3 className="font-weight-bold">Edit Deck</h3>
      <form onSubmit={handleSubmit}>
        <label className="w-100">
          Name
          <br />
          <input
            type="text"
            value={name}
            className="form-control"
            onChange={handleNameChange}
            placeholder={name}
          />
        </label>
        <br />
        <label className="w-100">
          Description
          <br />
          <textarea
            value={description}
            className="form-control"
            onChange={handleDescriptionChange}
            placeholder={description}
          />
        </label>
        <br />
        <button
          type="button"
          className="btn btn-secondary mr-1 py-2"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary py-2">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditDeck;
