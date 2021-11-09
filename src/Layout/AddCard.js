import React from "react";
import NavBar from "./NavBar";
import CardForm from "./CardForm";

function AddCard({ newCard }) {
  return (
    <div className="add-card-container">
      <NavBar page={"Add Card"} />
      <h3>React Router: Add Card</h3>
      <CardForm cardFunction={newCard} option={"Add"} />
    </div>
  );
}

export default AddCard;